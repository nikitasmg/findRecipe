import React from "react";
import { useForm, UseFormGetValues } from "react-hook-form";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ControlledDocumentsUpload } from "./ControlledDocumentsUpload";

export default {
  title: "shared/components/ControlledDocumentsUpload",
  component: ControlledDocumentsUpload,
  argTypes: {
    setValue: { action: true },
    getValues: { action: true }
  }
} as ComponentMeta<typeof ControlledDocumentsUpload>;

const Template: ComponentStory<typeof ControlledDocumentsUpload> = (props) => {
  const form = useForm();
  return (
    <ControlledDocumentsUpload
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
