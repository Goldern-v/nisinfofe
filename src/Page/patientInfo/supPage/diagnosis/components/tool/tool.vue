<template>
  <div>
    <div class="tool-contain" flex="cross:center">
      <div
        class="item-box"
        flex="cross:center main:center"
        style="width: 90px"
        @click="openNewDiagnosis"
        :class="{ disabled: !model.selectedBlockId }"
      >
        <div class="text-con" flex="cross:center" v-if="HOSPITAL_ID =='guizhou'">添加护理计划</div>
        <div class="text-con" flex="cross:center" v-else-if="HOSPITAL_ID =='huadu'">添加新计划</div>
        <div class="text-con" flex="cross:center" v-else-if="['lyxrm', 'whhk', 'stmz'].includes(HOSPITAL_ID)"> 添加护理计划</div>
        <div class="text-con" flex="cross:center" v-else>添加新诊断</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="onPrint"
        :class="{disabled: !model.selectedBlockId}"
      >
        <div class="text-con" flex="cross:center">打印</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="del"
        :class="{disabled: !model.selectedBlockId}"
      >
        <div class="text-con" flex="cross:center">删除整单</div>
      </div>
      <div
        v-if="hasExecutionRecord"
        class="item-box"
        flex="cross:center main:center"
        @click="toExecutionRecord"
        :class="{disabled: !model.selectedBlockId}"
      >
        <div class="text-con" flex="cross:center">护理计划单落实情况</div>
      </div>

      <!-- <div
        class="item-box"
        flex="cross:center main:center"
        @click="edit"
        :class="{disabled: !model.selectedRow}"
      >
        <div class="text-con" flex="cross:center">编辑</div>
      </div>

      <div
        class="item-box"
        flex="cross:center main:center"
        @click="stop"
        :class="{disabled: !model.selectedRow}"
      >
        <div class="text-con" flex="cross:center">停止</div>
      </div> -->

      <div flex-box="1"></div>

      <div
        class="item-box"
        flex="cross:center main:center"
        style="width: 160px; margin-right: 10px"
        :class="{
          disabled: !!model.blockList.find(item => item.wardCode == deptCode)
        }"
      >
        <div class="text-con" flex="cross:center" @click="savePlanForm">创建{{HOSPITAL_ID!=='liaocheng'?'新的':''}}护理计划单</div>
      </div>

      <el-select
        v-model="model.selectedBlockId"
        placeholder="请选择护理计划单"
        class="select-con"
        @change="onChangeSelectedBlockId"
      >
        <el-option
          v-for="item in model.blockList"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        ></el-option>
      </el-select>
      <div style="width: 5px;"></div>
    </div>
    <newDiagnosisModal ref="newDiagnosisModal"></newDiagnosisModal>
    <stopDiagnosisModal ref="stopDiagnosisModal"></stopDiagnosisModal>
    <!-- 电子病例弹窗 -->
    <doctorEmr
      v-if="['foshanrenyi'].includes(HOSPITAL_ID)"
    />
  </div>
</template>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus"
  src="./tool.styl"
  scoped
></style>

<style lang="stylus">
.diagnosis-con-select {
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 562px !important;
  left: auto !important;
  right: 120px;

  .el-select-dropdown__list, .el-select-dropdown__item {
    padding: 0;
    height: auto;
  }

  .el-select-dropdown__wrap {
    max-height: 500px;
  }

  .head-con {
    height: 37px;
    background: #F7FAFA;
    border-bottom: 1px solid #EAEEF1;
    font-size: 13px;
    color: #333333;
    font-weight: bold;
  }

  .col-1, .col-2, .col-3, .col-4 {
    display: flex;
    align-items: center;
  }

  .col-1 {
    width: 192px;
    padding: 0 24px;
    border-right: 1px solid #EAEEF1;
  }

  .col-2 {
    width: 126px;
    padding: 0 16px;
    border-right: 1px solid #EAEEF1;
  }

  .col-3 {
    width: 133px;
    padding: 0 14px;
    border-right: 1px solid #EAEEF1;
  }

  .col-4 {
    width: 80px;
    padding: 0 14px;
  }

  .list-con {
    font-size: 13px;
    color: #333333;
    height: 37px;
    border-bottom: 1px solid #EAEEF1;
  }

  .el-select-dropdown__item.selected {
    background: #fff;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      height: 20px;
      width: 4px;
      background: #4bb08d;
    }
  }

  .el-select-dropdown__item.hover {
    background: #fff;
  }

  .el-select-dropdown__item:hover {
    background: #E5F1F0;
  }
}

.red-border {
  border: 2px solid red !important;
}
</style>

<script>
import bus from "vue-happy-bus";
import $ from "jquery";
import dayjs from "dayjs";
import newDiagnosisModal from "../../modal/newDiagnosisModal";
import stopDiagnosisModal from "../../modal/stopDiagnosisModal";
import doctorEmr from "@/components/doctorEmr";
import { model } from "../../diagnosisViewModel";
import { nursingDiagsDelAll, savePlanForm } from "../../api/index";
import common from "@/common/mixin/common.mixin";
export default {
  inject: ["openSlideCon"],
  mixins: [common],
  data() {
    return {
      model,
      bus: bus(this),
      selectBlock: "",
      sheetBlockList: [],
      hasExecutionRecord: ['lyxrm'].includes(this.HOSPITAL_ID)
    };
  },
  methods: {
    toExecutionRecord() {
      this.$emit('toExecutionRecordPage');
    },
    changeSelectBlock() {},
    openNewDiagnosis() {
      this.$refs.newDiagnosisModal.open();
    },
    verify() {
      if (model.selectedRow === null) {
        this.$message.warning("请点击选择一条护理诊断");
        return false;
      }
      return true;
    },
    edit() {
      if (!this.verify()) return;
      this.openSlideCon({
        id: model.selectedRow.id,
        code: model.selectedRow.diagCode,
        name: model.selectedRow.diagName,
        definition: model.selectedRow.definition
      });
    },
    del() {
      this.$confirm("你确定要删除诊断？", "提示",
                    {confirmButtonText: "删除",cancelButtonText: "取消",type: "warning",}
                    ).then((res) => {
                  nursingDiagsDelAll(this.model.selectedBlockId).then(res => {
                    this.$message.success("删除成功");
                    this.model.selectedBlockId = ''
                    this.model.blockList = []
                    model.refreshTable();
                    this.model.refreshBlock();
                    model.selectedRow = null;
                  });
      });
    },
    stop() {
      if (!this.verify()) return;
      this.$refs.stopDiagnosisModal.open();
    },
    savePlanForm() {
      console.log();
      if(!this.$route.query.patientId){
        this.$message.warning("请点击选择一名患者");
        return
      }
      let obj = {
        patientId: this.$route.query.patientId,
        visitId: this.$route.query.visitId,
        wardCode: this.deptCode
      };
      savePlanForm(obj).then(res => {
        this.$message.success("创建成功");
        this.model.refreshBlock();
      });
    },
    onChangeSelectedBlockId() {
      this.model.selectedBlock =
        this.model.blockList.find(
          item => item.id === this.model.selectedBlockId
        ) || {};
      this.model.refreshTable&&this.model.refreshTable();
    },
    onPrint() {
      this.bus.$emit("printDiagnosis");
    }
  },
  mounted() {
    this.model.newDiagnosisModal = this.$refs.newDiagnosisModal;
  },
  components: {
    newDiagnosisModal,
    stopDiagnosisModal,
    doctorEmr
  }
};
</script>
