import { Button } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function button(options: Options) {
  return (
    <Button.Root
      {...optional('href', options.href || undefined)}
      {...optional('type', options.type)}
      {...optional('name', options.name)}
      {...optional('value', options.value)}
      {...optional('disabled', options.disabled || undefined)}
      {...optional('preventDoubleClick', options.preventDoubleClick)}
      {...optional('id', options.id)}
      start={Boolean(options.isStartButton)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </Button.Root>
  );
}
