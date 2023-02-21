import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LinkButton } from "./LinkButton";

export default {
  title: "shared/components/LinkButton",
  component: LinkButton
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "компонент обертка кнопок ссылок",
  href: "/test"
};
