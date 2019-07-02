<template>
  <div>
    <sweet-modal ref="newRecord" size="big-550" title="创建新入院评估单:" class="modal-record padding-0">
      <div class="record-con">
        <div @click="openUrl(item)" class="record-box" v-for="item of templates" :key="item.id">
          <el-row type="flex" align="middle">
            <img src="../../../../common/images/record/报告单@3x.png" alt="">
            <span class="name">{{item.name}}</span>
          </el-row>
        </div>
      </div>
      <div slot="button" @click="close">
        <el-button class="modal-btn">关闭</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal-record
  .record-con
    background #ffffff
    margin 20px 0 20px
    width 100%
    box-sizing border-box
    padding 0 10px
    overflow hidden
  .record-box
    cursor pointer
    float left
    box-sizing border-box
    padding 0 10px 20px
    width 33%
    img
      width 50px
      height 50px
    .name
      font-size: 13px;
      color: #687179;
      margin-left 12px
</style>
<script>
 import {
    templates
  } from '@/api/patientInfo'
  import {host} from '@/api/apiConfig'
  export default {
    data() {
      return {
        templates: []
      }
    },
    methods: {
      open() {
        this.templates = []
        this.$refs.newRecord.open()
        templates().then((res) => {
          console.log("this.templates",this.templates);
          this.templates = res.data.data
        })
      },
       close() {
        this.$refs.newRecord.close()
      },
      openUrl(item) {
        this.close()
        let token = window.app.$getCookie('NURSING_USER').split('##')[1]
        window.app.currentForm.formCode = item.formCode

        // let url = `${host}/crNursing/api/form/input/${item.formCode}/${this.$route.query.patientId}/${this.$route.query.visitId}/${this.$route.query.name}/${this.$route.query.sex}/${this.$route.query.age}/${this.$route.query.deptCode}/${this.$route.query.bedLabel}/${this.$route.query.inpNo}/${this.$route.query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`

        let query = this.$route.query
        let queryObj = {
          id: this.info.id || '',
          formCode: this.info.formCode,
          patientId: query.patientId,
          visitId: query.visitId,
          name: query.name,
          sex: query.sex,
          age: query.age,
          deptCode: query.deptCode,
          deptName: query.deptName,
          diagnosis: query.diagnosis,
          bedLabel: query.bedLabel,
          inpNo: query.inpNo,
          wardCode: query.wardCode,
          wardName: query.wardName,
          admissionDate: query.admissionDate,
          token: this.token,
          todo: this.info.todo,
          // title:this.info.title || ''
        }

        if (this.isDev) {
          url = `${devFormUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`
          this.urlForm = `${formUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`
        }else{
          url = `${formUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`
        }

        console.log('newFormBox',url)

        window.openFormBox(url)
      }
    },
    components: {}
  }
</script>
