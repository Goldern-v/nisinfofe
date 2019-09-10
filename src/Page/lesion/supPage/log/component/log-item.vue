<template>
  <div class="contain" flex="main:justify" @click="openDetail">
    <i class="type-1" v-if="data.nursingClass == '特级护理'"></i>
    <i class="type-2" v-else-if="data.nursingClass == '一级护理'"></i>
    <i class="type-3" v-else-if="data.nursingClass == '二级护理'"></i>
    <i class="type-4" v-else></i>
    <span>{{data.name}}</span>
    <span>({{data.bedLabel}}床)</span>
  </div>
</template>
<style lang="stylus" scoped>
.contain {
  background: #FFFFFF;
  margin-top: 8px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 3px;
  position: relative;
  padding: 10px 7px;
  cursor: pointer;

  &:hover {
    background: #f7f7fa;
  }

  span {
    font-size: 12px;
    color: #333333;
    height: 17px;
    line-height: 17px;
  }

  i {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;

    &.type-1 {
      background: #FD815A;
    }

    &.type-2 {
      background: #5EC199;
    }

    &.type-3 {
      background: #A9BCB4;
    }

    &.type-4 {
      background: #DB83D7;
    }
  }
}
</style>
<script>
import qs from "qs";
import { info } from "@/api/task";
export default {
  props: {
    data: Object
  },
  methods: {
    async openDetail() {
      let res = await info(this.data.patientId, this.data.visitId);
      for (let index in res.data.data) {
        if (!res.data.data[index]) {
          res.data.data[index] = "";
        }
      }
      window.open(
        `/crNursing/home?${qs.stringify({
          patientId: res.data.data.patientId,
          visitId: res.data.data.visitId
        })}`
      );
    }
  }
};
</script>
