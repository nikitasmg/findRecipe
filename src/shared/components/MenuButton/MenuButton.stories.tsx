import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MenuButton } from "./MenuButton";

export default {
  title: "shared/components/MenuButton",
  component: MenuButton
} as ComponentMeta<typeof MenuButton>;

const Template: ComponentStory<typeof MenuButton> = (props) => {
  const [opened, setOpened] = React.useState<any>(false);

  return (
    <MenuButton
      opened={opened}
      {...props}
      onChange={(e) => {
        props.onChange?.(e);
        setOpened((val: any) => !val);
      }}
    />
  );
};

export const Default = Template.bind({});
