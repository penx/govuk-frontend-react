import ReactDOM from 'react-dom';
import defaultFixture from './fixtures';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(defaultFixture, div);
  ReactDOM.unmountComponentAtNode(div);
});
