import React from "react";
// import styles from "./index.module.less";
import { Button, Upload, Icon } from "antd";

export default class UploadWrap extends React.PureComponent {
    handleDownload = () => {
        if (this.props.handleDownload) {
            this.props.handleDownload();
        } else {
            window.location.href =
                window.baseURL + this.props.urlPrefix + "/download";
        }
    };
    render() {
        let uploadOption = this.props.uploadOption;
        if (!uploadOption) {
            uploadOption = {
                name: "file",
                accept: ".xml",
                showUploadList: false,
                action: window.baseURL + this.props.urlPrefix + "/upload",
                onChange: (info) => {
                    if (info.file.status !== "uploading") {
                        // console.log(info.file, info.fileList);
                    }
                    if (info.file.status === "done") {
                        if (info.file.response.code == 0) {
                            message.success(`${info.file.name} 上传成功`);
                            console.log(this.props.sucCallback);
                            if (this.props.sucCallback) {
                                this.props.sucCallback();
                            }
                        } else {
                            message.error(`${info.file.response.message}`);
                        }
                    } else if (info.file.status === "error") {
                        message.error(`${info.file.name} 上传失败`);
                    }
                },
            };
        }
        let { title = "", noUpload, noDownload } = this.props;
        // noUpload 没有上传按钮
        return (
            <React.Fragment>
                {!noUpload && (
                    <Upload {...uploadOption}>
                        <Button type="primary">
                            <Icon type="upload" /> {`${title}上传`}
                        </Button>
                    </Upload>
                )}
                {!noDownload && (
                    <Button type="primary" onClick={this.handleDownload}>
                        <Icon type="download" /> {`${title}导出`}
                    </Button>
                )}
            </React.Fragment>
        );
    }
}
