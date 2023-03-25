import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm, UseFormGetValues } from "react-hook-form";
import { LinkedDocumentForm } from "./LinkedDocumentForm";

export default {
  title: "shared/components/LinkedDocumentForm",
  component: LinkedDocumentForm,
  argTypes: {
    allDocuments: { defaultValue: [] },
    setValue: { action: true },
    getValues: { action: true },
    create: { action: true },
    update: { action: true },
    remove: { action: true },
    onGroupUpdate: { action: true },
    onActiveChange: { action: true }
  }
} as ComponentMeta<typeof LinkedDocumentForm>;

const Template: ComponentStory<typeof LinkedDocumentForm> = (props) => {
  const form = useForm();
  return (
    <LinkedDocumentForm
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
