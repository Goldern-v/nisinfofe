// axios 全局配置
import axios from 'axios'
import qs from 'qs'
import {
    host
} from './apiConfig'
import Cookies from 'js-cookie'
import {
    $params
} from '@/pages/sheet-print/tool/tool'
import { logout } from "@/api/login";
import {
    MessageBox
} from "element-ui";
// 统一处理token发送

let CaSignurl = ""
let verifyUserObj = {}
let strCertId = ""
let strPassword = ""
let username = ""
let strRandom = ""
axios.interceptors.request.use((config) => {
    // 判断如果是登录 则无需验证token
    config.headers.common['App-Token-Nursing'] = $params.appToken || '51e827c9-d80e-40a1-a95a-1edc257596e7'

    var token = (window.app && window.app.$getCookie('NURSING_USER').split('##')[1]) || (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token) || $params.token
    if (config.url.indexOf("identityCheck") > -1 || config.url.indexOf('sysPasswordSet/findList') > -1 ) {
        config.headers.common["Auth-Token-Nursing"] = token || '';
    }else if(config.url.indexOf('dsvsFssyNew/verifyUser') > -1 && window.app.$route.fullPath.indexOf("/login")==-1){
        config.headers.common["Auth-Token-Nursing"] = token || '';
    }
    // 遍历白名单
    const whiteList = [
    'login', 'autoLogin', 'ssoLogin', 'logout',
    'changePasswordByEmpNo', 'sysPasswordSet/findList',
    'identityCheck', 'getPasswordRule','updatePassword',
    'AllUkeyList','SOF_ExportUserCert','genRandom','SOF_ValidateCert_Text',
    'GetUserList','SOF_VerifySignedData',"SOF_Login","SOF_SignData","verifyUser","SOF_GetRetryCount", 'getDictItem',
    'getQrCodeStatus','getRandomQrCode','caSignHoujie/getAccessToken','oauth','caLogin','endAutoSign', 'ipAddress'
]

    for (let i = 0; i < whiteList.length; i++) {
        let whiteUrlPath = whiteList[i]
        if (config.url.indexOf(whiteUrlPath) > -1){
            if(config.url.indexOf("GetUserList")>-1 || config.url.indexOf("verifyUser")>-1){
                CaSignurl = config.url.indexOf("GetUserList")>-1?"GetUserList":"verifyUser"
                if(config.url.indexOf("verifyUser")>-1){
                    let configData = config.data
                    let configDataARR = configData.split("&")
                    configDataARR.map(item=>{
                    let arr = item.split("=")
                    verifyUserObj[arr[0]] = arr[1]
                    })
                }
            }else if(config.url.indexOf("getQrCodeStatus")>-1){
                CaSignurl = "getQrCodeStatus"
            }else CaSignurl = ""
            if(config.url.indexOf("SOF_Login")>-1){
                strCertId = config.data.strCertId
                strPassword= config.data.strPassword
                username = config.data.username || ""
            }else if(config.url.indexOf("SOF_SignData")>-1){
                strRandom = config.data.strSignData
            }
            // CaSignurl = config.url.indexOf("GetUserList")>-1 && "GetUserList"
            // CaSignurl = config.url.indexOf("verifyUser")>-1 && "verifyUser"
            return config
        }
    }

    var user = localStorage['user']
    if (token) {
        config.headers.common['Auth-Token-Nursing'] = token
        if (config.url == '/crNursing/api/procedure/his') {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            return config
        }
        return config
    } else {
        localStorage.clear();
        sessionStorage.clear();
        // 跳转到登录页
        window.app.$router.push('/login')
    }
})
// 拦截请求访问失败
axios.interceptors.response.use((res) => {
    // if (typeof res.data === 'string') res.data = JSON.parse(res.data)
    var data = res.data
    // console.log('window.location.href',window.location.href)
    // console.log('app.$route.name',app.$route.name)
    // by谢岗
    // const {config} = res
    // const whiteList = ['service1.asmx']
    // console.log('test-res', res)
    // if (whiteList.findIndex(v => config.url.indexOf(v)> -1)> -1) {
    //     return res
    // }

    if (window.location.href.includes('nursingDoc') || window.location.href.includes('showPatientDetails')) {
        if (res.data.code == '301') {
            localStorage.clear();
            sessionStorage.clear();
            Cookies.remove("NURSING_USER");
            window.app.$router.go(-1);
        }
        return res;
    }
    // 如果格式不正确 显示报错提示信息
    if (data.code === '200' && data.errorCode === '1001') {
        const h = window.app.$createElement;
        MessageBox({
            title: '消息',
            type: 'warning',
            message: h('p', null, [
                h('div', {
                    style: 'white-space: pre-wrap;'
                }, data.desc),
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        })
    }
    // 如果token没有通过
    if (data.code === '300') {

        /** 评估单页面特殊处理，突出提示效果 */
        if (window.app && window.app.$message) {
            let path = app.$route.path
            let name = app.$route.name
            if (path == '/formPage' ||
                name == 'sheetHospitalAdmissionPage' ||
                path == '/sheetHospitalEval' ||
                path == '/record'
            ) {
                window.app.$alert(data.desc || '服务器开小差了', '警告', {
                    confirmButtonText: '确定',
                    type: 'error',
                });
            }else if(CaSignurl=="getQrCodeStatus" || data.desc=="qrCodeIdentity不能为空"){
                //不执行操作
            }else{
                window.app.$message({
                    showClose: true,
                    message: data.desc || '服务器开小差了',
                    type: 'error'
                })
            }

        }
        if(CaSignurl=="verifyUser" && data.desc=="非当前登录用户证书，请重新登录"){
            window.app && window.app.$confirm('是否切换用户登陆?', '提示', {
                confirmButtonText: '切换用户',
                cancelButtonText: '继续使用',
                type: 'warning',
                customClass: "logoutClass"
              }).then(() => {
                window.reloginCaSignModal({username,verifyUserObj,strCertId,strPassword,strRandom})
              }).catch(() => {
                window.closeCaSignModal()
              });
        }
        return Promise.reject(res);
    } else if (data.code === '301') {
        window.app && window.app.$message({
            showClose: true,
            message: '登录超时，请重新登录',
            type: 'warning'
        })
        window.app && window.app.$store.commit('upRelogin', window.app.$route.fullPath)
        setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
            window.app.$router.push({
                path: '/login'
            })
        }, 100)
        return Promise.reject()
    } else {
        return res
    }
}, (err) => {
    if (err && err.message == 'Network Error') {
        window.app && window.app.$message({
            showClose: true,
            message: CaSignurl == "GetUserList"?'未能识别到U盾':'网络错误，请检查你的网络',
            type: 'warning'
        })
    }
    return Promise.reject()
})

export default axios
