import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ModalFilters } from "./ModalFilters";

export default {
  title: "shared/components/ModalFilters",
  component: ModalFilters
} as ComponentMeta<typeof ModalFilters>;

const Template: ComponentStory<typeof ModalFilters> = (props) => {
  const [opened, setOpened] = React.useState(true);
  const handleClose = () => {
    props.handleClose();
    setOpened(false);
  };

  return <ModalFilters {...props} opened={opened} handleClose={handleClose} />;
};

export const Default = Template.bind({});
