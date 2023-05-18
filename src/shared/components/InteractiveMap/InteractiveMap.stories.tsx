import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InteractiveMap } from "./InteractiveMap";

export default {
  title: "shared/components/InteractiveMap",
  component: InteractiveMap,
  argTypes: {
    onSelect: { action: true }
  }
} as ComponentMeta<typeof InteractiveMap>;

const Template: ComponentStory<typeof InteractiveMap> = (props) => {
  return <InteractiveMap {...props} />;
};

export const Default = Template.bind({});
