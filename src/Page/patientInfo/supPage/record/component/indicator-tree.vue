<template>
  <div class="ward-report">
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
          <div
            class="item"
            :class="{ active: selectItem.id == item.id }"
            v-for="item in records"
            :key="item.id"
            @click="onDateSelect(item)"
          >
            <div class="link-date">{{ item.summaryMonth }}</div>
            <div class="link-text">{{ item.text }}</div>
          </div>
        </template>
        <template v-else>
          <div class="empty-text">
            暂无数据
            <el-button @click="openCreateModal">创建</el-button>
          </div>
        </template>
      </div>
    </div>
    <CreateModal ref="createRef" @confirm="createSummary" />
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import {
  getIcuQcSummaryList,
  icuQcSummaryCreate
} from "@/Page/severe-indicators/api";
import CreateModal from "@/Page/severe-indicators/components/CreateModal.vue";
import bus from "vue-happy-bus";

export default {
  mixins: [common],
  components: {
    CreateModal
  },
  data() {
    return {
      year: `${moment().year()}`,
      records: [],
      selectItem: null,
      bus: bus(this)
    };
  },
  computed: {
    selectWardCode() {
      return this.deptCode || localStorage.getItem("selectDeptValue") || "";
    }
  },
  watch: {
    selectWardCode(val) {
      if (val) {
        this.selectItem = null;
        this.getSummaryList();
      }
    },
    selectItem(val) {
      // if (!this.$route.params.code && val) {
      //   this.$router.push(
      //     `/severe-indicators/${val.summaryCode ||
      //       ""}?month=${val.summaryMonth || ""}`
      //   );
      // } else {
      //   this.$router.push("/severe-indicators");
      // }
    }
  },
  mounted() {
    this.getSummaryList();
  },
  methods: {
    async getSummaryList() {
      if (typeof this.year) {
        this.year = moment(this.year).format("YYYY");
      }
      try {
        const params = {
          year: this.year,
          wardCode: this.selectWardCode
        };
        const res = await getIcuQcSummaryList(params);
        this.records = res.data.data.map(item => {
          return {
            ...item,
            text: `${item.createName}于${item.createTime}分创建`
          };
        });
        const item = this.selectItem ? this.selectItem : this.records[0];
        this.onDateSelect(item);
      } catch (error) {}
    },
    onDateSelect(data) {
      this.selectItem = data;
      this.bus.$emit("openOtherForm", {
        ...data,
        component: "IndicatorDetails"
      });
      this.$nextTick(() => {
        this.bus.$emit("loadBIndicatorDet", data.summaryCode);
      });
    },
    // 打开
    openCreateModal() {
      this.$refs.createRef.open();
    },
    // 创建
    async createSummary(data) {
      try {
        const params = {
          ...data,
          wardCode: this.deptCode
        };
        await icuQcSummaryCreate(params);
        this.$message.success("创建成功");
        this.getSummaryList();
      } catch (error) {
        throw new Error("创建失败");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.ward-report

  .left-side

    .header
      display flex
      align-items center
      height 41px
      padding 0 14px
      background #F7FAFA
      border-bottom 1px solid #EAEEF1

    .list
      padding 10px 7px
      flex 1
      overflow auto
      .item
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
        .link-text
          font-size: 12px
          padding: 3px 0px
      .empty-text
        color: #888
        text-align: center
        margin-top: 12px
    .date-picker
      width: 100%
      font-size 12px
</style>
