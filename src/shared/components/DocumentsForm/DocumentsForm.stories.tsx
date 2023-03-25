import React from "react";
import { useForm, UseFormGetValues } from "react-hook-form";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentsForm } from "./DocumentsForm";

export default {
  title: "shared/components/DocumentsForm",
  component: DocumentsForm,
  argTypes: {
    setValue: { action: true },
    getValues: { action: true }
  }
} as ComponentMeta<typeof DocumentsForm>;

const Template: ComponentStory<typeof DocumentsForm> = (props) => {
  const form = useForm();
  return (
    <DocumentsForm
      {...props}
      {...form}
      setValue={(...args) => {
        form.setValue(...args);
        props.setValue(...args);
      }}
      getValues={
        ((arg: any) => {
          props.getValues(arg);
          return form.getValues(arg);
        }) as UseFormGetValues<any>
      }
    />
  );
};

export const Default = Template.bind({});
