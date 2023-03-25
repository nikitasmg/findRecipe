import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LinkInput } from "./LinkInput";

export default {
  title: "shared/components/LinkInput",
  component: LinkInput,
  argTypes: {
    onChange: { action: true }
  }
} as ComponentMeta<typeof LinkInput>;

const Template: ComponentStory<typeof LinkInput> = (props) => {
  return <LinkInput {...props} />;
};

export const Default = Template.bind({});
