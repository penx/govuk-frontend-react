import { render, screen } from '@testing-library/react';
import * as SummaryList from '.';

describe('SummaryList', () => {
  test('noBorder adds the modifier to the list and to a row', () => {
    render(
      <SummaryList.Root noBorder data-testid="list">
        <SummaryList.Row noBorder data-testid="row" />
      </SummaryList.Root>,
    );
    expect(screen.getByTestId('list')).toHaveClass('govuk-summary-list--no-border');
    expect(screen.getByTestId('row')).toHaveClass('govuk-summary-list__row--no-border');
  });
});
