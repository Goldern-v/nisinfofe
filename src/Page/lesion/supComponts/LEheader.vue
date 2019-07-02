<template>
  <div>
    <el-row class="nav-con" type="flex" justify="space-between" align="middle">
      <el-row class="left-part" type="flex" align="middle">
        <span class="title">护理单元：</span>
        <el-select v-model="deptValue" filterable placeholder="请选择" size="small" class="left-input" @change="changeDept(deptValue)">
          <el-option
            v-for="item in deptList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-row>
      <el-row type="flex" class="main-part">
        <!-- <router-link to="/lesion/task" tag="span">
          <div class="nav-item">
            今日任务
          </div>
        </router-link> -->
        <router-link to="/lesion/bed" tag="span">
          <div class="nav-item">
            床位一览卡
          </div>
        </router-link>
        <router-link to="/lesion/log" tag="span">
          <div class="nav-item">
            病区动态日志
          </div>
        </router-link>
        <router-link to="/lesion/infuse" tag="span">
          <div class="nav-item">
            智慧输液
          </div>
        </router-link>
         <router-link to="/lesion/shift" tag="span">
          <div class="nav-item">
            交班表
          </div>
        </router-link>
        <!-- <router-link to="/lesion/implementation" tag="span">
          <div class="nav-item">
            执行单
          </div>
        </router-link> -->
        <!--
        <router-link to="/dev" tag="span">
          <div class="nav-item">
            病人统计
          </div>
        </router-link> -->
      </el-row>
      <div class="right-part">
        <!-- <span class="time">数据最后更新：今天{{$store.state.lesion.updateDataTime}}  </span> -->
        <!-- <el-button class="up-btn" v-touch-ripple @click="refreshAll">立即更新</el-button> -->
      </div>
    </el-row>
    <div style="height: 62px"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .nav-con
    height 62px;
    background #F8F8F8
    padding 0 20px
    border-bottom: 1px solid #CBD5DD;
    position fixed
    width 100%
    z-index 10
    .left-part
      width 250px
      height 30px
      .title
        font-size: 12px;
        color: #687179
      .left-input
        width 126px;
        background: #FFFFFF;
        border-radius: 4px;
        font-size: 12px;
        color: #333333;
    .right-part
      width 250px
      text-align right
      .time
        font-size: 12px;
        color: #687179;
      .up-btn
        width 76px;
        height 30px;
        font-size: 12px;
        color: #687179;
        padding 0
        margin-left 10px;

  .main-part
    height 37px;
    background-image: linear-gradient(-180deg, #FEFEFE 0%, #F2F2F2 100%);
    border: 1px solid #C2CBD2;
    border-radius: 4px;
    .nav-item
      font-size: 12px;
      color: #687179;
      letter-spacing: 0;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.70);
      padding 0 18px
      line-height 37px
      cursor pointer
    .router-link-active
      background: #E5E5E5;
      box-shadow: inset 0 4px 7px 0 rgba(0, 0, 0, 0.15);
    span
      border-right 1px solid #fff
      &:last-child
        border 0
</style>
<script>
  import {nursingUnit} from '@/api/lesion'

  export default {
    data() {
      return {
        deptValue: '',
        deptList: []
      }
    },
    computed: {
      deptCode() {
        return this.$store.state.lesion.deptCode
      }
    },
    watch: {
      deptCode() {
      }
    },
    created() {
      nursingUnit().then((res) => {
        this.deptList = res.data.data.deptList
        this.deptValue = localStorage.selectDeptValue || this.$store.state.lesion.deptCode || res.data.data.defaultDept || res.data.data.deptList[0].code
        this.$store.commit('upDeptCode', this.deptValue)
        localStorage.selectDeptValue = this.deptValue
      })
    },
    methods: {
      changeDept(value) {
        let deptName = this.deptList.filter((item) => {
          return item.code == value
        })[0].name
        this.$store.commit('upDeptCode', value)
        localStorage.selectDeptValue = value
        this.$store.commit('upDeptName', deptName)
      },
      refreshAll() {
         window.location.reload()
      }
    },
    components: {}
  }
</script>
