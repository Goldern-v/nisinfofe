<template>
    <div class="table-page">
        <div class="tabel-title">{{title}}</div>
        <div class="cathter-tool">
            <div class="catch-info">
                <div class="set-cathter">
                    <div>置管时间：{{tableInfo.intubationTime}}</div>
                    <div>置管天数：第{{}}天</div>
                    <div :style="{width:'120px'}">置管来源：{{tableInfo.catheterSource}}</div>
                </div>
                <div class="up-cathter">
                    <div>更换时间：{{tableInfo.replaceTime}}</div>
                    <div>剩余天数：第{{}}天</div>
                    <div :style="{width:'120px'}"></div>
                </div>
            </div>
            <div class="tool-btns">
                <button>删除整单</button>
                <button @click="saveTable">保存</button>
            </div>
        </div>
        <el-table
            :data="tabelData"
            height="750"
            border
            align="center"
            style="width: 100%">
            <el-table-column
            prop="recordMonth"
            align="center"
            label="日期">
            </el-table-column>
            <el-table-column
            prop="recordHour"
            align="center"
            label="时间">
            </el-table-column>
            <el-table-column 
            v-for="(item,index) in config"
            :key='index'
            :prop="item.name"
            align="center"
            :label="item.title">
            <template slot-scope="scope">
                <el-select v-model="scope.row[item.name]" filterable placeholder="请选择">
                    <el-option
                        v-for="item in optionsConfig[tableInfo.formTitle]?optionsConfig[tableInfo.formTitle][item.title]:[]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </template>
            </el-table-column>
            <el-table-column
            prop="address"
            align="center"
            label="操作">
            <template slot-scope="scope">
                <div @click="delRow(scope.row)" class="del-btn">删除</div>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang='scss' scoped>
.table-page{
    padding:0 20px;
    background-color: #fff;
    font-size: 14px;
    .tabel-title{
        font-size: 18px;
        font-weight: 700;
        line-height: 50px;
        border-bottom: 1px dashed #ccc;
    }
    .cathter-tool{
        display: flex;
        justify-content: space-between;
        .catch-info{
            line-height: 30px;
            .set-cathter , .up-cathter{
                display: flex;
                width: 500px;
            }
        }
        .tool-btns{
            padding-top: 15px;
            button{
                height: 30px;
                width: 80px;
                background-color: #00a98a;
                color: #fff;
                border: none;
                border-radius: 6px;
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
    /deep/ td{
        box-sizing: border-box;
    }
}
    
</style>
<script>
import {getConfig,saveCatheter,getCatheterValueDict} from '../../api/catheter'
import optionsConfig from "./options-config"
export default {
props: {
    tabelConfig:{
        type:Array,
        value:[]
    },
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
    optionsConfig,
};
},
methods: {
    delRow(row){
        let index = this.tabelData.findIndex(item=>{
            return item == row
        })
        console.log(index);
        this.tabelData.splice(index,1)
        this.fillData(this.tabelData)
        console.log(this.tabelData);
    },
    saveTable(){
        console.log(this.tableInfo);
        let {code,type,id} = this.tableInfo
        saveCatheter({
            code,type,id,
            list:this.tabelData
        },code).then(res=>{
            this.created()
        })
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
    }
},
watch:{
},
async created(){
    let res =  await getConfig(this.tableInfo.code)
    this.config = res.data.data
    this.fillData(this.tabelConfig)
    let dictRes = await getCatheterValueDict(this.tableInfo.code)
    console.log(dictRes);
},
components: {},
computed:{
    
}
};
</script>