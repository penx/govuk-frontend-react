import { LabelComposite } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function label(options: Options) {
  return (
    <LabelComposite
      className={className(options)}
      {...attributes(options.attributes)}
      {...optional('htmlFor', options.for)}
      isPageHeading={Boolean(options.isPageHeading)}
    >
      {content(options)}
    </LabelComposite>
  );
}
