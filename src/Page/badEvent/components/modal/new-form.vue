<template>
<div class="modal-con">
  <sweet-modal ref="newRecord" size="big" title="新建不良事件" class="modal-record padding-0">
    <!-- <div class="title-bar" flex="cross:center">
      <span class="type-text">类型</span>
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
          <img src="@/common/images/record/文件创建.png" alt="" height="35">
          <span class="name" v-if="item.name">{{item.name}}</span>
          <span class="name" v-if="item.recordName">{{item.recordName}}</span>
        </el-row>
      </div>
    </div>
    <div slot="button" @click="newRecordClose">
      <el-button class="modal-btn" type="primary" @click="create(selectData)" :disabled="!selectData">创建</el-button>
      <el-button class="modal-btn">取消</el-button>
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
  height 370px
  overflow auto
  .record-box
    cursor pointer
    float left
    box-sizing border-box
    padding 10px 10px 10px
    width 33%
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
  getEventTemplate
} from '@/Page/badEvent/apis/index.js'
// import {getFormConfig} from '../config/form-config.js'
import qs from 'qs'
export default {
  mixins: [commonMixin],
  data() {
    return {
      templates: [],
      options: [{
          value: '1',
          label: '不良事件'
        },
        // {
        //   value: 'monitor',
        //   label: '监测记录'
        // },
        // {
        //   value: 'report',
        //   label: '报告类'
        // },
        // {
        //   value: '4',
        //   label: '健康宣教'
        // }
      ],
      formType: '1',
      pageLoading: true,
      searchWord: '',
      bus: bus(this),
      selectData: ''
    }
  },
  methods: {
    open() {
      this.templates = []
      this.$refs.newRecord.open()
      this.getData()
    },
    close() {
      if(this.$refs.modal){
        this.$refs.modal.close()
      }
    },
    openUrl(item) {
      if (item == this.selectData) {
        this.selectData = ''
      } else {
        this.selectData = item
      }
      // this.$router.push({name: 'badEventEdit', params: {id: item.name}})
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

      localStorage['BadEvent-CurrentRow'] = 0
      // this.$router.push({name: 'badEventForm', params: {id:item.wardCode||1, name:item.name,type:data.badEventType}})
      this.$router.push({name: 'badEventEdit', params: {id:item.wardCode||1,
       name:item.name,
      operation:'create',
      type:data.badEventType,
      code:data.badEventCode
      }})


    },
    newRecordClose() {
      if(this.$refs.newRecord && this.$refs.newRecord.close){
        this.$refs.newRecord.close()
      }
    },
    getData() {
      this.pageLoading = true
      if (this.deptCode) {
        getEventTemplate(this.deptCode).then((res) => {
          this.templates = res.data.data
          console.table(this.templates)
          console.dir(this.templates)
          this.pageLoading = false
        })
      }
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
};
</script>
