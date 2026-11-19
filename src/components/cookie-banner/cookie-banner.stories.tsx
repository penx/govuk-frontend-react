import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/cookie-banner/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/cookie-banner';
import { Button } from '../button';
import { Body } from '../../core/body';
import { Link } from '../../core/link';
import * as CookieBanner from '.';

export default { title: 'Cookie banner', component: CookieBanner.Root } satisfies Meta<
  typeof CookieBanner.Root
>;

export const Default = {
  render: () => (
    <CookieBanner.Root aria-label="Cookies on [name of service]">
      <CookieBanner.MessageComposite
        heading="Cookies on [name of service]"
        actions={
          <>
            <Button type="button">Accept analytics cookies</Button>{' '}
            <Button type="button">Reject analytics cookies</Button>{' '}
            <Link href="#">View cookies</Link>
          </>
        }
      >
        <Body>We use some essential cookies to make this service work.</Body>
        <Body>
          We’d also like to use analytics cookies so we can understand how you use the service and
          make improvements.
        </Body>
      </CookieBanner.MessageComposite>
    </CookieBanner.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
