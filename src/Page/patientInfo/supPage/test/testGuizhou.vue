<template>
  <div>
    <div class="content">
      <div class="left-part">
        <div class="body" :style="{ height: height }">
          <div
            class="item"
            v-for="item in listByFilter"
            :key="item.applyFlow"
            @click="toRight(item)"
            :class="{ active: item.applyFlow == rightData.applyFlow }"
          >
            <div class="title">{{ item.reportName }}</div>
            <div class="aside">{{ item.publishDate }}</div>

          </div>
          <div class="null-con" v-show="listByFilter.length == 0">
            <img src="../../../../common/images/task/nondata.png" alt="" />
            <p>没有相关检验数据～</p>
          </div>
        </div>
      </div>
      <div class="right-part">
        <testForm
          ref="testForm"
        ></testForm>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px 20px;
}
.left-part
  float left
  width 36%
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  .header
    padding 0 16px
    background: #F7FAFA;
    height 65px
    border-bottom 1px solid #EAEEF1;
    .title
      font-size: 13px;
      color: #333333;
      line-height 16px
      font-weight bold
  .body
    padding 20px
    background #fff
    overflow auto
    .item
      padding 11px 14px 11px 14px
      margin-bottom 10px
      border: 1px solid #E4E8EB;
      border-radius: 2px;
      position relative
      cursor pointer
      &.active
        background: #F2F2F2;
      .title
        font-size: 13px;
        line-height 20px
        color: #687179;
        margin-right 50px
      .aside
        font-size: 12px;
        color: #999999;
        margin-top 10px
      .result
        position absolute
        top 8px
        right 10px
        font-size: 13px;
        color: #E72C2C;
        img
          height 22px
.right-part
  float right
  width 63%
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
.null-con
  img
    display block
    margin 20% auto 20px
    width 120px
  p
    text-align center
    font-size: 13px;
		color: #666;
</style>

<script>
import testForm from "./component/testFormGuizhou.vue";
import { getTestList } from "@/api/patientInfo";
export default {
  data() {
    return {
      list: [],
      rightData: "",
      value: "全部"
    };
  },
  computed: {
    infoData() {
      return this.$route.query;
    },
    listByFilter() {
      return this.list.filter(item => {
        if (this.value == "全部") return true;
        return item.specimen == this.value;
      });
    },
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 190}px`;
    }
  },
  created() {
    getTestList(this.infoData.patientId, this.infoData.visitId).then(res => {
      this.list = res.data.data;
      this.toRight(this.list[0]);
    });
  },
  methods: {
    toRight(data) {
      console.log("data", data);
      this.rightData = data;
      this.$nextTick(() => {
        this.$refs.testForm && this.$refs.testForm.open(data);
      });
    }
  },
  components: {
    testForm,
  }
};
</script>
