/*
    createdTime:2021/10/3;
    author:玛卡巴卡;
    info:贵州特殊需求,从医嘱执行单提取入量并保存,回写到出入量记录单(贵州副页);
    careful:和其他同步不一样,要搬记得看清楚!!!
*/
<template>
    <sweet-modal ref="modalName" title="医嘱执行" class="modal-con">
        <div class="tool-scon">
            <div class="time-group">
                <div class="type-title">起始时间：</div>
                <div class="type-content-box">
                    <el-date-picker
                        v-model="startDate"
                        type="date"
                        placeholder="起始时间">
                    </el-date-picker>
                </div>
                <div class="type-title">结束时间：</div>
                <div class="type-content-box">
                    <el-date-picker
                        v-model="endDate"
                        type="date"
                        placeholder="结束时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="type-box">
                <div class="type-title execute">类别：</div>
                <div class="type-content-box execute-type">
                    <el-radio v-model="executeType" :label='item.value' v-for="item in searchArr" :key="item.value">{{item.label}}</el-radio>
                </div>
            </div>
            <div class="type-box">
                <div class="type-title execute">状态：</div>
                <div class="type-content-box execute-type">
                    <el-radio v-model="executeStatus" :label='key' v-for="(item,key) in executeStatusObj" :key="key">{{item}}</el-radio>
                </div>
            </div>
            <div class="search-box">
                <el-button @click="search" style="height:32px;" type="primary">查询</el-button>
            </div>
        </div>
        <!-- 
            tableData:表格数据源;
            tableHeight-500:表格高度屏幕适配;
            border:表格边框; 
            v-loading=loading;(loading为true时显示加载动画)
        -->
        <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="tableData"
            style="width: 80vw;"
            :height="tableHeight"
            border
            >
                <el-table-column
                    :width="55">
                    <template slot-scope="scope">
                        <el-checkbox class="checkbox" v-model="scope.row.checked" :disabled="scope.row.disabled"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                v-for="item in columnArr"
                :key='item.id'
                :property="item.property"
                align='center'
                :label="item.label"
                :width="item.width">
                <template slot-scope="scope">
                    <!-- 所有单元格统一渲染,后面改功能的时候绝对不要动这里,要改找我 -->
                    <div :style="{textAlign:item.align||'center'}">{{scope.row[item.property]}}</div>
                    <!-- 右侧分组标记 -->
                    <div class="cell-box" v-if="item.label=='医嘱名称'">
                        <div v-if="scope.row.isFirst">┓</div>
                        <div v-if="scope.row.isOrder" class="order">┃</div>
                        <div v-if="scope.row.isLast" >┛</div>
                    </div>
                </template>
                </el-table-column>
        </el-table>
        <div style="height:60px"></div>
        <div class="btn-box">
            <div class="btn-group">
            <el-button @click="close">取消</el-button>
            <el-button @click="cleanAllSelection">清空</el-button>
            <el-button @click="post" :disabled='!multipleSelection.length' type="primary">确定</el-button>
            </div>
        </div>
    </sweet-modal>
</template>
<style lang='scss' scoped>
    .modal-con{
        /deep/ * {
            font-size: 12px;
        }
    }
    .time-group,.type-box,.search-box{
        display: flex;
        align-self: center;
    }
    .tool-scon{
        padding-left:20px;
        height: 80px;
        border: 1px solid rgb(223, 236, 232);
        margin-top: 1px;
        display: flex;
    }
    .search-box{
        flex: 1;
        position: relative;
        .el-button.el-button--default{
            position: relative;
            right: 0;
        }   
    }
    .type-title,.type-content-box{
        height: 37px;
        line-height: 37px;
    }
    .type-title{
        width: 60px;
        &.execute{
            width: 40px;
        }
    }
    .type-content-box{
        height: 34px;
        background: #fff;
        padding: 0 16px;
    }
    .btn-box{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px 0;
        background-color: #fff;
        box-sizing: border-box;
        z-index: 9999;
        border-top: 1px solid rgb(223, 236, 232);
        .btn-group{
            width: 200px;
            margin: 0 auto;
        }
    }
    .cell-box{
        position: absolute;
        height: 100%;
        right: -3%;
        top: 0;
        z-index: 999;
        div{
            height: 100%;
            position: relative;
            top: 50%;
            transform: translate(0, -20%);
        }
    }
    /deep/ .el-table .cell, /deep/ .el-table th > div{
        padding: 5px;
        .checkbox{
            margin-left: 15px;
        }
    }
    .type-box{
        align-content: center;
    }
    .execute{
        height: 80px;
        line-height: 80px;
    }
    /deep/ .el-radio + .el-radio{
        margin-left:0;
    }
    .el-radio{
        margin-right:5px;
    }
    @media screen and (max-width: 1367px){
        /deep/ .execute-type{
            width: 13vw;
            height: 80px;
            display: flex;
            flex-wrap: wrap;
            align-content: center;
        }
        /deep/ .el-date-editor.el-input.el-date-editor--date{
            width: 110px;
        }
    }
    @media screen and (min-width: 1368px){
        /deep/ .execute-type{
            width: 15vw;
            height: 80px;
            display: flex;
            flex-wrap: wrap;
            align-content: center;
        }
    }
