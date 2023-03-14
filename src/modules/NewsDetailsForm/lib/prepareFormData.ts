import dayjs from "dayjs";
import { compose, not, prop } from "rambda";
import { DeepPartial } from "react-hook-form";
import { News, NewsInput } from "~/generated/graphql";

export const prepareFormData = async (
  newValues: Partial<
    News &
      NewsInput & {
        category: number;
        tags: number[];
      }
  >,
  values?: DeepPartial<News> | null,
  {
    isCreateMode,
    touchedFields
  }: { isCreateMode?: boolean; touchedFields?: Record<string, unknown> } = {}
) => {
  const input: NewsInput = {
    ...(Boolean(values?.id) && { id: values?.id }),
    published_at: dayjs(newValues.published_at).toISOString(),
    ...(Boolean(isCreateMode) && {
      published: touchedFields?.published ? newValues.published : true
    }),
    name: newValues.name,
    content: newValues.content,
    description: newValues.description,
    on_index: newValues.on_index,
    source: newValues.source,
    source_name: newValues.source_name,
    uploadImage: newValues.uploadImage,
    ...(Boolean(!newValues.imageUrl) && { deleteImage: true }),
    category: {
      ...(Boolean(newValues.category) && { connect: newValues.category }),
      ...(Boolean(!newValues.category) && { disconnect: true })
    },
    tags: {
      ...(Boolean(newValues.tags) && { connect: newValues.tags }),
      ...(Boolean(values?.tags) && {
        disconnect:
          values?.tags
            ?.map(compose(Number, prop("id")))
            .filter((tag) => not(newValues.tags?.includes(tag))) ?? []
      })
    },
    ...(Boolean(!newValues.uploadImage) && { deleteImage: true })
  };

  return input;
};
