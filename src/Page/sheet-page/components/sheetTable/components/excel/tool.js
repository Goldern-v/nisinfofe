import sheetInfo from "../../../config/sheetInfo/index";

function offset(ele) {
  var top = ele.offsetTop;
  var left = ele.offsetLeft;
  var width = ele.offsetWidth
  while (ele.offsetParent) {
    ele = ele.offsetParent;
    if (window.navigator.userAgent.indexOf("MSTE 8") > -1) {
      top += ele.offsetTop;
      left += ele.offsetLeft;
    } else {
      top += ele.offsetTop + ele.clientTop;
      left += ele.offsetLeft + ele.clientLeft;
    }
  }
  return {
    left: left,
    top: top,
    width: width,
  };
}

function focusElement(x, y, z) {
  try {
    document.querySelector(`[position="${x},${y},${z}"]`).focus();
    document.querySelector(`[position="${x},${y},${z}"]`).click();// 贵州需求:键盘切换时触发点击事件
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function getCursortPosition(textDom) {
  var cursorPos = 0;
  if (document.selection) {
    // IE Support
    textDom.focus();
    var selectRange = document.selection.createRange();
    selectRange.moveStart("character", -textDom.value.length);
    cursorPos = selectRange.text.length;
  } else if (textDom.selectionStart || textDom.selectionStart == "0") {
    // Firefox support
    cursorPos = textDom.selectionStart;
  }
  return cursorPos;
}

function leftTopBottomRight(e, bind) {
  let { x, y, z, td } = bind;
  if (e.keyCode == 13) {
    if (window.isShowAutoComplete()) {
      e.preventDefault();
    } else {
      if (td.key == "description") {
        focusElement(x, y + 1, z);
      } else {
        focusElement(x + 1, y, z) || focusElement(0, y + 1, z);
        e.preventDefault();
      }
    }
  }
  if (e.keyCode == 39) {
    let input = e.target;
    if (getCursortPosition(input) >= input.value.length) {
      focusElement(x + 1, y, z) || focusElement(0, y + 1, z);
    }
  }
  if (e.keyCode == 40) {
    if (window.isShowAutoComplete()) {
      e.preventDefault();
    } else {
      focusElement(x, y + 1, z);
    }
  }
  if (e.keyCode == 37) {
    let input = e.target;
    let maxX = "";
    //字数限制，input变成textarea
    // if(document.querySelectorAll('[dataKey="description"] textarea')) {
    //   console.log(1);
    //   maxX = document
    //   .querySelectorAll('[dataKey="description"] textarea')[document
    //   .querySelectorAll('[dataKey="description"] textarea').length - 1]
    //   .getAttribute("position")
    //   .split(",")[0];

    // }else{
    //   maxX = document
    //   .querySelectorAll('[dataKey="description"] input')[document
    //   .querySelectorAll('[dataKey="description"] input').length - 1]
    //   .getAttribute("position")
    //   .split(",")[0];
    // }
    if (getCursortPosition(input) <= 0) {
      focusElement(x - 1, y, z) || focusElement(maxX, y - 1, z);
    }
  }
  if (e.keyCode == 38) {
    if (window.isShowAutoComplete()) {
      e.preventDefault();
    } else {
      focusElement(x, y - 1, z);
    }
  }
}

function onFocusToAutoComplete(e, bind, cb) {
  let { autoComplete, x, y, z, td, tr, splice } = bind;
  let scrollTop = document.querySelector(".sheetTable-contain").scrollTop;
  let scrollLeft = document.querySelector(".sheetTable-contain").scrollLeft;
  let xy = offset(e.target);
  // 判断是否能编辑
  let isRead;
  let status = tr.find(item => item.key == "status").value;
  let empNo = tr.find(item => item.key == "empNo").value;
  if (status >= 1) {
    if (
      empNo == JSON.parse(localStorage.user).empNo ||
      JSON.parse(localStorage.user).nursingStaff
    ) {
      isRead = false;
    } else if(['foshanrenyi'].includes(process.env.HOSPITAL_ID) && JSON.parse(localStorage.user).roleManageCodeList.includes('FORM0001')){
      isRead = false
    } else {
      isRead = true;
    }
  } else {
    isRead = false;
  }
  if (isRead) return;
  let autoCompleteData = autoComplete.data
  //顺德龙江颅脑外科的意识瞳孔下拉选项只保留符号
  if(process.env.HOSPITAL_ID == 'sdlj'){
    if(sheetInfo.sheetType == "craniocerebral_sdlj"){
      if(["consciousness",'reflectionLeft','reflectionRight'].includes(td.key)){
        autoCompleteData = autoComplete
      }
    }
  }
  setTimeout(() => {
    // console.log(xy.left - scrollLeft - window.scrollX,xy.left,scrollLeft,window.scrollX);
    window.openAutoComplete({
      style: {
        top: `${xy.top - scrollTop - window.scrollY + 30}px`,
        left: `${xy.left - scrollLeft - window.scrollX}px`,
        addWidth: `${xy.width}px`
      },
      data: autoCompleteData,
      callback: function (data) {
        cb && cb()
        // 威县下拉选项后一个选项依赖于前一个td的选择(威县这个功能已经废除，如果使用了下拉就用不了多选)（如果想要这个功能可参考 威县-重症护理记录单II（EICU））
        // 选择出量名称的时候和上次不一样 则清除出量性质
          if ( ['guizhou', '925'].includes(process.env.HOSPITAL_ID)) {
          tr.isChange = true
          if (td.value && td.value != data && td.childKey) {
            tr.map(item => {
              if (item.parentKey && item.parentKey == td.name) {
                item.value = '';
              }
            });
          }
          if (data) {
            td.value = data.trim()
          };
          return;
        }

        if (data) {
          let preText = ""
          if (typeof (splice) == 'string') {
            preText = td.value ? (td.value + splice) : ''
          } else {
            preText = td.value ? (td.value + ',') : ''
          }
          td.value = (splice ? preText : '') + data
        }
        ;
      },
      id: `${x}${y}${z}`,
      td,
      tr,
    });
  });
}

function onBlurToAutoComplete(e, bind) {
  let { x, y, z } = bind;
  setTimeout(() => {
    window.closeAutoComplete(`${x}${y}${z}`);
  }, 400);
}
// 红顶函数
function redTop(index) {
  let typeArr = ['icu_qz', 'intersurgerycure_qzx', 'newborn_intensive_qz'] // 特殊处理的表单type(body里可以查看表单名称对应的type)
  let hospitalArr = ['quzhou'] // 特殊处理的医院(这个要是不知道看哪里就提桶吧)
  let topArr = ['血<br/>氧<br/>饱<br/>和<br/>度'] // 特殊处理的top表头(去看对应的th)
  // 特殊处理的mid表头,会有转义字符,很恶心,记得log一下看看
  let midArr = [`\n        呕<br/>吐\n        `, `\n        SPO<sub>2</sub><br/>(%)\n        `]
  // 两个变量，代表特殊处理的字段是top还是mid
  let isTop = false, isMid = false;
  // 一张表只支持一个特殊处理，多的自己去想
  let obj = {}
  // 特殊处理的单元格下标
  let targetIndex = -1
  // 最终返回的标志
  let flag = false
  // 判断是否是特殊处理的表单及医院
  if (typeArr.includes(this.sheetInfo.sheetType) && hospitalArr.includes(this.HOSPITAL_ID)) {
    // 判断是否需要特殊处理的top单元格
    topArr.map(item => {
      this.data.titleModel.th.top.map((e, i) => {
        if (e.name == item) {
          obj = e // 是的话存起来
          isTop = true // 并且打开top标识
          targetIndex = i
        }
      })
    })
    midArr.map(item => {
      this.data.titleModel.th.mid.map((e, i) => {
        if (e.name == item) {
          obj = e
          isMid = true
          targetIndex = i
        }
      })
    })
    if (isTop) {
      let targetVal = this.data.bodyModel[index][targetIndex].value || ""
      flag = targetVal == '总结'
    }
    if (isMid) {
      let targetVal = this.data.bodyModel[index][targetIndex + 2].value || ""
      flag = targetVal == '总结'
    }
    return flag
  }
}
// 黑顶函数
function BlackTop(index) {
  let typeArr = ['icu_qz', 'intersurgerycure_qzx', 'newborn_intensive_qz'] // 特殊处理的表单type(body里可以查看表单名称对应的type)
  let hospitalArr = ['quzhou'] // 特殊处理的医院(这个要是不知道看哪里就提桶吧)
  let topArr = ['血<br/>氧<br/>饱<br/>和<br/>度'] // 特殊处理的top表头(去看对应的th)
  // 特殊处理的mid表头,会有转义字符,很恶心,记得log一下看看
  let midArr = [`\n        呕<br/>吐\n        `, `\n        SPO<sub>2</sub><br/>(%)\n        `]
  // 两个变量，代表特殊处理的字段是top还是mid
  let isTop = false, isMid = false;
  // 一张表只支持一个特殊处理，多的自己去想
  let obj = {}
  // 特殊处理的单元格下标
  let targetIndex = -1
  // 最终返回的标志
  let flag = false
  // 判断是否是特殊处理的表单及医院
  if (typeArr.includes(this.sheetInfo.sheetType) && hospitalArr.includes(this.HOSPITAL_ID)) {
    // 判断是否需要特殊处理的top单元格
    topArr.map(item => {
      this.data.titleModel.th.top.map((e, i) => {
        if (e.name == item) {
          obj = e // 是的话存起来
          isTop = true // 并且打开top标识
          targetIndex = i
        }
      })
    })
    midArr.map(item => {
      this.data.titleModel.th.mid.map((e, i) => {
        if (e.name == item) {
          obj = e
          isMid = true
          targetIndex = i
        }
      })
    })
    if (isTop) {
      let targetVal = this.data.bodyModel[index][targetIndex].value || ""
      flag = targetVal == '小结'
    }
    if (isMid) {
      console.log(targetIndex);
      let targetVal = this.data.bodyModel[index][targetIndex + 2].value || ""
      flag = targetVal == '小结'
    }
    return flag
  }
}
export {
  offset,
  focusElement,
  getCursortPosition,
  leftTopBottomRight,
  onFocusToAutoComplete,
  onBlurToAutoComplete,
  redTop,
  BlackTop
};
