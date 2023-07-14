<template>
  <div>
    <boxBase
      :title="
        `留言板${isSave ? '' : `<span style='color: red'>（未保存）</span>`}`
      "
      :icon="require('../images/留言板.png')"
    >
      <span slot="head-tool" @click.stop="saveData">保存</span>
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <quill-editor
          v-model="data.message"
          ref="myQuillEditor"
          :options="editorOption"
          v-if="HOSPITAL_ID == 'nfyksdyy'"
        ></quill-editor>
        <el-input type="textarea" autosize v-model="data.message" v-else></el-input>
      </div>
    </boxBase>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  padding 17px 22px 22px
  box-sizing border-box
  // min-height 220px
  overflow hidden
  >>>
    textarea, .el-textarea
      height 100%
      width 100%
      min-height 150px !important
</style>
<script>
import boxBase from "../base/box-base.vue";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
export default {
  mixins: [common],
  props: {
    data: Object
  },
  inject: ["update"],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      isSave: true,
       // 富文本编辑器配置
      editorOption: {
        placeholder: "请编辑内容",
        modules: {
          toolbar: [
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
          ],
        },
        theme: "snow",
      },
    };
  },
  created() {},
  methods: {
    saveData() {
      this.update().then(res => {
        this.$message.success("保存成功");
        this.isSave = true;
      });
    }
    // blur() {
    //   setTimeout(() => {
    //     this.$message.warning("记事本未保存，注意保存，以免数据丢失");
    //   }, 100);
    // }
  },
  computed: {
    message() {
      return this.data.message;
    }
  },
  watch: {
    message() {
      this.isSave = false;
    },
    "data.message"(newValue){

    }
  },
  components: {
    boxBase,
    quillEditor
  }
};
</script>
