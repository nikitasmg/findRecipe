import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Documents } from "../Documents";

export default {
  title: "pages/Documents",
  component: Documents,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Documents>;

const Template: ComponentStory<typeof Documents> = (args) => <Documents {...args} />;

export const Default = Template.bind({});
