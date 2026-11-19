import { WarningText } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function warningText(options: Options) {
  return (
    <WarningText
      {...optional('iconFallbackText', options.iconFallbackText)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </WarningText>
  );
}
