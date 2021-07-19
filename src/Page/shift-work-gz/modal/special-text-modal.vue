<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="700" title="编辑特殊记录">
      <div flex="cross:top" style="margin-bottom: 15px">
        <!-- <span class="label" style="padding-top: 5px">特殊记录：</span> -->
        <div class="textarea-con" flex-box="1" style="width: 0">
          <el-input type="textarea" :rows="2" placeholder="请输入说明" v-model="data.specialRecords"></el-input>
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
.label {
  font-size: 14px;
  color: #333333;
  width: 60px;
  font-weight: bold;
}

.textarea-con {
  >>>textarea {
    height: 240px;
  }
}

>>> textarea {
  resize: none;
}
</style>
<script>
let dataSchema = {
  specialRecords: ""
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
