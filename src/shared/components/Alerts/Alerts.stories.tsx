import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Alerts } from "./Alerts";

export default {
  title: "shared/components/Alerts",
  component: Alerts,
  argTypes: {
    removeAlert: { action: true }
  }
} as ComponentMeta<typeof Alerts>;

const Template: ComponentStory<typeof Alerts> = (args) => <Alerts {...args} />;

export const Info = Template.bind({});
Info.args = {
  alerts: { Info: { severity: "info", message: "Info" } }
};

export const Success = Template.bind({});
Success.args = {
  alerts: { Success: { severity: "success", message: "Success" } }
};

export const Warning = Template.bind({});
Warning.args = {
  alerts: { Warning: { severity: "warning", message: "Warning" } }
};

export const Error = Template.bind({});
Error.args = {
  alerts: { Error: { severity: "error", message: "Error" } }
};
