import { Box, Drawer, TextField, Typography } from "@mui/material";
import React, { BaseSyntheticEvent, ReactNode, useState } from "react";
import { arrayMove, SortableContainer, SortableElement } from "react-sortable-hoc";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SaveIcon from "@mui/icons-material/Save";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { useModal } from "~/shared/hooks/useModal";
import { Button } from "../Button";
import { Text } from "../Text";
import { FileInput } from "../FileInput";
import { DragHandle } from "../SortableTable";

export const DocumentsContainerSortable = SortableContainer<{ children: ReactNode }>(
  ({ children }: { children: ReactNode }) => <Box className='flex flex-col gap-4'>{children}</Box>
);

export const DocumentsRowSortable = SortableElement<{ children: ReactNode }>(
  ({ children }: { children: ReactNode }) => {
    return (
      <Box role='row' className='flex gap-2 items-center outline-1' tabIndex={0}>
        {children}
      </Box>
    );
  }
);

type FormFields = {
  title: string;
  url: string;
  file?: File | null;
};

type Document = {
  url: string;
  title: string;
  file?: File | null;
};

type Props = {
  value?: Document[];
  onChange?: (value: Document[]) => void;
  containerClassName?: string;
};

export const DocumentsUpload: React.FC<Props> = ({ onChange, containerClassName, value = [] }) => {
  const { open, handleOpen, handleClose } = useModal();

  const [files, setFiles] = useState<Document[]>(value);

  const [selectedFile, setSelectedFile] = useState<Document | null>();

  const { handleSubmit, control, register, setValue, getValues, reset } = useForm<FormFields>({
    defaultValues: {
      title: selectedFile?.title,
      url: selectedFile?.url
    }
  });

  const handleOpenForm = () => {
    reset();
    setSelectedFile(null);
    handleOpen();
  };

  const handleCloseForm = () => {
    handleClose();
    setSelectedFile(null);
    reset();
  };

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    handleSubmit((values) => {
      if (selectedFile) {
        setFiles((oldFiles) => {
          const newFiles = oldFiles.reduce((res: Document[], cur) => {
            res.push(cur === selectedFile ? values : cur);

            return res;
          }, []);

          onChange?.(newFiles);
          return newFiles;
        });
      } else {
        setFiles((oldFiles) => oldFiles.concat(values));
      }

      handleCloseForm();
    })(e);
  };

  const getDeleteFileHandler = (index: number) => () => {
    setFiles((oldFiles) => {
      const newFiles = oldFiles.filter((_, i) => i !== index);
      onChange?.(newFiles);
      return newFiles;
    });
  };

  const getSelectFileHandler = (file: Document) => () => {
    setSelectedFile(file);
    handleOpen();
    setValue("title", file.title);
    setValue("url", file.url);
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setFiles((oldFiles) => {
      const newFiles = arrayMove(oldFiles, oldIndex, newIndex);
      onChange?.(newFiles);
      return newFiles;
    });
  };

  return (
    <Box className={clsx(containerClassName, "flex flex-col gap-4")}>
      {!!files.length && (
        <DocumentsContainerSortable distance={1} onSortEnd={onSortEnd}>
          {files.map((file, i) => (
            <DocumentsRowSortable key={i} index={i}>
              <DragHandle />
              <Box className='flex gap-2' onClick={getSelectFileHandler(file)}>
                <DescriptionIcon />
                <Typography className='text-primary hover:text-primaryActive hover:underline cursor-pointer'>
                  {file.title}
                </Typography>
              </Box>
              <CancelIcon
                onClick={getDeleteFileHandler(i)}
                className='text-red-700 right-0 top-0 cursor-pointer outline-1'
              />
            </DocumentsRowSortable>
          ))}
        </DocumentsContainerSortable>
      )}
      <Button
        className='w-fit'
        variant='outlined'
        color='secondary'
        onClick={handleOpenForm}
        startIcon={<AttachFileIcon />}
      >
        Attach file
      </Button>

      <Drawer anchor='right' open={!!open} onClose={handleCloseForm}>
        <Box className='flex flex-col gap-10 p-6' component='form' onSubmitCapture={onSubmit}>
          <Text variant='h5'>Attach file</Text>

          <Controller
            control={control}
            name='title'
            render={({ field: { value } }) => (
              <TextField
                label={<Text>Document title</Text>}
                value={value}
                variant='standard'
                id='title-document'
                {...register("title")}
              />
            )}
          />

          <Controller
            control={control}
            name='url'
            render={({ field: { value } }) => (
              <FileInput
                id='file-input'
                url={value}
                fileName={getValues("title")}
                onFileChange={(file) => {
                  setValue("file", file);

                  if (!getValues("title")) {
                    setValue("title", file?.name ?? "");
                  }
                }}
                onUrlChange={(url = "") => {
                  setValue("url", url);
                }}
                onDelete={() => {
                  setValue("url", "");
                  setValue("file", null);
                  setValue("title", "");
                }}
              />
            )}
          />

          <Box className='flex gap-2'>
            <Button
              className='flex-1'
              color='error'
              type='button'
              variant='outlined'
              startIcon={<BackspaceIcon />}
              onClick={handleCloseForm}
            >
              Back
            </Button>

            <Button
              className='flex-1'
              color='primary'
              type='submit'
              variant='outlined'
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
