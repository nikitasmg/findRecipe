import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { usePageBySlugQuery, useUpdatePageMutation } from "~/generated/graphql";
import { TabsForm } from "~/shared/components/TabsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { initFormValues } from "~/shared/lib/initFormValues";
import { PagesRoute } from "~/shared/routes";
import { DocumentsForm } from "./components/DocumentsForm";
import { GeneralPageForm } from "./components/GeneralPageForm";
import { SeoForm } from "./components/SeoForm";

export const EditOrdersPageForm: React.FC = () => {
  const [step, setStep] = useState(0);

  const {
    handleSubmit,
    setValue,
    control,
    register,
    formState: { errors }
  } = useForm();

  const client = useGraphqlClient();

  const goBack = useNavigationBack();

  const { data } = usePageBySlugQuery(client, { slug: "orders" }, { refetchOnMount: "always" });

  const { mutateAsync: updatePage, isLoading } = useUpdatePageMutation(client, {
    onSuccess: goBack
  });

  const values = data?.pageBySlug;

  const onSubmit = handleSubmit((newValues) => {
    const input = {
      id: values?.id,
      ...newValues
    };

    updatePage({ input });
  });

  useEffect(() => {
    initFormValues(["name", "description", "imageUrl"], setValue, values);
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
          component: (
            <GeneralPageForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
            />
          )
        },
        {
          tabTitle: "Documents",
          component: <DocumentsForm setValue={setValue} control={control} />
        },
        {
          tabTitle: "SEO",
          component: <SeoForm errors={errors} register={register} control={control} />
        }
      ]}
    />
  );
};
