<template>
  <div>
    <div class="content">
      <el-row style="height: 100%">
        <div class="left-part" v-loading="loading" element-loading-text="拼命加载中">
          <el-row class="header" type="flex" align="middle">
            <div>
              <span class="title">检验列表</span>
              <el-select v-model="value" placeholder="请选择" class="select">
                <el-option v-for="item in options" :key="item.value" :value="item.label">
                </el-option>
              </el-select>
            </div>
            <el-button type="primary" size="mini" @click="writeDescription">
              写入
            </el-button>
          </el-row>
          <div class="body" :style="{ height: height }">
            <!-- <el-radio-group v-model="radio"> -->
            <div class="item" v-for="(item, index) in listByFilter" :key="item.examNo" @click="toRight(item, index)"
              :class="{ active: (!['foshanrenyi'].includes(HOSPITAL_ID) && item.testNo == rightData.testNo) || (['foshanrenyi'].includes(HOSPITAL_ID) && item.testNo == list[radio].testNo) }">
              <!-- <el-checkbox :label="(index)" class="fscheckBox" ><br/></el-checkbox> -->
              <el-radio :label="index" class="fscheckBox" v-model="radio"><br /></el-radio>
              <div class="title">{{ item.subject }}</div>
              <div class="aside">{{ item.resultDate }}</div>
              <div class="result">
                <span v-if="item.isAbnormal == '0' && item.resultStatus == '已出报告'">
                  <img src="../../../../common/images/info/完成@2x.png" alt="">
                </span>
                <span v-if="item.resultStatus != '已出报告'">
                  未出报告
                </span>
                <span v-if="item.isAbnormal != '0' && item.resultStatus == '已出报告'">
                  <img src="../../../../common/images/info/有问题@2x.png" alt="">
                </span>
              </div>
            </div>
            <!-- </el-radio-group> -->
            <div class="null-con" v-show="listByFilter.length == 0 && !loading">
              <img src="../../../../common/images/task/nondata.png" alt="">
              <p>没有相关检验数据～</p>
            </div>
          </div>
        </div>
        <div class="right-part">
          <testFormFSRY ref="testForm" :tableHeaderInfo="tableHeaderInfo" :info="info" :checkNum='radio'></testFormFSRY>
        </div>
      </el-row>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px 20px;
}
.left-part
  float left
  width 36%
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  .header
    padding 0 16px
    background: #F7FAFA;
    height 65px
    border-bottom 1px solid #EAEEF1;
    display: flex;
    justify-content: space-between;
    .title
      font-size: 13px;
      color: #333333;
      line-height 16px
      font-weight bold
  .body
    padding 20px
    padding-left: 40px !important
    background #fff
    overflow auto
    .item
      padding 11px 14px 11px 14px
      margin-bottom 10px
      border: 1px solid #E4E8EB;
      border-radius: 2px;
      position relative
      cursor pointer
      &.active
        background: #F2F2F2;
      .title
        font-size: 13px;
        line-height 20px
        color: #687179;
        margin-right 50px
      .aside
        font-size: 12px;
        color: #999999;
        margin-top 10px
      .result
        position absolute
        top 8px
        right 10px
        font-size: 13px;
        color: #E72C2C;
        img
          height 22px
.right-part
  float right
  width 63%
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
.null-con
  img
    display block
    margin 20% auto 20px
    width 120px
  p
    text-align center
    font-size: 13px;
		color: #666;
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.select .el-input__inner
  height 30px
  width 126px
  font-size: 12px;
  color: #333333;
.fscheckBox
  position absolute;
  top: 25px;
  left: -30px;
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.left-part  .header .select .el-input__inner
  height 30px
  width 126px
  margin-left 16px
  font-size: 12px;
  color: #333333;
</style>

