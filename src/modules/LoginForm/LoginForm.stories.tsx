import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LoginForm } from "./LoginForm";

export default {
  title: "modules/LoginForm",
  component: LoginForm
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <div className='h-full w-full flex items-center justify-center'>
    <LoginForm {...args} />
  </div>
);

export const Default = Template.bind({});
