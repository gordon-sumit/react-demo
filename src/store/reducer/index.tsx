import { combineReducers } from "redux";
import todos from "./todos";
import auth from "./auth"
import registerReducer from "./registerReducer";
import profileReducers from "./profileReducers";
import errorReducer from "./errorReducer";
import form from "./form";
import eventReducer from "./event.reducer";
import Vegetable from "./vegetable";
export default combineReducers({ todos,auth,registerReducer,profileReducers,errorReducer,form,eventReducer,Vegetable });