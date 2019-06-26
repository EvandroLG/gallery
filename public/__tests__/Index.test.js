import ReactDOM from 'react-dom';

jest.mock('react-dom');

describe('index', () => {
  it('should render without crashing', () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `;

    ReactDOM.render = jest.fn();
    require('../Index');
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
