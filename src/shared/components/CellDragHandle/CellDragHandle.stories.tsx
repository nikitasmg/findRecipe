import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CellDragHandle } from "./CellDragHandle";

export default {
  title: "shared/components/CellDragHandle",
  component: CellDragHandle
} as ComponentMeta<typeof CellDragHandle>;

const Template: ComponentStory<typeof CellDragHandle> = (args) => <CellDragHandle {...args} />;

export const Default = Template.bind({});
