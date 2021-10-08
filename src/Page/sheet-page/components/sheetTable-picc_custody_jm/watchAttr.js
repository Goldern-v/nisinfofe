/*
  createTime: 
    ### 2021/9/9
  author:     
    ### z
  info:       
    ### 用于复杂表单的监听属性重复声明
  params:
    ### this_:指针缓存
    ### changeThis:改变指针指向的方法
    ### key:存放自定义属性对应字段，需要的自定义变量在这里声明
    ### watchArr:存放监听属性
*/
let this_ = null
function changeThis(t){
  this_ = t
}

let key = ["byg","mz",'tz','wg','wcjy','bcg','cvc','picc','xtg','wzlzz','dmzg','dng','bsxqylg','qita','wh','sx','sy','pz','tc','zs','whx','wh1','sx1','sy1','pz1','tc1','zs1','whx1','ghfl','st','syjt','lh','bl','fs','zd','fww','qzpw','chbw','psbw']

let watchArr ={}

// 根据自定义字段数组生成对应的监听属性
key.map(item=>{
  watchArr['checked'+item] = {
    get:()=>{
      return this_.sheetInfo.relObj[item] === 'true'  
    },
    set:(nVal)=>{
      this_.sheetInfo.relObj[item] = nVal ? "true" : "false"
    } 
  }
})
export default watchArr

export {changeThis}