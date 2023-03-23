import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
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
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { GeneralForm, GeneralFormFields } from "./components/GeneralForm";
import { LinkedDocumentsFormFields, LinkedDocumentForm } from "../LinkedDocumentForm";

type FormFields = GeneralFormFields &
  AdditionalFormFields &
  LinkedDocumentsFormFields & { uploadImage?: File | null };

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
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const goBack = useNavigationBack();

  const { mutateAsync: createEvent, isLoading: isCreateLoading } = useCreateEventMutation(client, {
    onSuccess: goBack
  });

  const { mutateAsync: updateEvent, isLoading: isUpdateLoading } = useUpdateEventMutation(client, {
    onSuccess: goBack
  });

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
      name: newValues.name,
      description: newValues.description,
      published: newValues.published,
      imageUrl: undefined,
      uploadImage: newValues.uploadImage,
      ...(Boolean(!newValues.imageUrl) && { deleteImage: true }),
      place: newValues.place,
      start: newValues.start,
      end: newValues.end,
      ...(Boolean(!newValues.uploadImage) && { deleteImage: true }),
      linked_documents: {
        connect: newValues.connectDocuments ?? [],
        disconnect: newValues.disconnectDocuments ?? []
      }
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

    setValue(
      "documents",
      values?.linked_documents?.reduce((res, cur) => {
        if (cur) {
          res.push(cur);
        }

        return res;
      }, Array(0))
    );
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
          component: (
            <LinkedDocumentForm setValue={setValue} getValues={getValues} control={control} />
          )
        }
      ]}
    />
  );
};
