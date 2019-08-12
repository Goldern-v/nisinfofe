<template>
  <span :class="item.class||''" v-if="item.type=='input'">
    <input type="text" :style="item.style||''" v-model="inputVal" ref="test" @focus="runTask(true)" />
  </span>
</template>

<script>
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      inputVal: "",
      bus: bus(this)
    };
  },
  props: ["item", "model", "data"],
  components: {},
  methods: {
    inputChange(val) {
      if (val.name == this.item.name) {
        this.inputVal = val.value;
      }
    },
    // 判断是否勾选input前选框
    runTask(isFocus) {
      if (this.item.tasks && this.item.tasks.constructor == Array) {
        this.item.tasks.map(obj => {
          if (obj.active) {
            for (let key in obj.active) {
              this.data.children.map(ite => {
                if (!this.model[key] || this.inputVal || isFocus) {
                  if (this.data.type == "radio") {
                    this.model[key] = obj.active[key];
                    ite.addClass =
                      this.model[key] == ite.value ? "is-checked" : "";
                  } else {
                    let arr = this.model[key] ? this.model[key].split(",") : [];
                    let index = arr.indexOf(obj.active[key]);
                    this.model[key] =
                      index == -1
                        ? this.model[key] + "," + obj.active[key]
                        : this.model[key];
                    ite.addClass = "is-checked";
                  }
                }
              });
            }
          }
        });
      }
      console.log(this.model);
    }
  },
  created() {
    if (this.data) {
      this.bus.$on("inputChange", val => {
        this.inputChange(val);
      });
    }
  },
  mounted() {},
  watch: {
    inputVal() {
      this.model[this.item.name] = this.inputVal;
      this.runTask();
    },
    model() {
      if (this.model[this.item.name]) {
        this.inputVal = this.model[this.item.name];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  border: none;
  width: 50px;
  font-family: "Simsun";
  font-size: 14px;
  line-height: 14px;
  height: 14px;
  vertical-align: middle;
  outline: none;
}
</style>


