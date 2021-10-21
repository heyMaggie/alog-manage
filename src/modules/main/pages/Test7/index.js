import React from "react";
// import styles from "./index.module.less";
import { connect } from "react-redux";
import { Button } from "antd";

class Test7 extends React.PureComponent {
  handleClick = () => {
    // this.props.changeName();
  };
  render() {
    console.log("Test7 :", this.props);
    // let obj = {};
    // obj.name = "liniu";
    // obj.setName = function(name) {
    //   this.name = name;
    // };
    // console.log(obj);
    return (
      <div>
        全局用户名：{this.props.config.name}
        {/* <div>
          <Button type="primary" onClick={this.handleClick}>
            改变名字
          </Button>
        </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    config: state.config
  };
};

export default connect(mapStateToProps, null)(Test7);
