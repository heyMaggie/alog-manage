import React from "react";
import { Button, Popconfirm } from "antd";
import styles from "./index.module.less";
import SearchForm from "@/components/SearchForm";
import DynamicModal from "@/components/DynamicModal";
import Table from "@/components/Table";
import DynamicDescriptions from "@/components/DynamicDescriptions";
// import SplitPane from "react-split-pane";
import UploadWrap from "@/components/UploadWrap";
import { connect } from "react-redux";

class CurdComponent extends React.PureComponent {
    state = {
        insertModalVisible: false,
        updateModalVisible: false,
        detailModalVisible: false,
        scroll: this.props.scroll,
    };
    handleInsertBtn = () => {
        this.setState({
            insertModalVisible: true,
            // updateModalVisible: true
        });
    };
    handleInsertModalReady = ({ form }) => {
        this.insertForm = form;
        let { onInsertModalReady } = this.props;
        if (typeof onInsertModalReady == "function") {
            onInsertModalReady({ form });
        }
    };
    handleInsertModalOk = () => {
        let { insertRecord } = this.props;
        if (typeof insertRecord == "function") {
            // insertRecord({ form: this.insertForm });
            this.insertForm.validateFields((err, values) => {
                if (!err) {
                    let formData = this.getInsertFormValue();
                    for (let key in formData) {
                        if (!formData[key]) {
                            formData[key] = "";
                        }
                    }
                    insertRecord(formData);
                    setTimeout(() => {
                        this.props.onSearchClick(
                            this.getSearchFormValue(),
                            this.props.pagination
                        );
                    }, 200);
                    // this.insertForm.resetFields();
                    // this.setState({
                    //     insertModalVisible: false,
                    // });
                    setTimeout(() => {
                        if (window.comfirmOk == "fail") {
                            window.comfirmOk = false;
                        } else {
                            this.insertForm.resetFields();
                            this.setState({
                                insertModalVisible: false,
                            });
                        }
                    }, 200);
                }
            });
        }
    };
    handleInsertModalCancel = () => {
        this.setState({
            insertModalVisible: false,
        });
    };
    //更新
    handleUpdateModalReady = ({ form }) => {
        // console.log("handleUpdateModalReady");
        this.updateForm = form;
        let { onUpdateModalReady } = this.props;
        if (typeof onUpdateModalReady == "function") {
            onUpdateModalReady({ form });
        }
    };
    handleUpdateModalOk = () => {
        let { updateRecord } = this.props;
        if (typeof updateRecord == "function") {
            // updateRecord({ form: this.updateForm });
            this.updateForm.validateFields((err, values) => {
                if (!err) {
                    updateRecord({ form: this.updateForm });
                    // this.insertForm.resetFields();
                    setTimeout(() => {
                        this.props.onSearchClick(
                            this.getSearchFormValue(),
                            this.props.pagination
                        );
                    }, 200);
                    // this.setState({
                    //     updateModalVisible: false,
                    // });
                    setTimeout(() => {
                        if (window.comfirmOk == "fail") {
                            window.comfirmOk = false;
                        } else {
                            this.setState({
                                updateModalVisible: false,
                            });
                        }
                    }, 200);
                }
            });
        }
        // this.setState({
        //     updateModalVisible: false,
        // });
    };
    handleUpdateModalCancel = () => {
        this.setState({
            updateModalVisible: false,
        });
    };
    handleDetailModalCancel = () => {
        this.setState({
            detailModalVisible: false,
        });
    };
    // 增加 操作 按钮
    addUpdateDeleteColumns = (columns) => {
        let newCol = columns;
        let { updateRecord, deleteRecord, setUpdateModal } = this.props;
        columns.forEach((item) => (item.ellipsis = true));
        // if (updateRecord || deleteRecord) {
        //增加只读权限
        if (
            (updateRecord || deleteRecord) &&
            (this.authObj.isUpdate || this.authObj.isDelete)
        ) {
            newCol = [
                ...columns,
                {
                    title: "操作",
                    key: "action",
                    align: "left",
                    fixed: "right",
                    width: 144,
                    render: (text, record) => {
                        let updateA = (
                            <a
                                style={{ color: "#3281ff" }}
                                onClick={() => {
                                    this.setState({
                                        updateModalVisible: true,
                                    });
                                    if (this.updateForm) {
                                        setUpdateModal({
                                            form: this.updateForm,
                                            record,
                                        });
                                    } else {
                                        //第一次 updateModal 需要创建 动态表单
                                        setTimeout(() => {
                                            setUpdateModal({
                                                form: this.updateForm,
                                                record,
                                            });
                                        }, 0);
                                    }
                                }}
                            >
                                编辑
                            </a>
                        );
                        let deleteA = (
                            <Popconfirm
                                title="是否确认删除?"
                                onConfirm={async () => deleteRecord(record)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <a
                                    style={{
                                        color: "rgba(240, 95, 94, 1)",
                                        margin: "0 0 0 24px",
                                    }}
                                >
                                    删除
                                </a>
                            </Popconfirm>
                        );
                        if (record.status == 2) {
                            updateA = (
                                <a
                                    style={{
                                        color: "#c0c4cc",
                                    }}
                                >
                                    编辑
                                </a>
                            );
                            deleteA = (
                                <a
                                    style={{
                                        color: "#c0c4cc",
                                        margin:
                                            "0 0 0 " +
                                            (this.authObj.isUpdate
                                                ? "24px"
                                                : "0px"),
                                    }}
                                >
                                    删除
                                </a>
                            );
                        }
                        return (
                            <div>
                                {updateRecord &&
                                    this.authObj.isUpdate &&
                                    updateA}
                                {deleteRecord &&
                                    this.authObj.isDelete &&
                                    deleteA}
                            </div>
                        );
                    },
                },
            ];
        }
        return newCol;
    };
    //计算table scroll 纵向高度
    computeTableY = () => {
        let pageWraper = document.querySelector(".pageId" + this.pageId);
        let thHeight =
            pageWraper.querySelector(".ant-table-thead").offsetHeight;
        let pagiDiv = pageWraper.querySelector(
            ".ant-pagination.ant-table-pagination"
        );
        if (pagiDiv) {
            let pagiHeight = pagiDiv.offsetHeight;
            let pagiMt =
                getComputedStyle(pagiDiv).marginTop.replace(/px/, "") / 1;
            let pagiMb =
                getComputedStyle(pagiDiv).marginBottom.replace(/px/, "") / 1;
            // console.log(thHeight + pagiHeight + pagiMt + pagiMb);
            let computeY =
                this.refs.tableWrap.clientHeight -
                thHeight -
                pagiHeight -
                pagiMt -
                pagiMb;
            this.setState(
                {
                    scroll: Object.assign({}, this.state.scroll, {
                        y: computeY,
                    }),
                },
                () => {
                    this.refs.tableWrap.querySelector(
                        ".ant-table-body"
                    ).style.height = computeY + "px";
                }
            );
        } else {
            this.setState(
                {
                    scroll: Object.assign({}, this.state.scroll, {
                        y: 0,
                    }),
                },
                () => {
                    this.refs.tableWrap.querySelector(
                        ".ant-table-body"
                    ).style.height = "54px";
                }
            );
        }
    };
    //添加随机id
    getInsertFormFields = () => {
        if (typeof this.props.getInsertFormFields == "function") {
            let dataArr = this.props.getInsertFormFields();
            for (let i = 0; i < dataArr.length; i++) {
                const item = dataArr[i];
                if (!this.insertId) {
                    this.insertId = parseInt(Math.random() * 100000000);
                }
                item.id = item.id + "_add" + this.insertId;
            }
            return dataArr;
        }
    };
    //处理InsertForm结果
    getInsertFormValue = () => {
        let formData = this.insertForm.getFieldsValue();
        let newData = {};
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                let newKey = key.replace(/_add.*/, "");
                newData[newKey] = formData[key];
            }
        }
        return newData;
    };

    onSearchReady = ({ form }) => {
        this.searchForm = form;
    };
    //添加随机id
    getSearchFormFields = () => {
        let dataArr;
        if (typeof this.props.getSearchFormFields == "function") {
            dataArr = this.props.getSearchFormFields();
        }
        if (Array.isArray(this.props.getSearchFormFields)) {
            dataArr = this.props.getSearchFormFields;
        }
        for (let i = 0; i < dataArr.length; i++) {
            const item = dataArr[i];
            if (!this.searchId) {
                this.searchId = parseInt(Math.random() * 100000000);
            }
            item.id = item.id + "_search" + this.searchId;
        }
        return dataArr;
    };
    handleSearch = () => {
        let params = this.getSearchFormValue();
        // window.searchFun = this.getSearchFormValue;
        if (this.props.pagination) {
            let newPag = { ...this.props.pagination };
            newPag.current = 1;
            this.props.onSearchClick(params, newPag);
        } else {
            this.props.onSearchClick(params);
        }
        // this.props.onSearchClick(params);
    };
    //处理SearchForm结果
    getSearchFormValue = () => {
        let formData = this.searchForm.getFieldsValue();
        let newData = {};
        for (const key in formData) {
            let newKey = key.replace(/_search.*/, "");
            if (formData[key] != null) {
                newData[newKey] = formData[key];
                if (newKey == "startTime" || newKey == "endTime") {
                    newData[newKey] = formData[key].unix();
                }
            } else {
                newData[newKey] = "";
            }
        }
        return newData;
    };
    handlePagination = (pagination) => {
        // console.log("手动分页 ", pagination);
        let params = this.getSearchFormValue(pagination);
        this.props.onSearchClick(params, pagination);
    };
    //handleResize 窗口尺寸变化时触发事件
    handleResize = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.computeTableY();
        }, 30);
    };
    onDoubleClick = (record, event) => {
        // console.log(record);
        this.record = record;
        this.setState({ detailModalVisible: true });
    };
    componentDidMount() {
        // this.computeTableY();
        window.addEventListener("resize", this.handleResize);
        window.searchFun = this.getSearchFormValue;
        // this.handleResize();
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("getDerivedStateFromProps");
    //     return null;
    // }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataSource.length != this.props.dataSource.length) {
            // console.log("handleResize");
            this.handleResize();
        }
    }
    componentWillUnmount() {
        // console.log("componentWillUnmount");
        window.removeEventListener("resize", this.handleResize);
    }
    render() {
        let {
            rowKey = "id",
            isShowSearchForm = true, //是否显示 搜索框
            getSearchFormFields, //搜索框的搜索列表
            onSearchClick, //搜索按钮点击事件
            searchLoading, //搜索按钮loading状态
            insertBtnText = "", //新增按钮内容
            insertModalText = "新增记录", //新增弹框标题
            getInsertFormFields = () => {}, //新增弹框表单内容
            updateBtnText = "编辑", //更新按钮内容
            updateModalText = "修改记录", //更新弹框标题
            getUpdateFormFields = () => {}, //更新弹框表单内容
            columns, //table 表头
            dataSource, //table 数据源,
            scroll, // table 滚动距离
            addBtnArr = null, //按钮组
            rowSelection, //批量选择
            dtColumns = [], //详情列表
            detailTitle, //详情标题
            ...rest
        } = this.props;
        // this.pageId = window.pageId++;
        if (!this.pageId) {
            if (!window.pageId) {
                window.pageId = 1;
            }
            this.pageId = window.pageId++;
        }
        if (this.props.onRef) {
            //如果父组件传来该方法 则调用方法将子组件this指针传过去
            this.props.onRef(this);
        }
        let pageSize = 0;
        // console.log("activeMenu ", this.props.activeMenu);
        let cmpt = this.props.activeMenu.cmpt;
        // console.log(cmpt);
        let authObj = {
            isQuery: true,
            isAdd: true,
            isUpload: true,
            isDownload: true,
            isDelete: false,
            isUpdate: true,
        };
        // console.log("cmpt", cmpt);
        if (cmpt) {
            for (let i = 0; i < cmpt.length; i++) {
                let item = cmpt[i];
                // console.log(item);
                if (item.type == 1 && item.auth != 1) {
                    //查询 有权限
                    authObj.isQuery = false;
                }
                if (item.type == 2 && item.auth != 1) {
                    //新增 有权限
                    authObj.isAdd = false;
                }
                if (item.type == 3 && item.auth != 1) {
                    //上传 有权限
                    authObj.isUpload = false;
                }
                if (item.type == 4 && item.auth != 1) {
                    //下载 有权限
                    authObj.isDownload = false;
                }
                // if (item.type == 5 && item.auth != 1) {
                //     //下载报告 有权限 -- 绩效那边
                //     authObj.isExportPdf = false;
                // }
                if (item.type == 6 && item.auth == 1) {
                    //删除 有权限
                    authObj.isDelete = true;
                }
                if (item.type == 7 && item.auth != 1) {
                    //编辑 有权限
                    authObj.isUpdate = false;
                }
            }
        }
        // console.log("权限 ", authObj);
        this.authObj = authObj;
        //上传/下载 都没有，不显示导入/导出 栏
        let hasInsert =
            this.props.children && (authObj.isDownload || authObj.isUpload);
        // let hasInsert = this.props.children ;
        // console.log(hasInsert);
        if (insertBtnText || hasInsert) {
            pageSize = 12;
        }
        let hasSearchForm =
            isShowSearchForm && (authObj.isQuery || authObj.isAdd);
        if (
            this.props.getSearchFormFields &&
            this.props.getSearchFormFields().length > 0
        ) {
            pageSize = 12;
            if (insertBtnText || hasInsert) {
                pageSize = 11;
            }
        }
        if (this.props.pageSize) {
            pageSize = this.props.pageSize;
        }
        pageSize = pageSize + 2;
        // console.log("CurdComponent 渲染 ", this.pageId);
        // console.log("insertBtnText", insertBtnText);
        // console.log("hasSlot", this.props.hasSlot);
        return (
            <div
                className={
                    styles.curdComponent +
                    " curdWraper" +
                    " pageId" +
                    this.pageId
                }
            >
                {/* {hasInsert && (
                    <div className={styles.insertWrap}>
                        {this.props.children}
                    </div>
                )} */}
                {hasInsert && (
                    <div className={styles.insertWrap}>
                        <UploadWrap
                            {...this.props.children.props}
                            authObj={authObj}
                        ></UploadWrap>
                    </div>
                )}
                {hasSearchForm && (
                    <div className={styles.searchWrap}>
                        <SearchForm
                            // fields={this.getSearchFormFields()}
                            fields={this.props.getSearchFormFields()}
                            onSearchClick={this.handleSearch}
                            insertBtnText={insertBtnText}
                            searchLoading={searchLoading}
                            pageId={this.pageId}
                            onReady={this.onSearchReady}
                            authObj={authObj}
                        >
                            {!this.props.hasSearchSlot &&
                                authObj.isAdd &&
                                insertBtnText && (
                                    <Button
                                        type="primary"
                                        icon="plus"
                                        onClick={this.handleInsertBtn}
                                    >
                                        {insertBtnText}
                                    </Button>
                                )}
                            {this.props.hasSearchSlot && authObj.isAdd && (
                                <React.Fragment>
                                    {this.props.addBtn}
                                </React.Fragment>
                            )}
                        </SearchForm>
                        {/* <div
                            style={{
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "1px",
                                    background: "#EBEBEB",
                                    top: "-1px",
                                }}
                            ></div>
                        </div> */}
                    </div>
                )}
                {/* {insertBtnText != "" && (
                    <div className={styles.insertWrap}>
                        {insertBtnText && (
                            <Button
                                type="primary"
                                icon="plus"
                                onClick={this.handleInsertBtn}
                            >
                                {insertBtnText}
                            </Button>
                        )}
                    </div>
                )} */}
                <div className={styles.pad22}></div>
                <div ref="tableWrap" className={styles.tableWrap}>
                    <Table
                        rowKey={rowKey}
                        columns={this.addUpdateDeleteColumns(columns())}
                        dataSource={dataSource}
                        scroll={this.state.scroll}
                        rowSelection={rowSelection}
                        handlePagination={this.handlePagination}
                        pagination={this.props.pagination}
                        pageSize={pageSize}
                        onDoubleClick={this.onDoubleClick}
                        showDetail={dtColumns.length > 0}
                    ></Table>
                </div>
                <DynamicModal
                    title={insertModalText}
                    visible={this.state.insertModalVisible}
                    fields={this.getInsertFormFields()}
                    onOk={this.handleInsertModalOk}
                    onCancel={this.handleInsertModalCancel}
                    onReady={this.handleInsertModalReady}
                    {...rest}
                ></DynamicModal>
                <DynamicModal
                    title={updateModalText}
                    visible={this.state.updateModalVisible}
                    fields={getUpdateFormFields()}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}
                    onReady={this.handleUpdateModalReady}
                    // col="2"
                    // width="600px"
                    {...rest}
                ></DynamicModal>
                <DynamicDescriptions
                    title={detailTitle}
                    visible={this.state.detailModalVisible}
                    onCancel={this.handleDetailModalCancel}
                    fields={dtColumns}
                    record={this.record}
                    onReady={this.handleUpdateModalReady}
                    column={this.props.dtCol}
                    {...rest}
                    width={this.props.dtWidth}
                ></DynamicDescriptions>
            </div>
        );
    }
}
// export default CurdComponent;
const mapStateToProps = (state, ownProps) => {
    return {
        activeMenu: state.RouterModel.activeMenu,
    };
};
export default connect(mapStateToProps, null)(CurdComponent);
