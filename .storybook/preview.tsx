import type { Preview } from '@storybook/react-vite';
import 'govuk-frontend/dist/govuk/govuk-frontend.min.css';

document.body.classList.add('govuk-template__body', 'govuk-frontend-supported');

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="govuk-width-container">
        <Story />
      </div>
    ),
  ],
};

export default preview;
