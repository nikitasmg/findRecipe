import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ContentEditor } from "./ContentEditor";

export default {
  title: "shared/components/ContentEditor",
  component: ContentEditor,
  argTypes: {
    onChange: { action: true },
    getUploadedUrl: { action: true }
  }
} as ComponentMeta<typeof ContentEditor>;

const Template: ComponentStory<typeof ContentEditor> = (args) => <ContentEditor {...args} />;

export const Default = Template.bind({
  apiKey: "apiKey"
});
