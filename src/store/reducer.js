import { combineReducers } from "redux";

import config from "./modules/config";
import RouterModel from "./modules/RouterModel";
// console.log(filmReducer);
// console.log(typeof filmReducer);

export default combineReducers({
  config: config,
  RouterModel
});
