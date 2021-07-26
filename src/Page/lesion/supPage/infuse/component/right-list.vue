<template>
  <div class="right-list">
    <div class="list-con">
      <div class="list-box">
        <div class="head-con" flex="cross:center">输液提醒</div>
        <div class="scroll-con">
          <div class="item-con" flex="cross:center" v-for="item in message" :key="item.id">
            <div class="ovt">{{item.message}}</div>
          </div>
        </div>
      </div>
      <div class="list-box">
        <div class="head-con" flex="cross:center">患者呼叫</div>
        <div class="scroll-con">
          <div class="item-con" flex="cross:center" v-for="item in call" :key="item.id">
            <div class="ovt">{{item.message}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.right-list {
  position: relative;
  background: #F8F8F8;

  .list-con {
    height: 100%;
    background: #fff;

    .list-box {
      height: 50%;
      position: relative;
      padding-top: 44px;
      box-sizing: border-box;

      .head-con {
        height: 42px;
        border-top: 1px solid #CBD5DD;
        border-bottom: 1px solid #ECEEEF;
        background: #F7FAFA;
        padding: 0 20px;
        font-size: 13px;
        color: #333333;
        letter-spacing: -0.31px;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }

      .scroll-con {
        height: 100%;
        overflow: auto;

        .item-con {
          height: 36px;
          border-bottom: 1px solid #EAEEF1;
          font-size: 13px;
          color: #687179;
          letter-spacing: -0.31px;
          padding: 0 12px;

          .ovt {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>

<script>
import { getNotice } from "@/api/whiteBoard";
export default {
  data() {
    return {
      message: [],
      call: []
    };
  },
  methods: {
    getData() {
      if (this.deptCode) {
        getNotice(this.deptCode).then(res => {
          this.message = res.data.data.data.message;
          this.call = res.data.data.data.call;
        });
      }
    }
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    }
  },
  created() {
    this.getData();
  },
  watch: {
    deptCode() {
      this.getData();
    }
  },
  components: {}
};
</script>
