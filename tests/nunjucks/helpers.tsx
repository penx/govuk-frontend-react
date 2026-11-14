import type { ReactNode } from 'react';
import parse, { attributesToProps } from 'html-react-parser';

export type Options = Record<string, unknown>;

type AttributeValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { value: string | number | boolean | null | undefined; optional?: boolean };

export function attributes(attrs: unknown): Record<string, unknown> {
  if (!attrs || typeof attrs !== 'object') return {};
  const html: Record<string, string> = {};
  for (const [name, item] of Object.entries(attrs as Record<string, AttributeValue>)) {
    const { value, optional } =
      item !== null && typeof item === 'object' ? item : { value: item, optional: false };
    if (optional) {
      if (value === undefined || value === null || value === false) continue;
      html[name] = value === true ? '' : String(value);
    } else {
      html[name] = value === undefined || value === null ? '' : String(value);
    }
  }
  return attributesToProps(html);
}

export function html(value: unknown): ReactNode {
  return <>{parse(String(value).trim())}</>;
}

export function content(options: Options | undefined): ReactNode {
  if (!options) return undefined;
  if (options.html) return html(options.html);
  if (options.text !== undefined && options.text !== null && options.text !== '') {
    return String(options.text);
  }
  return undefined;
}

export function className(options: Options | undefined): string | undefined {
  return options?.classes ? String(options.classes) : undefined;
}

export function optional<T>(key: string, value: T | undefined): Record<string, T> {
  return value === undefined || value === null ? {} : { [key]: value };
}
