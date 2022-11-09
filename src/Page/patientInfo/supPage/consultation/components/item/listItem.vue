<template>
  <div>
    <div
		v-if="data.planDate != undefined"
      class="card_item"
      v-touch-ripple
      :class="{ active: clickIndex == data.id }"
    >
      <span class="card_item-title">{{ data.conGoal }}</span>
      <div class="card_item-date">
        {{ data.planDate || data.consultationTime }}
      </div>
      <span
        class="card_item-tag"
        :class="{
          done: data.status == '完成',
          hold: data.status == '暂存',
          apply: data.status == '申请确认',
          wait: data.status == '等待确认',
        }"
        >{{ data.status }}</span
      >
    </div>
		<div
			v-else
      class="card_item"
      v-touch-ripple
      :class="{ active: clickIndex == data.consultationId }"
    >
      <span class="card_item-title">{{ data.consultationName || '护理会诊单' }}</span>
      <div class="card_item-date">{{ data.consultationTime }}</div>
      <span class="card_item-tag" :class="filterClass(data.status)">{{
        data.status | filterText
      }}</span>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.card_item {
  font-size: 13px;
  color: #687179;
  padding: 11px 14px 11px 14px;
  margin-bottom: 10px;
  border: 1px solid #E4E8EB;
  border-radius: 2px;
  box-sizing: border-box;
  height: 65px;
  position: relative;
  cursor: pointer;

  &.active {
    background: #F2F2F2;
  }

  &-title {
    font-size: 13px;
    color: #687179;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    padding-right: 80px;
  }

  &-date {
    font-size: 12px;
    color: #999999;
    line-height: 36px;
  }

  &-tag {
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    padding: 2px 10px;
    height: 18px;
    line-height: 19px;
    position: absolute;
    right: 15px;
    top: 10px;

    &.done {
      // 完成
      background: #4BB08D;
    }

    &.hold {
      // 暂存
      background: #6CA8D7;
    }

    &.apply {
      // 申请确认
      background: #FD815A;
    }

    &.wait {
      // 等待确认
      background: #FD943A;
    }

		&.unaudited {
      background: rgb(73, 164, 234);
    }

    &.audit {
      background: rgb(239, 153, 77);
    }

    &.reject {
      background: #ff4949;
    }

    &.cancel {
      background: #687179;
    }

    &.archived {
      background: rgb(94, 157, 70);
    }
  }
}
</style>
<script>
import { STATUS_LIST } from "../../enums";

export default {
  props: {
    data: Object,
    clickIndex: [Number, String],
  },
  data() {
    return {};
  },
	filters: {
    filterText(status) {
      return STATUS_LIST.find((v) => v.key == status).label || "";
    },
  },
  components: {},
  methods: {
    filterClass(status) {
      return STATUS_LIST.find((v) => v.key == status).className || "";
    },
  },
};
</script>
