import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  TextareaAutosize,
  TextField
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { curry } from "rambda";
import {
  EventInput,
  useCreateEventMutation,
  useEventByIdQuery,
  useUpdateEventMutation,
  Document,
  Event,
  Partner,
  Organizer
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { initFormValues } from "~/shared/lib/initFormValues";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { HelperText } from "~/shared/components/HelperText";
import { Button } from "~/shared/components/Button";
import { ImageInput } from "~/shared/components/ImageInput";
import { DocumentsUpload } from "~/shared/components/DocumentsUpload";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";
import { Member } from "./components/Member";
import { baseRequired } from "~/shared/lib/validation";

type Props = {
  id?: number;
};

export const EventsDetailsForm: React.FC<Props> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useEventByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode }
  );

  const { mutateAsync: createEvent, isLoading: isCreateLoading } = useCreateEventMutation(client);

  const { mutateAsync: updateEvent, isLoading: isUpdateLoading } = useUpdateEventMutation(client);

  const values = data?.eventById;

  const isLoading = isCreateLoading || isUpdateLoading;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit(async (newValues) => {
    const input: EventInput & { imageUrl?: never } = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      imageUrl: undefined,
      ...(Boolean(!newValues.uploadImage) && { deleteImage: true }),
      uploadDocuments: await Promise.all(
        newValues.documents?.map(
          async (document: { title: string; url: string }, i: number) =>
            ({
              upload: document.url ? await fileFromBlobUrl(document.url) : "",
              sort: i,
              user_name: document.title
            } || [])
        )
      )
    };

    delete (input as Event).documents;

    if (isCreateMode) {
      createEvent({ input });
      return;
    }

    updateEvent({ input });
  });

  const getInitMemberValue = (members?: (Partner | Organizer)[]) =>
    members?.map((member) => ({ name: member.name ?? "", avatarUrl: member.imageUrl ?? "" })) ?? [];

  const handleChecked = getCheckedHandler(setValue);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      ["name", "description", "published", "imageUrl", "documents", "organizers", "partners"],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='flex flex-col lg:flex-row gap-6 mt-2'>
        <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
          <Controller
            control={control}
            name='name'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <RequiredLabelWrapper>
                      <Text>Title</Text>
                    </RequiredLabelWrapper>
                  }
                  value={value}
                  variant='outlined'
                  id='name'
                  error={!!getError("name")}
                  {...register("name", baseRequired)}
                />

                <HelperText id='name' error={getError("name")} />
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name='description'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  multiline
                  fullWidth
                  value={value}
                  label={<Text>Description</Text>}
                  InputProps={{
                    inputComponent: TextareaAutosize
                  }}
                  {...register("description")}
                />

                <HelperText id='description' error={getError("description")} />
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name='published'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <FormControlLabel
                  control={<Switch checked={!!value} onChange={handleChecked("published")} />}
                  label={<Text>Published</Text>}
                />

                <HelperText id='published' error={getError("published")} />
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name='documents'
            render={({ field: { value } }) => (
              <DocumentsUpload
                value={value?.map((document: Document) => ({
                  title: document.user_name ?? "",
                  url: document.user_name ?? ""
                }))}
                onChange={(documents) => {
                  setValue("documents", documents);
                }}
              />
            )}
          />

          <Controller
            control={control}
            name='partners'
            render={({ field: { value } }) => (
              <Member
                title='Partners'
                attachTitle='Attach partner'
                value={getInitMemberValue(value)}
                onChange={curry(setValue)("partners")}
              />
            )}
          />

          <Controller
            control={control}
            name='organizers'
            render={({ field: { value } }) => (
              <Member
                title='Organizers'
                attachTitle='Attach organizer'
                value={getInitMemberValue(value)}
                onChange={curry(setValue)("organizers")}
              />
            )}
          />
        </Box>

        <Box className='grow-[1] flex justify-center lg:w-[30%] order-first lg:order-last'>
          <Controller
            control={control}
            name='imageUrl'
            render={({ field: { value } }) => (
              <ImageInput
                id='general'
                url={value}
                {...register("imageUrl")}
                onChange={(file) => {
                  setValue("uploadImage", file);
                  if (file) {
                    setValue("imageUrl", URL.createObjectURL(file as File));
                  }
                }}
                onDelete={() => {
                  setValue("uploadImage", null);
                  setValue("imageUrl", null);
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Button
        startIcon={<SaveIcon />}
        disabled={isLoading}
        type='submit'
        variant='contained'
        className='w-fit ml-auto'
        size='small'
      >
        Save
      </Button>
    </form>
  );
};
