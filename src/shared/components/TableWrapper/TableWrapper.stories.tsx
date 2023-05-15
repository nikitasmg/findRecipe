import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TableWrapper } from "./TableWrapper";

export default {
  title: "shared/components/TableWrapper",
  component: TableWrapper
} as ComponentMeta<typeof TableWrapper>;

const Template: ComponentStory<typeof TableWrapper> = (args) => <TableWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "компонент обертка для таблиц"
};
