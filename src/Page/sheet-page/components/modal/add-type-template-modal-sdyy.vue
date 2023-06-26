<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="460"
      :title="modalTitle"
      :enable-mobile-fullscreen="false"
    >
        <div class="tab-list-item">
          <p for class="title" style="margin-right: 10px">分类：</p>
          <el-input type="text" v-model="typeName"></el-input>
        </div>
      <div
        slot="button"
        :style="isAddList ? 'display:flex; justify-content:space-between' : ''"
      >
        <div>
          <el-button class="modal-btn" @click="close">取消</el-button>
          <el-button class="modal-btn" type="primary" @click="post"
            >保存</el-button
          >
        </div>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title{
   width 60px;
  font-weight bold;
}
>>>textarea{
  height 100px
}

.tab-list-item{
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom:10px;
}
>>>.el-tabs__item.is-active{
  color: #fff;
  background: rgb(4 165 128);
}
>>>.el-tabs__item {
    color: #666;
}
</style>

<script>
import { addTitleTemplateType } from "./api/index";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      itemCode: "",
      typeName: "",
      isEditItem: null,
      isAddList: false,
      contentList: [],
      classifyList: [],
      typeId: "",
      activeName: "first",
      callback: null
    };
  },
  computed: {
    modalTitle() {
      if (this.isEditItem) {
        return "编辑自定义分类模版";
      } else {
        return "新建自定义分类模版";
      }
    }
  },
  methods: {
    reset() {
      this.typeId = "";
      this.typeName = "";
      this.isEditItem = null;
    },
    open(cb,item) {
      cb && (this.callback = cb)
      this.$refs.modal.open();
      if(item){
        console.log(item);
        this.typeName = item.lable,
        this.typeId = item.children[0].typeId
        this.isEditItem = true
      }else{
        this.reset()
      }
    },
    getRecordCode() {
      return (
        this.$route.path.includes("newSingleTemperatureChart") ||
        this.$route.path.includes("temperature")
      );
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
        let data = {
          wardCode: this.deptCode,
          typeName: this.typeName,
          id:  this.isEditItem ? this.typeId :""
        };
        addTitleTemplateType(data).then(res => {
          this.$message.success("更新常用语模版成功");
          this.bus.$emit("refreshTitleTemplate");
          this.callback && this.callback(res.data.data)
          this.close();
        });
    },
  },
  components: {}
};
</script>
