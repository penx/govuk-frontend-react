import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.tsx'],
  staticDirs: [{ from: '../node_modules/govuk-frontend/dist/govuk/assets', to: '/assets' }],
};

export default config;
