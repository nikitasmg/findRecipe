import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  NewsTag,
  useCreateNewsMutation,
  useNewsByIdQuery,
  useUpdateNewsMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TabsForm } from "~/shared/components/TabsForm";
import { initFormValues } from "~/shared/lib/initFormValues";
import { NewsPageRoute } from "~/shared/routes";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { AdditionalNewsForm } from "./components/AdditionalNewsForm";
import { GeneralNewsForm } from "./components/GeneralNewsForm";
import { prepareFormData } from "./lib/prepareFormData";
import { either, has, isEmpty } from "rambda";
import { useAlertsStore } from "~/shared/stores/alerts";
import { SeoForm } from "../../shared/components/SeoForm";
import { useNewsStore } from "~stores/news";

type Props = {
  lang: Languages;
  id?: number;
  formName?: string;
};

const getTagsValue = (value?: NewsTag[] | null): number[] => value?.map((tag) => tag?.id) ?? [];

export const NewsDetailsForm: React.FC<Props> = ({ id, lang, formName }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useNewsStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

  const addAlert = useAlertsStore((state) => state.addAlert);

  const { data, isSuccess } = useNewsByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always", cacheTime: 0 }
  );

  const goBack = useNavigationBack();

  const { mutateAsync: createNews, isLoading: isCreateLoading } = useCreateNewsMutation(client, {
    onSuccess: goBack
  });

  const { mutateAsync: updateNews, isLoading: isUpdateLoading } = useUpdateNewsMutation(client, {
    onSuccess: goBack
  });

  const values = data?.newsById;

  const isLoading = isCreateLoading || isUpdateLoading;

  useEffect(() => {
    setIsSaveLoading(isLoading);
  }, [isLoading, setIsSaveLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    control,
    setError
  } = useForm({
    mode: "all"
  });

  const onSubmit = handleSubmit((newValues) => {
    prepareFormData(newValues, values, { isCreateMode, touchedFields }).then((input) => {
      if (isCreateMode) {
        createNews({ input });
        return;
      }

      updateNews({ input });
    });
  });

  useEffect(() => {
    setValue("published_at", values?.published_at || dayjs().toISOString());

    if (!isSuccess) {
      return;
    }

    initFormValues(
      [
        "name",
        "name_en",
        "description",
        "description_en",
        "content",
        "content_en",
        "source",
        "image_description",
        "image_description_en",
        "source_name",
        "source_name_en",
        "published",
        "published_at",
        ["category", { key: "category.id" }],
        [
          "tags",
          {
            format: getTagsValue
          }
        ],
        "imageUrl",
        "on_index",
        "documents",
        "uploadImage"
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
  }, [values, isSuccess, setValue]);

  useEffect(() => {
    if (!isEmpty(errors)) {
      addAlert("error", "Fill in all required fields");
    }
  }, [errors, step, addAlert]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={NewsPageRoute}
      activeStep={step}
      isLoading={isLoading}
      formName={formName}
      forms={[
        {
          tabTitle: "General data",
          hasErrors: either(has("name"), has("content"))(errors),
          component: (
            <GeneralNewsForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
              lang={lang}
            />
          )
        },
        {
          tabTitle: "Additional data",
          hasErrors: has("published_at")(errors),
          component: (
            <AdditionalNewsForm
              setValue={setValue}
              errors={errors}
              register={register}
              control={control}
              setError={setError}
              lang={lang}
            />
          )
        },
        {
          tabTitle: "SEO",
          component: <SeoForm errors={errors} register={register} control={control} lang={lang} />
        }
      ]}
    />
  );
};
