import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PathsPanel } from "./PathsPanel";

export default {
  title: "shared/components/PathsPanel",
  component: PathsPanel
} as ComponentMeta<typeof PathsPanel>;

const Template: ComponentStory<typeof PathsPanel> = (args) => <PathsPanel {...args} />;

export const Default = Template.bind({});
Default.args = {
  paths: [
    { title: "Label 1", path: "/label1" },
    {
      title: "Label 2",
      path: "/label2",
      children: [
        {
          title: "Label 3",
          path: "/label3"
        },
        {
          title: "Label 4",
          path: "/label4"
        }
      ]
    },
    {
      title: "Label 5",
      children: [
        {
          title: "Label 6",
          path: "/label6"
        },
        {
          title: "Label 7",
          path: "/label7"
        }
      ]
    },
    {
      title: "Label 8"
    }
  ]
};
