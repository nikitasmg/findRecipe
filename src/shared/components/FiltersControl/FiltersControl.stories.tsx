import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FiltersControl } from "./FiltersControl";

export default {
  title: "shared/components/FiltersControl",
  component: FiltersControl,
  argTypes: {
    filters: {
      control: "object",
      defaultValue: [{ id: "string", title: "string", value: "test" }]
    },
    onRemoveFilter: { action: true },
    sort: { control: "object", defaultValue: [{ id: "string", name: "string", order: "asc" }] },
    onRemoveOrder: { action: true }
  }
} as ComponentMeta<typeof FiltersControl>;

const Template: ComponentStory<typeof FiltersControl> = (props) => {
  return <FiltersControl {...props} />;
};

export const Default = Template.bind({});
