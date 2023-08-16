<template>
  <div>
    <div class="content">
      <div class="left-part" v-loading.body="loading" element-loading-text="拼命加载中">
        <el-row class="header" type="flex" align="middle">
          <span class="title">检验列表</span>
          <el-select v-model="value" placeholder="请选择" class="select">
            <el-option v-for="item in options" :key="item.value" :value="item.label">
            </el-option>
          </el-select>
        </el-row>
        <div class="body" :style="{height: height}">
          <div class="item" v-for="(item,index) in listByFilter" :key="item.examNo" @click="toRight(item,index)"
           :class="{active: (!['foshanrenyi'].includes(HOSPITAL_ID) && item.testNo == rightData.testNo) || (['foshanrenyi'].includes(HOSPITAL_ID) && item.testNo == list[foshanRenyiChoseIndex].testNo) }">
            <div class="title">{{item.subject}}</div>
            <div class="aside">{{item.resultDate}}</div>
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
          <div class="null-con" v-show="listByFilter.length == 0&&!loading">
            <img src="../../../../common/images/task/nondata.png" alt="">
            <p>没有相关检验数据～</p>
          </div>
        </div>
      </div>
      <div class="right-part">
        <template v-if="['foshanrenyi'].includes(this.HOSPITAL_ID)">
          <testForm  ref="testForm" :tableHeaderInfo="tableHeaderInfo"></testForm>
        </template>
        <template v-else>
          <testForm v-if="rightData && rightData.testNo&&!['huadu'].includes(this.HOSPITAL_ID)" ref="testForm"></testForm>
        </template>
        <!--右边的检验报告单部分，花都的testFormHD组件，因为事件与其他医院不一样-->
        <testFormHD v-if="rightData && rightData.testNo&&['huadu'].includes(this.HOSPITAL_ID)" ref="testForm"></testFormHD>
      </div>
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
    .title
      font-size: 13px;
      color: #333333;
      line-height 16px
      font-weight bold
  .body
    padding 20px
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
  import testForm from './component/testForm'
  import testFormHD from './component/testFormHD'
  import {
    testList
  } from '@/api/patientInfo'
  export default {
    data() {
      return {
        list: [],
        rightData: {},
        tableHeaderInfo:{},
        loading:true,
        foshanRenyiChoseIndex:0,
        options: [{
          label: '全部'
        }, {
          label: '全血'
        }, {
          label: '静脉血'
        }, {
          label: '粪便'
        }, {
          label: '小便'
        }],
        value: '全部'
      }
    },
    computed: {
      infoData() {
        return this.$route.query
      },
       listByFilter() {
        return this.list.filter((item) => {
          if(this.value == '全部') return true
          return item.specimen == this.value
        })
      },
      wih() {
        return this.$store.state.common.wih
      },
      height() {
        return `${this.wih - 255}px`
      },
      selectPatient() {
        return this.$store.state.patient.currentPatient;
      }
    },
    created() {
      const patientId = this.selectPatient ? this.selectPatient.patientId : this.infoData.patientId;
      const visitId = this.selectPatient ? this.selectPatient.visitId : this.infoData.visitId;
      testList(patientId, visitId).then((res) => {
        this.loading = false
        this.list = res.data.data || []
        if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
          this.rightData = this.list.map(item=>{
            Object.keys(item).filter(str=>!['testResultList'].includes(str)).forEach((keys)=>{
              //返回testResultList数组  把上级的属性合并起来  前端需要用到
              this.tableHeaderInfo[`${keys}`] = item[`${keys}`]
              item.testResultList.map((reqList)=>{
                if(!reqList[`${keys}`]){
                reqList[`${keys}`] = item[`${keys}`]
                }
              })
            })
            return item.testResultList
          })
          this.toRight(this.rightData[this.foshanRenyiChoseItoRightndex])
        }else{
          if (this.$route.query.id) {
            this.rightData['testNo'] = this.$route.query.id || ''
            this.toRight(this.rightData)
          } else
            this.toRight(this.list[0])
        }
      })
    },
    methods: {
      toRight(data,index) {
        if(!['foshanrenyi'].includes(this.HOSPITAL_ID)){
          this.rightData = data
        }else{
          this.foshanRenyiChoseIndex = index?index:0
          data = this.rightData[this.foshanRenyiChoseIndex]
          this.tableHeaderInfo = data[0]
        }
        this.$nextTick(() => {
          this.$refs.testForm && this.$refs.testForm.open(data)
        })
      }
    },
    components: {
      testForm,
      testFormHD
    }
  }
</script>
