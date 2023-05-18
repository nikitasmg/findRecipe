import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { News } from "../News";

export default {
  title: "pages/News",
  component: News,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof News>;

const Template: ComponentStory<typeof News> = (args) => <News {...args} />;

export const Default = Template.bind({});
