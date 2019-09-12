import React from 'react';
import ReactDOM from 'react-dom';
import { makeMountRender, reduxify, snapshotify } from '../../utils/test-utils';
import App from '../../App';

describe('<App />', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('matches snapshot', function() {
    const wrapper = makeMountRender(reduxify(App))();
    expect(snapshotify(wrapper)).toMatchSnapshot();
  });
});
