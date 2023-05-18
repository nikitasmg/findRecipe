import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Dayjs } from "dayjs";
import { DatePicker } from "./DatePicker";

export default {
  title: "shared/components/DatePicker",
  component: DatePicker,
  argTypes: {
    value: { type: "string" },
    onChange: { action: true }
  }
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (props) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <DatePicker
      {...props}
      value={props.value || (value as never)}
      onChange={(val) => {
        setValue(val);
        props.onChange(val);
      }}
    />
  );
};

export const Default = Template.bind({});
