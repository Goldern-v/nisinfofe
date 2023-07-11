<template>
  <div class="information" :style="sizeStyle">
    <div class=" info">设备信息</div>
    <img :class="{'img': status}" :src="this.printAll ? information.qrCode : QRCode " alt="">
    <div>{{information.name}}<span>（{{information.code}}）</span> </div>
  </div>
</template>

<script>
var qr = require("qr-image");
export default {
  
  props: {
    allSize: {
      default: '5*8',
      type: String
    },
    information: {
      default: {},
      type: Object
    },
    printAll: {
      default: '',
      type: String
    },
    // QRCode: {
    //   default: '',
    //   type: String
    // }
  },
  data() {
    return {
      status: false,
      QRCode: '',
      // information: {
      //   name: '',
      //   id: '',
      //   size: '',
      // }
    };
  },
  computed: {
    sizeStyle() {
      return this.getSizeStyle(this.printAll ? this.allSize : this.information.qrCodeSize)
    },
  },

  methods: {
    getSizeStyle(size) {
      if (size) {
        let w = size.split('*')[0];
        let h = size.split('*')[1] - 0.1;
        if (h < 3) this.status = true
        else this.status = false
        return { width: `${w}cm`, height: `${h}cm`}
      } else {
        return { width: '5cm', height: '7.9cm'}
      }
    },
    getQRCode(row, text = '') {
      let qr_png_value = text ? row.status : row.registrationCode || '';
      let qr_png = qr.imageSync(qr_png_value, { type: "png" });
      function arrayBufferToBase64(buffer) {
        let binary = "";
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return "data:image/png;base64," + window.btoa(binary);
      }
      let base64 = arrayBufferToBase64(qr_png);
      this.QRCode = base64;
      return base64
      // this.qrCodeNum = qr_png_value;
    },
  }
};
</script>

<style lang="scss" scoped>
.information {
  text-align: center;
  img{
    width: 100%;
  }
  .img{
    width: 1.8cm;
  }
  /* .item{
    padding: 10px 0;
  } */
  .info {
    font-weight: bold;
    font-size: 16px;
    /* margin-top: 10px; */
  }
}
</style>