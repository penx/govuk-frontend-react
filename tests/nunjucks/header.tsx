import { Header } from '../../src';
import { attributes, className, type Options } from './helpers';

export default function header(options: Options) {
  const containerClasses = options.containerClasses as string | undefined;
  const fullWidth = containerClasses === 'govuk-header__container--full-width';
  return (
    <Header.Root className={className(options)} {...attributes(options.attributes)}>
      <Header.Container fullWidth={fullWidth} className={fullWidth ? undefined : containerClasses}>
        <Header.Logo>
          <Header.HomepageLink href={(options.homepageUrl as string) || undefined}>
            <Header.Logotype />
            {options.productName ? (
              <>
                {' '}
                <Header.ProductName>{options.productName as string}</Header.ProductName>
              </>
            ) : null}
          </Header.HomepageLink>
        </Header.Logo>
      </Header.Container>
    </Header.Root>
  );
}
