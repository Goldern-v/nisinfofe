<template>
  <div class="patient-list-part">
    <div class="search-box">
      <el-input placeholder="床号/姓名" icon="search" v-model="searchWord"></el-input>
      <el-select
        size="small"
        v-model="patientGroup"
        placeholder="病人分组"
        clearable
        v-if="hasPatientGroup"
        style="margin-top: 8px"
      >
        <el-option
          v-for="opt in patientGroup4Expand3"
          :key="opt.value"
          :label="opt.name"
          :value="opt.value">
        </el-option>
      </el-select>
    </div>
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
        <div class="bed">{{item.bedLabel}}床</div>
        <div class="cathter-icon" v-if="item.catheterIcon">{{item.catheterIcon}}</div>
        <img
          src="../../../../common/images/record/文件夹.png"
          alt
          class="has-file"
          v-if="item.config && item.config.hasCreatedDvc"
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
  // height calc( 100% - 41px)
  flex: 1;
  overflow: auto;
  box-sizing border-box
  padding-top 11px
  position relative
  z-index 998
  background-color #fff
  border-right 1px solid #CBD5DD
.patient-list-contain
  padding 0px 5px 11px
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
  position fixed
  top 66px
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
.cathter-icon
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 20px;
  text-align: center;
  color: #21a0ff;
  margin-left: 5px;
</style>
<script>
export default {
  props: {
    data: Array,
    hasPatientGroup: Boolean,
  },
  data() {
    return {
      searchWord: "",
      patientGroup: "",
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
      let renderList = this.data.filter(
        item => item.bedLabel.indexOf(this.searchWord) > -1 || item.name.indexOf(this.searchWord) > -1
      )
      if (this.patientGroup && this.hasPatientGroup) {
        renderList = renderList.filter(item => item.expand3 === this.patientGroup);
      }
      return this.HOSPITAL_ID=='whfk'?renderList
      .sort((item1,item2)=> item1.bedLabel - item2.bedLabel)
      :
      renderList
    },
    // 病人分组（expand3字段）
    patientGroup4Expand3() {
      const result = Array.from(
        new Set(this.data.map(item => item.expand3))
      )
      .sort()
      .map(item => {
        return {
          name: item ? `分组${item}` : '无',
          value: item
        }
      })
      return result
    },
  },
  created() {
    this.$store.commit("upPatientInfo", {});
  },
  components: {}
};
</script>
