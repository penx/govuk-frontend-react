import React from 'react';
import { Form, Field } from 'react-final-form';

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

export const finalForm = (
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
