import type { ComponentType, ReactNode } from 'react';
import { render } from '@testing-library/react';
import * as Footer from '../src/components/footer';
import * as NotificationBanner from '../src/components/notification-banner';
import * as Pagination from '../src/components/pagination';
import * as ServiceNavigation from '../src/components/service-navigation';
import * as SummaryList from '../src/components/summary-list';
import * as TaskList from '../src/components/task-list';

type LinkPart = ComponentType<{ asChild?: boolean; children?: ReactNode }>;

const parts: [string, LinkPart, string][] = [
  ['Footer.Link', Footer.Link, 'govuk-footer__link'],
  ['NotificationBanner.Link', NotificationBanner.Link, 'govuk-notification-banner__link'],
  ['Pagination.Link', Pagination.Link, 'govuk-link govuk-pagination__link'],
  ['ServiceNavigation.Link', ServiceNavigation.Link, 'govuk-service-navigation__link'],
  ['SummaryList.Action', SummaryList.Action, 'govuk-link'],
  ['TaskList.Link', TaskList.Link, 'govuk-link govuk-task-list__link'],
];

test.each(parts)('%s asChild renders the child with its classes', (_, Part, className) => {
  const { container } = render(
    <Part asChild>
      <a href="/page">Page</a>
    </Part>,
  );
  expect(container.innerHTML).toBe(`<a href="/page" class="${className}">Page</a>`);
});

test('Pagination.NextLink asChild keeps rel', () => {
  const { container } = render(
    <Pagination.NextLink asChild>
      <a href="/page-2">Next</a>
    </Pagination.NextLink>,
  );
  expect(container.innerHTML).toBe(
    '<a href="/page-2" class="govuk-link govuk-pagination__link" rel="next">Next</a>',
  );
});
