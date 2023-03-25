import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ImageInput } from "./ImageInput";

export default {
  title: "shared/components/ImageInput",
  component: ImageInput,
  argTypes: {
    onChange: { action: true },
    onDelete: { action: true }
  }
} as ComponentMeta<typeof ImageInput>;

const Template: ComponentStory<typeof ImageInput> = (props) => {
  return <ImageInput {...props} />;
};

export const Default = Template.bind({});
