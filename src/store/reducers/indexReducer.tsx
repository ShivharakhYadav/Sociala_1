import appReducer from "./app/reducer";
import providerReducer from "./provider/providerReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    appReducer,
    providerReducer,
  })

export default rootReducer;