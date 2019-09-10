<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="400" title="归档打印" :enable-mobile-fullscreen="false">
      <div class="archive-detail-modal preview" v-if="printArchiveMaster.resultStatus == 1">
        <div class="arrow" v-if="printDetailList && printDetailList.length">
          <span
            class="el-icon-arrow-left"
            @click="preveFile"
            :style="!currentFileIndex && {opacity:0.5}"
          ></span>
          <span
            class="el-icon-arrow-right"
            @click="nextFile"
            :style="currentFileIndex == printDetailList.length - 1 && {opacity:0.5}"
          ></span>
          <!-- <p v-if="printArchiveMaster.resultStatus == 1 &&
          printArchiveMaster.uploadStatus != 1 &&
          printArchiveMaster.uploadStatus != 2">是否归档</p>-->
          <div slot="button" class="button">
            <el-button class="modal-btn">归档</el-button>
          </div>
        </div>

        <div v-if="preview.type=='pdf'" :style="{height: pdfHeight+'px'}">
          <iframe width="100%" height="100%" :src="preview.url+'#toolbar=0'" />
        </div>
      </div>
      <div class="archive-detail-modal" v-else>
        <p v-if="printArchiveMaster.printStatus==0 && printArchiveMaster.resultStatus!=1">是否转pdf</p>
        <p
          v-if="printArchiveMaster.printStatus != 0 &&
        printArchiveMaster.printStatus != 1 &&
        printArchiveMaster.uploadStatus != 1 &&
        printArchiveMaster.uploadStatus != 2"
        >是否重转pdf</p>

        <!-- <p v-if="printArchiveMaster.uploadStatus == 1">归档成功</p> -->

        <div slot="button" class="button">
          <el-button class="modal-btn" @click="close">取消</el-button>
          <el-button class="modal-btn" @click="confirm">确定</el-button>
        </div>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.list-con {
  margin: 0 40px 10px;
  font-size: 14px;

  .key {
    color: #687179;
  }

  .value {
    color: #333333;
  }
}

.icon-con {
  margin: 0 38px 10px;
  min-height: 20px;
}

.table-name {
  background: #FF263C;
  border-radius: 2px;
  width: 18px;
  height: 18px;
  margin-left: 4px;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 18px;
}

.modal-btn {
  overflow: hidden;
}

.arrow {
  .el-icon-arrow-left, .el-icon-arrow-right {
    font-size: 40px;
    position: fixed;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.4);
    padding: 10px;
    color: #c4bebe;
    border-radius: 4px;
    cursor: pointer;
    z-index: 10002;
  }

  .el-icon-arrow-left {
    left: -150px;
  }

  .el-icon-arrow-right {
    right: -150px;
  }
}
</style>
<style lang="stylus">
.archive-detail-modal {
  p {
    text-align: center;
  }

  .button {
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import qs from "qs";
import {
  generateArchive,
  previewArchive,
  uploadFileArchive
} from "./api/index";
export default {
  data() {
    return {
      data: {},
      details: {},
      iconLoading: false,
      item: {},
      currentFileIndex: 0, //当前预览pdf索引
      printDetailList: "", //归档详情
      preview: {
        type: "",
        name: "",
        url: ""
      }
    };
  },
  props: {
    printArchiveMaster: Object,
    getArchiveStatus: Function
  },
  methods: {
    open(data) {
      this.item = data;
      console.log(this.item);
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    // 生成归档文件
    generateArchive() {
      generateArchive(this.item.patientId, this.item.visitId).then(rep => {
        this.$message({
          type: "success",
          message: "正在转pdf，请稍等"
        });
        this.getArchiveStatus();
      });
    },
    // 预览归档文件
    previewArchive() {
      this.currentFileIndex = 0;
      this.printDetailList = "";
      previewArchive(this.item.patientId, this.item.visitId).then(res => {
        this.printDetailList = res.data.data.printDetailList;
        this.previewFile();
      });
    },
    // 文件归档上传
    uploadFileArchive() {
      uploadFileArchive(this.item.patientId, this.item.visitId).then(rep => {
        this.$message({
          type: "success",
          message: "文件上传成功"
        });
      });
    },
    // 文件归档上传
    uploadFileArchive() {
      uploadFileArchive(this.item.patientId, this.item.visitId).then(rep => {
        this.$message({
          type: "success",
          message: "文件上传成功"
        });
        this.getArchiveStatus();
      });
    },
    confirm() {
      this.close();
      this.generateArchive();
    }
  },
  components: {}
};
</script>

