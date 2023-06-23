import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/indexReducer';
// import { createLogger } from 'redux-logger'
// const logger = createLogger()
// const store = createStore(rootReducer,applyMiddleware(logger));
const store = createStore(rootReducer);
export default store;