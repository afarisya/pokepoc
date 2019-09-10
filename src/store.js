import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
// import WebsocketMiddleware from './middleware/WebsocketMiddleware';
import { createBrowserHistory, createHashHistory } from 'history';
import rootReducer from './reducers';

export const history = createBrowserHistory()

// Use this if you want to use routing with hash
// export const history = createHashHistory();

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  // logger,
  routerMiddleware(history)//,
//   WebsocketMiddleware
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store