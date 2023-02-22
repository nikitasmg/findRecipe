import React, { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AdditionalNewsForm } from "~/modules/AdditionalNewsForm";
import { GeneralNewsForm } from "~/modules/GeneralNewsForm";
import { SeoNewsForm } from "~/modules/SeoNewsForm";
import { TabsForm } from "~/shared/components/TabsForm";
import { useNavigate } from "react-router-dom";
import { useNewsByIdQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";

type Props = {
  id?: number;
};

type Form = UseFormReturn<Record<string, unknown>, unknown>;

export const NewsDetailsForm: React.FC<Props> = ({ id }) => {
  const [forms, setForms] = useState<Record<string, Form>>();

  const [step, setStep] = useState(0);

  const history = useNavigate();

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data } = useNewsByIdQuery(client, { id: `${id}` }, { enabled: !isCreateMode });

  const values = data?.newsById;

  const updateForm = useCallback((step: number, form: Form) => {
    setForms((oldForms) => ({ ...oldForms, [step]: form }));
  }, []);

  const handleSubmit = () => {
    let result = {};

    Object.values(forms ?? {}).forEach((form, i) => {
      form.handleSubmit(
        (values) => {
          result = { ...result, ...values };
        },
        () => {
          setStep(i);
        }
      );
    });

    return null;
  };

  const handleGoBack = useCallback(() => {
    history(-1);
  }, [history]);

  return (
    <TabsForm
      handleSubmit={handleSubmit}
      handleStepChange={setStep}
      activeStep={step}
      handleBack={handleGoBack}
      forms={[
        {
          tabTitle: "General data",
          component: (
            <GeneralNewsForm
              defaultValues={{
                name: values?.name,
                description: values?.description ?? "",
                content: values?.content ?? "",
                image: values?.image?.url ?? ""
              }}
              step={0}
              onUpdateForm={updateForm}
            />
          )
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
