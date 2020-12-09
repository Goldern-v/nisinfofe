<!-- 住院补登记弹窗 -->
<template>
  <div class="inpatient-registration-cmp-wrapper">
    <el-dialog
        title="住院登记补充"
        width="30%"
        top="50px"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
      <el-alert title="提示：请仔细核对患者登记信息，保存后无法更改" type="warning" show-icon :closable="false"></el-alert>
      <div style="height: 15px;"></div>
      <el-form label-width="100px" ref="form" :rules="rules" :model="form">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男" size="mini"></el-radio>
            <el-radio label="女" size="mini"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" size="small"
                          style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNo">
          <el-input v-model="form.idNo" size="small"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="nativePlace">
          <areaCmp v-model="form.nativePlace"/>
        </el-form-item>
        <el-form-item label="出生地" prop="birthPlace">
          <areaCmp v-model="form.birthPlace"/>
        </el-form-item>
        <el-form-item label="户籍地址" prop="mailingAddressCode">
          <areaCmp v-model="form.mailingAddressCode"/>
        </el-form-item>
        <el-form-item label="现住址" prop="patientArea">
          <areaCmp v-model="form.patientArea"/>
        </el-form-item>
      </el-form>
      <div class="button-wrapper">
        <el-button @click="dialogVisible = false">暂不登记</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 地址组件 -->
    <!-- 签名弹窗 -->
    <signModal ref="signModal" title="护士签名"></signModal>
  </div>
</template>

<script>
import {savePatientInfo, getListHisAreaDict} from '@/api/home'
import signModal from "@/components/modal/sign.vue";
import areaCmp from "@/components/area/index.vue";

const checkIdNo = (rule, value, callback) => {
  const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!regIdCard.test(value)) {
    callback(new Error('身份证号填写有误'));
  }
  callback()
}
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        sex: '男',
        birthday: '',
        idNo: '',
        nativePlace: '',
        birthPlace: '',
        mailingAddressCode: '',
        patientArea: '',
      },
      rules: {
        sex: [{required: true, message: '必填'}],
        birthday: [{required: true, message: '必填'}],
        idNo: [{required: true, message: '必填'}, {validator: checkIdNo, trigger: 'blur'}],
        nativePlace: [{required: true, message: '必填'}],
        birthPlace: [{required: true, message: '必填'}],
        mailingAddressCode: [{required: true, message: '必填'}],
        patientArea: [{required: true, message: '必填'}],
      }
    }
  },
  created() {

  },
  methods: {
    open(info) {
      // this.form = {
      //   ...this.form,
      //   ...info
      // }
      this.form.patientId = info.patientId
      this.form.visitId = info.visitId
      this.form.name = info.name
      this.form.sex = info.sex
      this.form.birthday = info.birthday
      this.form.idNo = info.idNo
      this.form.nativePlace = info.nativePlace
      this.form.birthPlace = info.birthPlace
      this.form.mailingAddressCode = info.mailingAddressCode
      this.form.patientArea = info.patientArea

      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleSave() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        window.openSignModal((password, empNo) => {
          const params = {
            ...this.form,
            empNo,
            password
          }
          savePatientInfo(params).then(res => {
            this.dialogVisible = false
            this.$emit('handleSave', res)
          })
        })
      })
    }
  },
  components: {
    signModal,
    areaCmp,
  }
}
</script>

<style lang="scss" scoped>
.inpatient-registration-cmp-wrapper {
  .el-form-item {
    margin-bottom: 10px;
  }

  .button-wrapper {
    margin-top: 20px;
    border-top: 1px solid #666666;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /deep/ .el-form-item__error {
    padding-top: 0;
  }

  /deep/ .el-dialog--small {
    width: 40% !important;
  }
}
</style>
