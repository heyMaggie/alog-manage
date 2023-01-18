import React from "react";
import styles from "./index.module.less";
import { Icon } from "antd";

export default class TagLabel extends React.PureComponent {
    render() {
        let record = this.props.record;
        // console.log(record);
        let sty = {
            background: "rgba(50,129,255,0.2)",
            color: "#3281FF",
        };
        let iconOpt = {
            type: "line",
            style: {
                color: "white",
                background: "#3281FF",
                borderRadius: "50%",
                fontSize: "12px",
                marginRight: "5px",
                marginLeft: "8px",
            },
        };
        if (this.props.type == "success") {
            sty = {
                background: "rgba(101,201,44,0.2)",
                color: "#65c92c",
            };
            iconOpt.type = "check";
            iconOpt.style.background = "#65c92c";
        } else if (this.props.type == "warn") {
            sty = {
                background: "rgba(255,105,50,0.2)",
                color: "#ff6932",
            };
            iconOpt.type = "exclamation";
            iconOpt.style.background = "#ff6932";
        } else if (this.props.type == "fail") {
            sty = {
                background: "rgba(153,153,153,0.2)",
                color: "#999999",
            };
            iconOpt.type = "line";
            iconOpt.style.background = "#999999";
        }
        if (this.props.color) {
            sty = {
                background: "rgba(50,129,255,0.2)",
                color: this.props.color,
            };
            iconOpt.style.background = this.props.color;
        }
        if (this.props.iconBg) {
            sty.background = this.props.iconBg;
            // iconOpt.style.background = this.props.textColor;
        }
        if (this.props.textColor) {
            // sty = {
            //     color: this.props.textColor,
            // };
            sty.color = this.props.textColor;
            iconOpt.style.background = this.props.textColor;
        }
        return (
            <div className={styles.tagWrap}>
                <span className={styles.tag} style={sty}>
                    <Icon {...iconOpt} />
                    {record}
                </span>
            </div>
        );
    }
}
