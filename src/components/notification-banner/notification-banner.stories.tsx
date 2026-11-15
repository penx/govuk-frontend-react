import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/notification-banner/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/notification-banner';
import * as NotificationBanner from '.';

export default {
  title: 'Notification banner',
  component: NotificationBanner.Root,
} satisfies Meta<typeof NotificationBanner.Root>;

export const Default = {
  render: () => (
    <NotificationBanner.Root>
      <NotificationBanner.Header>
        <NotificationBanner.Title />
      </NotificationBanner.Header>
      <NotificationBanner.Content>
        <NotificationBanner.Heading>
          You have 7 days left to send your application.{' '}
          <NotificationBanner.Link href="#">View application</NotificationBanner.Link>.
        </NotificationBanner.Heading>
      </NotificationBanner.Content>
    </NotificationBanner.Root>
  ),
};

export const Success = {
  render: () => (
    <NotificationBanner.Root success>
      <NotificationBanner.Header>
        <NotificationBanner.Title>Success</NotificationBanner.Title>
      </NotificationBanner.Header>
      <NotificationBanner.Content>
        <NotificationBanner.Heading>Training outcome recorded</NotificationBanner.Heading>
      </NotificationBanner.Content>
    </NotificationBanner.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
