import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Employees } from "../Employees";

export default {
  title: "pages/Employees",
  component: Employees,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Employees>;

const Template: ComponentStory<typeof Employees> = (args) => <Employees {...args} />;

export const Default = Template.bind({});
