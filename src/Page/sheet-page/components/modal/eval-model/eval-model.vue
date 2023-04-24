<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="745" title="护理评估记录">
      <div class="modal-main">
        <div class="header">
          评估日期：
          <div class="chooseCon">
            <el-date-picker
              v-model="startData"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>至
          <div class="chooseCon">
            <el-date-picker
              v-model="endData"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <el-button @click="queryList">查询</el-button>
        </div>
        <div class="midCon">
          <div class="midTable">
            <!-- <el-table
              border
              height="250"
              :data="tableData"
              >
              <el-table-column
                prop="date"
                label="状态"
               >
              </el-table-column>

              <el-table-column
                prop="name"
                label="评估日期"
                >
              </el-table-column>

              <el-table-column
                prop="address"
                label="评估表"
                width="75">
              </el-table-column>

              <el-table-column
                prop="address"
                label="得分"
                width="45">
              </el-table-column>

              <el-table-column
                prop="address"
                label="评估人"
                >
              </el-table-column>
            </el-table>-->

            <table>
              <thead>
                <tr>
                  <th>状态</th>
                  <th>评估日期</th>
                  <th>评估表</th>
                  <th>得分</th>
                  <th>评估人</th>
                </tr>
              </thead>
            </table>
            <div class="midTableBody">
              <div class="midTableBodyCache">
                <table v-loading="tableLoading">
                  <tbody ref="tbodyRef">
                    <tr
                      v-for="(item,index) in tableData"
                      :key="index"
                      @click="clickTr(item,$event)"
                      :class="isDisabled(item) ? 'unselectable' : ''"
                    >
                      <td v-if="item.syncToRecord">已导入</td>
                      <td v-else-if="item.evalDate" style="color:#FF0000">未导入</td>
                      <td v-else></td>
                      <td>{{item.evalDate}}</td>
                      <td>{{item.formName}}</td>
                      <td>{{item.evalScore}}</td>
                      <td>{{item.creatorName}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="midEdit">
            <div class="midEditHeader">
              护记时间：
              <div class="midEditInput">
                <template  v-if="editTimeHosipital.includes(HOSPITAL_ID)">
                <el-date-picker
                  @change="changeEvalDate"
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间"
                    default-time="请选择日期时间"
                >
              </el-date-picker>
                </template>
                <input
                  v-else
                  :disabled="true"
                  placeholder
                  suffix-icon="el-icon-date"
                  :value="rowData.evalDate"
                >
                <i class="el-icon-time" v-if="!editTimeHosipital.includes(this.HOSPITAL_ID)"></i>
              </div>
            </div>
            <div>
              <div class="label">基础评估：</div>
              <textarea class="midEditContent" disabled v-model="rowData.syncToRecordDesc"></textarea>
              <div class="label">特殊情况记录：</div>
              <textarea class="midEditContent" v-model="rowData.syncToRecordDesc"></textarea>
            </div>
            <div class="midEditBottom">
              <div class="midEditBottomSign">签名: {{rowData.creatorName}}</div>
              <div class="midEditBottomReplace" @click="handleSwitch">切换</div>
            </div>
            <div class="bottomSubmit">
              <el-button @click="writeForm">写入护理记录单</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>-->
    </sweet-modal>
  </div>
</template>
<script>
import moment from "moment";
import { getListAssessment, signBlock, saveEvalDesc } from "./api";
// import sheetInfo from "../../config/sheetInfo";
import bus from "vue-happy-bus";
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      bus: bus(this),
      startData: "",
      endData: "",
      editTimeHosipital:['xiegang','liaocheng','zhzxy'],//同步时间允许修改的医院
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      rightTime: "",
      rowData: { evalDate: "", syncToRecordDesc: "", creatorName: "" },
      tableLoading: false,
      value1:''
    };
  },
  computed: {
    ...mapState({
      openModalFromSpecial: state => state.sheet.openModalFromSpecial
    }),
    aaa() {
      moment(this.value11).format("YYYY-MM-DD");
    }
  },
  watch: {
    endData() {}
  },
  methods: {
    ...mapMutations(['upOpenModalFromSpecial', 'upEvalData']),
    isDisabled(row) {
      const user = JSON.parse(localStorage.getItem("user"));
      // 患者科室 === 当前记录科室(禁用)
      return this.HOSPITAL_ID === 'whsl' && (user && user.deptCode !== row.wardCode);
    },
    changeEvalDate(){
      var date = new Date(this.value1)
      if(this.rowData.evalDate){
        this.rowData.evalDate=moment(date).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    open() {
      this.tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
      this.queryList();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      this.close();
    },
    queryList() {
      let startData = moment(this.startData).format("YYYY-MM-DD");
      let endData = moment(this.endData).format("YYYY-MM-DD");
      this.tableLoading = true;
      getListAssessment(startData, endData).then(res => {
        if (res.data.code == "200" && res.data.data) {
          if (!res.data.data.list) {
            res.data.data.list = [];
          }
          let listData = res.data.data.list;
          if (!listData[0]) {
            listData[0] = {};
          }
          if (listData.length < 10) {
            let len = 10 - listData.length;
            for (let i = 0; i < len; i++) {
              listData.push({});
            }
          }
          this.tableData = listData;
          this.tableLoading = false;
        }
      });
    },
    clickTr(rowData, event) {
      if (this.isDisabled(rowData)) {
        return;
      }
      if(this.editTimeHosipital.includes(this.HOSPITAL_ID)){
        const user = JSON.parse(localStorage.getItem("user"))
        this.rowData = {...rowData}
        if(this.HOSPITAL_ID==='liaocheng'){
            this.rowData.creatorName=user.empName
        }
        this.value1=this.rowData.evalDate
      }else{
        this.rowData = rowData;
      }
      let tbodyNode = this.$refs.tbodyRef;
      for (let p of tbodyNode.childNodes) {
        p.classList.remove("addRowClass");
      }
      let parentNode = event.target.parentNode;
      // let allTr = parentNode.parentNode.querySelectorAll('tr');
      // [...allTr].forEach(n => {
      //   n.classList.remove('addRowClass')
      // })
      parentNode.classList.add("addRowClass");
    },
    handleSwitch() {
      window.openSignModal((password, username) => {
        signBlock(password, username).then(res => {
          if (res.data.code == "200" && res.data.data) {
            let dataObj = res.data.data;
            this.$set(this.rowData, "creatorName", dataObj.empName);
            this.$set(this.rowData, "creator", dataObj.empNo);
            //  this.rowData.creatorName = dataObj.empName
            //  this.rowData.creator = dataObj.empNo
          }
        });
      });
    },
    writeForm() {
      if (this.openModalFromSpecial) {
        this.upEvalData(this.rowData.syncToRecordDesc)
        this.upOpenModalFromSpecial(false)
        this.close()
        return
      }
      saveEvalDesc(
        this.rowData.id,
        this.rowData.syncToRecordDesc,
        this.rowData.creator,
        this.rowData.evalDate
      ).then(res => {
        if (res.data.code == "200") {
          this.rowData.syncToRecord = "true";
          this.bus.$emit("saveSheetPage", true);
          this.close();
        }
      });
    }
  },
  mounted() {},
  components: {}
};
</script>

<style lang="stylus" scoped>
  >>>.sweet-modal
    width 879px !important
    overflow hidden
    background rgba(247,250,250,1)
  >>>.sweet-content
    padding 0
    max-height 800px !important
    overflow hidden
  >>>.sweet-title
    height 39px
    line-height 39px
  .addRowClass
    background-color #FBF7B0
  .modal-main
    font-size 12px
    .header
      padding 0 18px
      height 40px
      line-height 40px
      background:rgba(237,240,244,1);
      .chooseCon
        display:inline-block
        // cursor pointer
        >>>.el-date-editor
          margin 0 6px
          width:128px;
          height:30px;
          // background:rgba(255,255,255,1);
        >>>.el-input__inner
          // padding-right: 35px;
          height 30px
          border-radius:4px;
          border:1px solid rgba(194,203,210,1);
        >>>.el-input__icon
          top 3px
          width 35px
          height 30px
      >>>.el-button
        margin-left 6px
        padding 6px 14px
        box-sizing border-box
        width:52px;
        height:30px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(194,203,210,1);
        font-size 12px
    .midCon
      display flex
      .midTable
        width 517px
        // height 392px
        background rgba(255,255,255,1)
        // border 1px solid #CFCFCF
        font-size 13px
        table
          width 100%
          border 1px solid #E5E5E5
          border-collapse collapse
          thead
            color #666666
          th
            height 37px
            line-height 37px
            background rgba(247,250,250,1)
            border 1px solid #E5E5E5
          th:nth-of-type(1)
            width 15%
          th:nth-of-type(2)
            width 25%
          th:nth-of-type(3)
            width 30%
          th:nth-of-type(4)
            width 15%
          th:nth-of-type(5)
            width 15%
      .midTableBody
        height 400px
        overflow-y auto
        overflow-x hidden
        .midTableBodyCache
          width 517px
          padding-bottom 10px
          cursor pointer
          .unselectable {
            cursor not-allowed
            background-color: #eeeeee
            color #777
          }
          tr::selection
            background-color #FBF7B0
          td
            height 37px
            line-height 37px
            text-align center
            border 1px solid #E5E5E5
          td:nth-of-type(1)
            width 15%
          td:nth-of-type(2)
            width 25%
          td:nth-of-type(3)
            width 30%
          td:nth-of-type(4)
            width 15%
          td:nth-of-type(5)
            width 15%
        // .el-table
        //   min-height 100%
        // th
        //   height:37px
        //   background:rgba(247,250,250,1)
        // td
        //   height 37px
        // td:nth-of-type(1)
        //   width 15% !important
        // >>> .el-table_1_column_6
        //    width 15%
      .midEdit
        box-sizing border-box
        flex 1
        padding 15px
        .midEditHeader
          height 34px
          line-height 34px
          display flex
          .midEditInput
            flex 1
            display flex
            position relative
            input
              box-sizing border-box
              padding 0 32px 0 16px
              flex 1
              height 34px
              background:rgba(255,255,255,1) !important
              // box-shadow:0px 1px 2px 0px rgba(129,129,129,0.5);
              border-radius:2px;
              border:1px solid rgba(203,213,221,1);
            .el-icon-time
              position absolute
              top 10px
              right 10px
              font-size 13px
              color #BCBCBC
        >>>.el-input__inner
          height 34px
        .label
          margin-top 10px;
          margin-bottom 5px;
        .midEditContent
          &[disabled]
            background #e8e8e8
          box-sizing border-box
          padding 10px 5px
          width:330px;
          height:100px;
          background:rgba(255,255,255,1);
          box-shadow:0px 1px 2px 0px rgba(129,129,129,0.5);
          border-radius:2px;
          border:1px solid rgba(203,213,221,1);
          resize: none;
        .midEditBottom
          margin-top 17px
          display:flex
          .midEditBottomSign
            width 100px
            font-size 12px
            font-family PingFangSC-Regular
            font-weight:400
          .midEditBottomReplace
            width:24px;
            height:17px;
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(40,79,194,1);
            line-height:17px
            cursor pointer
        .bottomSubmit
          margin-top 17px
          width 100%
          text-align center
          button
            outline none
            border none
            width:150px;
            height:37px;
            background:rgba(75,176,141,1);
            border-radius:2px
            font-size:13px;
            color:rgba(255,255,255,1);

</style>

