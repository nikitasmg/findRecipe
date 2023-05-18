import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LanguageSelect } from "./LanguageSelect";

export default {
  title: "shared/components/LanguageSelect",
  component: LanguageSelect
} as ComponentMeta<typeof LanguageSelect>;

const Template: ComponentStory<typeof LanguageSelect> = (args) => <LanguageSelect {...args} />;

export const Default = Template.bind({});
