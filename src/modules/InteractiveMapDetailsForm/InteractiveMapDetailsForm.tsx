import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateMapObjectMutation, useMapObjectByIdQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TabsForm } from "~/shared/components/TabsForm";
import { initFormValues } from "~/shared/lib/initFormValues";
import { InteractiveMapFormRoute } from "~/shared/routes";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { LinkedDocumentForm } from "../LinkedDocumentForm";
import { GeneralNewsForm } from "./components/GeneralForm";
import { prepareFormData } from "./lib/prepareFormData";

type Props = {
  lang: Languages;
  id?: number;
};

export const InteractiveMapDetailsForm: React.FC<Props> = ({ id, lang }) => {
  const [step, setStep] = useState(0);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useMapObjectByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always", cacheTime: 0 }
  );

  const goBack = useNavigationBack();

  const { mutateAsync: update, isLoading: isUpdateLoading } = useUpdateMapObjectMutation(client, {
    onSuccess: goBack
  });

  const values = data?.mapObjectById;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues
  } = useForm({
    mode: "all"
  });

  const onSubmit = handleSubmit((newValues) => {
    prepareFormData(newValues, { ...values, linked_documents: undefined }).then((input) => {
      update({ input });
    });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      [
        "name",
        "name_en",
        "characteristics",
        "characteristics_en",
        "learn_more",
        "floors",
        "floors_en",
        "gross_boma_area",
        "area"
      ],
      setValue,
      values
    );

    setValue(
      "documents",
      values?.linked_documents
        ?.reduce((res, cur) => {
          if (cur) {
            res.push(cur);
          }

          return res;
        }, Array(0))
        ?.sort((prev, cur) => (prev?.sort ?? 0) - (cur?.sort ?? 0))
    );
  }, [values, isSuccess, setValue]);

  return (
    <TabsForm
      handleSubmit={onSubmit}
      handleStepChange={setStep}
      backHref={InteractiveMapFormRoute}
      activeStep={step}
      isLoading={isUpdateLoading}
      forms={[
        {
          tabTitle: "General data",
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
          tabTitle: "Documents",
          component: (
            <LinkedDocumentForm getValues={getValues} setValue={setValue} control={control} />
          )
        }
      ]}
    />
  );
};
