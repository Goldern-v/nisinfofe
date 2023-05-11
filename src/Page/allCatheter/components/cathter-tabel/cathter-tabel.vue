<template>
    <div class="table-page" :class="[!pageNum||pageNum==1?'first-page':'']">
        <div class="fix-table" v-if="!pageNum||pageNum==1" :style="{width:contentWidth,}">
            <div style="background:#dfdfdf;height:5px;"></div>
            <div class="tabel-title">{{title}}<el-button class="extubation-btn" type="primary" @click="extubationModal" :disabled="tableInfo.catheterStatus==2">拔管</el-button></div>
            <div class="cathter-tool">
                <div class="catch-info">
                    <div class="set-cathter">
                        <div>置管时间：{{tableInfo.intubationTime}}</div>
                        <div>置管天数：第{{intubationDays}}天</div>
                        <div :style="{width:'140px'}">置管来源：{{tableInfo.catheterSource}}</div>
                    </div>
                    <div class="up-cathter">
                        <div style="cursor:pointer;" v-show="!!tableInfo.replaceTime" @dblclick="changeReplaceTime">计划更换时间：{{tableInfo.replaceTime}}</div>
                        <div style="cursor:pointer;" v-show="!tableInfo.replaceTime" @dblclick="changeReplaceTime">计划更换时间：未确定</div>
                        <div v-show="replaceDays=='outTime'" style="color:red">剩余天数：已超时</div>
                        <div v-show="!['unShow','outTime','unSet','today'].includes(replaceDays)" :style="{color:tableInfo.catheterStatus==1?'red':''}">剩余天数：{{replaceDays}}天</div>
                        <div v-show="replaceDays=='today'" :style="{color:tableInfo.catheterStatus==1?'red':''}">今天拔管</div>
                        <!-- <div v-show="replaceDays=='unShow'">实际拔管时间：{{tableInfo.extubationTime}}</div> -->
                    </div>
                    <div class="up-cathter">
                        <div style="cursor:pointer;" v-show="!!tableInfo.expectExtubationTime" @dblclick="removeTime">计划拔除时间：{{tableInfo.expectExtubationTime}}</div>
                        <div style="cursor:pointer;" v-show="!tableInfo.expectExtubationTime" @dblclick="removeTime">计划拔除时间：未确定</div>
                        <div v-show="ExtReplaceDays=='outTime'" style="color:red">剩余天数：已超时</div>
                        <div v-show="!['unShow', 'outTime','unSet','today'].includes(ExtReplaceDays)" :style="{color:tableInfo.catheterStatus==1?'red':''}">剩余天数：{{ExtReplaceDays}}天</div>
                        <div v-show="ExtReplaceDays =='today'" :style="{color:tableInfo.catheterStatus==1?'red':''}">今天拔管</div>
                        <!-- <div v-show="ExtReplaceDays=='unShow'">实际拔管时间：{{tableInfo.extubationTime}}</div> -->
                    </div>
                    <div class="up-cathter">
                        <div v-show="!tableInfo.extubationTime">实际拔管时间：未拔除</div>
                        <div v-show="tableInfo.extubationTime">实际拔管时间：{{tableInfo.extubationTime}}</div>
                    </div>
                </div>
                <div class="tool-btns">
                    <button @click="delAll">删除整单</button>
                    <button @click="saveTable">保存</button>
                </div>
            </div>
        </div>
        <div class="withe-part" style="height:175px;"></div>
        <el-table
            id="table-box"
            :data="tabelData"
            border
            align="center"
            style="width: 100%">
            <el-table-column
                prop="recordMonth"
                align="center"
                width="60"
                label="日期">
                <template slot-scope="scope">
                    <MDMasked type="monthAndDate" :value="scope.row.recordMonth" @input="(val)=>{scope.row.recordMonth=val}"/>
                    <!-- <el-input type="text" v-model="scope.row.recordMonth" @focus="initDT('date',scope.row)"></el-input> -->
                </template>
            </el-table-column>
            <el-table-column
                prop="recordHour"
                align="center"
                width="60"
                label="时间">
             <template slot-scope="scope">
                    <MDMasked type="time" :value="scope.row.recordHour" @input="(val)=>{scope.row.recordHour=val}"/>
                    <!-- <el-input type="text" v-model="scope.row.recordHour" @focus="initDT('time',scope.row)"></el-input> -->
                </template>
            </el-table-column>
            <el-table-column
                v-for="(item,index) in config"
                :key='index'
                :prop="item.name"
                resizable
                min-width="100"
                align="center"
                :label="item.title">
            <template slot-scope="scope">
                <el-autocomplete
                    class="cathter-autocomplete"
                    v-model="scope.row[item.name]"
                    @input="show"
                    :fetch-suggestions="(queryString, cb)=>querySearch(queryString, cb,optionsConfig[item.name])"
                    :title="scope.row[item.name]"
                    placeholder=""
                    @select="handleSelect"
                    >
                </el-autocomplete>
                <!-- <el-select v-model="scope.row[item.name]" filterable allow-create default-first-option placeholder="">
                    <el-option
                        v-for="item in optionsConfig[item.name]?optionsConfig[item.name]:[]"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select> -->
            </template>
            </el-table-column>
            <el-table-column
                prop="signerName"
                align="center"
                width="80"
                label="评估人">
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                width="60"
                label="操作">
            <template slot-scope="scope">
                <div @click="showDelModal(scope.row)" class="del-btn">删除</div>
            </template>
            </el-table-column>
        </el-table>
        <div style="line-height:40px;text-align:center">第{{pageNum||1}}页</div>
        <delModal v-if="isDel" @closeModal='closeModal' @delRow='delRow' :modalTitle="modalTitle" :modalContont="modalContont"></delModal>
        <repModal v-if="showChangeRt" :replaceTime='tableInfo.replaceTime' @closeRepModal='closeRepModal' @changeRepFn='changeRepFn'></repModal>
        <removeModal v-if="showRemoveStatus" :replaceTime='tableInfo.expectExtubationTime' @closeRepModal='removeClose' @changeRepFn='removeChangeRepFn'></removeModal>
    </div>
