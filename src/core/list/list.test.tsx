import { render, screen } from '@testing-library/react';
import { List } from '.';

test('renders a numbered list as an ol', () => {
  render(
    <List variant="number">
      <li>One</li>
    </List>,
  );
  expect(screen.getByRole('list').tagName).toBe('OL');
});
