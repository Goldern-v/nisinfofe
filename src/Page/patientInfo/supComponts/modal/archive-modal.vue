<template>
  <div>
    <sweet-modal
      ref="modal"
      :title="preview.title"
      :enable-mobile-fullscreen="false"
      class="archive-preview-modal"
      :fullBtn="true"
      :modalWidth="800"
    >
      <div class="archive-detail-modal">
        <div class="preview" v-if="printDetailList && printDetailList.length">
          <div class="arrow" :class="{isFullMode: modalObj.infull}">
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
          </div>
          <div v-if="preview.type=='pdf'" :style="{height: pdfHeight+'px'}">
            <iframe width="100%" height="100%" :src="preview.url+'#toolbar=0'" />
          </div>
        </div>
      </div>
      <div slot="button" class="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button
          class="modal-btn"
          @click="generateArchive()"
          v-if="printArchiveMaster.printStatus==0 && printArchiveMaster.resultStatus!=1"
        >转pdf</el-button>
        <el-button
          class="modal-btn"
          @click="generateArchive()"
          v-if="printArchiveMaster.printStatus!=0 && printArchiveMaster.printStatus!=1 && printArchiveMaster.uploadStatus!=1 && printArchiveMaster.uploadStatus!=2"
        >重转pdf</el-button>
        <el-button
          class="modal-btn"
          @click="uploadFileArchive()"
          v-if="printArchiveMaster.resultStatus==1 && printArchiveMaster.uploadStatus!=1 && printArchiveMaster.uploadStatus!=2"
        >归档</el-button>
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
.archive-preview-modal {
  .sweet-modal {
    overflow: visible;
  }
}

.archive-detail-modal {
  .button {
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }

  .isFullMode {
    .el-icon-arrow-left {
      left: 150px;
    }

    .el-icon-arrow-right {
      right: 150px;
    }
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
import { setInterval } from "timers";
export default {
  data() {
    return {
      data: {},
      details: {},
      iconLoading: false,
      item: {},
      currentFileIndex: 0, //当前预览pdf索引
      preview: {
        type: "",
        name: "",
        url: ""
      },
      pdfHeight: window.innerHeight * 0.8,
      modalObj: {} //modal对象
    };
  },
  props: {
    printArchiveMaster: Object,
    getArchiveStatus: Function,
    printDetailList: Array
  },
  mounted() {
    if (this.$refs.modal) {
      this.modalObj = this.$refs.modal;
    }
  },
  methods: {
    open(data) {
      this.item = data;
      this.previewArchive();
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
        this.close();
        this.getArchiveStatus();
      });
    },
    // 预览归档文件
    previewArchive() {
      this.currentFileIndex = 0;
      this.previewFile();
    },
    // 预览
    previewFile() {
      if (this.printDetailList) {
        this.preview = {
          title:
            this.printDetailList[this.currentFileIndex].formName +
            "(" +
            (this.currentFileIndex + 1) +
            "/" +
            this.printDetailList.length +
            ")" +
            "<span style='margin-left: 10px;'>" +
            this.printArchiveMaster.statusDesc +
            "</span>",
          url: this.printDetailList[this.currentFileIndex].filePath,
          type: "pdf"
        };

        // this.$refs["preview-modal"].open();
        this.pdfHeight = window.innerHeight * 0.8;
      }
    },
    // 上一个文件
    preveFile() {
      let infull = this.modalObj.infull;
      if (this.currentFileIndex > 0) {
        this.currentFileIndex--;
        this.previewFile();
      }
      this.modalObj.infull = infull;
    },
    // 下一个文件
    nextFile() {
      let infull = this.modalObj.infull;
      if (this.currentFileIndex < this.printDetailList.length - 1) {
        this.currentFileIndex++;
        this.previewFile();
      }
      this.modalObj.infull = infull;
    },
    // 文件归档上传
    uploadFileArchive() {
      uploadFileArchive(this.item.patientId, this.item.visitId).then(rep => {
        this.$message({
          type: "success",
          message: "文件上传成功"
        });
        this.close();
        this.getArchiveStatus();
      });
    }
  },
  components: {}
};
</script>

