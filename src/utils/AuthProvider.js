const wxRequest = require('./wxRequest');
import API from './api';

function onLogin(type, phoneNum, callback) {
    if (phoneNum) {
        //有手机号码就是第一次进来你，然后保存下来
        wx.setStorageSync('phoneNum', phoneNum)
    }
    let url, dataParams, tokenParams;
    if (type === 'sell') {
        url = API.getToken;
        tokenParams = null;
        dataParams = {
            phone: phoneNum || wx.getStorageSync('phoneNum'),
            id: wx.getStorageSync('unionid')
        }
    } else if ((type === 'buy')) {
        tokenParams = { type: 'Basic', value: API.SECRET };
        url = API.getTokenC + 'unionid_' + wx.getStorageSync('unionid') + '_type_2';
    }
    return wxRequest.fetch(url, tokenParams, dataParams, "POST").then((res) => {
        if (res.data.resultCode === '100') {
            console.log('卖家鉴权');
            saveTokens(res.data.resultContent.access_token, res.data.resultContent.refresh_token, res.data.resultContent.expires_in);
            callback(res.data);
            return res.data.resultContent.access_token
        } else if (res.data.resultCode === '02504046') {
            callback({ msg: '该用户不在白名单内', code: 404 })
        } else if (res.data.access_token) {
            console.log('买家鉴权');
            saveTokens(res.data.access_token, res.data.refresh_token, res.data.expires_in);
            return res.data.access_token
        } else {
            callback({ msg: '异常错误', code: 304 })
        }
    }).catch((req) => {
        callback({ msg: '请求出错', code: 502 });
        return 'error'
    })
}
function setWait() {
    wx.removeStorageSync('access_token');
}
function saveTokens(access_token, refresh_token, expires_in) {
    wx.setStorageSync('access_token', access_token);
    wx.setStorageSync('refresh_token', refresh_token);
    var exp = new Date();
    var expires_ins = exp.getTime() + expires_in * 1000 - 30000;
    wx.setStorageSync('expires_in', expires_ins);
}
function onRefreshToken() {
    setWait();
    let token = API.SECRET;
    var url = API.refreshToken + wx.getStorageSync('refresh_token');
    return wxRequest.fetch(url, { type: 'Basic', value: token }, '', 'POST').then((res) => {
        if (res.data.access_token) {
            saveTokens(res.data.access_token, res.data.refresh_token, res.data.expires_in);
            return res.data.access_token;
        } else {
            return onLogin(wx.getStorageSync('userType'), null, res => { }).then(res => {
                return res
            });
        }
    }).catch(req => {
        if (wx.getStorageSync('refresh_token') != null) {
            return onLogin(wx.getStorageSync('userType'), null, res => { }).then(res => {
                return res
            });
        }
    })
}
function getAccessToken() {
    var date = new Date();
    var dt = date.getTime();
    var expires_in = wx.getStorageSync('expires_in');
    if ((!expires_in || dt >= expires_in) && wx.getStorageSync('access_token')) {
        return onRefreshToken();
    } else if (!wx.getStorageSync('access_token')) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(wx.getStorageSync('access_token'))
            }, 2000)
        })
    } else {
        return new Promise((resolve, reject) => {
            resolve(wx.getStorageSync('access_token'))
        })
    }
}
module.exports = {
    onLogin: onLogin,
    getAccessToken: getAccessToken
}