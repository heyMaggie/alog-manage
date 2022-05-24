import React from "react";
import styles from "./index.module.less";
// import { Icon } from "antd";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

class Header extends React.PureComponent {
    state = {};

    handleClick = () => {
        sessionStorage.removeItem("isLogin");
        this.props.history.push("/login");
        if (window.electron && window.electron.ipcRenderer) {
            ipc.send("logout");
        }
    };
    render() {
        return (
            <div className={styles.flexbox}>
                <div className={styles.left}>
                    <div className={styles.logo}>华云信息</div>
                </div>
                <div className={styles.right}>
                    <div className={styles.out} onClick={this.handleClick}>
                        退出
                    </div>
                </div>
            </div>
        );
    }
}
// const mapStateToProps = (state, ownProps) => {
//     return {
//         config: state.config,
//     };
// };
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         setConfig: (config) => {
//             dispatch({ type: "setConfig", payload: config });
//         },
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Header));
// export default withRouter(Form.create()(Header));
// export default Form.create()(Header);
export default Header;
