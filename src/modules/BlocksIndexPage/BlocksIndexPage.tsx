import React from "react";
import { Control, FieldErrors, UseFormGetValues } from "react-hook-form";
import { BannerFields, Banner } from "./components";

type IndexPageFormFields = BannerFields;

type Props = {
  errors?: FieldErrors<IndexPageFormFields>;
  setValue?: (name: keyof IndexPageFormFields, value: unknown) => void;
  getValues?: UseFormGetValues<IndexPageFormFields>;
  control?: Control<IndexPageFormFields, unknown>;
};

export const BlocksIndexPage: React.FC<Props> = ({ errors, setValue, getValues, control }) => {
  return (
    <>
      <Banner errors={errors} getValues={getValues} control={control} setValue={setValue} />
    </>
  );
};
