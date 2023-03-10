import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { usePageBySlugQuery, useUpdatePageMutation } from "~/generated/graphql";
import { TabsForm } from "~/shared/components/TabsForm";
import { initFormValues } from "~/shared/lib/initFormValues";
import { PagesRoute } from "~/shared/routes";
import { GeneralPageForm } from "./components/GeneralPageForm/GeneralPageForm";
import { SeoForm } from "./components/SeoForm/SeoForm";

export const EditStaffPageForm: React.FC = () => {
  const [step, setStep] = useState(0);

  const {
    handleSubmit,
    setValue,
    control,
    register,
    formState: { errors }
  } = useForm();

  const client = useGraphqlClient();

  const { data } = usePageBySlugQuery(client, { slug: "staff" });

  const { mutateAsync: updatePage, isLoading } = useUpdatePageMutation(client);

  const values = data?.pageBySlug;

  const onSubmit = handleSubmit((newValues) => {
    const input = {
      id: values?.id,
      ...newValues
    };

    updatePage({ input });
  });

  useEffect(() => {
    initFormValues(["name", "description"], setValue, values);
    setValue("seo.upsert.title", values?.seo?.title);
    setValue("seo.upsert.description", values?.seo?.description);
  }, [values, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={PagesRoute}
      activeStep={step}
      isLoading={isLoading}
      forms={[
        {
          tabTitle: "General data",
          component: <GeneralPageForm errors={errors} register={register} control={control} />
        },
        {
          tabTitle: "SEO",
          component: <SeoForm errors={errors} register={register} control={control} />
        }
      ]}
    />
  );
};
