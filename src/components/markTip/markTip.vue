<template>
  <div>
    <div
      class="markTip"
      :class="`mark-row-status-${data.status}`"
      :style="{left: left + 'px', top: top + 'px'}"
      v-show="show"
      @mouseover="show = true"
      @mouseout="show = false"
    >
      <div class="desc-con">
        <div class="title">{{data.qualityIndex}}</div>
        <div class="text">{{data.content}}</div>
      </div>
      <div class="footer-con" flex="cross:center">
        <div style="margin-right: 10px" class="btn-con" @click="handle" v-show="data.status == '0'">
          <img src="./images/处理批注.png" alt />
          <span>处理标注</span>
        </div>
        <div class="btn-con" @click="audit" v-show="data.status == '1'">
          <img src="./images/审核批注.png" alt />
          <span>审核批注</span>
        </div>
        <div flex-box="1"></div>
        <div class="name">
          处:{{data.handlerName}}
          <span>&nbsp;&nbsp;</span>
          创:{{data.creatorName}}
        </div>
      </div>
      <div class="close-btn" title="删除批注" @click="del" v-show="data.status == '0'">
        <img src="./images/关 闭.png" alt />
      </div>
      <img src="./images/待处理.png" alt class="status-img" v-show="data.status == '0'" />
      <img src="./images/待审核.png" alt class="status-img" v-show="data.status == '1'" />
    </div>
    <signModal ref="signModal" title="输入账号账号密码处理批注"></signModal>
    <auditModal ref="auditModal"></auditModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.markTip
  z-index 99999
  position fixed
  width 240px
  border-top 4px solid #D0C44F
  background: #FFFFFF;
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.16);
  border-radius: 4px;
  &.mark-row-status-0
    border-color: rgba(185, 89, 255, .8)
  &.mark-row-status-1
    border-color: #D0C44F
  &.mark-row-1
    border-color: rgba(185, 89, 255, .8)
  &.mark-row-2
    border-color: rgba(48, 163, 255, .8)
  &.mark-row-3
    border-color: rgba(162, 131, 94, .8)
  &.mark-row-4
    border-color: rgba(208, 196, 79, .8)
  &.mark-row-5
    border-color: rgba(80, 208, 101, .8)
.desc-con
  min-height 100px
  box-sizing border-box
  padding 10px 12px
  .title
    font-size: 13px;
    color: #333333;
    margin-bottom 8px
    font-weight bold
  .text
    font-size: 12px;
    color: #333333;
    line-height 17px
.footer-con
  border-top: 1px solid #EAEEF1;
  padding 0 5px
  height 30px
.btn-con
  font-size: 12px;
  color: #6083B4;
  display flex
  align-items center
  cursor pointer
  img
    margin 0 2px
  &:hover
    color: #284FC2
.name
  font-size 12px
  color #666
.close-btn
  position absolute
  top 10px
  right 15px
  cursor pointer
  overflow hidden
  &:hover
    img
      transform: translateY(-20px);
      filter: drop-shadow(#000 0 20px)
.status-img
  position absolute
  top 30px
  right 30px
</style>

<script>
import signModal from "@/components/modal/sign.vue";
import $ from "jquery";
import common from "@/common/mixin/common.mixin";
import auditModal from "./modal/audit-modal";
export default {
  mixins: [common],
  data() {
    return {
      show: false,
      left: 0,
      top: 0,
      data: {},
      td: {},
      handlepz: null,
      delpz: null,
      auditpz: null,
      callback: null
    };
  },
  methods: {
    open(config) {
      console.log("批注开窗config", config);
      this.top = config.style.top;
      this.left = config.style.left;
      this.data = config.data;
      this.td = config.td;
      this.show = true;
      this.handlepz = config.fun.handlepz;
      this.delpz = config.fun.delpz;
      this.auditpz = config.fun.auditpz;
      this.callback = config.fun.callback;
    },
    close() {
      this.show = false;
    },
    attachWindow() {
      window.openMarkTip = config => {
        this.open(config);
      };
      window.closeMarkTip = () => {
        this.close();
      };
    },
    handle() {
      this.middleware(
        this.isHandler,
        (password, empNo) => {
          this.handlepz(password, empNo, this.data.id).then(res => {
            this.$message.success("批注处理成功");
            $(".red-border").removeClass("red-border");
            if (this.td instanceof Array) {
              this.td.find(item => item.key == "markObj").value.status = "1";
            } else {
              this.td.markObj.status = "1";
            }
            if (this.callback) {
              this.callback(this.td,'handle');
            }
          });
        },
        "你确定处理该标注吗"
      );
    },
    audit() {
      this.middleware(
        this.isCreator,
        (password, empNo) => {
          this.$refs.auditModal.open((reject, content) => {
            this.auditpz(password, empNo, this.data.id, reject, content).then(
              res => {
                this.$message.success("批注审核成功");
                if (this.callback) {
                   this.callback(JSON.parse(JSON.stringify(this.td)),'audit',res.data.data.status);
                }
                if (res.data.data.status == "0") {
                  if (this.td instanceof Array) {
                    this.td.find(item => item.key == "markObj").value.status =
                      "0";
                    this.td.find(item => item.key == "markObj").value.content =
                      res.data.data.content;
                  } else {
                    this.td.markObj.status = "0";
                    this.td.markObj.content = res.data.data.content;
                  }
                } else {
                  $(".red-border").removeClass("red-border");
                  if (this.td instanceof Array) {
                    this.td.find(item => item.key == "markObj").value = null;
                  } else {
                    this.td.markObj = null;
                  }
                }
              }
            );
          }, this.data.content);
        },
        "你确定审核该标注吗"
      );
    },
    del() {
      this.middleware(
        this.isCreator,
        (password, empNo) => {
          this.delpz(password, empNo, this.data.id).then(res => {
            this.$message.success("批注删除成功");
            $(".red-border").removeClass("red-border");
            if (this.callback) {
              this.callback(JSON.parse(JSON.stringify(this.td)),'delete');
            }
            if (this.td instanceof Array) {
              this.td.find(item => item.key == "markObj").value = null;
            } else {
              this.td.markObj = null;
            }
          });
        },
        "你确定删除该标注吗"
      );
    },
    middleware(power, todo, tip) {
      if (power) {
        this.$confirm(tip, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          todo();
        });
      } else {
        this.$refs.signModal.open((password, empNo) => {
          todo(password, empNo);
        });
      }
    }
  },
  computed: {
    /** 是创建人 护长 组长 */
    isCreator() {
      try {
        return (
          JSON.parse(localStorage.user).empNo === this.data.creatorNo ||
          this.role_auditor
        );
      } catch (error) {}
    },
    isHandler() {
      try {
        return (
          JSON.parse(localStorage.user).empNo === this.data.handlerNo ||
          this.role_auditor
        );
      } catch (error) {}
    }
  },
  mounted() {
    this.attachWindow();
  },
  components: {
    signModal,
    auditModal
  }
};
</script>
