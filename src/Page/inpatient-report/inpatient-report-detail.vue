<template>
  <div class="ward-report-detail" v-loading="loading">
    <div class="toolbar">
      <div class="toolbar-left">
        <span>科室：</span>
        <ElSelect size="small" v-model="code" filterable>
          <ElOption
            v-for="d of userDeptList"
            :key="d.code"
            :label="d.name"
            :value="d.code"
          />
        </ElSelect>
      </div>
      <div class="toolbar-right">
        <Button @click="onPrint">打印预览</Button>
      </div>
    </div>
    <div class="container">
      <!-- {{twoDay}} -->
      <NullBg v-if="!digits" text="暂时没有住院病人登记表～"/>
      <div class="print-area" v-else ref="area">
      <!-- <div class="print-area" ref="area"> -->

        <Paper
          v-for="(paper, i) in papers"
          :key="i"
          :name="name"
          :signNo="user.empNo"
          :signName="user.empName"
          :date="date"
          :digits="i === 0 ? digits : null"
          :paperData ="paper.pageItem"
          :inList="paper.inList"
          :outList="paper.outList"
          :index="i === 0 ? 1 : smallSize + 1 + (i - 1) * largeSize"
          :page="i"
          :total="papers.length"
          :twoDayPaper="twoDay"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import print from 'printing'

  import Button from './components/button'
  import NullBg from '@/components/null/null-bg.vue'
  import common from '@/common/mixin/common.mixin.js'
  import Paper from './components/paper.vue'
  import * as apis from './apis'

  import {arrayTest} from './test.js'

  export default {
    mixins: [common],
    components: {
      NullBg,
      Paper,
      Button,
    },
    props: {
      dayProp: String,
      dates:Array,
      twoDay:String
    },
    data () {
      return {
        loading: false,
        printing: false,
        date: '',
        digits: null,
        papers: [],
        smallSize: 0,
        largeSize: 0,
        user: JSON.parse(localStorage.user),
        depts: [],  //选项卡数据
        code: '',
        name: '',
        dataList: [],

      }
    },
    computed: {
    },
    watch: {
      deptCode (value, oldValue) {
         this.code = this.deptCode
        if (oldValue !== value) {
          // this.loadDepts()
        }
      },
      code (value, oldValue) {
        if (oldValue !== value) {
          const dept = this.userDeptList.find((d) => d.code === value)
          this.name = dept ? dept.name : ''
          this.load()
        }
      },
      '$route.params.date' () {
        this.load()
      },
    },
    mounted () {
      if (this.deptCode) {
        this.code = this.deptCode
        // this.loadDepts()
      }
    },
    methods: {
      buttonT(e){
        console.log(this.$route.params.date)
      },
      async loadDepts () {
        const parentCode = this.deptCode
        const res1 = await apis.listDepartment(parentCode)
        const {data: {data: depts}} = res1

        this.depts = depts.map(item => ({code: item.deptCode, name: item.deptName}))
        if(!depts[0]) {
          depts[0] = {}
        }
        this.code = depts[0].code
      },
      async load (refresh) {
        const date = this.$route.params.date

        if (!date) return this.$router.push('/inpatientReport/' + moment().format('YYYY-MM-DD'))
        //下面跳接口
        if (!this.code) return
        // this.code = '031202'
        //到上面
        this.loading = true

        const res2 = await apis.listWardReport(this.code, date)
        let {data: {data: {num: digits, newPatsAndTranIn: inList, outPatsAndTranOut: outList}}} = res2
        //日期只有一天有数据，先写死，之后接口数据好了，在改回来
        let startDate = date + ' 00:00:00' //接口开始

        let endData = moment(date).add(0, 'd').format('YYYY-MM-DD') +" 23:59:59"
        // let startDate = '2019-01-01 00:00:00'
        // let endData = '2019-01-02 23:59:59'
        const resData = await apis.listInpatientReport(this.code,startDate,endData)
        let getDataList = resData.data.data
        for(let i=0;i<getDataList.length;i++){
          let sumDate = getDataList[i].admissionDateTime
          // if (sumDate.length){
            let firstDate = sumDate.substring(0,11)
            let secondDate = sumDate.substring(12)
          // }
          // Object.assign(getDataList[i],
          // {
          //   firstDate:firstDate,
          //   secondDate:secondDate
          // })

            getDataList[i].firstDate = firstDate
            getDataList[i].secondDate =secondDate

          // this.$set(getDataList[i],'firstDate',firstDate)
          // this.$set(getDataList[i],'secondDate',secondDate)

        }
        let pageSize = 18;
        const papers = [];
        let pageNumber = getDataList.length/pageSize<1 ? 1: Math.ceil(getDataList.length/pageSize)
        for (let i=0; i<pageNumber; i++){
          // let start =  i === 0 ? 0 : i * pageSize
          // let end =  i === 0 ? pageSize : pageSize + i * pageSize
          // let pageEvery = arrayTest.slice(start,end)
          let pageEvery = getDataList.slice(pageSize*i, pageSize*(i+1))
          if(pageEvery.length<11){
            for(let i=0;i<pageSize-pageEvery.length;i++){
              pageEvery.push({})
            }
          }else if(!pageEvery){
             for(let i=0;i<pageSize;i++){
              pageEvery.push({})
            }
          }
          papers.push({
            pageItem:pageEvery
          })
        }
        //11
        // const smallSize = this.smallSize = 10
        // const largeSize = this.largeSize = 16

        //两数据的最大长度
        // const total = Math.max(inList.length, outList.length)
        // const papers = []
        // //总页数
        // const paperCount = total > smallSize ? Math.ceil((total - smallSize) / largeSize) + 1 : 1
        //                       3
        // for (let i = 0; i < paperCount; i++) {
        //   const size = i === 0 ? smallSize : largeSize
        //   const start = i === 0 ? 0 : smallSize + (i - 1) * largeSize
        //   const end = i === 0 ? smallSize : smallSize + i * largeSize

        //   let inL = inList.slice(start, end)
        //   let outL = outList.slice(start, end)

        //   inL = inL.concat(Array.from({length: size - inL.length}).map(() => ({})))
        //   outL = outL.concat(Array.from({length: size - outL.length}).map(() => ({})))

        //   papers.push({
        //     inList: inL,
        //     outList: outL,
        //   })
        // }
        this.date = moment(date).format('YYYY年MM月DD日')
        this.digits = digits
        this.papers = papers
        this.loading = false
      },
      async onPrint () {
        this.printing = true

        await this.$nextTick()

        const area = this.$refs.area
        const els = Array.from(area.querySelectorAll('.paper'))

        await print(els, {
          direction: 'horizontal',
          injectGlobalCss: true,
          scanStyles: false,
          css: `
            @page {
              margin: 0 10mm;
            }
          `
        })

        this.printing = false
      }
    }
  }
</script>

<style lang="stylus">
  .ward-report-detail
    display flex
    flex-direction column
    height 100%
    .toolbar
      display flex
      align-items center
      height 41px
      padding 0 18px
      background-image linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%)
      border 1px solid #CBD5DD
      overflow hidden
      font-size 14px

      &-left
        flex 1

    .container
      padding 15px 0
      flex 1
      overflow auto

    .actions
      position fixed
      top 70px
      right 10px
      z-index 1

    .print-btn
      padding 10px 12px
      color #687179
      background #fff
      border 1px solid #adb4ba
      text-align center
      font-size 13px
      cursor pointer
      border-radius 2px

      &:hover
        background #fafafa
</style>
