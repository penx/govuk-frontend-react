import { Label, LabelWrapper } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function label(options: Options) {
  const children = content(options);
  if (children === undefined) return <></>;
  const label = (
    <Label
      className={className(options)}
      {...attributes(options.attributes)}
      {...optional('htmlFor', options.for)}
    >
      {children}
    </Label>
  );
  return options.isPageHeading ? <LabelWrapper>{label}</LabelWrapper> : label;
}
