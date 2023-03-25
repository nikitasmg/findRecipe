import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InteractiveMap } from "./InteractiveMap";

export default {
  title: "modules/InteractiveMap",
  component: InteractiveMap
} as ComponentMeta<typeof InteractiveMap>;

const Template: ComponentStory<typeof InteractiveMap> = (args) => <InteractiveMap {...args} />;

export const Default = Template.bind({});
