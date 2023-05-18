import { Box, Drawer, TextField, Typography } from "@mui/material";
import React, { BaseSyntheticEvent, useState } from "react";
import { arrayMove } from "react-sortable-hoc";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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
import { SaveButton } from "../SaveButton";
import { BoxContainerSortable } from "../SortableBox/BoxContainerSortable";
import { BoxItemSortable } from "../SortableBox/BoxItemSortable";

type FormFields = {
  title: string;
  url: string;
  file?: File | null;
};

type Document = {
  url: string;
  title: string;
  file?: File | null;
  id?: number;
};

type Props = {
  value?: Document[];
  onChange?: (value: Document[]) => void;
  onDelete?: (id: number) => void;
  onUpdate?: (value: Document) => void;
  containerClassName?: string;
};

export const DocumentsUpload: React.FC<Props> = ({
  onChange,
  onDelete,
  onUpdate,
  containerClassName,
  value = []
}) => {
  const { open, handleOpen, handleClose } = useModal();

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
        const newFiles = value.reduce((res: Document[], cur) => {
          res.push(cur === selectedFile ? values : cur);

          return res;
        }, []);

        const updateID = selectedFile.id;

        if (updateID) {
          onUpdate?.(values as Document);
        }

        onChange?.(newFiles);
      } else {
        onChange?.(value.slice(0, 1).concat(values));
      }

      handleCloseForm();
    })(e);
  };

  const getDeleteFileHandler = (index: number) => () => {
    const newFiles = value.filter((_, i) => i !== index);

    const deleteID = value[index]?.id;

    if (deleteID) {
      onDelete?.(deleteID);
    }

    onChange?.(newFiles);
  };

  const getSelectFileHandler = (file: Document) => () => {
    setSelectedFile(file);
    handleOpen();
    setValue("title", file.title);
    setValue("url", file.url);
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newFiles = arrayMove(value, oldIndex, newIndex);

    const update = newFiles[newIndex];

    if (update.id && update) {
      onUpdate?.(update);
    }

    onChange?.(newFiles);
  };

  return (
    <Box className={clsx(containerClassName, "flex flex-col gap-4")}>
      {!!value.length && (
        <BoxContainerSortable
          className='flex flex-col gap-4'
          items={(value as Required<Document>[]) ?? []}
          onSortEnd={onSortEnd}
        >
          {value.map((file, i) => (
            <BoxItemSortable
              className='flex gap-2 items-center outline-1'
              tabIndex={0}
              id={file.id ?? i}
              key={i}
            >
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
            </BoxItemSortable>
          ))}
        </BoxContainerSortable>
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

            <SaveButton className='flex-1' />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
