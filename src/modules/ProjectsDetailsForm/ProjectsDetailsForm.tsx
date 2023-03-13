import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ProjectInput,
  useCreateProjectMutation,
  useProjectByIdQuery,
  useUpdateProjectMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TabsForm } from "~/shared/components/TabsForm";
import { initFormValues } from "~/shared/lib/initFormValues";
import { ProjectsPageRoute } from "~/shared/routes";
import { AdditionalProjectsForm } from "./components/AdditionalProjectsForm";
import { GeneralProjectsForm } from "./components/GeneralProjectsForm";
import { SeoProjectsForm } from "./components/SeoProjectsForm";
import { getDefaultSuccessCallback } from "~shared/lib/getDefaultSuccessCallback";

type Props = {
  id?: number;
};

export const ProjectsDetailsForm: React.FC<Props> = ({ id }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useProjectByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const { mutateAsync: createProject, isLoading: isCreateLoading } = useCreateProjectMutation(
    client,
    { onSuccess: getDefaultSuccessCallback }
  );

  const { mutateAsync: updateProject, isLoading: isUpdateLoading } = useUpdateProjectMutation(
    client,
    { onSuccess: getDefaultSuccessCallback }
  );

  const values = data?.projectById;

  const isLoading = isCreateLoading || isUpdateLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    setError
  } = useForm({ mode: "all" });

  const onSubmit = handleSubmit(async (newValues) => {
    const input: ProjectInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      knowledge_field_id: Number(newValues.knowledge_field),
      knowledge_field: { connect: Number(newValues.knowledge_field) },
      contest_id: newValues.contest,
      contest: { connect: newValues.contest },
      year: newValues.year
    };

    if (isCreateMode) {
      createProject({ input });
      return;
    }

    updateProject({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      [
        "name",
        ["contest", { key: "contest_id" }],
        ["knowledge_field", { key: "knowledge_field_id" }],
        "number",
        "leader",
        "organization",
        "information",
        "annotation",
        "plan_results",
        "result_annotation",
        "year"
      ],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={ProjectsPageRoute}
      activeStep={step}
      isLoading={isLoading}
      forms={[
        {
          tabTitle: "General data",
          component: (
            <GeneralProjectsForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
            />
          )
        },
        {
          tabTitle: "Additional data",
          component: (
            <AdditionalProjectsForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
              setError={setError}
            />
          )
        },
        {
          tabTitle: "SEO",
          component: <SeoProjectsForm errors={errors} register={register} control={control} />
        }
      ]}
    />
  );
};
