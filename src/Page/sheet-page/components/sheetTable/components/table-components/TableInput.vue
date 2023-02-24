<template>
  <span
    :class="[item.class, { showModal: showModal && item.autoComplete.data }]"
    v-if="item.type == 'input'"
  >
    <input
      type="text"
      :style="item.style || ''"
      v-model="inputVal"
      :data-value="inputVal"
      @focus="onFocus($event)"
      @blur="item.autoComplete && onBlur()"
    />
    <ul v-if="showModal && item.autoComplete.data">
      <li
        v-for="child in item.autoComplete.data"
        :key="child.sortNo"
        :class="{ active: inputVal == child.equiName }"
        @click="selectedItem(child.equiName)"
      >
        {{ child.equiName }}
      </li>
    </ul>
  </span>
</template>

<script>
import bus from "vue-happy-bus";
import sheetInfo from '@/Page/sheet-page/components/config/sheetInfo/index.js'
// import { getEquiDict } from "../api/index";
export default {
  data() {
    return {
      inputVal: "",
      bus: bus(this),
      showModal: false
    };
  },
  props: ["item", "model", "data"],
  components: {},
  methods: {
    inputChange(val) {
      if (val.name == this.item.name) {
        this.inputVal = val.value;
      }
      sheetInfo.relObj = {...this.model}
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
                  } else if (ite.value == obj.active[key]) {
                    let arr = this.model[key] ? this.model[key].split(",") : [];
                    if (arr.indexOf(obj.active[key]) == -1) {
                      arr.push(obj.active[key]);
                    }
                    this.model[key] = arr.join(",");
                    ite.addClass = "is-checked";
                  }
                }
              });
            }
          }
        });
      }
    },
    // 获取机器码
    // getEquiDictList(){
    //   getEquiDict().then(res => {
    //     if(res.data && res.data.code == 200){
    //       this.item.autoComplete.data = res.data.data;
    //     }
    //   })
    // },
    onFocus(e, bind) {
      this.runTask(true);
      if (this.item.autoComplete) {
        if (sheetInfo.model == "print") return;
        this.showModal = true;
      }
    },
    onBlur(e, bind) {
      if (sheetInfo.model == "print") return;
      let timeId = setTimeout(() => {
        clearTimeout(timeId);
        this.showModal = false;
      }, 400);
    },
    selectedItem(val) {
      this.inputVal = val;
      this.showModal = false;
    }
  },
  created() {
    if (this.data) {
      this.bus.$on("inputChange", val => {
        this.inputChange(val);
      });
    }
    if (this.item.autoComplete) {
      // this.getEquiDictList();
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
.showModal {
  position: relative;
  overflow: visible;
  ul {
    z-index: 1000;
    width: 80px;
    position: absolute;
    top: 20px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    max-height: 280px;
    overflow: auto;
    background-color: #fff;
    padding: 6px 0;
    border-radius: 2px;
    border: 1px solid #eee;
  }
  li {
    list-style: none;
    line-height: 25px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;
    color: rgb(72, 106, 98);
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover,
    &.active {
      background-color: rgb(228, 241, 240);
    }
  }
}
</style>


