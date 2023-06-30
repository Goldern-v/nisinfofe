<template>
  <el-dialog size='small' :title="`${title}设备信息`" :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="设备编码" :label-width="formLabelWidth">
        <el-input v-model="form.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="设备类别" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option v-for="item in equipmentType" :key="item"  :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二维码规格" :label-width="formLabelWidth">
        <el-radio-group v-model="form.QRcode">
          <el-radio :label="3">3cm * 5cm</el-radio>
          <el-radio :label="6">6cm * 8cm</el-radio>
          <el-radio :label="9">
            <el-input v-model="QRcodeW" type="number" style="width: 80px"></el-input>cm * 
            <el-input v-model="QRcodeH" type="number" style="width: 80px"></el-input>cm
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="放置位置" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="放置位置" :label-width="formLabelWidth">
        <el-input 
          v-model="form.desc"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态标识" :label-width="formLabelWidth">
        <el-radio-group v-model="form.StateID">
          <el-radio label="正常运行">正常运行</el-radio>
          <el-radio label="限制使用">限制使用</el-radio>
          <el-radio label="故障停用">故障停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
    },
    data() {
      return {
        title: '添加',
        visible: false,
        form: {
          name: '',
          isRePatient: true,
          desc: '',
          QRcode: '',
          time: '',
          StateID: '',
          region: ''
        },
        QRcodeH: '',
        QRcodeW: '',
        formLabelWidth: '125px',
        equipmentType: ['呼吸机', '氧气机', '血糖仪', '心电图机', '耳鼻喉镜']
      };
    },
    methods: {
      cancel() {
        this.visible = false
      },
      confirm() {
        // this.visible = false;
        console.log("ddddd", this.form, this.QRcodeW,)
      }
    }
  };
</script>