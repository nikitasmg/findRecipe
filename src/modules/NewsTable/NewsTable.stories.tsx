import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NewsTable } from "./NewsTable";

export default {
  title: "modules/NewsTable",
  component: NewsTable,
  argTypes: {
    onNewsCountChange: { action: true }
  }
} as ComponentMeta<typeof NewsTable>;

const Template: ComponentStory<typeof NewsTable> = (args) => <NewsTable {...args} />;

export const Default = Template.bind({});
