import React from "react";
// import styles from "./index.module.less";

class Model extends React.PureComponent {
  componentDidMount() {
    const { finishReload } = this.props;
    if (typeof finishReload == "function") {
      finishReload();
    }
  }
  render() {
    return null;
  }
}
export default Model;
