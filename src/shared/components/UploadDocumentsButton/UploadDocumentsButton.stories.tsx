import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UploadDocumentsButton } from "./UploadDocumentsButton";

export default {
  title: "shared/components/UploadDocumentsButton",
  component: UploadDocumentsButton,
  argTypes: {
    onUpload: { action: true },
    create: { action: true }
  }
} as ComponentMeta<typeof UploadDocumentsButton>;

const Template: ComponentStory<typeof UploadDocumentsButton> = (props) => {
  return <UploadDocumentsButton {...props} />;
};

export const Default = Template.bind({});
