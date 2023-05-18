import { FormControl } from "@mui/material";
import React, { useState } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useContestsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~/shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";
import { useParams } from "react-router-dom";

type Field = {
  number?: number;
};

type Props = {
  register: UseFormRegister<Field>;
  errors: FieldErrors<Field>;
  setValue: (name: keyof Field, value: string | number) => void;
  control?: Control<Field, unknown>;
};

export const NumberField: React.FC<Props> = ({ errors, register, setValue, control }) => {
  const params = useParams<{ id: string }>();

  const [number, setNumber] = useState<number>();

  const getError = getErrorMessage(errors);

  const client = useGraphqlClient();

  const { data } = useContestsQuery(
    client,
    { filter: [{ column: "number", value: String(number) }] },
    { enabled: Number.isInteger(number) }
  );

  const contests = data?.contests?.data;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = Number(e.target.value);
    setNumber(newValue);
    setValue("number", newValue);
  };

  return (
    <Controller
      control={control}
      name='number'
      render={({ field: { value } }) => (
        <FormControl fullWidth>
          <NumericInput
            error={getError("number")}
            label={
              <RequiredLabelWrapper>
                <Text>Number</Text>
              </RequiredLabelWrapper>
            }
            value={Number(value)}
            {...register("number", {
              ...baseRequired,
              validate: {
                exist: (value) =>
                  contests?.find(
                    (contest) => contest.id !== Number(params.id) && contest.number === value
                  )
                    ? "Already exist"
                    : true
              }
            })}
            onChange={handleChange}
          />

          <HelperText id='number' error={getError("number")} />
        </FormControl>
      )}
    />
  );
};