<script>
import testFormFSRY from './component/testFormFSRY'
//佛一的接口数据 json对象 可以直接在created this.list = res.data.data上更改
import tessData from '../test/testData.json'
import moment from "moment";
import { testItems,testItemsWhsl } from "@/api/patientInfo";
import {
  testList
} from '@/api/patientInfo'
import bus from "vue-happy-bus";
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      list: [],
      rightData: '',
      loading: true,
      tableHeaderInfo: {},
      options: [{
        label: "全部",
      }],
      value: '全部',
      radio: 0,
      bus: bus(this),
    }
  },
  computed: {
    infoData() {
      return this.$route.query
    },
    listByFilter() {
      return this.list.filter((item) => {
        if (this.value == '全部') return true
        return item.specimen == this.value
      })
    },
    wih() {
      return this.$store.state.common.wih
    },
    height() {
      return `${this.wih - 255}px`
    }
  },
  created() {
    testList(this.infoData.patientId, this.infoData.visitId).then((res) => {
      this.loading = false
      this.list = res.data.data
      // this.list = tessData
      const fsryOption = res.data.data.length && Array.from(new Set(res.data.data.map((listItem) => {
        return listItem.specimen
      })))
      fsryOption.map((fsryOptionList) => {
        this.options.push({ label: fsryOptionList })
      })
      if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        this.rightData = this.list.map(item => {
          Object.keys(item).filter(reqList => !['testResultList'].includes(reqList)).forEach((keys) => {
            //返回testResultList数组  把上级的属性合并起来  前端需要用到
            if (!this.tableHeaderInfo[`${keys}`]) {
              this.tableHeaderInfo[`${keys}`] = item[`${keys}`]
            }
            item.testResultList && item.testResultList.map((reqList) => {
              if (!reqList[`${keys}`]) {
                reqList[`${keys}`] = item[`${keys}`]
              }
            })
          })
          return item.testResultList
        })
        this.toRight(this.rightData[0], 0, this.list.length)
      } else {
        this.toRight(this.list[0], 0, this.list.length)
      }
    })
  },
  methods: {
    async writeDescription() {
      let str = ''
      // 当前按钮的数组
      let activeCheckList = this.$refs.testForm.checkList[this.$refs.testForm.activeIndex]
      if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        activeCheckList = Array.from(this.$refs.testForm.checkList).map((list, index) => {
          return { index, checkList: list }
        }).filter((checkListItem) => checkListItem.checkList.length > 0)
        const checkTestFormData = []
        activeCheckList.forEach((checkItem) => {
          for (let i = 0; i < checkItem.checkList.length; i++) {
            const nowItem = checkItem.checkList[i]
            const checkTestForm = this.list[checkItem.index]
            checkTestFormData.push(checkTestForm.testResultList[nowItem])
          }
        })
        const mapObj = {}
        checkTestFormData.forEach((item, index) => {
          if (!mapObj[item.testNo]) {
            mapObj[item.testNo] = true
            str += `${item.resultDate}  `
            str += `${item.subject}：`
          }
          str += `${item.itemName} ：`
          str += `${item.result}`
          if (!isNaN(`${item.result}`)) {
            str += `${item.units}  `
          }
          str += `${item.expand3}。\n`
        })
      }else if(['whsl'].includes(this.HOSPITAL_ID)){
        if (activeCheckList.length > 0) {
         const res  = await testItemsWhsl(this.listByFilter[this.radio].testNo)
         for (var i = 0; i < activeCheckList.length; i++) {
           const nowItem = activeCheckList[i]
           str += `${res.data.data[nowItem].itemName}`
           str += `${res.data.data[nowItem].result}`
           str += `${res.data.data[nowItem].units};`
         }
        }
      } else {
        if (activeCheckList.length > 0) {
          const res = await testItems(this.listByFilter[this.radio].testNo)
          for (var i = 0; i < activeCheckList.length; i++) {
            // 当前按钮的数组的项
            const nowItem = activeCheckList[i]
            if (i == 0) {
              const strDate = this.listByFilter[this.radio].resultDate ? moment(this.listByFilter[this.radio].resultDate).format("YYYY-MM-DD"): ''
              str += `${this.listByFilter[this.radio].subject},`
              str += strDate ? `${strDate},` : ''
              str += `${res.data.data[nowItem].itemName},`
              str += `${res.data.data[nowItem].result}`
              str += `${res.data.data[nowItem].units},`
            } else {
              str += `${res.data.data[nowItem].itemName},`
              str += `${res.data.data[nowItem].result}`
              str += `${res.data.data[nowItem].units},`
            }
          }
        }
      }
      this.$emit('closeSweet')
      this.bus.$emit("openclosePatientInfo", '', true)
      this.bus.$emit('syncReportFSSY', str)
    },
    toRight(data, index, clLength) {
      this.radio = index
      if (!['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        this.rightData = data
        this.tableHeaderInfo = data
      } else {
        //初始化的时候合并的，点击之后拿点击的表头
        data = this.rightData&&this.rightData[index]
        this.tableHeaderInfo = data&&data[0]
      }
      this.$nextTick(() => {
        this.$refs.testForm && this.$refs.testForm.open(data, index, clLength)
      })
    }
  },
  components: {
    testFormFSRY
  }
}
</script>
