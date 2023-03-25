import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Logo } from "./Logo";

export default {
  title: "shared/components/Logo",
  component: Logo
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (props) => {
  return <Logo {...props} />;
};

export const Default = Template.bind({});
