<!--原本是旧版本的 很多问题  改不动 增加 佛一换成 template-slide-fsry-->
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
          <div class="search-con" style="line-height:32px" flex v-if="['whhk','liaocheng','wujing','huadu','foshanrenyi','nfyksdyy','zjhj'].includes(HOSPITAL_ID)">
            <span style="font-size:14px;">模板分类：</span>
            <el-radio v-model="templateType" label="dept">科室</el-radio>
            <el-radio v-model="templateType" label="common" style="margin-right:10px">公共</el-radio>
            <el-button  @click="delActiveType" :disabled="canDelete" size="mini" >删除当前分类<i class="el-icon-delete"></i></el-button>
          </div>
          <div class="search-con" style="line-height:32px" flex v-if="HOSPITAL_ID === 'zhzxy'">
            <el-radio-group v-model="class_4_zhzyx" @change="onClassChange">
              <el-radio label="0">全科</el-radio>
              <el-radio label="1">个人</el-radio>
            </el-radio-group>
          </div>
          <div class="search-con" flex>
            <div class="select-box" :style="{width: selectWidth + 'px'}">
              <el-select v-model="selectedType" filterable placeholder="请选择" :popper-append-to-body="false"  >
                <el-option v-for="(item,key) in typeList" :key="key" :label="item" :value="item"></el-option>
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
          <div class="list-con" v-if="selectedType=='特殊符号'" :style="listconHeight">
            <ul class="specific_symbol">
              <template v-if="['zhzxy'].includes(HOSPITAL_ID)">
                <li
                  v-for="item in specificSymbol"
                  :key="item"
                  @dblclick="addTemplateAtDoc(item)"
                >{{item}}</li>
              </template>
              <template v-else>
                <li
                  v-for="item in specificSymbol"
                  :key="item"
                  @click="addTemplateAtDoc(item)"
                >{{item}}</li>
              </template>
            </ul>
          </div>
          <div class="list-con" v-else :style="listconHeight">
            <div v-if="HOSPITAL_ID == 'sdhpwk'" class="test_wrapper" @dragover="dragover($event)">
              <transition-group  class="transition-wrapper" name="sort">
                <div
                v-for="item in filterData"
                :key="item.id"
                :draggable="true"
                @dragstart="dragstart(item)"
                @dragenter="dragenter(item,$event)"
                @dragend="dragend(item,$event)"
                @dragover="dragover($event)"
                >
                  <templateItem
                    :data="item"
                    @openAddModal="data => $emit('openAddModal', data)"
                  ></templateItem>
                </div>
              </transition-group>
            </div>
            <div v-else>
              <div v-for="(item, key) in filterData" :key="key" >
                <templateItem :data="item" :key="item.id" @openAddModal="openAddModal"></templateItem>

              </div>
            </div>
          </div>
          <div class="footer-con" id="footer-isshow" flex="main:center cross:center" @click="openAddModal()" @dragover="dragover($event)">
            <i class="iconfont icon-tianjia"></i> 新建模板
          </div>
        </div>
      </div>
    </transition>
    <addTemplateModal ref="addTemplateModal"></addTemplateModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box {
  .el-checkbox__label {
    font-size: 12px;
    color: #687179;
    white-space: normal;
  }

  textarea {
    font-size: 12px;
    color: #687179;
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.no-do-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2001;
}

.slide-con {
  width: 360px;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  z-index: 1000000;
  background: #fff;
  z-index: 2002;
}

.head-con {
  height: 46px;
  background: #F7FAFA;
  border-bottom: 1px solid #EAEEF1;
  padding: 0 10px 0 20px;

  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }

  .close-btn {
    font-size: 12px;
    padding: 10px 10px;
    cursor: pointer;
  }
}

.search-con {
  margin: 10px 20px;
  .search-input {
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 0;
    border-right: 0px;
    border-left: 0px;
    outline: none;
    padding-left: 10px;
    font-size: 12px;
    color: #687179;
  }
}

