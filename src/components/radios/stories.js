import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/radios/radios.json';
import { action } from '@storybook/addon-actions';

import Radios from '.';
import Button from '../button';
import render from '../../../tests/render';

const stories = storiesOf('Radios', module);
stories.add('testing', () =>
  render(
    'radios',
    {
      items: [
        {
          value: 'value',
          text: 'This is text',
          id: 'item-id',
          hint: {
            text: 'This is a hint'
          }
        }
      ]
    },
    { renderMode: 'react' }
  )
);

template.examples.forEach(example => {
  stories.add(example.name, () => render('radios', example.data, { renderMode: 'react' }));
});

const FFRadio = ({ input, meta, children }) => <Radios.Radio {...input}>{children}</Radios.Radio>;

// TODO: validation required item, error message display
// TODO: name=colour should be accessible from context api
stories.add('with final form, individual fields', () => (
  <Form
    initialValues={{ colour: '' }}
    onSubmit={action('submit')}
    validate={({ colour }) => ({ colour: !colour && 'You must select a colour' })}
    render={({ handleSubmit, values, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <Radios name="colour" errorMessage={touched.colour && errors.colour}>
          <Field type="radio" name="colour" value="blue" component={FFRadio}>
            Blue
          </Field>
          <Field type="radio" name="colour" value="red" component={FFRadio}>
            Red
          </Field>
        </Radios>
        <Button type="submit">Submit</Button>
        <pre>Values: {JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  />
));

// TODO: final form with Radios as single field
