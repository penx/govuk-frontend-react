import { Button, StartButtonContent, StartButtonIcon } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function button(options: Options) {
  const children = content(options);
  return (
    <Button
      {...optional('href', options.href || undefined)}
      {...optional('type', options.type)}
      {...optional('name', options.name || undefined)}
      {...optional('value', options.value || undefined)}
      {...optional('disabled', options.disabled || undefined)}
      {...optional('preventDoubleClick', options.preventDoubleClick)}
      {...optional('id', options.id)}
      start={Boolean(options.isStartButton)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {options.isStartButton ? (
        <>
          {typeof children === 'string' || children === undefined ? (
            children
          ) : (
            <StartButtonContent>{children}</StartButtonContent>
          )}{' '}
          <StartButtonIcon />
        </>
      ) : (
        children
      )}
    </Button>
  );
}
