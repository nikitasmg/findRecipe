import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TableHeadCell } from "./TableHeadLabel";

export default {
  title: "shared/components/TableHeadLabel",
  component: TableHeadCell,
  argTypes: {
    cellId: { defaultValue: "hello" },
    title: { defaultValue: "Hello" },
    onSortClick: { action: true },
    sortProps: {
      control: "object",
      defaultValue: [{ active: true, direction: "asc" }]
    }
  }
} as ComponentMeta<typeof TableHeadCell>;

const Template: ComponentStory<typeof TableHeadCell> = (props) => {
  return <TableHeadCell {...props} />;
};

export const Default = Template.bind({});
