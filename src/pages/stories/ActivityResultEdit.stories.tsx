import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ActivityResultEdit } from "../ActivityResultEdit";

export default {
  title: "pages/ActivityResultEdit",
  component: ActivityResultEdit,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof ActivityResultEdit>;

const Template: ComponentStory<typeof ActivityResultEdit> = (args) => (
  <ActivityResultEdit {...args} />
);

export const Default = Template.bind({});