.list-con {
  height: calc(100vh - 145px);
  overflow: auto;
  .specific_symbol {
    padding-left: 20px;

    li {
      display: inline-block;
      width: 27%;
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #eceeef;
      margin-right: 20px;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        background: #f4f2f5;
        cursor: pointer;
        transition: all 0.3s;
      }
    }
  }
}

.listMap-title {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  padding-right: 50px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 14px;
}

.footer-con {
  height: 46px;
  background: #4BB08D;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #5CC6A1;
  }

  i {
    margin-right: 5px;
    font-weight: bold;
    font-size: 12px;
  }
}

.select-box {
  // margin-right 10px
  width: 100px;

  >>>.el-input__inner {
    height: 32px;
    background: #f7fafa;
    border-radius: 2px 0 0 2px;
  }
}
</style>

<script>
import whiteButton from "@/components/button/white-button.vue";
import templateItem from "./components/template-item.vue";
import {
  typeList,
  list,
  typeListByDept,
  delByType,
  getPersonalTemplate,
  getPersonalTypeList,
   getBatchSaveOrUpdateByDept
} from "@/Page/sheet-page/api/recordDesc.js";
import addTemplateModal from "./add-template-modal.vue";
import specificSymbolGuiZhou from "./eval-model/specificSymbolGuiZhou";
import specificSymbol from "./eval-model/specificSymbol";
import bus from "vue-happy-bus";
const getSpecificSymbol =(()=>{
  if (['guizhou'].includes(process.env.HOSPITAL_ID)) {
    return specificSymbolGuiZhou
  } else {
    return specificSymbol
  }
})()
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
      specificSymbol: getSpecificSymbol,
      templateType:"dept",
      class_4_zhzyx: '0', // 珠海中西医模板分类
      oldData:null, // 开始排序时按住的旧数据
      newData:null, // 拖拽过程的数据
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
    },
    canDelete(){
      let flag=false
      if(this.selectedType==="特殊符号"||this.selectedType==="全部"){
        flag=true
      }
      return flag
    },
    listconHeight(){
      let str=""
      if(['liaocheng', 'wujing', 'huadu', 'foshanrenyi', 'zhzxy','nfyksdyy','zjhj'].includes(this.HOSPITAL_ID)){
         str='height: calc(100vh - 191px)'
      }
      return str
    }
  },
  methods: {
    // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    dragover(e) {
      e.preventDefault()
    },
    dragstart(value) {
      this.oldData = value
    },
    // 记录移动过程中信息
    dragenter(value, e) {
      this.newData = value
      e.preventDefault();
        let usel =  document.querySelector('#footer-isshow')
      if(e.screenY >= 1000){
        usel.classList.add("isshow-footer")
      }else{
        usel.classList.remove("isshow-footer")
      }
    },
     // 拖拽最终操作
    dragend(value, e) {
      if (this.oldData !== this.newData) {
        let oldIndex = this.listMap.indexOf(this.oldData)
        let newIndex = this.listMap.indexOf(this.newData)
        let newItems = [...this.listMap]
        let templist = newItems[newIndex].sorted;
        newItems[newIndex].sorted = newItems[oldIndex].sorted;
        newItems[oldIndex].sorted = templist;
        // 删除老的节点
        newItems.splice(oldIndex, 1)
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, this.oldData)
        this.listMap = [...newItems]
        setTimeout(()=>{ if(document.querySelector('#footer-isshow').classList.value.includes("isshow-footer")){
          document.querySelector('#footer-isshow').classList.remove("isshow-footer")
        }},0)

        const user = JSON.parse(localStorage.getItem("user"));
        getBatchSaveOrUpdateByDept(this.listMap, user.empNo).then(res => {})
      }
    },
    open() {
      this.class_4_zhzyx = '0'
      this.getData();
      this.show = true;
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
      //特殊情况,开启分类权限医院名
      const isDeptList=['whhk',"liaocheng","wujing","huadu",'foshanrenyi','nfyksdyy','zjhj']
      if(isDeptList.includes(this.HOSPITAL_ID)){
      typeListByDept(localStorage.wardCode,this.HOSPITAL_ID).then(res => {
        this.typeList = res.data.data[this.templateType];
        this.typeList.push("特殊符号");
        if (this.selectedType == "特殊符号") {
          return;
        }
        this.selectedType=this.typeList[0]
        if (this.selectedType) {
          const wordCode=this.templateType==="dept"? localStorage.wardCode:""
          list(this.selectedType,wordCode,this.HOSPITAL_ID).then(res => {
          res.data.data.list.map((item,index) => item.sorted = item.sorted ? item.sorted : index)
          this.listMap = Array.from(res.data.data.list);
          });
        } else {
          this.selectedType = this.typeList[0];
        }
      });
      }else{
        typeList(localStorage.wardCode,this.HOSPITAL_ID).then(res => {
        this.typeList = res.data.data.list;
        this.typeList.push("特殊符号");
        if (this.selectedType == "特殊符号") {
          return;
        }

        if (this.selectedType) {
          list(this.selectedType,localStorage.wardCode,this.HOSPITAL_ID).then(res => {
            this.listMap = res.data.data.list;
          });
        } else {
          this.selectedType = this.typeList[0];
        }
      });
     }
    },
    openAddModal(data) {
      this.$refs.addTemplateModal.open(data);
    },
    addTemplateAtDoc(item) {
      this.bus.$emit("addTemplateAtDoc", item);
    },
    delActiveType(){
      this.$confirm(`此操作将永久删除${this.selectedType}该分类, 是否继续?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          title:"提示"
        }).then(() => {
          const wardCode=this.templateType==="dept"? localStorage.wardCode:""
          const user=JSON.parse(localStorage.getItem("user"))
          delByType(this.selectedType,wardCode,user.empNo).then(res=>{
          this.initialize()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
       })
        })
    },
    initialize(){
       this.selectedType=""
       this.typeList=[]
       this.getData()
    },
    // 获取个人模板数据
    async getPersonalData() {
      try {
        const user = JSON.parse(localStorage.getItem("user"))
        const res = await getPersonalTypeList(user.empNo)
        this.typeList = res.data.data.emp
        this.typeList.push("特殊符号")
        const params = {
          groupName: this.selectedType,
          empNo: user ? user.empNo : '',
        }
        const resData = await getPersonalTemplate(params)
        this.listMap = resData.data.data.list
      } catch (error) {
        console.error(error.message)
      }
    },
    // 分类切换
    onClassChange(value) {
      if (value === '1') {
        this.getPersonalData()
      } else {
        this.getData()
      }
    }
  },
  created() {
    this.bus.$on("refreshTemplate", ()=>{
      this.typeList=[]
      // this.getData()
      this.onClassChange(this.class_4_zhzyx)
    });
    if(this.HOSPITAL_ID==='whfk'){
      const arr=['cmH₂O','ml/h','EPAP','IPAP','IU','U']
      for (let index = 0; index < arr.length; index++) {
       this.specificSymbol.unshift(arr[index])
      }
    }
  },
  mounted() {
    //  this.show = false
  },
  watch: {
    selectedType() {
      if (this.selectedType == "特殊符号") {
        return;
      }
      if (this.selectedType) {
        if (this.class_4_zhzyx === '1') {
          this.getPersonalData()
        } else {
          const wardCode = this.templateType === "dept" ? localStorage.wardCode : ""
          list(this.selectedType, wardCode, this.HOSPITAL_ID).then(res => {
            this.listMap = res.data.data.list;
          });
        }
      }
    },
    templateType(){
     this.initialize()
    }
  },
  components: {
    whiteButton,
    templateItem,
    addTemplateModal
  }
};
</script>
