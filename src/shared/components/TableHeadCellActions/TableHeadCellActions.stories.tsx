import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TableHeadCellActions } from "./TableHeadCellActions";

export default {
  title: "shared/components/TableHeadCellActions",
  component: TableHeadCellActions
} as ComponentMeta<typeof TableHeadCellActions>;

const Template: ComponentStory<typeof TableHeadCellActions> = (props) => {
  return <TableHeadCellActions {...props} />;
};

export const Default = Template.bind({});
