function nextFocus(list, index) {
  if(list[index + 1]) {
    if(list[index + 1] && (list[index + 1].disabled || list[index + 1].readOnly)) {
      nextFocus(list, index + 1)
    } else {
      list[index + 1].focus()
    }
  }
}
function provFocus(list, index) {
  if(list[index - 1]) {
    if(list[index - 1] && (list[index - 1].disabled || list[index - 1].readOnly)) {
      provFocus(list, index - 1)
    } else {
      list[index - 1].focus()
    }
  }
}

export default function FormToTab(eleList, startFun, endFun) {
  for (let i = 0; i < eleList.length; i++) {
    if(i == 0 && startFun) {
      // if(eleList[0].readOnly) {
      //   startFun(eleList[1])
      // } else {
      //   startFun(eleList[0])
      // }
    }
    eleList[i].onkeydown = (e) => {
      // switch(e.target.type) {}
      if(e.keyCode == 37 || e.keyCode == 38 ) {
        provFocus(eleList, i)
        e.preventDefault();
      } 
      if(e.keyCode == 39 || e.keyCode == 40 ) {
        nextFocus(eleList, i)
        e.preventDefault();
      }
      if(e.keyCode == 13 ) {
        if(e.target.type == "text" ) {
          e.target.select() 
        } else {
          e.target.click()
        }
      }
    }
  }
}

export function FormToEnter(eleList, startFun, endFun) {
  for (let i = 0; i < eleList.length; i++) {
  
    eleList[i].onkeydown = (e) => {
      if(e.keyCode == 13  ) {
        if(!window.isShowAutoComplete()) nextFocus(eleList, i)
        e.preventDefault();
      }
    }
  }
}