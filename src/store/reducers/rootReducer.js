import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import catReducer from './catReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  cats: catReducer,
});

export default rootReducer;