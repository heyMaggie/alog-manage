import React from "react";
// import styles from "./index.css";
import { Link } from "react-router-dom";

class NotFound extends React.PureComponent {
  render() {
    return (
      <div>
        页面不存在&nbsp;&nbsp;<Link to="/">返回主页</Link>
      </div>
    );
  }
}
export default NotFound;
