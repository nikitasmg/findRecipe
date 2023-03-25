import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TableActions } from "./TableActions";

export default {
  title: "shared/components/TableActions",
  component: TableActions,
  argTypes: {
    searchProps: {
      defaultValue: {
        searchValue: { defaultValue: "value" },
        searchChange: { action: true },
        resetTitle: { action: true }
      }
    },

    addButtonProps: {
      addHref: { defaultValue: "/" },
      onAddClick: { action: true }
    },

    resetFilters: { action: true },
    searchTitle: { defaultValue: "searchTitle" },
    filterModalInnerForm: { defaultValue: "filterModalInnerForm" }
  }
} as ComponentMeta<typeof TableActions>;

const Template: ComponentStory<typeof TableActions> = (props) => {
  return <TableActions {...props} />;
};

export const Default = Template.bind({});
