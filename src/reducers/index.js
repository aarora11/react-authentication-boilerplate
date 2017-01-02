import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import cricketReducer from './cricket_reducer';

const rootReducer = combineReducers({
  form ,
  auth : authReducer,
  cricket: cricketReducer
});

export default rootReducer;
