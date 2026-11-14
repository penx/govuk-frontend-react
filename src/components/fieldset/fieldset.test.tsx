import { render, screen } from '@testing-library/react';
import { Fieldset } from '.';

describe('Fieldset', () => {
  test('legend can be content', () => {
    render(<Fieldset legend="Address" />);
    expect(screen.getByRole('group', { name: 'Address' })).toBeInTheDocument();
  });

  test('legend size adds the legend size modifier', () => {
    render(<Fieldset legend={{ children: 'Address', size: 'l' }} />);
    expect(screen.getByText('Address')).toHaveClass('govuk-fieldset__legend--l');
  });

  test('omits the legend when it has no content', () => {
    const { container } = render(<Fieldset legend="" />);
    expect(container.querySelector('legend')).toBeNull();
  });

  test('Legend can be used directly', () => {
    render(
      <fieldset>
        <Fieldset.Legend isPageHeading>Title</Fieldset.Legend>
      </fieldset>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
  });

  test('legend classNames merge with the fieldset classNames', () => {
    render(
      <Fieldset
        classNames={{ 'govuk-fieldset__legend': 'legend' }}
        legend={{
          children: 'Title',
          isPageHeading: true,
          classNames: { 'govuk-fieldset__heading': 'heading' },
        }}
      />,
    );
    const heading = screen.getByRole('heading', { name: 'Title' });
    expect(heading).toHaveClass('heading');
    expect(heading.parentElement).toHaveClass('legend');
  });
});
