<template>
  <span class="TableRadio" v-if="item.type=='radio'">
    <span
      class="radio"
      v-for="(child,chInde) in item.children"
      :key="chInde"
      :style="child.eleStyle"
    >
      <label @click="handleRadioClick(child)" v-if="child.type=='radio'">
        <span class="radio_input" :class="child.addClass">
          <span class="radio_inner"></span>
        </span>
        <span class="radio_label">{{child.value}}</span>
      </label>
      <TableCheckBox v-if="child.childType=='checkbox'" :item="child" :model="model"></TableCheckBox>
      <TableRadio v-if="child.childType=='radio'" :item="child" :model="model"></TableRadio>
      <span v-if="child.type=='input'">
        <span class="prev" v-if="child.prev" v-html="child.prev" />
        <TableInput :item="child" :model="model" :data="item"></TableInput>
        <span class="next" v-if="child.next" v-html="child.next" />
      </span>
    </span>
  </span>
</template>

<script>
import TableCheckBox from "./TableCheckBox";
import TableInput from "./TableInput";
import sheetInfo from '@/Page/sheet-page/components/config/sheetInfo/index.js'
import bus from "vue-happy-bus";
export default {
  name: "TableRadio",
  data() {
    return {
      bus: bus(this)
    };
  },
  props: ["item", "model"],
  components: { TableCheckBox, TableInput },
  methods: {
    handleRadioClick(child) {
      this.model[child.name] =
        this.model[child.name] == child.value ? "" : child.value;

      this.item.children.map(ite => {
        ite.addClass = this.model[ite.name] == ite.value ? "is-checked" : "";
        if (ite.type == "input" && this.model[ite.name] != child.value) {
          this.bus.$emit("inputChange", { name: ite.name, value: "" });
        }
        if (ite.children) {
          ite.children.map(chil => {
            chil.addClass =
              this.model[child.name] == ite.value ? "" : "is-disabled";
            this.model[chil.name] =
              this.model[child.name] == ite.value ? this.model[chil.name] : "";
          });
        }
      });
      sheetInfo.relObj = {...this.model}
    }
  },
  mounted() {},
  watch: {
    model() {
      this.item.children.map(chil => {
        chil.addClass = "";
        for (let key in this.model) {
          if (
            key == chil.name &&
            this.model[key] &&
            this.model[key] == chil.value
          ) {
            chil.addClass = "is-checked";
            return;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.TableRadio {
  .radio {
    &:last-of-type {
      margin-right: 0;
    }
  }
}
.radio_input {
  cursor: pointer;
  display: inline-block;
  position: relative;
  white-space: nowrap;
  input {
    opacity: 0;
    outline: 0;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    left: -999px;
  }
  &.is-checked {
    .radio_inner {
      &::after {
        content: "";
        position: absolute;
        left: 62%;
        top: -2%;
        width: 10px;
        height: 5px;
        border: 2px solid #000;
        border-top: none;
        border-right: none;
        -webkit-transform: rotate(-45deg) translate(-50%, -50%);
        transform: rotate(-45deg) translate(-50%, -50%);
        border-color: #00f !important;
      }
    }
  }
  &.is-disabled {
    .radio_inner {
      background-color: rgb(238, 246, 245);
      border-color: rgb(209, 229, 224);
      cursor: not-allowed;
      &::after {
        cursor: not-allowed;
        border-color: rgb(238, 246, 245);
      }
    }
  }
}
.radio_inner {
  display: inline-block;
  position: relative;
  border: 1px solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #eee;
  z-index: 1;
  top: 3px;
}
</style>


