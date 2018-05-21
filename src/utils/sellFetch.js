import API from './api';
let wxRequest = require('./wxRequest');
let AuthProvider = require('./AuthProvider');
let util = require('./util');
/**
 * 创建商品
 * @param data
 * @param callback
 */
function createProduct(data, callback) {
    AuthProvider.getAccessToken().then(token => {
        "use strict";
        return wxRequest.fetch(API.createProduct, { type: 'bearer', value: token }, data, "POST")
    }).then(res => {
        "use strict";
        callback(res);
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 获取列表
 * @param pageInfo
 */
function getProductList(pageInfo, callback) {
    AuthProvider.getAccessToken().then(token => {
        "use strict";
        return wxRequest.fetch(API.getProductList, { type: 'bearer', value: token }, pageInfo, "POST")
    }).then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 终止活动
 * @param id
 * @param callback
 */
function stopActivity(id, callback) {
    AuthProvider.getAccessToken().then(token => {
        "use strict";
        return wxRequest.fetch(API.stopActivity + id, { type: 'bearer', value: token }, null, "PUT")
    }).then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 获取商品信息
 * @param id
 * @param callback
 */
function getGoodDetail(id, callback) {
    AuthProvider.getAccessToken().then(token => {
        "use strict";
        return wxRequest.fetch(API.getGoodDetail + id, { type: 'bearer', value: token }, null, "GET")
    }).then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 获取销售记录
 * @param data
 * @param callback
 */
function getOrdersList(data, callback) {
    AuthProvider.getAccessToken().then(token => {
        "use strict";
        let url = API.getOrdersList + `?_currentPage=${data.currentPage}&_pageSize=${data.pageSize}`;
        return wxRequest.fetch(url, { type: 'bearer', value: token }, { skuId: data.id }, "POST")
    }).then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 申请入驻
 * @param data
 * @param callback
 */
function apply(data, callback) {
    wxRequest.fetch(API.apply, null, data, "POST").then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })

}

/**
 * 判断申请入驻状态
 * @param phone
 * @param callback
 */
function queryShopOwnerWhiteList(phone, callback) {
    wxRequest.fetch(API.queryShopOwnerWhiteList + phone, null, null, "GET").then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 获取店铺地址，名称
 * @param callback
 */
function getShopMessage(callback) {
    AuthProvider.getAccessToken().then(token => {
        "use strict";
        return wxRequest.fetch(API.getShopMessage, { type: 'bearer', value: token }, null, "GET")
    }).then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 提现
 * @param data
 * @param callback
 */
function withDrawPay(data, callback) {
    AuthProvider.getAccessToken().then(token => {
        "use strict";
        return wxRequest.fetch(API.withDrawPay, { type: 'bearer', value: token }, data, "POST")
    }).then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 资金流水
 * @param callback
 */
function loadAccountInfo(callback) {
    AuthProvider.getAccessToken().then(token => {
        "use strict";
        return wxRequest.fetch(API.loadAccountInfo, { type: 'bearer', value: token }, null, "GET")
    }).then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}
/**
 *长短转换
 * @param str
 * @param callback
 */
function longToshort(str, callback) {
    wxRequest.fetch(API.longToshort + str, null, null, "GET").then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}

/**
 * 长短转换
 * @param str
 * @param callback
 */
function shortTolong(str, callback) {
    wxRequest.fetch(API.shortTolong + str, null, null, "GET").then(res => {
        "use strict";
        callback(res)
    }).catch(req => {
        "use strict";
        console.log("Error：" + req)
    })
}
module.exports = {
    createProduct: createProduct,
    getProductList: getProductList,
    stopActivity: stopActivity,
    getGoodDetail: getGoodDetail,
    getOrdersList: getOrdersList,
    apply: apply,
    queryShopOwnerWhiteList: queryShopOwnerWhiteList,
    getShopMessage: getShopMessage,
    withDrawPay: withDrawPay,
    loadAccountInfo: loadAccountInfo,
    longToshort: longToshort,
    shortTolong: shortTolong
}