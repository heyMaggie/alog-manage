import React from "react";
import App from "./App";

// import store from "./store/index";
import configStore from "./store/index";
import { Provider } from "react-redux";

class Root extends React.Component {
  render() {
    let { preloadStore = {}, onStoreCreated } = this.props;
    // console.log(preloadStore);
    let nowStore = configStore(preloadStore);
    onStoreCreated(nowStore);
    return (
      <Provider store={nowStore}>
        <App />
      </Provider>
    );
  }
}
export default Root;
