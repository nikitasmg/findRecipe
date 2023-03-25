import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentsUpload } from "./DocumentsUpload";

export default {
  title: "shared/components/DocumentsUpload",
  component: DocumentsUpload,
  argTypes: {
    value: { defaultValue: [] },
    onChange: { action: true },
    onDelete: { action: true },
    onUpdate: { action: true }
  }
} as ComponentMeta<typeof DocumentsUpload>;

const Template: ComponentStory<typeof DocumentsUpload> = (props) => {
  return <DocumentsUpload {...props} />;
};

export const Default = Template.bind({});
