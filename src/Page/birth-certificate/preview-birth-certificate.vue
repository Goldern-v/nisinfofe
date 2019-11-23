<template>
  <div class="preview-birth-certificate">
    <div class="toolBar">
      <button class="back" @click="goBack">返回上一页</button>
      <div>
        <button class="preview" @click="printForm">打印</button>
      </div>
    </div>
    <div class="preview-content" v-html="previewData" ref="preview-content"></div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      previewData: ""
    };
  },
  mounted() {
    this.previewData = localStorage.getItem("previewBirthCertificate") || "";
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    printForm() {
      var newWindow = window.open("打印窗口", "_blank"); //打印窗口要换成页面的url
      newWindow.document.write(this.previewData);
      newWindow.document.close();
      newWindow.print();
      newWindow.close();
      // window.print();
    }
  },
  components: {}
};
</script>
<style lang='scss' scoped>
.preview-birth-certificate {
  padding-top: 65px;
  padding-bottom: 57px;
  background-color: #dfdfdf;
  .toolBar {
    position: fixed;
    top: 60px;
    width: 100%;
    height: 49px;
    padding: 10px 19px 8px 20px;
    border: 1px solid #cbd5dd;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: linear-gradient(
      180deg,
      rgba(246, 246, 248, 1) 0%,
      rgba(235, 236, 240, 1) 100%
    );
    > div {
      text-align: right;
    }
    button {
      font-size: 12px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #cbd5dd;
      border-radius: 2px;
      height: 30px;
      background-color: #fff;
      cursor: pointer;
      outline: none;
      &.back {
        width: 102px;
        float: left;
      }
      &.save {
        width: 62px;
        margin-right: 10px;
      }
      &.prview {
        width: 76px;
      }
    }
  }
}
</style>
<style lang='scss'>
.preview-birth-certificate {
  .sign-img {
    display: block;
    & + span {
      display: none;
    }
  }
}
@media print {
  .toolBar {
    display: none !important;
    width: 0 !important;
  }
  .preview-birth-certificate {
    background-color: #fff;
  }
}
</style>