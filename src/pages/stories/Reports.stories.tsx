import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Reports } from "../Reports";

export default {
  title: "pages/Reports",
  component: Reports,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Reports>;

const Template: ComponentStory<typeof Reports> = (args) => <Reports {...args} />;

export const Default = Template.bind({});
