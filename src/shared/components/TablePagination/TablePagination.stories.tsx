import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TablePagination } from "./TablePagination";

export default {
  title: "shared/components/TablePagination",
  component: TablePagination
} as ComponentMeta<typeof TablePagination>;

const Template: ComponentStory<typeof TablePagination> = (args) => <TablePagination {...args} />;

export const Default = Template.bind({});
