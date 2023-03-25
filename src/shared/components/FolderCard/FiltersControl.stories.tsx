import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FolderCard } from "./FolderCard";

export default {
  title: "shared/components/FolderCard",
  component: FolderCard,
  argTypes: {
    title: { defaultValue: "Test" },
    countFiles: { defaultValue: 10 },
    onInfoClick: { action: true },
    onCardClick: { action: true }
  }
} as ComponentMeta<typeof FolderCard>;

const Template: ComponentStory<typeof FolderCard> = (props) => {
  return <FolderCard {...props} />;
};

export const Default = Template.bind({});
