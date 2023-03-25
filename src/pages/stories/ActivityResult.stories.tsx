import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ActivityResult } from "../ActivityResult";

export default {
  title: "pages/ActivityResult",
  component: ActivityResult,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof ActivityResult>;

const Template: ComponentStory<typeof ActivityResult> = (args) => <ActivityResult {...args} />;

export const Default = Template.bind({});
