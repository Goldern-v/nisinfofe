
// 开发接口调试工具

// 同步表单评分到HIS

import $ from 'jquery'
import axios from '@/api/axios'
import qs from 'qs'
import { apiPath } from '@/api/apiConfig'

async function syncToHis(formCode,vitalSignContant,url){
  console.log('发送请求：',formCode,vitalSignContant,url)
  return axios.post(`${apiPath}${url}`, qs.stringify({formCode,vitalSignContant}))
}

// async function syncToHis(formCode,vitalSignContant,url) {
//   let apptoken = 'App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7'

//   let params = `formCode=${formCode}&vitalSignContant=${vitalSignContant}`
//   console.log('发送请求：',formCode,vitalSignContant,params)
//   // formCode vitalSignContant
//   return (new Promise((resolve, reject) => {
//     $.post(url,params).then(res => {
//       console.log('服务器：',res)
//       resolve(res)
//     })
//   }))
// }

async function get(url,params) {
  console.log('发送请求：',url,params)
  return axios.get(`${apiPath}${url}`,qs.stringify(params))

  // return (new Promise((resolve, reject) => {
  //   $.get(url,params).then(res => {
  //     console.log('服务器：',res)
  //     resolve(res)
  //   })
  // }))
}

async function post(url,params) {
  console.log('发送请求：',url,params)
  console.log('发送请求：',url,params)
  return axios.post(`${apiPath}${url}`,qs.stringify(params))
  // return (new Promise((resolve, reject) => {
  //   $.post(url,params).then(res => {
  //     console.log('服务器：',res)
  //     resolve(res)
  //   })
  // }))
}

// function end_APIs() {
//   window.app.$notify({
//     title: '后台API调试工具',
//     dangerouslyUseHTMLString: true,
//     message: '<span style="color:red">后台API调试工具</span>',
//     duration: 0,
//   });
// }

function help(){
  console.log('\n\n\n~~~欢迎使用-宸瑞护理系统-开发接口调试工具')
  console.log('\n\n目前上线工具：')
  console.log('@ get(url,params) - get工具')
  console.log('@ post(url,params) - post工具')
  console.log('@ syncToHis(formCode,vitalSignContant) - 同步数据到His系统')
  console.log(`eg. system.tool.connect().syncToHis('form_pain_assessment','疼痛评分')`)
  console.log('\n\n研发中传说中的工具：')
  console.log('@ shaDiaoPost - 傻吊post工具')
  console.log('\n\n\n')
}

export let connect = (function(){
  help()
  return {
    get:function(url,params){
      get(url,params)
    },
    post:function(url,params){
      post(url,params)
    },
    syncToHis:function(formCode,vitalSignContant,url='form/syncToHis'){
      syncToHis(formCode,vitalSignContant,url)
    },
    help:function(){
      help()
    },
  }
})

export let show = (function(key){
  let badEvent = false
  let devTool = false
  switch (key) {
    case 'badEvent':
      localStorage['showBadEvent']='true'
      this.badEvent = true
      window.location.href='./badEvent'
      break;
    case 'devTool':
      localStorage['showDevTool']='true'
      this.devTool = true
      window.location.reload()
      break;
    default:
      break;
  }
  return {
    badEvent:this.badEvent,
    devTool:this.devTool
  }
})

export let genData = (()=>{
  window.wid.generateRawData()
})

export let getLastPackagedDate = (()=>{
  // /crNursing/webpage/dist/static/js/manifest.f62859bb14d00c32ba23.20181123T032428724Z.js

  let scripts = document.scripts
  if(scripts){
    for (const item in scripts) {
      if (scripts.hasOwnProperty(item)) {
        const src = scripts[item].src;
        if(src.indexOf('app.')>-1){
          try {
            let arr = src.split('.')
            let packagedDate = arr[arr.length-2]
            let [date,time] = packagedDate.split('T')
            let hour = time[0]+time[1]||'XX'
            hour = (parseInt(hour)+8)%24+""||'XX'
            let min = time[2]+time[3]||'XX'
            let sec = time[4]+time[5]||'XX'
            let result = `${date} ${hour}:${min}:${sec}`
            console.warn('项目打包记录时间为：',result)
            return result

          } catch (error) {
            //
          }
          
        }
      }
    }
    return ""
  }
})


export let printStorage = (()=>{
  let object = localStorage
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      try {
        const element = object[key];
        console.log(key,JSON.parse(element)||element)
      } catch (error) {
        //
      }
      
    }
  }
})

export default {connect,show,genData,getLastPackagedDate,printStorage}
