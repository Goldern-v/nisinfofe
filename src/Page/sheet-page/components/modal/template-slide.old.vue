<template>
  <div>
    <!-- <div class="no-do-bg" v-show="show" @click="close"></div> -->
    <transition name="el-zoom-in-left">
      <div v-show="show" class="slide-con">
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">模版</span>
          <span class="tab-con">
            <tabBox :list="tabList" @changeTab="changeTab" :selectedTab="selectedTab"></tabBox>
          </span>
          <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <div v-show="selectedTab == 1" class="list-con-recent">
          <div class="desc" @click="addTemplateAtDoc(item)" v-for="item in recentList" :key="item.id">
            {{item.content}}
          </div>
        </div>  
        <div v-show="selectedTab == 2">
        <div class="search-con" flex="">
          <whiteButton text="新建" icon="icon-tianjia" @click.native="openAddModal"></whiteButton>
          <input type="text" flex-box="1" class="search-input" placeholder="请输入你要查找的模版…" v-model="searchWord">
          <whiteButton text="" icon="icon-search"></whiteButton>
        </div>
        <div class="list-con">
          <div v-for="(item, key) in filterData" :key="key">
            <div class="listMap-title">{{key}}</div>
            <templateItem v-for="option in item" :data="option" :key="option.id"></templateItem>
          </div>
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
  height 55px
  background: #F7FAFA
  border-bottom: 1px solid #EAEEF1;
  padding 0 10px 0 20px
  .title
    font-size: 16px;
    color: #333333;
  .close-btn
    font-size 12px  
    padding 10px 10px
    cursor pointer
.search-con
  margin 10px 20px    
  .search-input
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 2px 0 0 2px
    border-right 0px
    outline none
    padding-left 10px
    font-size: 12px;
    color: #687179
.list-con
  height calc(100vh - 108px)   
  overflow auto 
.list-con-recent
  height calc(100vh - 75px)   
  overflow auto
  .desc
    font-size: 13px;
    color: #687179;  
    line-height 18px  
    cursor pointer
    padding 15px 20px
    &:hover
      background: #F7F7FA
.listMap-title    
  font-size: 14px;
  color: #333333
  font-weight bold
  padding-right 50px
  padding-left 20px
  padding-top 10px
  padding-bottom 10px
  min-height 14px
</style>

<script>
import tabBox from '@/components/tabBox/tabBox.vue'
import whiteButton from '@/components/button/white-button.vue'
import templateItem from './components/template-item.vue'
import {list, recentDescList} from '../../api/recordDesc.js'
import addTemplateModal from './add-template-modal.vue'
import bus from 'vue-happy-bus'
  export default {
    data() {
      return {
        bus: bus(this),
        data: {},
        show: false,
        searchWord: '',
        tabList: [{
          key: '最近',
          value: '1'
        },{
          key: '模版',
          value: '2'
        }],
        selectedTab: '1',
        listMap: {},
        recentList: [],
      }
    },
    computed: {
      filterData() {
        let listMap = this.listMap
        let filterData = {}
        let keys = Object.keys(listMap)
        for(let i = 0; i < keys.length; i ++) {
         if(keys[i].indexOf(this.searchWord) > -1) {
           filterData[keys[i]] = listMap[keys[i]]
         } else {
           let itemlist = []
           for(let j = 0; j < listMap[keys[i]].length; j ++) {
             if(listMap[keys[i]][j].content.indexOf(this.searchWord) > -1) {
               itemlist.push(listMap[keys[i]][j])
             }
           }
           if(itemlist.length) {
             filterData[keys[i]] = itemlist
           }
         }
        }
        return filterData
      }
    },
    methods: {
      open() {
        this.getData()
        this.show = true
      },
      close() {
        this.show = false
      },
      changeTab(tab) {
        this.selectedTab = tab
      },
      getData() {
        list().then(res => {
          let list = res.data.data.list
          let listMap = {}
          for(let i = 0; i < list.length; i++) {
            if(!listMap[list[i].groupName]) {
              listMap[list[i].groupName] = []
            }
            listMap[list[i].groupName].push(list[i])
          }
          this.listMap = listMap
        })
        recentDescList().then(res => {
          this.recentList = res.data.data.list
        })
      },
      openAddModal() {
        this.$refs.addTemplateModal.open()
      },
      addTemplateAtDoc(item) {
        this.bus.$emit('addTemplateAtDoc', item.content)
      }
    },
    created() {
      this.bus.$on('refreshTemplate', this.getData)
    },
    components: {
      tabBox, whiteButton, templateItem, addTemplateModal
    }
  }
</script>
