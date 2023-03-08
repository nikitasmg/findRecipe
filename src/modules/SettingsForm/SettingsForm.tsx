import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
import { Text } from "~shared/components/Text";
import { TabsForm } from "~/shared/components/TabsForm";

type FormFields = FormFieldsContacts & FormFieldsApiKeys & FormFieldsNotification;

export const SettingsTabs = () => {
  const [step, setStep] = useState(0);

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
  } = useForm<FormFields>({ mode: "all" });

  const onSubmit = handleSubmit((fields: UpdateSettingsMutationVariables) => {
    saveSettings(fields);
  });

  const isLoading = loadingQuery || loadingMutation;

  useEffect(() => {
    if (settings) {
      settings.forEach((field) => {
        setValue(field.name as keyof FormFieldsContacts, field.value || "");
      });
    }
  }, [setValue, settings]);

  return (
    <Box className='relative'>
      <Text component='h1' variant='h6'>
        Settings Edit
      </Text>

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
