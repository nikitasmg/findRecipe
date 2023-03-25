import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EmptyView } from "./EmptyView";

export default {
  title: "shared/components/EmptyView",
  component: EmptyView
} as ComponentMeta<typeof EmptyView>;

const Template: ComponentStory<typeof EmptyView> = (props) => {
  return <EmptyView {...props} />;
};

export const Default = Template.bind({});
