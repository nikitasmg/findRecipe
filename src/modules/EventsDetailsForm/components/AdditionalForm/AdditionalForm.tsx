import { Box } from "@mui/material";
import React from "react";
import { curry } from "rambda";
import { Control, Controller } from "react-hook-form";
import { Organizer, Partner } from "~/generated/graphql";
import { Member } from "../Member/Member";

export type AdditionalFormFields = {
  partners?: Partner[];
  organizers?: Organizer[];
};

type Props = {
  setValue: (name: keyof AdditionalFormFields, value: Partner[] | Organizer[] | undefined) => void;
  control?: Control<AdditionalFormFields, unknown>;
};

export const AdditionalForm: React.FC<Props> = ({ setValue, control }) => {
  const getInitMemberValue = (members?: (Partner | Organizer)[]) =>
    members?.map((member) => ({ name: member.name ?? "", avatarUrl: member.imageUrl ?? "" })) ?? [];

  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <Controller
        control={control}
        name='partners'
        render={({ field: { value } }) => (
          <Member
            title='Partners'
            attachTitle='Attach partner'
            value={getInitMemberValue(value)}
            onChange={curry(setValue)("partners")}
          />
        )}
      />

      <Controller
        control={control}
        name='organizers'
        render={({ field: { value } }) => (
          <Member
            title='Organizers'
            attachTitle='Attach organizer'
            value={getInitMemberValue(value)}
            onChange={curry(setValue)("organizers")}
          />
        )}
      />
    </Box>
  );
};
