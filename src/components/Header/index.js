import React from "react";
import styles from "./index.module.less";
import { Popover, Icon } from "antd";
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
        let content = (
            <div>
                <div className={styles.item}>
                    修改密码
                    <Icon type="right" className={styles.icon} />
                </div>
                <div
                    style={{ borderTop: "solid 1px #DEE0E3" }}
                    className={styles.quit}
                    onClick={this.handleClick}
                >
                    退出登录
                </div>
            </div>
        );
        return (
            <div className={styles.flexbox}>
                <div className={styles.left}>
                    <div className={styles.logo}>华云信息</div>
                </div>
                <div className={styles.message}>消息</div>
                <div className={styles.help}>帮助中心</div>
                <div className={styles.right}>
                    <Popover content={content}>
                        <div className={styles.user}>
                            {sessionStorage.userName}
                        </div>
                    </Popover>
                    {/* <div className={styles.out} onClick={this.handleClick}>
                        退出
                    </div> */}
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
