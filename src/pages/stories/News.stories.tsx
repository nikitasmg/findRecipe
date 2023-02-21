import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseLayout } from "~/layouts/BaseLayout";
import { News } from "../News";

export default {
  title: "pages/News",
  component: News,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof News>;

const Template: ComponentStory<typeof News> = (args) => (
  <BaseLayout>
    <News {...args} />
  </BaseLayout>
);

export const Default = Template.bind({});
