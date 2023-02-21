import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PageTitle } from "./PageTitle";

export default {
  title: "shared/components/PageTitle",
  component: PageTitle
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => <PageTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "компонент обертка с отступами и тенями"
};
