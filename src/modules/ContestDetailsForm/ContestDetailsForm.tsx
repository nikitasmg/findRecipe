import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ContestInput,
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
      ...newValues
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

    initFormValues(["name", "number", "status", "deadline", "date"], setValue, values);
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
