import { combineReducers } from 'redux';
import producerReducer from './producerReducer';

const rootReducer = combineReducers({
  producer: producerReducer,
  // Add other reducers if needed
});

export default rootReducer;
