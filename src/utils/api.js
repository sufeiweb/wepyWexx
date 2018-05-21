// const ORIGIN_NAME = 'https://cloud.gemii.cc/lizcloud/api';//生产环境
const ORIGIN_NAME = 'http://dev.gemii.cc:58080/lizcloud/api'; //开发模式
// const ORIGIN_NAME = 'http://test.gemii.cc:58080/lizcloud/api' //测试模式


const USER_LOGIN = ORIGIN_NAME + '/basis-api/noauth/';//授权绑定，用户登录1
const TOKRN = ORIGIN_NAME + '/uaa/oauth/token?';//获取token


const api = {
    SECRET: "bGl6LXNob3Atb3duZXI6c2VjcmV0", //base64加密liz-shop-owner:secret
    APP_ID: 'wx5dcfaad36777e61d', //APPID
    authLogin: USER_LOGIN + 'wdwd/loadUserAuthorizeWechat', //获取unionid
    getToken: ORIGIN_NAME + '/basis-api/noauth/usermgmt/loginShopOwner', //卖家获取token
    getTokenC: TOKRN + 'grant_type=password&password=&username=', //买家获取token
    refreshToken: TOKRN + 'grant_type=refresh_token&refresh_token=', //刷新token

    getPhoneCode: ORIGIN_NAME + '/basis-api/noauth/usermgmt/sendPhoneCode?_templateCode=SHOP_OWNER_VCODE_MSG&_phone=',//获取手机号码code
    codeYAN: ORIGIN_NAME + '/basis-api/noauth/usermgmt/checkPhoneCode',//验证手机号码

    getSmallPro: ORIGIN_NAME + '/basis-api/noauth/oauth/login/smallpro',//获取oppenid

    uploadImg: ORIGIN_NAME + '/gridfs-api/noauth/media',//上传图片

    apply: ORIGIN_NAME + '/basis-api/noauth/usermgmt/applyShopOwnerWhiteList',//申请入驻
    queryShopOwnerWhiteList: ORIGIN_NAME + '/basis-api/noauth/usermgmt/queryShopOwnerWhiteList/',//判断是否入驻申请

    createProduct: ORIGIN_NAME + '/e-goods-api/authsec/miniprogram/product',//创建商品
    getGoodDetail: ORIGIN_NAME + '/e-goods-api/noauth/miniprogram/good/brief?goodId=',//商品详细信息
    getProductList: ORIGIN_NAME + '/e-goods-api/authsec/miniprogram/goods',//获取商品列表 post
    stopActivity: ORIGIN_NAME + '/e-goods-api/authsec/miniprogram/removeshop/',//终止活动 put
    getOrdersList: ORIGIN_NAME + '/e-order-api/authsec/miniApp/orderapi/supplier/orders',//获取订单列表

    getShopMessage: ORIGIN_NAME + '/e-goods-api/authsec/miniprogram/tenant/address',//获取地址店铺

    getGoodInfo: ORIGIN_NAME + '/e-goods-api/noauth/miniprogram/good/brief',//获取商品信息 get
    getSkuInfo: ORIGIN_NAME + '/e-goods-api/noauth/tenant/good/',//获取skuInfo
    // submitOrder: ORIGIN_NAME + '/e-purchase-api/authsec/goods/miniapp/submit/buy',//商品提交购买
    submitOrder: ORIGIN_NAME + '/e-purchase-api/authsec/goods/miniapp/submit/buyandpay',//商品提交购买
    submitPayment: ORIGIN_NAME + '/marketplaceui/authsec/payment/prePayment/program',//小程序发起预支付
    bookGood: ORIGIN_NAME + '/e-goods-api/authsec/miniprogram/notice/good',//订阅商品

    withDrawPay: ORIGIN_NAME + '/tenantadmin-api/authsec/accountthird/createWithDraw/pay',//提现
    loadAccountInfo: ORIGIN_NAME + '/tenantadmin-api/authsec/account/loadAccountInfo',//资金流水
    templateNews: ORIGIN_NAME + '/basis-api/authsec/oauth/user/formId',//小程序推送模板消息

    longToshort: ORIGIN_NAME + '/e-goods-api/noauth/support/longToshort?type=0&longId=',//长转短
    shortTolong: ORIGIN_NAME + '/e-goods-api/noauth/support/shortTolong?shortId=',//短转长


};

export default api;