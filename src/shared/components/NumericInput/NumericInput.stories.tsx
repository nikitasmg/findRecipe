import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NumericInput } from "./NumericInput";

export default {
  title: "shared/components/NumericInput",
  component: NumericInput,
  argTypes: {
    onChange: { action: true }
  }
} as ComponentMeta<typeof NumericInput>;

const Template: ComponentStory<typeof NumericInput> = (props) => {
  return <NumericInput {...props} />;
};

export const Default = Template.bind({});
