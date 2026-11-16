// `component/fixture name` to the reason it differs from govuk-frontend.
export const knownDifferences: Record<string, string> = {
  'character-count (composite)/with textarea maxlength attribute':
    'CharacterCount.Field takes `maxLength` as the count limit, so it never reaches the textarea. Use the parts to set both.',
};
