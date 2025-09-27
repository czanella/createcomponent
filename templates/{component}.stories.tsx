import { Meta, StoryObj } from '@storybook/react';
import { {{ componentName }} as {{ componentName }}Component } from './{{ componentDashed }}';

const meta: Meta<typeof {{ componentName }}Component> = {
  title: '{{ storybook }}',
  component: {{ componentName }}Component,
  parameters: {
    viewport: {
      defaultViewport: 'fullscreen',
    },
  },
  argTypes: {
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const {{ componentName }}: Story = {
  args: {
    title: 'This is the title',
  },
};
