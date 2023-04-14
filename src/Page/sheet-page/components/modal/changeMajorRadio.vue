<!--
患者表单转科室，但只能单选
-->
<template>
  <div>
    <el-dialog title="科室选择" :visible.sync="dialogTableVisible" @close="close" >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 300px; margin-top: 20px"
        :max-height="250"
        @row-click="(row)=>rowClick(row)"
      >
        <el-table-column width="40">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radioIdx" @change.native="handlerSelect(scope.$index)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="科室名称" show-overflow-tooltip  style="text-align:center">
        </el-table-column>
      </el-table>
      <div style="display: flex; margin-top: 20px; justify-content: center">
        <el-button @click="close">取消</el-button>
        <el-button @click="handelsuccus" type="success">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adtExchange, updateCommonInfo} from "./api/index";
export default {
  props: {
    // 打开弹框
    dialogTableVisibleTrue: {
      type: Boolean,
      default: false,
    },
    majorData: {
      type: Object,
    },
  },
  data() {
    return {
      dialogTableVisible:false,
      radioIdx: null,
      tableData: [],
      adtLogList:[],
    };
  },
  methods: {
    close() {
      this.$emit("TableVisible", false);
    },
    async handelsuccus(){
      let data ={
         adtLogList:[this.tableData[this.radioIdx]],
        ...this.majorData,
      }
      let res = await updateCommonInfo(data)
      if(res.data.code == 200 ){
        // 刷新页面
         this.$emit("savedata",true)
        //  关闭弹框
        this.close();
      }
    },
    handlerSelect(idx){
      this.tableData = this.tableData.map(item => {
        item.selected = false
        return item
      })
      this.tableData[idx].selected = true
    },
    rowClick(row){
      this.radioIdx = this.tableData.indexOf(row)
    }
  },
  watch:{
   async dialogTableVisibleTrue(value){
      this.dialogTableVisible= value
      if(value){
        const data =  await adtExchange(this.majorData)
        if(data.data.code >= 200 && data.data.code < 300){
           this.tableData = data.data.data
           this.tableData.map((item,idx) =>{
             if(item.selected){
               this.radioIdx = idx;
             }
           })
        }

      }
    },
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 40px;
  border: 1px solid #bfcbd9;
  line-height: 40px;
  text-align: center;
}
</style>
