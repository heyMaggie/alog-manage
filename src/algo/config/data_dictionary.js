const configData = {
    clientType: [
        { key: "0", value: "API" },
        { key: "1", value: "PC" },
        { key: "2", value: "WEB" },
        { key: "3", value: "WINDOWS" },
        { key: "4", value: "MAC" },
    ],
    userStatus: [
        { key: "0", value: "正常" },
        { key: "1", value: "黑名单客户" },
        { key: "2", value: "禁止买卖" },
    ],
    //是否有涨跌限制
    hasPriceLimit: [
        { key: "Y", value: "有价格限制" },
        { key: "N", value: "无价格限制" },
    ],
    productType: [{ key: "1", value: "股票" }],
    feeType: [
        { key: "0", value: "手续费" },
        { key: "1", value: "过户费" },
        { key: "2", value: "印花税" },
    ],
    tradeType: [
        { key: "0", value: "正常可交易可取消" },
        { key: "1", value: "不可交易" },
        { key: "2", value: "不可取消" },
    ],
    //股东信息 - 账户类型
    accountType: [{ key: "0", value: "股票" }],
    accountStatus: [
        { key: "0", value: "正常" },
        { key: "1", value: "冻结" },
    ],
    marketCode: [
        { key: "0", value: "SZ" },
        { key: "1", value: "SH" },
    ],
    connectionStatus: [
        { key: "0", value: "未连接" },
        { key: "1", value: "连接" },
    ],
    loginStatus: [
        { key: "0", value: "未登录" },
        { key: "1", value: "登录" },
    ],
    netStatus: [
        { key: "0", value: "可用" },
        { key: "1", value: "不可用" },
    ],
    //资金流水 业务类型
    type: [
        { key: "0", value: "买" },
        { key: "1", value: "卖" },
        { key: "2", value: "转入" },
        { key: "3", value: "转出" },
        { key: "4", value: "冻结" },
        { key: "5", value: "解冻" },
    ],
    securityIDSource: [
        { key: "101", value: "上海证券交易所" },
        { key: "102", value: "深圳证券交易所" },
    ],
    optionIdSource: [
        { key: "101", value: "上海证券交易所" },
        { key: "102", value: "深圳证券交易所" },
    ],
    securityIdSource: [
        { key: "101", value: "上海证券交易所" },
        { key: "102", value: "深圳证券交易所" },
    ],
    Status: [
        { key: "0", value: "正常" },
        { key: "1", value: "停盘" },
        { key: "2", value: "退市" },
    ],
    ownerType: [
        { key: "1", value: "个人投资者发起" },
        { key: "101", value: "交易所发起" },
        { key: "102", value: "会员发起" },
        { key: "103", value: "机构投资者发起" },
        { key: "104", value: "自营交易发起" },
        { key: "105", value: "流动性服务提供商发起" },
        { key: "106", value: "结算结构发起" },
    ],
    clearingFirm: [
        { key: "00", value: "中国证券登记结算总公司" },
        { key: "01", value: "中国证券登记结算公司深圳分公司" },
        { key: "09", value: "自建TA" },
    ],
    orderRestrictions: [
        { key: "1", value: "程序化交易" },
        { key: "E", value: "算法交易" },
    ],
    side: [
        { key: "1", value: "买" },
        { key: "2", value: "卖" },
        { key: "D", value: "申购" },
        { key: "E", value: "赎回" },
        { key: "F", value: "出借" },
        { key: "G", value: "借入" },
    ],
    ordType: [
        { key: "1", value: "市价" },
        { key: "2", value: "限价" },
        { key: "U", value: "本方最优" },
    ],
    timeInForce: [
        { key: "0", value: "当日有效" },
        { key: "3", value: "即时成交或取消" },
        { key: "9", value: "港股通竞价限盘" },
    ],
    timeInforce: [
        { key: "0", value: "当日有效" },
        { key: "3", value: "即时成交或取消" },
        { key: "9", value: "港股通竞价限盘" },
    ],
    cashMargin: [
        { key: "1", value: "普通交易" },
        { key: "2", value: "融资融券开仓" },
        { key: "3", value: "融资融券平仓" },
    ],
    ordStatus: [
        { key: "0", value: "新订单" },
        { key: "1", value: "部分成交" },
        { key: "2", value: "完全成交" },
        { key: "3", value: "对敲" },
        { key: "4", value: "已撤销" },
        { key: "5", value: "已确认新订单" },
        { key: "6", value: "超频" },
        { key: "7", value: "发送失败" },
        { key: "8", value: "已拒绝" },
    ],
    execType: [
        { key: "0", value: "新订单" },
        { key: "4", value: "已撤销" },
        { key: "8", value: "已拒绝" },
        { key: "F", value: "已成交" },
    ],
    // 运维系统 : 证券信息管理 - 涨跌限制类型
    limitType: [
        { key: "1", value: "幅度（百分比）" },
        { key: "2", value: "价格（绝对值）" },
    ],
    property: [
        { key: "1", value: "主板A股" },
        { key: "2", value: "中小板股票" },
        { key: "3", value: "创业板" },
        { key: "4", value: "主板B股" },
        { key: "5", value: "风险警示板" },
    ],
    //登录返回码
    uiRetCode: [
        { key: "100001", value: "用户不存在" },
        { key: "100002", value: "用户未登录" },
        { key: "100003", value: "用户已登录" },
        { key: "100004", value: "令牌错误" },
        { key: "100005", value: "密码错误" },
        { key: "100006", value: "心跳超时" },
        { key: "100007", value: "session错误" },
        { key: "100008", value: "查询无数据" },
        { key: "100009", value: "黑名单客户" },
        { key: "100010", value: "系统错误" },
        { key: "100011", value: "客户端类型错误" },
    ],
    //下单/撤单
    oprCode: [
        { key: "100001", value: "用户不存在" },
        { key: "100002", value: "用户未登录" },
        { key: "100003", value: "用户已登录" },
        { key: "100004", value: "令牌错误" },
        { key: "100005", value: "密码错误" },
        { key: "100006", value: "心跳超时" },
        { key: "100007", value: "session错误" },
        { key: "100008", value: "查询无数据" },
        { key: "100009", value: "黑名单客户" },
        { key: "100010", value: "系统错误" },
        { key: "100011", value: "客户端类型错误" },
        { key: "1", value: "失败" },
        { key: "2", value: "用户没有找到" },
        { key: "3", value: "用户状态非法" },
        { key: "4", value: "股票产品不存在" },
        { key: "5", value: "股票状态非法" },
        { key: "6", value: "用户禁止交易主板" },
        { key: "7", value: "用户禁止交易创业板" },
        { key: "8", value: "用户禁止交易科创板" },
        { key: "9", value: "用户禁止交易ST板块" },
        { key: "10", value: "订单买卖方向非法" },
        { key: "11", value: "订单超过限额" },
        { key: "12", value: "持仓不存在" },
        { key: "13", value: "数量非法" },
        { key: "14", value: "用户资产不存在" },
        { key: "15", value: "不在交易时间" },
        { key: "16", value: "订单时间有效性非法" },
        { key: "17", value: "原始订单不存在" },
        { key: "18", value: "原始订单已拒绝" },
        { key: "19", value: "原始订单已取消" },
        { key: "20", value: "原始订单已成交" },
        { key: "21", value: "订单类型非法" },
        { key: "22", value: "订单重复" },
        { key: "23", value: "买入数量非法" },
        { key: "24", value: "卖出数量非法" },
        { key: "25", value: "原始取消订单不存在" },
        { key: "26", value: "同步数据不完全" },
        { key: "27", value: "Timely_Invalid" },
        { key: "28", value: "订单类型无效" },
        { key: "29", value: "股东账户无效" },
        { key: "30", value: "下单最小数量无效" },
        { key: "31", value: "最多成交价位数无效" },
        { key: "32", value: "证券代码源无效" },
        { key: "33", value: "余额不足" },
        { key: "34", value: "用户禁止交易中小板" },
        { key: "35", value: "用户禁止交易主板B股" },
    ],
    UserPropty: [
        { key: "all", value: "全部" },
        { key: "1", value: "主板A股" },
        { key: "2", value: "中小板股票" },
        { key: "3", value: "主板A股,中小板股票" },
        { key: "4", value: "创业板股票" },
        { key: "5", value: "主板A股,创业板股票" },
        { key: "6", value: "中小板股票,创业板股票" },
        { key: "7", value: "主板A股,中小板股票,创业板股票" },
        { key: "8", value: "主板B股" },
        { key: "9", value: "主板A股,主板B股" },
        { key: "10", value: "中小板股票,主板B股" },
        { key: "11", value: "主板A股,中小板股票,主板B股" },
        { key: "12", value: "创业板股票,主板B股" },
        { key: "13", value: "主板A股，创业板股票,主板B股" },
        { key: "14", value: "中小板股票,创业板股票,主板B股" },
        { key: "15", value: "主板A股,中小板股票,创业板股票,主板B股" },
        { key: "16", value: "风险警示板" },
        { key: "17", value: "主板A股,风险警示板" },
        { key: "18", value: "中小板股票,风险警示板" },
        { key: "19", value: "主板A股,中小板股票,风险警示板" },
        { key: "20", value: "创业板股票,风险警示板" },
        { key: "21", value: "主板A股,创业板股票,风险警示板" },
        { key: "22", value: "中小板股票,创业板股票,风险警示板" },
        { key: "23", value: "主板A股,中小板股票,创业板股票,风险警示板" },
        { key: "24", value: "主板B股,风险警示板" },
        { key: "25", value: "主板A股,主板B股,风险警示板" },
        { key: "26", value: "中小板股票,主板B股,风险警示板" },
        { key: "27", value: "主板A股,中小板股票,主板B股,风险警示板" },
        { key: "28", value: "创业板股票,主板B股,风险警示板" },
        { key: "29", value: "主板A股,创业板股票,主板B股,风险警示板" },
        { key: "30", value: "中小板股票,创业板股票,主板B股,风险警示板" },
        {
            key: "31",
            value: "主板A股,中小板股票,创业板股票,主板B股,风险警示板",
        },
        // { key: "5", value: "个人户" }
    ],
    userPropty: [
        { key: "all", value: "全部" },
        { key: "1", value: "主板A股" },
        { key: "2", value: "中小板股票" },
        { key: "3", value: "主板A股,中小板股票" },
        { key: "4", value: "创业板股票" },
        { key: "5", value: "主板A股,创业板股票" },
        { key: "6", value: "中小板股票,创业板股票" },
        { key: "7", value: "主板A股,中小板股票,创业板股票" },
        { key: "8", value: "主板B股" },
        { key: "9", value: "主板A股,主板B股" },
        { key: "10", value: "中小板股票,主板B股" },
        { key: "11", value: "主板A股,中小板股票,主板B股" },
        { key: "12", value: "创业板股票,主板B股" },
        { key: "13", value: "主板A股，创业板股票,主板B股" },
        { key: "14", value: "中小板股票,创业板股票,主板B股" },
        { key: "15", value: "主板A股,中小板股票,创业板股票,主板B股" },
        { key: "16", value: "风险警示板" },
        { key: "17", value: "主板A股,风险警示板" },
        { key: "18", value: "中小板股票,风险警示板" },
        { key: "19", value: "主板A股,中小板股票,风险警示板" },
        { key: "20", value: "创业板股票,风险警示板" },
        { key: "21", value: "主板A股,创业板股票,风险警示板" },
        { key: "22", value: "中小板股票,创业板股票,风险警示板" },
        { key: "23", value: "主板A股,中小板股票,创业板股票,风险警示板" },
        { key: "24", value: "主板B股,风险警示板" },
        { key: "25", value: "主板A股,主板B股,风险警示板" },
        { key: "26", value: "中小板股票,主板B股,风险警示板" },
        { key: "27", value: "主板A股,中小板股票,主板B股,风险警示板" },
        { key: "28", value: "创业板股票,主板B股,风险警示板" },
        { key: "29", value: "主板A股,创业板股票,主板B股,风险警示板" },
        { key: "30", value: "中小板股票,创业板股票,主板B股,风险警示板" },
        {
            key: "31",
            value: "主板A股,中小板股票,创业板股票,主板B股,风险警示板",
        },
    ],
    //新增 期权字典
    securityStatus: [
        { key: "0", value: "正常" },
        { key: "1", value: "停盘" },
        { key: "2", value: "退市" },
    ],
    contractType: [
        { key: "67", value: "认购" },
        { key: "80", value: "认沽" },
        { key: "C", value: "认购" },
        { key: "P", value: "认沽" },
    ],
    exerciseMethod: [
        { key: "1", value: "欧式" },
        { key: "2", value: "美式" },
    ],
    deliverMethod: [
        { key: "1", value: "实物" },
        { key: "2", value: "现金" },
    ],
    optionStatus: [
        { key: "0", value: "正常" },
        { key: "1", value: "冻结" },
    ],
    marketMakeFlag: [
        { key: "89", value: "是" },
        { key: "78", value: "否" },
        { key: "Y", value: "是" },
        { key: "N", value: "否" },
    ],
    timeType: [
        { key: "0", value: "连续竞价" },
        { key: "1", value: "开盘集合竞价" },
        { key: "2", value: "收盘集合竞价" },
        { key: "3", value: "盘中临时停牌复牌集合竞价" },
    ],
    tradeType: [
        { key: "0", value: "新交易下单" },
        { key: "1", value: "撤单" },
        { key: "2", value: "组合策略" },
        { key: "3", value: "备兑互转" },
        { key: "4", value: "行权订单" },
    ],
    excercise: [
        { key: "0", value: "未行权" },
        { key: "1", value: "行权" },
    ],
    connStatus: [
        { key: "0", value: "登录失败" },
        { key: "1", value: "登录成功" },
    ],
    gwStatus: [
        { key: "0", value: "正常" },
        { key: "1", value: "其他" },
    ],
    coveredOrUncoverd: [
        { key: "0", value: "备兑" },
        { key: "1", value: "非备兑" },
    ],
    availableStrategy: [
        {
            key: 1,
            value: "CNSJC",
        },
        {
            key: 2,
            value: "CXSJC",
        },
        {
            key: 3,
            value: "CXSJC,CNSJC",
        },
        {
            key: 4,
            value: "PNSJC",
        },
        {
            key: 5,
            value: "PNSJC,CNSJC",
        },
        {
            key: 6,
            value: "PNSJC,CXSJC",
        },
        {
            key: 7,
            value: "PNSJC,CXSJC,CNSJC",
        },
        {
            key: 8,
            value: "PXSJC",
        },
        {
            key: 9,
            value: "PXSJC,CNSJC",
        },
        {
            key: 10,
            value: "PXSJC,CXSJC",
        },
        {
            key: 11,
            value: "PXSJC,CXSJC,CNSJC",
        },
        {
            key: 12,
            value: "PXSJC,PNSJC",
        },
        {
            key: 13,
            value: "PXSJC,PNSJC,CNSJC",
        },
        {
            key: 14,
            value: "PXSJC,PNSJC,CXSJC",
        },
        {
            key: 15,
            value: "PXSJC,PNSJC,CXSJC,CNSJC",
        },
        {
            key: 16,
            value: "KS",
        },
        {
            key: 17,
            value: "KS,CNSJC",
        },
        {
            key: 18,
            value: "KS,CXSJC",
        },
        {
            key: 19,
            value: "KS,CXSJC,CNSJC",
        },
        {
            key: 20,
            value: "KS,PNSJC",
        },
        {
            key: 21,
            value: "KS,PNSJC,CNSJC",
        },
        {
            key: 22,
            value: "KS,PNSJC,CXSJC",
        },
        {
            key: 23,
            value: "KS,PNSJC,CXSJC,CNSJC",
        },
        {
            key: 24,
            value: "KS,PXSJC",
        },
        {
            key: 25,
            value: "KS,PXSJC,CNSJC",
        },
        {
            key: 26,
            value: "KS,PXSJC,CXSJC",
        },
        {
            key: 27,
            value: "KS,PXSJC,CXSJC,CNSJC",
        },
        {
            key: 28,
            value: "KS,PXSJC,PNSJC",
        },
        {
            key: 29,
            value: "KS,PXSJC,PNSJC,CNSJC",
        },
        {
            key: 30,
            value: "KS,PXSJC,PNSJC,CXSJC",
        },
        {
            key: 31,
            value: "KS,PXSJC,PNSJC,CXSJC,CNSJC",
        },
        {
            key: 32,
            value: "KKS",
        },
        {
            key: 33,
            value: "KKS,CNSJC",
        },
        {
            key: 34,
            value: "KKS,CXSJC",
        },
        {
            key: 35,
            value: "KKS,CXSJC,CNSJC",
        },
        {
            key: 36,
            value: "KKS,PNSJC",
        },
        {
            key: 37,
            value: "KKS,PNSJC,CNSJC",
        },
        {
            key: 38,
            value: "KKS,PNSJC,CXSJC",
        },
        {
            key: 39,
            value: "KKS,PNSJC,CXSJC,CNSJC",
        },
        {
            key: 40,
            value: "KKS,PXSJC",
        },
        {
            key: 41,
            value: "KKS,PXSJC,CNSJC",
        },
        {
            key: 42,
            value: "KKS,PXSJC,CXSJC",
        },
        {
            key: 43,
            value: "KKS,PXSJC,CXSJC,CNSJC",
        },
        {
            key: 44,
            value: "KKS,PXSJC,PNSJC",
        },
        {
            key: 45,
            value: "KKS,PXSJC,PNSJC,CNSJC",
        },
        {
            key: 46,
            value: "KKS,PXSJC,PNSJC,CXSJC",
        },
        {
            key: 47,
            value: "KKS,PXSJC,PNSJC,CXSJC,CNSJC",
        },
        {
            key: 48,
            value: "KKS,KS",
        },
        {
            key: 49,
            value: "KKS,KS,CNSJC",
        },
        {
            key: 50,
            value: "KKS,KS,CXSJC",
        },
        {
            key: 51,
            value: "KKS,KS,CXSJC,CNSJC",
        },
        {
            key: 52,
            value: "KKS,KS,PNSJC",
        },
        {
            key: 53,
            value: "KKS,KS,PNSJC,CNSJC",
        },
        {
            key: 54,
            value: "KKS,KS,PNSJC,CXSJC",
        },
        {
            key: 55,
            value: "KKS,KS,PNSJC,CXSJC,CNSJC",
        },
        {
            key: 56,
            value: "KKS,KS,PXSJC",
        },
        {
            key: 57,
            value: "KKS,KS,PXSJC,CNSJC",
        },
        {
            key: 58,
            value: "KKS,KS,PXSJC,CXSJC",
        },
        {
            key: 59,
            value: "KKS,KS,PXSJC,CXSJC,CNSJC",
        },
        {
            key: 60,
            value: "KKS,KS,PXSJC,PNSJC",
        },
        {
            key: 61,
            value: "KKS,KS,PXSJC,PNSJC,CNSJC",
        },
        {
            key: 62,
            value: "KKS,KS,PXSJC,PNSJC,CXSJC",
        },
        {
            key: 63,
            value: "KKS,KS,PXSJC,PNSJC,CXSJC,CNSJC",
        },
    ],
};

export default configData;
