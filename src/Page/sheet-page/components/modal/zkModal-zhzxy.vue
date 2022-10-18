<template>
    <div class="zkMdodalBG" v-if="show">
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">专科模版</span>
          <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <div class="zkModal-body">
            <div v-for="(item,index) in strARR" :key="index +'qeq'">
                <div class="item-li" style="margin-top: 15px;padding-left: 20px;">
                    {{item.label?item.label+":":""}}
                    <template v-if="item.addButton">
                        <el-button class="modal-btn" @click="()=>addList(item,index)">{{item.addButton}}</el-button>
                    </template>
                </div>
                <div class="item-li">
                    <div class="item-box marginRight10" v-for="(oneitem,oneindex) in item.codeARR" :key="index +'qeq' +oneindex">
                        {{oneitem.showXiaolei?oneitem.showXiaolei + ":":""}}
                        <template v-if="!oneitem.type">
                            <span>{{oneitem.name1}}:</span>  
                            <el-select @change="select(item.label)" style="width:100px" v-model="code[oneitem.code]" placeholder="请选择">
                                <el-option
                                v-for="(optionitem,optionindex) in oneitem.option"
                                :key="optionindex + oneindex +index"
                                :label="optionitem.id"
                                :value="optionitem.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-else-if="oneitem.type==='input'">
                            <span>{{oneitem.name1?oneitem.name1+":":""}}</span>
                            <el-input @change="select(item.label)" :style="{'width':oneitem.inputWidth || '60px'}" v-model="code[oneitem.code]" placeholder=""></el-input>
                            <span>{{oneitem.name2?oneitem.name2:""}}</span>
                        </template>
                        <template v-else-if="oneitem.type==='checkbox'">
                            <el-checkbox-group style="margin-left: 30px;" @change="select(item.label)" v-model="code[oneitem.code]">
                                <el-checkbox v-for="(checkitem,checkindex) in oneitem.option" :key="checkindex+'ss'+index" :label="checkitem"></el-checkbox>
                                <el-input v-if="oneitem.otherCode" @change="select(item.label)" :style="{'width':oneitem.inputWidth || '60px'}" v-model="code[oneitem.otherCode]" placeholder=""></el-input>
                            </el-checkbox-group>
                        </template>
                    </div>
            </div>
            </div>
        </div>
        <div class="zkModal-button">
            <el-button class="modal-btn" @click="close">取消</el-button>
            <el-button
                class="modal-btn"
                type="primary"
                @click="addzModal">
            保存</el-button>
        </div>
    </div>
</template>

<script>
import {strARR,option6,option43,option44,option45,
    option46,option47,option48,option49,option50,option51} from './render/zkModal';

