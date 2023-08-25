<template>
  <el-dialog
    title="PDF生成详情"
    :visible.sync="pdfModalVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @close="close"
  >
    <div class="pdf-details__wrapper" v-loading="loading">
      <div class="pdf-details__title">
        <div class="pdf-details__title-left">
          <h3>
            总进度{{ pdfInfo.schedule }}：共{{ pdfInfo.amount }}份，已完成{{ pdfInfo.okNum }}份，已失败{{ pdfInfo.failNum }}份
          </h3>
          <el-checkbox v-model="onlyPDFFailures" @change="onSwitch">
            只显示生成PDF失败的记录
          </el-checkbox>
        </div>
        <div class="pdf-details__title-right">
          <el-button @click="onTransformAll" v-if="isComplete">重转PDF</el-button>
          <el-button @click="queryPDFInfoList">刷新</el-button>
        </div>
      </div>
      <div class="pdf-details__body">
        <div class="pdf-details__list" v-if="pdfList.length">
          <div
            class="pdf-details__item"
            v-for="(pdf, index) in pdfList"
            :key="pdf.id + '_' + index"
          >
            <span class="pdf-index">{{ index + 1 }}.</span>
            <div class="pdf-form-name" :title="pdf.formName">{{ pdf.formName }}</div>
            <span class="pdf-status-icon">
              <i :class="setIconStyle(pdf.resultStatus)"></i>
              <el-button
                v-if="pdf.resultStatus !== STATUS_MAPPING.loading"
                :class="setClassName(pdf.resultStatus)"
                type="text"
                @click="retransformPDF(pdf)"
              >重转PDF
              </el-button>
            </span>
          </div>
        </div>
        <nullBg v-else text="暂无数据"></nullBg>
      </div>
      <el-pagination
        small
        layout="total, jumper, prev, pager, next, sizes"
        :current-page.sync="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      ></el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import nullBg from "@/components/null/null-bg";
import { pdfInfoList, generateArchiveNewSingle } from "../api/index";
// 1：成功，-1：失败，0：进行中
const CLASS_MAPPING = {
  '1': { icon: 'el-icon-circle-check', className: 'success' },
  '-1': { icon: 'el-icon-circle-cross', className: 'error' },
  '0': { icon: 'el-icon-loading', className: 'loading' },
}
const STATUS_MAPPING = {
  success: '1',
  error: '-1',
  loading: '0'
}
export default {
  components: { nullBg },
  props: {
    reloadPDFList: Boolean
  },
  data() {
    return {
      pdfModalVisible: false,
      onlyPDFFailures: false,
      loading: false,
      // 状态码
      STATUS_MAPPING,
      // 转 pdf 列表信息
      pdfList: [],
      // 分页信息
      pagination: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      },
      // 头部pdf信息
      pdfInfo: {
        amount: 0,
        failNum: 0,
        okNum: 0,
        schedule: '0%'
      },
      // 点击 'pdf详情' 的行数据
      infoItem: {}
    }
  },
  computed: {
    // 是否完成
    isComplete() {
      return +this.pdfInfo.amount !== 0 && +this.pdfInfo.amount === +this.pdfInfo.okNum + +this.pdfInfo.failNum;
    }
  },
  methods: {
    open(data) {
      this.pdfModalVisible = true;
      this.infoItem = data;
      this.queryPDFInfoList();
    },
    onSizeChange(value) {
      this.pagination.pageSize = value;
      this.queryPDFInfoList();
    },
    onCurrentChange(value) {
      this.pagination.pageIndex = value;
      this.queryPDFInfoList();
    },
    // 查询
    async queryPDFInfoList() {
      this.loading = true;
      const { patientId, visitId } = this.infoItem;
      let params = {
        patientId,
        visitId,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      };
      if (this.onlyPDFFailures) {
        params = { ...params, resultStatus: this.STATUS_MAPPING.error };
      }
      try {
        const res = await pdfInfoList(params);
        this.loading = false;
        const result = res.data.data;
        if (result) {
          this.pdfInfo.amount = result.amount;
          this.pdfInfo.failNum = result.failNum;
          this.pdfInfo.okNum = result.okNum;
          this.pdfInfo.schedule = result.schedule;
          if (result.page) {
            this.pagination.total = result.page.totalCount;
            this.pdfList = result.page.list || [];
          }
          this.$emit('update-reload', false);
        }
      } catch (error) {
        this.loading = false;
      }
    },
    onSwitch() {
      this.queryPDFInfoList();
    },
    // 重转所有PDF
    onTransformAll() {
      this.$emit('onTransformAll', this.infoItem, true);
    },
    // 单个表单重转PDF
    async retransformPDF(data) {
      const params = {
        patientId: data.patientId,
        visitId: data.visitId,
        formType: data.formType,
        formId: data.formId,
      }
      this.$message.success('正在重转PDF...');
      try {
        await generateArchiveNewSingle(params);
        this.queryPDFInfoList();
      } catch (error) {
        this.$message.error('重转失败');
      }
    },
    // 设置图标样式
    setIconStyle(status) {
      if (CLASS_MAPPING[status]) {
        return [CLASS_MAPPING[status].icon, CLASS_MAPPING[status].className];
      }
      return '';
    },
    setClassName(status) {
      if (CLASS_MAPPING[status]) {
        return CLASS_MAPPING[status].className;
      }
      return '';
    },
    close() {
      this.$emit('refresh')
      this.pdfModalVisible = false;
      this.onlyPDFFailures = false;
      this.pdfList = [];
      this.pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      }
    }
  },
  watch: {
    reloadPDFList(value) {
      if (value) {
        this.queryPDFInfoList();
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  >>>.el-dialog {
    top: 50%!important;
    left: 50%;
    transform: translate(-50%, -50%)!important;
    .el-dialog__header {
      text-align: center;
    }
    // .el-dialog__body {
    //   height: calc(100vh - 140px);
    //   overflow: auto;
    // }
  }
  .pdf-details__wrapper {
    width: 100%;
    height: 600px;
    .pdf-details__title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000;
      .pdf-details__title-left {
        display: flex;
        align-items: center;
      }
    }
    h3 {
      font-size: 16px;
      font-weight: bold;
      padding: 6px 0px;
      margin-right: 12px;
    }
    .pdf-details__body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: calc(100% - 62px);
      overflow: auto;
    }
    .pdf-details__list {
      display: flex;
      flex-wrap: wrap;
      .pdf-details__item {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 10px 0px;
        color: #000;
        height: 30px;
        .pdf-index {
          display: inline-block;
          width: 40px;
          text-align: center;
          font-size: 14px;
          color: #000;
        }
        .pdf-form-name {
          width: 300px;
          padding: 6px 6px;
          background-color: #f2f2f2;
          font-size: 14px;
          color: #000;
          height: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pdf-status-icon {
          margin-left: 12px;
          .success {
            color: #4bb08d;
          }
          .loading {
            color: #5582f3;
          }
          .error {
            color: #ff4948;
          }
        }
      }
    }
  }
  >>> .el-pagination  {
    display: flex;
    align-items: center;
  }
</style>

