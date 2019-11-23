<template lang="html" src="./birth-certificate.html">
</template>

<script>
import commonMixin from "./../../common/mixin/common.mixin";
import customPagenation from "./components/pagination";
import editModal from "./components/editModal";
import createModal from "./components/createModal";
import moment from "moment";
import {
  getList,
  saveBirthCertInfo,
  deleteForm,
  getPatEmrList
} from "./api/api";

export default {
  components: {
    customPagenation,
    editModal,
    createModal
  },
  mixins: [commonMixin],
  data() {
    // 设置起止时间
    let nowDate = new Date();
    let nowtDay = nowDate.getDay();
    let nowTime = nowDate.getTime();
    let reduceDay = 0;
    let addDay = 0;
    if (nowtDay == 0) {
      reduceDay = 6;
      addDay = 0;
    } else {
      reduceDay = nowtDay - 1;
      addDay = 7 - nowtDay;
    }

    let beginTime = moment(new Date(nowTime - reduceDay * 86400000)).format(
      "YYYY-MM-DD"
    );
    let endTime = moment(new Date(nowTime + addDay * 86400000)).format(
      "YYYY-MM-DD"
    );

    return {
      query: {
        beginTime: beginTime,
        endTime: endTime,
        keyWord: "",
        pageIndex: 1,
        pageSize: 6
      },
      activeCell: { row: "", name: "" },
      fileTotal: 0,
      tableHeight: 0,
      tableData: [],
      eduOptions: ["文盲", "小学", "中学", "大专", "大专以上"],
      childBirthWayOptions: [
        "顺产",
        "吸引产",
        "钳产",
        "剖宫产",
        "臀助产",
        "臀牵引",
        "院外分娩"
      ],
      sexOptions: ["男", "女"],
      birthCertificateNumOptions: ["有", "无"],
      hadOxytocinOptions: ["是", "否"],
      perineumSituationOptions: ["/", "√"],
      tableLoading: false,
      editCfg: {
        idx: "",
        title: "",
        value: "",
        name: "",
        type: "",
        options: [],
        visible: false
      },
      createVisible: false,
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: "tableContext",
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menulists: [
          {
            fnHandler: "savedata", // Binding events(绑定事件)
            icoName: "fa fa-home fa-fw", // icon (icon图标 )
            btnName: "选项1" // The name of the menu option (菜单名称)
          },
          {
            fnHandler: "deleteRow",
            icoName: "fa fa-home fa-fw",
            btnName: "删除行测试"
          }
        ],
        row: null,
        column: null
      }
    };
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener("resize", this.handelResize);

    this.getTableData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handelResize);
  },
  methods: {
    signUrl(empNo) {
      if (!empNo) return "";
      return `/crNursing/api/file/signImage/${empNo}?${this.token}`;
    },
    getTableData() {
      this.tableLoading = true;
      let query = { ...this.query };

      let startDateType = Object.prototype.toString.call(query.beginTime);
      if (startDateType == "[object Date]")
        query.beginTime = moment(query.beginTime).format("YYYY-MM-DD");
      else if (!query.beginTime) query.beginTime = "";

      let endDateType = Object.prototype.toString.call(query.endTime);
      if (endDateType == "[object Date]")
        query.endTime = moment(query.endTime).format("YYYY-MM-DD");
      else if (!query.endTime) query.endTime = "";

      getList(query).then(
        res => {
          this.tableLoading = false;
          if (res.data.data) {
            let data = res.data.data;
            this.tableData = this.formatList(data.list);
            this.fileTotal = data.totalCount;
          }
        },
        err => {
          this.tableLoading = false;
        }
      );
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 18 || columnIndex == 19) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    formatList(list) {
      let newList = [];
      //增加产科丈夫信息行
      for (let i = 0; i < list.length; i++) {
        newList = newList.concat([{ ...list[i] }, { ...list[i] }]);
      }

      return newList;
    },
    handleCurrentChange(page) {
      this.getTableData();
    },
    handleSizeChange(size) {
      this.getTableData();
    },
    handelResize() {
      let tableHeight = document.querySelector(".main-contain .table-contain")
        .offsetHeight;
      this.tableHeight = tableHeight;
    },
    handleDateChange() {
      this.query.pageIndex = 1;
      this.getTableData();
    },
    handleSearch() {
      this.query.pageIndex = 1;
      this.getTableData();
    },
    formatDate(date, format) {
      if (!date) return "";

      format = format || "YYYY-MM-DD";
      // if (!(date instanceof Date)) date = date.replace(/\//g, "");

      return moment(date).format(format);
    },
    rowClassName(payload) {
      let rowIdx = payload.rowIndex + 1;
      if (rowIdx % 4 == 0 || rowIdx % 4 == 3) return "el-table__row--striped";

      return "";
    },
    cellClassName(payload) {
      return "";
      if (this.tableData.indexOf(payload.row) != this.activeCell.row) return "";
      if (payload.column.property != this.activeCell.name) return "";

      return "active-cell";
    },
    handleCellEnter(row, column, cell, event) {
      this.activeCell = {
        row: this.tableData.indexOf(row),
        name: column.property
      };
    },
    handleCellLeave(row, column, cell, event) {
      this.activeCell = {
        row: "",
        name: ""
      };
    },
    handleRowContextmenu(row, column, event) {
      return null;

      event.preventDefault();
      // console.log(row, column, event);
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData.axis = { x, y };
      this.contextMenuData.row = row;
      this.contextMenuData.column = column;
    },
    saveData(params, success, error) {
      saveBirthCertInfo(params).then(
        res => {
          success && success(res);
        },
        err => {
          error && error(err);
        }
      );
    },
    handleEditDone(idx, name) {
      let otherIdx;
      if (idx % 2 == 1) {
        otherIdx = idx - 1;
      } else {
        otherIdx = idx + 1;
      }

      //同时修改产妇及丈夫两列信息并保存 不重新请求列表接口
      if (this.tableData[idx][name] !== this.tableData[otherIdx][name]) {
        this.tableData[otherIdx][name] = this.tableData[idx][name];

        this.saveData(this.tableData[idx], () => {
          this.$message.success({ message: "修改成功" });
        });
      }
    },
    handleNumInput(val, idx, name) {
      if (!val) {
        val = "";
        this.tableData[idx][name] = "";
        return;
      }

      let newVal = parseInt(val).toString();
      let valChange = false;
      if (isNaN(Number(newVal))) {
        newVal = this.tableData[idx][name];
        valChange = true;
      }

      if (newVal.length !== val.length) valChange = true;

      this.tableData[idx][name] = newVal;

      if (valChange)
        setTimeout(() => {
          let el = document.querySelector(`.${name + idx} textarea`);
          if (el) el.value = newVal;
        });
    },
    deleteRow() {
      // let idx= this.tableData.indexOf(this.contextMenuData.row);
      // if(idx%2!==0)idx = idx-1;
      // this.tableData.splice(idx,1)
      // this.tableData.splice(idx,1)
      // console.log('deleteRow')
      this.deleteRecord(this.contextMenuData.row);
    },
    deleteRecord(record) {
      this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(
          () => {
            return deleteForm(record.id);
          },
          err => {}
        )
        .then(
          res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.getTableData();
          },
          err => {}
        );
    },
    seeRecord(item) {
      localStorage.setItem("birthCertificateFormView", JSON.stringify(item));
      this.$router.push(
        "/birthCertificateForm?patientId=" +
          item.patientId +
          "&visitId=" +
          "&id=" +
          item.id +
          item.visitId +
          "&type=view"
      );
    },
    handleCellClick(row, column, cell, event) {
      let rowIdx = this.tableData.indexOf(row);
      let editName = column.property;
      let title = column.label;
      let editType = "input";
      let options = [];
      let editValue = null;
      let modalVisible = true;

      switch (column.property) {
        case "分娩时间-年":
        case "分娩时间-月":
        case "分娩时间-日":
        case "分娩时间-时":
        case "分娩时间-分":
          title = "分娩时间";
          editName = "childBirthTime";
          editType = "dateTime";
          if (moment(row[editName]).format("YYYY-MM-DD") == "Invalid Date")
            editValue = "";
          break;
        case "natureBrokenMenbraneTime":
        case "artiBrokenMembraneTime":
          if (moment(row[editName]).format("YYYY-MM-DD") == "Invalid Date")
            editValue = "";
          editType = "dateTime";
          break;
        default:
          modalVisible = false;
          return;
      }

      if (modalVisible) {
        if (editValue === null) editValue = (row[editName] || "").toString();

        if (column.property)
          this.openEditModal({
            idx: this.tableData.indexOf(row),
            name: editName,
            value: editValue,
            type: editType,
            title,
            options
          });
      } else {
      }
    },
    openEditModal(payload) {
      this.editCfg = {
        ...this.editCfg,
        ...payload,
        visible: true
      };
    },
    handleEditOk(payload) {
      let target = this.tableData[this.editCfg.idx];

      target[this.editCfg.name] = this.editCfg.value;

      payload.modal.saveLoading = true;

      this.saveData(
        target,
        () => {
          this.getTableData();
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.editCfg.visible = false;
          payload.modal.saveLoading = false;
        },
        () => {
          payload.modal.saveLoading = false;
        }
      );
    },
    handleCreate() {
      this.createVisible = true;
    },
    handleSign(record, name) {
      name = name.replace("Name", "Id");
      let isCancel = false;

      if (record[name] != "") isCancel = true;

      window.openSignModal(
        (password, empNo, signDate) => {
          // console.log(password,empNo,signDate)
          let params = { ...record };

          if (isCancel)
            if (empNo != params[name]) {
              this.$message({
                message: "非本人操作,不能取消签名",
                type: "error"
              });
              return;
            }

          params[name] = isCancel ? "" : empNo;

          // console.log(params)
          this.saveData(params, () => {
            this.getTableData();
            this.$message({
              message: "操作成功",
              type: "success"
            });
          });
        },
        isCancel ? "取消签名" : "接生者签名",
        false
      );
    },
    handleCreateOk() {
      this.createVisible = false;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss">
@import "./assets/puerperantSituation.scss";
</style>

<style lang="scss" scoped>
@import "./assets/puerperantSituation.scope.scss";
</style>