import { SkipLink } from '../../src';
import { attributes, className, content, type Options } from './helpers';

export default function skipLink(options: Options) {
  return (
    <SkipLink
      href={options.href as string | undefined}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </SkipLink>
  );
}
