<template>
  <div class="bed-modal-ctx bed-card-wrapper">
    <div>床号：{{ query.bedLabel }}</div>
    <div>姓名：{{ query.name }}</div>
    <div>住院号：{{ query.inpNo }}</div>
    <div>性别：{{ query.sex }}</div>
    <div>年龄：{{ query.age }}</div>
    <div class="flex">
      过敏史：
      <input
        type="text"
        class="bottom-line"
        :value="guominshi"
        @input="onIptGms"
      />
    </div>
    <div>主管医生：{{ formData.mainDoctors }}
      <!-- <input
        type="text"
        class="bottom-line"
        :value="formData.mainDoctors"
        @input="onIptFormData($event, 'mainDoctors')"
      /> -->
    </div>
    <div>入院日期：{{ query.admissionDate | formatAsStr }}</div>
    <img class="qr-code" :src="qrCode" />
  </div>
</template>
<style lang='scss' scoped>
.bed-modal-ctx {
  position: relative;
  width: 150mm;
  height: 215mm;
  padding: 15px;
  box-sizing: border-box;
  text-align: left;

  * {
    font-size: 40px;
    line-height: 49px;
  }
  >div {
    padding: 23px 0;
  }
  .bottom-line {
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
  }
  .flex {
    display: flex;
    white-space: nowrap;
    .bottom-line {
      flex: 1;
      width: 0px;
    }
  }
  .qr-code {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    width: 150px;
    height: auto;
  }
}
</style>
<script>
import { formatAsStr } from '@/utils/date';

// 床头卡内容部分
export default {
  props: {
    qrCode: {
      type: String,
      default: '',
    },
    // 过敏史
    guominshi: {
      type: String,
      default: '',
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    query() {
      return this.$route.query;
    },
  },
  methods: {
    onIptGms(e) {
      this.$emit('update:guominshi', e.target.value);
    },
    onIptFormData(e, text) {
      this.$emit('update:formData', { ...this.formData, [text]: e.target.value})
    }
  },
  filters: {
    formatAsStr,
  },
  components: {},
};
</script>
