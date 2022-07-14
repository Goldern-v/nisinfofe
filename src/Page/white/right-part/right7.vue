<template>
  <div style="padding-bottom: 20px;">
    <boxBase :title="whiteRightTitle.includes(HOSPITAL_ID) ? '护理安全日志' : '安全日志指标'" :icon="require('../images/留言板.png')">
      <div class="body-con"
           v-loading="pageLoading"
           slot="body-con">
           <div class="group" style="padding-bottom: 20px;">
             <label>项目</label>
             <label>安全天数</label>
           </div>
           <div v-if="HOSPITAL_ID == 'liaocheng'">
             <div class="group" v-for="items in list1" :key="items.prop">
             <label>{{items.name}}</label>
             <div class="right">
                <div class="day">
                  {{listData[items.prop] || 0}}
                </div>
                <div class="date">
                  <el-date-picker
                    v-model="allDate[items.prop]"
                    type="date"
                    placeholder="选择日期" @change="changeDate($event,items.prop)">
                  </el-date-picker>
                </div>
             </div>
           </div>
           </div>
           <div v-else>
             <div class="group" v-for="item in list" :key="item.prop">
             <label>{{item.name}}</label>
             <div class="right">
                <div class="day">
                  {{listData[item.prop] || 0}}
                </div>
                <div class="date" v-if="item.prop != 'total'">
                  <el-date-picker
                    v-model="allDate[item.prop]"
                    type="date"
                    placeholder="选择日期" @change="changeDate($event,item.prop)">
                  </el-date-picker>
                </div>
             </div>
           </div>
           </div>
      </div>
    </boxBase>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  margin 12px 10px 12px 20px
  min-height 220px
  .group
    display flex
    justify-content space-between
    align-items center
    padding-bottom 5px
    .right
      position relative
      .el-input
        width 85px
      >>>.el-input__inner
        height 30px
        line-height 30px
        border: none;
      .day
        width 70px
        height 30px
        font-size 14px
        text-align right
        color #4bb08d
        line-height 30px
        font-weight bold
        padding-right 35px
        white-space: nowrap
      .date
        position absolute
        top 0
        right 0
        >>>.el-input__inner
          opacity 0

</style>
<script>
import boxBase from '../base/box-base.vue'
import slider from './slider/slider.vue'
import { getWhiteLogIndicators,saveWhiteLogIndicators } from '../api'
import common from '@/common/mixin/common.mixin.js'
import bus from 'vue-happy-bus'
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      list: [
        {
          name: '院内压力性损伤',
          prop: 'ylxss'
        },
        {
          name: '跌倒坠床',
          prop: 'ddzc'
        },
        {
          name: '管道脱落',
          prop: 'glht'
        },
        {
          name: '安全用药',
          prop: 'aqyy'
        },
        {
          name: '总天数',
          prop: 'total'
        },
      ],
      list1: [
        {
          name: '院内压力性损伤',
          prop: 'ylxss'
        },
        {
          name: '跌倒',
          prop: 'ddzc'
        },
        {
          name: '非计划拔管',
          prop: 'glht'
        },
        {
          name: '安全用药',
          prop: 'aqyy'
        },
        {
          name: '安全总天数',
          prop: 'total'
        },
      ],
      listData: {},
      allDate: {},
      whiteRightTitle:['liaocheng']
    }
  },
  created() {
    this.bus.$on('indexGetAllData', this.getData)
  },
  methods: {
    // 查询安全指标
    getData() {
      this.pageLoading = true
      getWhiteLogIndicators(this.deptCode).then(res => {
        this.listData = res.data.data || {};
        this.pageLoading = false
      })
    },
    // 新增和修改安全指标
    // {
    // 	"deptCode":"",
    // 	"ylxssDate":"院内压力性损伤日期",
    // 	"ddzcDate":"跌倒坠床日期",
    // 	"glhtDate":"管理滑脱日期",
    // 	"aqyyDate":"安全用药日期",
    //  "totalDate":"总天数日期"
    // }
    changeDate(val,prop){
      if(this.HOSPITAL_ID == 'liaocheng') {
        var data = {
        deptCode: this.deptCode,
        ylxssDate: this.listData.ylxssDate,
        ddzcDate: this.listData.ddzcDate,
        glhtDate: this.listData.glhtDate,
        aqyyDate: this.listData.aqyyDate,
        totalDate: this.listData.totalDate,
        }
      } else {
        var data = {
        deptCode: this.deptCode,
        ylxssDate: this.listData.ylxssDate,
        ddzcDate: this.listData.ddzcDate,
        glhtDate: this.listData.glhtDate,
        aqyyDate: this.listData.aqyyDate,
        }
      }

      data[`${prop}Date`] = val;
      saveWhiteLogIndicators(data).then(res=>{
        this.getData();
      })
    }

  },
  components: {
    boxBase, slider
  }
}
</script>
