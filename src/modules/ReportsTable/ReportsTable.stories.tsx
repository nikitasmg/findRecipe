import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ReportsTable } from "./ReportsTable";

export default {
  title: "modules/ReportsTable",
  component: ReportsTable
} as ComponentMeta<typeof ReportsTable>;

const Template: ComponentStory<typeof ReportsTable> = (args) => <ReportsTable {...args} />;

export const Default = Template.bind({});
