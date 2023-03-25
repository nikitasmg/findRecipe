import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentGroupDetailsDialog } from "./DocumentGroupDetailsDialog";

export default {
  title: "shared/components/DocumentGroupDetailsDialog",
  component: DocumentGroupDetailsDialog,
  argTypes: {
    open: { type: "boolean", defaultValue: true }
  }
} as ComponentMeta<typeof DocumentGroupDetailsDialog>;

const Template: ComponentStory<typeof DocumentGroupDetailsDialog> = (props) => {
  return <DocumentGroupDetailsDialog {...props} />;
};

export const Default = Template.bind({});
