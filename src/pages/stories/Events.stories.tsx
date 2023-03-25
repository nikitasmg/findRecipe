import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Events } from "../Events";

export default {
  title: "pages/Events",
  component: Events,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Events>;

const Template: ComponentStory<typeof Events> = (args) => <Events {...args} />;

export const Default = Template.bind({});
