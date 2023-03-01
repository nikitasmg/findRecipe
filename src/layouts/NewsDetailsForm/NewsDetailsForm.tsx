import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { AdditionalNewsForm } from "~/modules/AdditionalNewsForm";
import { GeneralNewsForm } from "~/modules/GeneralNewsForm";
import { SeoNewsForm } from "~/modules/SeoNewsForm";
import { TabsForm } from "~/shared/components/TabsForm";
import {
  NewsInput,
  NewsTag,
  useCreateNewsMutation,
  useNewsByIdQuery,
  useUpdateNewsMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { initFormValues } from "~/shared/lib/initFormValues";

type Props = {
  id?: number;
};

const getTagsValue = (value?: NewsTag[] | null): string[] =>
  value?.map((tag) => tag?.id ?? "") ?? [];

export const NewsDetailsForm: React.FC<Props> = ({ id }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useNewsByIdQuery(client, { id: `${id}` }, { enabled: !isCreateMode });

  const { mutateAsync: createNews, isLoading: isCreateLoading } = useCreateNewsMutation(client);

  const { mutateAsync: updateNews, isLoading: isUpdateLoading } = useUpdateNewsMutation(client);

  const values = data?.newsById;

  const isLoading = isCreateLoading || isUpdateLoading;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    control
  } = useForm({ mode: "all" });

  const onSubmit = handleSubmit((newValues) => {
    const input: NewsInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      published_at: dayjs(newValues.published_at).toISOString(),
      ...(isCreateMode && { published: touchedFields.published ? newValues.published : true }),
      category: { connect: newValues.category },
      tags: { connect: newValues.tags }
    };

    if (isCreateMode) {
      createNews({ input });
      return;
    }

    updateNews({ input });
  });

  useEffect(() => {
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
        "on_index",
        "uploadImage"
      ],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
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