</style>
<script>
// 获取医嘱列表接口模拟出参
// import rexTest from './api/res'
import bus from "vue-happy-bus";
import {getOrdersExecuteWithPatinetId,saveAllWithRecordDate} from './api'
import moment from 'moment';
export default {
props: {
    blockId:{
        type:Number,
        value:''
    }
},
data() {
    return {
        // 开始时间:默认无
        startDate:moment().format('YYYY-MM-DD'),
        // 结束时间:默认当前时间
        endDate:moment().format('YYYY-MM-DD'),
        // 表格渲染数据
        tableData: [],
        // 筛选字段数组,说是后面会改成后端维护,等着吧,value是后面入参的,label是页面展示的
        searchArr:[
                {value:'',label:'全部'},
                {value:'静脉',label:'静脉'}, 
                {value:'注射',label:'注射'},
                {value:'口服',label:'口服'},
                {value:'其他',label:'其他'},
        ],
        // 医嘱类别
        executeType:'',
        // 执行状态
        executeStatus:'4',
        // 表格配置
        columnArr:[
            /* {
                    id:'用来做遍历的key值,不重复就行',
                    label:'每个单元格表头显示的内容',
                    property:'当前单元格property绑定的字段,和表格数据tableData中要对应,记得和后端对',
                    width:'当前列的宽度,写什么单位最终都是px'
                }
            */
            // {id:0,label:'医嘱号',property:'barcode',width:'170'}, // 分组用,分组错乱或者有疑惑可以解开
            {id:1,label:'预计执行时间',property:'executeDateTime',width:126},
            {id:2,label:'类别',property:'executeType',width:40},
            {id:3,label:'医嘱名称',property:'itemName',width:280},
            {id:4,label:'规格',property:"itemSpec",width:210},
            {id:5,label:'剂量',property:'dosage',width:50,align:'right'},
            {id:6,label:'剂量单位',property:'dosageUnits',width:80,align:'left'},
            {id:7,label:'用法',property:'administration',width:80},
            {id:8,label:'频度',property:'freqeuncy',width:80},
            {id:9,label:'开始',property:'startDateTime',width:126},
            {id:10,label:'结束',property:'endDateTime',width:126},
            {id:11,label:'状态',property:'executeStatusCn'},
        ],
        // 执行状态数组
        executeStatusObj:{
            // 要加或修改记得找后端对
            0:'未执行',
            1:'执行中',
            4:'已执行',
        },
        // 分组后暂存对象{'医嘱号':'同组执行单内容数组'}
        groupObj:{},
        // 是否显示加载动画
        loading:true,
        // 事件总线,主要是为了调起保存，刷新页面数据
        bus: bus(this),
    };
},
methods: {
    // 弹窗打开事件
    open() {
        this.groupObj = {}  // 初始化弹窗数据
        this.tableData = [] // 初始化弹窗数据
        this.allData = []   // 初始化弹窗数据
        this.loading = true // 初始化弹窗数据
        let patientInfo = this.$store.state.patient.currentPatient  // 从vuex获取当前患者信息
        // 获取患者的医嘱执行单
        getOrdersExecuteWithPatinetId({
            "patientId":patientInfo.patientId, // 患者id
            "visitId":patientInfo.visitId, // 住院次数
            "startDate":this.startDate?moment(this.startDate).format('YYYY-MM-DD'):'', // 开始时间(对时间参数进行格式化)
            "endDate":this.endDate?moment(this.endDate).format('YYYY-MM-DD'):'', // 结束时间(对时间参数进行格式化)
            "executeType":this.executeType, // 执行单类别
            "executeStatus":this.executeStatus
        }).then(res=>{
            // let res = rexTest // 模拟出参
            this.allData = res.data.data //有真实接口用这个
            // this.allData = res.data
            this.allData.map((item)=>{
                // 将后端响应的状态转化为文字并存在executeStatusCn字段中
                item.executeStatusCn = this.executeStatusObj[item.executeStatus]
                // 通过barcode进行分组(初始化)
                this.groupObj[item.barcode] = this.groupObj[item.barcode] || []
                // 添加到各自组别中
                this.groupObj[item.barcode].push(item)
            })
            // 调起分组后的处理方法，简单的说就是添加标志
            this.setGroup()
            // 取消加载动画
            this.loading = false
        })
        // 打开弹框
        this.$refs.modalName.open();
    },
    // 清空
    cleanAllSelection() {
        // 将当前选中数组的每个元素checked变为false(和tabelData数组中的元素是同地址)
        this.multipleSelection.map(item=>{
            item.checked = false
        })
    },
    // 确定
    post(){
        // 如果未选中,则不作处理
        if(!this.multipleSelection.length)return
        let list = []
        // 此处遍历为了将选中的数据处理为后端需要的入参形式
        this.multipleSelection.map(item=>{
            let element;
            this.groupObj[item.barcode].map((item,index)=>{
                if(index == 0){
                    element = JSON.parse(JSON.stringify(item))
                    element.itemName = element.itemName + element.dosage + element.dosageUnits
                    element.dosage = Number(element.dosage)||0
                }else{
                    element.itemName += `+${item.itemName}${item.dosage}${item.dosageUnits}`
                    element.dosage +=   (Number(item.dosage)||0)
                }
            })
            console.log(element);
            let {
                    itemName : food,
                    dosage : foodSize,
                    executeType : foodChannel
                } = element
            let date = element.startDateTime?element.startDateTime:element.executeDateTime
            let {recordDate,recordMonth,recordHour} = this.getRecordate(date)
            list.push({
                    recordDate,
                    recordMonth,
                    recordHour,
                    food,
                    foodSize,
                    foodChannel
                })
        })
        // console.log(this.blockId,list); // 对入参有疑问可以解开
        // 发送保存请求
        saveAllWithRecordDate({
            blockId:this.blockId,
            list
        }).then(res=>{
            // 请求成功后再调起表单的整单保存，确保页面数据刷新
            this.bus.$emit('saveSheetPage', 'noSaveSign');
            // 关闭弹窗
            this.close();
        })
    },
    // 对分组后的数组进行处理
    setGroup(){
        if(this.allData.length){
            let arr = []
            for(let key in this.groupObj){
                if(this.groupObj[key]&&this.groupObj[key].length){
                    //  item.disabled:勾选框是否禁用,
                    //  item.isFirst:是否当前组别的第一条数据,用来决定医嘱内容右侧的特殊符号
                    //  item.executeDateTime:仅第一条数据显示预计执行时间
                    this.groupObj[key].map((item,index)=>{
                        if(index==0){ // 每组第一条数据
                            item.disabled = false
                            item.isFirst = true
                        }else { // 非首条数据
                            item.disabled = true
                            item.executeDateTime = ''
                            item.isOrder = true
                            if(index==this.groupObj[key].length-1){ // 最后一条数据
                            item.isOrder = false
                            item.isLast = true
                            }
                        }
                        arr.push(item)
                    })
                    // 如果当前组别仅有一条数据,不做任何处理
                    if(this.groupObj[key].length==1){
                        this.groupObj[key][0].isFirst = false
                        this.groupObj[key][0].isOrder = false
                        this.groupObj[key][0].isLast = false
                    }
                }
            }
            // 渲染到页面上
            this.tableData = arr
        }
    },
    // 搜索
    search(){
        // 开启加载动画
        this.loading = true
        // 重新调起初始化事件
        this.open()
    },
    // 关闭
    close() {
        this.loading = true
        // 关闭弹窗
        this.$refs.modalName.close();
    },
    getRecordate(date){
        let recordDate = date;
        let recordMonth = date.substring(5,10);
        let recordHour = date.substring(11,16)
        return {recordDate,recordMonth,recordHour}
    }
},
components: {},
computed:{
    // 选中数组
    multipleSelection:{
        get(){
            return this.tableData.filter(item=>item.checked)
        }
    },
    // 当前窗口可用高度,用来实现表格高度自适应
    tableHeight(){
        let height = window.screen.availHeight
        if(height>768){
            return 500
        }else{
            return 250
        }
    }
},
created(){
    
}
};
</script>