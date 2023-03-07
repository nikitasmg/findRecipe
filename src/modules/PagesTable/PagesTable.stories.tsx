import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PagesTable } from "./PagesTable";

export default {
  title: "modules/PagesTable",
  component: PagesTable,
  argTypes: {
    onNewsCountChange: { action: true }
  }
} as ComponentMeta<typeof PagesTable>;

const Template: ComponentStory<typeof PagesTable> = (args) => <PagesTable {...args} />;

export const Default = Template.bind({});
