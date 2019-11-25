<template>
  <div id="birthCertificatePrint">
    <div class="iframe" v-html="sheetModel"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#birthCertificatePrint {
  padding: 0;
  margin: 0 auto;
  overflow: hidden;

  .form-content {
    margin: 0 auto;
    page-break-after: always;
    min-height: 1000px;

    .sign-img {
      display: inline-block;
      vertical-align: middle;
    }

    .sign-text {
      display: none;
    }
  }

  .noPrint {
    display: none;
  }

  .inPrint {
    display: block;
  }
}

@media print {
  #birthCertificatePrint {
    .form-content {
      box-shadow: 0 0 0 0;

      .page-con {
        bottom: 0;
      }

      .his-logo {
        top: 0;
        left: 0;
      }
    }
  }
}

@page {
  margin: 0 10mm;
}
</style>
<script>
import $ from "jquery";
import bus from "vue-happy-bus";
import { printDir } from "../control/common-print.js";
export default {
  data() {
    return {
      iframeHeight: 0,
      pageLoading: true,
      bus: bus(this)
    };
  },
  created() {},
  mounted() {
    $("#app").css({
      minWidth: "700px"
    });
    printDir("v");
  },
  methods: {},
  computed: {
    sheetModel() {
      let html = window.localStorage.previewBirthCertificate;
      var reg = /data-value/g;
      return html.replace(reg, "value");
      return html;
    }
  },
  components: {}
};
</script>
