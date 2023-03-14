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
import { AdditionalNewsForm } from "./components/AdditionalNewsForm";
import { GeneralNewsForm } from "./components/GeneralNewsForm";
import { SeoNewsForm } from "./components/SeoNewsForm";
import { prepareFormData } from "./lib/prepareFormData";

type Props = {
  id?: number;
};

const getTagsValue = (value?: NewsTag[] | null): number[] => value?.map((tag) => tag?.id) ?? [];

export const NewsDetailsForm: React.FC<Props> = ({ id }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useNewsByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode }
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
        "description",
        "content",
        "source",
        "source_name",
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
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={NewsPageRoute}
      activeStep={step}
      isLoading={isLoading}
      forms={[
        {
          tabTitle: "General data",
          component: (
            <GeneralNewsForm
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
            <AdditionalNewsForm
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
          component: <SeoNewsForm errors={errors} register={register} control={control} />
        }
      ]}
    />
  );
};
