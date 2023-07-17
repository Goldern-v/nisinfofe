// 登录模块api
import axios from './axios'
import qs from 'qs'
import {
    apiPath
} from './apiConfig'
import md5 from "md5";

// 上班时间
function working() {
    return axios.get(`${apiPath}scheduling/working`)
}

// 上班打卡
function clockIn() {
    return axios.get(`${apiPath}scheduling/clockIn`)
}
// 下班打卡
function clockOut(offDutyTime) {
    return axios.post(`${apiPath}scheduling/clockOut`, qs.stringify({
        offDutyTime
    }))
}
// 我的排班
function mySetting(startDate, endDate) {
    return axios.get(`${apiPath}scheduling/mySetting`, {
        params: {
            startDate,
            endDate
        }
    })
}
// 全科排班
function deptSetting(workDate) {
    return axios.get(`${apiPath}scheduling/deptSetting`, {
        params: {
            workDate
        }
    })
}

// 通知
function notice() {
    return axios.get(`${apiPath}mail/notice`)
}

// 通知分页
function noticePage(pageIndex, pageSize) {
    return axios.get(`${apiPath}mail/noticePage`, {
        params: {
            pageIndex,
            pageSize
        }
    })
}

// 修改密码
function changePassword(oldPswd, newPswd, rePswd,empNo) {
    return axios.post(`${apiPath}changePassword`, {
        oldPswd,
        newPswd,
        rePswd,
        empNo
    })
}

// 横县-重置密码
function changePassword_hx(empNo, oldPswd, newPswd, rePswd) {
    return axios.post(`${apiPath}changePasswordByEmpNo`, {
        empNo,
        oldPswd,
        newPswd,
        rePswd
    })
}

//获取正则
function passwordRule() {
    return axios.get(`${apiPath}getPasswordRule`)
}

// 新版重置密码（带正则）
function  updatePassword(data) {
    return axios.post(`${apiPath}updatePassword`,data)
}

// 新版重置密码（带正则，入参密码已做md5加密）
function  updatePasswordMd5(data) {
    data.oldPswd = md5(data.oldPswd);
    data.newPswd = md5(data.newPswd);
    data.rePswd = md5(data.rePswd);
    return axios.post(`${apiPath}updatePasswordMd5`,data)
}


export {
    working,
    clockIn,
    clockOut,
    mySetting,
    deptSetting,
    notice,
    noticePage,
    changePassword,
    changePassword_hx,
    passwordRule,
    updatePassword,
    updatePasswordMd5
}
