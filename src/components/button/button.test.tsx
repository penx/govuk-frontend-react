import { render, screen } from '@testing-library/react';
import { createRef, type ComponentProps, type MouseEvent } from 'react';
import * as Button from '.';

describe('Button', () => {
  test.each(['secondary', 'warning', 'inverse'] as const)('variant %s', (variant) => {
    render(<Button.Root variant={variant}>Go</Button.Root>);
    expect(screen.getByRole('button')).toHaveClass(`govuk-button--${variant}`);
  });

  test('omits empty name and value', () => {
    render(
      <Button.Root name="" value="">
        Go
      </Button.Root>,
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('name');
    expect(screen.getByRole('button')).not.toHaveAttribute('value');
  });

  test('keeps href when as is set', () => {
    render(
      <Button.Root as="a" href="/next">
        Next
      </Button.Root>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('href', '/next');
  });

  test('link onClick receives an anchor event', () => {
    let target: HTMLAnchorElement | undefined;
    render(
      <Button.Root
        href="#"
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          target = event.currentTarget;
        }}
      >
        Go
      </Button.Root>,
    );
    screen.getByRole('button').click();
    expect(target?.tagName).toBe('A');
  });

  test('links do not get button-only attributes', () => {
    render(
      <Button.Root href="/start" disabled type="button" name="n" value="v" preventDoubleClick>
        Start
      </Button.Root>,
    );
    const link = screen.getByRole('button', { name: 'Start' });
    for (const attribute of ['disabled', 'aria-disabled', 'type', 'name', 'value']) {
      expect(link).not.toHaveAttribute(attribute);
    }
    expect(link).not.toHaveAttribute('data-prevent-double-click');
  });

  test('renders a router link with as', () => {
    const Link = ({ to, children, ...props }: ComponentProps<'a'> & { to: string }) => (
      <a href={to} {...props}>
        {children}
      </a>
    );
    render(
      <Button.Root as={Link} to="/next">
        Next
      </Button.Root>,
    );
    const link = screen.getByRole('button', { name: 'Next' });
    expect(link).toHaveAttribute('href', '/next');
    expect(link).toHaveClass('govuk-button');
  });

  test('forwards ref to the element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button.Root ref={ref}>Save</Button.Root>);
    expect(ref.current).toBe(screen.getByRole('button'));
  });
});
