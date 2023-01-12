const configData = {
    clientType: [
        // { key: "0", value: "API" },
        // { key: "1", value: "PC" },
        // { key: "2", value: "WEB" },
        // { key: "3", value: "WINDOWS" },
        // { key: "4", value: "MAC" },
        { key: "0", value: "CT_API" },
        { key: "1", value: "CT_WEB" },
        { key: "2", value: "CT_WIN" },
        { key: "3", value: "CT_AND" },
        { key: "4", value: "CT_IOS" },
    ],
    userType: [
        { key: "1", value: "个人用户" },
        { key: "2", value: "算法厂商用户" },
        { key: "3", value: "多用户管理员" },
        { key: "4", value: "行情用户" },
    ],
    businessType: [
        { key: "1", value: "现货" },
        { key: "2", value: "期权" },
        { key: "3", value: "两融" },
    ],
    businessTypeSelect: [
        { key: "1", value: "现货" },
        { key: "3", value: "两融" },
    ],
    market: [
        { key: "1", value: "上交所" },
        { key: "2", value: "深交所" },
    ],
    accountType: [
        { key: "1", value: "股票" },
        { key: "2", value: "期权" },
        { key: "3", value: "两融" },
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
        { key: "64", value: "篮子已补单" },
    ],
    basketType: [
        // { key: "0", value: "客户创建" },
        // { key: "1", value: "自动创建" },
        //改
        { key: "1", value: "客户创建" },
        { key: "2", value: "一键优选" },
        { key: "4", value: "后台创建" },
        { key: "8", value: "两融(算法交易端)" },
        { key: "16", value: "两融(一键优选)" },
        { key: "32", value: "两融(证券交易端)" },
    ],
    bStatus: [
        // IBS_INITIAL   = 0, // Initial
        // IBS_FROZEN    = 1, // 锁定
        // IBS_DELETE    = 2, // delete
        { key: "0", value: "初始态" },
        { key: "1", value: "锁定" },
        { key: "2", value: "删除" },
    ],
    counterStatus: [
        // { key: "0", value: "关闭" },
        // { key: "1", value: "使能" },
        { key: "0", value: "不可用" },
        { key: "1", value: "可用" },
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
    // 1:T0日内回转 2:智能委托 3:调仓
    algorithmType: [
        { key: "1", value: "T0日内回转" },
        { key: "2", value: "智能委托" },
        // { key: "3", value: "调仓" },
    ],
    // algorithmTypeId: [
    //     { key: "1", value: "智能委托" },
    //     { key: "2", value: "POV" },
    //     { key: "3", value: "股指" },
    //     // { key: "3", value: "调仓" },
    // ],
    userStatus: [
        { key: "1", value: "正常" },
        { key: "2", value: "注销" },
        { key: "3", value: "冻结" },
        // { key: "4", value: "删除" },
    ],
    algorithmStatus: [
        { key: "0", value: "未开始" },
        { key: "1", value: "运行中" },
        { key: "2", value: "已停止" },
        { key: "3", value: "正在停止" },
        { key: "4", value: "暂停" },
        { key: "5", value: "准备运行" },
        { key: "6", value: "补单" },
        { key: "7", value: "补单结束" },
        { key: "8", value: "运行结束" },
    ],
    // algorithmEnable: [
    //     { key: "0", value: "不可用" },
    //     { key: "1", value: "可用" },
    // ],
    algoOrdStatus: [
        //0总线接收 1总线拒绝 2算法平台接收 3算法平台拒绝 4撤销
        { key: "0", value: "已接收" },
        { key: "1", value: "已拒绝" },
        { key: "2", value: "已接收" },
        { key: "3", value: "已拒绝" },
        { key: "4", value: "已撤销" },
        { key: "5", value: "部分成交" },
        { key: "6", value: "完全成交" },
        { key: "7", value: "未成交" },
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
    supportType: [
        { key: "1", value: "现货" },
        { key: "2", value: "期权" },
        // { key: "3", value: "现货、期权" },
        { key: "4", value: "两融" },
        // { key: "5", value: "现货、两融" },
        // { key: "6", value: "期权、两融" },
        // { key: "7", value: "现货、期权、两融" },
    ],
    status: [
        { key: "0", value: "不可用" },
        { key: "1", value: "现货可用" },
        { key: "2", value: "期权可用" },
        { key: "3", value: "现货可用、期权可用" },
        { key: "4", value: "两融可用" },
        { key: "5", value: "现货可用、两融可用" },
        { key: "6", value: "期权可用、两融可用" },
        { key: "7", value: "现货可用、期权可用、两融可用" },
    ],
    authStatus: [
        { key: "1", value: "正常" },
        // { key: "2", value: "删除" },
        { key: "3", value: "禁用" },
    ],
    //0:未登录 1正常登录状态 2 网络异常断开 3 会话超时 4 正常登出
    sessionStatus: [
        { key: "0", value: "未登录" },
        { key: "1", value: "正常登录状态" },
        { key: "2", value: "网络异常断开" },
        { key: "3", value: "会话超时" },
        { key: "4", value: "正常登出" },
    ],
    positionEffect: [
        { key: 79, value: "开仓" },
        { key: 67, value: "平仓" },
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
        { key: 49, value: "买" },
        { key: 50, value: "卖" },
        { key: 68, value: "申购" },
        { key: 69, value: "赎回" },
        { key: 70, value: "出借" },
        { key: 71, value: "借入" },
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
        { key: "1", value: "幅度(百分比)" },
        { key: "2", value: "价格(绝对值)" },
    ],
    // 运维系统 : 证券信息管理 - 证券状态0正常, 1停盘, 2退市',
    // 4-ST, 5-*ST,6-上市次日到5日(无涨跌幅)
    securityStatus: [
        { key: "0", value: "正常" },
        { key: "1", value: "停盘" },
        { key: "2", value: "退市" },
        { key: "4", value: "ST" },
        { key: "5", value: "*ST" },
        { key: "6", value: "上市次日到5日" },
    ],
    // 运维系统 : 证券信息管理 - 是否有涨跌限制'是否有涨跌停价格限制,Y=是,N=否',
    hasPriceLimit: [
        { key: "Y", value: "是" },
        { key: "N", value: "否" },
        // { key: "0", value: "否" },
        // { key: "1", value: "是" },
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
    // 下单类型
    fileTypeList: [
        { key: "0", value: "全部" },
        { key: "1", value: "下单报单" },
        { key: "2", value: "下单回执" },
        { key: "3", value: "撤单报单" },
        { key: "4", value: "撤单回执" },
    ],
    //下单/撤单
    retCode: [
        { key: "0", value: "成功" },
        { key: "1", value: "参数错误" },
        { key: "2", value: "没该消息处理函数" },
        { key: "3", value: "io写出错" },
        { key: "4", value: "登录失败，超出客户端限制" },
        { key: "5", value: "用户名或密码错误" },
        { key: "6", value: "用户类型错误" },
        { key: "7", value: "登录柜台失败" },
        { key: "8", value: "会话不存在" },
        { key: "9", value: "重复登录" },
        { key: "10", value: "登出失败" },
        { key: "11", value: "心跳超时" },
        { key: "12", value: "消息格式错误" },
        { key: "13", value: "不存在篮子" },
        { key: "14", value: "篮子冻结" },
        { key: "15", value: "篮子已经删除" },
        { key: "16", value: "请求序列号重复" },
        { key: "17", value: "股东账户不存在" },
        { key: "18", value: "交易client的用户不存在" },
        { key: "19", value: "算法不存在" },
        { key: "20", value: "算法类型异常" },
        { key: "21", value: "母单不存在 或 已删除" },
        { key: "22", value: "母单已运行结束" },
        { key: "23", value: "母单不能启动" },
        { key: "24", value: "母单当前不能操作" },
        { key: "25", value: "母单操作非法" },
        { key: "26", value: "母单运行中，不允许登出柜台" },
        { key: "27", value: "子单不存在" },
        { key: "28", value: "原订单不存在" },
        { key: "29", value: "持仓不存在" },
        { key: "30", value: "持仓不够" },
        { key: "31", value: "查询不到数据" },
        { key: "32", value: "查询每页数量为0" },
        { key: "33", value: "页越界" },
        { key: "34", value: "不存在的查询类型" },
        { key: "35", value: "母单已经进入busy状态" },

        { key: "36", value: "算法已注册" },
        { key: "37", value: "风控初始化未完成" },
        { key: "38", value: "算法超过时间量总委托笔数" },
        { key: "39", value: "用户超过时间量总委托笔数" },
        { key: "40", value: "用户总委托数超过总委托笔数" },
        { key: "41", value: "用户算法总委托数超过总委托笔数" },
        { key: "42", value: "用户撤单比超过撤单比阈值,不允许撤单" },
        { key: "43", value: "用户废单比超过废单比阈值,不允许下单" },
        { key: "44", value: "用户算法废单比超过废单比阈值,不允许下单" },
        { key: "45", value: "用户净买入金额超过阈值" },

        { key: "46", value: "用户算法净买入金额超过阈值" },
        { key: "47", value: "用户撤单频率超过阈值" },
        { key: "48", value: "用户算法撤单频率超过阈值" },
        { key: "49", value: "用户同笔撤单间隔超过阈值" },
        { key: "50", value: "用户超过下单频率笔数阈值" },
        { key: "51", value: "用户超过下单频率总量阈值" },
        { key: "52", value: "用户超过下单频率总金额阈值" },
        { key: "53", value: "操作篮子中的母单出错" },
        { key: "54", value: "柜台无可用网关" },
        { key: "55", value: "订单类型错误" },
        { key: "56", value: "资金余额不足" },
        { key: "57", value: "证券信息不存在" },
        { key: "58", value: "价格超过涨跌停价格" },
        { key: "59", value: "价格对敲" },
        { key: "60", value: "内容太多,消耗的内存超过了缓存" },

        { key: "61", value: "原订单被拒绝" },
        { key: "62", value: "原订单已撤销" },
        { key: "63", value: "原订单已完全成交" },
        { key: "64", value: "业务类型错" },
        { key: "65", value: "报盘失败" },
        { key: "66", value: "现货柜台未登录" },

        { key: "67", value: "期权柜台未登录" },
        { key: "68", value: "融资融券柜台未登录" },
        { key: "69", value: "母单和篮子的算法不一致" },
        { key: "70", value: "行情客户端未找到" },
        { key: "71", value: "获取静态文件失败" },
        { key: "72", value: "无可用柜台" },
        { key: "73", value: "柜台连接失败" },
        { key: "74", value: "柜台登录失败" },
        { key: "75", value: "柜台登出失败" },
        { key: "76", value: "柜台数据同步失败" },
        { key: "77", value: "错误的市场类型" },
        { key: "78", value: "篮子中母单的securityId重复" },
        { key: "79", value: "从属同一user的篮子名重复" },
        { key: "80", value: "无修改算法权限" },
        { key: "81", value: "算法可用状态取值非法" },
        { key: "82", value: "不可修改算法厂商可用状态" },
        { key: "83", value: "算法不可用" },
        { key: "84", value: "无柜台网关配置" },
        { key: "85", value: "无柜台信息" },
        { key: "86", value: "不存在的证券代码" },
        { key: "87", value: "柜台业务类型不支持" },

        { key: "88", value: "证券代码源冲突" },
        { key: "89", value: "没有对应的行情市场" },
        { key: "90", value: "没有对应的证券类型" },
        { key: "91", value: "行情数组下标越界" },
        { key: "92", value: "订阅的证券代码的数量超过最大支持数" },
        { key: "93", value: "订阅的证券类型和行情类型冲突" },
        { key: "94", value: "算法运行状态取值错误" },
        { key: "95", value: "委托数量非法" },
        { key: "96", value: "柜台网络异常" },

        { key: "97", value: "风控组不存在" },
        { key: "98", value: "算法名称重复" },
        { key: "99", value: "篮子类型错误" },
        { key: "100", value: "订单过滤状态错误" },
        { key: "101", value: "篮子母单未接收完全" },
        { key: "102", value: "用户无该算法使用权限" },
        { key: "103", value: "订单方向异常" },
        { key: "104", value: "用户无权限" },
        { key: "105", value: "信用账户不存在" },
        { key: "106", value: "证券不支持该业务" },
        { key: "107", value: "合约号不存在" },
        { key: "108", value: "合约过期" },
        { key: "109", value: "合约展期未到期" },

        { key: "510", value: "未连接" },
        { key: "511", value: "格式化请求发生错误" },
        { key: "512", value: "null异常" },
        { key: "513", value: "解析异常" },
        { key: "514", value: "服务断链" },
        { key: "515", value: "csv错误" },
        { key: "516", value: "校验错误" },
        { key: "517", value: "上传文件为空" },
        { key: "518", value: "文件格式错误" },
        { key: "520", value: "文件实例化异常" },
        { key: "521", value: "资金账号不存在" },
        { key: "522", value: "算法不存在" },
        { key: "523", value: "重复请求" },
        { key: "525", value: "securityId重复" },
        { key: "526", value: "响应超时" },
        { key: "527", value: "资金账号未登陆" },
        { key: "528", value: "资金账号不一致" },
        { key: "529", value: "开始时间应小于结束时间" },
        { key: "530", value: "操作类型错误" },
        { key: "531", value: "操作类型不一致" },
        { key: "532", value: "数据解析错误" },
        { key: "533", value: "sessionId为空" },
        { key: "534", value: "funcNo为空" },
        { key: "535", value: "文件解析异常" },
        { key: "536", value: "未登录" },
        { key: "537", value: "token失效" },
        { key: "538", value: "上传文件失败" },
        { key: "539", value: "下载文件失败" },
        { key: "540", value: "删除文件失败" },
        { key: "541", value: "算法不一致" },
        { key: "542", value: "无应答" },
        { key: "543", value: "文件执行成功的部分被修改" },
        { key: "544", value: "文件格式错误" },
        { key: "545", value: "文件用户名错误" },
        { key: "546", value: "文件执行方式错误" },
        { key: "547", value: "文件未新增执行命令" },
        { key: "548", value: "文件过大" },
        { key: "549", value: "文件类型错误" },
        { key: "550", value: " 买卖方向错误" },

        { key: "1021", value: "登录柜台失败" },
        // { key: "0000", value: "正常" },
        { key: 10001, value: "证券编码与市场编码在交易信息表中不存在" },
        { key: 10002, value: "业务开关被关闭" },
        { key: 10003, value: "交易单元权限不存在" },
        { key: 10004, value: "账户信息表中不存在账户" },
        { key: 10005, value: "在发行业务不允许重复认购的情况下，做重复认购" },
        { key: 10006, value: "证券账户对应业务产品交易被限制" },
        { key: 10007, value: "委托价格在价格涨跌幅范围 之外" },
        { key: 10008, value: "委托价格不为价格档位的整数倍" },
        { key: 10009, value: "委托数量超过数量上下限" },
        { key: 10010, value: "委托数量不为买卖数量单位的整数倍" },
        { key: 10011, value: "卖开仓保证金不足" },
        { key: 10012, value: "买开仓权利金不足" },
        { key: 10013, value: "交易费用资金不足" },
        { key: 10014, value: "客户标的合约持仓超过限额" },
        { key: 10015, value: "券商标的合约持仓超过限额" },
        { key: 10016, value: "客户标的合约交易量超过限额" },
        { key: 10017, value: "券商标的合约交易量超过限额" },
        { key: 10018, value: "平仓可平量不足" },
        { key: 10019, value: "备兑开仓标的券股份不足" },
        { key: 10020, value: "当前市场状态不允许申报委托" },
        { key: 10021, value: "营业部无对应业务权限" },
        { key: 10022, value: "委托无法被撤销" },
        { key: 10023, value: "证券账户无对应业务产品权限" },
        { key: 10024, value: "期权买入开仓成交金额超过限制" },
        { key: 10025, value: "证券账户业务和产品无权限" },
        { key: 10026, value: "证券账户在证券账户信息表中不存在" },
        { key: 10027, value: "账户可用资金不足" },
        { key: 10028, value: "账户持有股份不足" },
        { key: 10029, value: "发行申购证券与账户所属市场不一致" },
        { key: 10030, value: "投资者的业务被黑名单限制" },
        { key: 10031, value: "投资者的业务不在白名单中" },
        { key: 10032, value: "投资者级别不够" },
        { key: 10033, value: "投资者适当性不正确" },
        { key: 10034, value: "超过投资者认购额度限制" },
        { key: 10035, value: "投资者认购额度表中不存在" },
        { key: 10036, value: "交易单元业务权限不足" },
        { key: 10037, value: "转托管交易单元的转入和转出不能一致" },
        { key: 10038, value: "证券业务开关表中不存在" },
        { key: 10039, value: "证券账户无该类证券交易权限" },
        { key: 10040, value: "账户当前的状态不允许做指定交易" },
        { key: 10041, value: "账户当前的状态不允许做撤销指定交易" },
        { key: 10042, value: "指定交易证券ID错误" },
        { key: 10043, value: "账户未指定交易单元" },
        { key: 10044, value: "交易单元证券权限不足" },
        { key: 10045, value: "业务不支持当前的交易指令" },
        { key: 10046, value: "该指令消息找不到对应的原始委托" },
        { key: 10047, value: "证券账户与资金账户不匹配" },
        { key: 10048, value: "不允许市价指令" },
        { key: 10049, value: "市场不允许该业务" },
        { key: 10050, value: "期权行权操作不在规定的行权日期范围内" },
        { key: 10051, value: "指定的交易单元不在交易单元信息表中" },
        { key: 10052, value: "当前证券账户状态不允许买或卖" },
        { key: 10053, value: "权利仓的净持仓量不足以行权" },
        { key: 10054, value: "停牌证券不允许交易" },
        { key: 10055, value: "客户未开通买入风险警示板证券的权限" },
        { key: 10056, value: "交易所已闭市" },
        { key: 10057, value: "当日买入的风险警示板证券数量超过上限" },
        { key: 10058, value: "无法分配申报合同号" },
        { key: 10059, value: "不在引擎接受订单的时间范围内" },
        { key: 10060, value: "当前时间禁止撤单" },
        { key: 10061, value: "可转托管的证券余量不足" },
        { key: 10062, value: "找不到订单对应的资金交易规则模板" },
        { key: 10099, value: "基础字段检查不通过,证券编码组成等在合理范围外" },
        { key: 10100, value: "交易所拒绝,具体的编码将会填到ReasonText" },
        { key: 10101, value: "网关开关关闭" },
        { key: 10102, value: "无法从路由表中找到账户信息对应的发给Te的分区号" },
        { key: 10103, value: "业务类型字段和消息不匹配，不在有效的范围" },
        { key: 10104, value: "市场字段不在有效的范围内" },
        { key: 10105, value: "买卖方向不在有效范围内" },
        { key: 10106, value: "订单类型不在有效的范围" },
        { key: 10107, value: "订单有效期不在有效范围" },
        { key: 10108, value: "信用标识不在有限范围" },
        { key: 10109, value: "开平仓标识不在有效范围" },
        { key: 10110, value: "备兑标识不在有效范围" },
        { key: 10111, value: "转托管注册类型不在有效范围" },
        { key: 10112, value: "证券代码不在有效范围，转托管业务证券代码有要求" },
        { key: 10113, value: "订单申报数量值不在有效范围，转托管要求填0" },
        { key: 10114, value: "价格字段不在有效范围，撤单等要求填0" },

        { key: "24000", value: "系统内部错误" },
        { key: "24001", value: "参数非法" },
        { key: "24002", value: "网络超时" },
        { key: "24003", value: "消息发送失败" },
        { key: "24004", value: "非法协议包" },
        { key: "24005", value: "打包失败" },
        { key: "24006", value: "解包失败" },
        { key: "24007", value: "内存不够" },
        { key: "24008", value: "客户端初始化错误" },
        { key: "24009", value: "客户端未连接" },
        { key: "24010", value: "客户端登录网关失败" },
        { key: "24011", value: "客户端未初始化" },
        { key: "24012", value: "网关返回路由失败" },
        { key: "24013", value: "网关返回逻辑错误" },
        { key: "24014", value: "网关返回关键字段错误" },
        { key: "24015", value: "网关返回解析错误" },
        { key: "24016", value: "用户不在白名单内" },
        { key: "24017", value: "用户没配任何柜台" },
        { key: "24018", value: "用户的接入IP地址错误" },
        { key: "24019", value: "用户的接入MAC地址错误" },
        { key: "24020", value: "未查到数据或全部数据查询完毕" },
        { key: "24021", value: "证书文件不存在" },
        { key: "24022", value: "网关返回不能处理此消息" },
        { key: "24023", value: "网关返回流量超限，阻断此消息" },
        { key: "24024", value: "交易账号被禁用" },
        { key: "24025", value: "网关返回客户端连接ID非法" },
        { key: "24026", value: "网关返回客户端连接ID已被使用" },
        { key: "24027", value: "超过最大条数限制" },
        { key: "24028", value: "请求序号一段时间内需唯一" },
        { key: "24029", value: "接口版本低于最低版本要求" },
        { key: "24030", value: "不支持此功能" },
        { key: "24031", value: "传入的对象内存不够" },
        { key: "24032", value: "未获取到股东账号" },
        { key: "24033", value: "查询账号核心号失败" },
        { key: "24034", value: "客户端登录账号失败" },
        { key: "24035", value: "查询账号核心号返回的数据不对" },
        { key: "24036", value: "微服务返回调用失败" },
        { key: "24037", value: "微服务返回业务错误" },
        { key: "24038", value: "修改密码后获取新密码失败" },
        { key: "24039", value: "修改密码后获取用户代码失败" },
        { key: "24040", value: "未获取到用户代码" },
        {
            key: "24041",
            value: "同一个API对象已成功绑定一个资金账号时，不能再使用其他账号登录",
        },
        { key: "24042", value: "应答数据为空，应答数据包有问题" },
        { key: "24043", value: "网关返回超过最大连接数" },
    ],
    // 两融
    settleStatus: [
        { key: "0", value: "未了结" },
        { key: "1", value: "了结" },
    ],
    // bit0-可融资 bit1-可融券 bit2-可作担保品 bit3-新股
    creditType: [
        { key: "1", value: "可融资" },
        { key: "2", value: "可融券" },
        { key: "3", value: "可融资,可融券" },
        { key: "4", value: "可作担保品" },
        { key: "5", value: "可融资,可担保" },
        { key: "6", value: "可融券,可担保" },
        { key: "7", value: "可融资,可融券,可担保" },
        { key: "8", value: "新股" },
    ],
    //持仓方向 0现货 1权利持仓(期权) 2义务持仓(期权) 3备兑持仓(期权) 4两融多仓 5两融空仓"),
    positionType: [
        { key: "0", value: "现货" },
        { key: "1", value: "权利持仓(期权)" },
        { key: "2", value: "义务持仓(期权)" },
        { key: "3", value: "备兑持仓(期权)" },
        { key: "4", value: "两融多仓" },
        { key: "5", value: "两融空仓" },
    ],
    // 股东账户状态
    accountStatus: [
        { key: "1", value: "正常" },
        // { key: "2", value: "删除" },
        { key: "3", value: "冻结" },
    ],

    // 币种
    currencyType: [
        { key: "1", value: "人民币" },
        { key: "2", value: "港币" },
        { key: "3", value: "美元" },
    ],

    // 操作项目
    operateItem: [
        { key: "1", value: "登录" },
        { key: "2", value: "登出" },
        { key: "3", value: "新增" },
        { key: "4", value: "删除" },
        { key: "5", value: "更新" },
        { key: "6", value: "查询" },
        { key: "7", value: "上传" },
        { key: "8", value: "导出" },
    ],
};

export default configData;
