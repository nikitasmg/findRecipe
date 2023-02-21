import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseLayout } from "~/layouts/BaseLayout";
import { Home } from "../Home";

export default {
  title: "pages/Home",
  component: Home,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => (
  <BaseLayout>
    <Home {...args} />
  </BaseLayout>
);

export const Default = Template.bind({});
