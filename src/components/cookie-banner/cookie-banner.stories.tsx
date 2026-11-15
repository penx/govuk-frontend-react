import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/cookie-banner/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/cookie-banner';
import * as Button from '../button';
import { Body } from '../../core/body';
import { Link } from '../../core/link';
import * as CookieBanner from '.';

export default { title: 'Cookie banner', component: CookieBanner.Root } satisfies Meta<
  typeof CookieBanner.Root
>;

export const Default = {
  render: () => (
    <CookieBanner.Root>
      <CookieBanner.MessageComposite
        heading="Cookies on this government service"
        actions={
          <>
            <Button.Root name="cookies" value="accept">
              Accept analytics cookies
            </Button.Root>{' '}
            <Button.Root name="cookies" value="reject">
              Reject analytics cookies
            </Button.Root>{' '}
            <Link href="/cookies">View cookies</Link>
          </>
        }
      >
        <Body>We use analytics cookies to help understand how users use our service.</Body>
      </CookieBanner.MessageComposite>
    </CookieBanner.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
