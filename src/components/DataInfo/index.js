import React from "react";
import styles from "./index.module.less";

export default class DataInfo extends React.PureComponent {
    render() {
        let { text = "数量", value = "0", style = {} } = this.props;
        return (
            <div className={styles.info} style={style}>
                <div className={styles.text}>{text}</div>
                <div className={styles.number}>{value}</div>
            </div>
        );
    }
}
