import { Button, StartButton } from '../../src';
import { attributes, className, content, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: [
    'href',
    'type',
    'name',
    'value',
    'disabled',
    'preventDoubleClick',
    'id',
    'isStartButton',
    'text',
    'html',
    'classes',
    'attributes',
  ],
  render: (options) => {
    const Component = options.isStartButton ? StartButton : Button;
    return (
      <Component
        {...optional('href', (options.href as string) || undefined)}
        {...optional('type', options.type as 'button')}
        {...optional('name', (options.name as string) || undefined)}
        {...optional('value', (options.value as string) || undefined)}
        {...optional('disabled', (options.disabled as boolean) || undefined)}
        {...optional('preventDoubleClick', options.preventDoubleClick as boolean)}
        {...optional('id', options.id as string)}
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {content(options)}
      </Component>
    );
  },
} satisfies CompositeMapping;
