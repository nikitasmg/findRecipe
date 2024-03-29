import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NoMatch } from "../NoMatch";

export default {
  title: "pages/NoMatch",
  component: NoMatch,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof NoMatch>;

const Template: ComponentStory<typeof NoMatch> = (args) => <NoMatch {...args} />;

export const Default = Template.bind({});
