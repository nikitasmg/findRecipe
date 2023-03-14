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
import { GeneralForm } from "./components/GeneralForm";
import { DocumentsForm } from "./components/DocumentsForm";

type Props = {
  id?: number;
};

export const ContestDetailsForm: React.FC<Props> = ({ id }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useContestByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode }
  );

  const { mutateAsync: createContest, isLoading: isCreateLoading } =
    useCreateContestMutation(client);

  const { mutateAsync: updateContest, isLoading: isUpdateLoading } =
    useUpdateContestMutation(client);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const values = data?.contestById;

  const isLoading = isCreateLoading || isUpdateLoading;

  const onSubmit = handleSubmit((newValues) => {
    const input: ContestInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      name: newValues.name,
      number: newValues.number,
      status: newValues.status,
      deadline: newValues.deadline,
      date: dayjs(newValues.date).format("YYYY-MM-DD"),
      uploadDocuments: newValues.uploadDocuments.reduce(
        (res: [UploadDocumentInput], cur: File, i: number) => {
          if (cur) {
            res.push({ upload: cur, sort: i, user_name: cur.name });
          }
          return res;
        },
        []
      ),
      deleteDocuments: newValues.uploadDocuments.reduce((res: number[]) => {
        const existed = values?.documents?.find((doc) =>
          newValues.uploadDocuments?.find((upload: { sort: number }) => upload.sort === doc?.sort)
        );

        if (existed) {
          res.push(existed?.id);
        }

        return res;
      }, [])
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

    initFormValues(["name", "number", "status", "deadline", "date", "documents"], setValue, values);

    values?.documents?.forEach((document, i) => {
      const file = new File([], document?.user_name ?? "Document");

      setValue(`uploadDocuments.${i}`, file);
    });
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={NewsPageRoute}
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
          component: <DocumentsForm setValue={setValue} register={register} control={control} />
        }
      ]}
    />
  );
};
