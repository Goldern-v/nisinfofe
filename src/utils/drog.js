/*
*  使用方法
*  将以下代码复制到一个drag.js文件中，然后在入口文件main.js中导入：import ‘./util/drog.js’；
*  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。
*  给dialog设置 :close-on-click-modal="false" , 禁止点击遮罩层关闭弹出层
*  如果是form表单，不要将提交等按钮放置el-form-item，以免在上下拉伸时被隐藏
*/
// v-dialogDrag: 弹窗拖拽+水平方向伸缩

export default {
    bind(el, binding, vnode, oldVnode) {
      // 弹框可拉伸最小宽高
      const minWidth = 400
      const minHeight = 300
      // 获取弹框头部（这部分可双击全屏）
      const dialogHeaderEl = el.querySelector('.sweet-title')
      // 弹窗
      const dragDom = el.querySelector('.sweet-modal')
      // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
      dragDom.style.overflow = 'auto'
      // 清除选择头部文字效果
      dragDom.onmousemove = function(e) {
        console.dir(dragDom)
        // let moveE = e
        if (
          e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 ||
          dragDom.offsetLeft + 10 > e.clientX
        ) {
          dragDom.style.cursor = 'w-resize'
        } else if (
          el.scrollTop + e.clientY >
          dragDom.offsetTop + dragDom.clientHeight - 10
        ) {
          dragDom.style.cursor = 's-resize'
        } else {
          dragDom.style.cursor = 'default'

          dragDom.onmousedown = null
        }
        dragDom.onmousedown = e => {
          const clientX = e.clientX
          const clientY = e.clientY
          const elW = dragDom.clientWidth
          const elH = dragDom.clientHeight
          const EloffsetLeft = dragDom.offsetLeft
          const EloffsetTop = dragDom.offsetTop
          dragDom.style.userSelect = 'none'
          const ELscrollTop = el.scrollTop
          // 判断点击的位置是不是为头部
          if (
            clientX > EloffsetLeft &&
            clientX < EloffsetLeft + elW &&
            clientY > EloffsetTop &&
            clientY < EloffsetTop + 100
          ) {
            // 如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown;
          } else {
            document.onmousemove = function(e) {
              // 移动时禁用默认事件
              e.preventDefault()
              console.log(clientX > EloffsetLeft && clientX < EloffsetLeft + 10 ,EloffsetLeft, clientX,);
              // 左侧鼠标拖拽位置
              if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
                // 往左拖拽
                if (clientX > e.clientX) {
                  dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px'
                  dragDom.style.minWidth = elW + (clientX - e.clientX) * 2 + 'px'
                }
                // 往右拖拽
                if (clientX < e.clientX) {
                  if (dragDom.clientWidth < minWidth) {
                    console.log()
                  } else {
                    dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                    dragDom.style.minWidth = elW - (clientX - e.clientX) * 2 + 'px'
                  }
                }
              }
              // 右侧鼠标拖拽位置

              if (
                clientX > EloffsetLeft + elW - 10 &&
                clientX < EloffsetLeft + elW
              ) {
                // 往左拖拽
                if (clientX > e.clientX) {
                  if (dragDom.clientWidth < minWidth) {
                    console.log()
                  } else {
                    dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                    dragDom.style.minWidth = elW - (clientX - e.clientX) * 2 + 'px'
                  }
                }
                // 往右拖拽
                if (clientX < e.clientX) {
                  dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px'
                  dragDom.style.minWidth = elW + (clientX - e.clientX) * 2 + 'px'
                }
              }
              // 底部鼠标拖拽位置
              if (
                ELscrollTop + clientY > EloffsetTop + elH - 20 &&
                ELscrollTop + clientY < EloffsetTop + elH
              ) {
                // 往上拖拽
                if (clientY > e.clientY) {
                  if (dragDom.clientHeight < minHeight) {
                    console.log()
                  } else {
                    dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px'
                  }
                }
                // 往下拖拽
                if (clientY < e.clientY) {
                  dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px'
                }
              }
            }
            // 拉伸结束
            document.onmouseup = function(e) {
              document.onmousemove = null

              document.onmouseup = null
            }
          }
        }
      }
    }
}
