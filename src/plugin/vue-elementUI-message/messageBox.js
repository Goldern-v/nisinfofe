/**
 * @author: weijun.lai
 * @date: 2019-06-10 16:48:57
 * @lastEditors: weijun.lai
 * @lastEditTime: 2019-07-19 14:46:05
 * @version: cr-nursing-0.1
 * @description: 反复只使用同一个消息盒子开启关闭，不而外重叠显示其他消息盒子
 */

const wid = window //parent.window || window

export const messageBox = () => {
    var mesg = null;
    return {
        status: "close",
        // 显示消息
        show: function (info, type = "info", duration = 0, callback = null) {
            if (mesg) {
                this.close();
            }
            mesg = wid.app.$message({
                message: info,
                type: type,
                duration: duration,
                showClose: true,
                onClose: () => {
                    this.status = "close";
                    // console.log("!!!close!!!");
                    if (duration !== 0 && callback) {
                        callback();
                    }
                }
            });
            this.status = "show";
        },
        // 关闭消息
        close: function () {
            // console.log("关闭消息框");
            if (mesg) {
                mesg.close();
                this.status = "close";
            }
        },
        getStatus: function () {
            // console.log("消息框状态", this.status);
            return this.status || "close";
        }
    };
}
// window.messageBox = messageBox()
export default messageBox;
