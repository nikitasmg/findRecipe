import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StaffControl } from "../StaffControl";

export default {
  title: "pages/StaffControl",
  component: StaffControl,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof StaffControl>;

const Template: ComponentStory<typeof StaffControl> = (args) => <StaffControl {...args} />;

export const Default = Template.bind({});
