import type { ReactNode } from 'react';

export function hasContent(node: ReactNode): boolean {
  if (node === null || node === undefined || node === false || node === true || node === '') {
    return false;
  }
  if (Array.isArray(node)) return node.some(hasContent);
  return true;
}
