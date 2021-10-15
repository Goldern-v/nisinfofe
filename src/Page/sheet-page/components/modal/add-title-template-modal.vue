<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="460"
      :title="modalTitle"
      :enable-mobile-fullscreen="false"
    >
      <div flex="main:justify cross:center" style="margin-bottom: 20px">
        <p for class="title" style="margin-right: 10px">标题：</p>
        <el-input type="text" v-model="itemName"></el-input>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">保存</el-button>
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
      isEditItem: null
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
    close() {
      this.$refs.modal.close();
    },
    post() {
      if (this.isEditItem) {
        let data = {
          dictCode: "自定义标题",
          dictName: "自定义标题",
          itemCode: this.isEditItem.code,
          itemName: this.isEditItem.name,
          newItemCode: this.itemCode || this.itemName,
          newItemName: this.itemName,
          recordCode: ['beihairenyi'].includes(this.HOSPITAL_ID)&&this.$route.path.includes('newSingleTemperatureChart')?'temperature_bhry':sheetInfo.sheetType,
          wardCode: this.deptCode
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
          recordCode: ['beihairenyi'].includes(this.HOSPITAL_ID)&&this.$route.path.includes('newSingleTemperatureChart')?'temperature_bhry':sheetInfo.sheetType,
          wardCode: this.deptCode
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
    getData() {}
  },
  created() {
    this.bus.$on("openAddTitleTemplateModal", item => {
      this.open(item);
    });
  },
  components: {}
};
</script>
