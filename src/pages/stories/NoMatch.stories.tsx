import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseLayout } from "~/layouts/BaseLayout";
import { NoMatch } from "../NoMatch";

export default {
  title: "pages/NoMatch",
  component: NoMatch,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof NoMatch>;

const Template: ComponentStory<typeof NoMatch> = (args) => (
  <BaseLayout>
    <NoMatch {...args} />
  </BaseLayout>
);

export const Default = Template.bind({});
