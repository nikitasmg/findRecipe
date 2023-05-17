import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NewsCategories } from "./NewsCategories";

export default {
  title: "shared/components/NewsCategories",
  component: NewsCategories
} as ComponentMeta<typeof NewsCategories>;

const Template: ComponentStory<typeof NewsCategories> = (props) => {
  return <NewsCategories {...props} />;
};

export const Default = Template.bind({});
