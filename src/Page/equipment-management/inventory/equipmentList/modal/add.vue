<template>
  <el-dialog size='small' custom-class='equipment_dialog' :before-close="close" :title="`${title}设备信息`" :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item v-if="title === '修改' " label="登记码" :label-width="formLabelWidth">
        <el-input readonly v-model="form.registrationCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="设备编码" prop="code" :label-width="formLabelWidth">
        <el-input v-model="form.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="设备类别" prop="type" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option v-for="item in deviceType" :key="item.id"  :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二维码规格" prop="qrCodeSize" class="requiredSign" :label-width="formLabelWidth">
        <el-radio-group v-model="form.qrCodeSize">
          <el-radio :label="1">3cm * 5cm</el-radio>
          <el-radio :label="2">6cm * 8cm</el-radio>
          <el-radio :label="3">
            <el-input v-model="qrCodeSizeW" type="number" style="width: 80px"></el-input>cm * 
            <el-input v-model="qrCodeSizeH" type="number" style="width: 80px"></el-input>cm
          </el-radio>
        </el-radio-group>
        <div class="error" v-show="!form.qrCodeSize">请选择二维码规格</div>
      </el-form-item>
      
      <el-form-item label="状态标识规格" prop="statusFlagSize" class="requiredSign" :label-width="formLabelWidth">
        <el-radio-group v-model="form.statusFlagSize">
          <el-radio :label="1">4cm * 5cm</el-radio>
          <el-radio :label="2">6cm * 8cm</el-radio>
          <!-- <el-radio :label="3">
            <el-input v-model="statusFlagSizeW" type="number" style="width: 80px"></el-input>cm * 
            <el-input v-model="statusFlagSizeH" type="number" style="width: 80px"></el-input>cm
          </el-radio> -->
        </el-radio-group>
         <div class="error" v-show="!form.statusFlagSize">请选择状态标识规格</div>
      </el-form-item>
      
      <el-form-item label="购入日期" prop="buyTime" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.buyTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="放置位置" prop="wardName" :label-width="formLabelWidth">
        <ElSelect
          style="width: 180px;"
          size="small"
          v-model="form.wardName"
          filterable
        >
          <ElOption v-for="val in deptList" :key="val.code" :label="val.name" :value="val.name" />
        </ElSelect>
      </el-form-item>
      <el-form-item label="状态标识"  prop="statusFlag" :label-width="formLabelWidth">
        <el-radio-group v-model="form.statusFlag">
          <el-radio label="正常运行">正常运行</el-radio>
          <el-radio label="限制使用">限制使用</el-radio>
          <el-radio label="故障停用">故障停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="cancel('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="confirm('ruleForm')">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "vue-happy-bus";
import moment from "moment";
import { nursingUnit } from "@/api/lesion"
import { add, update } from '@/Page/equipment-management/api/equipmentList'

export default {
  props: {
    deviceType: {
      default: [],
      type: Array,
    }
  },
  data() {
    return {
      bus: bus(this),
      title: '添加',
      visible: false,
      form: {
        code: '',
        name: '',
        type: '',
        qrCodeSize: 1,
        statusFlagSize: 1,
        buyTime: '',
        wardName: '',
        statusFlag: ''
      },
      qrCodeSizeH: '',
      qrCodeSizeW: '',
      statusFlagSizeW: '',
      statusFlagSizeH: '',
      formLabelWidth: '125px',
      // equipmentType: ['呼吸机', '氧气机', '血糖仪', '心电图机', '耳鼻喉镜'],
      deptList: [],
      rules: {
        code: [
          { required: true, message: '请输入设备编码', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入设备名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择设备类别', trigger: 'change' }
        ],
        buyTime: [
          { type: 'date', required: true, message: '请选择购入日期', trigger: 'change' }
        ],
        wardName: [
          { required: true, message: '请选择放置位置', trigger: 'change' }
        ],
        statusFlag: [
          { required: true, message: '请选择状态标识', trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    this.getDepList()
  },
  methods: {
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.visible = false
      this.qrCodeSizeH = ''
      this.qrCodeSizeW =  ''
      this.statusFlagSizeW =  ''
      this.statusFlagSizeH =  ''
      // this.form.buyTime = new Date(this.form.buyTime)
    },
    close(done) {
      this.cancel('ruleForm')
      done()
    },
    confirm(formName) {
      // this.visible = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try{
            let url = this.title === '添加' ? add : update
            this.form.qrCodeSize = this.getSize(this.form.qrCodeSize, this.qrCodeSizeW, this.qrCodeSizeH)
            this.form.statusFlagSize = this.getSize(this.form.statusFlagSize, this.statusFlagSizeW, this.statusFlagSizeH, true)
            this.form.buyTime = moment(this.form.buyTime).format("YYYY-MM-DD HH:mm:ss")
            url(this.form).then(res => {
              if (res.data.code === "200") {
                this.$message.success(`${this.title}设备类别信息成功！`);
                this.bus.$emit('editSuccess')
                this.bus.$emit('getQrCodeSize')
              } else {
                this.$message.warning(res.data.desc || `${this.title}设备类别信息失败！`);
              }
              this.cancel(formName)
            });
          } catch (e) {
            this.cancel(formName)
          }
        } else {
          return false;
        }
      });
    },
    getSize(data, w, h, status = false) {
      switch(data) {
        case 1: 
          return status ? '4*5' : '3*5'
        case 2: 
          return '6*8'
        case 3: 
          return w + '*' + h
      }
    },
    async getDepList() {
      try {
        if (this.deptList.length > 0) return
        const res = await nursingUnit()
        this.deptList = res.data.data.deptList || []
        if (this.deptList.length > 0) {
          this.deptList = [
            { code: '', name: '全院' },
            ...this.deptList
          ]
          this.wardCode = res.data.data.defaultDept || ''
        }
      } catch (e) {
      }
    },
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item.requiredSign .el-form-item__label:before {
  content: '*';
  color: #ff4949;
  margin-right: 4px
}
/deep/.el-dialog--small{
  width: 50% !important;
}
.requiredSign{
  position: relative;
}
.error{
  color: red;
  font-size: 12px;
  position: absolute;
  top: 28px;
}
</style>