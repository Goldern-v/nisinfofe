<template>
  <sweet-modal
    size="middle"
    ref="healthContentModal"
    :title="name"
    :modalWidth="600"
    class="s-modal"
  >
    <!-- <div v-html="content" class="content"></div> -->
    <!-- <textarea v-model="content" style="height:300px;width:100%" /> -->
    <!-- 富文本 -->
    <quillEditor 
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
      @focus="onEditorFocus($event)"
    />
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.healthContentModal.close()">关闭</el-button>
      <!-- <el-button type="primary" class="modal-btn" @click.native="saveContent(content)">保存</el-button> -->
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
</style>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { saveMission } from "../api/healthApi";
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  components: { quillEditor },
  data() {
    return {
      // 富文本编辑器配置
      editorOption: {
        placeholder: "请编辑内容",
        modules: {
          // toolbar: [
          //   [{ script: "sub" }, { script: "super" }] // 上下标
        
          // ]
        },
        theme: "snow",
        readOnly: true
      }
    };
  },
  methods: {
    open() {
      this.$refs.healthContentModal.open();
    },
    close() {
      this.$refs.healthContentModal.close();
    },
    saveContent(content) {
      this.$emit('saveContent', content)
    },
    onEditorFocus(e) {
      e.enable(false);
    }
  },
};
</script>
<style lang="scss" scoped>
  // 隐藏工具栏 
  .s-modal /deep/.ql-toolbar.ql-snow {
    display: none !important;
  }
  .s-modal /deep/ .ql-container.ql-snow {
    border-top: 1px solid #ccc;
  }
</style>
