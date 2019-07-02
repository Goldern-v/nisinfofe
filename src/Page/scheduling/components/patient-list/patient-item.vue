<template>
  <div
    class="patient-box"
    flex="cross:center"
    :key="item.patientId"
    :class="{active: dataModel.selectedPatientId == item.patientId}"
    draggable="true"
    ref="box"
    @dragstart="dragstart"
    @click="dataModel.selectedPatientId = item.patientId"
  >
    <div class="point" :style="item.colorHex && {background: item.colorHex}"></div>
    <span style="margin-right: 5px">{{item.bedLabel}}床</span>
    <span>{{item.name}}</span>
    <div flex-box="1"></div>
    <span @click="model.editPatientModal.open(item, 'info')" style="padding: 10px 0;">
      <span v-if="!item.frequency && !item.hdWay ">未设置</span>
      <span v-else>{{item.frequency}}|{{item.hdWay}}</span>
    </span>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-box {
  height 46px
  padding: 0px 5px;
  font-size: 13px;
  border-radius: 3px;
  margin: 1px 0;
  border-radius:3px;

  .img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 11px;
  }

  .name {
    overflow: visible;
    color: #687179;
  }

  .bed {
    color: #333333;
  }

  &:hover {
    background: #F7F7FA;
  }

  &.active {
    background: #F1F1F5;
    font-weight: bold;

    .name {
      color: #333333;
    }
  }
}



.point {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: transparent;
  margin-right: 5px;
}
</style>
<script>
import { model } from "../../viewModel/model";
import { dataModel } from "../schecdulingTable/viewModel/dataModel";
export default {
  props: ["item", "index"],
  data() {
    return {
      model,
      dataModel,
      frameData: {},
      isTip: false,
      subscribeId: "",
      firstFlag: true,
      isShow: true,
      active: false
    };
  },
  mounted() {
    // this.$refs.box.addEventListener(
    //   "dragstart",
    //   event => {
    //     // 存储拖拽数据和拖拽效果...
    //     console.log(this.item, "item");
    //     event.dataTransfer.setData("data", JSON.stringify(this.item));
    //   },
    //   false
    // );
  },
  methods: {
    dragstart(e) {
      e.dataTransfer.setData("data", JSON.stringify(this.item));
    }
  },
  components: {}
};
</script>
