import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AdditionalNewsForm } from "~/modules/AdditionalNewsForm";
import { GeneralNewsForm } from "~/modules/GeneralNewsForm";
import { SeoNewsForm } from "~/modules/SeoNewsForm";
import { TabsForm } from "~/shared/components/TabsForm";
import { NewsInput, useCreateNewsMutation, useNewsByIdQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNavigationBack } from "~/shared/hooks/useBackClick";

type Props = {
  id?: number;
};

export const NewsDetailsForm: React.FC<Props> = ({ id }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useNewsByIdQuery(client, { id: `${id}` }, { enabled: !isCreateMode });

  const { mutateAsync: createNews } = useCreateNewsMutation(client);

  const values = data?.newsById;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm({ mode: "all" });

  const onSubmit = handleSubmit((newValues) => {
    const newData = { ...values, ...newValues };

    if (isCreateMode) {
      createNews({ input: newData as NewsInput });
      return;
    }
    console.log(newData);
  });

  const handleGoBack = useNavigationBack();

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    setValue("name", values?.name ?? "");
    setValue("description", values?.description ?? "");
    setValue("content", values?.content ?? "");
    setValue("image", values?.image?.url ?? "");
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      activeStep={step}
      handleBack={handleGoBack}
      forms={[
        {
          tabTitle: "General data",
          component: <GeneralNewsForm errors={errors} register={register} control={control} />
        },
        {
          tabTitle: "Additional data",
          component: (
            <AdditionalNewsForm
              defaultValues={{
                source: values?.source ?? "",
                source_name: values?.source_name ?? "",
                published: values?.published ?? false,
                published_at: values?.published_at ?? "",
                category: values?.category?.id ?? "",
                tags: values?.tags?.map((tag) => tag?.id ?? "") ?? [],
                on_index: values?.on_index ?? false
              }}
              step={1}
            />
          )
        },
        {
          tabTitle: "SEO",
          component: (
            <SeoNewsForm
              defaultValues={{
                title: values?.seo?.title ?? "",
                description: values?.seo?.description ?? ""
              }}
              step={2}
            />
          )
        }
      ]}
    />
  );
};
