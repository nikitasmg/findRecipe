import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Vacancies } from "../Vacancies";

export default {
  title: "pages/Vacancies",
  component: Vacancies,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Vacancies>;

const Template: ComponentStory<typeof Vacancies> = (args) => <Vacancies {...args} />;

export const Default = Template.bind({});
