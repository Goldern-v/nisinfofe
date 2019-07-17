<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="编辑管道信息">
      <div class="form-con" v-loading="loading">
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">置管日期：</span>
          <masked-input
            type="text"
            class="mask-input input-item"
            :showMask="false"
            v-model="startDate"
            :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar="O"
          ></masked-input>
        </div>

        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">置管人：</span>
          <el-select class="input-item" v-model="startNurse" placeholder="请选择置管人">
            <el-option
              v-for="item in hsList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>

        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">置管来源：</span>
          <el-select class="input-item" v-model="source" placeholder="请选择置管来源">
            <el-option
              v-for="item in sourceList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>

        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">预计拔管日期：</span>
          <masked-input
            type="text"
            class="mask-input input-item"
            :showMask="false"
            v-model="expectEndDate"
            :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar="O"
          ></masked-input>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='scss' scoped>
.label {
  font-size: 14px;
  color: #333333;
  width: 100px;
  text-align: right;
}
.input-item {
  width: 250px;
  margin-right: 30px;
}
.mask-input {
  height: 37px;
  background: #fff;
  border: 1px solid #c2cbd2;
  border-radius: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgb(191, 217, 210);
  box-sizing: border-box;
  color: rgb(31, 61, 53);
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
<script>
import common from "@/common/mixin/common.mixin";
import { userDictInfo, listItem } from "@/api/common";
import { updateBlock } from "../api/index";
export default {
  mixins: [common],
  data() {
    return {
      startDate: "" /** 置管日期 */,
      hsList: [] /** 本科室护士列表 */,
      startNurse: "" /** 置管人 */,
      sourceList: [],
      source: "",
      loading: false,
      expectEndDate: "",
      block: {}
    };
  },
  methods: {
    async init(block) {
      this.loading = true;
      let res = await userDictInfo(this.deptCode);
      let res1 = await listItem("导管来源", this.deptCode);
      this.hsList = res.data.data;
      this.sourceList = res1.data.data;
      this.loading = false;
      this.startNurse = block.startNurse;
      this.startDate = block.startDate;
      this.source = block.source;
      this.expectEndDate = block.expectEndDate;
    },
    open(block) {
      this.init(block);
      this.block = block;
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let block = {
        startDate: this.startDate.replace(/\O/g, 0),
        startNurse: this.startNurse,
        source: this.source,
        expectEndDate: this.expectEndDate.replace(/\O/g, 0)
      };
      let obj = Object.assign({}, this.block, block);
      updateBlock(obj).then(res => {
        this.$message.success("修改成功");
        this.$parent.getData();
        this.close();
      });
    }
  },
  components: {}
};
</script>
