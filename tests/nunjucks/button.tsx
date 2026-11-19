import { Button, StartButton } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function button(options: Options) {
  const Component = options.isStartButton ? StartButton : Button;
  return (
    <Component
      {...optional('href', options.href || undefined)}
      {...optional('type', options.type)}
      {...optional('name', options.name || undefined)}
      {...optional('value', options.value || undefined)}
      {...optional('disabled', options.disabled || undefined)}
      {...optional('preventDoubleClick', options.preventDoubleClick)}
      {...optional('id', options.id)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </Component>
  );
}
