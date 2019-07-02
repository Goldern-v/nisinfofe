<template>
  <div>
    <div class="contain" v-loading="ajax.loading">
      <div class="title">
        {{data.科室名字}}
      </div>
      <div class="sup-title">
        病区动态日志
      </div>
      <div class="info" flex="main:justify">
        <span>2017年8月12日 星期四</span>
        <span>值班医生：（白）王丽  ／ （晚）张敏霞</span>
      </div>
      <log-table :data="data"></log-table>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 20px auto
  width 800px;
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  padding 20px;
  border-radius: 2px;
  .title
    font-size: 18px;
    color: #333333;
    margin-top 10px
    text-align center
    height 20px
  .sup-title
    font-size: 15px;
    color: #333333;  
    margin-top 10px
    text-align center
    height 16px
  .info
    font-size: 13px;
    color: #333333;  
    margin 16px 0 13px
</style>

<script>
  import logTable from './component/log-table'
  import {
    getWardLog
  } from '@/api/log'
  export default {
    data() {
      return {
        Date: new Date().Format('yyyy-MM-dd'),
        data: {
          "科室名字": [],
          "转床病人": [],
          "病危病人": [],
          "明日出院": [],
          "新入病人": [],
          "明日手术": [],
          "床位日志": {},
          "病重病人": [],
          "转出病人": [],
          "手术病人": [],
          "等床病人": [],
          "出院病人": [],
          "转入病人": []
        },
        ajax: {
          loading: false
        }
      }
    },
    computed: {
      wardCode() {
        return this.$store.state.lesion.deptCode
      }
    },
    methods: {
      init() {
        this.data = {
          "科室名字": [],
          "转床病人": [],
          "病危病人": [],
          "明日出院": [],
          "新入病人": [],
          "明日手术": [],
          "床位日志": {},
          "病重病人": [],
          "转出病人": [],
          "手术病人": [],
          "等床病人": [],
          "出院病人": [],
          "转入病人": []
        }
      },
      getData() {
        this.ajax.loading = true
        getWardLog(this.wardCode, this.Date).then(res => {
          if(res.data.data) {
            this.data = res.data.data
            this.ajax.loading = false
          } else {
            this.init()
          }
        })
        .catch(() => {
          this.ajax.loading = false
        }) 
      }
    },
    watch: {
      wardCode() {
        this.getData()
      }
    },
    created() {
      if (this.wardCode) {
        this.getData()
      }
    },
    components: {
      logTable
    }
  }
</script>
