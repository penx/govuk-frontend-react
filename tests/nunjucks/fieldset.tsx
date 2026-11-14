import { Fieldset } from '../../src';
import { attributes, className, content, html, optional, type Options } from './helpers';

export default function fieldset(options: Options) {
  const legend = options.legend as Options | undefined;
  return (
    <Fieldset
      className={className(options)}
      {...optional('role', options.role)}
      {...optional('aria-describedby', options.describedBy || undefined)}
      {...attributes(options.attributes)}
      legend={
        legend && {
          children: content(legend),
          className: className(legend),
          isPageHeading: Boolean(legend.isPageHeading),
        }
      }
    >
      {options.html ? html(options.html) : undefined}
    </Fieldset>
  );
}
