import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Contest } from "../Contest";

export default {
  title: "pages/Contest",
  component: Contest,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Contest>;

const Template: ComponentStory<typeof Contest> = (args) => <Contest {...args} />;

export const Default = Template.bind({});
