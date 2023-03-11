import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StaffControlTable } from "./StaffControlTable";

export default {
  title: "modules/StaffControlTable",
  component: StaffControlTable,
  argTypes: {
    onNewsCountChange: { action: true }
  }
} as ComponentMeta<typeof StaffControlTable>;

const Template: ComponentStory<typeof StaffControlTable> = (args) => (
  <StaffControlTable {...args} />
);

export const Default = Template.bind({});
