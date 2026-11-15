export type Translation = string | Partial<Record<Intl.LDMLPluralRule, string>>;

export function i18nAttributes(
  key: string,
  message: Translation | undefined,
): Record<string, string> {
  if (!message) return {};
  if (typeof message === 'string') return { [`data-i18n.${key}`]: message };
  return Object.fromEntries(
    Object.entries(message).map(([rule, text]) => [`data-i18n.${key}.${rule}`, String(text)]),
  );
}
