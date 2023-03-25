import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TabPanel } from "./TabPanel";

export default {
  title: "shared/components/TabPanel",
  component: TabPanel
} as ComponentMeta<typeof TabPanel>;

const Template: ComponentStory<typeof TabPanel> = (props) => {
  return <TabPanel {...props}>Tab content</TabPanel>;
};

export const Default = Template.bind({});
