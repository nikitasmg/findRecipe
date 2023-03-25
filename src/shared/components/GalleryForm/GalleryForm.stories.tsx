import React from "react";
import { useForm, UseFormGetValues } from "react-hook-form";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GalleryForm } from "./GalleryForm";

export default {
  title: "shared/components/GalleryForm",
  component: GalleryForm,
  argTypes: {
    errors: { defaultValue: {} },
    setValue: { action: true },
    getValues: { action: true }
  }
} as ComponentMeta<typeof GalleryForm>;

const Template: ComponentStory<typeof GalleryForm> = (props) => {
  const form = useForm();
  return (
    <GalleryForm
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
