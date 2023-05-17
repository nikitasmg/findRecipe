import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FilterChips } from "./FilterChips";

export default {
  title: "shared/components/FilterChips",
  component: FilterChips
} as ComponentMeta<typeof FilterChips>;

const Template: ComponentStory<typeof FilterChips> = (props) => {
  return <FilterChips {...props} />;
};

export const Default = Template.bind({});
