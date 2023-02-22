import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CompilationsTable } from "./CompilationsTable";

export default {
  title: "modules/CompilationsTable",
  component: CompilationsTable,
  argTypes: {
    onNewsCountChange: { action: true }
  }
} as ComponentMeta<typeof CompilationsTable>;

const Template: ComponentStory<typeof CompilationsTable> = (args) => (
  <CompilationsTable {...args} />
);

export const Default = Template.bind({});
