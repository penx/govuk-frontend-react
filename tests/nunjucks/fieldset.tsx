import { Fieldset } from '../../src';
import { attributes, className, content, html, optional, type Options } from './helpers';

export default function fieldset(options: Options) {
  const legend = options.legend as Options | undefined;
  return (
    <Fieldset.Root
      className={className(options)}
      {...optional('role', options.role)}
      {...optional('aria-describedby', options.describedBy || undefined)}
      {...attributes(options.attributes)}
    >
      {legend && (
        <Fieldset.Legend
          className={className(legend)}
          isPageHeading={Boolean(legend.isPageHeading)}
        >
          {content(legend)}
        </Fieldset.Legend>
      )}
      {options.html ? html(options.html) : undefined}
    </Fieldset.Root>
  );
}
