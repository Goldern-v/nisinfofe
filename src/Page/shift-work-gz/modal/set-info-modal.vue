<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="编辑">
      <div flex="cross:center" style="margin-bottom: 15px">
        <span class="label">类型：</span>
        <el-input type="text" v-model="data.status" disabled flex-box="1" style="width: 0"></el-input>
      </div>
      <div flex="cross:center" style="margin-bottom: 15px">
        <span class="label">患者：</span>
        <el-input type="text" v-model="data.pat" disabled flex-box="1" style="width: 0"></el-input>
      </div>

      <div flex="cross:top" style="margin-bottom: 15px">
        <span class="label" style="padding-top: 5px">诊断：</span>
        <div flex-box="1" style="width: 0">
          <el-input type="textarea" :rows="2" autosize placeholder="请输入诊断" v-model="data.diagnosis"></el-input>
        </div>
      </div>
      <div flex="cross:top" style="margin-bottom: 15px">
        <span class="label" style="padding-top: 5px">说明：</span>
        <div class="textarea-con" flex-box="1" style="width: 0">
          <el-input type="textarea" :rows="2" placeholder="请输入说明" v-model="data.remark"></el-input>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='stylus' scoped>
.label
  font-size 14px
  color #333333
  width 60px
  font-weight bold
.textarea-con
  >>>textarea
    height 80px
>>> textarea
  resize none
</style>
<script>
let dataSchema = {
  status: "",
  pat: "",
  diagnosis: "",
  remark: ""
};
export default {
  data() {
    return {
      data: dataSchema,
      callBack: null
    };
  },
  methods: {
    open(data, callBack) {
      this.data = data;
      this.callBack = callBack;
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      this.callBack(this.data);
      this.close();
    }
  },
  components: {}
};
</script>
