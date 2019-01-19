import React from 'react';
import { Form, Field } from 'react-final-form';
import { Formik } from 'formik';
import { action } from '@storybook/addon-actions';

import Input from '.';
import Button from '../button';

export default (
  <Input
    label={{ children: 'Label' }}
    hint={{ children: 'Hint' }}
    errorMessage={{ children: 'Error' }}
    id="test"
  />
);

const required = value => (value ? undefined : 'Required');

// TODO: ids need to be set on form fields - should there be an error (missing required prop) if not included? Should final form and formik examples be in unit tests?

// TODO: form behaviour for error messages should adhere to https://design-system.service.gov.uk/components/error-message/
// Specifically "Do not show error messages... when they move away from a field"
// Further discussion here https://github.com/alphagov/govuk-design-system-backlog/issues/47#issuecomment-454849703
export const withFinalForm = (
  <Form
    initialValues={{ firstName: '', lastName: '' }}
    onSubmit={action('submit')}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <Field name="firstName" validate={required}>
          {({ input, meta }) => (
            <Input
              type="text"
              placeholder="First Name"
              label="First Name"
              errorMessage={meta.touched && meta.error}
              {...input}
            />
          )}
        </Field>
        <Field name="lastName" validate={required}>
          {({ input, meta }) => (
            <Input
              type="text"
              placeholder="Last Name"
              label="Last Name"
              errorMessage={meta.touched && meta.error}
              {...input}
            />
          )}
        </Field>
        <Button type="submit">Submit</Button>
        <pre>Values: {JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  />
);

export const withFormik = (
  <Formik
    initialValues={{ firstName: '', lastName: '' }}
    validate={values => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = 'Required';
      }
      if (!values.lastName) {
        errors.lastName = 'Required';
      }
      return errors;
    }}
    onSubmit={action('submit')}
  >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          placeholder="First Name"
          name="firstName"
          id="firstName"
          errorMessage={errors.firstName && touched.firstName && errors.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          id="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          errorMessage={errors.lastName && touched.lastName && errors.lastName}
        />
        <Button type="submit">Submit</Button>
        <pre>Values: {JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  </Formik>
);
