// import Vue from 'vue'
// import { Message } from 'element-ui';
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
      //谢岗需要特殊判断血压的值，存在收缩压和舒张压
      if(!['xiegang'].includes(process.env.HOSPITAL_ID)){
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
      }else{
        if(o[key].value.includes('/')){
          let press=o[key].value.split('/')
          //存在血压用/隔开，需要分别验证两个数值
            if((press[0]>=o[key].reg[0]&&press[0]<=o[key].reg[1])&&(press[1]>=60&&press[1]<=90)){
              return true

            }else{
              return false
            }
          // })
        }
      }

    }

    return false;
  }

}

export const validForm = new ValidForm();


