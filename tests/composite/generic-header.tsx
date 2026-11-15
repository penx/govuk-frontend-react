import { GenericHeader } from '../../src';
import { attributes, className, html, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: ['url', 'logoText', 'logoHtml', 'containerClasses', 'classes', 'attributes'],
  render: (options) => {
    const containerClasses = options.containerClasses as string | undefined;
    const fullWidth = containerClasses === 'govuk-generic-header__container--full-width';
    return (
      <GenericHeader.Composite
        {...optional('homepageHref', (options.url as string) || undefined)}
        fullWidth={fullWidth}
        containerClassName={fullWidth ? undefined : containerClasses}
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {options.logoHtml ? html(options.logoHtml) : (options.logoText as string | undefined)}
      </GenericHeader.Composite>
    );
  },
} satisfies CompositeMapping;
