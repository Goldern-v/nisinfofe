
<template>
  <span style class="date-picker-box">
    <span>{{obj.prefixDesc}}</span>
    <span
      v-if="obj.label"
      :style="{width: obj.labelWidth, textAlign: 'right', paddingRight: '10px'}"
    >
      <span style="font-size: 13px;" :style="obj.labelStyle" :class="obj.labelClass">{{obj.label}}</span>
    </span>
    <!-- last-version +obj.type.toUpperCase()+obj.title||obj.label-->
    <el-date-picker
      :ref="obj.name"
      v-model="datePickerValue"
      :label="obj.title"
      :class="obj.class"
      :style="obj.inputStyle||obj.style"
      :size="obj.size||'small'"
      type="datetime"
      format="yyyy-MM-dd HH:mm"
      @keydown.native="inputKeyDown($event, obj)"
      :placeholder="obj.placeholder"
    ></el-date-picker>
    <!-- 1.4.4 version -->
    <!-- <el-date-picker
      v-model="datePickerValue"
      type="datetime"
      :placeholder="obj.placeholder">
    </el-date-picker>-->
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import moment from "moment";
export default {
  name: "DatePicker",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {},
  data() {
    return {
      datePickerValue: ""
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
    datePickerValue(valueNew, oldvaule) {
      // let value = valueNew.toString();
      // let index = -1;
      // if (!this.formObj.model[this.obj.name]) {
      //   this.formObj.model[this.obj.name] = [];
      // }
      // index = this.formObj.model[this.obj.name].indexOf(this.obj.title);
      // if (value && index === -1) {
      //   // console.log("datePickerValue-1:",value, oldvaule, index)
      //   if (this.formObj.model[this.obj.name]) {
      //     this.formObj.model[this.obj.name].push(value);
      //   }
      // } else if (!value && index > -1 && this.formObj.model[this.obj.name]) {
      //   this.formObj.model[this.obj.name].splice(index, 1);
      //   console.log("datePickerValue:", valueNew, oldvaule);
      // }
      // console.log("datePickerValue-model:", this.formObj.model);

      if (this.obj.name) {
        this.formObj.model[this.obj.name] = moment(valueNew).format(
          "YYYY-MM-DD HH:mm"
        );
      }
      if (this.obj.name_date) {
        this.formObj.model[this.obj.name_date] = moment(valueNew).format(
          "YYYY-MM-DD"
        );
      }
      if (this.obj.name_time) {
        this.formObj.model[this.obj.name_time] = moment(valueNew).format(
          "HH:mm"
        );
      }
    }
  },
  mounted() {
    // let refName =
    //   this.obj.name +
    //   this.obj.type.toUpperCase() +
    //   (this.obj.title || this.obj.label);

    let refName = this.obj.name;
    let refNameTitle = this.obj.title || this.obj.label;

    //
    // let formCode = this.formObj.formSetting.formInfo.formCode;
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = new Object();
    }
    if (!this.$root.$refs[this.formCode][refName]) {
      this.$root.$refs[this.formCode][refName] = [];
    }

    if (this.$refs[refName]) {
      this.$refs[refName].currentValue = moment().format("YYYY-MM-DD HH:mm");
      // this.$root.$refs[refName] = this.$refs[refName];
      this.$refs[refName]["childObject"] = this.obj;
      //
      this.$root.$refs[this.formCode][refName][refNameTitle] = this.$refs[
        refName
      ];
    }
    // console.log('datePickerMounted',this.$refs,this.$root.$refs)
  },
  created() {
    // let refName = this.obj.name;
    // evalDate
    if (this.obj.name === "evalDate" && this.formObj.model[this.obj.name]) {
      //
      this.formObj.model[this.obj.name] = moment().format("YYYY-MM-DD HH:mm");
      // this.$refs[refName].currentValue = moment().format("YYYY-MM-DD HH:mm")
      //
    }
  },
  methods: {
    inputKeyDown(e, child) {
      console.log(
        "inputKeyDown",
        e,
        child,
        e.target.tagName,
        e.keyCode,
        e.key,
        e.target.selectionStart,
        e.target.selectionEnd
      );
      if (e.keyCode === 37) {
        // ArrowLeft
        e.target.$leftNode.focus();
        console.log("ArrowLeft", e.target, e);
      }
      if (e.keyCode === 39) {
        // ArrowRight
        e.target.$rightNode.focus();
        console.log("ArrowRight", e.target, e);
      }
      if (e.keyCode === 13) {
        // 13 Enter
        console.log("Enter", e.target);
        e.target.$rightNode.focus();
      }
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .el-date-picker,
   .is-bordered,
   .el-date-picker--small,
   .el-input,
   .el-input--small,
   .el-input__inner,
   .el-input-group,
   .el-input-group--prepend {
    margin: 5px 0px;
    width: 100%;
  }

  >>>.el-input__inner
    width 100%!important
    border-radius 0px
    color: blue!important;
    padding: 0px 5px!important;
    height: 22px!important;
    background: transparent;

  .date-picker-box {
    display: inline-block;
    width: 100%;
    font-size: 13px;
  }
</style>
