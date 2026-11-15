import { GenericHeader } from '../../src';
import { attributes, className, html, type Options } from './helpers';

export default function genericHeader(options: Options) {
  const containerClasses = options.containerClasses as string | undefined;
  const fullWidth = containerClasses === 'govuk-generic-header__container--full-width';
  return (
    <GenericHeader.Root className={className(options)} {...attributes(options.attributes)}>
      <GenericHeader.Container
        fullWidth={fullWidth}
        className={fullWidth ? undefined : containerClasses}
      >
        <GenericHeader.Logo>
          <GenericHeader.HomepageLink href={(options.url as string) || undefined}>
            {options.logoHtml ? html(options.logoHtml) : (options.logoText as string | undefined)}
          </GenericHeader.HomepageLink>
        </GenericHeader.Logo>
      </GenericHeader.Container>
    </GenericHeader.Root>
  );
}
