<template>
  <div>
    <!-- <div class="no-do-bg" v-show="show" @click="close"></div> -->
    <transition name="el-zoom-in-left">
      <div class="slide-con" v-show="show">
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">自定义标题模版</span>
          <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <div>
          <div class="search-con" flex>
            <input
              type="text"
              flex-box="1"
              class="search-input"
              placeholder="请输入你要查找的模版…"
              v-model="searchWord"
            >
            <whiteButton text icon="icon-search"></whiteButton>
          </div>
          <div class="list-con">
            <!-- <div v-for="(item, key) in filterData" :key="key"> -->
              <templateItem :listData="filterData" ></templateItem>
            <!-- </div> -->
          </div>
          <div class="footer-con" flex="main:center cross:center" @click="openAddModal">
            <i class="iconfont icon-tianjia"></i> 新建模板
          </div>
        </div>
      </div>
    </transition>
    <addTemplateModal ref="addTemplateModal"></addTemplateModal>
    <addTemplateModalTemp ref="Temperature" v-if="isTemperature"></addTemplateModalTemp>
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
</style>

<script>
import whiteButton from "@/components/button/white-button.vue";
import templateItem from "./components/title-template-item-fssy.vue";
import addTemplateModal from "./add-title-template-modal-fssy.vue";
import addTemplateModalTemp from "./add-title-template-modal.vue";
import bus from "vue-happy-bus";
import {titleTemplateList} from "./api/index"
import sheetInfo from "../config/sheetInfo/index.js";
export default {
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
    };
  },
  computed: {
    filterData() {
      let listMap = this.listMap;
      let IstitleData = []
      let titleData = []

      // listMap.map((item,index)=>{
      //   let deleteList = []
      //   if(item.list.length <= 0){
      //     deleteList = item.list
      //     deleteList.map((sonItem)=>{
      //       IstitleData.push({
      //         groupName:sonItem.title,
      //         id:sonItem.id,
      //         recordCode:sonItem.recordCode,
      //         wardCode:sonItem.wardCode,
      //       })
      //     })
      //   //  listMap.splice(index,1)
      //   }else{
      //     item['children'] = item.list
      //     titleData.push(item)
      //   }
      // })
      // let setListData = [...IstitleData,...titleData]
      // let filterData = setListData;
      // console.log(filterData);
      if (!this.searchWord) return listMap
      return listMap.filter(item => {
        return item.title.indexOf(this.searchWord) > -1;
      });
      // return filterData;
    },
    isTemperature(){
      return this.$route.path.includes('newSingleTemperatureChart')||this.$route.path.includes("temperature")

    }

  },
  watch: {
    selectedType() {
      if (this.selectedType) {
        list(this.selectedType).then(res => {
          this.listMap = res.data.data.list;
        });
      }
    }
  },
  methods: {
    open() {
      this.getData();
      this.show = true;
      this.selectWidth = 100;
      setTimeout(() => {
        this.selectWidth = 101;
      }, 300);
    },
     getRecordCode(){
      if((this.$route.path.includes('newSingleTemperatureChart')||this.$route.path.includes('temperature'))){
        return true
      }else{
        return false
      }
    },
    close() {
      this.show = false;
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    async getData() {
    if (!['foshanrenyi','fsxt', 'gdtj'].includes(this.HOSPITAL_ID)) return
      let deptCode = this.$store.state.lesion.deptCode
      // let {
      //   data: { data }
      // } = await listItem(
      //   "自定义标题",
      //   //北海体温单调用护理记录单模板
      //   this.getRecordCode()?'bodyTemperature':sheetInfo.sheetType,
      //   deptCode,
      // );
      // this.listMap = data;
      let opstObj = {}
      opstObj.wardCode = deptCode
      if(!opstObj.wardCode) return
      let res = await titleTemplateList(opstObj)
      if(res.data.code == '200'){
        if(this.isTemperature){
          //如果是体温单界面  就只查询体温单的自定义标题
        this.listMap = res.data.data.filter((x)=>x.recordCode==="bodyTemperature")
        }else{
        this.listMap = res.data.data.filter((x)=>x.recordCode!=="bodyTemperature")

        }
      }
    },
    openAddModal() {
      if(this.isTemperature){
      this.$refs.Temperature.open();

      }else{
      this.$refs.addTemplateModal.open();

      }
    },
    addTemplateAtDoc(item) {
      this.bus.$emit("addTemplateAtDoc", item.content);
    }
  },
  created() {
    this.getData()
    // this.bus.$on("refreshTitleTemplate", this.getData);
  },
  mounted() {
    this.show = false
    this.bus.$on("refreshTitleTemplate", this.getData);
  },

  components: {
    whiteButton,
    templateItem,
    addTemplateModal,
    addTemplateModalTemp
  }
};
</script>
