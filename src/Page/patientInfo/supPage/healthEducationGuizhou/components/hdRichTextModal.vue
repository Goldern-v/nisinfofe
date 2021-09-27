<template>
  <div>
    <sweet-modal 
      size="middle"
      ref="richEditorModal" 
      :title="title" 
      :modal-width="600"
    >
      <quillEditor 
        style="min-height:600px" 
        v-model="content" 
        ref="myQuillEditor" 
        :options="editorOption"
      />
      <div slot="button">
        <el-button class="modal-btn" @click="$refs.richEditorModal.close()">关闭</el-button>
        <el-button type="primary" class="modal-btn" @click="confirmEdit">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<script>
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
  export default {
    name: 'hdRichTextModal',
    props: {
      name: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        default: ""
      }
    },
    components: { quillEditor },
    data() {
      return {
        editorOption: {
          placeholder: "请编辑内容",
        }
      }
    },
    methods: {
      open(isEdit) {
        //isEdit true编辑
        this.$refs.richEditorModal.open();
      },
      close() {
        this.$refs.richEditorModal.close();
      },
      confirmEdit() {
        console.log('saveContent.....');
        this.$emit('confirmEdit', this.content);
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>