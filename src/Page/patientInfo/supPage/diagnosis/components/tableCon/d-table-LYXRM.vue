<template>
  <div class="diagnosis-table">
    <div class="edit-table">
      <iview-table
        stripe
        border
        :data="formatTableData"
        :height="wih - 290"
        :columns="columns"
        :span-method="handleSpan"
      />
    </div>

    <div class="print-table">
      <iview-table
        stripe
        border
        :data="formatTableData"
        :height="wih - 290"
        :columns="printColumns"
        :span-method="handleSpan"
      />
    </div>
    <stopDiagnosisModal ref="stopDiagnosisModal"></stopDiagnosisModal>
    <UpdateDiagModal ref="updateDiagModal" @onAfterSign="onMeasureUpdate"></UpdateDiagModal>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import { model } from "../../diagnosisViewModel";
import {
  nursingDiagsDel,
  savePlanForm,
  doDiagsSign,
  nursingDiagsUpdate,
  updateDiagPlan
} from "../../api/index";
import stopDiagnosisModal from "../../modal/stopDiagnosisModal";
import UpdateDiagModal from "../../modal/UpdateDiagModal";
const statusCode = {
  DELETE: '0',
  CREATE: '1',
  STOP: '2',
}
export default {
  mixins: [common],
  props: ["tableData"],
  inject: ["openSlideCon", "openSlideContant"],
  data() {
    return {
      model,
      endTime: "",
      choseID: "",
      choseName: "",
      choseCode: "",
      choseDiagFactor: "",
      measureStr2: "",
      factorStr2: "",
      updateRow: {},
      updateStatus: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      // none-div是columns中children元素定义的类名，表头跨列，不需要显示子表头
      const noneDiv = document.getElementsByClassName('none-div');
      for (let i = 0; i < noneDiv.length; i++) {
        // th.style.display = "none";
        noneDiv[i].parentElement.parentElement.style.display = 'none';
      }
    })
  },
  computed: {
    formatTableData() {
      if (this.tableData) {
        const formatData = [];
        for (let i = 0; i < this.tableData.length; i++) {
          const rowData = this.tableData[i];
          if (rowData && rowData.diagPlanList && rowData.diagPlanList.length) {
            for (let j = 0; j < rowData.diagPlanList.length; j++) {
              const item = rowData.diagPlanList[j] || {};
              formatData.push({
                ...rowData,
                planMaster: item,
              });
            }
          } else {
            formatData.push(rowData);
          }
        }
        return formatData;
      }
      return [];
    },
    columns() {
      return [
        {
          key: 'index',
          title: '序号',
          align: 'center',
          width: 60,
        },
        {
          key: 'diagName',
          title: '护理问题',
          align: 'center',
          minWidth: 80,
        },
        {
          key: '',
          title: '护理措施计划',
          align: 'center',
          minWidth: 160,
          children: [
            {
              key: 'measureName',
              title: '',
              align: 'center',
              minWidth: 160,
              renderHeader(h, { col, index }) {
                return h('div', { class: 'none-div', style: { display: 'none' } })
              },
              render(h, { row, column, index }) {
                return (
                  <div style="text-align: left">
                    { row.planMaster && row.planMaster.measureName }
                  </div>
                )
              }
            },
            {
              key: 'measureButton', // 这个key用在 span-method，改的话方法里也记得改
              title: '',
              align: 'center',
              width: 45,
              renderHeader(h, { col, index }) {
                return h('div', { class: 'none-div', style: { display: 'none' } })
              },
              render: (h, { row, column, index }) => {
                // 为什么用 h 函数，因为标签在render函数无法使用v-slot
                return (
                  <el-tooltip effect="light" placement="bottom" trigger="click">
                    <div style="color: blue">操作</div>
                    {
                      h('div', { slot: 'content', style: { display: 'flex', flexDirection: 'column' } }, [
                        h('el-button',
                          {
                            props: { type: 'text', disabled: this.isDisabled(row, statusCode.STOP) },
                            on: { click: () => this.openModalByStatus(row, statusCode.STOP) }
                          },
                          '停止'
                        ),
                        h('el-button',
                          {
                            props: { type: 'text', disabled: this.isDisabled(row) },
                            on: { click: () => this.openModalByStatus(row, statusCode.DELETE) },
                            style: { marginLeft: '0px' }
                          },
                          '删除'
                        ),
                        h('el-button',
                          {
                            props: { type: 'text' },
                            on: { click: () => this.openModalByStatus(row, statusCode.CREATE) },
                            style: { marginLeft: '0px' }
                          },
                          '新增'
                        )
                      ])
                    }
                  </el-tooltip>
                )
              }
            },
          ]
        },
        {
          key: 'targetsName',
          title: '护理目标',
          align: 'center',
          minWidth: 160,
          render: (h, { row, column, index }) => {
            return (
              <div style="text-align: left">
                {row.targetsName.length
                  ? row.targetsName.map((item) => {
                      return (
                        <span>{ item && item.parameter }</span>
                      )
                    })
                  : h(
                      'span',
                      { domProps: {
                          innerHTML: `${row.diagTarget && (row.diagTarget.replace(/\n/g, '<br><br>'))}`
                        }
                      }
                    )
                }
              </div>
            )
          }
        },
        {
          key: 'beginTime',
          title: '开始时间',
          align: 'center',
          width: 90,
        },
        {
          key: 'endTime',
          title: '停止时间',
          align: 'center',
          width: 90,
        },
        {
          key: 'evalType',
          title: '护理评价',
          align: 'center',
          minWidth: 80,
        },
        {
          key: 'evalContent',
          title: '评价说明',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '操作',
          align: 'center',
          width: 95,
          render: (h, { row, column, index }) => {
            return (
              <div class="tool-con">
                {
                  row.status == 1 &&
                  <div
                    class="tool-btn"
                    style="color: blue"
                    onClick={() => this.stop(row)}
                  >停止
                  </div>
                }
                {
                  row.status == 1 &&
                  <div
                    class="tool-btn"
                    style="color: red"
                    onClick={() => this.del(row)}
                  >删除
                  </div>
                }
                <div
                  class="tool-btn"
                  onClick={() => this.edit(row)}
                >查看详情
                </div>
              </div>
            )
          }
        }
      ]
    },
    printColumns() {
      const noneButtonColumns = this.columns.slice(0, this.columns.length - 1);
      const columns = [];
      noneButtonColumns.forEach(col => {
        let column = { ...col };
        if (col.children && col.children.length) {
          const children = col.children.filter(child => child.key !== 'measureButton');
          column.children = children;
        }
        columns.push(column);
      });
      return columns;
    }
  },
  methods: {
    async onMeasureUpdate(data, text) {
      try {
        const params = {
          empNo:        data.empNo,
          measureList:  data.measureList,
          beginTime:    data.beginTime,
          stopTime:     data.stopTime,
          id:           this.updateRow.id,
          creator:      this.updateRow.creator,
          patientId:    this.updateRow.patientId,
          visitId:      this.updateRow.visitId,
          patientName:  this.updateRow.patientName,
          bedLabel:     this.updateRow.bedLabel,
          code:         this.updateRow.diagCode,
          name:         this.updateRow.diagName,
          planMaster:   this.updateRow.planMaster,
          status:       this.updateStatus,
          wardCode:     model.selectedBlock.wardCode,
        }
        await updateDiagPlan(params);
        this.$message.success(`${text || '操作'}成功`)
        this.$emit('onReload')
      } catch (error) {
        throw error;
      } finally {

      }
    },
    openModalByStatus(row, status) {
      this.updateRow = row;
      this.updateStatus = status;
      if (status === statusCode.STOP) {
        return this.$refs.updateDiagModal.open(row);
      }
      if (status === statusCode.DELETE) {
        this.$confirm('删除记录后，将同步删除改措施的执行记录，请确认是否删除？', '温馨提示', {
          confirmButtonText: '签名确认',
          cancelButtonText: '取消',
          cancelButtonClass: 'el-button--small',
          confirmButtonClass: 'el-button--small',
          type: 'warning'
        }).then(() => {
          window.openSignModal((password, empNo) => {
            this.onMeasureUpdate({ password, empNo }, '删除');
          }, '签名确认');
        }).catch(() => {});
        return;
      }
      if (status === statusCode.CREATE) {
        return this.onMeasureCreate(row);
      }
    },
    onMeasureCreate(row) {
      model.selectedRow = row;
      this.openSlideCon({
        id: model.selectedRow.id,
        code: model.selectedRow.diagCode,
        name: model.selectedRow.diagName,
        definition: model.selectedRow.definition,
        callback: (data) => this.onMeasureUpdate(data, '新增'),
        isCreate: true
      });
    },
    isDisabled(row, status) {
      if (status && status === statusCode.STOP) {
        console.log('object', row);
        return !row.planMaster || row.planMaster.status === statusCode.STOP;
      }
      return !row.planMaster;
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      if (['measureName', 'measureButton'].includes(column.key)) {
        return { rowspan: 1, colspan: 1 };
      } else {
        if (rowIndex === 0 || this.formatTableData[rowIndex].id !== this.formatTableData[rowIndex - 1].id) {
          return {
            rowspan: Math.max(row.diagPlanList.length, 1),
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 1
          };
        }
      }
    },
    onCellClick(row, column, cell, event) {
      if (["signerName", "evalContentSign"].includes(column.property)) {
        const type = column.property == "signerName" ? "1" : "2";
        let text = row[column.property] ? "取消签名" : "签名";
        this.onSign({ id: row.id, type }, text);
      }
    },
    onSign(data = {}, text) {
      window.openSignModal((password, empNo) => {
        const params = { ...data, empNo, password };
        doDiagsSign(params)
          .then(() => {
            this.$message.success(`${text}成功`);
            model.refreshTable();
          })
          .catch(error => {
            this.$message.error(`${text}失败`);
          });
      }, text);
    },
    choseId(row) {
      this.choseID = row.id;
      this.choseName = row.diagName;
      this.choseCode = row.diagCode;
      this.choseDiagFactor = row.diagFactor;
      this.measureStr2 =
        (row.measuresName.length > 0 && row.measuresName.join(" ")) ||
        row.diagMeasures;
      this.factorStr2 =
        (row.targetsName.length > 0 && row.targetsName.join(" ")) ||
        row.diagTarget;
    },
    timeChange(val, row, type) {
      window.openSignModal((password, empNo) => {
        const params = {
          creator: password,
          empNo,
          id: this.choseID,
          patientId: this.$route.query.patientId,
          visitId: this.$route.query.visitId,
          patientName: this.$route.query.name,
          bedLabel: this.$route.query.bedLabel,
          code: this.choseCode,
          name: this.choseName,
          measureStr: this.measureStr2,
          targetStr: this.factorStr2,
          factorStr: this.choseDiagFactor,
          wardCode: model.selectedBlock.wardCode
        };
        params.endTime = val;
        nursingDiagsUpdate(params).then(res => {
          this.$message.success("保存成功");
          model.newDiagnosisModal.close();
          model.refreshTable();
          this.$store.commit("upMeasureGuizhou", {
            measure: "",
            target: ""
          });
        });
      });
    },
    selectedRow(row) {
      // model.selectedRow = row;
    },
    tableRowClassName(row) {
      // if (row.id == (this.model.selectedRow && this.model.selectedRow.id)) {
      //   return "selected-row";
      // }
    },
    edit(row) {
      model.selectedRow = row;
      this.openSlideCon({
        id: model.selectedRow.id,
        code: model.selectedRow.diagCode,
        name: model.selectedRow.diagName,
        definition: model.selectedRow.definition
      });
      this.openSlideContant({
        id: model.selectedRow.id,
        code: model.selectedRow.diagCode,
        name: model.selectedRow.diagName,
        definition: model.selectedRow.definition
      });
    },
    del(row) {
      // if (!this.verify()) return;
      model.selectedRow = row;
      row.patientName = this.$route.query.name;
      row.sex = this.$route.query.sex;
      row.age = this.$route.query.age;
      window.openSignModal(
        (password, empNo) => {
          nursingDiagsDel(password, empNo, model.selectedRow.id).then(res => {
            this.$message.success("删除成功");
            model.refreshTable();
            model.selectedRow = null;
          });
        },
        "你确定要删除诊断？",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "planForm"
      );
    },
    stop(row) {
      model.selectedRow = row;
      this.$refs.stopDiagnosisModal.open();
    }
  },
  created() {},
  components: {
    stopDiagnosisModal,
    UpdateDiagModal
  }
};
</script>

