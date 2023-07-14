<template>
  <el-dialog custom-class='preview' size='tiny' :title="title" :visible.sync="visible">
    <div class="content">
      <QRcode :information='information' ref="QRcode" />
      <!-- <div class="information" ref="QRcode" :style="sizeStyle">
        <div class="item info">设备信息</div>
        <img src="./card.jpg" alt="">
        <div class="item">{{information.name}} <span>（{{information.id}}）</span> </div>
      </div> -->
      <!-- <template v-else>
        <div ref="allQRcode" v-for="item in multipleSelection" :key="item.id">
          <div class="information" :style="allSizeStyle">
            <div class="item info">设备信息</div>
            <img src="./card.jpg" alt="">
            <div class="item">{{item.name}} <span>（{{item.id}}）</span> </div>
          </div>
        </div>
      </template> -->
    </div>
    <div slot="footer" class="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="onPrint">打 印</el-button>
    </div>
  </el-dialog>
</template>

<script>
import printing from "printing";
import QRcode from '../components/QRcode'

export default {
  components: {
    QRcode
  },
  props: {
    multipleSelection: {
      default: () => [],
      type: Array
    },
  },
  data() {
    return {
      title: '预览二维码',
      visible: false,
      information: {
        name: '',
        id: '',
        qrCodeSize: '',
      },
    };
  },
  methods: {
    getQRCode(row) {
      this.$nextTick(() => {
        this.$refs.QRcode.getQRCode(row)
      })
    },
    cancel() {
      this.visible = false
    },
    onPrint() {
      printing(this.$refs.QRcode.$el, {
        direction: "vertical",
        injectGlobalCss: true,
        scanStyles: false,
        // css: cssStyle
      });
      this.visible = false
    }
  }
};
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
}
.footer{
  text-align: center;
}
/deep/.el-dialog__body{
  display: flex;
  justify-content: center;
  margin-bottom: 10px; 
}

</style>