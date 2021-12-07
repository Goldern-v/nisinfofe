import storage from "@/utils/loginTimeOut/storage";
import router from "@/router/index";
import { MessageBox, Message, Notification } from "element-ui";

let lastTime = new Date().getTime(),//最后一次更新时间
    currenTime = new Date().getTime(),//当前时间
    timeOut = 3 * 60 * 1000,//超时时间 默认三分钟
    astrictInterval = null,//定时器对象
    astrictHisList = ["liaocheng"];//需要启动超时登录的医院列表

//初始化方法
export const initAstrict = () => {
    if (astrictHisList.includes(process.env.HOSPITAL_ID)) {
        console.log("执行")
        window.clearInterval(astrictInterval);
        astrictInterval = window.setInterval(checkTimeOut, 20000);//20秒执行一次
    }
}

//清除astrictInterval
export const clearAstrictInterval = () =>{
    window.clearInterval(astrictInterval);
}

//是否为登录界面
export const isLogin = () =>{
    // console.log(router.history.current.fullPath)
    return router.history.current.fullPath == "/login";
}

//显示登录超时 
export const initMessageBox = () => {
    //清除定时器
    clearAstrictInterval();
    MessageBox(
        {
            title:"温馨提示",
            message:`${isLogin()?'您的智慧护理信息系统已很久未操作了呢':'登录已超时，请重新登录'}`,
            callback:(action, instance)=>{
                //重启定时器
                initAstrict();
            }
        }
    );
}
//监听更新时间
window.onload = function () {
    window.document.onmousemove = function () {
        storage.setLocalStorageItem("lastTime", new Date().getTime());
    },
    window.document.onmousedown = function () {
        storage.setLocalStorageItem("lastTime", new Date().getTime());
    },
    window.document.onmouseup = function () {
        storage.setLocalStorageItem("lastTime", new Date().getTime());
    }
}
//检查是否登录超时
const checkTimeOut = () => {
    currenTime = new Date().getTime();
    lastTime = storage.getLocalStorageItem("lastTime");
    switch (process.env.HOSPITAL_ID){
        case "guizhou":
            timeOut=10 * 60 * 1000;
            break;
        case "liaocheng":
            timeOut=10 * 60 * 1000;
            break;
        default: 
            timeOut=10 * 60 * 1000;
            break;

    }
    if (currenTime - lastTime >= timeOut) {
        //storage.removeLocalStorageItem("lastTime");
        // console.log(router.currentRouter)
        // console.log(router)
         //重启
         initMessageBox();
        if (isLogin()) return false;
        router.replace("/login")
       
    }
}



export default function () {
    initAstrict();
}