<style lang="scss" scoped>
.diagnosis-table {
  position: relative;
  overflow: hidden;
  /deep/ .ivu-table th {
    height: 30px;
    .ivu-table-cell {
      font-size: 12px;
      font-weight: 400;
      color: #000;
      background: #f4f2f4;
    }
  }

  /deep/ .ivu-table {
    .el-date-editor--datetime {
      .el-input__icon {
        display: none;
      }
      .el-input__inner {
        width: 100%;
        padding-right: 0 !important;
      }
    }
    .el-date-editor.el-input {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    /* th {
      border-left: 1px solid #000 !important;
      border-right: 1px solid #000 !important;
      border-bottom: 1px solid #000 !important;
    }
    td {
      border: 1px solid #000 !important;
    } */
    .ivu-table-cell {
      padding: 0 5px;
    }
    .selected-row td {
      background: #fff8b1 !important;
    }
    .el-table__body-wrapper {
      margin-top: -1px;
    }
    .tool-con {
      padding: 5px;
    }
    .tool-btn {
      text-align: center;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
  }
  .print-table {
    /* visibility: hidden; */
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: 1500px;
  }
  /deep/.el-popover {
    .flex-column {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    }
  }
}
/deep/.el-button + .el-button {
  margin-left: 0;
}
/deep/.el-message-box .el-message-box__btns {
  text-align: center;
}
</style>
