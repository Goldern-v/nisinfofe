<template>
<div class="modal-con">
  <sweet-modal ref="newFormRecord" size="big" :title="title" class="modal-record padding-0">
    <!-- <div class="title-bar" flex="cross:center">
      <span class="type-text">护理文书类型</span>
      <el-select v-model="formType" placeholder="选择类型" class="type-select">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input class="text-con" :placeholder="'搜索' + options.find((item) => item.value == formType).label" icon="search" v-model="searchWord">
      </el-input>
    </div> -->
    <div class="record-con" v-loading="pageLoading">
      <div @click="openUrl(item)" @dblclick="create(item)" class="record-box" :class="{active: selectData == item}" v-for="item of filterData" :key="item.id">
        <el-row type="flex" align="middle">
          <img src="../../../../../common/images/record/文件创建.png" alt="" height="35">
          <span class="name" v-if="item.name">{{item.name}}</span>
          <span class="name" v-if="item.recordName">{{item.recordName}}</span>
        </el-row>
      </div>
    </div>
    <div slot="button" @click="newFormRecordClose">
      <el-button class="modal-btn" @click='newFormRecordClose'>关闭</el-button>
      <el-button class="modal-btn" type="primary" @click="create" :disabled="!selectData">创建</el-button>
    </div>
  </sweet-modal>
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title-bar
  height 45px
  background #fff
  border-bottom: 1px solid #EAEEF1;
  padding 0 15px
.type-select
  >>>.el-input
    width 126px
  >>>.el-input__inner
    height 30px
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
.text-con
  >>>&.el-input
    width 138px
    margin-left 10px
  >>>.el-input__inner
    width 138px
    height 30px
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
.record-con
  margin 0
  padding 10px 10px 10px
  height 220px
  overflow auto
  .record-box
    cursor pointer
    float left
    box-sizing border-box
    padding 10px 10px 10px
    width 50%
    height 60px
    &.active
      background: #F0F5F3;
      border: 1px solid #C0D4CD;
      border-radius: 4px;
    img
      height 35px
    .name
      font-size: 13px;
      color: #687179;
      margin-left 12px
      height 40px
      overflow hidden
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2
.type-text
  font-size: 13px;
  color: #687179;
  margin-right 10px
</style>

<script>
import {
  templates,
  listRecord,
  inform,
  healthEdu
} from '@/api/patientInfo'
import commonMixin from '@/common/mixin/common.mixin'
import {
  host
} from '@/api/apiConfig'
import bus from 'vue-happy-bus'
import {
  formUrl,
  devFormUrl
} from '@/common/pathConfig/index.js'
import {
  templatesAll
} from '../api/index.js'
import {getFormConfig} from '../config/form-config.js'
import qs from 'qs'
export default {
  mixins: [commonMixin],
  data() {
    return {
      templates: [],
      options: [{
          value: '1',
          label: '护理评估'
        },
        {
          value: 'monitor',
          label: '监测记录'
        },
        {
          value: 'report',
          label: '报告类'
        },
        // {
        //   value: '4',
        //   label: '健康宣教'
        // }
      ],
      formType: '1',
      pageLoading: true,
      searchWord: '',
      bus: bus(this),
      selectData: '',
      title:"创建新表单",
      callback:null,
    }
  },
  methods: {
    open(box={}) {
      this.templates = box.templates||[]
      this.$refs.newFormRecord.open()
      this.getData()
      this.title = box.title||"创建新表单"
      this.callback = box.callback||null
    },
    close() {
      this.$refs.modal.close()
    },
    openUrl(item) {
      if (item == this.selectData) {
        this.selectData = ''
      } else {
        this.selectData = item
      }
    },
    create(data) {
      let item
      if (data.name) {
        item = data
      } else {
        item = this.selectData
      }
      console.log("新建页面HTML代码", item, this, this.formType);
      window.app.currentForm = item;
      if (this.formType == '1' || this.formType == 'monitor' || true) {
        let token = window.app.$getCookie('NURSING_USER').split('##')[1]
        let query = this.$route.query
        // 开启编辑护理评估表旧版
        if (item.nooForm == '-1') {
          let url =
            `${host}/crNursing/api/form/input/${item.formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?isNoAutoCreated=true&App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
          // window.openFormBox(url)
          this.$refs.newFormRecord.close()
          window.openFormBoxClean(url, this.callback);
        } else if (item.nooForm == '1' || item.nooForm == '0') {
          let url
          //  url = `http://localhost:3000/MMSE`
          let query = this.$route.query
          // 判断是否存在措施
          if(!getFormConfig(item.name).hasMeasure) {
             this.bus.$emit('openAssessment', Object.assign(getFormConfig(item.name),{
              id: '',
              isNoAutoCreated: true,
              formCode: item.formCode,
              nooForm: item.nooForm,
              pageUrl: item.pageUrl,
            }))
          } else {
            let queryObj = {
              id: '',
              isNoAutoCreated: true,
              formCode: item.formCode,
              patientId: query.patientId,
              visitId: query.visitId,
              name: query.name,
              sex: query.sex,
              age: query.age,
              deptCode: query.deptCode,
              bedLabel: query.bedLabel,
              inpNo: query.inpNo,
              wardCode: query.wardCode,
              wardName: query.wardName,
              admissionDate: query.admissionDate,
              token: this.token
            }
          if(this.isDev) {
            // url = `${devFormUrl}/${item.pageUrl + '.html'}?${qs.stringify(queryObj)}`
            // 后台补充 .html
            url = `${devFormUrl}/${item.pageUrl}?${qs.stringify(queryObj)}`
          } else {
            url = `${formUrl}/${item.pageUrl}?${qs.stringify(queryObj)}`
          }
          // window.openFormBox(url)
          this.$refs.newFormRecord.close()
          window.openFormBoxClean(url, this.callback);
          }
        }
      }
      this.newFormRecordClose()

    },
    newFormRecordClose() {
      this.$refs.newFormRecord.close()
    },
    getData() {
      this.pageLoading = false
      return this.templates || []
      // if (this.formType == '1') {
      //   templates(this.deptCode).then((res) => {
      //     this.templates = res.data.data
      //     console.table(this.templates)
      //     console.dir(this.templates)
      //     this.pageLoading = false
      //   })
      // } else {
      //   templatesAll(this.formType, this.deptCode).then((res) => {
      //     this.templates = res.data.data.list
      //     console.table(this.templates)
      //     console.dir(this.templates)
      //     this.pageLoading = false
      //   })
      // }
    },
  },
  computed: {
    filterData() {
      if (this.searchWord) {
        this.selectData = ''
        return this.templates.filter(item => {
          if (this.formType == '1') {
            return item.name.indexOf(this.searchWord) > -1
          }
        })
      } else {
        return this.templates
      }
    }
  },
  watch: {
    formType() {
      this.getData()
      this.selectData = ''
    }
  },
  components: {}
}
</script>
