import Vue from 'vue'
import { Message } from 'element-ui';
import { forEach } from 'lodash';
// 全局注册
// Vue.use(Message)

class ValidForm {

  //验证表单
  valid(o) {
    for (let key in o) {
      //呼吸会录入呼吸机R/r
      if (o[key].value>=o[key].reg[0]&&o[key].value<=o[key].reg[1]||['R','r'].includes(o[key].value)) {
    //验证通过
        return true;
      }
      if(o[key].value.includes('/')){
        let press=o[key].value.split('/')
        //存在血压用/隔开，需要分别验证两个数值
          if((press[0]>=o[key].reg[0]&&press[0]<=o[key].reg[1])&&(press[1]>=o[key].reg[0]&&press[1]<=o[key].reg[1])){
            return true
            
          }else{
            return false
          }
        // })
      }
    }

    return false;
  }

}

export const validForm = new ValidForm();


