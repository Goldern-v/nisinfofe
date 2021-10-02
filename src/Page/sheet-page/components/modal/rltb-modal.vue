<template>
    <sweet-modal ref="modalName" title="医嘱" class="modal-con">
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
                <div class="type-title">入药方式：</div>
                <div class="type-content-box">
                    <el-radio v-model="executeType" :label='item.value' v-for="item in searchArr" :key="item.value">{{item.label}}</el-radio>
                </div>
            </div>
            <div class="search-box">
                <el-button @click="search" style="height:32px;">查询</el-button>
            </div>
        </div>
        <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="tableData"
            style="width: 100%;"
            height="500"
            border
            >
                <el-table-column
                    width="55">
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
                    <div :style="{textAlign:item.align||'center'}">{{scope.row[item.property]}}</div>
                    <div class="cell-box" v-if="item.label=='医嘱名称'">
                        <div v-if="scope.row.isFirst">┓</div>
                        <div v-if="scope.row.isOrder" class="order">┃</div>
                        <div v-if="scope.row.isLast" >┛</div>
                    </div>
                </template>
                </el-table-column>
                <!-- <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="执行时间状态"
                width="150">
                <template slot-scope="scope">{{ scope.row.executeDateTime }}</template>
                </el-table-column>
                <el-table-column
                property="executeType"
                label="类型"
                width="120">
                </el-table-column>
                <el-table-column
                property="address"
                label="医嘱名称"
                show-overflow-tooltip>
                </el-table-column> -->
        </el-table>
        <div style="height:60px"></div>
        <div class="btn-box">
            <div class="btn-group">
            <el-button @click="cleanAllSelection">清空</el-button>
            <el-button @click="post" :disabled='!multipleSelection.length'>确定</el-button>
            </div>
        </div>
    </sweet-modal>
</template>
<style lang='scss' scoped>
    .modal-con{
        // padding-bottom: 60px;
    }
    /deep/ .sweet-content{
        overflow: hidden;
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
        .el-button.el-button--default{
            margin: 0 auto;
        }
    }
    .type-title,.type-content-box{
        height: 37px;
        line-height: 37px;
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
            width: 140px;
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
        .checkedbox{
            margin-left: 15px;
        }
    }
</style>
<script>
import rexTest from './api/res'
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
        startDate:'',
        endDate:moment().format('YYYY-MM-DD'),
        tableData: [],
        searchArr:[
                {value:'',label:'全部'},
                {value:'输液',label:'输液'},
                {value:'注射',label:'注射'},
                {value:'口服',label:'口服'},
                {value:'治疗',label:'治疗'},
                {value:'雾化',label:'雾化'},
                {value:'标本',label:'标本'},
                {value:'皮试',label:'皮试'},
                {value:'其他',label:'其他'},
                {value:'外用',label:'外用'},
        ],
        executeType:'',
        columnArr:[
            {id:1,label:'预计执行时间',property:'executeDateTime',width:'170'},
            // {id:1,label:'预计执行时间',property:'barcode',width:'170'},
            {id:2,label:'类别',property:'executeType',width:'80'},
            {id:3,label:'医嘱名称',property:'itemName',width:'230'},
            {id:4,label:'规格',property:"itemSpec",width:'210'},
            {id:5,label:'剂量',property:'dosage',width:'50',align:'right'},
            {id:12,label:'剂量单位',property:'dosageUnits',width:'80',align:'left'},
            {id:6,label:'用法',property:'administration',width:'80'},
            {id:7,label:'频度',property:'freqeuncy',width:'80'},
            {id:8,label:'开始',property:'startDateTime',width:'170'},
            {id:9,label:'结束',property:'endDateTime',width:'170'},
            {id:11,label:'状态',property:'executeStatusCn',width:'112'},
        ],
        executeStatusObj:{
            0:'未执行',
            1:'执行中',
            4:'已执行',
        },
        groupObj:{},
        loading:true,
        bus: bus(this),
    };
},
methods: {
    open() {
        this.groupObj = {}
        this.tableData = []
        this.allData = []
        this.loading = true
        let patientInfo = this.$store.state.patient.currentPatient
        getOrdersExecuteWithPatinetId({
            "patientId":patientInfo.patientId,
            "visitId":patientInfo.visitId,
            "startDate":this.startDate?moment(this.startDate).format('YYYY-MM-DD'):'',
            "endDate":this.endDate?moment(this.endDate).format('YYYY-MM-DD'):'',
            "executeType":this.executeType,
        }).then(res=>{
            // let res = rexTest
            this.allData = res.data.data //有接口后用这个
            // this.allData = res.data
            this.allData.map((item)=>{
                item.executeStatusCn = this.executeStatusObj[item.executeStatus]
                this.groupObj[item.barcode] = this.groupObj[item.barcode] || []
                this.groupObj[item.barcode].push(item)
            })
            this.setGroup()
            this.loading = false
        })
        this.$refs.modalName.open();
    },
    // // 勾选时触发事件(参数为选择后的数组)
    // handleSelectionChange(val) {
    //     this.multipleSelection = val;
    // },
    // // 清空
    cleanAllSelection() {
        this.$refs.multipleTable.clearSelection();
    },
    //
    post(){
        if(!this.multipleSelection.length)return
        let list = []
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
                    executeDateTime: recordDate,
                    itemName : food,
                    dosage : foodSize,
                    executeType : foodChannel
                } = element
            list.push({
                    recordDate:moment(recordDate).format('YYYY-MM-DD HH:MM'),
                    recordMonth:moment(recordDate).format('MM-DD'),
                    recordHour:moment(recordDate).format('HH:MM'),
                    food,
                    foodSize,
                    foodChannel
                })
        })
        // console.log(this.blockId,list);
        saveAllWithRecordDate({
            blockId:this.blockId,
            list
        }).then(res=>{
            this.bus.$emit('saveSheetPage', 'noSaveSign');
            this.close();
        })
    },
    changExecuteType(val){
        this.executeType = val
    },
    setGroup(){
        if(this.allData.length){
            let arr = []
            for(let key in this.groupObj){
                if(this.groupObj[key]&&this.groupObj[key].length){
                    this.groupObj[key].map((item,index)=>{
                        if(index==0){
                            item.disabled = false
                            item.isFirst = true
                        }else {
                            item.disabled = true
                            item.executeDateTime = ''
                            item.isOrder = true
                            if(index==this.groupObj[key].length-1){
                            item.isOrder = false
                            item.isLast = true
                            }
                        }
                        arr.push(item)
                    })
                    if(this.groupObj[key].length==1){
                        this.groupObj[key][0].isFirst = false
                        this.groupObj[key][0].isOrder = false
                        this.groupObj[key][0].isLast = false
                    }
                }
            }
            this.tableData = arr
        }
    },
    search(){
        this.loading = true
        this.open()
    },
    close() {
        this.loading = true
        this.$refs.modalName.close();
    },
},
components: {},
computed:{
    multipleSelection:{
        get(){
            return this.tableData.filter(item=>item.checked)
        }
    }
},
created(){
    
}
};
</script>