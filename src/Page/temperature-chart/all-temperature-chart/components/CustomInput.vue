<template>
  <input
    type="text"
    :class="className"
    @keyup="handleKeyUp"
    @keydown="handleKeyDown"
    @click="toRow"
    :value="value"
     v-on:input="validFormFc"

  />
</template>

<style lang='scss' scoped>
.all-temperature-chart-input {
  width: 100%;
  padding: 2px 5px;
  margin: 0;
  line-height: 20px;
  border: 1px solid #ccc;
  border-color: #ccc;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
  font-size: 14px;
  &:focus {
    border-color: #4bb08d;
    background-color: #9adcc5;
  }
}

</style>

<script>
import { validForm } from "../../validForm/validForm";

export default {
  model: {
    props: "value",
    event: "change",
  },
  props: ["value", "colClass"],
  computed: {
    className() {
      return ["all-temperature-chart-input", this.colClass].join(" ");
    },
  },
  data() {
    return {
      handleKeyCode: [37, 38, 39, 40],
    };
  },
  methods: {
    handleKeyDown(e) {
      if (this.handleKeyCode.includes(e.keyCode)) {
        if (e.keyCode === 37) {
          //处理左按键
          if (e.target.selectionStart === 0) {
            // 如果光标在开头，跳转前一个输入框
            let inputEls = document.getElementsByClassName(
              "all-temperature-chart-input"
            );
            let currentIdx = 0;
            for (var i = 0; i < inputEls.length; ++i) {
              if (e.target === inputEls[i]) currentIdx = i;
            }
            let prevIdx = currentIdx - 1;
            inputEls[prevIdx] && inputEls[prevIdx].focus();
          }
        } else if (e.keyCode === 39) {
          //处理右按键
          if (e.target.selectionEnd === e.target.value.length) {
            // 如果光标在末尾，跳转后一个输入框
            let inputEls = document.getElementsByClassName(
              "all-temperature-chart-input"
            );
            let currentIdx = 0;
            for (var i = 0; i < inputEls.length; ++i) {
              if (e.target === inputEls[i]) currentIdx = i;
            }
            let nextIdx = currentIdx + 1;
            inputEls[nextIdx] && inputEls[nextIdx].focus();
          }
        } else {
          //处理上下按键，跳转相同类名的输入框
          let inputEls = document.getElementsByClassName(this.colClass);
          let currentIdx = 0;

          for (var i = 0; i < inputEls.length; ++i) {
            if (e.target === inputEls[i]) currentIdx = i;
          }

          if (e.keyCode === 38) {
            currentIdx--;
          } else {
            currentIdx++;
          }

          inputEls[currentIdx] && inputEls[currentIdx].focus();
        }
      }
    },
    toRow(e){
 let rowIndex=e.path[3].rowIndex
var trs = e.path[4].getElementsByTagName('tr');  
for(let i=0;i<trs.length;i++){
  if(rowIndex===i){
    trs[i].style.backgroundColor='green'
  }else{
    trs[i].style.backgroundColor=''
  }
}
    },
    handleKeyUp(e) {
      let rowIndex=e.path[3].rowIndex
var trs = e.path[4].getElementsByTagName('tr');  
for(let i=0;i<trs.length;i++){
  if(rowIndex===i){
    trs[i].style.backgroundColor='green'
  }else{
    trs[i].style.backgroundColor=''
  }
}
      if (!this.handleKeyCode.includes(e.keyCode)) {
        this.$emit("change", e.target.value);
      }
    },
    setValid(trage,val){
switch (trage) {
  
  case 'temperature':
    let o={
      '体温':{
        value:val,
        reg: [30,50],
        errorMsg:'体温请填入30~50之间的数值'
      }
        }
    return o
  case 'heartRate':
    let h={
      '心率':{
        value:val,
        reg: [0,300],
        errorMsg:'体温请填入0~300之间的数值'
      }
        }
    return h
  case 'bloodPressure':
    let x={
      '血压':{
        value:val,
        reg: [0,300] ,
        errorMsg:'体温请填入0~300之间的数值'
      }
        }
    return x
  case 'pulse':
    let y={
      '脉搏':{
        value:val,
        reg: [0,300],
        errorMsg:'体温请填入0~300之间的数值'
      }
        }
    return y
  case 'breath':
    let g={
      '呼吸':{
        value:val,
        reg: [0,120],
        errorMsg:'体温请填入0~120之间的数值或者R/r'
      }
        }
    return g
  default:
    break;
}
    },
    //validForm验证表单
    validFormFc(e){
      if(['liaocheng'].includes(this.HOSPITAL_ID)){
let checkItem=e.path[0].classList[1];
      let val=e.target.value
      let checksStr=['breath','pulse','bloodPressure','heartRate','temperature']
var trs = e.path[3];
      if(checksStr.includes(checkItem)&&val!==''){
  if (validForm.valid(this.setValid(checkItem,val))) {
    // console.log(trs.getElementsByClassName(checkItem)[0].style)
trs.getElementsByClassName(checkItem)[0].style.border=''
  }else{
trs.getElementsByClassName(checkItem)[0].style.border='thick solid red'


  }
      }else{
trs.getElementsByClassName(checkItem)[0].style.border=''


      }
      }
      


      
    //     let val=vitalSignObj.vitalValue
    //   if(vitalSignObj.popVisible===true&&val!==""&&['体温','脉搏','心率','呼吸','血压'].includes(vitalSignObj.vitalSigns)){
    //  //验证表单
    //   if (validForm.valid(this.setValid(vitalSignObj.vitalSigns,val))) {
    //     document.getElementById(index).style.border=""
    //   vitalSignObj.isCorrect=true
    //   }else{
    //     document.getElementById(index).style.border="thick solid red"
    //     vitalSignObj.isCorrect=false
    //     // this.$message({
    //     //   message: this.setValid(vitalSignObj.vitalSigns)[vitalSignObj.vitalSigns].errorMsg,
    //     //   type: 'warning'
    //     // });
        
    //   }
    //   }else{
    //      document.getElementById(index).style.border=""
    //      vitalSignObj.isCorrect=true
    //   }
},
  },
  components: {},
};
</script>
