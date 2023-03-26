import {
  useCreateOrganizerMutation,
  useCreatePartnerMutation,
  useDeleteOrganizerMutation,
  useDeletePartnerMutation,
  useUpdateOrganizerMutation,
  useUpdatePartnerMutation
} from "~/generated/graphql";

const hooks = {
  organizer: {
    useCreate: useCreateOrganizerMutation,
    useUpdate: useUpdateOrganizerMutation,
    useRemove: useDeleteOrganizerMutation
  },
  partner: {
    useCreate: useCreatePartnerMutation,
    useUpdate: useUpdatePartnerMutation,
    useRemove: useDeletePartnerMutation
  }
};

export const getMemberHooksByName = (name: keyof typeof hooks) => {
  return hooks[name];
};
