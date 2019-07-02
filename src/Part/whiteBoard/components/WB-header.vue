<template>
  <div class="head-con" flex="cross:center main:justify">
    <div flex="cross:center">
      <img src="../images/南医三院骨研院骨科医院logo.png" alt="" class="his-logo">
      <div>
        <div class="wb-dept-name">
          <el-select v-model="deptValue" filterable placeholder="请选择" size="small" class="left-input" @change="changeDept(deptValue)">
            <el-option v-for="item in deptList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="user-name">护士长：{{adminNurse}}</div>
      </div>
    </div>
    <div class="title">我愿用美好心灵和精湛技术呵护每一位病人，使病人的生命延续，健康重现，幸福永在。</div>
    <div flex="cross:center">
      <div>
        <div class="date">{{day}}</div>
        <div class="week">{{week}}</div>
      </div>
      <div class="time">
        {{time}}
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@import '../style/wb.styl'
.wb-dept-name
  margin-left tovw(5)  
  .el-input__inner
    padding tovw(4) tovw(10) !important
    margin 0 !important
    text-align left
    height auto !important
    width tovw(180) !important
    font-size: tovw(22);
    color: #FFFFFF;
    letter-spacing: 0;
    text-shadow: 0 1px 1px rgba(0,0,0,0.20);  
    background transparent
    border 0 !important
    &:hover
      background #468E75
  .el-input__icon
    display none !important  
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../style/wb.styl'
.head-con
  height tovw(70)
  background: #4BB08D;
  padding 0 tovw(20) 0 tovw(33)
  position relative
  z-index 2
.his-logo
  width tovw(42)
.wb-dept-name
  font-size: tovw(22);
  color: #FFFFFF;
  letter-spacing: 0;
  text-shadow: 0 1px 1px rgba(0,0,0,0.20);  
.user-name
  font-size: tovw(14);
  color: #FFFFFF;
  letter-spacing: 0;
  text-shadow: 0 1px 1px rgba(0,0,0,0.20);  
  margin-top tovw(8)
  font-weight lighter
  margin-left tovw(14)  
.title
  text-align center  
  font-size: tovw(32);
  color: #FFFFFF;
  letter-spacing: 0;
  text-shadow: 0 1px 1px rgba(0,0,0,0.20);
  white-space nowrap
  text-overflow ellipsis
.date, .week
  font-size: tovw(13);
  color: #FFFFFF;
  letter-spacing: 0;
  text-shadow: 0 1px 1px rgba(0,0,0,0.20); 
  font-weight lighter
.week
  margin-top tovw(5)
  text-align right 
.time
  font-size: tovw(38);
  color: #FFFFFF;
  letter-spacing: 0;
  text-shadow: 0 1px 1px rgba(0,0,0,0.20);   
  margin-left tovw(10)
</style>

<script>
  import {
    nursingUnit
  } from '@/api/lesion'
  import moment from 'moment'
  export default {
    data() {
      return {
        deptValue: '',
        deptList: [],
        day: '',
        time: '',
        week: '',
        timer: ''
      }
    },
    computed: {
      adminNurse() {
        return localStorage['adminNurse'] || ''
      }
    },
    created() {
      nursingUnit().then((res) => {
        this.deptList = res.data.data.deptList
        this.deptValue = this.$store.state.lesion.deptCode || res.data.data.defaultDept || res.data.data.deptList[0].code
        this.$store.commit('upDeptCode', this.deptValue)
      })
      this.getData();
      this.timer = setInterval(() => {
        this.getData();
      }, 1000 * 60);
    },
    methods: {
      changeDept(value) {
        this.$store.commit('upDeptCode', value)
      },
      getData() {
        this.day = moment().format('YYYY/MM/DD')
        this.time = moment().format('HH:mm')
        this.week = moment().format('dddd')
      },
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    components: {}
  }
</script>
