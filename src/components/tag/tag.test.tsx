import { render, screen } from '@testing-library/react';
import { Tag } from '.';

describe('Tag', () => {
  test('colour adds the colour modifier', () => {
    render(<Tag colour="teal">Pending</Tag>);
    expect(screen.getByText('Pending')).toHaveClass('govuk-tag--teal');
  });
});
