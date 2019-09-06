<template>
  <sweet-modal ref="modal" :title="title" :modalWidth="450">
    <div flex="cross:center" style="margin-bottom: 15px">
      <span class="label">视频名称：</span>
      <div style="flex:1">
        <el-input v-model="name"></el-input>
      </div>
    </div>
    <div flex="cross:center" style="margin-bottom: 15px">
      <span class="label">上传文件：</span>
      <div style="flex:1; display: flex;">
        <el-input :readonly="true" @click="selectFile" v-model="fileName"></el-input>
        <el-button style="margin-left: 10px" @click="selectFile">...</el-button>
      </div>
    </div>
    <input type="file" ref="fileRef" style="display:none" @change="onFileChange($event)" />
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modal.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
.label {
  font-size: 14px;
  color: #333333;
  width: 100px;
}
</style>
<script>
import { saveVideo, updateVideo } from "../api/index-xin";
export default {
  props: {},
  data() {
    return {
      title: "",
      name: "",
      fileName: "",
      data: null
    };
  },
  methods: {
    open(item) {
      this.data = item;
      if (item) {
        this.title = "编辑宣教视频";
        this.name = item.videoName;
        this.fileName = item.videoName;
      } else {
        this.title = "添加宣教视频";
        this.name = "";
        this.fileName = "";
      }
      this.$refs.modal.open();
    },
    selectFile() {
      this.$refs.fileRef.click();
    },
    onFileChange(e) {
      let file = this.$refs.fileRef.files[0];
      this.name = file.name;
      this.fileName = file.name;
    },
    post() {
      let file = this.$refs.fileRef.files[0];
      if (!file && !this.data) {
        return this.$message.warning("请先上传视频");
      }
      let postData = new FormData();
      file && postData.append("file", file);
      postData.append("videoName", this.name);

      if (!this.data) {
        saveVideo(postData).then(res => {
          this.$emit("refresh");
          this.$message.success("上传视频成功");
          this.$refs.modal.close();
        });
      } else {
        postData.append("id", this.data.id);
        updateVideo(postData).then(res => {
          this.$emit("refresh");
          this.$message.success("更新成功");
          this.$refs.modal.close();
        });
      }
    }
  },
  components: {}
};
</script>
