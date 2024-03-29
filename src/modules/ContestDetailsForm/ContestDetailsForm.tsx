import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  ContestInput,
  UploadDocumentInput,
  useContestByIdQuery,
  useCreateContestMutation,
  useUpdateContestMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TabsForm } from "~/shared/components/TabsForm";
import { initFormValues } from "~/shared/lib/initFormValues";
import { NewsPageRoute } from "~/shared/routes";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { GeneralForm, GeneralFormFields } from "./components/GeneralForm";
import { DocumentFormFields, DocumentsForm } from "./components/DocumentsForm";
import { useContestStore } from "~stores/contest";

type FormFields = DocumentFormFields & GeneralFormFields;

type Props = {
  lang: Languages;
  id?: number;
  formName?: string;
};

export const ContestDetailsForm: React.FC<Props> = ({ id, lang, formName }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const goBack = useNavigationBack();

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useContestStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

  const { data, isSuccess } = useContestByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always", cacheTime: 0 }
  );

  const { mutateAsync: createContest, isLoading: isCreateLoading } = useCreateContestMutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: updateContest, isLoading: isUpdateLoading } = useUpdateContestMutation(
    client,
    { onSuccess: goBack }
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register,
    getValues
  } = useForm<FormFields>({ mode: "all" });

  const values = data?.contestById;

  const isLoading = isCreateLoading || isUpdateLoading;

  useEffect(() => {
    setIsSaveLoading(isLoading);
  }, [isLoading, setIsSaveLoading]);

  const onSubmit = handleSubmit((newValues) => {
    const input: ContestInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      name: newValues.name,
      name_en: newValues.name_en,
      number: Number(newValues.number),
      status: newValues.status,
      deadline: newValues.deadline,
      date: dayjs(newValues.date).format("YYYY-MM-DD"),
      uploadDocuments:
        newValues.uploadDocuments?.reduce((res: UploadDocumentInput[], cur, i) => {
          if (cur) {
            res.push({ upload: cur, sort: i + 1, user_name: cur.name });
          }

          return res;
        }, []) ?? [],
      deleteDocuments: newValues.deleteDocuments?.map(String)
    };

    if (isCreateMode) {
      createContest({ input });
      return;
    }

    updateContest({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      ["name", "name_en", "number", "status", "deadline", "date", "documents"],
      setValue,
      values
    );

    values?.documents?.forEach((document, i) => {
      const file = new File([], document?.user_name ?? "Document");

      setValue(`localDocuments.${document?.sort ?? i + 1}`, file);
    });
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={NewsPageRoute}
      activeStep={step}
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
          tabTitle: "Documents",
          component: (
            <DocumentsForm
              setValue={setValue}
              register={register}
              getValues={getValues}
              control={control}
            />
          )
        }
      ]}
    />
  );
};
