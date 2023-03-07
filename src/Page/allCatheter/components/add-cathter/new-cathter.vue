<template>
  <div class="modal-page" @click.stop="closeSelf">
    <div class="new-modal" @click.stop>
      <div class="modal-title">
        <el-button
          class="close-btn"
          icon="close"
          @click="closeSelf"
        ></el-button>
      </div>
      <div class="modal-body">
        <div
          class="modal-item"
          v-if="newCathterType.formCode == 'F0110'"
          style="display:flex;line-height:37px;width:265px;margin-bottom:10px;"
        >
          <span class="item-title">名&nbsp;&nbsp;称:</span>
          <el-input
            :value="newCathterType.name"
            placeholder="请输入内容"
            @input="changeType"
          ></el-input>
        </div>
        <div
          class="modal-item"
          v-else
          style="display:flex;line-height:37px;margin-bottom:10px;"
        >
          <span class="item-title">名&nbsp;&nbsp;称:</span
          ><el-input
            :value="newCathterType.name"
            placeholder="请输入内容"
            @input="changeType"
            :disabled="true"
          ></el-input>
        </div>
        <div class="modal-item" style="margin-bottom:10px;">
          <span class="item-title">置管时间:</span>
          <el-date-picker
            v-model="intubationTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </div>
        <div class="modal-item" style="margin-bottom:10px;">
          <span class="item-title" v-if="HOSPITAL_ID === 'whsl'"
            >预计更换时间:</span
          >
          <span class="item-title" v-else>更换时间:</span>
          <el-date-picker
            v-model="expecteReplaceTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <!-- <span class="star">*</span> -->
        </div>
        <div class="modal-item" style="margin-bottom:10px;">
          <span class="item-title">管道来源:</span
          ><el-select v-model="catheterSource" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="btns">
          <button @click="closeSelf">取消</button>
          <button @click="sumbitCathter">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.modal-page {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
}
.new-modal {
  width: 500px;
  height: 350px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  padding: 70px 100px 20px;
  box-sizing: border-box;
  overflow: hidden;
  .modal-body {
    input {
      height: 28px;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 0 0 0 10px;
    }
    .item-title {
      display: inline-block;
      min-width: 100px;
    }
    .modal-item {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .btns {
      display: flex;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
    }
    button {
      flex: 1;
      border: 1px solid #ccc;
      background-color: #01c298;
      color: #fff;
      cursor: pointer;
      &:first-child {
        background-color: #ffffff;
        color: #000;
      }
    }
  }
  .star {
    color: red;
    font-size: 20px;
    margin-left: 5px;
    cursor: default;
  }
  /deep/ .el-input {
    margin-left: 5px;
  }
}
</style>
<script>
import { createCathter } from "@/Page/allCatheter/api/catheter";
import moment from "moment";
export default {
  props: {
    newCathterType: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {
      type: "",
      intubationTime: moment().format("YYYY-MM-DD HH:mm:ss"), //当前时间
      expecteReplaceTime: "",
      options: [
        {
          value: "本院",
          label: "本院"
        },
        {
          value: "院外带入",
          label: "院外带入"
        }
      ],
      catheterSource: "本院",
      formTitle: ""
    };
  },
  methods: {
    closeSelf() {
      this.$emit("close");
    },
    changeType(value) {
      this.formTitle = value;
    },
    sumbitCathter() {
      // if(!this.expecteReplaceTime){
      //     this.$message.error('预拔管时间不能为空！')
      //     return
      // }
      let { formCode, formType, name } = this.newCathterType;
      createCathter({
        code: formCode,
        type: formType,
        wardCode: this.$store.state.sheet.patientInfo.wardCode,
        deptCode: this.$store.state.sheet.patientInfo.deptCode,
        patientId: this.$store.state.sheet.patientInfo.patientId,
        visitId: this.$store.state.sheet.patientInfo.visitId,
        intubationTime: moment(this.intubationTime).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        replaceTime: this.expecteReplaceTime
          ? moment(this.expecteReplaceTime).format("YYYY-MM-DD HH:mm:ss")
          : "",
        formTitle: this.formTitle ? this.formTitle : this.newCathterType.name,
        catheterSource: this.catheterSource
      })
        .then(res => {
          sessionStorage.setItem("createCathterId", res.data.data.id);
          this.$message.success("添加成功");
          this.$emit("getDate");
          this.$emit(
            "onChangePatient_self",
            this.$store.state.sheet.patientInfo
          );
          this.closeSelf();
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    }
  },
  watch: {
    newCathterType(a, b) {
      // console.log(a,'a');
      // console.log(b,'b');
    }
  },
  components: {}
};
</script>
