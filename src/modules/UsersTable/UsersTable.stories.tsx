import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import UsersTable from "./UsersTable";

export default {
  title: "modules/UsersTable",
  component: UsersTable,
  argTypes: {
    onNewsCountChange: { action: true }
  }
} as ComponentMeta<typeof UsersTable>;

const Template: ComponentStory<typeof UsersTable> = (args) => <UsersTable {...args} />;

export const Default = Template.bind({});
