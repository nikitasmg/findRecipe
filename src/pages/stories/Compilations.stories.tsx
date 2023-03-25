import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Compilations } from "../Compilations";

export default {
  title: "pages/Compilations",
  component: Compilations,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Compilations>;

const Template: ComponentStory<typeof Compilations> = (args) => <Compilations {...args} />;

export const Default = Template.bind({});
