import type { LabelProps } from '../components/label';
import type { LegendProps } from '../components/fieldset';

export function isSet(value: unknown): boolean {
  return value !== undefined && value !== null && value !== false && value !== '';
}

export function joinIds(...ids: Array<string | false | undefined>): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined;
}

export type LabelFieldProps = {
  labelSize?: LabelProps['size'];
  labelIsPageHeading?: boolean;
};

export type LegendFieldProps = {
  legendSize?: LegendProps['size'];
  legendIsPageHeading?: boolean;
};
