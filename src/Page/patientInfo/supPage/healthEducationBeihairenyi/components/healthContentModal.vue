<template>
  <sweet-modal size='middle' ref='healthContentModal' :title="name" :modalWidth="600">
    <div v-html="content" class="content"></div>
    <div slot='button'>
      <el-button class='modal-btn' @click='$refs.healthContentModal.close()'>关闭</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
</style>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  methods: {
    open() {
      this.$refs.healthContentModal.open();
    },
  },
};
</script>
