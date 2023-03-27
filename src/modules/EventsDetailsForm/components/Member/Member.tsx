import React, { BaseSyntheticEvent, Fragment, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Controller, useForm } from "react-hook-form";
import { Box, Drawer, TextField, Typography } from "@mui/material";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { AvatarInput } from "~/shared/components/AvatarInput";
import { Button } from "~/shared/components/Button";
import { Text } from "~/shared/components/Text";
import { SaveButton } from "~/shared/components/SaveButton";
import { useModal } from "~/shared/hooks/useModal";
import { useAlertsStore } from "~/shared/stores/alerts";
import { getMemberHooksByName } from "../../lib/getMemberHooksByName";
import { ButtonDelete } from "~/shared/components/ButtonDelete";
import { compose, not, prop, when } from "rambda";
import {
  CreateOrganizerMutation,
  CreatePartnerMutation,
  OrganizerInput,
  PartnerInput
} from "~/generated/graphql";
import { equals } from "ramda";

type UpsertInput = OrganizerInput | PartnerInput;

type DeleteInput = { id: number };

type CreateMutation =
  | CreateOrganizerMutation["createOrganizer"]
  | CreatePartnerMutation["createPartner"];

type FormFields = {
  name: string;
  imageUrl?: string | null;
  file: File | null;
  deleteImage?: boolean;
};

type Member = {
  id?: number;
  name: string;
  imageUrl?: string | null;
  file?: File | null;
};

type Props = {
  title: string;
  attachTitle: string;
  memberType: "organizer" | "partner";
  value?: Member[];
  onChange?: (members: Member[]) => void;
  onCreateMember?: (input: UpsertInput) => void;
  onUpdateMember?: (input: UpsertInput) => void;
  onDeleteMember?: (input: DeleteInput) => void;
};

export const Member: React.FC<Props> = ({
  title,
  attachTitle,
  memberType,
  value = [],
  onChange,
  onCreateMember,
  onUpdateMember,
  onDeleteMember
}) => {
  const [members, setMembers] = useState(value);

  const [selectedMember, setSelectedMember] = useState<Member | null>();

  const { open, handleOpen, handleClose } = useModal();

  const { handleSubmit, control, register, setValue, reset } = useForm<FormFields>({});

  const addAlert = useAlertsStore((state) => state.addAlert);

  const client = useGraphqlClient();

  const { useCreate, useUpdate, useRemove } = getMemberHooksByName(memberType);

  const { mutateAsync: create } = useCreate(client);

  const { mutateAsync: update } = useUpdate(client);

  const { mutateAsync: remove } = useRemove(client);

  const handleRemove = () => {
    when(
      Boolean,
      compose((id) => {
        const input = { id: id as number };
        remove(input);
        onDeleteMember?.(input);
        setMembers((oldMembers) => {
          const newMembers = oldMembers.filter(
            compose(not, equals(selectedMember?.id), prop("id"))
          );

          onChange?.(newMembers);

          return newMembers;
        });
      }, prop("id")),
      selectedMember
    );

    handleClose();
  };

  const getOpenFormHandler = (member: Member) => () => {
    reset();
    setSelectedMember(member);
    handleOpen();
  };

  const handleAddOpen = () => {
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

    handleSubmit((newValues) => {
      handleCloseForm();

      const input = {
        ...(Boolean(selectedMember?.id) && { id: selectedMember?.id }),
        name: newValues.name,
        ...(Boolean(newValues.file) && { uploadImage: newValues.file }),
        ...(Boolean(newValues.deleteImage) && { deleteImage: newValues.deleteImage })
      };

      if (!selectedMember) {
        create({ input }).then((data) => {
          const mutationKey = Object.keys(data)[0];

          const values = data[mutationKey as keyof typeof data] as CreateMutation;

          if (!values) {
            return;
          }

          onCreateMember?.(values);

          setMembers((oldMembers) => {
            const newMembers = oldMembers.concat(values);

            onChange?.(newMembers);

            return newMembers;
          });
        });

        return;
      }

      setMembers((oldMembers) => {
        const newMembers = oldMembers.reduce((res: Member[], cur) => {
          res.push(cur === selectedMember ? newValues : cur);

          return res;
        }, []);

        onChange?.(newMembers);

        return newMembers;
      });

      update({ input });

      onUpdateMember?.({ ...selectedMember, ...newValues });
    })(e);
  };

  useEffect(() => {
    setMembers(value);
  }, [value]);

  useEffect(() => {
    if (!selectedMember) {
      return;
    }

    setValue("imageUrl", selectedMember.imageUrl);
    setValue("name", selectedMember.name);
  }, [selectedMember, setValue]);

  return (
    <Fragment>
      <Text variant='h6'>{title}</Text>

      <Box className='flex flex-col gap-4'>
        <Box className='flex flex-wrap gap-6'>
          {members.map((member, i) => (
            <Box
              className='w-full md:w-[200px] shrink-0'
              key={i}
              onClick={getOpenFormHandler(member)}
              tabIndex={0}
              onKeyPress={getOpenFormHandler(member)}
            >
              <img
                className='rounded-full w-[60px] h-[60px]'
                src={member.imageUrl ?? ""}
                alt={member.name}
              />
              <Typography>{member.name}</Typography>
            </Box>
          ))}
        </Box>

        <Button
          onClick={handleAddOpen}
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
            name='imageUrl'
            render={({ field: { value } }) => (
              <AvatarInput
                addAlert={addAlert}
                id='file-input'
                url={value ?? ""}
                onChange={(file) => {
                  setValue("file", file as File);
                  setValue("imageUrl", URL.createObjectURL(file as File));
                }}
                onDelete={() => {
                  setValue("file", null);
                  setValue("imageUrl", "");
                  setValue("deleteImage", true);
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
            {!selectedMember && (
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
            )}

            {selectedMember && <ButtonDelete className='flex-1' onClick={handleRemove} />}

            <SaveButton className='flex-1' />
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};
