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
    name_en: newValues.name_en,
    content_en: newValues.content_en,
    description_en: newValues.description_en,
    on_index: newValues.on_index,
    source: newValues.source,
    source_name: newValues.source_name,
    source_name_en: newValues.source_name_en,
    uploadImage: newValues.uploadImage,
    ...(Boolean(newValues.deleteImage) && { deleteImage: true }),
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
    uploadGalleryImages: newValues.uploadGalleryImages,
    deleteGalleryImages: newValues.deleteGalleryImages,
    updateGallery: newValues.updateGallery
  };

  return input;
};
