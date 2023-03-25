import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TabsForm } from "./TabsForm";

export default {
  title: "shared/components/TabsForm",
  component: TabsForm,
  argTypes: {
    forms: {
      control: "object",
      defaultValue: [
        { tabTitle: "Tab 1", component: <>Tab 1 content</> },
        { tabTitle: "Tab 2", component: <>Tab 2 content</> }
      ]
    },
    handleBack: { action: true },
    handleStepChange: { action: true },
    handleSubmit: { action: true }
  }
} as ComponentMeta<typeof TabsForm>;

const Template: ComponentStory<typeof TabsForm> = (props) => {
  return <TabsForm {...props} />;
};

export const Default = Template.bind({});
