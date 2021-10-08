<template>
  <div class="patient-list-part">
    <el-input placeholder="床号/姓名" icon="search" class="search-box" v-model="searchWord"></el-input>
    <div class="patient-list-contain">
      <div
        class="patient-box"
        flex="cross:center"
        v-for="item in list"
        :key="item.patientId"
        @click="selectPatient(item)"
        :class="{active: isActive(item)}"
      >
        <img src="./images/男默认头像.png" alt class="img" v-if="item.sex == '男'">
        <img src="./images/女士默认头像.png" alt class="img" v-else>
        <div class="name" flex-box="1">{{item.name}}</div>
        <div class="bed">{{item.bedLabel}} 床</div>
        <img
          src="../../../../common/images/record/文件夹.png"
          alt
          class="has-file"
          v-if="item.config.hasCreatedDvc"
        >
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.has-file
  position absolute
  left 28px
  top 18px
  width 20px
.patient-list-part
  height 100%
  box-sizing border-box
  padding-top 11px
  position relative
  border-right 1px solid #CBD5DD
.patient-list-contain
  padding 0px 13px 11px
  height 100%
  box-sizing border-box
  overflow auto
  cursor pointer
  .patient-box
    padding 6px 10px
    font-size 13px
    border-radius 3px
    margin 1px 0
    position relative 
    .img
      height 30px
      width 30px
      border-radius 50%
      margin-right 11px
    .name
      color #687179
    .bed
      color #333333
    &:hover
      background #F7F7FA
    &.active
      background #F1F1F5
      font-weight bold
      .name
        color #333333
.search-box
  position absolute
  top -35px
  left 15px
  width 168px
  >>>&.el-input
    margin-bottom 5px
  >>>.el-input__inner
    height 28px
    outline none  
    padding-left 10px
    background #fff    
    border-radius 4px
    font-size 12px !important
    color #333   
</style>
<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      searchWord: ""
    };
  },
  methods: {
    selectPatient(item) {
      this.$emit('onChangePatient',item)
      this.$store.commit("upPatientInfo", item);
    },
    isActive(item) {
      return item.patientId == this.$store.state.sheet.patientInfo.patientId;
    }
  },
  computed: {
    list() {
      return this.data.filter(item => {
        return (
          item.bedLabel.indexOf(this.searchWord) > -1 ||
          item.name.indexOf(this.searchWord) > -1
        );
      });
    }
  },
  created() {
    this.$store.commit("upPatientInfo", {});
  },
  components: {}
};
</script>
