import React from 'react';
import { Form, Field } from 'react-final-form';
import { Formik } from 'formik';
import { action } from '@storybook/addon-actions';

import DateInput from '.';
import Button from '../button';

const required = value => (value ? undefined : 'Required');

export const withChildren = (
  // TODO: fieldset usage is ugly
  <DateInput fieldset={{ legend: { children: 'Birthday' } }} hint="For example, 31 3">
    <DateInput.Item label="Day" name="day" className="govuk-input--width-2" />
    <DateInput.Item label="Month" name="month" className="govuk-input--width-2" />
  </DateInput>
);

// TODO: ids on form fields
export const withFinalForm = (
  <Form
    initialValues={{ dateOfBirth: '' }}
    onSubmit={action('submit')}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <Field name="dateOfBirth" validate={required}>
          {({ input, meta }) => (
            <DateInput label="Date of Birth" errorMessage={meta.touched && meta.error} {...input} />
          )}
        </Field>
        <Button type="submit">Submit</Button>
        <pre>Values: {JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  />
);

// TODO: with final form/formik and children

export const withFormik = (
  <Formik
    initialValues={{ dateOfBirth: '' }}
    validate={values => {
      const errors = {};
      if (!values.dateOfBirth) {
        errors.firstName = 'Required';
      }
      return errors;
    }}
    onSubmit={action('submit')}
  >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <DateInput
          label="Date of Birth"
          placeholder="Date of Birth"
          name="dateOfBirth"
          id="dateOfBirth"
          errorMessage={errors.firstName && touched.firstName && errors.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
        <Button type="submit">Submit</Button>
        <pre>Values: {JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  </Formik>
);
