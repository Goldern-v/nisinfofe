<template>
  <div class="contain" v-loading="pageLoading">
    <div class="dd-box">
      <div class="head-con" flex="cross:center">
        <whiteButton text="返回" icon="icon-fanhui-" iconSize="14" @click="goBack"></whiteButton>
        <whiteButton
          text="编辑"
          icon="icon-bianji1"
          iconSize="12"
          @click="openselectDiagnosis"
          v-if="object.status != 2"
        ></whiteButton>
        <whiteButton
          text="停止"
          icon="icon-tingzhi"
          iconSize="12"
          v-if="object.status != 2"
          @click="stopDiagnosis"
        ></whiteButton>
      </div>
      <div class="body-con" :style="{height: boxHeight}">
        <div class="title-con">
          <div class="title">{{title != ''?title:'加载中...'}}</div>
          <div class="aside">相关因素：{{object.diagElement}}</div>
          <div class="aside">
            {{object.beginTime}}&nbsp;&nbsp;{{object.creatorName}}创建
            <span
              v-if="object.endTime"
            >,最终由{{object.operatorName}}停止于{{object.endTime}}</span>
          </div>
        </div>
        <div class="details-con" flex="cross:stretch">
          <div class="left-part">
            <div class="text-box">
              <div class="box-title">护理措施</div>
              <div class="box-text">
                <div v-for="(item, index) in measures" :key="item.code">{{index + 1}}，{{item.name}}</div>
              </div>
            </div>

            <div class="text-box">
              <div class="box-title">护理目标</div>
              <div class="box-text">{{target}}</div>
            </div>

            <div class="text-box">
              <div class="box-title">护理评价</div>
              <div class="box-text">
                {{object.evalType}}
                {{object.evalContent}}
              </div>
            </div>
          </div>
          <div class="right-part" flex-box="1">
            <div class="box-title">护理执行</div>
            <timeLine :data="object"></timeLine>
          </div>
        </div>
      </div>
    </div>
    <!-- <stopDiagnosis :data="object" ref="stopDiagnosis"></stopDiagnosis> -->
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 20px 20px 0
  .dd-box
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px
    .head-con
      height 50px
      background: #F8F8F8;
      border-bottom 1px solid #CBD5DD
      padding 0 14px
    .body-con
      overflow auto
      .title-con
        padding 30px 16px 20px
        border-bottom: 2px solid #EAEEF1;
        .title
          font-size: 18px;
          color: #333333;
          margin-bottom 10px
        .aside
          font-size: 13px;
          color: #687179;
          margin-bottom 10px
          letter-spacing: 0.26px;
    .details-con
      min-height 100%
      .left-part
        width 700px
        border-right: 1px solid #EAEEF1;
        min-height 100%
        .text-box
          padding 25px
          border-bottom: 1px solid #EAEEF1;
          &:last-child
            border 0
.box-title
  height 12px
  padding-left 14px
  border-left 4px solid #4BB08D;
  font-size: 13px;
  color: #333333;
  letter-spacing: 0.26px;
  margin-bottom 10px
.box-text
  font-size: 13px;
  color: #687179;
  letter-spacing: 0.26px;
  line-height: 25px;
.right-part
  padding 28px 30px
  box-sizing border-box
</style>
<script>
import whiteButton from "../../../../../components/button/white-button";
import timeLine from "../components/time-line";
import { view } from "@/api/home";
// import stopDiagnosis from '../modal/stop-diagnosis'
import BusFactory from "vue-happy-bus";
export default {
  data() {
    return {
      measures: {},
      target: "",
      bus: BusFactory(this),
      object: {},
      pageLoading: false
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    boxHeight() {
      return this.wih - 203 + "px";
    },
    disable() {
      return this.object.status == 2;
    },
    title() {
      let label = this.disable ? "P" : "P";
      return (
        (this.disable ? "【已停止】" : "") +
        `${this.object.seqNo ? label : ""}${this.object.seqNo || ""}${
          this.object.seqNo ? "：" : ""
        }${this.object.diagName || ""}`
      );
    }
  },
  methods: {
    goBack() {
      // this.$router.push({path: '/diagnosis',query: this.$route.query})
      this.$router.back();
    },
    openselectDiagnosis() {
      window.openselectDiagnosis(
        Object.assign({}, this.object, {
          measures: this.measures,
          isEdit: true
        })
      );
    },
    getData() {
      this.pageLoading = true;
      view(this.$route.params.id).then(res => {
        this.measures = res.data.data.measures;
        this.target = res.data.data.target;
        this.object = res.data.data.object;
        this.pageLoading = false;
      });
    },
    stopDiagnosis() {
      this.$refs.stopDiagnosis.open();
    },
    refresh() {
      this.getData();
    }
  },
  mounted() {
    this.bus.$on("refreshCarePlan", this.refresh);
  },
  created() {
    this.getData();
  },
  components: {
    whiteButton,
    timeLine
  }
};
</script>
