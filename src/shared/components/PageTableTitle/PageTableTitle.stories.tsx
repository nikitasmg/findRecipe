import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PageTableTitle } from "./PageTableTitle";

export default {
  title: "shared/components/PageTableTitle",
  component: PageTableTitle,
  argTypes: {
    title: { defaultValue: "Title" },
    countTitle: { defaultValue: " count title" },
    count: { defaultValue: 16 }
  }
} as ComponentMeta<typeof PageTableTitle>;

const Template: ComponentStory<typeof PageTableTitle> = (props) => {
  return <PageTableTitle {...props} />;
};

export const Default = Template.bind({});
