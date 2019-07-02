/**
 * @author: weijun.lai
 * @date: 2019-06-10 16:48:57
 * @lastEditors: weijun.lai
 * @lastEditTime: 2019-06-27 17:13:19
 * @version: cr-nursing-0.1
 * @description: 反复只使用同一个消息盒子开启关闭，不而外重叠显示其他消息盒子
 */

import Vue from 'vue'

let scrollAnimation = (element, currentY, targetY) => {
    if (!element) {
        return;
    }
    // 计算需要移动的距离
    let needScrollTop = targetY - currentY;
    let _currentY = currentY;
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        try {
            // element.scrollTo(_currentY, currentY);
            element.scrollTop = _currentY;
            // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
            if (needScrollTop > 10 || needScrollTop < -10) {
                scrollAnimation(element, _currentY, targetY);
            } else {
                // element.scrollTo(_currentY, targetY);
                element.scrollTop = _currentY;
            }
        } catch (error) {
            console.log(error, element);
        }
    }, 1);
}

export const notifyBox = () => {
    var mesg = null;
    let missItems = 0;
    let totalItems = 0;
    let finishRate = ((1 - (missItems / totalItems)) * 100).toFixed(0)
    let h = window.app.$createElement;
    let missVNode = [];
    let missDiv = [];
    let missArray = [];
    let messageVNode = null;
    let title = "填写检查结果：";
    // let setMissObj = {};
    let missingObjArrayList = [];
    let removeCheckMark = null;
    let inital = () => {
        missArray.map((m, i) => {
            missVNode.push(
                window.app.$createElement(
                    "p",
                    {
                        style: "cursor:pointer;color:red;",
                        class: "miss-vnode",
                        on: {
                            click: e => {
                                let target = document.querySelector(
                                    ".sheetTable-contain"
                                );
                                let currentY = target.scrollTop;
                                console.log("miss-vnode", e, m, i, target, currentY);
                                if(missingObjArrayList){
                                    let topObj = missingObjArrayList.filter(item=>{
                                        return item.title === m
                                    })
                                    console.log('topObj',topObj)
                                    if(topObj && topObj.length>0){
                                        scrollAnimation(target, currentY,topObj[0].top)
                                    }
                                }
                            }
                        }
                    },
                    `${i + 1}.${m}`
                )
            );
        });
        //
        missDiv = window.app.$createElement("div", { style: "max-height: 100px;height:auto;overflow: auto;" }, [
            [...missVNode],
        ]);

        messageVNode = window.app.$createElement("div", {}, [
            window.app.$createElement(
                "p",
                {},
                `遗漏:${missItems}项\n\r总数:${totalItems}项\n\r完成度:${finishRate}%\n\r`
            ),
            missArray.length > 0 ? missDiv : "",
            // window.app.$createElement('el-button',{style:"margin:10px 2px 0 0;padding: 4px 10px;font-size: 12px;"},'补填斜杠'),
            // window.app.$createElement('el-button',{style:"margin:10px 2px 0 0;padding: 4px 10px;font-size: 12px;"},'默认填第1项'),
            window.app.$createElement('el-button', {
                style: "margin:10px 2px 0 0;padding: 4px 10px;font-size: 12px;",
                on: {
                    click: e => { if (removeCheckMark) { removeCheckMark(false) } }
                }
            }, '清除标记')
        ]);
    }

    return {
        status: "close",
        inital: inital,
        setMissItems: function (missItems) {
            missArray = missItems;
            inital();
        },
        showMessage: function(msgObj){
            messageVNode = window.app.$createElement("p", { style: "max-height: 100px;height:auto;overflow: auto;" }, msgObj.message);
            title = msgObj.title;
            finishRate = 100;
            this.show(msgObj.duration);
            // duration: 20000,
            //   type: "info",
            //   title: "提示：启用自动默认填写",
            //   message
        },
        setMissObj: function (missItemsObj) {
            console.log('====missItemsObj', missItemsObj)
            // missItemsObj.missingObj
            // setMissObj = missItemsObj;
            title = "填写检查结果：";
            missVNode = [];
            missDiv = [];
            missArray = [];
            messageVNode = null;
            missingObjArrayList = [];
            removeCheckMark = null;
            let keys = Object.keys(missItemsObj.missingObj)
            keys.map(k => {
                missArray = [...missArray, ...missItemsObj.missingObj[k]]
            })
            //
            removeCheckMark = missItemsObj.removeCheckMark
            missItems = missItemsObj.missItems;
            totalItems = missItemsObj.totalItems;
            missingObjArrayList = missItemsObj.missingObjArrayList;
            finishRate = ((1 - (missItems / totalItems)) * 100).toFixed(0)
            console.log('====finishRate:', missItems, totalItems, finishRate, missArray)
            this.inital();
            // this.close();
            // this.show(5000);
        },
        // 显示消息
        show: function (duration = 0, callback = null) {
            if (mesg) {
                this.close();
            }
            mesg = window.app.$notify({
                // message: info,
                // type: type,
                duration: duration,
                dangerouslyUseHTMLString: true,
                type: finishRate == 100 ? "success" : "error",
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
window.notifyBox = notifyBox()
export default notifyBox;
