import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProjectsTable } from "./ProjectsTable";

export default {
  title: "modules/ProjectsTable",
  component: ProjectsTable,
  argTypes: {
    onProjectsCountChange: { action: true }
  }
} as ComponentMeta<typeof ProjectsTable>;

const Template: ComponentStory<typeof ProjectsTable> = (args) => <ProjectsTable {...args} />;

export const Default = Template.bind({});
