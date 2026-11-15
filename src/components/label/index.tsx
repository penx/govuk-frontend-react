import { hasContent } from '../../utils/has-content';
import * as LabelParts from './parts';

export { LabelParts };

export type LabelProps = LabelParts.RootProps & {
  isPageHeading?: boolean;
};

export function Label({ isPageHeading, children, ...props }: LabelProps) {
  if (!hasContent(children)) return null;
  const label = <LabelParts.Root {...props}>{children}</LabelParts.Root>;
  return isPageHeading ? <LabelParts.Wrapper>{label}</LabelParts.Wrapper> : label;
}
