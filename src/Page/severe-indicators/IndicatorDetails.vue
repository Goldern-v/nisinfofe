<template>
  <div class="ward-report-detail" v-loading="loading" element-loading-text="加载中...">
    <div class="toolbar">
      <div class="toolbar-left">
        <h4>重症质量指标</h4>
      </div>
      <div class="toolbar-right">
        <el-button size="mini" class="skyblue-btn">同步数据</el-button>
        <el-button size="mini" type="primary">保存</el-button>
        <el-button size="mini" @click="openCreateModal">创建</el-button>
        <el-button size="mini">导出</el-button>
      </div>
    </div>
    <div class="container">
      <NullBg v-if="!tableData.length" text="暂无数据" />
      <!-- <div
        v-if="!tableData.length"
        class="null-btn"
      >
        <i class="el-icon-plus"></i>创建
      </div> -->
      <div class="data-area" v-else ref="area">
        <Pager :tableData="tableData"/>
      </div>
    </div>
    <CreateModal
      ref="createRef"
      @confirm="createSummary"
    ></CreateModal>
  </div>
</template>

<script>
import moment from "moment";
import NullBg from "@/components/null/null-bg.vue";
import common from "@/common/mixin/common.mixin.js";
import Pager from './components/Pager.vue'
import CreateModal from './components/CreateModal.vue'
import { icuQcSummaryCreate, getIcuQcSummaryItem } from './api'
export default {
  mixins: [common],
  components: { NullBg, Pager, CreateModal },
  props: {

  },
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  computed: {},
  watch: {
    '$route.params.code'() {
      this.load()
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const code = this.$route.params.code
      if (!code) return
      try {
        this.loading = true
        const res = await getIcuQcSummaryItem(code)
        this.tableData = res.data.data
        this.loading = false
      } catch (error) {
        throw new Error('获取数据失败')
      }
    },
    // 打开
    openCreateModal() {
      this.$refs.createRef.open()
    },
    // 创建
    async createSummary(data) {
      try {
        this.loading = true
        const params = {
          ...data,
          wardCode: this.deptCode
        }
        await icuQcSummaryCreate(params)
        this.$emit('refreshSummaryList')
        this.loading = false
      } catch (error) {
        throw new Error('创建失败')
      }
    }
  }
};
</script>

<style lang="stylus">
.ward-report-detail {
  display: flex;
  flex-direction: column;
  height: 100%;

  .toolbar {
    display: flex;
    align-items: center;
    height: 41px;
    padding: 0 18px;
    background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
    border: 1px solid #CBD5DD;
    overflow: hidden;
    font-size: 14px;
    justify-content: space-between;
    &.toolbar-left {
      flex: 1;
    }
    &.toolbar-right {
      text-align: right;
      flex: 1;
    }
  }

  .container {
    padding: 15px 0;
    flex: 1;
    overflow: auto;
    position: relative;
    .data-area {
      height: 100%;
    }
  }
  .null-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 17px;
    color: #687179;
    width: 195px;
    height: 50px;
    background: #FFFFFF;
    border: 1px solid #ADB4BA;
    box-shadow: 0 1px 2px 0 rgba(200, 200, 200, 0.5);
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      background: #fafafa;
    }

    i {
      margin-right: 4px;
    }
  }
}
</style>


