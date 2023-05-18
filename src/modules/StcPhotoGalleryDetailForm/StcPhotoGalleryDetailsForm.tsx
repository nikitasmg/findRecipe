import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, TextField } from "@mui/material";
import {
  StcPhotoGalleryInput,
  useCreateStcPhotoGalleryMutation,
  useStcPhotoGalleryByIdQuery,
  useUpdateStcPhotoGalleryMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { baseRequired } from "~/shared/lib/validation";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { ImageInput } from "~/shared/components/ImageInput";
import { useAlertsStore } from "~/shared/stores/alerts";
import { NumericInput } from "~/shared/components/NumericInput";
import { useStcPhotoGalleryStore } from "~stores/stcPhotoGallery";

interface StcPhotoGalleryDetailsProps {
  lang: Languages;
  id?: number;
  formName?: string;
}

export const StcPhotoGalleryDetailsForm: React.FC<StcPhotoGalleryDetailsProps> = ({
  id,
  lang,
  formName
}) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useStcPhotoGalleryStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

  const { data, isSuccess } = useStcPhotoGalleryByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const addAlert = useAlertsStore((state) => state.addAlert);

  const goBack = useNavigationBack();

  const values = data?.stcPhotoGalleryById;

  const { mutateAsync: createStcPhotoGallery, isLoading: isCreateLoading } =
    useCreateStcPhotoGalleryMutation(client, { onSuccess: goBack });

  const { mutateAsync: updateStcPhotoGallery, isLoading: isUpdateLoading } =
    useUpdateStcPhotoGalleryMutation(client, { onSuccess: goBack });

  const isLoading = isCreateLoading || isUpdateLoading;

  useEffect(() => {
    setIsSaveLoading(isLoading);
  }, [isLoading, setIsSaveLoading]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit((newValues) => {
    const { imageUrl, ...preparedValues } = newValues;
    console.log(imageUrl);
    const input: StcPhotoGalleryInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...preparedValues,
      sort: newValues.sort ? Number(newValues.sort) : 0
    };

    if (isCreateMode) {
      createStcPhotoGallery({ input });
      return;
    }

    updateStcPhotoGallery({ input });
  });

  const isRuLang = lang === "ru";

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      ["name", "name_en", "imageUrl", "description", "description_en"],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <form id={formName} onSubmit={onSubmit} className='w-full flex flex-col mt-4'>
      <Box className='flex flex-col lg:flex-row gap-10'>
        <Box className='flex flex-col gap-10 grow-[2] lg:w-[70%] order-last'>
          {isRuLang && (
            <Controller
              control={control}
              name='name'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={
                      <RequiredLabelWrapper>
                        <Text>Heading</Text>
                      </RequiredLabelWrapper>
                    }
                    value={value ?? ""}
                    error={!!getError("name")}
                    {...register("name", {
                      ...baseRequired,
                      maxLength: { value: 500, message: "Max length text field 500" }
                    })}
                  />

                  <HelperText id='name' error={getError("name")} />
                </FormControl>
              )}
            />
          )}

          {!isRuLang && (
            <Controller
              control={control}
              name='name_en'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={
                      <EnLabelWrapper>
                        <Text>Heading</Text>
                      </EnLabelWrapper>
                    }
                    value={value ?? ""}
                    error={!!getError("name_en")}
                    {...register("name_en", {
                      maxLength: { value: 500, message: "Max length text field 500" }
                    })}
                  />

                  <HelperText id='name_en' error={getError("name_en")} />
                </FormControl>
              )}
            />
          )}

          {isRuLang && (
            <Controller
              control={control}
              name='description'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={
                      <RequiredLabelWrapper>
                        <Text>Description</Text>
                      </RequiredLabelWrapper>
                    }
                    value={value ?? ""}
                    error={!!getError("description")}
                    {...register("description", {
                      ...baseRequired,
                      maxLength: { value: 500, message: "Max length text field 500" }
                    })}
                  />

                  <HelperText id='description' error={getError("description")} />
                </FormControl>
              )}
            />
          )}

          {!isRuLang && (
            <Controller
              control={control}
              name='description_en'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={
                      <EnLabelWrapper>
                        <Text>Description</Text>
                      </EnLabelWrapper>
                    }
                    value={value ?? ""}
                    error={!!getError("description_en")}
                    {...register("description_en", {
                      maxLength: { value: 500, message: "Max length text field 500" }
                    })}
                  />

                  <HelperText id='description_en' error={getError("description_en")} />
                </FormControl>
              )}
            />
          )}

          <Controller
            control={control}
            name='sort'
            render={({ field }) => (
              <FormControl fullWidth>
                <NumericInput label={<Text>Sorting</Text>} {...register("sort")} {...field} />

                <HelperText id='sort' error={getError("sort")} />
              </FormControl>
            )}
          />
        </Box>

        <Box className='grow-[1] flex justify-center lg:w-[30%] order-first lg:order-last'>
          <Controller
            control={control}
            name='imageUrl'
            render={({ field: { value } }) => (
              <ImageInput
                id='imageUrl'
                addAlert={addAlert}
                url={value}
                {...register("imageUrl")}
                onChange={(file) => {
                  setValue("uploadImage", file);
                }}
                onDelete={() => {
                  setValue("deleteImage", true);
                  setValue("imageUrl", null);
                }}
              />
            )}
          />
        </Box>
      </Box>
    </form>
  );
};
