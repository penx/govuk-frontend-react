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

export const withFinalForm = (
  <Form
    onSubmit={() => null}
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
        <Button type="submit">Submit</Button>
        <pre>Values: {JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  />
);

// Example from https://codesandbox.io/s/q8yRqQMp
export const withFormik = (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      action('on-submit')(values);
      setTimeout(() => {
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && errors.email}
        <Input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && touched.password && errors.password}
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    )}
  </Formik>
);
