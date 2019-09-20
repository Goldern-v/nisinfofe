
<template>
  <!-- <span style="margin: 0 0px 0 0;" > -->
  <!-- <TipsBox :obj='obj'  :formObj="formObj"> -->
  <!-- <el-radio
    :ref="obj.name+obj.type.toUpperCase()+obj.title||obj.label"
    v-model="checkboxValue"
    border
    :size="obj.size||'small'"
    :label="obj.title"
    :class="obj.class"
    :style="obj.style"
    @click.native.stop="radioClicked($event,obj)"
  >{{obj.title}}</el-radio>-->
  <span v-if="obj.readOnly!=true && !obj.hiddenTips">
    <el-tooltip class="item" effect="light" placement="top">
      <div slot="content">
        <span>
          <span>标记:未能获取</span><span style="color:red">{{obj.title}}</span>信息
        </span>
      </div>
      <input
        :ref="obj.title"
        data-v-99999999
        v-model="checkboxValue"
        type="checkbox"
        @click="radioClicked($event,obj)"
        :id="`CR-X-${(obj.name)}-${getUUID()}`"
      />
    </el-tooltip>
  </span>
  <!-- </TipsBox> -->
  <!-- </span> -->
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import TipsBox from "./TipsBox";

export default {
  name: "XRadiobox",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    TipsBox
  },
  data() {
    return {
      checkboxValue: [],
      Xname: this.getXRadioboxName() //"K0001","unclear_option",
    };
  },
  computed: {},
  watch: {
    checkboxValue(valueNew, oldvaule) {
      // let value = valueNew.toString();
      // let index = -1;
      // if (!this.formObj.model[this.obj.name]) {
      //   this.formObj.model[this.obj.name] = [];
      // }
      // index = this.formObj.model[this.obj.name].indexOf(this.obj.title);
      // if (value && index === -1) {
      //   // console.log("checkboxValue-1:",value, oldvaule, index)
      //   if (this.formObj.model[this.obj.name]) {
      //     this.formObj.model[this.obj.name].push(value);
      //   }
      // } else if (!value && index > -1 && this.formObj.model[this.obj.name]) {
      //   this.formObj.model[this.obj.name].splice(index, 1);
      //   // console.log("checkboxValue:",valueNew, oldvaule)
      // }
      // console.log("checkboxValue-model:",this.formObj.model)
    }
  },
  mounted() {
    let refName = this.obj.title; //this.obj.name //+
    // this.obj.type.toUpperCase() +
    // (this.obj.title || this.obj.label);
    if (!this.$root.$refs[this.Xname]) {
      this.$root.$refs[this.Xname] = [];
    }
    if (this.$refs[refName]) {
      this.$refs[refName]["childObject"] = this.obj;
      this.$root.$refs[this.Xname][refName] = this.$refs[refName];
    }
    // console.log("RadioboxMounted", this.$refs, this.$root.$refs);
  },
  created() {},
  methods: {
    getXRadioboxName() {
      try {
        return this.formObj.design.XRadiobox.name;
      } catch (error) {
        return "K0001";
      }
    },
    radioClicked(e, child) {
      let name = this.Xname;
      let arr = [];
      console.log(
        "radioClicked",
        e,
        name,
        this.obj,
        e.target.checked,
        child.title,
        child,
        this.formObj.model,
        e.target.tagName,
        this.formObj.model[name],
        this.$root.$refs
      );

      if (e.target.tagName === "INPUT") {
        if (this.$root.$refs[this.obj.name]) {
          console.log("!!!!!", this.obj.title, this.obj.name, this.obj);
          try {
            this.$root.$refs[this.obj.name].$el.style.outline = "none";
            this.$refs[this.obj.name].$el.style.backgroundColor = "transparent";
          } catch (error) {
            console.log(error, this.$root.$refs[this.obj.name]);
            if (this.$root.$refs[this.obj.name].constructor === Array) {
              let keys = Object.keys(this.$root.$refs[this.obj.name]);
              this.$root.$refs[this.obj.name][
                keys[0]
              ].$parent.$parent.$parent.$el.style.outline = "none";
              this.$root.$refs[this.obj.name][
                keys[0]
              ].$parent.$parent.$parent.$el.style.backgroundColor = "transparent";
            }
          }
        }

        if (!this.formObj.model[name]) {
          this.formObj.model[name] = "";
        }
        if (this.formObj.model[name] || this.formObj.model[name] == "") {
          arr = this.formObj.model[name].split(",");
          if (arr.indexOf(this.obj.title) == -1 && e.target.checked) {
            // arr = [...arr, this.obj.title]
            arr.push(this.obj.title);
            this.formObj.model[name] = arr + "";
          } else {
            // arr = this.formObj.model[name].split(",");
            arr = arr.filter(r => {
              return r !== this.obj.title && r !== "";
            });
            this.formObj.model[name] = arr + "";
          }
          // this.formObj.model[name] = "";
          // this.radioValue = "";
        }
      }

      console.log(
        "--radioClicked",
        e,
        name,
        e.target.checked,
        child.title,
        child,
        this.formObj.model,
        e.target.tagName,
        this.formObj.model[name],
        this.$root.$refs
      );
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    }
  }
};
</script>


<style scoped>
.el-Radiobox,
.is-bordered,
.el-Radiobox--small,
.el-input,
.el-input--small,
.el-input-group,
.el-input-group--prepend {
  margin: 5px 0px;
}

.el-radio {
  white-space: inherit !important;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  vertical-align: text-top;
  width: 14px;
  height: 14px;
  border: 1px solid #a5a5a6;
  border-radius: 0px;
  outline: none;
  position: absolute;
  margin-left: -16px;
}
input[type="checkbox"]:focus,
input[type="checkbox"]:hover {
  border: 1px solid blue;
  background: #eef5f5;
  box-shadow: 0px 0px 1px 1px #0033ff;
  cursor: pointer;
}
input[type="checkbox"]:checked {
  font-size: 10;
  position: relative;
}
input[type="checkbox"]:checked:before {
  content: "";
  width: 8px;
  transform: rotate(45deg);
  position: absolute;
  top: 7px;
  left: -2px;
  border-top: 2px solid #000;
}
input[type="checkbox"]:checked:after {
  content: "";
  width: 14px;
  transform: rotate(-50deg) translateY(-50%) translateX(50%);
  position: absolute;
  border-top: 1px solid #000;
  top: 10px;
  left: -2px;
}

input[type="checkbox"][data-v-99999999]:hover,
input[type="checkbox"][data-v-99999999]:focus {
  border: 1px solid red;
  box-shadow: 0px 0px 1px 1px red;
  cursor: pointer;
}

input[type="checkbox"][data-v-99999999]:checked:after {
  content: "";
  width: 14px;
  -webkit-transform: rotate(-50deg) translateY(-50%) translateX(50%);
  -ms-transform: rotate(-50deg) translateY(-50%) translateX(50%);
  transform: rotate(-45deg) translateY(-100%) translateX(45%);
  position: absolute;
  border-top: 2px solid red;
  top: 11px;
  left: -4px;
  border-radius: inherit;
}

input[type="checkbox"][data-v-99999999]:checked:before {
  content: "";
  width: 14px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 5px;
  left: -1px;
  border-top: 2px solid red;
  border-radius: inherit;
}

input[type="checkbox"][data-v-99999999] {
  -webkit-appearance: none;
  vertical-align: text-top;
  width: 14px;
  height: 14px;
  border: 1px dashed #929292;
  border-radius: 2px;
  background: border-box;
  cursor: pointer;
  margin-top: -1px;
}
</style>
