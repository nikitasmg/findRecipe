import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SourceLink } from "./SourceLink";

export default {
  title: "shared/components/SourceLink",
  component: SourceLink,
  parameters: {
    docs: {
      description: {
        component: "Компонент ссылки не привязанный к контексту локализации"
      }
    }
  }
} as ComponentMeta<typeof SourceLink>;

const Template: ComponentStory<typeof SourceLink> = (props) => {
  return <SourceLink {...props}>SourceLink</SourceLink>;
};

export const Default = Template.bind({});
