import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Text } from "./Text";

export default {
  title: "shared/components/Text",
  component: Text,
  parameters: {
    docs: {
      description: {
        component: "Компонент связан с контекстом локализации"
      }
    }
  }
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args: any) => <Text {...args} />;

export const Span = Template.bind({});
Span.args = {
  children: "This is <span/>",
  component: "span"
};

export const P = Template.bind({});
P.args = {
  children: "This is <p/>"
};
