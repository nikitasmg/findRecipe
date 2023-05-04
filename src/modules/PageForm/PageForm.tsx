import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as R from "rambda";
import { useForm, UseFormReturn } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { usePageBySlugQuery, useUpdatePageMutation } from "~/generated/graphql";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { TabsForm } from "~/shared/components/TabsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { useLang } from "~/shared/hooks/useLang";
import { initFormValues } from "~/shared/lib/initFormValues";
import { PagesRoute } from "~/shared/routes";
import { Languages } from "~/shared/types/Languages";
import { LinkedDocumentForm } from "../LinkedDocumentForm";
import { BlocksForm } from "./components/BlocksForm";
import { GeneralPageForm } from "./components/GeneralPageForm";
import { SeoForm } from "./components/SeoForm";
import { StcTechnologiesForm } from "./components/StcTechnologiesForm";
import { AboutProjectForm } from "./components/AboutProjectForm";
import { AdditionalTabForm } from "./components/AdditionalTabForm";
import { InfoBlockCardsForm } from "./components/InfoBlockCardsForm/InfoBlockCardsForm";
import { VideoPresentationForm } from "./components/VideoPresentationForm";
import { useAlertsStore } from "~/shared/stores/alerts";

type Props = {
  slug: string;
  isDocumentsExist?: boolean;
  isVideoPresentation?: boolean;
  isAboutProject?: boolean;
  isAdditionalTab?: boolean;
  additionalTabTitle?: string;
  isInfoBlockCards?: boolean;
  isStcTechnologiesSection?: boolean;
  render?: (form: Partial<UseFormReturn>, lang: Languages) => JSX.Element;
};

export const PageForm: React.FC<Props> = ({
  slug,
  render,
  isDocumentsExist,
  isVideoPresentation,
  isAboutProject,
  isAdditionalTab,
  isInfoBlockCards,
  additionalTabTitle = "Additional description",
  isStcTechnologiesSection
}) => {
  const [step, setStep] = useState(0);

  const { lang, setLang } = useLang();

  const form = useForm({ mode: "onBlur" });

  const addAlert = useAlertsStore((state) => state.addAlert);

  const {
    handleSubmit,
    setValue,
    control,
    register,
    getValues,
    formState: { errors }
  } = form;

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
      name_en: newValues.name_en,
      description_en: newValues.description_en,
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
      [
        "name",
        "description",
        "name_en",
        "description_en",
        "imageUrl",
        "params",
        "parent_id",
        "gallery"
      ],
      setValue,
      values
    );
    setValue("seo.upsert.title", values?.seo?.title || values?.meta?.auto_title);
    setValue("seo.upsert.description", values?.seo?.description || values?.meta?.auto_description);
    setValue("seo.upsert.title_en", values?.seo?.title_en || values?.meta?.auto_title_en);
    setValue(
      "seo.upsert.description_en",
      values?.seo?.description_en || values?.meta?.auto_description_en
    );
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

  useEffect(() => {
    if (
      R.hasPath(["params", "VideoPresentation"], errors) ||
      R.hasPath(["params", "StcTechnologies"], errors)
    ) {
      addAlert("error", "Fill in all required fields");
    }
  }, [addAlert, errors, step]);

  const getForms = () => {
    const forms: {
      tabTitle: string;
      component: JSX.Element;
      hasErrors?: boolean;
    }[] = [
      {
        tabTitle: "General data",
        component: (
          <GeneralPageForm
            setValue={setValue}
            errors={errors}
            register={register}
            control={control}
            lang={lang}
          />
        )
      }
    ];

    if (render) {
      forms.push({
        tabTitle: "Blocks",
        component: <BlocksForm lang={lang} form={form} render={render} />
      });
    }
    if (isAboutProject) {
      forms.push({
        tabTitle: "About project",
        component: (
          <AboutProjectForm control={control} setValue={setValue} lang={lang} register={register} />
        )
      });
    }
    if (isAdditionalTab) {
      forms.push({
        tabTitle: additionalTabTitle,
        component: (
          <AdditionalTabForm
            control={control}
            setValue={setValue}
            lang={lang}
            register={register}
          />
        )
      });
    }

    if (isInfoBlockCards) {
      forms.push({
        tabTitle: "Info blocks",
        component: (
          <InfoBlockCardsForm
            control={control}
            setValue={setValue}
            lang={lang}
            register={register}
          />
        )
      });
    }
    if (isVideoPresentation) {
      forms.push({
        tabTitle: "Video presentation",
        hasErrors: R.hasPath(["params", "VideoPresentation"], errors),
        component: (
          <VideoPresentationForm
            control={control}
            setValue={setValue}
            lang={lang}
            register={register}
            errors={errors}
          />
        )
      });
    }

    if (isStcTechnologiesSection) {
      forms.push({
        tabTitle: "Center for High Biomedical Technologies",
        hasErrors: R.hasPath(["params", "StcTechnologies"], errors),
        component: (
          <StcTechnologiesForm
            control={control}
            setValue={setValue}
            lang={lang}
            register={register}
            errors={errors}
          />
        )
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
      component: <SeoForm errors={errors} register={register} control={control} lang={lang} />
    });

    return forms;
  };

  return (
    <Box className='flex flex-col gap-6 p-4'>
      <DetailsHead title='Edit page' onBackClick={goBack} onLangChange={setLang} />
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
