
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
        <div flex="cross:center" class="group">
            <el-table
            height="200"
            v-loading="loading"
            :data="tableData"
            ref="multipleTable"
            border
            >
            <!-- <el-table-column
                type="selection"
                width="55"
                align='center'
                :selectable='selectable'
            >
            </el-table-column> -->
            <el-table-column label="" width="40">
                <template slot-scope="scope">
                    <el-radio
                        :label="scope.$index"
                        v-model="radioCurrentRow"
                        @change.native="handleSelectionChange(scope.row)"
                        style="color: #fff; padding-left: 10px; margin-right: -25px"
                    ></el-radio>
                </template>
            </el-table-column>

            <el-table-column 
                v-for="(column,index) in config"
                :key="index"
                :prop="column.pro"
                :label="column.cn"
                :align="column.align||'center'"
            >
            </el-table-column>
            </el-table>
        </div>
        <div style="height:60px"></div>
        <div class="btn-box">
            <div class="btn-group">
            <el-button @click="close">取消</el-button>
            <el-button class="modal-btn" type="primary" @click="syncDecriptionTolsbar">插入</el-button>
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
            width: 11vw;
            height: 80px;
            display: flex;
            flex-wrap: wrap;
            align-content: center;
        }
        /deep/ .el-date-editor.el-input.el-date-editor--date{
            width: 100px;
        }
    }
    @media screen and (min-width: 1368px){
        /deep/ .execute-type{
            width: 11vw;
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
import {getDoctorAdvice, saveAllWithRecordDate} from './api'
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
        radioCurrentRow: null,
        currentRow:{},
        currentCell:{},
        foodSize: {}, // 入量 ml
        callBackResult:'',
        callBackResultMl: '', // 插入入量暂存
        type:'sheet',
        month:{},
        hours:{},
        // 开始时间:默认无
        startDate:moment().format('YYYY-MM-DD'),
        // 结束时间:默认当前时间
        endDate:moment().format('YYYY-MM-DD'),
        // 表格渲染数据
        tableData: [],
        // 筛选字段数组,说是后面会改成后端维护,等着吧,value是后面入参的,label是页面展示的
        searchArr:[
                {value:'',label:'全部'},
                {value:'药品',label:'药品'}, 
                {value:'检查',label:'检查'},
                {value:'治疗',label:'治疗'},
                {value:'化验',label:'化验'},
        ],
        // 医嘱类别
        executeType:'',
        // 执行状态
        executeStatus:'1',
        
        // 执行状态数组
        executeStatusObj:{
            // 要加或修改记得找后端对
            1:'新开',
            2:'执行',
            3:'停止',

        },
        // 分组后暂存对象{'医嘱号':'同组执行单内容数组'}
        groupObj:{},
        // 是否显示加载动画
        loading:true,
        // 事件总线,主要是为了调起保存，刷新页面数据
        bus: bus(this),
        config:[
        {
          pro:'orderClass',
          cn:'类别',
          width:60
        },
        {
          pro:"orderText",
          cn:'医嘱名称',
        },
        {
          pro:'dosage',
          cn:'剂量',
          width:150
        },
        {
          pro:'dosageUnits',
          cn:'剂量单位',
          width:150
        },
        {
          pro:'administration',
          cn:'用法',
          width:150
        },
        {
          pro:'frequency',
          cn:'频度',
          width:150
        },
        {
          pro:'startDateTime',
          cn:'开始',
          width:150
        },
        {
          pro:'stopDateTime',
          cn:'结束',
          width:150
        },
        {
          pro:'orderStatus',
          cn:'状态',
        },
      ],
    };
},
methods: {
    open(tr, td, sheetModel,type, status = true) {
      this.radioCurrentRow = null
      if (status) {
        if(type=="shiftWork"){
            this.type = type
            this.currentCell = tr
        }else{
            // let date = tr && tr.find(item=>item.key==='recordDate')
            this.month = tr && tr.find(item=>item.key==='recordMonth')
            this.hours = tr && tr.find(item=>item.key==='recordHour')
            this.foodSize = tr && tr.find(item=>item.key==='foodSize')
            this.currentCell = td
        }
      }
       this.currentRow = {}
       this.callBackResult = ''
       this.callBackResultMl = ''
        this.groupObj = {}  // 初始化弹窗数据
        this.tableData = [] // 初始化弹窗数据
        // this.allData = []   // 初始化弹窗数据
        this.loading = true // 初始化弹窗数据
        let patientInfo = this.$store.state.patient.currentPatient  // 从vuex获取当前患者信息
        // 获取患者的医嘱执行单
        getDoctorAdvice({
            "patientId":patientInfo.patientId, // 患者id
            "visitId":patientInfo.visitId, // 住院次数
            "startDate":this.startDate?moment(this.startDate).format('YYYY-MM-DD'):'', // 开始时间(对时间参数进行格式化)
            "endDate":this.endDate?moment(this.endDate).format('YYYY-MM-DD'):'', // 结束时间(对时间参数进行格式化)
            "orderClass":this.executeType, // 执行单类别
            "orderStatus":this.executeStatus
        }).then(res=>{
            // let res = rexTest // 模拟出参
            this.tableData = res.data.data //有真实接口用这个
            // this.allData = res.data
            this.tableData.map((item)=>{
                // 将后端响应的状态转化为文字并存在executeStatusCn字段中
                item.orderStatus = this.executeStatusObj[item.orderStatus]
                // 通过barcode进行分组(初始化)
                this.groupObj[item.barcode] = this.groupObj[item.barcode] || []
                // 添加到各自组别中
                this.groupObj[item.barcode].push(item)
            })
            // 取消加载动画
            this.loading = false
        })
        // 打开弹框
        this.$refs.modalName.open();
    },
    handleSelectionChange(row){
      let str = ''
      let strMl = ''
      if (row.dosageUnits === 'ml') {
        strMl = `${row.dosage}`
        str = `${row.orderText};`
      } else {
        strMl = ``
        str = `${row.orderText}${row.dosage}${row.dosageUnits}`
      }
      this.callBackResult = str
      this.callBackResultMl = strMl
    },
    // 搜索
    search(){
        // 开启加载动画
        this.loading = true
        // 重新调起初始化事件
        this.open(_,_,_,_,false)
    },
    // 关闭
    close() {
        // this.currentRow = {}
        this.radioCurrentRow = null
        // this.type='sheet'
        this.loading = true
        // 关闭弹窗
        this.$refs.modalName.close();
    },
    syncDecriptionTolsbar() {
      if(!this.callBackResult){
        this.$message.warning("插入结果不能为空！")
        return 
      }
      if(this.type=='sheet'){
        this.month.value = moment(new Date()).format('MM-DD') || null
        this.hours.value = moment(new Date()).format('HH:mm') || null
        this.currentCell.value = this.callBackResult
        this.foodSize.value = this.callBackResultMl
        this.bus.$emit('ImportExamCallBack')
      }else{
        this.currentCell.background += this.callBackResult
      }
      this.close()
    },
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