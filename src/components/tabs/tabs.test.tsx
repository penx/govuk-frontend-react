import { render } from '@testing-library/react';
import * as Tabs from '.';

describe('Tabs.Tab', () => {
  test('asChild renders the child with the tab class', () => {
    const { container } = render(
      <Tabs.Tab asChild>
        <label htmlFor="past-day">Past day</label>
      </Tabs.Tab>,
    );
    expect(container.innerHTML).toBe(
      '<label for="past-day" class="govuk-tabs__tab">Past day</label>',
    );
  });
});
