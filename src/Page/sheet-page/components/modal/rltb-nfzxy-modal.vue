
<template>
  <sweet-modal ref="modalName" title="医嘱执行" class="modal-con">
    <div class="tool-box">
      <span class="label">执行单日期：</span>
      <el-date-picker
        v-model="longDate"
        type="daterange"
        size="small"
        placeholder="选择日期范围"
      >
      </el-date-picker>
      <span class="type-title ">类别：</span>
      <el-select
        v-model="executeType"
        size="small"
        placeholder="请选择">
        <el-option v-for="v in searchArr" :key="v.type" :value="v.value" :label="v.label" />
      </el-select>
      <el-button @click="search" size="small" type="primary">查询</el-button>
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
      style="width: 80vw"
      :height="tableHeight"
      border
    >
      <el-table-column :width="55">
        <template slot-scope="scope">
          <el-checkbox
            class="checkbox"
            :value="scope.row.checked"
            @change="handleCheckbox(scope.row)"
            :disabled="scope.row.disabled"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in columnArr"
        :key="item.id"
        :property="item.property"
        align="center"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <!-- 所有单元格统一渲染,后面改功能的时候绝对不要动这里,要改找我 -->
          <div :style="{ textAlign: item.align || 'center' }">
            {{ scope.row[item.property] }}
          </div>
          <!-- 右侧分组标记 -->
          <div class="cell-box" v-if="item.label == '医嘱名称'">
            <div v-if="scope.row.isFirst">┓</div>
            <div v-if="scope.row.isOrder" class="order">┃</div>
            <div v-if="scope.row.isLast">┛</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 60px"></div>
    <div class="btn-box">
      <div class="btn-group">
        <el-button @click="close">取消</el-button>
        <el-button @click="cleanAllSelection">清空</el-button>
        <el-button
          @click="post"
          :disabled="!multipleSelection.length"
          type="primary"
          >确定</el-button
        >
      </div>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
.modal-con {
  /deep/ * {
    font-size: 12px;
  }
}

.tool-box {
  padding: 5px 20px;
  border: 1px solid rgb(223, 236, 232);
  align-items: center;
  margin-top: 1px;
  display: flex;
  span + div {
    margin-right: 10px;
  }
  .el-date-editor {
    width: 180px;
  }
  /deep/ .el-select {
    width: 100px;
  }
}

.btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 9999;
  border-top: 1px solid rgb(223, 236, 232);
  .btn-group {
    width: 200px;
    margin: 0 auto;
  }
}
.cell-box {
  position: absolute;
  height: 100%;
  right: -3%;
  top: 0;
  z-index: 999;
  div {
    height: 100%;
    position: relative;
    top: 50%;
    transform: translate(0, -20%);
  }
}
/deep/ .el-table .cell,
/deep/ .el-table th > div {
  padding: 5px;
  .checkbox {
    margin-left: 15px;
  }
}

