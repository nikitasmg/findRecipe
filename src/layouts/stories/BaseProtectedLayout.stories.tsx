import React, { useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";
import { useAuthStore } from "~shared/stores/auth";

export default {
  title: "layouts/BaseProtectedLayout",
  component: BaseProtectedLayout,
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof BaseProtectedLayout>;

const Template: ComponentStory<typeof BaseProtectedLayout> = (args) => (
  <BaseProtectedLayout {...args} />
);

const TemplateAuthorized: ComponentStory<typeof BaseProtectedLayout> = (args) => {
  const auth = useAuthStore((state) => state.auth);

  useEffect(() => {
    auth("test_token");

    return () => {
      auth("");
    };
  }, [auth]);

  return <BaseProtectedLayout {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: "Content"
};

export const Authorized = TemplateAuthorized.bind({});
Authorized.args = {
  children: "Content"
};
