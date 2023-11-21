import { combineReducers } from 'redux';
import authReducer from '../Services/actionreducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
