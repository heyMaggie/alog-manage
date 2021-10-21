import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
// import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//logger 放最后
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(reducer, composeEnhancers());

export default store;

// const configStore = preloadState => {
//   const store = createStore(reducer, preloadState, composeEnhancers());
//   return store;
// };

// export default configStore;
