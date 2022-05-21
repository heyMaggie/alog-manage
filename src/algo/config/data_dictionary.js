const configData = {
    clientType: [
        { key: "0", value: "API" },
        { key: "1", value: "PC" },
        { key: "2", value: "WEB" },
        { key: "3", value: "WINDOWS" },
        { key: "4", value: "MAC" },
    ],
    userType: [
        { key: "1", value: "个人用户" },
        { key: "2", value: "算法厂商用户" },
        { key: "3", value: "多用户管理员" },
        // { key: "4", value: "多用户管理员" },
    ],
    businessType: [
        { key: "1", value: "现货" },
        { key: "2", value: "期权" },
        { key: "3", value: "两融" },
    ],
    market: [
        { key: "1", value: "深交所" },
        { key: "2", value: "上交所" },
    ],
    accountType: [
        { key: "1", value: "股票" },
        { key: "2", value: "期权" },
        { key: "3", value: "融资融券" },
    ],
    positionType: [
        { key: "0", value: "现货" },
        { key: "1", value: "权利持仓" },
        { key: "2", value: "义务持仓" },
        { key: "3", value: "备兑持仓" },
    ],
    cancelFlag: [
        { key: "0", value: "无需撤销算法已下的单" },
        { key: "1", value: "需要撤销算法已下的单" },
    ],
    //篮子监控状态
    basketStatus: [
        { key: "1", value: "正常" },
        { key: "2", value: "启动中冻结" },
        { key: "4", value: "删除" },
        { key: "8", value: "篮子运行中" },
        { key: "16", value: "篮子停止" },
        { key: "32", value: "篮子运行结束" },
    ],
    basketType: [
        { key: "1", value: "下单" },
        { key: "2", value: "撤单" },
    ],
    bStatus: [
        //0初始态 1删除 2启动
        { key: "0", value: "初始态" },
        { key: "1", value: "删除" },
        { key: "2", value: "启动" },
    ],
    counterStatus: [
        { key: "0", value: "使能" },
        { key: "1", value: "关闭" },
    ],
    RiskType: [
        // { key: "0", value: "" },
        { key: "1", value: "用户" },
        { key: "2", value: "算法" },
    ],
    riskType: [
        { key: "1", value: "用户" },
        { key: "2", value: "算法" },
    ],
    userStatus: [
        { key: "0", value: "正常" },
        { key: "1", value: "黑名单客户" },
        { key: "2", value: "禁止买卖" },
    ],
    // algorithmStatus: [
    //     { key: "0", value: "不可用" },
    //     { key: "1", value: "可用" },
    // ],
    // algorithmEnable: [
    //     { key: "0", value: "不可用" },
    //     { key: "1", value: "可用" },
    // ],
    algoOrdStatus: [
        //0总线接收 1总线拒绝 2算法平台接收 3算法平台拒绝 4撤销
        { key: "0", value: "总线接收" },
        { key: "1", value: "总线拒绝" },
        { key: "2", value: "算法平台接收" },
        { key: "3", value: "算法平台拒绝" },
        { key: "4", value: "撤销" },
    ],
    //1限价委托 2本方最优 3对手方最优 4市价立即成交剩余撤销 5市价全额成交或撤销 6市价最优五档全额成交剩余撤销 7限价全额成交或撤销
    orderType: [
        { key: "1", value: "限价委托" },
        { key: "2", value: "本方最优" },
        { key: "3", value: "对手方最优" },
        { key: "4", value: "市价立即成交剩余撤销" },
        { key: "5", value: "市价全额成交或撤销" },
        { key: "6", value: "市价最优五档全额成交剩余撤销" },
        { key: "7", value: "限价全额成交或撤销" },
    ],
    positionEffect: [
        { key: "O", value: "开仓" },
        { key: "C", value: "平仓" },
    ],
    coveredOrUncovered: [
        { key: "0", value: "备兑" },
        { key: "1", value: "非备兑" },
    ],
    // 0总线接收 1总线拒绝 2柜台接收 3柜台拒绝 4交易所接收 5交易所拒绝 6部分成交 7完全成交 8已撤单
    childOrdStatus: [
        { key: "0", value: "总线接收" },
        { key: "1", value: "总线拒绝" },
        { key: "2", value: "柜台接收" },
        { key: "3", value: "柜台拒绝" },
        { key: "4", value: "交易所接收" },
        { key: "5", value: "交易所拒绝" },
        { key: "6", value: "部分成交" },
        { key: "7", value: "完全成交" },
        { key: "8", value: "已撤单" },
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
    retCode: [
        { key: "0", value: "成功" },
        { key: "1", value: "参数错误" },
        { key: "2", value: "没该消息处理函数" },
        { key: "3", value: "io写出错" },
        { key: "4", value: "登录失败，超出客户端限制" },
        { key: "5", value: "登录失败, 用户或密码错误" },
        { key: "6", value: "用户类型错误" },
        { key: "7", value: "登录柜台失败" },
        { key: "8", value: "会话不存在" },
        { key: "9", value: "重复登录" },
        { key: "10", value: "消息格式错误" },
        { key: "11", value: "不存在篮子" },
        { key: "12", value: "篮子冻结" },
        { key: "13", value: "篮子已经删除" },
        { key: "14", value: "请求序列号重复" },
        { key: "15", value: "股东账户不存在" },
        { key: "16", value: "交易client的用户不存在" },
        { key: "17", value: "算法不存在" },
        { key: "18", value: "算法类型异常" },
        { key: "19", value: "母单不存在 或 已删除" },
        { key: "20", value: "母单已运行结束" },
        { key: "21", value: "母单不能启动" },
        { key: "22", value: "母单当前不能操作" },
        { key: "23", value: "母单操作非法" },
        { key: "24", value: "母单运行中，不允许登出柜台" },
        { key: "25", value: "子单不存在" },
        { key: "26", value: "原订单不存在" },
        { key: "27", value: "持仓不存在" },
        { key: "28", value: "持仓不够" },
        { key: "29", value: "查询不到数据" },
        { key: "30", value: "查询每页数量为0" },
        { key: "31", value: "页越界" },
        { key: "32", value: "不存在的查询类型" },
        { key: "33", value: "母单已经进入busy状态" },
        { key: "34", value: "算法已注册" },
        { key: "35", value: "风控初始化未完成" },

        { key: "36", value: "算法超过时间量总委托笔数" },
        { key: "37", value: "用户超过时间量总委托笔数" },
        { key: "38", value: "用户总委托数超过总委托笔数" },
        { key: "39", value: "用户算法总委托数超过总委托笔数" },
        { key: "40", value: "用户撤单比超过撤单比阈值,不允许撤单" },
        { key: "41", value: "用户废单比超过废单比阈值,不允许下单" },
        { key: "42", value: "用户算法废单比超过废单比阈值,不允许下单" },
        { key: "43", value: "用户净买入金额查过阈值" },
        { key: "44", value: "用户算法净买入金额超过阈值" },
        { key: "45", value: "用户撤单频率超过阈值" },
        { key: "46", value: "用户算法撤单频率超过阈值" },
        { key: "47", value: "用户同笔撤单间隔超过阈值" },
        { key: "48", value: "用户超过下单频率笔数阈值" },
        { key: "49", value: "用户超过下单频率总量阈值" },
        { key: "50", value: "用户超过下单频率总金额阈值" },
        { key: "51", value: "操作篮子中的母单出错" },
        { key: "52", value: "柜台无可用网关" },
        { key: "53", value: "订单类型错误" },
        { key: "54", value: "资金余额不足" },
        { key: "55", value: "证券信息空" },
        { key: "56", value: "价格超过涨跌停价格" },
        { key: "57", value: "价格对敲" },
        { key: "58", value: "内容太多,消耗的内存超过了缓存" },
        { key: "59", value: "原订单被拒绝" },

        { key: "60", value: "原订单已撤销" },
        { key: "61", value: "原订单已完全成交" },
        { key: "62", value: "业务类型错" },
        { key: "63", value: "报盘失败" },
        { key: "64", value: "现货柜台未登录" },
        { key: "65", value: "期权柜台未登录" },
        { key: "66", value: " 融资融券柜台未登录" },
        { key: "67", value: "母单和篮子的算法不一致" },
        { key: "68", value: "行情客户端未找到" },
        { key: "69", value: "获取静态文件失败" },
    ],
};

export default configData;
