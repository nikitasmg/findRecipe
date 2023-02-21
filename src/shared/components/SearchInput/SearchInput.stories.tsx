import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SearchInput } from "./SearchInput";

export default {
  title: "shared/components/SearchInput",
  component: SearchInput
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Быстрый ввод"
};
