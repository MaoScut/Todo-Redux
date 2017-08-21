import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddlewarre from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import App from './components/CTodo';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(thunkMiddleware, promiseMiddlewarre));
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
  // module.hot.accept('./components/CTodo', () => {
  //   const nextApp = require('./components/CTodo').default;
  //   render(nextApp);
  // });
  module.hot.accept();
}
