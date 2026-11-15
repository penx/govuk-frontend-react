import { parseDocument } from 'htmlparser2';
import type { ChildNode, Element } from 'domhandler';

export function normaliseHtml(html: string): string {
  const doc = parseDocument(html, { lowerCaseAttributeNames: true, decodeEntities: true });
  return serialiseChildren(doc.children, 0).join('\n');
}

function serialiseChildren(children: ChildNode[], depth: number): string[] {
  const lines: string[] = [];
  const indent = '  '.repeat(depth);
  const merged: Array<ChildNode | string> = [];
  for (const child of children) {
    if (child.type === 'comment') continue;
    if (child.type === 'text') {
      const last = merged[merged.length - 1];
      if (typeof last === 'string') merged[merged.length - 1] = last + child.data;
      else merged.push(child.data);
    } else {
      merged.push(child);
    }
  }
  merged.forEach((child, index) => {
    if (typeof child === 'string') {
      let text = child.replace(/\s+/g, ' ');
      if (!isInline(merged[index - 1])) text = text.trimStart();
      if (!isInline(merged[index + 1])) text = text.trimEnd();
      if (text === '') return;
      lines.push(`${indent}${JSON.stringify(text)}`);
      return;
    }
    if (child.type === 'tag' || child.type === 'script' || child.type === 'style') {
      const el = child as Element;
      lines.push(`${indent}<${el.name}${serialiseAttributes(el.attribs)}>`);
      lines.push(...serialiseChildren(el.children, depth + 1));
    }
  });
  return lines;
}

const blockElements = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'details',
  'dialog',
  'dd',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'legend',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'summary',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'td',
  'th',
  'caption',
  'ul',
  'option',
  'script',
  'style',
  'template',
  'label',
  'input',
  'select',
  'textarea',
  'g',
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'rect',
  'title',
]);

function isInline(node: ChildNode | string | undefined): boolean {
  if (node === undefined) return false;
  if (typeof node === 'string') return true;
  return node.type === 'tag' && !blockElements.has((node as Element).name);
}

function serialiseAttributes(attribs: Record<string, string>): string {
  return Object.keys(attribs)
    .sort()
    .map((name) => {
      let value = attribs[name] ?? '';
      if (name === 'class') {
        value = [...new Set(value.split(/\s+/).filter(Boolean))].sort().join(' ');
      } else if (name === 'style') {
        value = value
          .split(';')
          .map((declaration) => declaration.trim().replace(/\s*:\s*/, ':'))
          .filter(Boolean)
          .join(';');
      }
      return ` ${name}=${JSON.stringify(value)}`;
    })
    .join('');
}
