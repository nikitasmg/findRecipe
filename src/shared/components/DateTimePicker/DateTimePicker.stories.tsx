import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Dayjs } from "dayjs";
import { DateTimePicker } from "./DateTimePicker";

export default {
  title: "shared/components/DateTimePicker",
  component: DateTimePicker,
  argTypes: {
    value: { type: "string" },
    onChange: { action: true }
  }
} as ComponentMeta<typeof DateTimePicker>;

const Template: ComponentStory<typeof DateTimePicker> = (props) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <DateTimePicker
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
