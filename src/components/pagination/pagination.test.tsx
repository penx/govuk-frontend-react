import { render } from '@testing-library/react';
import * as Pagination from '.';

describe('Pagination.Link', () => {
  test('asChild renders the child with the link classes', () => {
    const { container } = render(
      <Pagination.NextLink asChild>
        <a href="/page-2">Next</a>
      </Pagination.NextLink>,
    );
    expect(container.innerHTML).toBe(
      '<a href="/page-2" class="govuk-link govuk-pagination__link" rel="next">Next</a>',
    );
  });

  test('asChild on an item link keeps the child', () => {
    const { container } = render(
      <Pagination.ItemLink asChild aria-label="Page 2">
        <a href="/page-2">2</a>
      </Pagination.ItemLink>,
    );
    expect(container.innerHTML).toBe(
      '<a href="/page-2" class="govuk-link govuk-pagination__link" aria-label="Page 2">2</a>',
    );
  });
});