</template>
<style lang='scss' scoped>
.table-page{
    overflow: hidden;
    padding:0 20px 20px;
    background-color: #fff;
    font-size: 14px;
    .fix-table{
        background-color: #fff;
        position: fixed;
        z-index: 998;
        top: 61px;
        margin-left:-20px ;
        width: 62%;
        box-sizing: border-box;
    }
    .tabel-title{
        font-size: 18px;
        padding: 0 20px;
        font-weight: 700;
        line-height: 50px;
        border-bottom: 1px dashed #ccc;
        position: relative;
    }
    .extubation-btn{
        position: absolute;
        width: 80px;
        top: 10px;
        right: 20px;
        font-size: 12px;
    }
    .cathter-tool{
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        .catch-info{
            line-height: 30px;
            .set-cathter , .up-cathter{
                display: flex;
                width: 500px;
                cursor: default;
                div{
                    margin-right: 10px;
                }
            }
        }
        .tool-btns{
            padding-top: 15px;
            button{
                cursor: pointer;
                height: 30px;
                width: 80px;
                background-color: #fff;
                color: #00a98a;
                border: 1px solid #ccc;
                border-radius: 6px;
                &:hover{
                    background-color: #00a98a;
                    color: #fff;
                }
            }
        }
    }
    .del-btn{
        cursor: pointer;
        color: #01c298;
    }
    .td-input{
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
    }
    /deep/ .el-select .el-input .el-input__icon{
        display: none!important;
    }
    /deep/ .el-input__icon + .el-input__inner{
        padding-right:10px;
    }
    /deep/ .el-input__inner{
        border: none;
    }
    /deep/ .el-table__row:hover{
        background-color: #eef6f5;
    }
    /deep/ .el-table__row:hover .el-input__inner{
        background-color: #eef6f5;
    }
    /deep/ .el-table__row:hover input{
        background-color: #eef6f5;
    }
    /deep/ td{
        box-sizing: border-box;
    }
    /deep/ .el-table .cell, .el-table th > div{
        padding: 0;
    }
    /deep/ .el-input__inner{
        padding: 0;
        text-align: center;
        font-size: 12px;
    }
    /deep/ .el-input__icon + .el-input__inner{
        padding: 0;
    }
    /deep/ .el-autocomplete{
        width: 100%;
    }
    // /deep/ tbody{
    //     padding-top: 40px;
    //     overflow: hidden;
    // }
}

.first-page /deep/ .el-table__header-wrapper{
    position: fixed;
    z-index: 997;
}
.first-page /deep/ tbody::before{
    content: "";
    display: block;
    height: 40px;
}

