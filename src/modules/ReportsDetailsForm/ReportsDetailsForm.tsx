import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { EventsPageRoute } from "~/shared/routes";
import {
  Report,
  ReportInput,
  useCreateReportMutation,
  useReportByIdQuery,
  useUpdateReportMutation
} from "~/generated/graphql";
import { TabsForm } from "~/shared/components/TabsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { GeneralForm, GeneralFormFields } from "./components/GeneralForm";
import { LinkedDocumentForm, LinkedDocumentsFormFields } from "../LinkedDocumentForm";
import { Languages } from "~/shared/types/Languages";
import { useReportsStore } from "~stores/reports";

type FormFields = GeneralFormFields & LinkedDocumentsFormFields & { uploadImage?: File | null };

type Props = {
  lang: Languages;
  id?: number;
  formName?: string;
};

export const ReportsDetailsForm: React.FC<Props> = ({ id, lang, formName }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useReportsStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

  const { data, isSuccess } = useReportByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const goBack = useNavigationBack();

  const { mutateAsync: create, isLoading: isCreateLoading } = useCreateReportMutation(client, {
    onSuccess: goBack
  });

  const { mutateAsync: update, isLoading: isUpdateLoading } = useUpdateReportMutation(client, {
    onSuccess: goBack
  });

  const values = data?.reportById;

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
    const input: ReportInput & { imageUrl?: never } = {
      ...(Boolean(values?.id) && { id: values?.id }),
      name: newValues.name,
      description: newValues.description,
      name_en: newValues.name_en,
      description_en: newValues.description_en,
      imageUrl: undefined,
      linked_documents: {
        connect: newValues.connectDocuments ?? [],
        disconnect: newValues.disconnectDocuments ?? [],
        syncWithoutDetaching: newValues.updateDocuments ?? []
      },
      uploadImage: newValues.uploadImage,
      ...(Boolean(!newValues.imageUrl) && { deleteImage: true })
    };

    if (isCreateMode) {
      create({ input });
      return;
    }

    update({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const defaultFields: (keyof FormFields)[] = [
      "name",
      "description",
      "name_en",
      "description",
      "description_en",
      "created_at",
      "imageUrl",
      "sort"
    ];

    defaultFields.forEach((fieldName) => {
      setValue(
        fieldName as keyof FormFields,
        values?.[fieldName as keyof Omit<Report, "image" | "imageThumbs" | "updated_at">] as never
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
      formName={formName}
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={EventsPageRoute}
      activeStep={step}
      forms={[
        {
          tabTitle: "General data",
          component: (
            <GeneralForm
              lang={lang}
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
            />
          )
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
