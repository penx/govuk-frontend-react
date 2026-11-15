import { BackLink } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function backLink(options: Options) {
  return (
    <BackLink
      {...optional('href', options.href)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </BackLink>
  );
}
