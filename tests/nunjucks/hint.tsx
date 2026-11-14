import { Hint } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function hint(options: Options) {
  return (
    <Hint
      {...optional('id', options.id)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </Hint>
  );
}
