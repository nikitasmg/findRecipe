import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PageForm } from "./PageForm";

export default {
  title: "modules/PageForm",
  component: PageForm,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof PageForm>;

const Template: ComponentStory<typeof PageForm> = (args) => <PageForm {...args} />;

export const Default = Template.bind({});
