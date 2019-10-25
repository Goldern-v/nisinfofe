
<template>
  <div class="table-of-content">
    <!-- <div class="table-of-content-button" @click="isShow=!isShow"> -->
    <!-- <el-tooltip content="目录" placement="top" effect="light">
        <img :src="contentImgae" alt>
    </el-tooltip>-->
    <!-- </div> -->
    <div v-if="isShow" class="table-of-content-box" :class="isShow?'':'table-show'" ref="tableOfContent" :style="{height:'auto'}">
      <!-- formGroupTitle -->
      <div class="title-box">
        <span class="flex-box">

          <!-- <span v-if="currentMenu.title!='评估预警'" :class="{'actived':item.isActived}" v-for="(item,i) of menuList" :key="i" @click="switchMenu(item.title)" flex>{{item.title}}</span> -->

          <span :class="{'actived':item.isActived}" v-for="(item,i) of menuList" :key="i" @click="switchMenu(item.title)" flex>
            <span>{{item.title}}</span>
            <el-badge v-if="item.title=='评估预警'" :value="alertList.length+evalTaskList.length" :max="99" class="el-badge-item" >
            </el-badge>
          </span>
        </span>
      </div>

      <div class="container" :style="{height:(wih-100)+'px'}">
        <div class="list-box">
        <!-- 目录 -->
        <ul v-show="currentMenu.title=='目录'">
          <li
            v-for="(t,i) in formObj.body"
            v-if="t.type ==='formGroupTitle'"
            :key="i"
            :class="t.level ?'title-level-'+t.level:''"
            @click="scrollTo($event,t.title)"
          >
          <el-tooltip class="item" effect="light" :enterable="false" placement="left" v-if="formatTitle(t.title+(missingItems&&missingItems[t.title]?`(漏${missingItems[t.title].length}项)`:'')).length>16">
          <div slot="content">
            <span>
              <span :class="{'missing-items':missingItems&&missingItems[t.title]}">{{t.title}}{{missingItems&&missingItems[t.title]?`(漏${missingItems[t.title].length}项)`:''}}</span>
            </span>
          </div>
            <span :class="{'missing-items':missingItems&&missingItems[t.title]}">{{formatTitle(t.title+(missingItems&&missingItems[t.title]?`(漏${missingItems[t.title].length}项)`:''))}}</span>
        </el-tooltip>
            <span v-if="formatTitle(t.title+(missingItems&&missingItems[t.title]?`(漏${missingItems[t.title].length}项)`:'')).length<=16" :class="{'missing-items':missingItems&&missingItems[t.title]}">{{formatTitle(t.title+(missingItems&&missingItems[t.title]?`(漏${missingItems[t.title].length}项)`:''))}}</span>
          </li>
          <!-- <a :href="'#'+t.title">{{t.title}}</a> -->
        </ul>

        <!-- 预警 -->
        <ul v-show="currentMenu.title=='评估预警'">
          <span v-if="alertList&&alertList.length>0" style="padding:8px">预警<span><el-badge v-if="alertList&&alertList.length>0" :value="alertList.length" :max="99" class="el-badge-item" >
            </el-badge></span></span>

          <li v-if="alertList&&alertList.length>0" v-for="(item,i) of alertList" :key="i" @click="scrollToByName($event,item.name)">
            <el-tooltip
              effect="light"
              :enterable="false"
              placement="left"
            >
            <div slot="content" style="max-width:200px">
              <span v-html="item.tips||item.message||''"></span>
            </div>
              <span style="display:flex">
                <i style="align-items:center;display:flex;margin-right:3px"><img
                  :src="alertImg"
                  :alt="item.title"
                  :name="`${item.name}_${item.title}_${item.label}_img`"
                  width="14"
                /></i>
              <span class="alert-li-message">{{item.message}}</span>
              <span style="font-size:10px">
                <span style="color:red">{{item.value}}</span><span style="color:grey">{{item.obj.suffixDesc?item.obj.suffixDesc+'|':''}}</span>
                </span>
              <span>{{item.title}}</span>

              </span>
            </el-tooltip>
          </li>
          <li v-if="alertList&&alertList.length==0">暂无预警</li>
          </ul>


          <div style="height:10px"></div>
          <!-- 评估任务 -->
          <ul v-show="currentMenu.title=='评估预警'&&evalTaskList&&evalTaskList.length>0">
          <!-- <hr> -->
          <span style="padding:8px">复评任务<span><el-badge v-if="evalTaskList&&evalTaskList.length>0" :value="evalTaskList.length" :max="99" class="el-badge-item" >
            </el-badge></span></span>
          <li v-for="(item,i) of evalTaskList" :key="i" @click="scrollToByName($event,formatAlertTitle(item.title),'title')">
            <el-tooltip
              effect="light"
              :enterable="false"
              placement="left"
            >
            <div slot="content" style="max-width:200px">
              <!-- <span v-html="item.tips||item.message||''"></span> -->
              <span style="color:green">{{formatAlertTitle(item.title)}}：</span><br>{{item.itemValue}}<br>
              <span style="color:green">定义：</span><br>{{item.remark}}<br>
              <span style="color:green">复评时间段：</span><br>
              <span>开始时间：{{item.beginTime}}</span><br><span>结束时间：{{item.expectedEndTime}}</span>
            </div>
              <span style="display:flex">
                <i style="align-items:center;display:flex;margin-right:3px"><img
                  :src="alertImg"
                  :alt="item.title"
                  :name="`${item.name}_${item.title}_${item.label}_img`"
                  width="14"
                /></i>
              <span class="alert-li-message">{{item.remark||item.message||''}}</span>
              <span>{{formatAlertTitle(item.title)}}</span>
              </span>
            </el-tooltip>
          </li>
          <!-- 暂无评估任务 -->
          <li v-if="evalTaskList&&evalTaskList.length==0">暂无评估任务</li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import commonMixin from "@/common/mixin/common.mixin";
