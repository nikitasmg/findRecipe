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
    { label: "Label 1", path: "/label1" },
    {
      label: "Label 2",
      path: "/label2",
      children: [
        {
          label: "Label 3",
          path: "/label3"
        },
        {
          label: "Label 4",
          path: "/label4"
        }
      ]
    },
    {
      label: "Label 5",
      children: [
        {
          label: "Label 6",
          path: "/label6"
        },
        {
          label: "Label 7",
          path: "/label7"
        }
      ]
    },
    {
      label: "Label 8"
    }
  ]
};
