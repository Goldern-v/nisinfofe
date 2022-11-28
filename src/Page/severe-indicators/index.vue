<template>
  <div class="ward-report" :style="{height}">
    <div class="left-side">
      <div class="header">
        <ElDatePicker
          class="date-picker"
          type="year"
          size="small"
          :clearable="false"
          v-model="year"
          @change="getSummaryList"
        />
      </div>
      <div class="list">
        <template v-if="records.length">
          <router-link
            class="item"
            active-class="active"
            v-for="item in records"
            :to="{
              name: 'severe-indicators',
              params: { code: item.summaryCode },
              query: { month: item.summaryMonth }
            }"
            :key="item.id"
            @click="onDateSelect(item)"
          >
            <div class="link-date">{{ item.summaryMonth }}</div>
            <div class="link-text">{{ item.text }}</div>
          </router-link>
        </template>
        <template v-else>
          <div class="empty-text">暂无数据</div>
        </template>
      </div>
    </div>
    <div class="container">
      <!-- <NullBg v-if="!records.length" text="暂无数据" /> -->
      <div
        v-if="!records.length"
        class="null-btn"
        @click="openCreateModal"
      >
        <i class="el-icon-plus"></i>创建
      </div>
      <router-view
        v-else
        @refreshSummaryList="getSummaryList"
      ></router-view>
    </div>
    <CreateModal
      ref="createRef"
      @confirm="createSummary"
    />
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import { getIcuQcSummaryList, icuQcSummaryCreate } from './api'
import NullBg from "@/components/null/null-bg.vue";
import CreateModal from './components/CreateModal.vue'
export default {
  mixins: [common],
  components: { NullBg, CreateModal },
  data() {
    return {
      year: `${moment().year()}`,
      records: [],
      selectItem: null
    };
  },
  computed: {
    height() {
      return this.wih - 61 + "px"
    },
    selectWardCode() {
      return this.deptCode || localStorage.getItem('selectDeptValue')
    }
  },
  watch: {
    selectWardCode(val) {
      if (val) {
        this.selectItem = null
        this.getSummaryList()
      }
    },
    selectItem(val) {
      if (!this.$route.params.code && val) {
        this.$router.push(
          `/severe-indicators/${val.summaryCode || ''}?month=${val.summaryMonth || ''}`,
        )
      } else {
        this.$router.push('/severe-indicators')
      }
    }
  },
  mounted() {
    this.getSummaryList()
  },
  methods: {
    async getSummaryList() {
      if (typeof this.year) {
        this.year = moment(this.year).format('YYYY')
      }
      try {
        const params = {
          year: this.year,
          wardCode: this.selectWardCode,
        }
        const res = await getIcuQcSummaryList(params)
        this.records = res.data.data.map(item => {
          return {
            ...item,
            text: `${item.createName}于${item.createTime}分创建`
          }
        })
        this.selectItem = this.selectItem ? this.selectItem : this.records[0]
      } catch (error) {

      }
    },
    onDateSelect(data) {
      this.selectItem = data
    },
    // 打开
    openCreateModal() {
      this.$refs.createRef.open()
    },
    // 创建
    async createSummary(data) {
      try {
        const params = {
          ...data,
          wardCode: this.deptCode
        }
        await icuQcSummaryCreate(params)
        this.$message.success('创建成功')
        this.getSummaryList()
      } catch (error) {
        throw new Error('创建失败')
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
  .ward-report
    position relative
    padding-left 200px
    height 100%
    background-color #dfdfdf

    .left-side
      position absolute
      top 0
      left 0
      z-index 1
      display flex
      flex-direction column
      height 100%
      width 200px
      border-right 1px solid #CBD5DD
      background white

      .header
        display flex
        align-items center
        height 41px
        padding 0 14px
        background #F7FAFA
        border-bottom 1px solid #EAEEF1

      .list
        padding 10px 7px
        // padding 10px 7px
        flex 1
        overflow auto
        .item
          // padding 0 14px
          padding 3px 8px
          margin-bottom: 2px
          display flex
          border-radius 3px
          background transparent
          color #687179
          cursor pointer
          text-decoration none
          flex-direction: column
          justify-content: center
          &:hover
            background #F7F7FA

          &.active
            background #F1F1F5
            .link-date
              color #333333
              font-weight bold

          .link-date
            font-size 13px
            padding: 3px 0px
          .link-text {
            font-size: 12px
            padding: 3px 0px
          }
        .empty-text {
          color: #888
          text-align: center
          margin-top: 12px
        }
      .date-picker
        width: 100%
        font-size 12px

    .container
      height 100%
      overflow auto
      position relative

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
</style>
