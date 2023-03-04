<template>
  <div class="box-print " ref="qrcodeContainer">
    <div v-for="(item, index) in printData" :key="index">
      <div class="code-print">
        <div class="boxShadow">
          <img class="qr-code" :src="item.qr_png" />
        </div>
        <div class="box-foot">
          <span>{{ item.qrCode }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
>>> .sweet-content{
  max-height: 300px;
}
.box-print {
  width: 160px;
  height:160px;
  margin: 0 auto;
  margin-top: 170px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  .boxShadow {
    display: flex;
    justify-content: center;
    .qrcode {
      display: inline-block;
      img {
        width: 2.8cm;
        height: 2.8cm;
        overflow: hidden;
      }
    }
  }
  .box-foot {
    // width: 120%;
    margin: 0 auto;
    // margin-left: -10px;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
  }
}
.box-btn {
  width: 150px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
</style>

<script>
var qr = require('qr-image')
import printing from 'printing'
export default {
  data() {
    return {
      printData: [],
    }
  },
  props: {},
  computed: {},
  methods: {
    qrCode(data) {
      this.$refs.qrcodeContainer.style.display = "block";
      this.printData = data
      this.printData.map((item, index) => {
        var qr_png = qr.imageSync(item.qrCodeValue, { type: 'png' })
        function arrayBufferToBase64(buffer) {
          var binary = ''
          var bytes = new Uint8Array(buffer)
          var len = bytes.byteLength
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          return 'data:image/png;base64,' + window.btoa(binary)
        }
        let base64 = arrayBufferToBase64(qr_png)
        item.qr_png = base64
      })
      this.$nextTick(() => {
        printing(this.$refs.qrcodeContainer)
          .then(() => {
            this.$refs.qrcodeContainer.style.display = "none";
          })
          .catch((e) => {})
      })
    },
  },
  mounted() {},
  components: {},
}
</script>
