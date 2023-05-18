import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ButtonDelete } from "./ButtonDelete";

export default {
  title: "shared/components/ButtonDelete",
  component: ButtonDelete,
  argTypes: {
    onClick: { action: true }
  }
} as ComponentMeta<typeof ButtonDelete>;

const Template: ComponentStory<typeof ButtonDelete> = (args) => <ButtonDelete {...args} />;

export const Default = Template.bind({});
