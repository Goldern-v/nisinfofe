export let messageBox = () => {
    var mesg = null;
    return {
        status: "close",
        // 显示消息
        show: function (info, type = "info", duration = 0, callback = null) {
            if (mesg) {
                this.close();
            }
            mesg = parent.window.app.$message({
                message: info,
                type: type,
                duration: duration,
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

export default messageBox;