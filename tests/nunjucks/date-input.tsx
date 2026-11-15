import { DateInput, ErrorMessage, Fieldset, FormGroup, Hint } from '../../src';
import {
  attributes,
  className,
  content,
  describedBy as join,
  errorMessage,
  optional,
  subcomponent,
  type Options,
} from './helpers';

type Item = {
  id?: string;
  name?: string;
  value?: unknown;
  label?: string;
  classes?: string;
  error?: boolean;
  inputmode?: string;
  autocomplete?: string;
  pattern?: string;
  attributes?: unknown;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export default function dateInput(options: Options) {
  const id = options.id as string | undefined;
  const values = (options.values as Record<string, unknown> | undefined) ?? {};
  const fieldset = options.fieldset as Options | undefined;
  const namePrefix = options.namePrefix ? `${options.namePrefix}-` : '';
  const pick = (key: string, classes: string): Item | false | null =>
    options[key] === undefined
      ? { name: key, value: values[key], classes }
      : (options[key] as Item | false | null);
  const day = pick('day', 'govuk-input--width-2');
  const month = pick('month', 'govuk-input--width-2');
  const year = pick('year', 'govuk-input--width-4');
  const items = (options.items as (Item | null)[] | undefined)?.length
    ? (options.items as (Item | null)[])
    : [day, month, year];
  const hasErrorClass = (item: Item) => Boolean(item.classes?.includes('govuk-input--error'));
  const anyItemHasError = items.some((item) => item && (item.error || hasErrorClass(item)));
  const hint = subcomponent(options.hint);
  const error = errorMessage(options.errorMessage);
  const hintId = hint && `${id}-hint`;
  const errorId = error && `${id}-error`;
  const group = options.formGroup as Options | undefined;
  const beforeInputs = content(group?.beforeInputs as Options | undefined);
  const afterInputs = content(group?.afterInputs as Options | undefined);

  const renderItem = (item: Item, index: number) => {
    let itemName = item.name;
    let itemValue = item.value;
    let width = 2;
    const matches = (base: Item | false | null, name: string) =>
      item === base || (item.name && [name, base ? base.name : undefined].includes(item.name));
    for (const [base, name] of [
      [day, 'day'],
      [month, 'month'],
      [year, 'year'],
    ] as const) {
      if (matches(base, name)) {
        itemName = item.name || name;
        itemValue = item.value === undefined ? (base ? base.value : undefined) : item.value;
        if (name === 'year') width = 4;
        break;
      }
    }
    const itemHasError = Boolean(item.error) || hasErrorClass(item);
    const classes = [
      !hasErrorClass(item) &&
        (itemHasError || (item.error !== false && error && !anyItemHasError)) &&
        'govuk-input--error',
      !item.classes?.includes('govuk-input--width-') && `govuk-input--width-${width}`,
      item.classes,
    ]
      .filter(Boolean)
      .join(' ');
    const inputId = item.id || `${id}-${itemName}`;
    const value = itemValue === undefined ? values[namePrefix + itemName] : itemValue;
    return (
      <DateInput.Item key={index}>
        <FormGroup>
          <DateInput.Label htmlFor={inputId}>
            {item.label || capitalize(String(itemName))}
          </DateInput.Label>
          <DateInput.Input
            id={inputId}
            name={namePrefix + itemName}
            className={classes}
            {...optional('defaultValue', value === undefined ? undefined : String(value))}
            {...optional('inputMode', (item.inputmode as 'numeric') || undefined)}
            {...optional('autoComplete', item.autocomplete || undefined)}
            {...optional('pattern', item.pattern || undefined)}
            {...attributes(item.attributes)}
          />
        </FormGroup>
      </DateInput.Item>
    );
  };

  const inner = (
    <>
      {hint && <Hint id={hintId} {...hint} />}
      {error && <ErrorMessage id={errorId} {...error} />}
      <DateInput.Root
        className={className(options)}
        {...attributes(options.attributes)}
        {...optional('id', id)}
      >
        {beforeInputs}
        {items.map((item, index) => (item ? renderItem(item, index) : null))}
        {afterInputs}
      </DateInput.Root>
    </>
  );
  const legend = fieldset?.legend as Options | undefined;
  const fieldsetDescribedBy = join((fieldset?.describedBy as string) || '', hintId, errorId);

  return (
    <FormGroup
      error={Boolean(error)}
      className={className(options.formGroup as Options)}
      {...attributes((options.formGroup as Options | undefined)?.attributes)}
    >
      {fieldset ? (
        <Fieldset.Root
          role="group"
          {...optional('aria-describedby', fieldsetDescribedBy)}
          className={className(fieldset)}
          {...attributes(fieldset.attributes)}
        >
          {legend && (
            <Fieldset.Legend
              className={className(legend)}
              isPageHeading={Boolean(legend.isPageHeading)}
            >
              {content(legend)}
            </Fieldset.Legend>
          )}
          {inner}
        </Fieldset.Root>
      ) : (
        inner
      )}
    </FormGroup>
  );
}
