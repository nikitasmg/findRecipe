import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LogoLetter } from "./LogoLetter";

export default {
  title: "shared/components/LogoLetter",
  component: LogoLetter
} as ComponentMeta<typeof LogoLetter>;

const Template: ComponentStory<typeof LogoLetter> = (props) => {
  return <LogoLetter {...props} />;
};

export const Default = Template.bind({});
