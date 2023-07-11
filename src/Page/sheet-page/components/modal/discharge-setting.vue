<template>
    <div class="dischargeSetting">
        <div v-for="(outChoseItem,ItemIn) in outChoseItemList" :key="ItemIn+'outChoseItem' ">
            <div class="title" flex="cross:center main:justify">{{outChoseItem.dischargeType}}固定项目：</div>
            <div class="outPro firstoutPro" :class="[weihaiZhongzheng]">
                <table v-for="(num,i) in outChoseItem.tableNum" :key="i+'table'">
                <colgroup>
                    <col :width="th.colwidth" v-for='(th,thIn) in outChoseItem.th' :key="thIn +'th'" />
                </colgroup>
                <tr>
                    <td v-for='(th,thIn) in outChoseItem.th' :key="thIn +'th'">{{th.title}}</td>
                </tr>
                <tr :key="index + 'out11'" v-for="(out,index) in computedNum(outChoseItem,i)">
                    <td v-for="(td,tdIndex) in out" :key="tdIndex +'td'">
                    <div>
                        <template v-if="td.type=='input'">
                        <input 
                            v-model="td[Object.keys(td)[0]]"
                            v-autoComplete="{
                                dataList: dictionary[Object.keys(td)[0]],
                                obj: td,
                                key: Object.keys(td)[0],
                                td:configTdList[Object.keys(td)[0]],
                            }"
                            />
                        </template>
                        <template v-else-if="td.type=='selectGou'">
                        <div class="todagou" @click="toGou(td,Object.keys(td)[0])">{{td[Object.keys(td)[0]]}}</div>
                        </template>
                        <template v-else-if="td.type=='select'">
                        <el-select v-model="td[Object.keys(td)[0]]" placeholder="请选择">
                            <el-option
                            v-for="item in td.option"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </template>
                        <template v-else>
                        {{ td[Object.keys(td)[0]] }}
                        </template>
                    </div>
                    </td>
                </tr>
                </table>
            </div>
            <div class="title" flex="cross:center main:justify">{{outChoseItem.dischargeType}}自定义项目：</div>
            <div class="outPro textareaDiv" :class="[weihaiZhongzheng]">
                <table v-for="(num,i) in 3" :key="i+'table'">
                <colgroup>
                    <col :width="th.colwidth" v-for='(th,thIn) in outChoseItem.th' :key="thIn +'th'" />
                </colgroup>
                <tr>
                    <td v-for='(th,thIn) in outChoseItem.th' :key="thIn +'th2'">{{th.title}}</td>
                </tr>
                <tr :key="index + 'out2'" v-for="(out,index) in computedNum(outChoseItem,i,'secondTable')">
                    <td v-for="(td,tdIndex) in out" :key="tdIndex +'td2'">
                    <div>
                        <template v-if="td.type=='input'">
                        <input 
                            v-model="td[Object.keys(td)[0]]"
                            v-autoComplete="{
                                dataList: dictionary[Object.keys(td)[0]],
                                obj: td,
                                key: Object.keys(td)[0],
                                td:configTdList[Object.keys(td)[0]],
                            }"
                        />
                        </template>
                        <template v-else-if="td.type=='selectGou'">
                        <div class="todagou" @click="toGou(td,Object.keys(td)[0])">{{td[Object.keys(td)[0]]}}</div>
                        </template>
                        <template v-else-if="td.type=='textarea'">
                        <textarea v-model="td[Object.keys(td)[0]]" :rows="reactiveRows(td,Object.keys(td)[0],outChoseItem.maxLength,1,3)"></textarea>
                        </template>
                        <template v-else-if="td.type=='select'">
                        <el-select v-model="td[Object.keys(td)[0]]" placeholder="请选择">
                            <el-option
                            v-for="item in td.option"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </template>
                        <template v-else>
                        {{ td[Object.keys(td)[0]] }}
                        </template>
                    </div>
                    </td>
                </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {
  onFocusToAutoComplete,
} from "@/Page/sheet-page/components/sheetTable/components/excel/tool.js";
import sheetInfo from "../config/sheetInfo";
import { decoder_record2,decoder_title } from "@/Page/sheet-page/components/modal/render/decode.js";

