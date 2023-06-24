import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import notificationReducer from './notification/notificationReducer.js';

const rootReducer = combineReducers({
  notification: notificationReducer,
})

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;