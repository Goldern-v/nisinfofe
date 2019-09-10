<template>
  <sweet-modal ref="modalName" :title="videoName" :modalWidth="800" @close="onClose">
    <div class="video-con">
      <video :src="videoUrl" ref="videoRef" controls autoplay></video>
    </div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
.video-con {
  background: #000;
  padding: 20px 0;
}
video {
  width: 100%;
}
</style>
<script>
export default {
  props: {},
  data() {
    return {
      videoUrl: "",
      videoName: ""
    };
  },
  methods: {
    open(item) {
      this.videoUrl = "/crNursing/asset" + item.filePath;
      this.videoName = item.videoName;
      this.$refs.modalName.open();
      //   this.$refs.videoRef.play();
    },
    post() {},
    onClose() {
      this.videoUrl = "";
    }
  },
  components: {}
};
</script>
