import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AddButton } from "./AddButton";

export default {
  title: "shared/components/AddButton",
  component: AddButton,
  argTypes: {
    onClick: { action: true }
  }
} as ComponentMeta<typeof AddButton>;

const Template: ComponentStory<typeof AddButton> = (args) => <AddButton {...args} />;

export const Default = Template.bind({});
