import React from "react";
import { Table } from "antd";
import styles from "./index.module.less";

class BasicTable extends React.PureComponent {
    state = {
        pagination: {
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true,
            current: 1,
            // total:0,
            // pageSize: 20,
            pageSize: 13,
            // pageSizeOptions: ["10", "13", "20", "30","50"],
            pageSizeOptions: ["10", "11", "12", "13", "20"],
            showTotal: (total) => `共${total}条`,
        },
    };
    handlePagination = (pagination, f, s, e) => {
        let params = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
        };
        if (this.props.pagination) {
            this.props.handlePagination(params);
        } else {
            // console.log("自动分页 ", pagination);
            this.setState({
                pagination: pagination,
            });
        }
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // let tbody = document.getElementsByClassName("ant-table-body")[0];
        // if (tbody && nextProps.dataSource && nextProps.dataSource.length > 0) {
        //     tbody.style.height = nextProps.scroll.y + "px";
        // }
    }
    render() {
        let {
            rowSelection,
            columns,
            dataSource = [],
            scroll,
            pagination,
            rowKey = "key",
        } = this.props;
        let newPagination = {
            ...this.state.pagination,
            ...pagination,
        };
        if (pagination === false) {
            newPagination = false;
        }
        // console.log(pagination === false);
        // console.log(newPagination);
        if (this.props.pageSize) {
            newPagination.pageSize = this.props.pageSize;
            // newPagination.pageSizeOptions=[this.props.pageSize]
        }

        let onRow = null;
        if (this.props.showDetail) {
            onRow = (record) => {
                return {
                    onDoubleClick: (event) => {
                        if (typeof this.props.onDoubleClick == "function") {
                            this.props.onDoubleClick(record, event);
                        }
                    },
                };
            };
        }

        return (
            <div className={styles.tableWrap}>
                <Table
                    rowKey={rowKey}
                    className="basicTable"
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    scroll={scroll}
                    pagination={newPagination}
                    onChange={(p, f, s, e) => this.handlePagination(p, f, s, e)}
                    onRow={onRow}
                />
                {dataSource.length == 0 ? (
                    <div style={{ height: "56px" }}></div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
export default BasicTable;
