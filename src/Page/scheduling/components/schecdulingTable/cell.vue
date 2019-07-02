<template>
  <div
    class="cell"
    ref="cell"
    :class="{isDrag, selected: dataModel.selectedPatientId == (cellData && cellData.data.patientId)}"
    :draggable="cellData"
    @dragstart="dragstart"
    @dragenter="dragenter"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div
      v-if="cellData"
      class="cell-box"
      @dblclick="model.editPatientModal.open(cellData.data, 'arrange')"
    >
      <div
        class="barge"
        :style="cellData.data.colorHex && { borderColor: `${cellData.data.colorHex } transparent`}"
      ></div>
      <div class="close-btn" @click.stop="dataModel.cleanItem(obj, cellData.data)">
        <img src="./images/删除.png" alt>
      </div>

      <div class="name">{{cellData.data.name}}</div>
      <div class="info">{{cellData.data.hdWay }}</div>
    </div>
    <div v-else class="null-box" @dblclick="model.editShortTimeModal.open(obj)"></div>
  </div>
</template>

<script>
import { dataModel } from "./viewModel/dataModel";
import { model } from "../../viewModel/model";
export default {
  props: {
    obj: Object
  },
  data() {
    return {
      dataModel,
      model,
      isDrag: false
    };
  },

  methods: {
    dragstart(e) {
      if (!this.cellData) return;
      e.dataTransfer.setData("data", JSON.stringify(this.cellData));
    },
    dragenter(e) {
      this.isDrag = true;
    },
    dragover(e) {
      e.preventDefault();
    },
    dragleave(e) {
      this.isDrag = false;
    },
    drop(e) {
      this.isDrag = false;
      if (!event.dataTransfer.getData("data")) return;
      var data = JSON.parse(event.dataTransfer.getData("data"));
      if (data.position) {
        if (this.obj.position == data.position) return;
        this.dataModel
          .insertItem(this.obj, data.data, data.position)
          .then(res => {
            let [hdDate, timeSlice, hdEqui] = data.position.split("#");
            this.dataModel.cleanItem(
              {
                ...this.obj,
                hdDate,
                timeSlice,
                hdEqui,
                position: data.position
              },
              data.data
            );
          });
      } else {
        this.dataModel.insertItem(this.obj, data);
      }
    }
  },

  computed: {
    cellData() {
      return this.dataModel.findItem(this.obj.position);
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
.cell {
  width: 100%;
  height: 100%;
  &.isDrag {
    background: #fff8b0;
  }
  &.selected {
    background: #fff8b0;
  }
  .null-box {
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  .cell-box {
    text-align: center;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    font-size: 13px;

    .barge {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      width: 0;
      height: 0;
      border-width: 10px 10px 0 0;
      border-style: solid;
      border-color: transparent transparent;
    }
    .close-btn {
      position: absolute;
      right: 0;
      top: 0;
      background: #e62c2c;
      width: 12px;
      height: 12px;
      justify-content: center;
      align-items: center;
      display: none;
    }
    &:hover {
      background: #e6e6e6;
      .close-btn {
        display: flex;
      }
    }
  }
}
</style>
