<template>
<div class="bed-card-wrapper">

  <div class="bed-modal-ctx" v-for="v in lens" :key="v">
    <div>床&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{ query.bedLabel }}</div>
    <div>住&nbsp;&nbsp;院&nbsp;号：{{ query.inpNo }}</div>
    <div>产妇姓名：{{ query.expand1 }}</div>
    <div>宝宝性别：{{ query.sex }}</div>
    <div class="pos-a">
      <div>{{ formData.weight ? formData.weight + 'g' : ' ' }}</div>
      <div>{{ query.birthday }}</div>
    </div>
  </div>
</div>
</template>
<style lang='scss' scoped>
.bed-modal-ctx {
  position: relative;
  page-break-after: always;
  width: 110mm;
  height: 69mm;
  padding: 15px;
  box-sizing: border-box;
  text-align: left;
  border: 2px solid #fff;
  border-radius: 12px;

  * {
    font-size: 36px;
    line-height: 56px;
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
  .pos-a {
    position: absolute;
    bottom: 15px;
    right: 15px;
    > div {
      font-size: 18px;
      line-height: 28px;
    }
  }
}
</style>
<script>
import { formatAsStr } from '@/utils/date';

// 床头卡内容部分
export default {
  props: {
    isPrint: Boolean,
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
    lens() {
      return this.isPrint ? [1,2]: [1]
    }
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
