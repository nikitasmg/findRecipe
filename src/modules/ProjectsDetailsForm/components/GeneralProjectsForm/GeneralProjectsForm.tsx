import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ContestsSelect } from "~/modules/ProjectsDetailsForm/components/ContestsSelect";
import { useKnowledgeFieldsQuery } from "~/generated/graphql";
import { baseRequiredTextValidation } from "~shared/lib/validation";

type FormFields = {
  name?: string;
  contest?: string;
  knowledge_field?: string;
  number?: string;
  leader?: string;
  organization?: string;
  deadline?: string;
  grnti_number?: string;
  status_text?: string;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};

export const GeneralProjectsForm: React.FC<Props> = ({ register, errors, setValue, control }) => {
  const getError = getErrorMessage(errors);

  const client = useGraphqlClient();

  const { data: knowledgeFields } = useKnowledgeFieldsQuery(
    client,
    {},
    { refetchOnMount: "always" }
  );

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='number'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Number</Text>}
                    value={value}
                    variant='outlined'
                    id='number'
                    error={!!getError("number")}
                    {...register("number")}
                  />

                  <HelperText id='number' error={getError("number")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='name'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Title</Text>}
                    value={value}
                    variant='outlined'
                    id='name'
                    error={!!getError("name")}
                    {...register("name", baseRequiredTextValidation)}
                  />

                  <HelperText id='name' error={getError("name")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='leader'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Leader</Text>}
                    value={value}
                    variant='outlined'
                    id='leader'
                    error={!!getError("leader")}
                    {...register("leader")}
                  />

                  <HelperText id='leader' error={getError("leader")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='organization'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Organization</Text>}
                    value={value}
                    variant='outlined'
                    id='organization'
                    error={!!getError("organization")}
                    {...register("organization")}
                  />

                  <HelperText id='organization' error={getError("organization")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='deadline'
              render={({ field: { value } }) => (
                <FormControl error={getError("deadline")} fullWidth>
                  <DatePicker
                    className='w-full'
                    views={["year"]}
                    label={<Text>Period of execution</Text>}
                    value={value ? new Date(`${value}`) : null}
                    onChange={(value) => {
                      setValue("deadline", new Date(value as Date).getFullYear());
                    }}
                    renderInput={(props) => (
                      <TextField {...props} variant='outlined' size='small' />
                    )}
                  />

                  <HelperText id='deadline' error={getError("deadline")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name='contest'
                render={({ field: { value, onChange } }) => {
                  const currentValue = value as unknown as number;
                  return <ContestsSelect onFormChange={onChange} initValue={currentValue} />;
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name='knowledge_field'
                render={({ field: { value = [], onChange } }) => (
                  <TextField
                    select
                    name='knowledge_field'
                    id='knowledge_field'
                    variant='outlined'
                    label={<Text>Knowledge field</Text>}
                    SelectProps={{
                      value: `${value}`,
                      onChange: onChange
                    }}
                  >
                    <MenuItem key={"empty"} value={""}>
                      <Text>Not selected</Text>
                    </MenuItem>
                    {knowledgeFields?.knowledgeFields.map((knowledgeField) => (
                      <MenuItem key={`${knowledgeField.id}`} value={`${knowledgeField.id}`}>
                        {knowledgeField.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='grnti_number'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>GRNTI code</Text>}
                    value={value}
                    variant='outlined'
                    id='grnti_number'
                    error={!!getError("grnti_number")}
                    {...register("grnti_number")}
                  />

                  <HelperText id='grnti_number' error={getError("grnti_number")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='status_text'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Status</Text>}
                    value={value}
                    variant='outlined'
                    id='status_text'
                    error={!!getError("status_text")}
                    {...register("status_text")}
                  />

                  <HelperText id='status_text' error={getError("status_text")} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
