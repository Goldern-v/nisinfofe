<template>
<div class="select-diagnosis">
  <sweet-modal ref="modal" :modalWidth="650" :title="(isEdit?'编辑':'添加') + '护理诊断'">
    <h1 class="title">{{data.name}}</h1>
    <!-- <div class="save-btn" @click="save">
          <div v-touch-ripple>
            签名并保存
          </div>
        </div> -->
    <div class="contain">
      <!-- <div class="do-box" style="margin: 0">
            <div class="label">【相关因素】</div>
            <el-checkbox-group v-model="checkList">
              <div class="m-10">
                <el-input class="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入相关因素" v-model="factor" :readonly="isHistory">
                </el-input>
              </div>
            </el-checkbox-group>
          </div> -->
      <el-input class="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入相关因素" v-model="factor" :readonly="isHistory">
      </el-input>
      <div class="do-box">
        <div class="label">【护理措施】</div>
        <el-checkbox-group v-model="resultList" size="small">
          <div class="m-10" v-for="item in checkList" :key="item.code">
            <el-checkbox :label="item.code" :disabled="isHistory">{{item.name}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div class="do-box">
        <div class="label">【预期目标】</div>
        <el-checkbox-group v-model="checkList">
          <div class="m-10">
            {{target}}
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div slot="button" style="text-align: center">
      <el-button class="modal-btn" @click="close">取消</el-button>
      <el-button type="primary" class="modal-btn" @click="signSave">保存</el-button>
    </div>
  </sweet-modal>
  <signModal ref="signModal" overlay-theme="no-bg"></signModal>
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box
  overflow hidden
  .el-checkbox__label
    font-size: 13px;
    color: black;
    white-space normal
    padding-left 10px
  .el-checkbox__inner
    border-radius 0
    box-sizing border-box
    overflow hidden
.select-diagnosis
  .sweet-modal
    background: #F7FAFA;
    border: 1px solid #999999;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
    border-radius: 4px;
  .sweet-content
    padding 10px 20px
  .textarea .el-textarea__inner
    font-size: 13px;
    color: #687179;
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    box-shadow: inset 0 1px 2px 0 rgba(129,129,129,0.50);
    border-radius: 2px;
    height 34px !important
    line-height 22px
    padding-left 10px
  .el-input-group__prepend
    color black
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title
    font-size: 16px;
    color: #333333;
    font-weight bold
    margin-bottom 10px
.contain
  .do-box
    background #ffffff
    box-sizing border-box
    padding 15px 10px
    border: 1px solid #CBD5DD;
    box-shadow: inset 0 1px 2px 0 rgba(129,129,129,0.50);
    border-radius: 2px;
    margin-top 20px
    color #333
    .label
      font-size: 13px;
      color: #333;
    .m-10
      margin 10px
      font-size: 13px;
      color: #333;
      letter-spacing: 0;
      line-height: 21px;
      line-height: 21px;
.modal-btn
  border-radius: 2px;
  height 37px
  width 100px
  margin-bottom 10px
</style>

<script>
import {
  measure
} from '@/api/form'
import {
  save,
  update
} from '@/api/home'
import BusFactory from 'vue-happy-bus'
import signModal from '../../../../components/modal/sign.vue'
export default {
  data() {
    return {
      data: {},
      bus: BusFactory(this),
      checkList: [],
      target: '',
      resultList: [],
      factor: '',
      isHistory: false,
      password: '',
      isEdit: false, //是否编辑
      code: '',
      id: ''
    }
  },
  methods: {
    open(item) {
      // if (!item.id) {
      //   this.isHistory = true
      // } else {
      //   this.isHistory = false
      // }
      this.isEdit = item.isEdit || false
      this.$refs.modal.open()
      this.data = item
      this.checkList = [],
        this.resultList = [],
        this.factor = '',
        this.target = ''
      // let historyData = this.$_.filter(this.$store.state.form.measure, function(o) {
      //   return o.code == item.code;
      // })
      // if (historyData.length) {
      //   this.factor = historyData[0].factor
      //   this.resultList = historyData[0].measure
      // }
      console.log(item)
      if (this.isEdit) {
        this.code = item.diagCode
        this.id = item.id
        measure(item.diagCode).then((res) => {
          this.checkList = res.data.data.measures
          this.target = res.data.data.target
        })
        this.resultList = item.measures.map(item => item.code)
        this.factor = item.diagElement
      } else {
        this.code = item.code
        measure(item.code).then((res) => {
          this.checkList = res.data.data.measures
          this.target = res.data.data.target
        })
      }
    },
    close() {
      this.$refs.modal.close()
    },
    save() {
      let code = this.code
      let measure = this.resultList
      let factor = this.factor
      if (this.password) {
        let data = {
          empNo: this.username,
          creator: this.password,
          wardCode: this.$route.query.wardCode,
          patientId: this.$route.query.patientId,
          visitId: this.$route.query.visitId,
          patientName: this.$route.query.patientName,
          bedLabel: this.$route.query.bedLabel,
          code: code,
          name: this.data.name,
          measures: measure,
          element: factor
        }
        save(data).then(res => {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.close()
          this.bus.$emit('refreshCarePlan')
          window.closeNewDiagnosis()
        })
      } else {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        })
      }
    },
    update() {
      let id = this.id
      let measure = this.resultList
      let factor = this.factor
      if (this.password) {
        let data = {
          creator: this.password,
          empNo: this.username,
          id: id,
          measures: measure,
          element: factor
        }
        update(data).then(res => {
          this.$message({
            showClose: true,
            message: '更新成功',
            type: 'success'
          })
          this.close()
          this.bus.$emit('refreshCarePlan')
          window.closeNewDiagnosis()
        })

      } else {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        })
      }
    },
    signSave() {
      this.$refs.signModal.open((password, username) => {
        this.password = password
        this.username = username
        if (this.isEdit) {
          this.update()
        } else {
          this.save()
        }
      })
    }
  },
  mounted() {

  },
  components: {
    signModal
  }
}
</script>
