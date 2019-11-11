
<template>
  <span style="margin: 0 0px 0 0;">
    <!-- {{formObj.model}} -->
    <!-- <TipsBox :obj='obj'  :formObj="formObj"> obj.name+obj.type.toUpperCase()+obj.title||obj.label-->
    <el-checkbox
      :ref="refName"
      v-if="obj.type==='checkbox'"
      v-model="checkboxValue"
      border
      @click.native.stop="checkboxClick"
      :size="obj.size||'small'"
      :label="obj.code || obj.title"
      :class="obj.class"
      :style="obj.style"
    >{{obj.title}}</el-checkbox>
    <!-- </TipsBox> -->
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import TipsBox from "./TipsBox";

export default {
  name: "Checkbox",
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
      refName: this.obj.title || this.obj.label
    };
  },
  computed: {
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0100";
    }
  },
  watch: {
    checkboxValue(valueNew, oldvaule) {
      // this.formObj.model[this.obj.name] = valueNew;
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
      // console.log("checkboxValue-model:", this.formObj.model);
    }
  },
  mounted() {
    // let refName =
    //   this.obj.name +
    //   this.obj.type.toUpperCase() +
    //   (this.obj.title || this.obj.label);

    // let refName = this.obj.title || this.obj.label;

    // let formCode = this.formObj.formSetting.formInfo.formCode;
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = new Object();
    }
    if (!this.$root.$refs[this.formCode][this.obj.name]) {
      this.$root.$refs[this.formCode][this.obj.name] = new Array();
    }

    if (this.$refs[this.refName]) {
      this.$refs[this.refName]["childObject"] = this.obj;
      this.$root.$refs[this.formCode][this.obj.name][this.refName] = this.$refs[
        this.refName
      ];
    }
  },
  created() {},
  methods: {
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    checkboxClick(e) {
      if (e.target.tagName !== "INPUT") {
        return;
      }

      // let formCode = this.formObj.formSetting.formInfo.formCode;

      let rootRefs = this.$root.$refs[this.formCode][this.obj.name];

      console.log("--obj.name:", this.obj.name, rootRefs, this.$root.$refs);

      if (!this.formObj.model[this.obj.name]) {
        this.formObj.model[this.obj.name] = "";
      }

      let objArray = this.formObj.model[this.obj.name].split(",");
      let objName = this.obj.code || this.obj.title;

      let index = objArray.findIndex(c => {
        return c === objName;
      });
      if (index === -1) {
        objArray.push(objName);
        // this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
        //   return c.name !== this.obj.name;
        // });
        // this.formObj.selectedItems.push(this.obj);
      }
      objArray = objArray.filter(c => {
        return c !== "";
      });
      if (this.$refs[this.obj.title].isChecked) {
        objArray = objArray.filter(c => {
          return c !== objName;
        });
        this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
          return c.title !== this.obj.title;
        });
        console.log("取消选中", "index", index, objArray);
        this.formObj.model[this.obj.name] = objArray.toString();
      } else {
        this.formObj.model[this.obj.name] = objArray.toString();
        //插入
        this.formObj.selectedItems.push(this.obj);
      }

      if (e.target.checked !== undefined) {
        console.log(
          "checkboxClick",
          e.target.checked,
          e,
          this.obj,
          this.$root.$refs[this.formCode][this.obj.name][this.refName],
          this.formObj
        );
      }

      // if (index === -1) {
      //   this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
      //     return c.name !== this.obj.name;
      //   });
      //   this.formObj.selectedItems.push(this.obj);
      // }
      // if (this.$refs[this.obj.title].isChecked) {
      //   this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
      //     return c.name !== this.obj.name;
      //   });
      //   console.log("取消选中", "index", index, this.formObj.selectedItems);
      //   this.formObj.model[this.obj.name] = "";
      // } else {
      //   this.formObj.model[this.obj.name] = this.obj.code || this.obj.title;
      // }

      let score = 0;
      // 计算总分
      this.formObj.selectedItems.map(item => {
        score += ~~item.score;
      });
      //
      if (this.obj.score != undefined) {
        this.formObj.model["evalScore"] = score;
        if (this.$root.$refs[this.formCode]["evalScore"]) {
          this.formObj.model["evalScore"] = score;
          // this.$root.$refs[this.formCode]["evalScore"][0].setCurrentValue(score);
          this.setElementValue("evalScore", score);

          let textResult = this.getValueRule("evalDesc", score); //this.$root.$refs["evalDesc"][0].checkValueRule(score);
          console.log("evalDesc-textResult", textResult);
          this.formObj.model["evalDesc"] = textResult + "";
          this.setElementValue("evalDesc", textResult);
          // this.$root.$refs["evalDesc"][0].setCurrentValue(textResult);
          this.getValueRule("evalDesc", textResult);
          // this.$root.$refs["evalDesc"][0].checkValueRule(textResult);
        }
      }

      //
      // 评估得分：0-20分完全依赖；20-40分严重依赖；40-60分明显依赖；＞60分基本自理
      //

      //** 吞咽特殊处理 */
      if (
        this.obj.name === "I047003" ||
        this.obj.name === "I047004" ||
        this.obj.name === "I047005" ||
        this.obj.name === "I047006" ||
        this.obj.name === "I047007" ||
        this.obj.name === "I047008" ||
        this.obj.name === "I047009" ||
        this.obj.name === "I047010" ||
        this.obj.name === "I047011"
      ) {
        // this.$root.$refs["I047012"].$parent.inputValue = "+";
        Object.keys(this.$root.$refs[this.formCode]["I047012"]).map(elkey => {
          this.$root.$refs[this.formCode]["I047012"][elkey].$parent.inputValue =
            "+";
        });
      }

      if (
        this.obj.name === "I047015" ||
        this.obj.name === "I047016" ||
        this.obj.name === "I047017" ||
        this.obj.name === "I047018" ||
        this.obj.name === "I047019" ||
        this.obj.name === "I047020" ||
        this.obj.name === "I047021" ||
        this.obj.name === "I047022" ||
        this.obj.name === "I047023"
      ) {
        // this.$root.$refs["I047024"].$parent.inputValue = "+";
        Object.keys(this.$root.$refs["I047024"]).map(elkey => {
          this.$root.$refs["I047024"][elkey].$parent.inputValue = "+";
        });
      }
    },
    setElementValue(key, value) {
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        this.$root.$refs[this.formCode][key][elkey].setCurrentValue(value);
      });
    },
    getValueRule(key, value) {
      let textResult = "";
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        textResult = this.$root.$refs[this.formCode][key][elkey].checkValueRule(
          value
        );
      });
      return textResult;
    }
  }
};
</script>


<style scoped>
.el-checkbox,
.is-bordered,
.el-checkbox--small,
.el-input,
.el-input--small,
.el-input-group,
.el-input-group--prepend {
  margin: 2px 0px;
}

.el-checkbox,
.el-checkbox__input {
  white-space: inherit !important;
  display: flex;
  /* display: inline-block; */
}
</style>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

>>>.el-checkbox__label
      font-size 12px!important;
      padding-left: 5px;
      padding-right: 5px;

>>>.el-checkbox__inner
      border-radius 0px!important;
      width: 15px;
      height: 15px;
      border-color: #4bb08d!important;

>>>.el-checkbox__inner::after
      border 2px solid #fff;
      border-left: 0;
      border-top: 0;
      left: 3px;
      top: 0px;

>>>.el-checkbox__input.is-checked+.el-checkbox__label
      color: #333!important;

</style>