function autoComplete(el, bind) {
  if (bind.value.dataList) {
    let obj = bind.value.obj;
    let key = bind.value.key;
    let tr = bind.value.tr;
    let td = bind.value.td;
    const splice = td && td.splice
    el.onfocus = (e) => {
      let dataList = bind.value.dataList;
      if (el.readOnly) return;
      let scrollTop = document.querySelector(".sheetTable-contain").scrollTop;
      let scrollLeft = document.querySelector(".sheetTable-contain").scrollLeft;
      let xy = e.target.getBoundingClientRect();
      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 34}px`,
            left: `${xy.left}px`,
          },
          data: dataList,
          callback: function (data) {
            if (process.env.HOSPITAL_ID == "weixian") {
              if (td.value && td.value != data && td.childKey) {
                tr.map((item) => {
                  if (item.parentKey && item.parentKey == td.name) {
                    item.value = "";
                  }
                });
              }
            }
            if (data) {
              if (typeof obj[key] == "object") {
                // 多选
                if (splice) {
                  const split = typeof splice === 'string' ? splice : ','
                  const oldValue =  obj[key].value ? obj[key].value.split(split) : []
                  const index = oldValue.findIndex(v => v === data)
                  if (index > -1) {
                    oldValue.splice(index, 1)
                  } else {
                    oldValue.push(data.trim())
                  }
                  obj[key].value = oldValue.join()
                } else { // 单选
                  obj[key].value = data.trim();
                }
              } else {
                // 多选
                if (splice) {
                  const split = typeof splice === 'string' ? splice : ','
                  const oldValue =  obj[key] ? obj[key].split(split) : []
                  const index = oldValue.findIndex(v => v === data)
                  if (index > -1) {
                    oldValue.splice(index, 1)
                  } else {
                    oldValue.push(data.trim())
                  }
                  obj[key] = oldValue.join()
                } else { // 单选
                  obj[key] = data.trim();
                }
              }
            }
          },
          id: key,
          tr: tr,
          td: td,
        });
      });
    };
    // el.onblur = (e) => {
    //   setTimeout(() => {
    //     window.closeAutoComplete(key);
    //   }, 400);
    // };
  } else {
    el.onfocus = null;
  }
}

export default {
    name: 'dischargeSetting',
    directives: {
        autoComplete: {
            bind: autoComplete,
            update: autoComplete,
        },
    },
    props:{
        outChoseItemList:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            sheetInfo,
            customTitle: [],
            dictionary:[],
            configTdList:[]
        };
    },

    mounted() {
        
    },

    methods: {
        toGou(obj,key){
            if(obj[key]) obj[key] = ""
            else obj[key] = "√"
        },
        init(config){
            this.$nextTick(()=>{
                this.outChoseItemList.forEach(outChoseItem=>{
                    let { outProject,sheetypeCode } = outChoseItem
                    outProject.forEach(item=>{
                        item.forEach(INtem=>{!INtem.unClear && (INtem[Object.keys(INtem)[0]]="")})
                    })
                    let confighasOuppTR = config.record.filter(item=>item.find(li=> (sheetypeCode[0]===li.key && li.value)))
                    let outProjectCode = outProject[0].map(item=>Object.keys(item)[0])
                    //护记多列对固定项目多列（刚好一对一）既然多对多 注意字段最好和列表所需字段一致 特别第一列（键值列） sheetypeCode[0]
                    if(outProjectCode.length === sheetypeCode.length){
                        let confighasOutppARR = confighasOuppTR.map(tr=>{
                            let valObj = {}
                            sheetypeCode.forEach(li=>{
                                valObj[li] = tr.find(td=>td.key===li).value
                            })
                            return valObj
                        })
                        confighasOutppARR.map(out=>{
                        let result = outProject.find(item=>{
                            return item.find(item2=>{
                            return (Object.keys(item2).includes(sheetypeCode[0]) && item2[sheetypeCode[0]] === out[sheetypeCode[0]])
                            })
                        })
                        if(result){
                            Object.keys(out).map((key,index)=>{
                                let outKey = Object.keys(result[index])[0]
                                result[index][outKey] = out[key]
                            })
                        }else{
                            let noFix = outProject.find(item=>{
                                return item.find(item2=>{
                                    return (Object.keys(item2).includes(sheetypeCode[0]) && !item2[sheetypeCode[0]])
                                })
                            })
                            if(noFix){
                                Object.keys(out).map((key,index)=>{
                                    let outKey = Object.keys(noFix[index])[0]
                                    noFix[index][outKey] = out[key]
                                })
                            }
                        }
                        })
                    }else {
                        // 目前只支持护记1列对多列
                        let valArr = []
                        confighasOuppTR.map(tr=>{
                        valArr.push(tr.find(item=>sheetypeCode[0]===item.key).value)
                        })
                        valArr.map(item=>{
                        // 这里默认拿到的第一个就是列键值 然后按顺序去放列
                        let arr = item.split(" ")
                        let result  = outProject.find(out=>
                            out[0][Object.keys(out[0])] === arr[0]
                        )
                        if(result){
                            arr.map((val,index)=>{
                            let outKey = Object.keys(result[index])[0]
                            result[index][outKey] = val
                            })
                        }else{
                            let noFix = outProject.find(out=>!out[0][Object.keys(out[0])[0]])
                            if(noFix){
                            arr.map((val,index)=>{
                                let outKey = Object.keys(noFix[index])[0]
                                noFix[index][outKey] = val
                            })
                            }
                        }
                        })
                    }
                })
                this.customTitle = decoder_title(config.thead);
                let decodeData = decoder_record2(config.record, this.customTitle);
                this.dictionary = decodeData[1];
                this.configTdList = decodeData[2];
            })
        },
        post(){
            let str = ""
            if(this.outChoseItemList.find(outChoseItem=>{
                let { outProject,sheetypeCode } = outChoseItem
                let outProjectCode = outProject[0].map(item=>Object.keys(item)[0])
                let zidingList = outProject.filter(item=>item[0].defaultInput)
                if(zidingList.find(item=>{
                    if(item.every((td,tdIn)=>{
                        if(tdIn>=1){
                            if(item[0][Object.keys(item[0])[0]] && !td[outProjectCode[tdIn]]){
                                return true
                            }
                        }else return true
                    })){
                        str = "出量自定义项目有已填项目但未填值"
                        return true
                    }else if(item.find((td,tdIn)=>{
                        if(tdIn>=1){
                            if(!item[0][Object.keys(item[0])[0]] && td[outProjectCode[tdIn]]){
                                return true
                            }
                        }
                    })){
                        str = "出量自定义项目有已填但未填项目名"
                        return true
                    }
                })) return true
                else if(
                    outProject.find(item=>{
                        return item.find((td,tdIndex)=>{
                            if(tdIndex>=1){
                                // needTarget为true则为必填项 如果其他值填了但该必填项未填值则提示
                                if(td['needTarget'] && typeof(td['needTarget'])==='boolean'){
                                    if(item.find((li,liIn)=>{
                                        if(liIn>=1){
                                            return (tdIndex!=liIn && li[Object.keys(li)[0]] && li.type && !td[Object.keys(td)[0]])
                                        }
                                    })){
                                        str = "出量仍有必填项未填"
                                        return true
                                    }
                                }else if(td['needTarget'] && typeof(td['needTarget'])==="object"){
                                  // needTarget为数组且有关联字段时 如果关联字段填了但该项未填值则提示
                                    if(item.find((li,liIn)=>{
                                        return (td['needTarget'].includes(Object.keys(li)[0]) && li[Object.keys(li)[0]] && !td[Object.keys(td)[0]])
                                    })){
                                        str = "出量仍有关联项未填"
                                        return true
                                    }
                                }
                            }
                        })
                    })
                ){
                    return true
                } 
            })) return str
        },
        reactiveRows(row,key, maxLength, minRows, maxRows) {
            if (row[key]) {
                let number = row[key].replace(/[^0-9]/ig,"");
                let word = row[key].replace(/[^a-z]+/ig,"");
                let char = row[key].split('').filter(i => i == ',').join('')
                let curLength = (row[key].length - number.length - word.length - char.length) + ((number.length + word.length + char.length) / 2)
                if(Math.ceil(curLength / maxLength) > minRows) {
                if(maxRows) {
                    return (Math.ceil(curLength / maxLength) >= maxRows ? maxRows : Math.ceil(curLength / maxLength))
                } else {
                    return Math.ceil(curLength / maxLength)
                }
                } else {
                return minRows
                }
            } else {
                return minRows
            }
        },
        computedNum(outChoseItem,i,table){
            if(!outChoseItem.outProject) return
            let { outProject,tableNum } = outChoseItem
            //该护记需要这样特定排列 其他按顺序
            if(['critical2_weihai'].includes(this.sheetInfo.sheetType)){
                if(table=='secondTable'){
                if(i==0) return outProject.slice(39,40)
                else if(i==1) return outProject.slice(40,41)
                else if(i==2) return outProject.slice(41,42)
                }else{
                if(i==0) return outProject.slice(0,7)
                else if(i==1) return outProject.slice(7,15)
                else if(i==2) return outProject.slice(15,23)
                else if(i==3) return outProject.slice(23,30)
                else return outProject.slice(30,39)
                }
            }else {
                //默认排查每行数据首列不包含defaultInput即非自定义项的
                let fixList =  outProject.filter(item=>!item[0].defaultInput)
                let zidingList =  outProject.filter(item=>item[0].defaultInput)
                if(table=='secondTable'){
                return zidingList.slice(i,i+1)
                }else{
                return fixList.filter((item,index)=>(index % tableNum==i))
                }
            }
        },
    },
    computed:{
        weihaiZhongzheng(){
            if('critical2_weihai' === this.sheetInfo.sheetType) return "critical2"
            else if('extracardi_one_weihai' === this.sheetInfo.sheetType) return "oneweihai"
            else if('extracardi_three_weihai' === this.sheetInfo.sheetType) return "threeweihai"
        },
    },
    watch:{
        
    }
};
</script>

<style lang="scss" scoped>
.dischargeSetting{
    .title{
        margin: 10px 0;
    }
    .outPro{
    display: flex;
    justify-content: space-between;
        &.firstoutPro.critical2{ 
            table{
                width:18%;
                &:first-of-type{
                height:260px;
            }
            &:nth-of-type(2){
                height:300px;
            }
            &:nth-of-type(3){
                height:300px;
            }
            &:nth-of-type(4){
                height:350px;
            }
            &:nth-of-type(5){
                height:350px;
            }
            }
        }
        &.firstoutPro{ 
            &.oneweihai,&.threeweihai{
            table{
                width:32%;
                }
            }
        }
        &.textareaDiv{
            justify-content: flex-start;
            &.oneweihai,&.threeweihai{
            table{
                width:30%;
            }
            }
            table{
            width:18%;
            &:nth-of-type(n+2){
                margin-left: 35px;
            }
            tr{
                td{
                vertical-align: middle;
                }
            }
            }
        }
        table{
            border-collapse: collapse;

            tr{
            &:first-of-type{
                td{
                background:#bdc9c8;
                text-align:center;
                vertical-align: middle;
                height: 22px;
                &:first-of-type{
                    text-align:left;
                }
                }
            }
            td{
                border: 1px solid #000;
                color:#000;
                vertical-align: middle;
                .todagou{
                display: flex;
                width: 100%;
                height: 22px;
                }
                >div{
                text-align:left;
                height:100%;
                line-height: 22px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding-left: 5px;
                }
                /deep/ .el-input__inner,input{
                height: 20px;
                text-align: left;
                border:0 !important;
                }
                input{
                    outline: none;
                    width:100%;
                }
                textarea{
                width: 100%;
                flex: 1;
                resize: none;
                outline: none;
                border:0;
                }
            }
            }
        }
    }
}
</style>