<template>
  <div>
    <!-- <div class="no-do-bg" v-show="show" @click="close"></div> -->
    <transition name="el-zoom-in-left">
      <div class="slide-con" v-show="show">
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">特殊情况模版</span>
          <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <div>
          <div class="search-con" flex>
            <div class="select-box" :style="{width: selectWidth + 'px'}">
              <el-select v-model="selectedType" filterable placeholder="请选择">
                <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <input
              type="text"
              flex-box="1"
              class="search-input"
              placeholder="请输入你要查找的模版…"
              v-model="searchWord"
            />
            <whiteButton text icon="icon-search"></whiteButton>
          </div>
          <div class="list-con">
            <div v-for="(item, key) in filterData" :key="key">
              <templateItem :data="item" :key="item.id" :refName="refName"></templateItem>
            </div>
          </div>
          <div class="footer-con" flex="main:center cross:center" @click="openAddModal">
            <i class="iconfont icon-tianjia"></i> 新建模板
          </div>
        </div>
      </div>
    </transition>
    <addTemplateModal ref="addTemplateModal"></addTemplateModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box
  .el-checkbox__label
    font-size: 12px;
    color: #687179;
    white-space normal
  textarea
    font-size: 12px;
    color: #687179;
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.no-do-bg
  position fixed;
  top:0;
  bottom:0;
  left: 0;
  right: 0;
  z-index 2001
.slide-con
  width 360px
  height 100%
  box-sizing border-box
  position fixed
  top 0
  bottom 0
  right 0
  background #fff
  box-shadow 0 0 20px rgba(0,0,0,0.4)
  z-index 1000000
  background: #fff;
  z-index 2002
.head-con
  height 46px
  background: #F7FAFA
  border-bottom: 1px solid #EAEEF1;
  padding 0 10px 0 20px
  .title
    font-size: 15px;
    color: #333333;
    font-weight bold
  .close-btn
    font-size 12px
    padding 10px 10px
    cursor pointer
.search-con
  margin 10px 20px
  .search-input
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 0
    border-right 0px
    border-left 0px
    outline none
    padding-left 10px
    font-size: 12px;
    color: #687179
.list-con
  height calc(100vh - 145px)
  overflow auto
.listMap-title
  font-size: 14px;
  color: #333333
  font-weight bold
  padding-right 50px
  padding-left 20px
  padding-top 10px
  padding-bottom 10px
  min-height 14px
.footer-con
  height 46px
  background #4BB08D
  position absolute
  bottom 0
  left 0
  right 0
  font-size 14px
  color #fff
  cursor pointer
  box-shadow: 0px -1px 5px rgba(0,0,0,0.1)
  &:hover
    background #5CC6A1
  i
    margin-right 5px
    font-weight bold
    font-size 12px
.select-box
  // margin-right 10px
  width 100px
  >>>.el-input__inner
    height 32px
    background #f7fafa
    border-radius 2px 0 0 2px
  >>>  input
      width 100% !important
</style>

<script>
import whiteButton from "@/components/button/white-button.vue";
import templateItem from "./template-item.vue";
import { typeList, list } from "../../api/template";
import addTemplateModal from "./add-template-modal.vue";
import bus from "vue-happy-bus";
import { keyNameMap, keyCodeMap } from "./deptMapList";
import commom from "@/common/mixin/common.mixin.js";
export default {
  mixins: [commom],
  data() {
    return {
      bus: bus(this),
      data: {},
      show: false,
      searchWord: "",
      selectedTab: "1",
      listMap: [],
      typeList: [],
      selectedType: "",
      selectWidth: 100,
      refName: "",
      deptENName: keyNameMap[this.deptName] || "neurology"
    };
  },
  computed: {
    filterData() {
      let listMap = this.listMap;
      let filterData = listMap.filter(item => {
        return (
          (item.content || "").indexOf(this.searchWord) > -1 ||
          (item.title || "").indexOf(this.searchWord) > -1
        );
      });
      return filterData;
    }
  },
  methods: {
    open(refName) {
      this.getData();
      if (this.show) {
        if (this.refName == refName) {
          this.show = false;
        } else {
          this.show = false;
          setTimeout(() => {
            this.show = true;
          }, 400);
        }
      } else {
        this.show = true;
      }
      this.refName = refName;
      this.selectWidth = 100;
      setTimeout(() => {
        this.selectWidth = 101;
      }, 300);
    },
    close() {
      this.show = false;
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    getData() {
      this.deptENName = keyNameMap[this.deptName] || "neurology";
      typeList(this.deptCode||this.deptENName).then(res => {
        this.typeList = res.data.data.list;
        if (this.selectedType) {
          list(this.selectedType, this.deptCode||this.deptENName).then(res => {
            this.listMap = res.data.data.list;
          });
        } else {
          this.selectedType = this.typeList[0];
        }
      });
    },
    openAddModal() {
      this.$refs.addTemplateModal.open();
    },
    addTemplateAtDoc(item) {
      this.bus.$emit("addTemplateAtDoc", item.content);
    }
  },
  created() {
    this.bus.$on("refreshTemplate", this.getData);
  },
  mounted() {
    //  this.show = false
  },
  watch: {
    selectedType() {
      if (this.selectedType) {
        this.deptENName = keyNameMap[this.deptName] || "neurology";
        list(this.selectedType, this.deptCode||this.deptENName).then(res => {
          this.listMap = res.data.data.list;
        });
      }
    }
  },
  components: {
    whiteButton,
    templateItem,
    addTemplateModal
  }
};
</script>
