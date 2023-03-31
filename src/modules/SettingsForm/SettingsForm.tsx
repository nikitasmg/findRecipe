import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useForm } from "react-hook-form";
import {
  useSettingsQuery,
  useUpdateSettingsMutation,
  UpdateSettingsMutationVariables
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  ContactSettingsForm,
  FormFieldsContacts
} from "~/modules/SettingsForm/components/ContactSettingsForm";
import {
  ApiKeysSettingsForm,
  FormFieldsApiKeys
} from "~/modules/SettingsForm/components/ApiKeysSettingsForm";
import {
  NotificationSettingsForm,
  FormFieldsNotification
} from "~/modules/SettingsForm/components/NotificationSettingsForm";

import { LinkButton } from "../../shared/components/LinkButton";
import {
  FormFieldsSocial,
  SocialSettingsForm
} from "~/modules/SettingsForm/components/SocialSettingsForm";
import { Text } from "~shared/components/Text";
import { TabsForm } from "~/shared/components/TabsForm";
import { useModal } from "~/shared/hooks/useModal";

export type FormFields = FormFieldsContacts &
  FormFieldsApiKeys &
  FormFieldsNotification &
  FormFieldsSocial;

export const SettingsTabs = () => {
  const [step, setStep] = useState(0);

  const { open, handleOpen, handleClose } = useModal();

  const client = useGraphqlClient();

  const { mutateAsync: saveSettings, isLoading: loadingMutation } =
    useUpdateSettingsMutation(client);

  const { data: { settings } = {}, isLoading: loadingQuery } = useSettingsQuery(
    client,
    {},
    {
      refetchOnMount: "always"
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<FormFields>({
    mode: "all"
  });

  const handleOpenForm = useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  const handleCloseForm = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const onSubmit = handleSubmit((fields: UpdateSettingsMutationVariables) => {
    saveSettings(fields);
    handleCloseForm();
  });

  const isLoading = loadingQuery || loadingMutation;

  useEffect(() => {
    if (!settings) {
      return;
    }
    settings.forEach((field) => {
      setValue(field.name as keyof FormFields, field.value || "");
    });
  }, [setValue, settings]);

  return (
    <Box className='relative'>
      <Box className='flex items-stretch justify-between gap-2 flex-col h-9 sm:flex-row'>
        <Text component='h1' variant='h6'>
          Settings Edit
        </Text>
        {step === 1 && (
          <LinkButton variant='outlined' onClick={handleOpenForm} startIcon={<AddBoxRoundedIcon />}>
            Add
          </LinkButton>
        )}
      </Box>

      <Box className='mt-4'>
        <TabsForm
          handleSubmit={onSubmit}
          handleStepChange={setStep}
          activeStep={step}
          isLoading={isLoading}
          forms={[
            {
              tabTitle: "Contacts",
              component: (
                <ContactSettingsForm
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  control={control}
                />
              )
            },
            {
              tabTitle: "Social",
              component: (
                <SocialSettingsForm
                  handleOpenForm={handleOpenForm}
                  handleCloseForm={handleCloseForm}
                  open={open}
                  register={register}
                  handleSubmit={onSubmit}
                  setValue={setValue}
                  control={control}
                />
              )
            },
            {
              tabTitle: "API-keys",
              component: <ApiKeysSettingsForm register={register} control={control} />
            },
            {
              tabTitle: "Notification",
              component: <NotificationSettingsForm register={register} control={control} />
            }
          ]}
        />
      </Box>
    </Box>
  );
};
