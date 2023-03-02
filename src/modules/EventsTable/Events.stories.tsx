import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { EventsTable } from "./EventsTable";

export default {
  title: "modules/EventsTable",
  component: EventsTable,
  argTypes: {
    onNewsCountChange: { action: true }
  }
} as ComponentMeta<typeof EventsTable>;

const Template: ComponentStory<typeof EventsTable> = (args) => <EventsTable {...args} />;

export const Default = Template.bind({});
