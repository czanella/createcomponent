import { {{ componentName }} as {{ componentName }}Component } from  "./{{ componentDashed }}";

const meta = {
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

export const {{ componentName }} = {
  args: {},
};
