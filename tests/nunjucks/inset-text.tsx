import { InsetText } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function insetText(options: Options) {
  return (
    <InsetText
      {...optional('id', options.id)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </InsetText>
  );
}
