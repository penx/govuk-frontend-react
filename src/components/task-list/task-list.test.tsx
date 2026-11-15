import { render, screen } from '@testing-library/react';
import * as TaskList from '.';

describe('TaskList.Status', () => {
  test('cannotStartYet adds the cannot start yet modifier', () => {
    render(<TaskList.Status cannotStartYet>Cannot start yet</TaskList.Status>);
    expect(screen.getByText('Cannot start yet')).toHaveClass(
      'govuk-task-list__status--cannot-start-yet',
    );
  });
});
