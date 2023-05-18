import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Link } from "./Link";

export default {
  title: "shared/components/Link",
  component: Link,
  parameters: {
    docs: {
      description: {
        component: "Компонент ссылки привязанный к контексту локализации"
      }
    }
  },
  argTypes: {
    children: { defaultValue: "test" },
    onClick: { action: true }
  }
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (props) => {
  return <Link {...props} />;
};

export const Default = Template.bind({});
