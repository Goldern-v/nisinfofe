<template>
  <div class="d-table">
    <u-table
      v-loading="pageLoadng"
      :row-class-name="addRowClass"
      :class="{ 'd-table-liaocheng': HOSPITAL_ID == 'foshanrenyi' }"
      fixed-columns-roll
      beautify-table
      header-drag-style
      :height="tableH || wih - 124"
      :treeConfig="{
        children: 'children',
        iconClose: 'el-icon-folder-add',
        iconOpen: 'el-icon-folder-remove',
        expandAll: false,
      }"
      use-virtual
      row-id="id"
      border
      @toggle-tree-expand="toggleTreeExpand"
    >
      <!-- <u-table-column
        label="序号"
        header-align="center"
        type="index"
        min-width="60px"
        align="center"
      ></u-table-column> -->
      <u-table-column
        prop="bedLabel"
        label="床号"
        min-width="60px"
        align="center"
        :tree-node="true"
      >
        <template slot-scope="scope">
          <div v-show="scope.row.child">
            {{ scope.row.bedLabel }}
          </div>
        </template>
      </u-table-column>

      <u-table-column
        label="姓名"
        prop="patientName"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-show="scope.row.child">
            {{ scope.row.patientName }}
          </div>
        </template>
      </u-table-column>

      <u-table-column label="医嘱内容" prop="orderText" min-width="250px">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.child" :key="index" v-show="item.orderText">
            {{ item.orderText }}
          </div>
        </template>
      </u-table-column>

      <u-table-column prop="dosage" label="剂量" min-width="60px" align="right">
        <template slot-scope="scope">
          <div
            v-for="(item, index) in scope.row.child"
            :key="index"
            style="position: relative; right: -10px"
            v-show="item.dosage"
          >
            {{ item.dosage }}
          </div>
        </template>
      </u-table-column>

      <u-table-column prop="dosageUnits" label="单位" min-width="50px">
        <template slot-scope="scope">
          <div
            v-for="(item, index) in scope.row.child"
            :key="index"
            style="position: relative; left: -10px"
            v-show="item.dosageUnits"
          >
            {{ item.dosageUnits }}
          </div>
        </template>
      </u-table-column>

      <u-table-column
        label="频次"
        prop="frequency"
        min-width="50px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.child && scope.row.child.length">
            <div v-for="(item, index) in scope.row.child" :key="index" v-show="item.frequency">
              {{ item.frequency }}
            </div>
          </div>
          <div v-else>{{ scope.row.frequency }}</div>
        </template>
      </u-table-column>

      <u-table-column
        prop="executeDateTime"
        label="预计执行时间"
        min-width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.child && scope.row.child.length">
            <div v-for="(item, index) in scope.row.child" :key="index" v-show="item.executeDateTime">
              {{ item.executeDateTime | ymdhms }}
            </div>
          </div>
          <div v-else>
            {{ scope.row.executeDateTime | ymdhms }}
          </div>
        </template>
      </u-table-column>

      <u-table-column prop="administration" label="途径" min-width="90px">
        <template slot-scope="scope">
          <div v-if="scope.row.child && scope.row.child.length">
            <div v-for="(item, index) in scope.row.child" :key="index" v-show="item.administration">
              {{ item.administration }}
            </div>
          </div>
          <div style="text-align: left" v-else-if="scope.row.executeType=='输液'">
            <div>摆药人：{{ scope.row.baiNurse }}</div>
            <div v-if="scope.row.baiTime">{{ scope.row.baiTime | ymd }}</div>
            <div v-if="scope.row.baiTime">{{ scope.row.baiTime | hms }}</div>
          </div>
        </template>
      </u-table-column>

      <u-table-column
        prop="executeFlag"
        label="执行状态"
        min-width="75px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.child && scope.row.child.length">
            <div v-for="(item, index) in scope.row.child" :key="index" v-show="item.executeFlag!=5">
              <span
                :class="{
                  yzx: item.executeFlag == 4,
                  zxz: item.executeFlag == 1 || item.executeFlag == 3,
                }"
                >{{ item.executeFlag | handleStatus }}</span
              >
              <span v-if="item.type == 1">(补)</span>
            </div>
          </div>
          <div style="text-align: left" v-else-if="scope.row.executeType=='输液'">
            <div>配药人：{{ scope.row.peiNurse }}</div>
            <div v-if="scope.row.peiTime">{{ scope.row.peiTime | ymd }}</div>
            <div v-if="scope.row.peiTime">{{ scope.row.peiTime | hms }}</div>
          </div>
        </template>
      </u-table-column>

      <u-table-column
        prop="startNurse"
        label="执行人"
        min-width="75px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.child && scope.row.child.length">
            <div v-for="(item, index) in scope.row.child" :key="index" v-show="item.startNurse">
              {{ item.startNurse }}
            </div>
          </div>
          <div style="text-align: left" v-else-if="scope.row.executeType=='输液'">
            <div>核对人：{{ scope.row.heNurse }}</div>
            <div v-if="scope.row.heTime">{{ scope.row.heTime | ymd }}</div>
            <div v-if="scope.row.heTime">{{ scope.row.heTime | hms }}</div>
          </div>
        </template>
      </u-table-column>

      <u-table-column
        prop="realExecuteDateTime"
        label="实际执行时间"
        min-width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.child" :key="index" v-show="item.realExecuteDateTime">
            {{ item.realExecuteDateTime | ymdhm2 }}
          </div>
        </template>
      </u-table-column>

      <u-table-column
        prop="repeatIndicator"
        label="长/临"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-show="scope.row.child">
            {{ scope.row.repeatIndicator }}
          </div>
        </template>
      </u-table-column>

      <u-table-column
        prop="baiNurse"
        label="摆药人/摆药时间"
        min-width="170px"
        v-if="currentType == '输液'"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.child"
            >{{ scope.row.baiNurse }} {{ scope.row.baiTime | ymdhm2 }}</span
          >
        </template>
      </u-table-column>

      <u-table-column
        prop="peiNurse"
        label="配药人/配药时间"
        min-width="170px"
        v-if="currentType == '输液'"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.child"
            >{{ scope.row.peiNurse }} {{ scope.row.peiTime | ymdhm2 }}</span
          >
        </template>
      </u-table-column>

      <u-table-column
        prop="heNurse"
        label="核对人/核对时间"
        min-width="170px"
        v-if="currentType == '输液'"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.child"
            >{{ scope.row.heNurse }} {{ scope.row.heTime | ymdhm2 }}</span
          >
        </template>
      </u-table-column>

      <u-table-column
        prop="endDateTime"
        label="结束输液护士/时间"
        min-width="200px"
      >
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.child" :key="index" v-show="item.executeDateTime">
              {{ item.endNurse }} {{ item.endDateTime | ymdhm2 }}
          </div>
        </template>
      </u-table-column>

      <u-table-column
        prop="stopDateTime"
        label="暂停输液护士/时间/原因"
        min-width="200px"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.child"
            >{{ scope.row.stopNurse }} {{ scope.row.stopDateTime | ymdhm2 }}
            {{ scope.row.stopReason }}</span
          >
        </template>
      </u-table-column>

      <u-table-column
        prop="typeReason"
        label="补执行的原因"
        min-width="200px"
        v-if="HOSPITAL_ID == 'foshanrenyi'"
      >
        <template slot-scope="scope">
          <div v-show="scope.row.child">
            {{ scope.row.typeReason }}
          </div>
        </template>
      </u-table-column>

      <u-table-column label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <div
            v-for="(item, index) in scope.row.child"
            :key="index"
            v-show="item.executeDateTime"
          >
          <el-button
            type="text"
            @click="backTracking(item)"
            v-if="isEdit && item.executeDateTime && item.executeFlag!=4"
            >补录</el-button
          >
          <el-button
            type="text"
            @click="editTime(item)"
            
            v-if="
              isEdit &&
              ((HOSPITAL_ID == 'lingcheng' && item.executeFlag > 0) ||
                item.executeFlag == 4)
            "
            >修改</el-button
          >
          <el-button
            type="text"
            @click="cancelOrderExecute(item)"
            >取消</el-button
          >
          </div>
        </template>
      </u-table-column>
    </u-table>
    <editModal ref="editModal"></editModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.d-table {
  border: 1px solid #cbd5dd;

  >>>.el-table {
    border: 0 !important;
    .el-button + .el-button{
      margin-left: 0px!important;
    }
    .green {
      background-color: #83d883;
    }

    .pink {
      background-color: pink;
    }

    td {
      height: 30px;
      position: relative;
    }

    th >.cell, th >div {
      padding: 0px;
      text-align: center;
    }

    .cell {
      padding: 0 10px !important;
      overflow: visible !important;
      font-size: 13px !important;

      .yzx {
        color: red;
      }

      .zxz {
        color: blue;
      }

      div {
        min-height: 24px;
      }
    }

    th .cell {
      padding: 0 0px !important;
    }

    /* * 第一条 */
    .wrapRowType-1 {
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 10px;
        top: 50%;
        bottom: -5px;
      }
    }

    .wrapRowType-2 {
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 10px;
        top: -5px;
        bottom: -5px;
      }

      &:after {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 10px;
        top: 50%;
      }
    }

    .wrapRowType-3 {
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-bottom: 1px solid #333;
        left: 10px;
        bottom: 50%;
        top: -5px;
      }
    }
  }

  >>>.u-table::after, .u-table::before {
    background: #cbd5dd;
    display: none;
  }

  >>>.u-table__row td:first-child .cell, >>>.u-table__row td:last-child .cell {
    padding: 0 5px;
    text-align: center;

    >>>.cell {
      padding: 0px;
      text-align: center;
    }
  }

  >>>.u-table__body-wrapper {
    // overflow-x hidden
  }
}
</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
import moment from "moment";
import { addRecord,cancelOrderExecuteApi } from "../../api/index";
import editModal from "../common/edit-modal";
import bus from "vue-happy-bus";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean,
    tableH: Number,
    currentType: String,
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue",
      bus: bus(this),
      isEdit: false,
      typeReason: "", //补执行的原因填写
    };
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("HH:mm") : "";
    },
    ymdhm2(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
    ymd(val) {
      return val ? moment(val).format("YYYY-MM-DD") : "";
    },
    hms(val) {
      return val ? moment(val).format("HH:mm:ss") : "";
    },
    ymdhms(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm") : "";
    },
    handleStatus(val) {
      let allStatus = [
        {
          id: 0,
          name: "未执行",
        },
        {
          id: 1,
          name: "执行中",
        },
        {
          id: 2,
          name: "已完成",
        },
        {
          id: 3,
          name: "暂停",
        },
        {
          id: 9,
          name: "作废",
        },
      ];
      let status = parseInt(val);
      return typeof status == "number"
        ? allStatus.find(item=>item.id===status).name
        : val;
    },
  },
  components: {
    editModal,
  },
  methods: {
    // 取消执行
    cancelOrderExecute(item){
      
      let user = JSON.parse(localStorage.getItem('user'))
      // console.log(user);
      if(!["护长",'护士长'].includes(user.job)){
        this.$message.error('没有权限！')
      }else{
        this.$prompt("请输入取消的原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            let { empNo } = user
            let { barCode } = item
            let cancelReason = value
            console.log(cancelReason);
            cancelOrderExecuteApi({
              empNO:empNo,
              barcode:barCode,
              cancelReason
            }).then((res)=>{
              this.$message.success(res.data.desc)
              this.bus.$emit("loadImplementationList");
            })
          })
          .catch((err) => {
              this.$message.success(err.data.desc)
          });
      }
      
    },
    // 补录
    backTracking(item) {
      if (this.HOSPITAL_ID == "lingcheng") {
        this.$confirm("是否补录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        }).then(() => {
          let data = {
            strJson: JSON.stringify({
              LabelId: item.barCode,
              EmpNo: this.empNo,
              Type: "1",
              tradeCode: "OrderExecute",
            }),
          };
          addRecord(data).then((res) => {
            this.$message.success("补录成功");
            this.bus.$emit("loadImplementationList");
          });
        });
      } else {
        this.$prompt("请输入补执行的原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            let data = {
              barcode: item.barCode, //条码号
              empNO: this.empNo, //执行人
              type: 1, //是否补执行(pda默认传0正常执行  1补执行pc端)
              typeReason: value, //补执行的原因填写
            };
            addRecord(data).then((res) => {
              this.$message.success("补录成功");
              this.bus.$emit("loadImplementationList");
            });
          })
          .catch(() => {});
      }
    },
    editTime(data) {
      this.$refs.editModal.open(data);
    },
    addRowClass(row) {
      if (row.row.executeFlag == 4) {
        return "green";
      } else if (row.row.executeFlag == 1) {
        return "pink";
      }
    },
    // 下拉树切换控制 包裹线显示
    toggleTreeExpand(row, treeExpanded, event) {
      if (this.HOSPITAL_ID == "foshanrenyi") {
        row["showTree"] = !row["showTree"];
      }
    },
    // 包裹线显示
    currentRowClass(row) {
      if (
        !row.children ||
        (row.children && row.children.length && row.showTree)
      ) {
        return `wrapRowType-${row.wrapRowType}`;
      }
    },
  },
  mounted() {
    this.isEdit =
      JSON.parse(localStorage.user) 
      // && JSON.parse(localStorage.user).post == "护长"
        ? true
        : false;
  },
};
</script>
