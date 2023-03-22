import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ActivityResultsTable } from "./ActivityResultsTable";

export default {
  title: "modules/ActivityResultsTable",
  component: ActivityResultsTable
} as ComponentMeta<typeof ActivityResultsTable>;

const Template: ComponentStory<typeof ActivityResultsTable> = (args) => (
  <ActivityResultsTable {...args} />
);

export const Default = Template.bind({});
