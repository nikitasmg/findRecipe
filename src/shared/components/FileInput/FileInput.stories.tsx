import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FileInput } from "./FileInput";

export default {
  title: "shared/components/FileInput",
  component: FileInput,
  argTypes: {
    id: { defaultValue: "test-id" },
    onFileChange: { action: true },
    onUrlChange: { action: true },
    onDelete: { action: true }
  }
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (props) => {
  return <FileInput {...props} />;
};

export const Default = Template.bind({});
