import { Tag } from '../../src';
import { attributes, className, content, type Options } from './helpers';

export default function tag(options: Options) {
  return (
    <Tag className={className(options)} {...attributes(options.attributes)}>
      {content(options)}
    </Tag>
  );
}
