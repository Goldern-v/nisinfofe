/**
 * @author: weijun.lai
 * @date: 2019-06-10 16:48:57
 * @lastEditors: weijun.lai
 * @lastEditTime: 2019-07-19 14:46:00
 * @version: cr-nursing-0.1
 * @description: 反复只使用同一个消息盒子开启关闭，不而外重叠显示其他消息盒子
 */

// import Vue from 'vue'

const wid = window //parent.window || window

export const notifyBox = () => {
    let mesg = null;
    let messageVNode = null;
    let type = "success"
    let title = "填写检查结果：";
    let inital = () => { }

    return {
        status: "close",
        inital: inital,
        show: function (Nmessage = '', Ntitle = '', Ntype = 'success', Nduration = 0) {
            messageVNode = wid.app.$createElement("p", { style: "max-height: 100px;height:auto;overflow: auto;" }, Nmessage);
            title = Ntitle;
            type = Ntype;
            this.showBox(Nduration);
        },
        showMessage: function (msgObj) {
            messageVNode = wid.app.$createElement("p", { style: "max-height: 100px;height:auto;overflow: auto;" }, msgObj.message);
            title = msgObj.title;
            type = msgObj.type ? msgObj.type : type;
            this.showBox(msgObj.duration);
        },
        setMissObj: function (missItemsObj) { },
        // 显示消息
        showBox: function (duration = 0, callback = null) {
            if (mesg) {
                this.close();
            }
            mesg = wid.app.$notify({
                // message: info,
                // type: type,
                duration: duration,
                dangerouslyUseHTMLString: true,
                type: type,
                title: title, //"填写检查结果：",
                message: messageVNode,
                showClose: true,
                onClose: () => {
                    this.status = "close";
                    console.log("!!!close!!!");
                    if (duration !== 0 && callback) {
                        callback();
                    }
                }
            });
            this.status = "show";
        },
        // 关闭消息
        close: function () {
            console.log("关闭消息框");
            if (mesg) {
                mesg.close();
                this.status = "close";
            }
        },
        getStatus: function () {
            console.log("消息框状态", this.status);
            return this.status || "close";
        }
    };
}
// window.notifyBox = notifyBox()
export default notifyBox;
