import { clsx, type ClassValue } from 'clsx';

export type ClassNames<Name extends string> = Partial<Record<Name, string>>;

export function classNameLookup<Name extends string>(classNames: ClassNames<Name> | undefined) {
  return (...names: Array<Name | false | null | undefined>) =>
    clsx(names.map((name) => (name ? (classNames?.[name] ?? name) : undefined)));
}

export const cx = (...values: ClassValue[]) => clsx(values) || undefined;
