import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextareaAutosize,
  TextField
} from "@mui/material";
import {
  PurchaseInput,
  useCreatePurchaseMutation,
  usePurchaseByIdQuery,
  useUpdatePurchaseMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { LinkInput } from "~/shared/components/LinkInput";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { SaveButton } from "~/shared/components/SaveButton";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";

interface PurchasesDetailsFormProps {
  lang: Languages;
  id?: number;
}

export const PurchasesDetailsForm: React.FC<PurchasesDetailsFormProps> = ({ id, lang }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = usePurchaseByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const goBack = useNavigationBack();

  const values = data?.purchaseById;

  const { mutateAsync: createPurchase, isLoading: isCreateLoading } = useCreatePurchaseMutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: updatePurchase, isLoading: isUpdateLoading } = useUpdatePurchaseMutation(
    client,
    { onSuccess: goBack }
  );

  const isLoading = isCreateLoading || isUpdateLoading;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit((newValues) => {
    const input: PurchaseInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      sort: newValues.sort ? Number(newValues.sort) : 0
    };

    if (isCreateMode) {
      createPurchase({ input });
      return;
    }

    updatePurchase({ input });
  });

  const isRusLang = lang === "ru";

  useEffect(() => {
    if (!isSuccess) {
      setValue("published", true);
      return;
    }

    initFormValues(["name", "name_en", "url", "sort", "published"], setValue, values);
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
          {isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='name'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      fullWidth
                      value={value}
                      error={getError("name")}
                      label={
                        <RequiredLabelWrapper>
                          <Text>Title</Text>
                        </RequiredLabelWrapper>
                      }
                      InputProps={{
                        inputComponent: TextareaAutosize
                      }}
                      {...register("name", baseRequiredTextValidation)}
                    />

                    <HelperText id='name' error={getError("name")} />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {!isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='name_en'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      fullWidth
                      value={value}
                      label={
                        <EnLabelWrapper>
                          <Text>Title</Text>
                        </EnLabelWrapper>
                      }
                      InputProps={{
                        inputComponent: TextareaAutosize
                      }}
                      {...register("name_en")}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Controller
              control={control}
              name='url'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <LinkInput
                    label={<Text>Link</Text>}
                    value={value}
                    type='url'
                    error={!!getError("url")}
                    {...register("url")}
                    onChange={(e) => setValue("url", e.target.value)}
                  />

                  <HelperText id='url' error={getError("url")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='published'
              render={({ field: { value } }) => (
                <FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!value}
                        onChange={(event) => setValue("published", event.target.checked)}
                      />
                    }
                    label={<Text>Published</Text>}
                  />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className='w-full flex'>
        <SaveButton className='w-fit ml-auto' disabled={isLoading} />
      </Box>
    </form>
  );
};
