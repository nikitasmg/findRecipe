import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Profile } from "../Profile";

export default {
  title: "pages/Profile",
  component: Profile,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;

export const Default = Template.bind({});
