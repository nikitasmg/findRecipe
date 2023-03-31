import React from "react";
import { Control, FieldErrors, UseFormGetValues } from "react-hook-form";
import { Languages } from "~/shared/types/Languages";
import { BannerFields, Banner } from "./components";

type IndexPageFormFields = BannerFields;

type Props = {
  lang: Languages;
  errors?: FieldErrors<IndexPageFormFields>;
  setValue?: (name: keyof IndexPageFormFields, value: unknown) => void;
  getValues?: UseFormGetValues<IndexPageFormFields>;
  control?: Control<IndexPageFormFields, unknown>;
};

export const BlocksIndexPage: React.FC<Props> = ({
  errors,
  setValue,
  getValues,
  control,
  lang
}) => {
  return (
    <>
      <Banner
        lang={lang}
        errors={errors}
        getValues={getValues}
        control={control}
        setValue={setValue}
      />
    </>
  );
};
