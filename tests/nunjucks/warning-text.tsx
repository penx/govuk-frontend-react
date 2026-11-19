import { WarningTextContainer, WarningTextIcon, WarningTextTextComposite } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function warningText(options: Options) {
  return (
    <WarningTextContainer className={className(options)} {...attributes(options.attributes)}>
      <WarningTextIcon />{' '}
      <WarningTextTextComposite {...optional('iconFallbackText', options.iconFallbackText)}>
        {content(options)}
      </WarningTextTextComposite>
    </WarningTextContainer>
  );
}
