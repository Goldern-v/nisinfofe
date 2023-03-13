<template>
  <span class="checkBox">
    <span class="check" v-for="child in item.children" :key="child.value">
      <span v-if="child.type == 'text'">{{ child.value }}</span>
      <label
        class="check"
        @click="handlecheckClick(child)"
        v-if="child.type == 'checkbox'"
      >
        <span class="check_input" :class="child.addClass">
          <span class="check_inner"></span>
        </span>
        <span class="check_label">{{ child.value }}</span>
      </label>
      <span v-if="child.type == 'input'">
        <span class="prev" v-if="child.prev" v-html="child.prev" />
        <TableInput :item="child" :model="model" :data="item"></TableInput>
        <span class="next" v-if="child.next" v-html="child.next" />
      </span>
    </span>
  </span>
</template>

<script>
import bus from "vue-happy-bus";
import sheetInfo from '@/Page/sheet-page/components/config/sheetInfo/index.js'
import TableInput from "./TableInput";
export default {
  name: "checkBox",
  data() {
    return {
      bus: bus(this)
    };
  },
  props: ["item", "model"],
  components: { TableInput },
  mounted(){
    this.$nextTick(()=>{
      console.log(this.item,this.model)
      this.item.children.map(chil => {
        chil.addClass = chil.addClass == "is-checked" ? "" : chil.addClass;
        if (this.model[chil.name]) {
          let arr = this.model[chil.name].split(",");
          if (arr.indexOf(chil.value) != -1) {
            chil.addClass = "is-checked";
          }
        }
      });
    })
  },
  methods: {
    handlecheckClick(child) {
      console.log(this.item);
      // debugger;
      if (child.addClass == "is-disabled") {
        return;
      }
      let arr = this.model[child.name] ? this.model[child.name].split(",") : [];
      let index = arr.indexOf(child.value);
      // debugger;
      if (index == -1) {
        arr.push(child.value);
        child.addClass = "is-checked";
      } else {
        arr.splice(index, 1);
        child.addClass = "";
        this.item.children.map(ite => {
          if (ite.tasks && ite.tasks.constructor == Array) {
            ite.tasks.map(obj => {
              if (obj.active) {
                for (let key in obj.active) {
                  if (obj.active[key] == child.value) {
                    this.bus.$emit("inputChange", {
                      name: ite.name,
                      value: ""
                    });
                  }
                }
              }
            });
          }
        });
      }

      this.model[child.name] = arr.join(",");
      sheetInfo.relObj = {...this.model}
    }
  },
  watch: {
    model: {
      deep:true,
      handler(){
        this.item.children.map(chil => {
        chil.addClass = chil.addClass == "is-checked" ? "" : chil.addClass;
        if (this.model[chil.name]) {
          let arr = this.model[chil.name].split(",");
          if (arr.indexOf(chil.value) != -1) {
            chil.addClass = "is-checked";
          }
        }
      });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.check_input {
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
    .check_inner {
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
    .check_inner {
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
.check_inner {
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
