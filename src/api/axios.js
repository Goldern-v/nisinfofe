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
import {
    MessageBox
} from "element-ui";
// 统一处理token发送
axios.interceptors.request.use((config) => {
    // 判断如果是登录 则无需验证token
    config.headers.common['App-Token-Nursing'] = $params.appToken || '51e827c9-d80e-40a1-a95a-1edc257596e7'

    var token = (window.app && window.app.$getCookie('NURSING_USER').split('##')[1]) || $params.token

    if (config.url.indexOf("identityCheck") > -1) {
        config.headers.common["Auth-Token-Nursing"] = token || '';
    }
    if (config.url.indexOf('login') > -1 || config.url.indexOf('autoLogin') > -1 || config.url.indexOf('logout') > -1 || config.url.indexOf('changePasswordByEmpNo') > -1 || config.url.indexOf('identityCheck') > -1) return config
    var user = localStorage['user']
    if (token) {
        config.headers.common['Auth-Token-Nursing'] = token
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
            } else {
                window.app.$message({
                    showClose: true,
                    message: data.desc || '服务器开小差了',
                    type: 'error'
                })
            }

        }
        console.log('data.errorCode', data)
        return data.errorCode == 1000 ? Promise.reject(res) : Promise.reject();
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
            message: '网络错误，请检查你的网络',
            type: 'warning'
        })
    }
    return Promise.reject()
})

export default axios
