import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SaveButton } from "./SaveButton";

export default {
  title: "shared/components/SaveButton",
  component: SaveButton,
  argTypes: {
    onClick: { action: true }
  }
} as ComponentMeta<typeof SaveButton>;

const Template: ComponentStory<typeof SaveButton> = (props) => {
  return <SaveButton {...props} />;
};

export const Default = Template.bind({});
