import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EnLabelWrapper } from "./EnLabelWrapper";

export default {
  title: "shared/components/EnLabelWrapper",
  component: EnLabelWrapper
} as ComponentMeta<typeof EnLabelWrapper>;

const Template: ComponentStory<typeof EnLabelWrapper> = (props) => {
  return <EnLabelWrapper {...props}>Label</EnLabelWrapper>;
};

export const Default = Template.bind({});