export default {
  mixins: [commonMixin],
  name: "TableOfContent",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    // tooltip
  },
  data() {
    return {
      contentImgae: null,
      isShow: true,
      missingItems: null,
      stopScroll:false,
      menu:[
        {title:"目录",isActived:true,content:[]},
        {title:"评估预警",isActived:false,content:[]}
      ],
      currentMenu: {title:"目录",isActived:true,content:[]},//"目录",
      evalTaskItems:[],
      alertMessageItems:[
        // {message:"评估预警1",title:"2.5 骨骼、肌、皮肤系统"},
        // {message:"评估预警2",title:"2.9.2 五官"},
        // {message:"评估预警3",title:"一、基础评估"}
      ],
      alertImg: require("./image/预警@2x.png"),
    };
  },
  computed: {
    menuList(){
      return this.menu
    },
    alertList(){
      return this.alertMessageItems
    },
    evalTaskList(){
      return this.evalTaskItems
    }
    // missingItems(){
    //   return window.formObj&&window.formObj.missingItems?window.formObj.missingItems:null
    // }
  },
  watch: {},
  mounted() {
    this.contentImgae = require("./image/锚点定位.png");
    this.stopScroll = false

    // if(!this.$root.$refs.tableOfContent){
      this.$root.$refs['tableOfContent']= this.$refs['tableOfContent']
    // }

    if(this.$root.$refs.tableOfContent){
      //
      this.$root.$refs.tableOfContent['updateMissingItems'] = this.updateMissingItems
      //
      this.$root.$refs.tableOfContent['updateAlertMessageItems'] = this.updateAlertMessageItems
      //
      this.$root.$refs.tableOfContent['updateEvalTaskItems'] = this.updateEvalTaskItems
      //
      this.$root.$refs.tableOfContent['updateCurrentMenu'] = this.updateCurrentMenu
      //
      this.$root.$refs.tableOfContent['getAlertMessageItems'] = ()=>{
        return this.alertMessageItems;
      }
      ///

      this.evalTaskItems = []
      this.alertMessageItems = []
      this.currentMenu = {title:"目录",isActived:true,content:[]}//"目录"
    }

    // document.querySelector('.sheetTable-contain').scrollTop
    // document.querySelector('a[name="2.3 呼吸系统"]').offsetTop

    // document.querySelector('.sheetTable-contain').scrollTo(0,document.querySelector('a[name="2.3 呼吸系统"]').offsetTop)

    // window.document.querySelector('[title="睡眠"]')
  },
  created() {},
  methods: {
    updateMissingItems(missingItems){
      console.log('updateMissingItems',missingItems)
      this.missingItems = missingItems
    },
    updateAlertMessageItems(alertMessageItems){
      // console.log('updateAlertMessageItems',alertMessageItems)
      this.alertMessageItems = alertMessageItems
    },
    updateEvalTaskItems(evalTaskItems){
      console.log('updateEvalTaskItems',evalTaskItems)
      this.evalTaskItems = evalTaskItems
    },
    updateCurrentMenu(title){
      console.log('updateCurrentMenu',this.currentMenu,title)
      this.menu.map(item=>{
        console.log('menu:item',item)
        if(item.title==title){
          item.isActived = true
          this.currentMenu = JSON.parse(JSON.stringify(item))
        }else{
          item.isActived = false
        }
      })
    },
    formatAlertTitle(str){
      return str?str.replace(/[无,有,（,）,住院评估单,复评]/g,''):'';
    },
    cleanAllStyle(){
      let targetY = null
      if(this.alertMessageItems){
        this.alertMessageItems.map(item=>{
          targetY = document.querySelector(`[name="${item.name}"]`)
          if(targetY){
            targetY.style.background = 'transparent'
          }
        })
      }
      if(this.evalTaskItems){
        this.evalTaskItems.map(item=>{
          targetY = document.querySelector(`[title="${this.formatAlertTitle(item.title)}"]>input`)
          if(targetY){
            targetY.style.background = 'transparent'
          }
        })
      }
    },
    //
    scrollTo(e, title) {
      let target = document.querySelector(".sheetTable-contain");
      // let target = document.querySelector(".pages");
      let currentY = target.scrollTop;
      let targetY = document.querySelector(`a[name="${title}"]`) || document.querySelector(`[name="${title}"]`)
      if(!targetY){return}
      //
      let targetYoffset = targetY.offsetTop;
      this.scrollAnimation(target, currentY, targetYoffset - 20);
    },
    scrollToByName(e, name, type=null) {
      let target = document.querySelector(".sheetTable-contain");
      // let target = document.querySelector(".pages");
      let currentY = target.scrollTop;
      let targetY = document.querySelector(`[name="${name}"]`)
      this.stopScroll = true
      if(type){
        targetY = document.querySelector(`[${type}="${name}"]>input`)
        // targetY = targetY.querySelector(`input`)
      }
      if(!targetY||!name){return}
      //
      this.cleanAllStyle()
      //
      targetY.style.background = "yellow";
      //
      let targetBound = target.getBoundingClientRect()

      let targetYoffset = targetY.getBoundingClientRect().top - targetBound.top;
      //
      let top = targetY.getBoundingClientRect().top
      //
      // console.log('scrollToByName',e,name,[targetY],[targetBound],[targetY.getBoundingClientRect()],targetYoffset,[top,targetBound.top])
      let needScrollTop = top-150

      setTimeout(() => {
        this.stopScroll = false
        this.animation(targetY,top,needScrollTop,target)
      }, 100);
    },
    animation(el,top,needScrollTop,targetScroll){
        top = el.getBoundingClientRect().top;
        setTimeout(() => {
          if(this.stopScroll){return}
          needScrollTop = Math.abs(top-135)
          const dist = Math.ceil(needScrollTop / 10);
          if(top>150){
            targetScroll.scrollTop += dist
          }else if(top<120){
            targetScroll.scrollTop -= dist
          }
          if(top && (top>150 || top<0 || top<120)){
            this.animation(el,top,needScrollTop,targetScroll)
          }
        }, 10);
      },
    scrollAnimation(element, currentY, targetY) {
      if (!element) {
        return;
      }
      // 计算需要移动的距离
      let needScrollTop = targetY - currentY;
      let _currentY = currentY;
      setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        try {
          // element.scrollTo(_currentY, currentY);
          element.scrollTop = _currentY;
          // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
          if (needScrollTop > 10 || needScrollTop < -10) {
            this.scrollAnimation(element, _currentY, targetY);
          } else {
            // element.scrollTo(_currentY, targetY);
            element.scrollTop = _currentY;
          }
        } catch (error) {
          console.log(error, element);
        }
      }, 1);
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    formatTitle(title,limt=16){
      if(!title){return ''}
      let result = title+""
      if(title && title.length>limt){
        result = title.substring(0,limt)+'..'
      }
      return result
    },
    switchMenu(title){
      this.menu.map(item=>{
        if(item.title==title){
          item.isActived=true
          this.currentMenu=item
        }else{
          item.isActived=false
        }
      })
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox, .el-select, .is-bordered, .el-checkbox--small, .el-input, .el-input--small, .el-input-group, .el-input-group--prepend {
  margin: 5px 0px;
  vertical-align: bottom;
  width: 100%;
}

.table-of-content-button {
  background: white;
  width: auto;
  height: auto;
  padding: 10px;
  border: 1px solid rgba(204, 204, 204, 1);

  &:hover {
    border: 1px solid #4baf8d;
    cursor: pointer;
  }
}

.title-box {
  height: 33px;
  background: #f1f1f5;
  padding: 0px 0px;
  font-size: 13px;
  position: fixed;
  width: 220px;
}

.flex-box{
  display:flex;
  height:100%;
  [flex]{
    flex: 1;
    cursor:pointer;
    align-items: center;
    justify-content: center;
    &:hover{
      color: #4baf8d;
      transition: color 0.3s;
      // background: #fbfafa;
      border-top: 4px solid #4bb08d;
    }
  }
  .actived{
    background: white;
  }
}

.container {
  overflow: auto;
}

.list-box {
  margin: 40px 0px 10px 0px;
}

// .table-of-content {
//   position: fixed;
//   top: 40%;
//   right: 1%;
//   background: transparent;
//   z-index: 9;
//   transition: all 0.3s ease-out;
// }
.table-of-content {
  width 0
  height 0
  position: fixed;
  top: 100px;
  background: transparent;
  // z-index: 9;
  transition: all 0.3s ease-out;
}

.table-of-content-box {
  background: white;
  border: 1px solid rgba(204, 204, 204, 1);
  width: 220px;
  height: auto;
  // max-height: 480px;
  // overflow: auto;
  // position: fixed;
  // right: calc(2% + 40px);
  // top: 18%;
  // padding: 10px;
  background: rgba(255, 255, 255, 1);
  // box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  right: 8px;
}

.title-level-2 {
  font-size: 12px;
  text-indent: 1.25em;
}

.title-level-3 {
  font-size: 12px;
  text-indent: 2.25em;
}

.table-show {
  width: 0px;
  height: 0px;
  transition: all 0.3s ease-out;
}

ul, li {
  line-height: 2em;
  font-size: 12px;
  list-style-type: none;
  padding: 0px 7px;
}

li:hover {
  // outline 1px solid #4baf8d
  color: #4baf8d;
  cursor: pointer;
  transition: color 0.3s;
  background: #eef5f5;
}

a {
  text-decoration-line: none;
  color: black;
  font-size: 12px;

  &:visited {
    color: black;
  }

  &:active {
    color: black;
  }

  &:hover {
    color: #4baf8d;
  }
}

.missing-items {
  color: red;
  // font-size: 11px;
}

>>>.el-input__inner.el-input__inner.el-input__inner {
  width: 100%;
  border-radius: 0px;
}

.el-badge-item{
  // margin-top: 10px;
  // margin-right: 40px;
}

>>>.el-badge__content {
    background-color: #ff4949;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 11px;
    height: 12px;
    line-height: 13px;
    padding: 0px 4px;
    text-align: center;
    border: 1px solid #ff4949;
}

.alert-li-message {
  color:red;
  flex:1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  :hover{
    white-space: inherit;
  }
}

</style>
