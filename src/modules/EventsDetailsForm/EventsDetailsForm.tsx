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
import { Languages } from "~/shared/types/Languages";
import { useEventsStore } from "~stores/events";

type FormFields = GeneralFormFields &
  AdditionalFormFields &
  LinkedDocumentsFormFields & { uploadImage?: File | null };

type Props = {
  lang: Languages;
  id?: number;
  formName?: string;
};

export const EventsDetailsForm: React.FC<Props> = ({ id, lang, formName }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useEventsStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

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

  useEffect(() => {
    setIsSaveLoading(isLoading);
  }, [isLoading, setIsSaveLoading]);

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
      name_en: newValues.name_en,
      description_en: newValues.description_en,
      published: newValues.published,
      imageUrl: undefined,
      uploadImage: newValues.uploadImage,
      ...(Boolean(!newValues.imageUrl) && { deleteImage: true }),
      place: newValues.place,
      place_en: newValues.place_en,
      start: newValues.start,
      end: newValues.end,
      ...(Boolean(newValues.uploadImage) && { deleteImage: true }),
      partners: newValues.partnersBelongs,
      organizers: newValues.organizersBelongs,
      linked_documents: {
        connect: newValues.connectDocuments ?? [],
        disconnect: newValues.disconnectDocuments ?? [],
        syncWithoutDetaching: newValues.updateDocuments ?? []
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
      "name_en",
      "description_en",
      "published",
      "imageUrl",
      "documents",
      "organizers",
      "partners",
      "start",
      "end",
      "place",
      "place_en"
    ];

    defaultFields.forEach((fieldName) => {
      setValue(
        fieldName as keyof FormFields,
        values?.[fieldName as keyof Omit<Event, "imageThumbs">] as never
      );
    });

    setValue(
      "documents",
      values?.linked_documents
        ?.reduce((res, cur) => {
          if (cur) {
            res.push(cur);
          }

          return res;
        }, Array(0))
        ?.sort((prev, cur) => (prev?.sort ?? 0) - (cur?.sort ?? 0))
    );
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={EventsPageRoute}
      activeStep={step}
      isLoading={isLoading}
      formName={formName}
      forms={[
        {
          tabTitle: "General data",
          component: (
            <GeneralForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
              lang={lang}
            />
          )
        },
        {
          tabTitle: "Additional data",
          component: <AdditionalForm setValue={setValue} getValues={getValues} control={control} />
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
