import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { AdditionalForm, AdditionalFormFields } from "./components/AdditionalForm";
import { EventsPageRoute } from "~/shared/routes";
import {
  Event,
  EventInput,
  useCreateEventMutation,
  useEventByIdQuery,
  useUpdateEventMutation
} from "~/generated/graphql";
import { TabsForm } from "~/shared/components/TabsForm";
import { GeneralForm, GeneralFormFields } from "./components/GeneralForm";
import { DocumentsForm, DocumentsFormFields } from "./components/DocumentsForm";

type FormFields = GeneralFormFields &
  AdditionalFormFields &
  DocumentsFormFields & { uploadImage?: File | null };

type Props = {
  id?: number;
};

export const EventsDetailsForm: React.FC<Props> = ({ id }) => {
  const [step, setStep] = useState(0);

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
    register,
    getValues
  } = useForm<FormFields>({ mode: "all" });

  const onSubmit = handleSubmit(async (newValues) => {
    const input: EventInput & { imageUrl?: never } = {
      ...(Boolean(values?.id) && { id: values?.id }),
      imageUrl: undefined,
      uploadImage: newValues.uploadImage,
      ...(Boolean(!newValues.imageUrl) && { deleteImage: true }),
      place: newValues.place,
      start: newValues.start,
      end: newValues.end,
      ...(Boolean(!newValues.uploadImage) && { deleteImage: true }),
      ...(Boolean(newValues.uploadDocuments) && {
        uploadDocuments: await Promise.all(
          (newValues.uploadDocuments ?? [])?.map(
            async (document: { title?: string; url?: string | null }, i: number) => ({
              upload: document.url ? await fileFromBlobUrl(document.url) : "",
              sort: i,
              user_name: document.title ?? ""
            })
          )
        )
      }),
      deleteDocuments: newValues.deleteDocuments
    };

    if (isCreateMode) {
      createEvent({ input });
      return;
    }

    updateEvent({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const defaultFields: (keyof FormFields)[] = [
      "name",
      "description",
      "published",
      "imageUrl",
      "documents",
      "organizers",
      "partners",
      "start",
      "end",
      "place"
    ];

    defaultFields.forEach((fieldName) => {
      setValue(
        fieldName as keyof FormFields,
        values?.[fieldName as keyof Omit<Event, "imageThumbs">] as never
      );
    });
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={EventsPageRoute}
      activeStep={step}
      isLoading={isLoading}
      forms={[
        {
          tabTitle: "General data",
          component: (
            <GeneralForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
            />
          )
        },
        {
          tabTitle: "Additional data",
          component: <AdditionalForm setValue={setValue} control={control} />
        },
        {
          tabTitle: "Documents",
          component: <DocumentsForm getValues={getValues} setValue={setValue} control={control} />
        }
      ]}
    />
  );
};
