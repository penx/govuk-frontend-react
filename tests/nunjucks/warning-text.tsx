import { WarningText } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function warningText(options: Options) {
  return (
    <WarningText.Root className={className(options)} {...attributes(options.attributes)}>
      <WarningText.Icon />{' '}
      <WarningText.TextComposite {...optional('iconFallbackText', options.iconFallbackText)}>
        {content(options)}
      </WarningText.TextComposite>
    </WarningText.Root>
  );
}
