import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, Form } from 'react-final-form';
import { Formik } from 'formik';
import { fn } from 'storybook/test';
import fixtures from 'govuk-frontend/dist/govuk/components/input/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/input';
import * as Button from '../button';
import * as Input from '.';

const meta = { title: 'Input', component: Input.Root } satisfies Meta<typeof Input.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: 'test', label: 'Label', hint: 'Hint', errorMessage: 'Error' },
};

const required = (value: unknown) => (value ? undefined : 'Required');

export const WithFinalForm: Story = {
  render: () => (
    <Form
      initialValues={{ firstName: '', lastName: '' }}
      onSubmit={fn()}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="firstName" validate={required}>
            {({ input, meta }) => (
              <Input.Root label="First name" errorMessage={meta.touched && meta.error} {...input} />
            )}
          </Field>
          <Field name="lastName" validate={required}>
            {({ input, meta }) => (
              <Input.Root label="Last name" errorMessage={meta.touched && meta.error} {...input} />
            )}
          </Field>
          <Button.Root>Submit</Button.Root>
          <pre>Values: {JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    />
  ),
};

export const WithFormik: Story = {
  render: () => (
    <Formik
      initialValues={{ firstName: '', lastName: '' }}
      validate={(values) => ({
        ...(values.firstName ? {} : { firstName: 'Required' }),
        ...(values.lastName ? {} : { lastName: 'Required' }),
      })}
      onSubmit={fn()}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input.Root
            label="First name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={touched.firstName && errors.firstName}
          />
          <Input.Root
            label="Last name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={touched.lastName && errors.lastName}
          />
          <Button.Root>Submit</Button.Root>
          <pre>Values: {JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    </Formik>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
