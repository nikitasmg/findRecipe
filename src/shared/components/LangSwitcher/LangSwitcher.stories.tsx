import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LangSwitcher } from "./LangSwitcher";

export default {
  title: "shared/components/LangSwitcher",
  component: LangSwitcher,
  argTypes: {
    onLangChange: { action: true }
  }
} as ComponentMeta<typeof LangSwitcher>;

const Template: ComponentStory<typeof LangSwitcher> = (props) => {
  return <LangSwitcher {...props} />;
};

export const Default = Template.bind({});
