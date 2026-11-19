import type { LabelProps } from '../components/label';
import type { LegendProps } from '../components/fieldset';

export function isSet(value: unknown): boolean {
  return value !== undefined && value !== null && value !== false && value !== '';
}

/** Ids for `aria-describedby`, each once, so a description isn't read twice when the caller already passes one of them. */
export function joinIds(...ids: Array<string | false | undefined>): string | undefined {
  const unique = new Set(ids.flatMap((id) => (id ? id.split(/\s+/).filter(Boolean) : [])));
  return [...unique].join(' ') || undefined;
}

export type LabelFieldProps = {
  labelSize?: LabelProps['size'];
  labelIsPageHeading?: boolean;
};

export type LegendFieldProps = {
  legendSize?: LegendProps['size'];
  legendIsPageHeading?: boolean;
};
