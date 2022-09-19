import sheetModel from '../../../../sheet.js'
function offset(ele) {
  var top = ele.offsetTop;
  var left = ele.offsetLeft;
  while (ele.offsetParent) {
      ele = ele.offsetParent;
      if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
          top += ele.offsetTop;
          left += ele.offsetLeft;
      } else {
          top += ele.offsetTop + ele.clientTop;
          left += ele.offsetLeft + ele.clientLeft;
      }
  }
  return {
      left: left,
      top: top
  }
}

function focusElement(x, y, z) {
  try {
    document.querySelector(`[position="${x},${y},${z}"]`).focus()
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
function getCursortPosition(textDom) { 
  var cursorPos = 0; 
  if (document.selection) {   // IE Support
    textDom.focus();  
    var selectRange = document.selection.createRange();  
    selectRange.moveStart('character', -textDom.value.length);  
    cursorPos = selectRange.text.length; 
  } else if (textDom.selectionStart || textDom.selectionStart == '0') {   // Firefox support
    cursorPos = textDom.selectionStart; 
  } 
  return cursorPos;
}

function createFilter(queryString,link) {
  return (link) => {
    return (link.indexOf(queryString) >-1);
  };
}


function bindFocus(el, bind) {
  let x = bind.value.x
  let y = bind.value.y
  let z = bind.value.z
  let td = bind.value.td
  let tr = bind.value.tr
  let table = bind.value.table
  let autoComplete = bind.value.autoComplete
  let data = bind.value.autoComplete?bind.value.autoComplete.data:[]
  let event = bind.value.event
  let oninput = bind.value.oninput
  let nextTr = bind.value.nextTr
  let nextTd = nextTr && nextTr.find(item => {
    return item.key == 'description'
  })

  // console.log("-----bind.value",data)

  // 判断是否能编辑
  let isRead
  let status = tr.find(item => item.key == "status").value;
  let empNo = tr.find(item => item.key == "empNo").value;
  if (status >= 1) {
    if (empNo == JSON.parse(localStorage.user).empNo) {
      isRead = false;
    } else {
      isRead = true;
    }
  } else {
    isRead = false;
  }
  if (isRead) return;
  el.onfocus = (e) => {
    // console.log('onfocus',e,td)
    if(td.click){
      td.click(e,td)
    }
  }
  el.onkeydown = function (e) {
    if (e.keyCode == 13) {
      if (window.isShowAutoComplete()) {
        e.preventDefault();
      } else {
        if(td.key == 'description') {
          focusElement(x, y + 1, z)
        } else {
          focusElement(x + 1, y, z) || focusElement(0, y + 1, z)
        }
      }
    }
    if (e.keyCode == 39) {
      let input = e.target
      if (getCursortPosition(input) >= input.value.length) {
        focusElement(x + 1, y, z) || focusElement(0, y + 1, z)
      }
    }
    if (e.keyCode == 40) {
      if (window.isShowAutoComplete()) {
        e.preventDefault();
      } else {
        focusElement(x, y + 1, z)
      }
    }
    if (e.keyCode == 37) {
      let input = e.target
      let maxX = 700 //document.querySelector('[dataKey="description"] input').getAttribute('position').split(',')[0]
      if (getCursortPosition(input) <= 0) {
        focusElement(x - 1, y, z) || focusElement(maxX, y - 1, z)
      }
    }
    if (e.keyCode == 38) {
      if (window.isShowAutoComplete()) {
        e.preventDefault();
      } else {
        focusElement(x, y - 1, z)
      }
    }
    if (event) {
      event(e, td)
    }
  }
  if (autoComplete) {
    el.onkeyup = function (e) {
      let scrollTop = document.querySelector('.sheetTable-contain').scrollTop
      let scrollLeft = document.querySelector('.sheetTable-contain').scrollLeft
      let xy = offset(e.target)
      // console.log("-----bind.data",data)
      let queryString = e.target.value||""
      var results = queryString ? data.filter(createFilter(queryString,data)) : data;
      // console.log("=====onkeyup",e,e.target.value,results);
      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top - scrollTop - window.scrollY + 30}px`,
            left: `${xy.left - scrollLeft - window.scrollX}px`,
            width: `${e.target.offsetWidth}px`
          },
          data: results||autoComplete.data,
          callback: function(data) {
            if (data) td.value = data;
          },
          id: `${x}${y}${z}`
        });
      })
    }
    el.onfocus = (e) => {
      let scrollTop = document.querySelector('.sheetTable-contain').scrollTop
      let scrollLeft = document.querySelector('.sheetTable-contain').scrollLeft
      let xy = offset(e.target)
      // console.log("=====autoComplete",e,xy);
      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top - scrollTop - window.scrollY + 30}px`,
            left: `${xy.left - scrollLeft - window.scrollX}px`,
            width: `${e.target.offsetWidth}px`
          },
          data: autoComplete.data,
          callback: function(data) {
            if (data) td.value = data;
          },
          id: `${x}${y}${z}`
        });
      })
    }
    el.onblur = (e) => {
      setTimeout(() => {
        window.closeAutoComplete(`${x}${y}${z}`)
      }, 400)
    }
  }
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
function onFocusToAutoComplete(e, bind) {
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
        // 威县下拉选项后一个选项依赖于前一个td的选择(威县这个功能已经废除，如果使用了下拉就用不了多选)（如果想要这个功能可参考 威县-重症护理记录单II（EICU））
        // 选择出量名称的时候和上次不一样 则清除出量性质
          if ( process.env.HOSPITAL_ID == 'guizhou') {
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
export {offset, focusElement, getCursortPosition, bindFocus,leftTopBottomRight,onBlurToAutoComplete,onFocusToAutoComplete}
