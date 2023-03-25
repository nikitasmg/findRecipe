import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentCard } from "./DocumentCard";

export default {
  title: "shared/components/DocumentCard",
  component: DocumentCard,
  argTypes: {
    format: {
      type: "string",
      control: { type: "select" },
      options: [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "csv",
        "png",
        "jpg",
        "jpeg",
        "bmp",
        "webp",
        "gif",
        "ppt",
        "pptx",
        "default"
      ]
    },
    title: { type: "string", defaultValue: "Hello" },
    onCardClick: { action: true }
  }
} as ComponentMeta<typeof DocumentCard>;

const Template: ComponentStory<typeof DocumentCard> = (props) => {
  return <DocumentCard {...props} />;
};

export const Default = Template.bind({});
