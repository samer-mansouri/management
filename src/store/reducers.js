import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

import Breadcrumb from "./Breadcrumb/reducer";  

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import Users from "./Users/reducer";
import Conges from "./Conges/reducer";
import Fiches from "./Fiches/reducer";

//Calendar
import calendar from "./calendar/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
   //Breadcrumb items
   Breadcrumb,
   
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  Users,
  Conges,
  Fiches,

})

export default rootReducer
