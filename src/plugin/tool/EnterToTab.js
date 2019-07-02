export default function EnterToTab(eleList, startFun, endFun) {
  for (let i = 0; i < eleList.length; i++) {
    if(i == 0 && startFun) {
      startFun(eleList[0])
    }
    eleList[i].onkeydown = (e) => {
      if (e.keyCode == 13) {
        if (eleList[i + 1]) {
          eleList[i + 1].focus()
        } else if (endFun) {
          endFun()
        }
      }
    }
  }
}