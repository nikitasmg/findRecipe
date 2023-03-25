import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GalleryInput } from "./GalleryInput";

export default {
  title: "shared/components/GalleryInput",
  component: GalleryInput,
  argTypes: {
    initialValue: { defaultValue: [] },
    onChange: { action: true },
    onDelete: { action: true },
    onUpdate: { action: true },
    onUpload: { action: true }
  }
} as ComponentMeta<typeof GalleryInput>;

const Template: ComponentStory<typeof GalleryInput> = (props) => {
  return <GalleryInput {...props} />;
};

export const Default = Template.bind({});
