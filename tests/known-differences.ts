// `component/fixture name` to the reason it differs from govuk-frontend.
export const knownDifferences: Record<string, string> = {
  'panel/interruption, submit action':
    'The action passes value="" through attributes. Button.Root drops an empty value, as govuk-frontend does for the button `value` option, and React cannot tell the two apart.',
  'panel (composite)/interruption, submit action':
    'As for the parts: Button.Root drops an empty value.',
  'character-count (composite)/with textarea maxlength attribute':
    'CharacterCount.Field takes `maxLength` as the count limit, so it never reaches the textarea. Use the parts to set both.',
};
