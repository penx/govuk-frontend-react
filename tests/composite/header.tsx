import { Header } from '../../src';
import { attributes, className, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: ['homepageUrl', 'productName', 'containerClasses', 'classes', 'attributes'],
  render: (options) => {
    const containerClasses = options.containerClasses as string | undefined;
    const fullWidth = containerClasses === 'govuk-header__container--full-width';
    return (
      <Header.Composite
        {...optional('homepageHref', (options.homepageUrl as string) || undefined)}
        productName={options.productName as string | undefined}
        fullWidth={fullWidth}
        containerClassName={fullWidth ? undefined : containerClasses}
        className={className(options)}
        {...attributes(options.attributes)}
      />
    );
  },
} satisfies CompositeMapping;
