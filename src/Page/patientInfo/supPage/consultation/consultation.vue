<template>
  <section class="consultation">
    <component :is="newDialogCon" ref="newDialogConRef" />
    <section class="card" :style="{ height: height }">
      <div class="card_title">
        <h4 class="card_title-desc">护理会诊记录</h4>
        <button class="card_title-add" @click="$refs.newDialogConRef.open()">
          <i class="iconfont icon-guanbi"></i>新建会诊
        </button>
      </div>
      <div class="card_wrap" :style="{ height: scrollHeight }">
        <div class="card_noitem" v-if="!list.length">
          <img :src="require('@/common/images/task/nondata.png')" alt="" />
          <span>暂无护理会诊记录～</span>
        </div>
        <!-- 动态生成 -->
        <span @click="toDetail(item)" v-for="item in list" :key="item.id">
          <listItem :data="item" :clickIndex="clickIndex" />
        </span>
      </div>
    </section>
    <section class="form" :style="{ height: height }" v-show="clickIndex">
      <component :is="detailCon" ref="consultationForm"></component>
    </section>
  </section>
</template>


<script>
import newFormDialog from "./components/newFormDialog";
import consultationForm from "./components/consultationForm";
import consultationFormZhzxy from "./components/consultationFormZhzxy";
import consultationFormBeiHai from "./components/consultationFormBeiHai";
import { getPatientList, getPatientListNew } from "@/api/consultation";
import listItem from "./components/item/listItem.vue";
import BusFactory from "vue-happy-bus";
import newFormDialogZhzxy from "./components/newFormDialogZhzxy.vue";
import newFormDialogBeiHai from "./components/newFormDialogBeiHai.vue";
export default {
  data() {
    return {
      formVisible: false,
      list: [],
      selectItem: {},
      clickIndex: 0,
      bus: BusFactory(this),
      // 是否新版会诊
      isNewType: ["beihairenyi", "zhzxy","whhk"].includes(this.HOSPITAL_ID),
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 150}px`;
    },
    scrollHeight() {
      return `${this.wih - 186}px`;
    },
		// 新增弹窗
    newDialogCon() {
      if (this.isNewType) {
        if (['beihairenyi'].includes(this.HOSPITAL_ID)) {
          return 'newFormDialogBeiHai';
        }
        return "newFormDialogZhzxy";
      } else {
        return "newFormDialog";
      }
    },
		// 详情
		detailCon() {
      if (this.isNewType) {
        if (['beihairenyi'].includes(this.HOSPITAL_ID)) {
          return 'consultationFormBeiHai';
        }
        return "consultationFormZhzxy";
      } else {
        return "consultationForm";
      }
		}
  },
  mounted() {
    this.getData().then((res) => {
      if (res[0]) {
        this.toDetail(res[0]);
      }
    });
    // 刷新会诊列表
    this.bus.$on("consultationListRefresh", (type) => {
      if (type == 'del') {
        this.clickIndex = ''
      }
      this.getData();
    });
  },
  methods: {
    toDetail(item) {
      this.clickIndex = item.id || item.consultationId || '';
      this.clickIndex && this.$refs.consultationForm.open(item);
    },
    getData() {
      if (this.isNewType) {
        return getPatientListNew(this.$route.query.patientId).then((res) => {
          this.list = res.data.data || [];
          return this.list;
        });
      } else {
        return getPatientList(
          this.$route.query.patientId,
          this.$route.query.visitId
        ).then((res) => {
          this.list = res.data.data;
          return this.list;
        });
      }
    },
  },
  components: {
    newFormDialog,
    newFormDialogZhzxy,
    consultationForm,
    consultationFormZhzxy,
    newFormDialogBeiHai,
    consultationFormBeiHai,
    listItem,
  },
};
</script>


<style lang="scss" scoped>
.consultation {
  margin: 20px 20px; // display: flex;
  // justify-content: space-between;
}
.card {
  background: #fff;
  border: 1px solid #cbd5dd;
  border-radius: 2px; // height: 300px;
  width: 36%;
  float: left;
  &_title {
    overflow: hidden;
    background: #f7fafa;
    height: 35px;
    padding: 0 4%;
    color: #333;
    border-bottom: 1px solid #eaeef1;
    &-desc {
      display: inline;
      font-family: "PingFangSC-Medium";
      font-size: 13px;
      font-weight: bold;
      color: #333;
      letter-spacing: 0;
      line-height: 35px;
    }
    &-add {
      float: right;
      border: none;
      background: transparent;
      outline: none;
      cursor: pointer;
      font-size: 1px;
      color: #687179;
      i {
        display: inline-block;
        font-size: 12px;
        line-height: 35px;
        transform: rotate(45deg);
        margin-right: 4px;
      }
    }
  }
  &_wrap {
    padding: 20px;
    overflow-y: auto;
    box-sizing: border-box;
    position: relative;
    .card_noitem {
      width: 100%;
      height: 100%;
      img,
      span {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
      }
      img {
        width: 140px;
        height: 140px;
        top: 180px;
      }
      span {
        top: 340px;
        display: inline-block;
        font-size: 13px;
        color: #cbd5dd;
      }
    }
  }
}
.form {
  float: right;
  width: 63%;
  background: #f7fafa;
  border: 1px solid #cbd5dd;
  border-radius: 2px;
  padding: 20px;
  overflow: auto;
  box-sizing: border-box;
  position: relative;
}
</style>
