<template lang="html" src="./createModal.html"></template>

<script>
import commonMixin from "./../../../common/mixin/common.mixin";
import moment from "moment";
import { setTimeout } from "timers";
import { getPatientInfo } from "@/api/common.js";
import { getPuerperaInfo, getPatientListNew } from "../api/api";

export default {
  mixins: [commonMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      searchingContent: "",
      patientList: [],
      patientListFiltered: [],
      searchResult: "点击查询匹配产妇姓名",
      dialogVisible: false,
      saveLoading: false,
      isMatch: null, //是否匹配到
      searchingContent: ""
    };
  },
  mounted() {
    console.log(2);
    getPatientListNew().then(res => {
      if (res.data.data) {
        this.patientList = this.formatPatientList(res.data.data);
        this.patientListFiltered = this.patientList.concat();
      }
    });
  },
  methods: {
    patientsFilterMethod(search) {
      this.searchingContent = search;
      this.params.female = search;

      this.filterSearch = search;
    },
    patientOptionVisible(item, search) {
      if (!search) return true;
      if (new RegExp(search).test(item.patientId)) return true;

      if (new RegExp(search).test(item.bedLabel)) return true;

      if (new RegExp(search).test(item.name)) return true;
      return false;
    },
    formatPatientList(list) {
      let newList = [];
      newList = list.filter(item => {
        if (!item.name || item.name == "") return false;
        if (!item.patientId) return false;
        if (item.bedLabel.includes("_") || item.patientId.includes("_"))
          return false;
        return true;
      });

      return newList;
    },
    handlePatinentChange(patientOptionVal) {
      let searchingContent = patientOptionVal.split(" ")[0];
      let patientId = patientOptionVal.split(" ")[1] || null;

      if (!patientId) return;
      let target = this.patientList.find(item => item.patientId == patientId);
      if (target) {
        //清除数据
        for (let x in this.params) {
          if (x !== "searchingContent" && x !== "patientId")
            this.params[x] = "";
        }

        this.params.female = target.name;
        this.params.hospitalizationNumber = target.inpNo;
        this.params.patientId = target.patientId;
      }
    },
    handleClose() {
      this.$emit("update:visible", false);
      this.$emit("onCancel", false);
    },
    // handleSave() {
    //   let errMsg = "";

    //   if (!params.hospitalizationNumber) errMsg = "未选择产妇";

    //   // if (errMsg) {
    //   //   this.$message({
    //   //     message: errMsg,
    //   //     type: "warning"
    //   //   });
    //   //   return;
    //   // }

    //   // return console.log(params)
    //   this.saveLoading = true;
    //   // changeOrSaveForm(params).then(
    //   //   res => {
    //   //     this.$message({
    //   //       message: "创建成功",
    //   //       type: "success"
    //   //     });
    //   //     this.saveLoading = false;
    //   //     this.$emit("onOk");
    //   //   },
    //   //   res => {
    //   //     this.saveLoading = false;
    //   //   }
    //   // );
    // },
    getPuerperaInfo() {
      this.saveLoading = true;
      let data = {
        startDate: "",
        endDate: "",
        pageIndex: this.query.pageIndex,
        pageSize: this.query.pageSize,
        searchingContent: this.searchingContent
      };
      getPuerperaInfo(data).then(res => {
        this.saveLoading = false;
        if (res.data.data && res.data.data.list) {
          let data = res.data.data.list;
          if (data.length) {
            this.isMatch = true;
            this.puerperaInfo = data[0];
            this.searchResult = data[0].female;
          } else {
            this.isMatch = false;
            this.searchResult = "匹配失败，请校对ID";
          }
        }
      });
    },
    searchPuerpera() {
      this.getPuerperaInfo();
    },
    handleSave() {
      this.handleClose();
      setTimeout(() => {
        this.$router.push(
          "/birthCertificateForm?patientId=" + this.puerperaInfo.patientId
        );
      }, 1000);
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
      if (!val) {
        if (this.$refs.modal.is_open) this.$refs.modal.close();
        // this.searchingContent=''
        // for(let x in this.params){
        //   this.params[x]=''
        // }
      } else {
        this.isMatch = null;
        this.searchingContent = "";
        this.searchResult = "点击查询匹配产妇姓名";
        this.$refs.modal.open();
      }
    },
    value(val) {
      if (val !== this.editValue) this.editValue = val;
    }
  }
};
</script>

<style lang="scss">
.birth-certificate-create-modal {
  .el-select {
    width: 100%;
    .el-input {
      .el-input__inner {
        height: 32px;
      }
    }
  }
  .sweet-modal {
    max-height: none;
  }
  .sweet-content {
    padding: 33px 25px 44px;
  }
  .model-content {
    padding: 0 !important;
    .content {
      display: inline-block;
    }
    .search {
      font-size: 12px;
      color: #333;
      line-height: 37px;
      padding-bottom: 15px;
      .el-select {
        width: 218px;
      }
      input {
        width: 218px;
        height: 37px;
        padding-left: 14px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #c2cbd2;
        &:focus {
          border-color: #4bb08d;
          outline: none;
        }
      }
      button {
        width: 65px;
        height: 37px;
        background-color: #fff;
        border: 1px solid #cbd5dd;
        margin-left: 10px;
        cursor: pointer;
        outline: none;
      }
    }
    .searchResult {
      width: 350px;
      background: rgba(246, 246, 246, 1);
      border-radius: 9px;
      font-size: 26px;
      color: #ccc;
      text-align: center;
      line-height: 37px;
      padding-top: 44px;
      padding-bottom: 44px;
    }
    .matchSuc {
      color: #333;
    }
    .matchErr {
      color: #fd4639;
    }
  }
}
</style>