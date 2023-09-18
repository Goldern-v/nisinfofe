<template>
  <div class="paper" data-print-class="printing">
    <div class="head">
      <!-- <img class="logo" :src="hospitalLogo" alt="logo"> -->
      <h1 class="title">{{HOSPITAL_NAME_SPACE}}</h1>
      <div v-if="HOSPITAL_ID == 'xiegang'" style="font-size: 14px;position: absolute; top: -5px; right: -15px;">病房日报统计时间范围: 前一天0点-第二天0点</div>
      <h2 class="sub-title">病 房 工 作 日 报</h2>
      <div class="details">
        <div class="left">病房：{{name}}</div>
        <div class="right">{{date}}</div>
      </div>
    </div>
    <table class="table-wrapper">
      <tr v-if="digits">
        <td>
          <HeadTable v-if="!env" class="table-top" :data="digits" :LogBabyNum="LogBabyNum"/>
          <HeadTableDiff v-else class="table-top" :data="digits" :LogBabyNum="LogBabyNum"/>
        </td>
      </tr>
      <tr v-if="digits">
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td data-print-style="height: 0;">
          <table class="table-bottom" data-print-style="height: 100%;">
            <tr>
              <td>
                <InTable :data="inList" :index="index"/>
              </td>
              <td style="width: 10px"></td>
              <td>
                <OutTable :data="outList" :index="index"/>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="foot">
      <div class="sign">
        <span class="title">填表人：</span>
        <span class="content">
          <span data-print-style="display: none;">{{signName}}</span>
          <FallibleImage
            class="sign-img"
            :src="`/crNursing/api/file/signImage/${signNo}?${token}`"
            :alt="signName"
            data-print-style="display: inline-block;"
          />
        </span>
      </div>
      <div style="clear: both;"></div>
      <div class="page">{{total === 1 ? '' : `第 ${page + 1} / ${total} 页`}}</div>
    </div>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import FallibleImage from "@/components/FallibleImage/FallibleImage.vue";
import HeadTable from "./head-table.vue";
import HeadTableDiff from "./head-table-diff.vue";
import InTable from "./in-table.vue";
import OutTable from "./out-table.vue";

export default {
  mixins: [common],
  props: {
    name: String,
    signNo: String,
    signName: String,
    date: String,
    digits: Object,
    LogBabyNum: Object,
    inList: Array,
    outList: Array,
    index: Number,
    page: Number,
    total: Number
  },
  data() {
    return {
      env: ['beihairenyi'].includes(process.env.HOSPITAL_ID)
    };
  },
  components: {
    FallibleImage,
    HeadTable,
    InTable,
    OutTable,
    HeadTableDiff
  }
};
</script>

<style lang="stylus" scoped>
  .paper
    >>>table
      width 100%

      td, th
        border 1px solid black
        text-align center
        vertical-align middle
        height 30px
        font-size 13px
        line-height 24px

      thead
        background #f4f2f5

    >>>.table-top,
    >>>.table-bottom
      td:first-child,
      th:first-child
        border-left none

      td:last-child,
      th:last-child
        border-right none

      tr:first-child > td,
      tr:first-child > th
        border-top none

      tr:last-child > td
        border-bottom none

  .paper
    position relative
    margin 0 auto 20px
    padding 12px 20px
    width 1080px
    border-radius 2px
    background #fff
    box-shadow 0 5px 10px 0 rgba(0, 0, 0, 0.5)
    box-sizing border-box

    &.printing
      margin 0
      padding 0
      box-shadow none

  .head
    position: relative

    .logo
      position absolute
      left 0
      top 0
      height 44px

    .title
      padding-top 15px
      font-size 22px
      text-align center

    .sub-title
      margin-top 10px
      text-align center

    .details
      margin-top 10px
      font-size 13px
      overflow hidden

      .left
        float left

      .right
        float right

  .table-wrapper
    margin-top 8px

  .foot
    position relative
    margin-top 15px

    .sign
      float right
      font-size 13px

      span
        display inline-block

      .title
        vertical-align middle

      .content
        min-width 60px
        vertical-align middle

      .sign-img
        display none
        width 52px
        vertical-align middle
        max-height 25px

    .page
      position absolute
      top 0
      left 0
      width 100%
      text-align center
      font-size 12px
      font-family SimSun
</style>
