import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "@mui/material";
import { HeaderTab } from "./HeaderTab";

export default {
  title: "shared/components/HeaderTab",
  component: HeaderTab,
  argTypes: {
    handleSelect: { action: true }
  }
} as ComponentMeta<typeof HeaderTab>;

const Template: ComponentStory<typeof HeaderTab> = (args) => {
  const [index, setIndex] = useState(0);

  return (
    <Tabs value={index} onChange={(_, value) => setIndex(value)}>
      <HeaderTab handleSelect={setIndex} {...args} />
      <HeaderTab handleSelect={setIndex} tab={{ label: "Another Tab" }} value={3} />
    </Tabs>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: 0,
  tab: {
    label: "Default Tab"
  }
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  value: 1,
  tab: {
    label: "Default Tab",
    children: [
      {
        label: "inner 1"
      },
      {
        label: "inner 2"
      }
    ]
  }
};
