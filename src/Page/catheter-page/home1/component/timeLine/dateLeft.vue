<template>
  <div>
    <el-row type="flex" align="middle" class="card-header">
      <span v-if="done">已完成（{{totalCount}}）</span>
      <span v-else>未完成（{{totalCount}}）</span>
    </el-row>
    <div class="card-body" ref="scrollCon">
      <null-bg v-show="list.length == 0"></null-bg>
      <div ref="container">
        <ul ref="content">
          <li v-for="item of list" :key="item.id" v-touch-ripple @click="openMoadl(item)">
            <dateList :data="item" :done="done"></dateList>
          </li>
        </ul>
      </div>
    </div>
    <datelineModal ref="datelineModal"></datelineModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .card-header
    height 37px
    background: #F7FAFA;
    padding-left 13px
    font-size: 13px;
    color: #333333;  
    border-bottom: 1px solid #EAEEF1;
    font-weight bold
  .card-body
    padding 20px
    box-sizing border-box  
    height 490px;
    overflow-y scroll
</style>

<script>
  import {
    timelineDone,
    timelinNeedDo
  } from '@/api/patientInfo'
  import dateList from './dateList'
  import Scrollload from 'Scrollload'
  import nullBg from '@/components/null/null-bg'
  import datelineModal from '../modal/dateline-modal.vue'
  import BusFactory from 'vue-happy-bus'
  import {host} from '@/api/apiConfig'
  export default {
    props: {
      time: '',
      type: Number,
      getData: Function,
      done: Boolean,
      status: Number
    },
    data() {
      return {
        pageIndex: 1,
        list: [],
        totalPage: 1,
        totalCount: 0,
        pageSize: 20,
        scrObj: {},
        bus: BusFactory(this)
      }
    },
    mounted() {
      this.scrollInit()
      this.bus.$on('dateLefteRefresh', () => {
        this.refresh()
      })
    },
    methods: {
      scrollInit() {
        this.scrObj = new Scrollload({
          container: this.$refs.container,
          content: this.$refs.content,
          window: this.$refs.scrollCon,
          noMoreDataHtml: '',
          loadMore: (sl) => {
            if (this.pageIndex > this.totalPage) {
              sl.noMoreData()
              return
            }
            this.getData(this.$route.query.patientId, this.$route.query.visitId, this.time, this.type, this.pageIndex, this.pageSize,this.status).then(res => {
                this.list = [...this.list, ...res.data.data.list]
                this.totalPage = res.data.data.totalPage
                this.totalCount = res.data.data.totalCount
                this.pageIndex++
                  sl.unLock()
              })
              .catch(err => {
                sl.throwException()
              })
          },
        })
      },
      refresh() {
        this.list = []
        this.$nextTick(() => {
          this.pageIndex = 1
          this.totalPage = 1
          this.scrObj.refreshData()
        })
      },
      openMoadl(item) {
        let beginTime = new Date(item.beginTime)
        let now = new Date()
        // if (!this.done && beginTime < now) {
          if(item.type == 2 && !this.done){
            let token = window.app.$getCookie('NURSING_USER').split('##')[1]
            let url = `${host}/crNursing/api/form/input/${item.entity}/${this.$route.query.patientId}/${this.$route.query.visitId}/${this.$route.query.name}/${this.$route.query.sex}/${this.$route.query.age}/${this.$route.query.deptCode}/${this.$route.query.bedLabel}/${this.$route.query.inpNo}/${this.$route.query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
            window.openFormBox(url)
          }
          else if(!this.done) {
            this.$refs.datelineModal.open(item)
          }
        }
      // }
    },
    watch: {
      time() {
        // this.getData(this.$route.query.patientId, this.$route.query.visitId, this.time, this.type, this.pageIndex, this.status)
        this.refresh()
      },
      type() {
        // this.getData(this.$route.query.patientId, this.$route.query.visitId, this.time, this.type, this.pageIndex, this.status)
        this.refresh()
      }
    },
    created() {
    },
    components: {
      dateList,
      nullBg,
      datelineModal
    }
  }
</script>
