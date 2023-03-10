import React from "react";
import { Button, Popconfirm, Input } from "antd";
import Highlighter from "react-highlight-words";
import styles from "./index.module.less";
import SearchForm from "@/components/SearchForm";
import DynamicModal from "@/components/DynamicModal";
import Table from "@/components/Table";
import DynamicDescriptions from "@/components/DynamicDescriptions";

export default class CrudFilterComponent extends React.PureComponent {
    state = {
        insertModalVisible: false,
        updateModalVisible: false,
        detailModalVisible: false,
        scroll: this.props.scroll,
        searchText: "",
        searchedColumn: "",
        searchMethod: {
            getColumnSearchProps: this.getColumnSearchProps,
        },
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
                    insertRecord(this.getInsertFormValue());
                    this.insertForm.resetFields();
                    this.setState({
                        insertModalVisible: false,
                    });
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
            updateRecord({ form: this.updateForm });
        }
        this.setState({
            updateModalVisible: false,
        });
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
        if (updateRecord || deleteRecord) {
            newCol = [
                ...columns,
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    fixed: "right",
                    width: 120,
                    render: (text, record) => {
                        return (
                            <div>
                                {updateRecord && (
                                    <a
                                        // style={{ color: "#3281ff" }}
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
                                )}
                                {deleteRecord && (
                                    <Popconfirm
                                        title="是否确认删除?"
                                        onConfirm={async () =>
                                            deleteRecord(record)
                                        }
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <a
                                            style={{
                                                color: "#3281ff",
                                                margin: "0 16px",
                                            }}
                                        >
                                            删除
                                        </a>
                                    </Popconfirm>
                                )}
                            </div>
                        );
                    },
                },
            ];
        }
        return newCol;
    };
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`筛选 ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleFilterSearch(
                            selectedKeys,
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() =>
                        this.handleFilterSearch(
                            selectedKeys,
                            confirm,
                            dataIndex
                        )
                    }
                    // icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    查询
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    重置
                </Button>
            </div>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });
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
        this.props.onSearchClick(params);
    };
    handleFilterSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: "" });
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
        // console.log("CurdComponent 渲染 ", this.pageId);
        return (
            <div
                className={
                    styles.curdComponent +
                    " curdWraper" +
                    " pageId" +
                    this.pageId
                }
            >
                {isShowSearchForm && (
                    <div className={styles.searchWrap}>
                        <SearchForm
                            // fields={this.getSearchFormFields()}
                            fields={this.props.getSearchFormFields()}
                            onSearchClick={this.handleSearch}
                            searchLoading={searchLoading}
                            pageId={this.pageId}
                            onReady={this.onSearchReady}
                        ></SearchForm>
                        <div
                            style={{
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "5px",
                                    background: "#ddd",
                                    top: "-5px",
                                }}
                            ></div>
                        </div>
                    </div>
                )}
                {insertBtnText != "" && (
                    <div className={styles.insertWrap}>
                        {insertBtnText && (
                            <Button
                                type="primary"
                                onClick={this.handleInsertBtn}
                            >
                                {insertBtnText}
                            </Button>
                        )}
                    </div>
                )}
                {this.props.hasSlot && (
                    <div className={styles.insertWrap}>
                        {this.props.children}
                    </div>
                )}
                <div ref="tableWrap" className={styles.tableWrap}>
                    <Table
                        rowKey={rowKey}
                        columns={this.addUpdateDeleteColumns(
                            columns(this.getColumnSearchProps)
                        )}
                        dataSource={dataSource}
                        scroll={this.state.scroll}
                        rowSelection={rowSelection}
                        handlePagination={this.handlePagination}
                        pagination={this.props.pagination}
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
                    width={this.props.dtWidth}
                    {...rest}
                ></DynamicDescriptions>
            </div>
        );
    }
}
