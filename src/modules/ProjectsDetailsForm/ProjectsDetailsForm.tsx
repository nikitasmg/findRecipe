import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ProjectInput,
  useCreateProjectMutation,
  useProjectByIdQuery,
  useUpdateProjectMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ReportProjectsForm } from "~/modules/ProjectsDetailsForm/components/ReportProjectsForm";
import { TabsForm } from "~/shared/components/TabsForm";
import { initFormValues } from "~/shared/lib/initFormValues";
import { ProjectsPageRoute } from "~/shared/routes";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { AdditionalProjectsForm } from "./components/AdditionalProjectsForm";
import { GeneralProjectsForm } from "./components/GeneralProjectsForm";
import { SeoProjectsForm } from "./components/SeoProjectsForm";

type Props = {
  lang: Languages;
  id?: number;
};

export const ProjectsDetailsForm: React.FC<Props> = ({ id, lang }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useProjectByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const goBack = useNavigationBack();

  const { mutateAsync: createProject, isLoading: isCreateLoading } = useCreateProjectMutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: updateProject, isLoading: isUpdateLoading } = useUpdateProjectMutation(
    client,
    { onSuccess: goBack }
  );

  const values = data?.projectById;

  const isLoading = isCreateLoading || isUpdateLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm({ mode: "all" });

  const onSubmit = handleSubmit(async (newValues) => {
    const input: ProjectInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      knowledge_field_id: Number(newValues.knowledge_field),
      knowledge_field: { connect: Number(newValues.knowledge_field) },
      contest_id: newValues.contest,
      contest: { connect: newValues.contest },
      deadline: `${newValues.deadline}`
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
        "name_en",
        ["contest", { key: "contest_id" }],
        ["knowledge_field", { key: "knowledge_field_id" }],
        "number",
        "leader",
        "leader_en",
        "leader_rank",
        "leader_rank_en",
        "organization",
        "organization_en",
        "deadline",
        "grnti_number",
        "status_text",
        "status_text_en",
        "annotation",
        "annotation_en",
        "plan_results",
        "plan_results_en",
        "result_annotation",
        "result_annotation_en",
        "publications",
        "publications_en",
        "result_usage",
        "result_usage_en"
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
          tabTitle: "General information",
          component: (
            <GeneralProjectsForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
              lang={lang}
            />
          )
        },
        {
          tabTitle: "Information from application",
          component: (
            <AdditionalProjectsForm
              errors={errors}
              register={register}
              control={control}
              lang={lang}
            />
          )
        },
        {
          tabTitle: "Reporting materials",
          component: (
            <ReportProjectsForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
              lang={lang}
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
