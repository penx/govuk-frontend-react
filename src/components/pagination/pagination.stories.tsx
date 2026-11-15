import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/pagination/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/pagination';
import { VisuallyHidden } from '../../utilities/visually-hidden';
import * as Pagination from '.';

export default { title: 'Pagination', component: Pagination.Root } satisfies Meta<
  typeof Pagination.Root
>;

export const Default = {
  render: () => (
    <Pagination.Root>
      <Pagination.Previous>
        <Pagination.PreviousLink href="/previous">
          <Pagination.PreviousIcon /> <Pagination.PreviousLinkTitle />
        </Pagination.PreviousLink>
      </Pagination.Previous>
      <Pagination.List>
        <Pagination.Item>
          <Pagination.ItemLink href="/page/1">1</Pagination.ItemLink>
        </Pagination.Item>
        <Pagination.Item current>
          <Pagination.ItemLink href="/page/2" aria-current="page">
            2
          </Pagination.ItemLink>
        </Pagination.Item>
        <Pagination.Item ellipsis />
        <Pagination.Item>
          <Pagination.ItemLink href="/page/9">9</Pagination.ItemLink>
        </Pagination.Item>
      </Pagination.List>
      <Pagination.Next>
        <Pagination.NextLink href="/next">
          <Pagination.NextLinkTitle /> <Pagination.NextIcon />
        </Pagination.NextLink>
      </Pagination.Next>
    </Pagination.Root>
  ),
};

export const WithLabels = {
  render: () => (
    <Pagination.Root block>
      <Pagination.Previous>
        <Pagination.PreviousLink href="/previous">
          <Pagination.PreviousIcon /> <Pagination.LinkTitle>Previous page</Pagination.LinkTitle>{' '}
          <VisuallyHidden>:</VisuallyHidden>{' '}
          <Pagination.LinkLabel>Paying VAT and duty</Pagination.LinkLabel>
        </Pagination.PreviousLink>
      </Pagination.Previous>
      <Pagination.Next>
        <Pagination.NextLink href="/next">
          <Pagination.NextIcon /> <Pagination.LinkTitle>Next page</Pagination.LinkTitle>{' '}
          <VisuallyHidden>:</VisuallyHidden>{' '}
          <Pagination.LinkLabel>Registering an imported vehicle</Pagination.LinkLabel>
        </Pagination.NextLink>
      </Pagination.Next>
    </Pagination.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
