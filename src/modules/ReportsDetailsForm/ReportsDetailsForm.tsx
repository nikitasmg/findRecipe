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

type FormFields = GeneralFormFields & LinkedDocumentsFormFields & { uploadImage?: File | null };

type Props = {
  id?: number;
};

export const ReportsDetailsForm: React.FC<Props> = ({ id }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

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
      imageUrl: undefined,
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
          tabTitle: "Documents",
          component: (
            <LinkedDocumentForm setValue={setValue} getValues={getValues} control={control} />
          )
        }
      ]}
    />
  );
};
