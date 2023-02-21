import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseLayout } from "~/layouts/BaseLayout";

export default {
  title: "layouts/BaseLayout",
  component: BaseLayout,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof BaseLayout>;

const Template: ComponentStory<typeof BaseLayout> = (args) => <BaseLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Content"
};
