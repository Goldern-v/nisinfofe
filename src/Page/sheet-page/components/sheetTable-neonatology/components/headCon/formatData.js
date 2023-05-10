// import { dataShop } from "./commom";
import { 新生儿, 头部表格, 尾部表格 } from "./新生儿";

// 记录表头
export let recordsHead = [
  // {label:"项目/时间",type:"Image",width:"45px"},
  { label: "日期", type: "String", width: "5%" },
  { label: "时间", type: "String", width: "5%" },
  { label: "面色", type: "String", width: "5%" },
  { label: "吸吮", type: "String", width: "5%" },
  { label: "呕吐", type: "String", width: "5%" },
  { label: "脐部", type: "String", width: "5%" },
  { label: "大便次数/性状", type: "String", width: "8%" },
  { label: "小便次数", type: "String", width: "5%" },
  { label: "体重Kg", type: "String", width: "5%" },
  { label: "", type: "String", width: "5%" },
  { label: "特殊情况记录", type: "String", width: "200px" },
  { label: "护士签名", type: "String", width: "50px" }
  // {label:"时间",type:"String",width:"250px"},
  // {label:"T (℃)",type:"String",width:"5%"},
  // {label:"P (次/分)",type:"String",width:"5%"},
  // {label:"R (次/分)",type:"String",width:"5%"},
  // {label:"Bp (mmHg )",type:"String",width:"5%"},
  // {label:"滴速(滴/分)/或快速",type:"String",width:"5%"},
  // {label:"生理盐水冲管",type:"String",width:"5%"},
  // {label:"床旁核对/执行签名",type:"String",width:"10%"},
];

/**
 *
日期
时间",type:"String",width:"5%"},
  {label:"面色",type:"String",width:"5%"},
  {label:"吸吮",type:"String",width:"5%"},
  {label:"呕吐",type:"String",width:"5%"},
  {label:"脐部",type:"String",width:"5%"},
  {label:"大便次数/性状",type:"String",width:"5%"},
  {label:"小便次数",type:"String",width:"5%"},
  {label:"体重Kg",type:"String",width:"5%"},
  {label:"特殊情况记录",type:"String",width:"5%"},
  {label:"护士",type:"String",width:"5%"},
  {label:"签名",type:"String",width:"5%"},
  {label:"
 *  */

/**
 * td1 第一行
 * td2 第二行
 * restTd 剩余td
 */
export let recordslist = [];
export let recordslist2 = []; // 续页

let pageNum = 12;
// for (let i = 0; i < pageNum; i++) {
//   recordslist.push(dataShop.getModel());
// }

// 续页
pageNum = 10;
// for (let i = 0; i < pageNum; i++) {
//   recordslist2.push(dataShop.getModel());
// }

/**
 *  前提UI界面显示，多个表格元素数据结构
 * */
export let tables = {
  头部表格: 头部表格
};

/**
 *  前后台交互数据包
 * */
// export let formData = {};

export let data = (function() {
  let ret = {};
  let formData = {};
  let postData = {};
  let signPostData = {};
  return {
    formData: formData,
    signPostData: signPostData,
    initData: function() {
      ret = {};
      formData = {};
      postData = {};
      signPostData = {};
    },
    cleanData() {
      for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (formData[key] instanceof Array) {
            formData[key] = [];
          } else {
            formData[key] = "";
          }
        }
        this.initFormData(tables, formData);
      }
    },
    setFormData: function(name, value) {
      formData[name] = value;
    },
    getFormData: function() {
      return formData;
    },
    // 包装formData 成 key,value ，存字符串类型，用于上传
    getDataToPost: function(format = "none", space = 0) {
      postData = {};
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          const item = formData[key];
          postData[key] = item.toString();
        }
      }
      switch (format) {
        case "json":
          return JSON.stringify(postData, null, space);
        default:
          break;
      }
      return postData;
    },
    getDataFromServer: function(resData, format = "string") {
      let res = JSON.parse(resData);
      if (res) {
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            let item = res[key];
            // console.log('--',key,item,formData[key].constructor)
            // if(formData[key] && item){
            if (formData[key] && formData[key].constructor === Array) {
              formData[key] = item.split(",");
            } else {
              formData[key] = item.toString();
            }
            // }
          }
        }
      }
      // console.log('JSON格式',res,formData)
      return formData;
    },
    // 初始化表单数据，递归循环历遍 上面表格UI数据模型，提取 name 中关键 字段，打包入formData
    initFormData: function(source, dm = formData) {
      if (source.constructor === Object) {
        for (const key in source) {
          if (source.hasOwnProperty(key)) {
            const item = source[key];
            if (key === "name") {
              // console.log(key,item,source.label,source.type,item.constructor)
              if (Object.keys(formData).indexOf(item) === -1) {
                if (source.type && source.type === "checkbox") {
                  formData[item] = [];
                  dm[item] = [];
                } else {
                  formData[item] = source["value"] || "";
                  dm[item] = source["value"] || "";
                }
              }
            }
            if (item.constructor === Object || item.constructor === Array) {
              this.initFormData(item, dm);
            }
          }
        }
      }
      if (source.constructor === Array) {
        source.map(item => {
          if (item.constructor === Object || item.constructor === Array) {
            this.initFormData(item, dm);
          }
        });
      }
      return dm;
    },
    initEveryFormData(formData){
      this.formData = formData
    },
  };
})();

// window.data = data;
data.initFormData(tables, {});
// console.log("循环处理", data.initFormData(tables, {}));
// console.log("前后台交互数据包", tables, data.getFormData(), formData);
export default {
  tables,
  // recordsHead,
  // recordslist,
  // recordslist2,
  // formData,
  data
};
