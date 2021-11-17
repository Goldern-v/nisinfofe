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
        v-model="editContent" 
        ref="myQuillEditor" 
        :options="editorOption"
        @change="onEditChange($event)"
      />
      <div slot="button">
        <el-button class="modal-btn" @click.stop="closeModal">关闭</el-button>
        <el-button type="primary" class="modal-btn" @click.stop="confirmEdit">确定</el-button>
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
      storageContent: {
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
        editContent:"",//富文本内容
        editorOption: {
          placeholder: "请编辑内容",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              // ['link', 'image', 'video', false]
            ]
          }
        },
      }
    },
    methods: {
      open(isEdit) {
        //isEdit true编辑
        this.$refs.richEditorModal.open();
      },
      closeModal() {
        //console.log('storageContent', this.storageContent);
        // this.content = this.storageContent;
        // this.editContent=this.storageContent;
        this.$refs.richEditorModal.close();
      },
      confirmEdit() {
        //console.log('saveContent.....');
        this.$emit('confirmEdit', this.editContent);
        this.$refs.richEditorModal.close();
      },
      onEditChange(event) {
        let maxLength = event.quill.getLength() - 1;
        if (maxLength >= 4000) {
          // setTimeout(() => {
          //   this.$message.warning(`超过最大限制字数${maxLength}`);
          // }, 1000)
          event.quill.deleteText(4000, 1);
        }
      },
      //编辑editContent值
      changeEditContent(newEditContent){
        //console.log("编辑editContent值")
        //console.log(newEditContent)
        this.editContent=newEditContent;
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>