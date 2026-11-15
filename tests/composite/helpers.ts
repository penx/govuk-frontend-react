import type { ReactElement } from 'react';
import type { Options } from '../nunjucks/helpers';

export type CompositeMapping = {
  /** Option paths the composite can express. A segment of `*` matches any key or index, and a path covers everything below it. */
  supports: string[];
  /** Returns null for a fixture the composite can't express in a way `supports` can't describe. */
  render: (options: Options) => ReactElement | null;
};

function paths(value: unknown, prefix: string[] = []): string[][] {
  if (value === null || value === undefined) return [];
  if (value === null || typeof value !== 'object') return [prefix];
  const entries = Object.entries(value);
  if (entries.length === 0) return [prefix];
  return entries.flatMap(([key, child]) => paths(child, [...prefix, key]));
}

function covers(pattern: string, path: string[]) {
  const segments = pattern.split('.');
  return segments.length <= path.length && segments.every((s, i) => s === '*' || s === path[i]);
}

/** The option paths a fixture uses that the composite can't express. */
export function unsupported(options: Options, supports: string[]): string[] {
  return paths(options)
    .filter((path) => path.length > 0 && !supports.some((pattern) => covers(pattern, path)))
    .map((path) => path.join('.'));
}

const text = ['text', 'html'];

/** `label.text`, `label.html` and so on, for options passed as a content prop. */
export const contentOf = (...names: string[]) =>
  names.flatMap((name) => text.map((key) => `${name}.${key}`));

/** The options every form control Field takes. */
export const fieldSupports = [
  'id',
  'name',
  'disabled',
  'describedBy',
  'classes',
  'attributes',
  ...contentOf('label', 'hint', 'errorMessage'),
];
