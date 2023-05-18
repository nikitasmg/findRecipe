import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MultipleImageInput } from "./MultipleImageInput";

export default {
  title: "shared/components/MultipleImageInput",
  component: MultipleImageInput,
  argTypes: {
    onChange: { action: true }
  }
} as ComponentMeta<typeof MultipleImageInput>;

const Template: ComponentStory<typeof MultipleImageInput> = (props) => {
  return <MultipleImageInput {...props} />;
};

export const Default = Template.bind({});
