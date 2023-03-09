import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  News,
  NewsInput,
  NewsTag,
  useCreateNewsMutation,
  useNewsByIdQuery,
  useUpdateNewsMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TabsForm } from "~/shared/components/TabsForm";
import { initFormValues } from "~/shared/lib/initFormValues";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { NewsPageRoute } from "~/shared/routes";
import { AdditionalNewsForm } from "./components/AdditionalNewsForm";
import { GeneralNewsForm } from "./components/GeneralNewsForm";
import { SeoNewsForm } from "./components/SeoNewsForm";
import { OtherNewsForm } from "./components/OtherNewsForm/OtherNewsForm";

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
    control,
    setError
  } = useForm({ mode: "all" });

  const onSubmit = handleSubmit(async (newValues) => {
    const input: NewsInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      published_at: dayjs(newValues.published_at).toISOString(),
      ...(Boolean(isCreateMode) && {
        published: touchedFields.published ? newValues.published : true
      }),
      category: { connect: newValues.category },
      tags: { connect: newValues.tags },
      ...(Boolean(newValues.documents) && {
        uploadDocuments: await Promise.all(
          newValues.documents?.map(
            async (document: { title: string; url: string }, i: number) =>
              ({
                upload: await fileFromBlobUrl(document.url),
                sort: i,
                user_name: document.title
              } || [])
          )
        )
      })
    };

    delete (input as News).documents;
    delete (input as News).imageUrl;

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
        "imageUrl",
        "on_index",
        "documents",
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
        },
        {
          tabTitle: "Other",
          component: <OtherNewsForm setValue={setValue} control={control} />
        }
      ]}
    />
  );
};
