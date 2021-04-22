import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import AppWithRedux from "../AppWithRedux";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";

export default {
  title: 'Todolists/AppWithRedux',
  component: AppWithRedux,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

