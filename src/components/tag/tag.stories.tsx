import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/tag/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/tag';
import { Tag } from '.';

const meta = { title: 'Tag', component: Tag } satisfies Meta<typeof Tag>;

export default meta;

export const Default: StoryObj<typeof meta> = { args: { children: 'Completed', colour: 'green' } };

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
