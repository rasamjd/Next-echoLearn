import { combineReducers } from "@reduxjs/toolkit";
import languageReducer from "./languages";

const rootReducer = combineReducers({
  languages: languageReducer
})

export default rootReducer
