<template>
  <div class="ward-report-detail" v-loading="loading" element-loading-text="加载中...">
    <div class="toolbar">
      <div class="toolbar-left">
        <h4>重症质量指标</h4>
      </div>
      <div class="toolbar-right">
        <el-button
          size="mini"
          class="skyblue-btn"
          @click="onDataSync"
          :disabled="!tableData.length || loading"
        >同步数据
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="onSave"
          :disabled="!editList.length || loading"
        >保存
        </el-button>
        <el-button size="mini" @click="openCreateModal">创建</el-button>
        <el-button
          size="mini"
          @click="onExport"
          :disabled="!tableData.length"
        >导出
        </el-button>
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
        <Pager :tableData="tableData" @onEditData="setEditData"/>
      </div>
    </div>
    <CreateModal
      ref="createRef"
      @confirm="createSummary"
    ></CreateModal>
  </div>
</template>

<script>
// import moment from "moment";
import NullBg from "@/components/null/null-bg.vue";
import common from "@/common/mixin/common.mixin.js";
import Pager from './components/Pager.vue'
import CreateModal from './components/CreateModal.vue'
import {
  icuQcSummaryCreate,
  getIcuQcSummaryItem,
  icuQcSummarySave,
  icuQcSummarySync,
  icuQcSummaryExport,
} from './api'
import bus from "vue-happy-bus";

export default {
  mixins: [common],
  components: { NullBg, Pager, CreateModal },
  props: {

  },
  data() {
    return {
      loading: false,
      tableData: [],
      editList: [],
      timer: null,
      bus: bus(this),
      code: ''
    };
  },
  computed: {},
  watch: {
    '$route.params.code'() {
      this.load()
    }
  },
  mounted() {
    this.bus.$on('loadBIndicatorDet', (code) => {
      this.code = code || ''
      this.load()
    })
    this.load()
  },
  beforeDestroy() {
    this.bus.$off('loadBIndicatorDet')
  },
  methods: {
    // 加载数据
    async load() {
      this.editList = []
      const code = this.$route.params.code || this.code
      if (!code) {
        this.tableData = []
        return
      }
      try {
        this.loading = true
        const res = await getIcuQcSummaryItem(code)
        this.tableData = res.data.data
        this.loading = false
      } catch (error) {
        throw new Error('获取数据失败')
      }
    },
    // 数据同步
    async onDataSync() {
      try {
        this.loading = true
        const code = this.$route.params.code || this.code
        const res = await icuQcSummarySync(code)
        if (res.data.code == '200') {
          this.loading = false
          this.$message.success('同步成功')
          this.load()
        }
      } catch (error) {
        throw this.$message.error('数据同步失败')
      }
    },
    // 添加编辑项
    setEditData(data) {
      const index = this.editList.findIndex(v => v.itemCode === data.itemCode)
      // 存在
      if (index > -1) {
        // 没有改变，1.值相等，2.都为空
        if (
          (
            data.old_numerator === data.numerator ||
            (typeof data.old_numerator !== 'number' && typeof data.numerator !== 'number') ||
            data.old_numerator === undefined
          )
          &&
          (
            data.old_denominator === data.denominator ||
            (typeof data.old_denominator !== 'number' && typeof data.denominator !== 'number') ||
            data.old_denominator === undefined
          )
        ) {
          this.editList.splice(index, 1)
        } else {
          this.editList[index] = data
        }
      } else {
        // 值不相等 || 都不为空
        if (
          !(
            data.old_numerator === data.numerator ||
            (typeof data.old_numerator !== 'number' && typeof data.numerator !== 'number')
          )
          ||
          !(
            data.old_denominator === data.denominator ||
            (typeof data.old_denominator !== 'number' && typeof data.denominator !== 'number')
          )
        ) {
          this.editList.push(data)
        }
      }
    },
    // 保存
    async onSave() {
      const params = {
        summaryCode: this.$route.params.code || this.code,
        items: this.editList.map(item => {
          return {
            itemCode: item.itemCode,
            numerator: item.numerator,
            denominator: item.denominator
          }
        })
      }
      try {
        this.loading = true
        const res = await icuQcSummarySave(params)
        if (res.data.code == '200') {
          this.loading = false
          this.$message.success('保存成功')
          this.load()
        }
      } catch (error) {
        throw this.$message.error('保存失败')
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
        this.$message.success('创建成功')
      } catch (error) {
        throw new Error('创建失败')
      }
    },
    // 导出
    async onExport() {
      try {
        const code = this.$route.params.code || this.code
        const res = await icuQcSummaryExport(code)
        const blob = new Blob([res.data])
        const contentDisposition = res.headers['content-disposition']
        const pattern = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
        const result = pattern.exec(contentDisposition)
        // 使用decodeURI对名字解码
        const filename = decodeURI(result[1])
        const tag = document.createElement('a')
        const href = window.URL.createObjectURL(blob)
        tag.href = href
        tag.download = filename
        document.body.appendChild(tag)
        tag.click()
        // 下载完成移除元素
        document.body.removeChild(tag)
        // 释放掉blob对象
        window.URL.revokeObjectURL(href)
      } catch (error) {
        throw new Error('导出失败')
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
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


