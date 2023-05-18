import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "shared/components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "При передаче в компонент текстового дочернего узла, он будет меняться как в компоненте <Text>, в зависимости от выбранного языка"
      }
    }
  },
  argTypes: {
    onClick: { action: true }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{(args.children as string) ?? "Hello"}</Button>
);

export const Default = Template.bind({});
