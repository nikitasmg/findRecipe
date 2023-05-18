import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Login } from "../Login";

export default {
  title: "pages/Login",
  component: Login,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Default = Template.bind({});
