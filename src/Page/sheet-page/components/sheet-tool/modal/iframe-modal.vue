<template>
  <sweet-modal ref="modalName" title="查看" class="modal-con" >
    <iframe :src="url" />
  </sweet-modal>

</template>
<style lang="stylus" scoped>
.modal-con
  >>>.sweet-content
    max-height 100vh
  >>>.content
    overflow hidden
    margin: 0 0 10px
  >>>.sweet-content
    background #F0f0f0
    iframe {
      height: 70vh;
      width: 100%;
    }
  >>>.body
    padding: 20px 20px 40px !important
</style>
<script>

export default {
  props: {},
  data() {
    return {
      url: ''
    };
  },
  methods: {
    open(data) {
      if(data){
        this.url = data.url
      }
      this.$refs.modalName.open();
    },
    post() {},
    close(){
      this.$refs.modalName.close();
    }
  },
};
</script>
