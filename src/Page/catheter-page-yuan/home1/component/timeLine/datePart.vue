<template>
  <div>
    <div class="select-box">
      <span class="title">任务类型</span>
      <el-select v-model="type" placeholder="请选择" class="select">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="body-con">
      <div class="card-part left">
       <dateLeft :getData="patientNursing" :status="0" :type="type" :done="false" :time="time"></dateLeft>
      </div>
      <div class="card-part right">
       <dateLeft :getData="patientNursing" :status="1" :type="type" :done="true" :time="time"></dateLeft>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title
  font-size: 13px;
  color: #333333;
  font-weight bold
.select-box
  margin-top 16px
  margin-bottom 16px  
.card-part
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;  
  height 547px
  width 49%
  &.left
    float left
  &.right
    float right  
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
    .list-box
      font-size: 13px;
      color: #687179;
      padding 10px 13px
      border: 1px solid #E4E8EB;
      border-radius: 2px;
      .time
        width 80px
      .tip
        margin-left 10px 
.body-con
  // margin-bottom 20px  
  overflow hidden
  
</style>

<script>
  import {
    patientNursing
  } from '@/api/patientInfo'
  import dateLeft from './dateLeft'
  export default {
    props: {
      time: ''
    },
    data() {
      return {
        options: [{
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '基础任务'
        },
        {
          value: 2,
          label: '文书任务'
        },
        {
          value: 3,
          label: '护理任务'
        },
        {
          value: 4,
          label: '执行单任务'
        },
        {
          value: 5,
          label: '其他任务'
        }],
        type: 0,
        doneData: '',
        needDoData: ''
      }
    },
    computed: {
      patientNursing() {
        return patientNursing
      }
    },
    components: {
      dateLeft
    }
  }
</script>
