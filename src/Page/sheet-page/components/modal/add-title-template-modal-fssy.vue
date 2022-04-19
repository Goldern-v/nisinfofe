<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="460"
      :title="modalTitle"
      :enable-mobile-fullscreen="false"
    >
      <div  style="margin-bottom: 20px">
        <el-tabs  type="card" @tab-click="handleClick">
          <el-tab-pane label="纯标题模板" style="display: flex;">
             <div class="tab-list-item">
              <p for class="title" style="margin-right: 10px">标题：</p>
              <el-input type="text" v-model="itemName"></el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="含选项标题模板">
            <div class="tab-list-item">
              <p for class="title" style="margin-right: 10px">标题：</p>
              <el-input type="text" v-model="itemName"></el-input>
            </div>
            <div class="tab-list-item" v-for="(contentItem,contentIndex) in contentList" :key="contentIndex">
                <p for class="title" style="margin-right: 10px">内容：</p>
                <el-input type="text" v-model="contentItem.itemName">
                </el-input>
                <el-tooltip content="删除" placement="bottom" effect="dark">
                  <i class="iconfont icon-shanchuzhenghang" @click.stop="toDel(contentIndex)"></i>
                </el-tooltip>
            </div>
          </el-tab-pane>
        </el-tabs>
       
      </div>
      <div slot="button" :style="isaddList ? 'display:flex; justify-content:space-between' : '' ">
        <el-button class="modal-btn"  type="text" @click="addContent" v-show="isaddList">+添加可选项</el-button>
        <div>
          <el-button class="modal-btn" @click="close">取消</el-button>
          <el-button class="modal-btn" type="primary" @click="post">保存</el-button>
        </div>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title
  width 60px
  font-weight bold
>>>textarea
  height 100px
>>>.el-tab-pane
  display: flex;
  flex-wrap: wrap;
  .tab-list-item
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom:10px;
>>>.el-tabs__item.is-active 
    color: #fff;
    background: rgb(4 165 128);
>>>.el-tabs__item
    color: #666;
</style>

<script>
import { dictSave, dictUpdate } from "@/api/common";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index";
import commom from "@/common/mixin/common.mixin";
export default {
  mixins: [commom],
  data() {
    return {
      bus: bus(this),
      dictCode: "",
      dictName: "",
      itemCode: "",
      itemName: "",
      isEditItem: null,
      isaddList: false,
      contentList:[],
    };
  },
  computed: {
    modalTitle() {
      if (this.isEditItem) {
        return "编辑自定义标题模版";
      } else {
        return "新建自定义标题模版";
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index == '1');
      if(tab.index == '1'){
        this.isaddList = true
      }else{
        this.isaddList = false
      }
        console.log(tab, event);
    },
    open(item) {
      this.$refs.modal.open();
      this.getData();
      if (item) {
        this.dictCode = item.dictCode;
        this.dictName = item.dictName;
        this.itemCode = item.code;
        this.itemName = item.name;
        this.isEditItem = item;
      } else {
        this.dictCode = "";
        this.dictName = "";
        this.itemCode = "";
        this.itemName = "";
        this.isEditItem = null;
      }
    },
    getRecordCode(){
      if((this.$route.path.includes('newSingleTemperatureChart')||this.$route.path.includes('temperature'))){
        return true
      }else{
        return false
      }
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
    //体温单路由+医院名字（贵州+北海），
    //recorCode/moduleCode传体温单code值，护理记录单传护理记录单coe值，没有就传空，
      if (this.isEditItem) {

        let data = {
          dictCode: "自定义标题",
          dictName: "自定义标题",
          itemCode: this.isEditItem.code,
          itemName: this.isEditItem.name,
          newItemCode: this.itemCode || this.itemName,
          newItemName: this.itemName,
           moduleCode:this.getRecordCode()?'bodyTemperature':'',
          recordCode: this.getRecordCode()?'bodyTemperature':sheetInfo.sheetType,
          wardCode: this.deptCode,
          deptCode: this.deptCode,
        };
        dictUpdate(data).then(res => {
          this.$message.success("更新常用语模版成功");
          this.close();
          this.bus.$emit("refreshTitleTemplate");
        });
      } else {
        let data = {
          dictCode: "自定义标题",
          dictName: "自定义标题",
          itemCode: this.itemCode || this.itemName,
          itemName: this.itemName,
         moduleCode:this.getRecordCode()?'bodyTemperature':'',
          recordCode: this.getRecordCode()?'bodyTemperature':sheetInfo.sheetType,
          wardCode: this.deptCode,
          deptCode: this.deptCode,
        };
        dictSave(data).then(res => {
          this.$message.success("保存常用语模版成功");
          this.close();
          this.bus.$emit("refreshTitleTemplate");
        });
      }
    },
    querySearch(queryString, cb) {
      cb(
        queryString
          ? this.typeList.filter(item => item.value.indexOf(queryString) > -1)
          : this.typeList
      );
    },
    // 新增内容
    addContent(){
      this.contentList.push({itemName:''})
    },
    // 删除内容
    toDel(isIndex){
      this.contentList = this.contentList.filter((item,index) => isIndex != index)
      // this.contentList.map((item,index)=>{
      //   if(isIndex == index){
      //     this.contentList
      //   }
      // })
    },
    getData() {}
  },
  created() {
    this.bus.$on("openAddTitleTemplateModalFS", item => {
      this.open(item);
    });
  },
  components: {}
};
</script>
