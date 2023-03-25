import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Purchases } from "../Purchases";

export default {
  title: "pages/Purchases",
  component: Purchases,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Purchases>;

const Template: ComponentStory<typeof Purchases> = (args) => <Purchases {...args} />;

export const Default = Template.bind({});
