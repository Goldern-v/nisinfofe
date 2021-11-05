<template>
  <div class="toggle-system">
    <div class="toggle-item reported">
      <div class="img">
        <img src="../../common/images/上报.png" alt="" />
      </div>
      <p>上报</p>
      <Button class="btn" @click="loginReportedSystem">进入</Button>
    </div>
    <div class="toggle-item audit">
      <div class="img">
        <img src="../../common/images/审核.png" alt="" />
      </div>
      <p>审核</p>
      <Button class="btn" @click="loginAuditSystem">进入</Button>
    </div>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //跳转不良事件上报系统
    loginReportedSystem() {
      this.$router.push("/index");
    },
    //跳转不良事件审核系统
    loginAuditSystem() {
      this.autoLoginAuditSystem();
    },
  },
};
</script>

<style lang="stylus" scoped>
.toggle-system {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);

  .toggle-item {
    width: 240px;
    height: 350px;
    border: 2px solid #999999;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.reported {
      margin-right: 60px;
    }

    .img {
      width: 160px;
      height: 160px;
      background: linear-gradient(180deg, #AAAAAA 0%, #666666 100%);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 50%;
      }
    }

    p {
      font-size: 24px;
      line-height: 34px;
      padding-top: 20px;
      padding-bottom: 10px;
    }

    button {
      width: 160px;
      height: 36px;
      background: #999999;
      border-radius: 10px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      line-height: 30px;
      border: none;
      cursor: pointer;
      outline: none;
    }

    &:hover {
      border-color: #1BB089;

      .img {
        background: linear-gradient(180deg, #1DB38B 0%, #008066 100%);
      }

      p {
        color: #1BB089;
      }

      button {
        background: #1BB089;
      }
    }

    &:active {
      border-color: #1BB089;

      .img {
        background: linear-gradient(180deg, #1DB38B 0%, #008066 100%);
      }

      p {
        color: #1BB089;
      }

      button {
        background: #0B9474;
      }
    }
  }
}
</style>
