import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DetailsHead } from "./DetailsHead";

export default {
  title: "shared/components/DetailsHead",
  component: DetailsHead,
  argTypes: {
    title: { type: "string", defaultValue: "Hello" },
    clientUrl: { type: "string", defaultValue: "/" },
    backHref: { type: "string", defaultValue: "/" },
    onBackClick: { action: true },
    onRemove: { action: true }
  }
} as ComponentMeta<typeof DetailsHead>;

const Template: ComponentStory<typeof DetailsHead> = (props) => {
  return <DetailsHead {...props} />;
};

export const Default = Template.bind({});
