import React from "react";
import { Upload, Button, Icon, message, Card, Alert } from "antd";

export default class Demo extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("files", file);
        });

        this.setState({
            uploading: true,
        });
        http.post({
            url: "/file/fileUpload",
            method: "post",
            processData: false,
            data: formData,
            error: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
            },
        }).then((res) => {
            this.setState({
                // fileList: [],
                uploading: false,
            });
            message.success("文件全部上传成功!");
        });
    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            accept: ".xml",
            multiple: true,
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState((state) => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        let test = (
            <div>
                <div>用户信息： userInfo.xml</div>
                <div>资金信息： userAsset.xml</div>
                <div>股东信息： stockHolder.xml</div>
                <div>用户网关： userPbuGwConfig.xml</div>
                <div>证券信息： securityInfo.xml</div>
                <div>期权信息： optionInfo.xml</div>
                <div>用户配置： userConfig.xml</div>
                <div>交易时间组：tradeTimeGroup.xml</div>
                <div>持仓限额： positionLimit.xml</div>
                <div>期权持仓： optionPosition.xml</div>
                <div>交易网关： gwConfig.xml</div>
                <div>费率配置： feeRateConf.xml</div>
                <div>组合持仓策略： strategyPosition.xml</div>
                <div>组合持仓配置： optionCombinationStrategy.xml</div>
                <div>合约品种持仓： contractVarietyPos.xml</div>
            </div>
        );
        return (
            <div>
                <Card title="多文件上传">
                    <Upload {...props}>
                        <Button type="primary">
                            <Icon type="plus" /> 选择文件
                        </Button>
                    </Upload>
                    <Button
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        <Icon type="upload" />{" "}
                        {uploading ? "上传中" : "文件上传"}
                    </Button>
                </Card>
                <Alert
                    message="多文件上传,上传文件名需要预规定文件名一致,才能正常上传。"
                    description={test}
                    type="info"
                />
            </div>
        );
    }
}
