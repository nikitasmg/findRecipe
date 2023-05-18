import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "@mui/material";
import { HelperText } from "./HelperText";

export default {
  title: "shared/components/HelperText",
  component: HelperText
} as ComponentMeta<typeof HelperText>;

const Template: ComponentStory<typeof HelperText> = (args) => (
  <>
    <Input placeholder='Компонент описания поля ввода' />
    <HelperText {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  id: "text1",
  text: "Описание"
};

export const Error = Template.bind({});
Error.args = {
  id: "text1",
  error: "Ошибка"
};
