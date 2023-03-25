import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentDetailsDialog } from "./DocumentDetailsDialog";

export default {
  title: "shared/components/DocumentDetailsDialog",
  component: DocumentDetailsDialog,
  argTypes: {
    open: { type: "boolean", defaultValue: true },
    onClose: { action: true },
    groups: { defaultValue: [] },
    onGroupUpdate: { action: true },
    create: { action: true },
    update: { action: true },
    onRemove: { action: true }
  }
} as ComponentMeta<typeof DocumentDetailsDialog>;

const CreateTemplate: ComponentStory<typeof DocumentDetailsDialog> = (props) => {
  return <DocumentDetailsDialog {...props} />;
};

export const Create = CreateTemplate.bind({});

const UpdateTemplate: ComponentStory<typeof DocumentDetailsDialog> = (props) => {
  return <DocumentDetailsDialog {...props} />;
};

export const Update = UpdateTemplate.bind({
  document: {
    user_name: "Hello.png"
  }
});
