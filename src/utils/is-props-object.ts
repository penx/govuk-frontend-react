import { isValidElement, type ReactNode } from 'react';

export function isPropsObject<P extends object>(value: ReactNode | P): value is P {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !isValidElement(value) &&
    !(Symbol.iterator in value)
  );
}

export function hasContent(node: ReactNode): boolean {
  if (node === null || node === undefined || node === false || node === true || node === '') {
    return false;
  }
  if (Array.isArray(node)) return node.some(hasContent);
  return true;
}
