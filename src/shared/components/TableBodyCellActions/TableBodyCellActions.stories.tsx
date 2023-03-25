import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TableBodyCellActions } from "./TableBodyCellActions";

export default {
  title: "shared/components/TableBodyCellActions",
  component: TableBodyCellActions,
  argTypes: {
    handleEdit: { action: true },
    handleSuccess: { action: true },
    handleRemove: { action: true }
  }
} as ComponentMeta<typeof TableBodyCellActions>;

const Template: ComponentStory<typeof TableBodyCellActions> = (args) => (
  <TableBodyCellActions {...args} />
);

export const Default = Template.bind({});
