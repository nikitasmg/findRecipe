import { Box } from "@mui/material";
import React from "react";
import { curry } from "rambda";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import {
  Organizer,
  OrganizerBelongsToMany,
  OrganizerInput,
  Partner,
  PartnerBelongsToMany,
  PartnerInput
} from "~/generated/graphql";
import { Member } from "../Member";

type UpsertInput = OrganizerInput | PartnerInput;

type Value = Partner[] | Organizer[] | PartnerBelongsToMany | OrganizerBelongsToMany;

export type AdditionalFormFields = {
  partners?: Partner[];
  organizers?: Organizer[];
  partnersBelongs?: PartnerBelongsToMany;
  organizersBelongs?: OrganizerBelongsToMany;
};

type Props = {
  setValue: (name: keyof AdditionalFormFields, value?: Value) => void;
  getValues: UseFormGetValues<AdditionalFormFields>;
  control?: Control<AdditionalFormFields, unknown>;
};

export const AdditionalForm: React.FC<Props> = ({ setValue, getValues, control }) => {
  const getInitMemberValue = (members?: (Partner | Organizer)[]) =>
    members?.map((member) => ({
      id: member.id,
      name: member.name ?? "",
      name_en: member.name_en ?? "",
      imageUrl: member.imageUrl ?? ""
    })) ?? [];

  const getCreateHandler =
    (belongsType: "partnersBelongs" | "organizersBelongs") => (input: UpsertInput) => {
      if (!input.id) {
        return;
      }

      const value = getValues(belongsType) ?? {};

      setValue(belongsType, { ...value, connect: [...(value.connect ?? []), Number(input.id)] });
    };

  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <Controller
        control={control}
        name='partners'
        render={({ field: { value } }) => (
          <Member
            title='Partners'
            memberType='partner'
            attachTitle='Attach partner'
            value={getInitMemberValue(value)}
            onChange={curry(setValue)("partners")}
            onCreateMember={getCreateHandler("partnersBelongs")}
          />
        )}
      />

      <Controller
        control={control}
        name='organizers'
        render={({ field: { value } }) => (
          <Member
            title='Organizers'
            memberType='organizer'
            attachTitle='Attach organizer'
            value={getInitMemberValue(value)}
            onChange={curry(setValue)("organizers")}
            onCreateMember={getCreateHandler("organizersBelongs")}
          />
        )}
      />
    </Box>
  );
};
