import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Snackbar } from "./Snackbar";

export default {
  title: "modules/Snackbar",
  component: Snackbar
} as ComponentMeta<typeof Snackbar>;

const Template: ComponentStory<typeof Snackbar> = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
