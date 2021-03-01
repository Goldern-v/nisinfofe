<template>
  <div class="patient-info-slide">
    <div class="no-do-bg" v-show="show" @click="close"></div>
    <transition name="el-zoom-in-left">
      <div class="slide-con" v-show="show">
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">体温录入</span>
          <!-- <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>-->
        </div>

        <div class="list-con">
          <div class="item-box" v-if="HOSPITAL_ID == 'huadu'">
            <img
              src="../../../../Page/sheet-page/components/sheet-tool/images/检验报告@2x.png"
              alt
              class="label-icon"
            />
            <div class="label">体温录入</div>
            <el-button @click="openModal('sheet')">查看</el-button>
          </div>
        </div>

        <sweet-modal ref="modalName" title="体温录入" class="modal-con">
          <singleTemperatureChart class="sheet-con"></singleTemperatureChart>
        </sweet-modal>
      </div>
    </transition>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box {
  .el-checkbox__label {
    font-size: 12px;
    color: #687179;
    white-space: normal;
  }

  textarea {
    font-size: 12px;
    color: #687179;
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.no-do-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.slide-con {
  width: 230px;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 101px;
  bottom: 0;
  right: 0;
  background: #fff;
  box-shadow: -3px 2px 5px 0px rgba(0, 0, 0, 0.08);
  z-index: 1;
  background: #fff;
}

.head-con {
  height: 38px;
  background: #F7FAFA;
  border-bottom: 1px solid #EAEEF1;
  padding: 0 10px 0 20px;

  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }

  .close-btn {
    font-size: 12px;
    padding: 10px 10px;
    cursor: pointer;
  }
}

.list-con {
  padding: 12px;

  .item-box {
    height: 45px;
    background: rgba(248, 248, 248, 1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .label-icon {
      width: 16px;
      height: 16px;
      margin-left: 12px;
      margin-right: 11px;
    }

    .label {
      flex: 1;
      color: #6E767E;
      font-size: 13px;
    }

    >>>.el-button {
      border-radius: 3px;
      padding: 6px 12px;
      margin-right: 6px;
      font-size: 12px;

      &:hover {
        color: #fff;
        border-color: #4CB08D;
        background: #4CB08D;
      }
    }

    &:hover {
      .label {
        color: #333333;
        font-weight: bold;
      }
    }
  }
}

.modal-con
  >>>.sweet-content
    max-height 80vh
  >>>.content
    overflow hidden
    margin: 0 0 10px
  >>>.sweet-content
    background #F0f0f0
  .sheet-con{
    width :100% !important;
    transform :scale(1)
  }
</style>

<script>
import bus from "vue-happy-bus";
import singleTemperatureChart from "./singleTemperatureChart";
export default {
  data() {
    return {
      bus: bus(this),
      show: false
    };
  },
  computed: {},
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
      this.$emit("onClose");
    },
    toggle() {
      this.show = !this.show;
    },
    openModal(name) {
      this.$refs.modalName.open();
    }
  },
  created() {},
  mounted() {},
  watch: {},
  components: {
    singleTemperatureChart
  }
};
</script>
