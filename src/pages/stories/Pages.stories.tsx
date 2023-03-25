import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Pages } from "../Pages";

export default {
  title: "pages/Pages",
  component: Pages,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Pages>;

const Template: ComponentStory<typeof Pages> = (args) => <Pages {...args} />;

export const Default = Template.bind({});
