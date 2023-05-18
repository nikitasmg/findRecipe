import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Projects } from "../Projects";

export default {
  title: "pages/Projects",
  component: Projects,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Projects>;

const Template: ComponentStory<typeof Projects> = (args) => <Projects {...args} />;

export const Default = Template.bind({});
