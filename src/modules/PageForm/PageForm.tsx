import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { usePageBySlugQuery, useUpdatePageMutation } from "~/generated/graphql";
import { DetailsHead } from "~/shared/components/DetailsHead";
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

  const { data } = usePageBySlugQuery(client, { slug }, { refetchOnMount: "always", cacheTime: 0 });

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
      ...(Boolean(newValues.deleteImage) && { deleteImage: true }),
      seo: newValues.seo,
      linked_documents: {
        connect: newValues.connectDocuments ?? [],
        disconnect: newValues.disconnectDocuments ?? [],
        syncWithoutDetaching: newValues.updateDocuments ?? []
      },
      uploadGalleryImages: newValues.uploadGalleryImages,
      deleteGalleryImages: newValues.deleteGalleryImages,
      updateGallery: newValues.updateGallery
    };

    updatePage({ input });
  });

  useEffect(() => {
    initFormValues(
      ["name", "description", "imageUrl", "params", "parent_id", "gallery"],
      setValue,
      values
    );
    setValue("seo.upsert.title", values?.seo?.title || values?.meta?.auto_title);
    setValue("seo.upsert.description", values?.seo?.description || values?.meta?.auto_description);
    setValue(
      "children",
      values?.children?.map((child) => child?.id)
    );

    setValue(
      "documents",
      values?.linked_documents
        ?.reduce((res, cur) => {
          if (cur) {
            res.push(cur);
          }

          return res;
        }, Array(0))
        ?.sort((prev, cur) => (prev?.sort ?? 0) - (cur?.sort ?? 0))
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
    <Box className='flex flex-col gap-6 p-4'>
      <DetailsHead title='Edit page' onBackClick={goBack} />
      <TabsForm
        handleSubmit={onSubmit}
        handleStepChange={setStep}
        backHref={PagesRoute}
        activeStep={step}
        isLoading={isLoading}
        forms={getForms()}
      />
    </Box>
  );
};
