<template>
  <div class="top-part" flex="main:justify">
    <div class="top-box" flex-box="1">
      <div class="head-con">
        <div class="title">住院天数</div>
      </div>
      <div class="body-con">
        <div class="value">{{ info.inpDay }}</div>
        <div class="aside">days</div>
      </div>
    </div>
    <div class="top-box" flex-box="1">
      <div class="head-con">
        <div class="title">药比</div>
        <div class="warning" v-show="Number(DrugFeePercent) > 30">
          超出质控值
        </div>
      </div>
      <div class="body-con">
        <div class="value">{{ DrugFeePercent || "--" }}%</div>
        <div class="aside">percent</div>
        <i
          class="iconfont icon-chaochu"
          v-show="Number(DrugFeePercent) > 30"
        ></i>
        <!-- <i class="iconfont icon-guodi"></i> -->
      </div>
    </div>
    <div class="top-box" flex-box="1">
      <div class="head-con">
        <div class="title">住院费用</div>
        <!-- <div class="warning">31,032.09</div> -->
      </div>
      <div class="body-con">
        <div class="value">{{ total | toMoney }}</div>
        <div class="aside">RMB</div>
        <!-- <i class="iconfont icon-chaochu"></i> -->
        <!-- <i class="iconfont icon-guodi"></i> -->
      </div>
    </div>
    <div class="top-box" flex-box="1">
      <div class="head-con">
        <div class="title">预交金</div>
        <div class="warning" v-show="Number(prePay) - Number(total) < 0">
          余额不足
        </div>
      </div>
      <div class="body-con">
        <div class="value">{{ prePay | toMoney }}</div>
        <div class="aside">RMB</div>
        <i
          class="iconfont icon-guodi"
          v-show="Number(prePay) - Number(total) < 0"
        ></i>
      </div>
    </div>
    <div class="top-box" flex-box="1">
      <div class="head-con">
        <div class="title">剩余余额</div>
      </div>
      <div class="body-con">
        <div class="value">{{ needPay | toMoney }}</div>
        <div class="aside">RMB</div>
      </div>
    </div>

    <div class="top-box" flex-box="1">
      <div class="head-con">
        <div :class="['title',HOSPITAL_ID=='huadu'?'gm':'']">过敏</div>
        <img
          src="../images/分组.png"
          alt
          class="warning-img"
          v-if="info.drugGms || info.allergy1 || info.allergy2"
        />
      </div>
      <div class="body-con">
        <div :class="['text',HOSPITAL_ID=='huadu'?'gm':'']">
          <span v-if="info.allergy1"> {{ info.allergy1 }}; </span>
          <span v-if="info.drugGms">{{ info.drugGms }}; </span>
          <span v-if="info.allergy2">{{ info.allergy2 }} </span>
          <span v-if="!(info.allergy1||info.drugGms||info.allergy2)">--</span>
        </div>
      </div>
    </div>

    <div class="top-box" flex-box="1">
      <div class="head-con">
        <div class="title">隔离</div>
        <img
          src="../images/分组.png"
          alt
          class="warning-img"
          v-if="info.glFlag"
        />
      </div>
      <div class="body-con">
        <div class="text">{{ info.glFlag || "--" }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.top-part
  .top-box
    height 135px
    background: #FFFFFF;
    margin 0 8px 15px
    border-top 4px solid #E7EAEC
    width 0
    &:first-child
      margin-left 0
    &:last-child
      margin-right 0
    .head-con
      height 40px
      border-bottom: 1px solid #E7EAEC;
      position relative
      .title
        position absolute
        left 15px
        top 12px
        font-size: 14px;
        color: #687179;
        font-weight bold
      .gm
        color red
      .warning
        background: #ED5566;
        border-radius: 2px;
        position absolute
        top 12px
        right 12px
        padding 2px 4px
        font-size: 12px;
        color: #FFFFFF;
        list-style 14px
      .warning-img
        position absolute
        top 12px
        right 12px
    .body-con
      height 88px
      position relative
      overflow hidden
      .value
        color: #687179;
        font-weight lighter
        margin: 16px 4px 14px;
        font-size: 26px;
        text-align: center;
        font-family: sans-serif!important;
      .aside
        font-size: 16px;
        color: #687179;
        margin 0 16px
        text-align: center;
        font-family: sans-serif!important;
      i
        position absolute
        right 16px
        bottom 16px
        font-size 14px
      .icon-chaochu
        color #ED5566;
      .icon-guodi
        color #F8AC59
      .text
        margin: 16px 14px 4px;
        font-size 18px
        color #66717B
        font-weight bold
      .text.gm
        color red
</style>
<style lang="stylus" scoped>
@media screen and (max-width: 1100px) {
  /deep/.top-box {
    margin: 0 2px 15px!important;
  }
  /deep/.value{
        font-size: 20px!important;
      }
}
@media screen and (min-width: 1100px) {
  /deep/.value{
        font-size: 22px!important;
      }
}
@media screen and (min-width: 1300px) {
  /deep/.value{
        font-size: 28px!important;
      }
}
</style>

<script>
import { getDrugFeePercent, getFeeDetail } from "@/api/patientInfo";
import commonMixin from "../../../../../../common/mixin/common.mixin";
export default {
  mixins: [commonMixin],
  data() {
    return {
      DrugFeePercent: "",
      total: "",
      prePay: "",
      needPay: ""
    };
  },
  computed: {
    info() {
      return this.$route.query;
    }
  },
  methods: {},
  created() {
    getDrugFeePercent(
      this.info.wardCode,
      this.info.patientId,
      this.info.visitId
    ).then(res => {
      this.DrugFeePercent = res.data.data.percent;
    });
      getFeeDetail(
        this.info.wardCode,
        this.info.patientId,
        this.info.visitId
      ).then(res => {
        this.total = res.data.data.total;
        this.prePay = res.data.data.prePay;
        this.needPay = res.data.data.needPay
      });
  },
  components: {}
};
</script>
