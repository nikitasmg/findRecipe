import React, { BaseSyntheticEvent, Fragment, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SaveIcon from "@mui/icons-material/Save";
import { Controller, useForm } from "react-hook-form";
import { Box, Drawer, TextField, Typography } from "@mui/material";
import { AvatarInput } from "~/shared/components/AvatarInput";
import { Button } from "~/shared/components/Button";
import { Text } from "~/shared/components/Text";
import { useModal } from "~/shared/hooks/useModal";

type FormFields = {
  name: string;
  avatarUrl: string;
  file: File | null;
};

type Member = {
  name: string;
  avatarUrl: string;
  file?: File | null;
};

type Props = {
  title: string;
  attachTitle: string;
  value?: Member[];
  onChange?: (members: Member[]) => void;
};

export const Member: React.FC<Props> = ({ title, attachTitle, value = [], onChange }) => {
  const [members, setMembers] = useState(value);

  const [selectedMember, setSelectedMember] = useState<Member | null>();

  const { open, handleOpen, handleClose } = useModal();

  const { handleSubmit, control, register, setValue, reset } = useForm<FormFields>({});

  useEffect(() => {
    setMembers(value);
  }, [value]);

  const handleOpenForm = () => {
    reset();
    setSelectedMember(null);
    handleOpen();
  };

  const handleCloseForm = () => {
    handleClose();
    setSelectedMember(null);
    reset();
  };

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    handleSubmit((values) => {
      if (selectedMember) {
        setMembers((oldMembers) => {
          const newFiles = oldMembers.reduce((res: Member[], cur) => {
            res.push(cur === selectedMember ? values : cur);

            return res;
          }, []);

          onChange?.(newFiles);
          return newFiles;
        });
      } else {
        setMembers((oldMembers) => oldMembers.concat(values));
      }

      handleCloseForm();
    })(e);
  };

  return (
    <Fragment>
      <Text variant='h6'>{title}</Text>

      <Box className='flex flex-col gap-4'>
        <Box className='flex flex-wrap gap-6'>
          {members.map((member, i) => (
            <Box className='flex-1 min-w-[200px] shrink-0' key={i}>
              <img
                className='rounded-full w-[60px] h-[60px]'
                src={member.avatarUrl}
                alt={member.name}
              />
              <Typography>{member.name}</Typography>
            </Box>
          ))}
        </Box>

        <Button
          onClick={handleOpenForm}
          className='bg-gray-200 hover:bg-gray-300 w-[60px] h-[60px] p-0 min-w-[40px] rounded-full'
        >
          <AddIcon />
        </Button>
      </Box>

      <Drawer anchor='right' open={!!open} onClose={handleCloseForm}>
        <Box className='flex flex-col gap-6 p-6' component='form' onSubmitCapture={onSubmit}>
          <Text variant='h5'>{attachTitle}</Text>

          <Controller
            control={control}
            name='avatarUrl'
            render={({ field: { value } }) => (
              <AvatarInput
                id='file-input'
                url={value}
                onChange={(file) => {
                  setValue("file", file as File);
                  setValue("avatarUrl", URL.createObjectURL(file as File));
                }}
                onDelete={() => {
                  setValue("file", null);
                  setValue("avatarUrl", "");
                }}
              />
            )}
          />

          <Controller
            control={control}
            name='name'
            render={({ field: { value } }) => (
              <TextField
                label={<Text>Name</Text>}
                value={value}
                variant='standard'
                id='name'
                {...register("name")}
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
    </Fragment>
  );
};