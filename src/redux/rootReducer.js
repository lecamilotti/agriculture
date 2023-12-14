import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import producerReducer from './producerReducer';
import { thunk } from 'redux-thunk';

const initialState = {};

const rootReducer = combineReducers({
  producer: producerReducer,
  // Add other reducers if needed
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
