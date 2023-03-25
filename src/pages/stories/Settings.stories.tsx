import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Settings } from "../Settings";

export default {
  title: "pages/Settings",
  component: Settings,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = (args) => <Settings {...args} />;

export const Default = Template.bind({});
