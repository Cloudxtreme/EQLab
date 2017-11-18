import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise'
import localStorageMiddleware from './middleware'
// import logger from 'redux-logger'
import reducer from './reducers/reducer.js'
import rootSaga from './saga/saga.js'

// const getMiddleware = () => {
//   if (process.env.NODE_ENV === 'production') {
//     return applyMiddleware(promiseMiddleware, localStorageMiddleware);
//   } else {
//     // Enable additional logging in non-production environments.
//     return applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger())
//   }
// }

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer, 
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(promiseMiddleware),
    applyMiddleware(localStorageMiddleware),
    // applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

export default store;