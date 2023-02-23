<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="400"
      title="打印二维码"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
      <div class="box-print" v-loading="modalLoading" ref="printCon">
        <div class="boxShadow">
          <div class="qrcode" ref="qrcodeContainer"></div>
          <img class="qr-code" :src="qrCode" />
        </div>
        <div class="box-foot">
          <span>{{ qrCodeNum }}</span>
          <!-- <span>{{ user.deptName }}</span> -->
        </div>
      </div>
      <div class="box-btn">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="info" @click="onPrint">
          打印
        </el-button>
      </div>
    </sweet-modal>
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
  margin-top: 20px;
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
import printing from 'printing'
var qr = require('qr-image')
export default {
  data() {
    return {
      qrCode: '',
      qrCodeNum: '',
      modalLoading: false,
      user: JSON.parse(localStorage.user),
      data: {},
    }
  },
  props: {
    QRCodetext: {
      type: String, //类型限定
      default: '', //默认
    },
  },
  computed: {},
  methods: {
    init() {
      this.formData = {
        diet: '',
        registCare: [],
        mainDoctors: '',
        dutyNurses: '',
        remark: '',
        cmpx: '', //厘米传px
      }
    },
    open(data) {
      this.init()
      this.data = data
      this.$refs.modal.open()
      this.$nextTick(() => {
        this.qrcode()
      })
    },
    close() {
      this.$refs.modal.close()
    },
    onPrint() {
      this.$nextTick(() => {
        printing(this.$refs.printCon)
          .then(() => {
            this.$refs.modal.close()
          })
          .catch((e) => {})
      })
    },

    //二维码
    qrcode() {
      var qr_png = qr.imageSync(this.data.qrCodeValue, { type: 'png' })
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
      this.qrCode = base64
      this.qrCodeNum = this.data.qrCode
    },
  },
  mounted() {},
  components: {
  },
}
</script>
