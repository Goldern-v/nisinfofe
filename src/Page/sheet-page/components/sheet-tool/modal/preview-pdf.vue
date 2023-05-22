<template>
  <sweet-modal
    ref="preview-modal"
    class="archive-preview-modal"
    :fullBtn="true"
    :modalWidth="800"
    title="归档打印"
  >
    <div class="archive-detail-modal" v-loading="pageLoading">
      <div v-if="preview.url" :style="{ height: pdfHeight + 'px' }">
        <iframe
          width="100%"
          height="100%"
          :src="preview.url + '#toolbar=0'"
          ref="pdfIframe"
        />
      </div>
    </div>
    <div slot="button" class="button">
      <el-button class="modal-btn" @click="close">取消</el-button>
      <el-button class="modal-btn" @click="print">打印</el-button>
    </div>
  </sweet-modal>
</template>

<script>
import { getSheetPdf } from '../../../api/index.js'
import { apiPath } from "@/api/apiConfig";
export default {
  data() {
    return {
      pageLoading: false,
      pdfHeight: window.innerHeight * 0.8,
      preview: {
        url: '',
        type: 'pdf'
      }
    }
  },
  methods: {
    async getPDfUrl(recordCode, blockId) {
      try {
        this.pageLoading = true;
        const res = await getSheetPdf(recordCode, blockId);
        console.log('getPDfUrl', res);
        const url = res.data.data;
        if (url) {
          this.preview.url = `${apiPath}${url}`;
        }
        this.pageLoading = false;
      } catch (error) {
        this.pageLoading = false;
        this.$message.error(error.message);
      }
    },
    open(sheetInfo) {
      this.pdfHeight = window.innerHeight * 0.8;
      this.$refs["preview-modal"].open();
      this.getPDfUrl(sheetInfo.selectBlock.recordCode, sheetInfo.selectBlock.id);
    },
    print() {
      if (this.$refs.pdfIframe && this.$refs.pdfIframe.contentWindow) {
        this.$refs.pdfIframe.contentWindow.print();
      }
    },
    close() {
      this.$refs["preview-modal"].close();
    },
  }
}
</script>

<style lang="scss" scoped>
.archive-preview-modal {
  .sweet-modal {
    overflow: visible;
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
