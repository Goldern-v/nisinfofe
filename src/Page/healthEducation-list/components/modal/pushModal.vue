<template>
  <sweet-modal
    ref="modalName"
    class="satisfy-modal-1577412732265"
    title="推送"
    @close="onClose"
    :modalWidth="480"
  >
    <div class="content">
      <div class="clum">
        <span class="label">推送内容：</span>
        <el-input
          size="medium"
          disabled
          style="width: 300px;margin-right: 15px;"
          value="医院满意度调查表"
          prefix-icon="el-icon-search"
        ></el-input>
      </div>
      <div class="clum">
        <span class="label">科 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：</span>
        <el-select
          style="width: 300px;margin-right: 15px;"
          v-model="deptValue"
          filterable
          placeholder="请选择科室"
          size="medium"
          class="dept-select"
          autocomplete="off"
          @change="changeDept(deptValue)"
        >
          <el-option
            v-for="item in deptList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </div>
      <div class="clum">
        <span class="label">患 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：</span>
        <el-select
          style="width: 300px;margin-right: 15px;"
          placeholder="请选择患者"
          size="medium"
          v-model="patientIdList"
          @change="changePatient"
          multiple
        >
          <el-option value="allPatients" :label="`全部（未推送患者共${allNoPush}人）`"></el-option>
          <el-option
            v-for="item in patientList"
            :key="item.patientId"
            :label="`${item.bedNo}床 ${item.name}`"
            :value="item.patientId"
            :disabled="allCheck || item.push"
          >
            <span style="float: left">{{ `${item.bedNo}床 ${item.name}` }}</span>
            <span style="float: right" v-if="item.push">（已推送）</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
.content {
  width: 100%;
  padding: 15px 40px;
  box-sizing: border-box;
  .clum {
    margin-top: 10px;
  }
}

.satisfy-modal-1577412732265 {
  /deep/ .sweet-modal {
    height: 300px;
  }
  /deep/ .sweet-modal .sweet-content {
    height: 200px;
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import { blockList } from "@/Page/sheet-page/api/index.js";
import { nursingUnit, getByDeptCode, push } from "../../api/index";
export default {
  props: {},
  mixins: [common],
  data() {
    return {
      id: "",
      data: {},
      onOkCallBack: null,
      deptValue: "",
      deptList: [],
      patientList: [], // 患者列表
      patientIdList: [], // 患者id
      allPatients: [], // 患者patientId visitId
      allNoPush: 0, // 未推送患者人数
      allCheck: false // 是否选择全部未推送患者 --true为是
    };
  },
  methods: {
    async open(onOkCallBack) {
      await this.getPatientData();
      this.$refs.modalName.open();
    },
    // 获取所有患者数据
    getPatientData() {
      getByDeptCode(this.deptValue, "F0001").then(res => {
        this.allNoPush = res.data.data.size;
        this.patientList = res.data.data.patList;
      });
    },
    // 弹窗确认处理入参数据
    async post() {
      let params = [];
      if (this.patientIdList.length === 0) {
        this.$message.warning("请至少选中一个患者");
        return;
      }
      if (
        this.patientIdList.length === 1 &&
        this.patientIdList[0] === "allPatients"
      ) {
        let arr = this.patientList.filter(a => !a.push);
        let obj = {};
        arr.map(item => {
          let obj = {
            patientId: item.patientId,
            visitId: item.visitId
          };
          params.push(obj);
        });
      } else {
        this.patientIdList.map(item => {
          let obj1 = this.patientList.filter(a => a.patientId == item)[0];
          let obj2 = {
            patientId: obj1.patientId,
            visitId: obj1.visitId
          };
          params.push(obj2);
        });
      }
      await push(params).then(res => {
        if (res.data.code == "200") {
          this.$message.success("批量推送成功！");
        }
      });
      // this.onOkCallBack();
      this.$refs.modalName.close();
      this.patientIdList = [];
      this.$parent.onLoad();
    },
    // 取消关闭弹窗
    onClose() {
      this.patientIdList = [];
    },
    // 科室选择变化
    changeDept(value) {
      let deptName = this.deptList.filter(item => {
        return item.code == value;
      })[0].name;
      this.getPatientData();
    },
    // 患者选择变化
    changePatient(value) {
      let isHave = value.find(item => item === "allPatients");
      if (isHave) {
        this.allCheck = true;
        if (value.length === 1 && isHave) return;
        this.patientIdList = ["allPatients"];
      } else {
        this.allCheck = false;
      }
    }
  },
  created() {
    // 获取所有科室
    nursingUnit().then(res => {
      this.deptList = res.data.data.deptList;
      this.deptList = this.deptList.map(dept => {
        dept["pinyin"] = dept.name.getPinyin() || "";
        return dept;
      });
      this.deptValue =
        res.data.data.defaultDept || res.data.data.deptList[0].code;
    });
  }
};
</script>
