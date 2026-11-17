import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/file-upload/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/file-upload';
import * as FileUpload from '.';

export default { title: 'File upload', component: FileUpload.Control } satisfies Meta<
  typeof FileUpload.Control
>;

export const Default = {
  render: () => <FileUpload.Field id="file-upload-1" name="fileUpload1" label="Upload a file" />,
};

export const Enhanced = {
  render: () => (
    <FileUpload.Field id="file-upload-1" name="fileUpload1" label="Upload a file" javascript />
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
