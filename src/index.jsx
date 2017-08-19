import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddlewar from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './components/CTodo';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(thunkMiddlewar));
const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);
if (module.hot) {
  module.hot.accept('./components/Todo', () => {
    // const nextApp = require('./components/Todo').default;
    render(App);
  });
}
