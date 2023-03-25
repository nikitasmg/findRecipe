import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GroupDocuments } from "../GroupDocuments";

export default {
  title: "pages/GroupDocuments",
  component: GroupDocuments,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof GroupDocuments>;

const Template: ComponentStory<typeof GroupDocuments> = (args) => <GroupDocuments {...args} />;

export const Default = Template.bind({});
