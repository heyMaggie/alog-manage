import React from "react";
import ReloadComponent from "../ReloadComponent";

class tabComponent extends React.PureComponent {
  render() {
    const { component: Component, tabReloading, finishReload } = this.props;
    if (tabReloading) {
      return <ReloadComponent finishReload={finishReload}></ReloadComponent>;
    }
    return <Component></Component>;
  }
}
export default tabComponent;
