import { Fieldset } from '../../src';
import { attributes, className, content, html, optional, type Options } from '../nunjucks/helpers';
import { sizeFromClasses, type CompositeMapping } from './helpers';

export default {
  supports: [
    'legend.text',
    'legend.html',
    'legend.isPageHeading',
    'legend.classes',
    'html',
    'role',
    'describedBy',
    'classes',
    'attributes',
  ],
  render: (options) => {
    const legend = options.legend as Options | undefined;
    const legendSize = sizeFromClasses(legend?.classes, 'govuk-fieldset__legend');
    if (legendSize === false) return null;
    return (
      <Fieldset.Composite
        legend={content(legend)}
        {...optional('legendSize', legendSize)}
        legendIsPageHeading={Boolean(legend?.isPageHeading)}
        {...optional('role', options.role as string)}
        {...optional('aria-describedby', (options.describedBy as string) || undefined)}
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {options.html ? html(options.html) : undefined}
      </Fieldset.Composite>
    );
  },
} satisfies CompositeMapping;
