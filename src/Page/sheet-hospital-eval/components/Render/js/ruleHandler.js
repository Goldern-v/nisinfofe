
// 私有变量
let _model = null
let _obj = null
let _agelevel = null
let _value = null
let _repeat = null
let _refs = null
let _result = null



/*** 公共函数 ****/

// 设置元素显示值
export function setElementValue(key, value) {
    Object.keys(_refs[key]).map(elkey => {
        _refs[key][elkey].setCurrentValue(value);
    })
}

export function setElementStyle(key, value) {
  Object.keys(_refs[key]).map(elkey => {
      Object.keys(_refs[key][elkey].$refs).map(ikey => {
        _refs[key][elkey].$refs[ikey].style = value;
      })
  })
}

// 获取元素显示值
export function getElementValue(key) {
    let result = ""
    Object.keys(_refs[key]).map(elkey => {
        result = _refs[key][elkey].currentValue;
    })
    return result
}

// 执行规则
export function runValueRule(key,value,repeat=true){
    let textResult = ""
    _repeat = repeat
    Object.keys(_refs[key]).map(elkey=>{
      textResult = _refs[key][elkey].checkValueRule(value,repeat);
    })
    return textResult
}

// 计算BMI
export function evalBMI(r) {
    // 计算BMI
    if (r.name === "计算BMI") {
        console.log('检查事件规则:计算BMI',r)
        if (
            _refs[r.height] &&
            _refs[r.weight] &&
            _refs[r.result]
        ) {
            let height =
                ~~getElementValue(r.height) ||
                _model[r.height] ||
                0;
            let weight =
                ~~getElementValue(r.weight) ||
                _model[r.weight] ||
                0;
            let result = weight / Math.pow(height / 100, 2).toFixed(2);
            result = isNaN(Number(result)) || !isFinite(result) ? 0 : result;
            //
            setElementValue(r.result, result ? result.toFixed(2) : "")
            //
            _model[r.result] = result ? result.toFixed(2) : "";
            //
              // if(_repeat==null){
              //   runValueRule(r.result,result ? result.toFixed(2) : "",false)
              // }
        }
    }
}

// 输入字符自动转换
// source target string replace
export function evalString(r) {
    if (r.name === "输入字符自动转换") {
        console.log('检查事件规则:输入字符自动转换',r)
        if (
          _refs[r.source] &&
          _refs[r.target] &&
          r.string && _value && _value.toUpperCase().includes(r.string.toUpperCase())
        ) {
          let regexp = new RegExp(r.string,'g')
          let ret = r.string.replace(regexp,(r.replacement||''))||""
          //
          console.log('输入字符自动转换',r,r.source,r.target,r.string,r.replacement,[ret],getElementValue(r.target))
          //
          window.app.$nextTick(()=>{
            _model[r.target] = ret
            setElementValue(r.target,ret)
            if(_repeat==null){
              getValueRule(r.target,ret ? ret : "",false)
              updateAlertBox(ret,true,r)
            }
          })
          //
        }
    }
}

// 更新右侧评估预警栏内容
export function updateAlertBox(value,alertActived,rule){
    //
    if(!_refs.tableOfContent){return}
    console.log('更新右侧评估预警栏内容',[value,alertActived,rule])
      let alertMessageItems = [..._refs.tableOfContent.getAlertMessageItems()]
        // 未有预警
        if(alertActived){
          let hasAlertMessage = false
          let title = (_obj.title||_obj.label||"")
          let frequency = rule.frequency||''
          //
          let tips = `<span><span style="color:green">${title}</span>:${value||""}<span style="color:chocolate">${_obj.suffixDesc||""}</span></span><br><span style="color:red">预警:${rule.message}</span>`
          //
          console.log('rule',rule)
          //
          if(frequency){
            tips+=`<br><span style="color:black">评估频率:${frequency}</span>`
          }
          //
          for (let iterator of alertMessageItems) {
            if(iterator.name && iterator.name == _obj.name){
              iterator.message = rule.message
              iterator["value"] = value
              iterator["tips"] = tips
              iterator["frequency"] = frequency
              hasAlertMessage = true
              break;
            }
          }
          if(hasAlertMessage==false){
            alertMessageItems = [
              ...alertMessageItems,
              {
                message:rule.message,
                name:_obj.name,
                title:title,
                obj:_obj,
                value:value,
                tips: tips
              }
            ]
          }
          _refs.tableOfContent.updateAlertMessageItems(alertMessageItems)

        }else{
          alertMessageItems = alertMessageItems.filter(item=>{
            return item.name && item.name != _obj.name
          })
          _refs.tableOfContent.updateAlertMessageItems(alertMessageItems)
        }
}

// 数值范围事件
export function evalRange(r){
  let [min, max] = [Number(r.min), Number(r.max)];
  let value = Number(_value?_value.replace(/[^0-9.]/g,''):'');
  min = isNaN(min) ? 0 : min;
  max = isNaN(max) ? 0 : max;
  value = value === NaN ? -1 : value;

  if(!_value){
    console.log('[空]检查事件规则',[_value, r, value])
    setElementStyle(_obj.name, "")
    return
  }

  if (r.min && r.max && (value >= min && value <= max)
  && ((r.agelevel
      && (r.agelevel.constructor == String && r.agelevel == _agelevel
          || r.agelevel.constructor == Array && r.agelevel.indexOf(_agelevel)>-1
      )
      )||!r.agelevel)
  && ((r.equal && r.constructor == Object && _model[r.equal.key]==r.equal.value)||!r.equal)
  ){

    console.log('检查事件规则:数值范围事件',r,[min, max,value])

    _obj.style = r.style;
    if (r.message) {
      console.log("rule:message", r.message,[r.min,r.max,value],[min,max,value]);
      // r.message = r.message + "";
      // alertActived = true;
      // rule = {...r};
      // return;
      updateAlertBox(_value,true,r)
    }
    // 替换显示 r.display
    if (
      r.display &&
      _refs[_obj.name] &&
      _refs[_obj.name].hasOwnProperty("type") &&
      _refs[_obj.name].type === "text"
    ) {
      _refs[_obj.name].setCurrentValue(r.display);
      setElementValue(_obj.name,r.display)
    }
    try {
      // _refs[_obj.name].$refs.input.style = r.style;
      setElementStyle(_obj.name, r.style)
    } catch (error) {
      console.log('error',error,_refs,_refs[_obj.name])
    }
    _result = r.display ? r.display : "";

  }
}

// 检查事件规则
export function checkRule({ rule, value, obj, formObj,repeat } = {}) {

    console.log('检查事件规则',arguments)

    if(!rule){return}

    // initial values
    _model = formObj?formObj.model:_model
    _obj = obj?obj:_obj
    _value = value+""
    _repeat = repeat?repeat:_repeat
    _agelevel = window.app.$store.getters.getAgeLevel()
    _refs = window.app.$root.$refs

    _result = ""

    // 遍历规则
    rule.map(r => {
        // 计算BMI
        evalBMI(r)
        // 输入字符自动转换
        evalString(r)
        // 数值范围事件
        evalRange(r)
    })

    return _result
}

export default {
    checkRule
}


