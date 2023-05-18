import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Panel } from "./Panel";

export default {
  title: "shared/components/Panel",
  component: Panel
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "компонент обертка с отступами и тенями"
};