export default {
props: {},
data() {
    return {
        show: false,
        code:{},
        strARR,
        option6,
        option43,
        option44,
        option45,
        option46,
        option47,
        option48,
        option49,
        option50,
        option51
    };
},
created(){
    this.init([])
},
mounted(){

},
computed:{
    
},
watch:{
    
},
methods: {
    addList(item,index){
        console.log(item,index,"codeKey")
        if(item.codeKey==="pifuqingkuang"){
            // 一次都还没添加的时候
            if(!item.addNum && item.addNum!=0){
                console.log("djw-test1", item.addNum    )
                item.addNum = 0
                this.$set(item,"codeARR",[
                    {code:`${item.codeKey}buwei${item.addNum}`,type:"input",strOtherType:1,name1:"部位",huixianARR:["皮肤情况:部位"]},
                    {code:`${item.codeKey}tanxing${item.addNum}`,name1:"皮肤弹性",option:option6,huixianARR:["皮肤情况:皮肤弹性",'皮肤弹性']},
                    {code:`${item.codeKey}yanse${item.addNum}`,name1:"皮肤颜色",option:option43,huixianARR:["皮肤情况:皮肤颜色",'皮肤颜色']},
                    {code:`${item.codeKey}chuxue${item.addNum}`,name1:"皮肤出血点/斑",option:option44,huixianARR:["皮肤情况:皮肤出血点/斑",'皮肤出血点/斑']},
                    {code:`${item.codeKey}shuizhong${item.addNum}`,name1:"皮肤水肿",option:option6,huixianARR:["皮肤情况:皮肤水肿",'皮肤水肿']},
                    {code:`${item.codeKey}posun${item.addNum}`,name1:"皮肤破损",option:option6,huixianARR:["皮肤情况:皮肤破损",'皮肤破损']},
                    {code:`${item.codeKey}yachuang${item.addNum}`,name1:"皮肤压疮",option:option45,huixianARR:["皮肤情况:皮肤压疮",'皮肤压疮']},
                ])
            }else{
                item.addNum += 1
                console.log( item.addNum," item.addNum")
                this.strARR.splice(index+1,0,{str:"",addAfter:true,codeARR:[
                    {code:`${item.codeKey}buwei${item.addNum}`,type:"input",strOtherType:1,name1:"部位",huixianARR:["部位"]},
                    {code:`${item.codeKey}tanxing${item.addNum}`,name1:"皮肤弹性",option:option6,huixianARR:['皮肤弹性']},
                    {code:`${item.codeKey}yanse${item.addNum}`,name1:"皮肤颜色",option:option43,huixianARR:['皮肤颜色']},
                    {code:`${item.codeKey}chuxue${item.addNum}`,name1:"皮肤出血点/斑",option:option44,huixianARR:['皮肤出血点/斑']},
                    {code:`${item.codeKey}shuizhong${item.addNum}`,name1:"皮肤水肿",option:option6,huixianARR:['皮肤水肿']},
                    {code:`${item.codeKey}posun${item.addNum}`,name1:"皮肤破损",option:option6,huixianARR:['皮肤破损']},
                    {code:`${item.codeKey}yachuang${item.addNum}`,name1:"皮肤压疮",option:option45,huixianARR:['皮肤压疮']},
                ]})
            }
        }else if(item.codeKey==="sizhiqingkuang"){
            if(!item.addNum && item.addNum!=0){
                console.log("djw-test1", item.addNum    )
                item.addNum = 0
                this.$set(item,"codeARR",[
                    {code:`${item.codeKey}buwei${item.addNum}`,type:"input",strOtherType:1,name1:"部位",huixianARR:["四肢情况:部位"]},
                    {code:`${item.codeKey}pifu${item.addNum}`,name1:"皮温",option:option46,huixianARR:["四肢情况:皮温",'皮温']},
                    {code:`${item.codeKey}yanse${item.addNum}`,name1:"颜色",option:option47,huixianARR:["四肢情况:颜色",'颜色']},
                    {code:`${item.codeKey}zhongzhang${item.addNum}`,name1:"肿胀",option:option48,huixianARR:["四肢情况:肿胀",'肿胀']},
                    {code:`${item.codeKey}zhangjili${item.addNum}`,name1:"肌张力",option:option49,huixianARR:["四肢情况:肌张力",'肌张力']},
                    {code:`${item.codeKey}jiliji${item.addNum}`,name1:"肌力级",option:option50,huixianARR:["四肢情况:肌力级",'肌力级']},
                    {code:`${item.codeKey}yatong${item.addNum}`,name1:"压痛",option:option6,huixianARR:["四肢情况:压痛",'压痛']},
                    {code:`${item.codeKey}maoxi${item.addNum}`,name1:"毛细血管充盈时间",option:option51,huixianARR:["四肢情况:毛细血管充盈时间",'毛细血管充盈时间']},
                    {code:`${item.codeKey}dongmaibo${item.addNum}`,name1:"动脉搏动",option:option6,huixianARR:["四肢情况:动脉搏动",'动脉搏动']},
                ])
            }else{
                item.addNum += 1
                console.log( item.addNum," item.addNum")
                this.strARR.splice(index+1,0,{str:"",addAfter:true,codeARR:[
                    {code:`${item.codeKey}buwei${item.addNum}`,type:"input",strOtherType:1,name1:"部位",huixianARR:["部位"]},
                    {code:`${item.codeKey}pifu${item.addNum}`,name1:"皮温",option:option46,huixianARR:["皮温"]},
                    {code:`${item.codeKey}yanse${item.addNum}`,name1:"颜色",option:option47,huixianARR:["颜色"]},
                    {code:`${item.codeKey}zhongzhang${item.addNum}`,name1:"肿胀",option:option48,huixianARR:["肿胀",'肿胀']},
                    {code:`${item.codeKey}zhangjili${item.addNum}`,name1:"肌张力",option:option49,huixianARR:["肌张力",'肌张力']},
                    {code:`${item.codeKey}jiliji${item.addNum}`,name1:"肌力级",option:option50,huixianARR:["肌力级",'肌力级']},
                    {code:`${item.codeKey}yatong${item.addNum}`,name1:"压痛",option:option6,huixianARR:["压痛",'压痛']},
                    {code:`${item.codeKey}maoxi${item.addNum}`,name1:"毛细血管充盈时间",option:option51,huixianARR:["毛细血管充盈时间",'毛细血管充盈时间']},
                    {code:`${item.codeKey}dongmaibo${item.addNum}`,name1:"动脉搏动",option:option6,huixianARR:["动脉搏动",'动脉搏动']},
                ]})
            }
        }
    },
    init(shuxingarr){
        let obj = {},shuxingArrKeys = shuxingarr?shuxingarr.map(item=>item.key) : []
        console.log(shuxingArrKeys,"shuxingArrKeys")
        this.strARR.forEach(item=>{
            // item.str = ""
            item.codeARR && item.codeARR.forEach(item2=>{
                if(shuxingArrKeys.includes(item2.code)){
                    if(item2.type==="checkbox"){
                        let keyobj = shuxingarr.find(keyItem=>keyItem.key==item2.code)
                        obj[item2.code] = keyobj.value.split(",") 
                    }else{
                        let keyobj = shuxingarr.find(keyItem=>keyItem.key==item2.code)
                        obj[item2.code] = keyobj.value.replace(/cmH2O|mm|umol\/L/,"")
                    }
                }else{
                    obj[item2.code] = item2.type==="checkbox"? []:""
                    if(item2.otherCode) obj[item2.otherCode] = ""
                }
            })
        })
        console.log(obj,"code")
        this.code =obj
    },
    select(label){
    //     this.strARR.forEach(item=>{
    //         if(item.label===label){
    //             let str = ""
    //             item.codeARR.forEach((prev,index)=>{
    //                 // input模板字符串渲染  
    //                 if(prev.strOtherType == 1){
    //                     console.log("input在输入，正拼成字符串11",label)
    //                     if(this.code[prev.code]) str += (str===""?(label +(prev.xiaolei?prev.xiaolei:"") + (label || prev.xiaolei?":":"")):"") + prev.name1+":"+this.code[prev.code] + (prev.name2?prev.name2:"") + ";"
    //                     else str + ""
    //                 }else if(prev.strOtherType == 2){
    //                     console.log("checbox正在选择",)
    //                     // 另类模板字符串渲染2 目前只是多选框所以要判断this.code[prev.code].length>0
    //                     if(this.code[prev.code] && this.code[prev.code].length>0) str += (str===""?(label + ":"):"") + (prev.name1?prev.name1 +':':"") + this.code[prev.code].join(",") + ";"
    //                     else str + ""
    //                 }else{
    //                     console.log("正在下拉选择")
    //                     // 正常模板字符串渲染
    //                     if(this.code[prev.code]) str += (str===""?(label +(prev.xiaolei?prev.xiaolei:"")+":"):"") + prev.name1+":"+this.code[prev.code] + ";"
    //                     else str + ""
    //                 }
    //             })
    //             console.log(str,"str")
    //             item.str = str
    //         }
    //     })
    },
    select2(label){
        this.strARR.forEach(item=>{
                let str = ""
                item.str = ""
                item.codeARR && item.codeARR.forEach((prev,index)=>{
                    // input模板字符串渲染  
                    if(prev.strOtherType == 1){
                        console.log("input在输入，正拼成字符串11",prev.xiaolei)
                        if(this.code[prev.code]) str += (str===""?((item.label?item.label:"") +(prev.xiaolei?prev.xiaolei:"") + (item.label || prev.xiaolei?":":"")):"") + prev.name1+":"+this.code[prev.code] + (prev.name2?prev.name2:"") + ";"
                        else str + ""
                    }else if(prev.strOtherType == 2 && prev.otherCode){
                        console.log("checbox正在选择",prev.code,this.code[prev.code])
                        // 另类模板字符串渲染2 目前只是多选框所以要判断this.code[prev.code].length>0
                        if(this.code[prev.code] && this.code[prev.code].length>0) str += (str===""?(item.label + ":"):"") + (prev.name1?prev.name1 +':':"") + this.code[prev.code].join(",") + ":" + (this.code[prev.otherCode]?this.code[prev.otherCode]:"") +";"
                        else str + ""
                    }else if(prev.strOtherType == 2){
                        console.log("checbox正在选择",prev.code,this.code[prev.code])
                        // 另类模板字符串渲染2 目前只是多选框所以要判断this.code[prev.code].length>0
                        if(this.code[prev.code] && this.code[prev.code].length>0) str += (str===""?(item.label + ":"):"") + (prev.name1?prev.name1 +':':"") + this.code[prev.code].join(",") +";"
                        else str + ""
                    }else{
                        console.log("正在下拉选择")
                        // 正常模板字符串渲染
                        if(this.code[prev.code]) str += (str===""?((item.label?item.label:"") +(prev.xiaolei?prev.xiaolei:"")+(item.label || prev.xiaolei?":":"")):"") + prev.name1+":"+this.code[prev.code] + ";"
                        else str + ""
                    }
                })
                console.log(str,"str")
                item.str = str
                console.log()
        })
    },
    open(doc){
        console.log("doc",doc)
        let shuxingArr = [],valueArr =[],outLabel=""
        // 回显功能待完善
        // if(doc.length>0){
        //     let waiArr = doc.split(";")
        //     waiArr.forEach(item=>{
        //         let neiArr = item.split(":")
        //         console.log(neiArr,"neiArr")
        //             outLabel = neiArr[0]
        //             this.strARR.forEach(neiItem=>{
        //                 if(outLabel = neiArr[0]){
        //                     neiItem.codeARR && neiItem.codeARR.find(codeItem=>{
        //                         if(codeItem.huixianARR.includes((neiArr.length==3?neiArr[0]+":"+neiArr[1]:neiArr[0]))){
        //                             shuxingArr.push({key:codeItem.code,value:neiArr.length==3?neiArr[2]:neiArr[1]})
        //                         }
        //                     })
        //                 }
        //             })
        //     })
        // }
        console.log(shuxingArr,"shuxingArr",this.code)
        this.init(shuxingArr)
        this.show = true;
    },
    close() {   
      this.show = false;
    },
    addzModal(){
        let strAll = "",codeKeys=[]
        this.select2()
        this.strARR.map(item=>{
            if(item.type!=="checkbox" && item.str){
                strAll +=item.str
            }else if(item.type=="checkbox") strAll +=item.str
        })
        // this.code
        this.$emit("addZkmodalDoc",strAll)
    }
},
components: {}
};
</script>

<style lang='scss' scoped>
    .zkMdodalBG{
        width: 800px;
        position: fixed;
        height: 600px;
        background: #fff;
        top: 50%;
        left: 50%;
        z-index: 10001;
        transform: translate(-50%, -50%);
        .head-con {
        height: 46px;
        background: #F7FAFA;
        border-bottom: 1px solid #EAEEF1;
        padding: 0 10px 0 20px;

        .title {
            font-size: 15px;
            color: #333333;
            font-weight: bold;
        }
        .close-btn {
            font-size: 12px;
            padding: 10px 10px;
            cursor: pointer;
        }
    }
    .zkModal-body{
        overflow-y: scroll;
        height: 480px;
        padding-top: 15px;
    }
    .item-li{
        display:flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap:wrap;
        margin-bottom: 15px;
        >.item-box{
            margin-bottom: 15px;
            margin-left:30px;
            &.marginLeft30{
            }
        }
        .marginRight10{
            // margin-right: 10px;
        }
        .width150{
            width:80px;
        }
        .item-box{
            display:flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
    .zkModal-button{
        text-align: center;
        background: #f7fafa;
        border-top: 1px solid #eaeef1;
        padding-top: 10px;
        padding-bottom: 10px;
        width:100%;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
</style>