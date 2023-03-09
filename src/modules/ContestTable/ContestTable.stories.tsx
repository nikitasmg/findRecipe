import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ContestTable } from "./ContestTable";

export default {
  title: "modules/ContestTable",
  component: ContestTable,
  argTypes: {
    onNewsCountChange: { action: true }
  }
} as ComponentMeta<typeof ContestTable>;

const Template: ComponentStory<typeof ContestTable> = (args) => <ContestTable {...args} />;

export const Default = Template.bind({});
