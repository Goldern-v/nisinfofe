<template>
  <div style="height: 100%">
    <div class="contain">
      <h1>护理措施</h1>
      <ul class="list">
        <li flex="cross:center" v-for="item of formData" :key="item.id" @click="openSlide(item)">
          <span @click.stop="select(item)" style="height: 20px">
            <img src="../../../../common/images/home/done.png" alt="" v-if="active(item.diagnosisCode)" />
            <img src="../../../../common/images/home/默认@2x.png" alt="" v-else />
            </span>
          <span style="width:0" flex-box="1">{{item.diagnosisName}}</span>
          <img src="../../../../common/images/home/已添加@2x.png" alt="" v-if="has(item.diagnosisCode)">
          <img src="../../../../common/images/home/未添加@2x.png" alt="" v-else>
          <div class="tip-con">
            <tipCon :data="item"></tipCon>
          </div>
        </li>
      </ul>
      <!-- <h1 style="margin-top: 20px">历史护理诊断</h1>
        <ul class="list">
          <li flex="cross:center" v-for="item of hisDiags" :key="item.id" style="background: #F2F2F2">
            <img src="../../../../common/images/home/done.png" alt=""/>
            <span style="width:0" flex-box="1">{{item.name}}</span>
           <img src="../../../../common/images/home/已添加@2x.png" alt="" />
          </li>
        </ul> -->
    </div>
    <Diagnosis></Diagnosis>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  padding 10px;
  background #f8f8f8
  height 100%
  // overflow-y  auto
  // overflow-x visible
  h1
    font-size 14px;
    font-weight bold
  .list
    li
      height 36px;
      margin 5px 0
      background #fff
      cursor pointer
      position relative
      overflow visible
      &:hover
        .tip-con
          display block
      span
        white-space nowrap
        text-overflow ellipsis
      img
        width 18px
        height 18px
        margin 0 8px
        &.active
          color #4BB08D
.tip-con
  position absolute
  width 486px
  left -496px
  top -20px
  padding-right 20px
  padding-top 20px
  // 强行隐藏哈哈
  display none
  z-index 10px
</style>

<script>
  import Diagnosis from './Diagnosis'
  import tipCon from './tip-con/tip-con.vue'
  export default {
    props: {
      formCode: String
    },
    data() {
      return {}
    },
    created() {
      window.getDiagnosis = (key, value) => {}
    },
    computed: {
      formData() {
        return this.$store.state.form.formData
      },
      hisDiags() {
        return this.$store.state.form.hisDiags
      },
      measureList() {
        return this.$store.state.form.measure
      },
      selectList() {
        return this.$store.state.form.select
      }
    },
    watch: {
      selectList() {
        this.$store.commit('upSelect', this.selectList)
      }
    },
    methods: {
      openSlide(item) {
        window.openSlide(item)
      },
      select(item) {
        let code = item.diagnosisCode
        let _ = this.$_
        if (this.$_.indexOf(this.selectList, code) > -1) {
          this.selectList.splice(this.$_.indexOf(this.selectList, code), 1)
        } else {
          // if (this.$_.indexOf(_.map(this.measureList, _.property('code')), code) == -1) {
          if (this.$_.indexOf(_.map(this.measureList, _.property('diagnosisCode')), code) == -1) {
            this.openSlide(item)
            return
          }
          this.selectList.push(code)
        }
      },
      active(code) {
        if (this.$_.indexOf(this.selectList, code) > -1) {
          return true
        } else {
          return false
        }
      },
      has(code) {
        // if (this.$_.indexOf(_.map(this.measureList, _.property('code')), code) > -1) {
        if (this.$_.indexOf(_.map(this.measureList, _.property('diagnosisCode')), code) > -1) {
          return true
        } else {
          return false
        }
      }
    },
    components: {
      Diagnosis, tipCon
    }
  }
</script>
