<template>
  <div style="position: relative">
    <div
      class="page"
      v-if="data.reportUrl"
    >
      <iframe
        :src="'http://192.168.8.68:8080/report/pdf' + data.reportUrl"
        frameborder="0"
      ></iframe>
    </div>

    <div v-else class="form" :style="{ minHeight: height }">
      <div class="null-con">
        <img src="../../../../../common/images/task/nondata.png" alt />
        <p>数据为空</p>
      </div>
    </div>

  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.form {
  padding: 26px 20px 10px;
  box-sizing: border-box;
  width: 100%;
}

.null-con {
  img {
    display: block;
    margin: 20% auto 20px;
    width: 120px;
  }

  p {
    text-align: center;
    font-size: 13px;
  }

  color: #666;
}


.page {
  width: 100%;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>


<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 150}px`;
    },
  },
  methods: {
    open(data) {
     this.data = data
    },
  },
};
</script>