@media screen and (max-width: 1367px) {
  /deep/ .execute-type {
    width: 13vw;
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
  /deep/ .el-date-editor.el-input.el-date-editor--date {
    width: 110px;
  }
}
@media screen and (min-width: 1368px) {
  /deep/ .execute-type {
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
import bus from "vue-happy-bus";
import { getWardExecuteZXY } from "./api";
import { saveBody } from "@/api/sheet.js";
import moment from "moment";
export default {
  props: {
    blockId: {
      type: Number,
      value: "",
    },
  },
  data() {
    return {
      longDate: [moment(), moment()],
      // 表格渲染数据
      tableData: [],
      // 筛选字段数组,说是后面会改成后端维护,等着吧,value是后面入参的,label是页面展示的
      searchArr: [
        { value: "", label: "全部" },
        { value: "输液", label: "输液" },
        { value: "注射", label: "注射" },
        { value: "口服", label: "口服" },
        { value: "雾化", label: "雾化" },
        { value: "皮试", label: "皮试" },
        { value: "治疗", label: "治疗" },
        { value: "理疗", label: "理疗" },
        { value: "护理", label: "护理" },
        { value: "外用", label: "外用" },
        { value: "化验", label: "化验" },
        { value: "其他", label: "其他" },
      ],
      // 医嘱类别
      executeType: "",
      // 表格配置
      columnArr: [
        // {id:0,label:'医嘱号',property:'barcode',width:'170'}, // 分组用,分组错乱或者有疑惑可以解开
        {
          id: 1,
          label: "执行时间",
          property: "ExecuteDateTime",
          width: 140
        },
        { id: 3, label: "医嘱名称", property: "ItemName" },
        { id: 2, label: "类别", property: "Administration" },
        { id: 5, label: "剂量", property: "ItemSpec" },
      ],
      // 分组后暂存对象{'医嘱号':'同组执行单内容数组'}
      groupObj: {},
      // 是否显示加载动画
      loading: true,
      // 事件总线,主要是为了调起保存，刷新页面数据
      bus: bus(this),
    };
  },
  methods: {
    // 弹窗打开事件
    open() {
      this.groupObj = {}; // 初始化弹窗数据
      this.tableData = []; // 初始化弹窗数据
      this.allData = []; // 初始化弹窗数据
      this.loading = true; // 初始化弹窗数据
      let patientInfo = this.$store.state.patient.currentPatient; // 从vuex获取当前患者信息
      // 获取患者的医嘱执行单
      getWardExecuteZXY({
        patientId: patientInfo.patientId, // 患者id
        visitId: patientInfo.visitId, // 住院次数
        beginDate: this.longDate[0]
          ? moment(this.longDate[0]).format("YYYY-MM-DD")
          : "", // 开始时间(对时间参数进行格式化)
        endDate: this.longDate[1]
          ? moment(this.longDate[1]).format("YYYY-MM-DD")
          : "", // 结束时间(对时间参数进行格式化)
        administration: this.executeType, // 执行单类别
        tradeCode: "getOrdersExecuteInfo",
      })
        .then((res) => {
          let code = ''
          const {data = [] } = res.data
          this.tableData = data.map((v,i)=> {
            let next = data[i + 1]
            // 上一个与当前相同
            let sameAsLast = code == v.Barcode
            const obj = {
              isFirst: code != v.Barcode && next && next.Barcode == v.Barcode,
              isOrder: sameAsLast && next && code == next.Barcode,
              isLast: sameAsLast && (next && v.Barcode != next.Barcode || !next),
              ...v,
              checked: false
            }
            code = v.Barcode
            return obj
          }); //有真实接口用这个

          // 取消加载动画
          this.loading = false;
        })
        .catch((e) => {
          // 模拟参数
          // this.tableData = [{
          //   "Barcode": "P8487570820220704080000",
          //   "ItemNo": "75450354",
          //   "PatientId": "0000665594",
          //   "VisitId": "2",
          //   "WardCode": "6107",
          //   "DeptCode": "5160",
          //   "ExecuteDateTime": "2022-07-04 08:00:00.0",
          //   "ItemName": "*异甘草酸镁注射液(天晴甘美）",
          //   "ItemSpec":"50mg* 1支/1",
          //   "OrderNo": "84875798",
          //   "OrderSubNo":"108125876",
          //   "repeatIndicator": "I",
          //   "Dosage": "150",
          //   "DosageUnits": "mg",
          //   "Administration": "VD*",
          //   "Freqeuncy": "1/E",
          //   "GroupNo": "84875708",
          //   "ExecuteType": "N",
          //   "ExecuteFlag": "A",
          //   "StartDateTime": "2022-07-04 14:03:44.0",
          //   "StartNurse": "0690",
          //   "EndNurse": "0690",
          //   "EndNurseCheck": "0690",
          //   "DripSpeed": null,
          //   "UpdateReason": null,
          // }]
          this.loading = false;
        });
      // 打开弹框
      this.$refs.modalName.open();
    },
    // 清空
    cleanAllSelection() {
      // 将当前选中数组的每个元素checked变为false(和tabelData数组中的元素是同地址)
      this.multipleSelection.map((item) => {
        item.checked = false;
      });
    },
    // 确定
    post() {
      // 如果未选中,则不作处理
      if (!this.multipleSelection.length) return;
      let list = [];
      // 此处遍历为了将选中的数据处理为后端需要的入参形式
      this.multipleSelection.map((item) => {
        let {
          ItemName: food,
          ItemSpec: foodSize,
          // executeType: foodChannel,
        } = item;
        let date = item.StartDateTime
          ? item.StartDateTime
          : item.ExecuteDateTime;
        let { recordDate, recordMonth, recordHour } = this.getRecordDate(date);
        list.push({
          recordDate,
          recordMonth,
          recordHour,
          food,
          foodSize,
          // foodChannel,
        });
      });
      let { patientId, visitId } = this.$store.state.patient.currentPatient; // 从vuex获取当前患者信息

      // 发送保存请求
      saveBody(patientId, visitId, { blockId: this.blockId, list }).then(
        (res) => {
          // 请求成功后再调起表单的整单保存，确保页面数据刷新
          this.bus.$emit("saveSheetPage", "noSaveSign");
          // 关闭弹窗
          this.close();
        }
      );
    },
    // 搜索
    search() {
      // 开启加载动画
      this.loading = true;
      // 重新调起初始化事件
      this.open();
    },
    // 关闭
    close() {
      this.loading = true;
      // 关闭弹窗
      this.$refs.modalName.close();
    },
    getRecordDate(date) {
      let recordDate = date;
      let recordMonth = date.substring(5, 10);
      let recordHour = date.substring(11, 16);
      return { recordDate, recordMonth, recordHour };
    },
    // 多选
    handleCheckbox(row) {
      row.checked = !row.checked
      if (row.isFirst) {
        this.tableData.map((v, i) => {
          if (v.Barcode == row.Barcode && !v.isFirst) {
            this.$set(this.tableData[i], 'checked', row.checked)
          }
        });
      }
      // return true
    }
  },
  components: {},
  computed: {
    // 选中数组
    multipleSelection: {
      get() {
        return this.tableData.filter((item) => item.checked);
      },
    },
    // 当前窗口可用高度,用来实现表格高度自适应
    tableHeight() {
      let height = window.screen.availHeight;
      if (height > 768) {
        return 500;
      } else {
        return 250;
      }
    },
  },
  created() {},
};
</script>
