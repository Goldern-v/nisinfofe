
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
    <template v-if="obj.tiem">
      <el-date-picker
      :ref="obj.name"
      :name="obj.name"
      :disabled="!!obj.readOnly || isDisabled(obj)"
      v-model="datePickerValue"
      :label="obj.title"
      :class="obj.class"
      :style="[obj.style, obj.inputWidth && {width: obj.inputWidth}]"
      :size="obj.size||'small'"
      type="datetime"
      format="HH:mm"
      @keydown.native="inputKeyDown($event, obj)"
      :placeholder="obj.placeholder"
    ></el-date-picker>
    </template>
    <template v-else>
    <el-date-picker
      :ref="obj.name"
      :name="obj.name"
      :disabled="!!obj.readOnly || isDisabled(obj)"
      v-model="datePickerValue"
      :label="obj.title"
      :class="obj.class"
      :style="[obj.style, obj.inputWidth && {width: obj.inputWidth}]"
      :size="obj.size||'small'"
      type="datetime"
      format="yyyy-MM-dd HH:mm"
      @keydown.native="inputKeyDown($event, obj)"
      :placeholder="obj.placeholder"
    ></el-date-picker>
    </template>
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
      return "E0001";
    }
  },
  watch: {
    datePickerValue(valueNew, oldvaule) {
      // console.log("datePickerValue:", valueNew, oldvaule,this.formObj);

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
      if (!valueNew) {
        this.formObj.model[this.obj.name] = "";
        return;
      }
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
    if(this.datePickerValue){
      this.datePickerValue = this.datePickerValue;
    }else if(this.HOSPITAL_ID ='lyxrm'){
      this.datePickerValue =null;
    }else{
       this.datePickerValue = moment(new Date()).format("YYYY-MM-DD HH:mm");
    }

    let refName = this.obj.name;

    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = new Array();
    }

    if (!this.$root.$refs[this.formCode][this.obj.name]) {
      this.$root.$refs[this.formCode][this.obj.name] = new Array();
    }

    if (this.$refs[refName]) {
      // this.$refs[refName].currentValue = moment().format("YYYY-MM-DD HH:mm");
      // this.$refs[refName].placeholder = moment().format("YYYY-MM-DD HH:mm");
      // console.log('mounted:DatePicker',this.obj.name,this.formObj.model[this.obj.name])
      this.$root.$refs[this.formCode][refName] = this.$refs[refName];
    }
    // console.log('datePickerMounted',this.$refs,this.$root.$refs)
  },
  created() {
    // let refName = this.obj.name;
    // evalDate
    if (this.obj.name === "evalDate" && this.formObj.model[this.obj.name]) {
      //
      this.formObj.model[this.obj.name] = moment().format("YYYY-MM-DD HH:mm");
      // console.log('created:DatePicker',this.obj.name,this.formObj.model[this.obj.name])
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
    },
    /**通过配置
     * isDisabledRules:
     * [{
     *   type: 'equal'||'notequal',
     *   reqCode:'',
     *   valList: [],
     *   whiteList: []
     * }]
     * 动态修改属性disabled*/
    isDisabled(obj) {
      if(obj.isDisabledRules) {
        if(obj.isDisabledRules.some(rule => {
          //当 绑定值(this.formObj.model[rule.key]) 在valList内 [valist.includes(this.formObj.model[rule.key])]时禁用
          if(rule.type === 'equal') {
            //不存在值，默认不禁用
            if(!this.formObj.model[rule.key]) return false
            //有禁用白名单，优先先判断
            if(rule.whiteList) {
              if(rule.whiteList.some(val => {
                return this.formObj.model[rule.key] && this.formobj.model[rule.key].includes(val)
              })) return false
            }
            return rule.valList.some(val => { return this.formObj.model[rule.key].includes(val) })
          }
          //当 绑定值(this.formObj.model[rule.key])不在valList内 [!valist.includes(this.formObj.model[rule.key])]时禁用
          else if(rule.type === 'notEqual') {
            //不存在值，默认禁用
            if(!this.formObj.model[rule.key]) return true
            //有’非‘禁用白名单，优先先判断
            if(rule.whiteList) {
              if(rule.whiteList.some(val => {
                return this.formObj.model[rule.key] && this.formObj.model[rule.key].includes(val)
              })){ return true }
            }
            return !rule.valList.some(val => { return this.formObj.model[rule.key].includes(val) })
          }else {
            console.warn(`isDisabledRules no Types! ${rule.key}`);
          }
        }))
          return true;
      }
      return false;
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
    &:read-only{
      cursor: no-drop!important;
      color: black!important;
    }
    &:placeholder{
      color: #dbe6e4;
    }
  }

  >>>.el-input__inner
    width 100%!important
    border-radius 0px
    padding: 0px 5px!important;
    height: 22px!important;
    font-size: 12px!important;

  .date-picker-box {
    // display: inline-block;
    width: 100%;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
</style>
