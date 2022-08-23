<template>
  <div :class="['shift-work', {fullPage}]" :style="{height}">
    <div class="left-side">
      <div class="header">
        <ElDatePicker
          class="date-picker"
          type="daterange"
          size="small"
          format="yyyy/MM/dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          :picker-options="pickerOptions"
          v-model="dates"
          @input="load()"
        />
      </div>
      <div class="list" v-loading="loading">
        <router-link
          class="item"
          active-class="active"
          v-for="record of records"
          :to="{name: 'shiftWork', params: {code: record.deptCode, id: record.id}}"
          :key="record.id"
        >
          <div class="text">{{record.changeShiftDate}}</div>
          <div :class="['state', {success: isAllSigned(record)}]"></div>
        </router-link>
      </div>
      <div class="footer">
        <PrimaryButton @click="onCreateModalOpen()">
          + 新建交班记录
        </PrimaryButton>
      </div>
    </div>
    <div class="container">
      <router-view ref="child"></router-view>
    </div>
    <CreateShiftWorkModal
      ref="createModal"
      @confirm="onCreateModalConfirm"
    />
  </div>
</template>

<script>
  import common from '@/common/mixin/common.mixin.js'

  import * as apis from './apis'
  import CreateShiftWorkModal from './components/create-shift-work-modal'
  import PrimaryButton from './components/primary-button'

  export default {
    mixins: [common],
    provide () {
      return {
        reloadSideList: this.load,
        getFullPage: this.getFullPage,
        onToggleFullPage: this.onToggleFullPage,
        onCreateModalOpen: this.onCreateModalOpen
      }
    },
    data() {
      return {
        loading: false,
        fullPage: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick: (picker) => {
              picker.$emit('pick', this.getDates(7))
            }
          }, {
            text: '最近一个月',
            onClick: (picker) => {
              picker.$emit('pick', this.getDates(30))
            }
          }]
        },
        dates: this.getDates(7),
        records: []
      }
    },
    computed: {
      height () {
        if (this.fullPage) {
          return this.wih + 'px'
        }
        else {
          return this.wih - 61 + 'px'
        }
      },
      fullpage() {
        return this.$store.state.sheet.fullpage
      }
    },
    watch: {
      async deptCode (value, oldValue) {
        /* 切换科室的时候解锁 */
        await this.toUnLock()
        this.$router.push({path: '/shiftWork'})
      },
      '$route.params.code' () {
        this.load()
      }
    },
    methods: {
      async load () {
        this.loading = true

        let [startDate, endDate] = this.dates

        startDate = startDate.Format('yyyy-MM-dd')
        endDate = endDate.Format('yyyy-MM-dd')

        const code = this.$route.params.code
        if (code) {
          const res2 = await apis.listShiftRecord(code, startDate, endDate)
          this.records = res2.data.data
        } else {
          this.records = []
        }

        this.loading = false
      },
      getFullPage () {
        return this.fullPage
      },
      getDates (diffDays) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * diffDays)

        return [start, end]
      },
      isAllSigned (record) {
        return !!(record.autographNameA && record.autographNameP && record.autographNameN)
      },
      onCreateModalOpen (code) {
        this.$refs.createModal.open(code)
      },
      async onCreateModalConfirm ({date, code, copy, done}) {
        const d = date.Format('yyyy-MM-dd')
        let res
        try {
          res = await apis.createShiftRecord(code, d)
        } catch (error) {
          throw error
        } finally {
          done()
        }
        this.$refs.createModal.close()
        this.$router.push({name: 'shiftWork', params: {code, id: res.data.data.id}})

        const start = new Date(date)
        const end = new Date(date)

        start.setDate(1)
        end.setMonth(end.getMonth() + 1)
        end.setDate(0)

        this.dates = [start, end]
        this.load()

        if (this.$refs.child) {
          this.$refs.child.onPatientsModalShow(d)
        }
      },
      onToggleFullPage () {
        this.fullPage = !this.fullPage
      },
      async toUnLock(){
        // 判断是否超时了。超时就清空信息。不用发请求
        if(this.$store.state.shiftRecords.enterTime){
          let min=10
          /* 获取后台配置自动解锁时间 */
          const {data:{data}}=await apis.unLockTime()
          if(data!=='his_form_data_lock_timeout'){
            // 默认10分钟
             min=+data
          }
          /* 进入的时间 乘以多少分钟 1分钟=60000  有效的锁定时间*/
          const enterTime=+this.$store.state.shiftRecords.enterTime + 60000 * min
          const nowTime=Date.now()
          if(nowTime>enterTime){
            // ID号清空
            this.$store.commit("changeShiftRecordID",'')
            // 进入时间清空
            this.$store.commit("changeEnterTime",'')
            return
          }
        }
        // 有ID就解锁
        if(this.$store.state.shiftRecords.shiftRecordID){
          // 解锁
          const res= await apis.unLockShiftRecord(this.$store.state.shiftRecords.shiftRecordID)
          // ID号清空
          this.$store.commit("changeShiftRecordID",'')
          // 进入时间清空
          this.$store.commit("changeEnterTime",'')
        }
      }
    },
    async destroyed(){
      /* 切换模块的时候解锁 */
      await this.toUnLock()
    },
    components: {
      CreateShiftWorkModal,
      PrimaryButton
    }
  }
</script>

<style lang="stylus" scoped>
  .shift-work
    position relative
    padding-left 200px
    height 100%

    &.fullPage
      position fixed
      z-index 10000
      left 0
      top 0
      bottom 0
      right 0
      margin 0

  .left-side
    position absolute
    top 0
    left 0
    display flex
    flex-direction column
    height 100%
    width 200px
    border-right 1px solid #CBD5DD
    background white

    .header
      display flex
      align-items center
      height 41px
      padding 0 14px
      background #F7FAFA
      border-bottom 1px solid #EAEEF1

    .list
      padding 10px 14px
      flex 1
      overflow auto

      .item
        padding 0 14px
        display flex
        align-items center
        height 38px
        line-height 38px
        border-radius 3px
        background transparent
        color #687179
        cursor pointer
        text-decoration none

        &:hover
          background #F7F7FA

        &.active
          background #F1F1F5
          .text
            color #333333
            font-weight bold

        .text
          flex 1
          font-size 13px

        .state
          top 10px
          right 14px
          padding 2px
          display block
          border-radius 20px
          border 1px solid #E3E7EA
          box-sizing border-box

          &::before
            display block
            width 100%
            height 100%
            content ""
            width 10px
            height 10px
            background #E62C2C
            border-radius 10px

          &.success::before
            background #27A45E

    .date-picker
      width: 100%
      font-size 12px

  .container
    height 100%
</style>