</style>
<style lang='scss'>
.el-autocomplete-suggestion{
    width: auto!important;
    min-width: 84px!important;
}
</style>
<script>
import MDMasked from "../timeMasked/MD_Masked.vue"
import moment from 'moment';
import {
    getCatheterTable,
    getConfig,
    saveCatheter,
    getCatheterValueDict,
    delRowApi,
    delAllApi,
    updateInfo,
    extubationApi
} from '@/Page/allCatheter/api/catheter'
import delModal from '@/Page/allCatheter/components/del-row-modal/del-row-modal.vue'
import repModal from '@/Page/allCatheter/components/replace-modal/replace-modal.vue'
import removeModal from '@/Page/allCatheter/components/replace-modal/replace-modal.vue'
export default {
props: {
    tabelConfig:{
        type:Array,
        value:[]
    },
    pageNum:Number,
    tableInfo:{
        type:Object,
        value:{}
    },
    title:{
        type:String,
        value:''
    }
    },
data() {
return {
    config:[],
    tabelData:[],
    optionsConfig:{},
    isDel:false,
    currentRow:{},
    delType:'',
    showChangeRt:false,
    modalTitle:'',
    modalContont:'',
    contentWidth:"auto",
    tableHtml:null,
    showRemoveStatus: false,
};
},
methods: {
    show(){
        // console.log(111);
    },
    handleSelect(){},
    querySearch(queryString, cb,arr){
        if(arr&&arr.length){
            let tem = arr.map(item=>{
                // console.log(item);
                return {value:item.code}
            })
            cb(tem)
        }else{
            cb([])
        }
    },
    refreshCatcherTable(code,type,id,patientId,visitId){
        getCatheterTable({
                code,
                type,
                id,
                patientId,
                visitId
            },code).then(res=>{
                // console.log(res);
                this.$emit('updateTableConfig',res.data.data)
            })
    },
    extubationModal(){
        this.modalTitle = '拔管'
        this.modalContont = '确定要给该患者拔管吗？'
        this.delType = 'extubation'
        this.isDel = true
    },
    extubation(extubationTime){
        extubationApi({...this.tableInfo,extubationTime},this.tableInfo.code).then(res=>{
            this.$message.success('操作成功')
            let config = res.data.data
            this.$emit('updateTableConfig',config)
            this.$emit('onChangePatient_self',this.$store.state.sheet.patientInfo)
        }).catch(err=>{
            this.$message.error(err.desc)
        })
    },
    changeRepFn(val){
        let obj = JSON.parse(JSON.stringify(this.tableInfo))
        obj.replaceTime = val
        updateInfo(obj,this.tableInfo.code).then(res=>{
            let config = res.data.data
            this.$emit('onChangePatient_self',this.$store.state.sheet.patientInfo)
            this.$emit('updateTableConfig',config)
        })
    },
    removeChangeRepFn(val){
        let obj = JSON.parse(JSON.stringify(this.tableInfo))
        obj.expectExtubationTime = val
        updateInfo(obj,this.tableInfo.code).then(res=>{
            let config = res.data.data
            this.$emit('onChangePatient_self',this.$store.state.sheet.patientInfo)
            this.$emit('updateTableConfig',config)
        })
    },
    changeReplaceTime(){
        this.showChangeRt = true
    },
    removeTime(){
        this.showRemoveStatus = true
    },
    closeRepModal(){
        this.showChangeRt = false
    },
    removeClose(){
        this.showRemoveStatus = false
    },
    initDT(type,row){
        if(type=='date'&&!row.recordMonth){
            row.recordMonth = moment().format("MM-DD")
        }else if(type=='time'&&!row.recordHour){
            row.recordHour = moment().format("HH:mm")
        }
    },
    closeModal(){
        this.isDel = false
        this.currentRow = {}
    },
    delAll(){
        this.modalTitle = ''
        this.modalContont = ''
        this.delType = 'all'
        this.isDel = true
    },
    showDelModal(row){
        this.modalTitle = ''
        this.modalContont = ''
        if(!row.id){
            this.$message.error('该行暂无数据！')
            return
        }
        this.currentRow = row
        this.delType = 'row'
        this.isDel = true
    },
    delRow(empNo,password,extubationTime){
        let {code,type,id,patientId,visitId} = this.tableInfo
        if(this.delType==='row'){
            delRowApi({
                id:this.currentRow.id,
                empNo:empNo,
                password:password
            },code).then(res=>{
                this.$message.success('删除成功')
                this.isDel = false
                this.refreshCatcherTable(code,type,id,patientId,visitId)
            }).catch(err=>{
                this.$message.error(err.desc)
            })
        }else if(this.delType==='all'){
            delAllApi({
                id:this.tableInfo.id,
                empNo:empNo,
                password:password
            },code).then(res=>{
                this.$emit('onChangePatient_self',this.$store.state.sheet.patientInfo)
                this.isDel = false
                this.$message.success('删除成功')
                this.$emit('changeShowTable',false)
            }).catch(err=>{
                this.$message.error(err.desc)
            })
        }else if(this.delType==='extubation'){
            this.extubation(extubationTime)
        }
    },
    saveTable(){
        if(this.pageNum){
            this.$emit('saveTableFn')
        }else{
            let {code,type,id,patientId,visitId} = this.tableInfo
            saveCatheter({
                code,type,id,
                list:this.tabelData
            },code).then(res=>{
                this.$message.success('保存成功')
                this.refreshCatcherTable(code,type,id,patientId,visitId)
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    fillData(oldArr){
        if(oldArr.length<17){
            let arr = JSON.parse(JSON.stringify(oldArr))
            for(let i = arr.length;i<17;i++){
                arr[i] = {recordMonth:'',recordHour:''}
                this.config.map(item=>{
                    arr[i][item.name] = ''
                })
            }
            this.tabelData = JSON.parse(JSON.stringify(arr))
        }else{
            this.tabelData = JSON.parse(JSON.stringify(oldArr))
        }
        // console.log(this.tabelData);
    },
    async init(){
        let res =  await getConfig(this.tableInfo.code)
        this.config = res.data.data
        this.fillData(this.tabelConfig)
        let dictRes = await getCatheterValueDict(this.tableInfo.code)
        this.optionsConfig = dictRes.data.data
    },
    handleScroll(e){
        let target = e.currentTarget
        let fixHeader = document.getElementsByClassName('el-table__header-wrapper')[0]
        // console.log(`${480-target.scrollLeft}px`);
        fixHeader.style.left = `${505-target.scrollLeft}px`
    }
},
mounted(){
    this.tableHtml = document.getElementById("table-box")
    let tbody = document.getElementsByClassName('el-table__body-wrapper')[0]
    tbody.addEventListener('scroll', this.handleScroll, true)
},
created(){
    this.init()
},
components: {
    delModal,
    repModal,
    MDMasked,
    removeModal
},
computed:{
    intubationDays(){
        let m1 = moment(this.tableInfo.intubationTime)
        let m2 = this.tableInfo.extubationTime?moment(this.tableInfo.extubationTime):moment()
        return m2.diff(m1,'day') + 1
    },
    replaceDays(){
        if(this.tableInfo.extubationTime)return 'unShow'
        let m1 = moment(this.tableInfo.replaceTime)
        let m2 = moment()
        let day = m1.diff(m2,'day') + 1
        // console.log(day);
        if(m1.format('YYYY-MM-DD')===m2.format('YYYY-MM-DD')){
            return 'today'
        }else if(day<=0){
            return 'outTime'
        }else if(day){
            return day
        }else{
            return 'unSet'
        }
    },
    ExtReplaceDays(){
        if(this.tableInfo.extubationTime)return 'unShow'
        let m1 = moment(this.tableInfo.expectExtubationTime)
        let m2 = moment()
        let day = m1.diff(m2,'day') + 1
        console.log(m1, m2, this.tableInfo.expectExtubationTime, 6666666);
        if(m1.format('YYYY-MM-DD')===m2.format('YYYY-MM-DD')){
            return 'today'
        }else if(day<=0){
            return 'outTime'
        }else if(day){
            return day
        }else{
            return 'unSet'
        }
    },
    tableHeight(){
        return '750'
    },
},
watch:{
    tableHtml(val){
        let fixHeader = document.getElementsByTagName('thead')[0]
        if(val){
            this.contentWidth = `${this.tableHtml.offsetWidth+40}px`
        }else{
            this.contentWidth = "auto"
        }
        fixHeader.style.offsetWidth = this.contentWidth
    }
}
};
</script>
