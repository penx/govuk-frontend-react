import { Button } from '../../src';
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
  render: (options) => (
    <Button.Composite
      {...optional('href', (options.href as string) || undefined)}
      {...optional('type', options.type as 'button')}
      {...optional('name', options.name as string)}
      {...optional('value', options.value as string)}
      {...optional('disabled', (options.disabled as boolean) || undefined)}
      {...optional('preventDoubleClick', options.preventDoubleClick as boolean)}
      {...optional('id', options.id as string)}
      start={Boolean(options.isStartButton)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </Button.Composite>
  ),
} satisfies CompositeMapping;
