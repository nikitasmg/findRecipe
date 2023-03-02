import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  EventInput,
  useCreateEventMutation,
  useEventByIdQuery,
  useUpdateEventMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { initFormValues } from "~/shared/lib/initFormValues";

type Props = {
  id?: number;
};

export const EventsDetailsForm: React.FC<Props> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useEventByIdQuery(
    client,
    { id: `${id}` },
    { enabled: !isCreateMode }
  );

  const { mutateAsync: createEvent, isLoading: isCreateLoading } = useCreateEventMutation(client);

  const { mutateAsync: updateEvent, isLoading: isUpdateLoading } = useUpdateEventMutation(client);

  const values = data?.eventById;

  const isLoading = isCreateLoading || isUpdateLoading;

  const { handleSubmit, setValue } = useForm({ mode: "all" });

  const onSubmit = handleSubmit((newValues) => {
    const input: EventInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues
    };

    if (isCreateMode) {
      createEvent({ input });
      return;
    }

    updateEvent({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues([], setValue, values);
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <Button
        startIcon={<SaveIcon />}
        disabled={isLoading}
        type='submit'
        variant='contained'
        size='small'
      >
        Save
      </Button>
    </form>
  );
};
