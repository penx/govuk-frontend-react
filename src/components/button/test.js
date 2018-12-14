import ReactDOM from 'react-dom';
import defaultFixture, { hrefAndRole, buttonWithType } from './fixtures';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(defaultFixture, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('hrefAndRole', () => {
  const div = document.createElement('div');
  ReactDOM.render(hrefAndRole, div);
  // TODO: assert is anchor, has href=#test, has role=presentation
  ReactDOM.unmountComponentAtNode(div);
});

it('buttonWithType', () => {
  const div = document.createElement('div');
  ReactDOM.render(buttonWithType, div);
  // TODO: assert is button, has type=button
  ReactDOM.unmountComponentAtNode(div);
});
