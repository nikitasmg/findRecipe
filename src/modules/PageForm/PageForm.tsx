import React, { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { usePageBySlugQuery, useUpdatePageMutation } from "~/generated/graphql";
import { TabsForm } from "~/shared/components/TabsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { initFormValues } from "~/shared/lib/initFormValues";
import { PagesRoute } from "~/shared/routes";
import { LinkedDocumentForm } from "../LinkedDocumentForm";
import { BlocksForm } from "./components/BlocksForm";
import { GeneralPageForm } from "./components/GeneralPageForm";
import { SeoForm } from "./components/SeoForm";

type Props = {
  slug: string;
  isDocumentsExist?: boolean;
  render?: (form: Partial<UseFormReturn>) => JSX.Element;
};

export const PageForm: React.FC<Props> = ({ slug, render, isDocumentsExist }) => {
  const [step, setStep] = useState(0);

  const {
    handleSubmit,
    setValue,
    control,
    register,
    getValues,
    formState: { errors }
  } = useForm();

  const goBack = useNavigationBack();

  const client = useGraphqlClient();

  const { data } = usePageBySlugQuery(client, { slug }, { refetchOnMount: "always" });

  const { mutateAsync: updatePage, isLoading } = useUpdatePageMutation(client, {
    onSuccess: goBack
  });

  const values = data?.pageBySlug;

  const onSubmit = handleSubmit((newValues) => {
    const input = {
      id: values?.id,
      name: newValues.name,
      description: newValues.description,
      params: JSON.stringify(newValues.params),
      parent_id: newValues.parent_id,
      uploadImage: newValues.uploadImage,
      ...(Boolean(newValues.deleteImage) && { deleteImage: true })
    };

    updatePage({ input });
  });

  useEffect(() => {
    initFormValues(["name", "description", "imageUrl", "params", "parent_id"], setValue, values);
    setValue("seo.upsert.title", values?.seo?.title || values?.meta?.auto_title);
    setValue("seo.upsert.description", values?.seo?.description || values?.meta?.auto_description);
    setValue(
      "children",
      values?.children?.map((child) => child?.id)
    );

    if (values?.params) {
      setValue("params", JSON.parse(values?.params));
    }
  }, [values, setValue]);

  const getForms = () => {
    const forms = [
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
      }
    ];

    if (render) {
      forms.push({
        tabTitle: "Blocks",
        component: <BlocksForm setValue={setValue} control={control} render={render} />
      });
    }

    if (isDocumentsExist) {
      forms.push({
        tabTitle: "Documents",
        component: (
          <LinkedDocumentForm getValues={getValues} setValue={setValue} control={control} />
        )
      });
    }

    forms.push({
      tabTitle: "SEO",
      component: <SeoForm errors={errors} register={register} control={control} />
    });

    return forms;
  };

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={PagesRoute}
      activeStep={step}
      isLoading={isLoading}
      forms={getForms()}
    />
  );
};
