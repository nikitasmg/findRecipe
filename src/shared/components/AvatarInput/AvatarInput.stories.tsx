import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AvatarInput } from "./AvatarInput";

export default {
  title: "shared/components/AvatarInput",
  component: AvatarInput,
  argTypes: {
    onChange: { action: true },
    onDelete: { action: true }
  }
} as ComponentMeta<typeof AvatarInput>;

const Template: ComponentStory<typeof AvatarInput> = (args) => <AvatarInput {...args} />;

export const Default = Template.bind({});
