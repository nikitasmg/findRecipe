import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RequiredLabelWrapper } from "./RequiredLabelWrapper";

export default {
  title: "shared/components/RequiredLabelWrapper",
  component: RequiredLabelWrapper
} as ComponentMeta<typeof RequiredLabelWrapper>;

const Template: ComponentStory<typeof RequiredLabelWrapper> = (props) => {
  return <RequiredLabelWrapper {...props}>Label</RequiredLabelWrapper>;
};

export const Default = Template.bind({});
