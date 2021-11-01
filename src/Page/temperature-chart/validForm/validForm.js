import Vue from 'vue'
import { Message } from 'element-ui';
// 全局注册
Vue.use(Message)

class ValidForm {

  //验证表单
  valid(o) {
    for (let key in o) {
      if (!o[key].reg.test(o[key].value)) {
        //提示
        Message({
          type: 'warning', 
          message: o[key].errorMsg,
          background: '#CCCCCC',
          color: '#ffffff',
        })
        
        //验证失败
        return false;
      }
    }

    //验证通过
    return true;
  }

}

export const validForm = new ValidForm();


