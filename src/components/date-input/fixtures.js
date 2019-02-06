import React from 'react';
import { Form, Field } from 'react-final-form';
import { Formik } from 'formik';
import { action } from '@storybook/addon-actions';

import DateInput from '.';
import Button from '../button';

export const defaultWithEventHandlers = (
  <DateInput
    fieldset={{ legend: { children: 'Date of birth' } }}
    onBlur={action('blur')}
    onFocus={action('focus')}
    onChange={action('change')}
  />
);

export const withChildren = (
  // TODO: fieldset prop usage is ugly, but I would rather this was solved at govuk-frontend nunjucks templates first before addressing here
  // See GitHub issue: alphagov/govuk-frontend#1155
  <DateInput fieldset={{ legend: { children: 'Birthday' } }} hint="For example, 31 3">
    <DateInput.Item label="Day" name="day" className="govuk-input--width-2" />
    <DateInput.Item label="Month" name="month" className="govuk-input--width-2" />
  </DateInput>
);

// TODO: this doesn't currently mark any fields with a red border, all should be marked
// fieldErrors={meta.touched && meta.error && ['day', 'month', 'year']}
export const withFinalForm = (
  <Form
    initialValues={{ dateOfBirth: '' }}
    onSubmit={action('submit')}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="dateOfBirth"
          validate={value => (value.day && value.month && value.year ? undefined : 'Required')}
        >
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

const fieldLevelValidation = value =>
  value.day && value.month && value.year
    ? undefined
    : {
        message: 'Required',
        fields: ['day', 'month', 'year'].filter(key => !value[key])
      };

export const withFinalFormFieldLevelValidation = (
  <Form
    initialValues={{ dateOfBirth: '' }}
    onSubmit={action('submit')}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <Field name="dateOfBirth" validate={fieldLevelValidation}>
          {({ input, meta }) => (
            <DateInput
              label="Date of Birth"
              errorMessage={meta.touched && meta.error && meta.error.message}
              fieldErrors={meta.touched && meta.error && meta.error.fields}
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

// TODO: story for multiple instances of component with final form field level validation
