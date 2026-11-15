export function isSet(value: unknown): boolean {
  return value !== undefined && value !== null && value !== false && value !== '';
}

export function joinIds(...ids: Array<string | false | undefined>): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined;
}
