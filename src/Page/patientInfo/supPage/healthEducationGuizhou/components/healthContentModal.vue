<template>
  <sweet-modal
    size="middle"
    ref="healthContentModal"
    :title="name"
    :modalWidth="600"
  >
    <!-- <div v-html="content" class="content"></div> -->
    <textarea v-model="content" style="height:300px;width:100%" />
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.healthContentModal.close()"
        >关闭
      </el-button>
      <el-button type="primary" class="modal-btn" @click="save">保存</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
</style>

<script>
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
  data() {
    return {
      text: ''
    };
  },
  methods: {
    open() {
      this.$refs.healthContentModal.open();
    },
    save() {
      // console.log('save....');
      // saveMission()
    }
  },
};
</script>
