
<template>
  <span style="margin: 0 0px 0 0;">
    <!-- <el-input v-if="obj.type==='input'" v-model="checkboxValue" border size="small" :label="obj.title" :class="obj.class" :style="obj.style">{{obj.title}}</el-input> -->
    <!-- obj.options && obj.options.length>0 ? obj.options[0]+'' : (obj.placeholder+''||'') -->
    <span
      v-if="obj.label"
      :style="{width: obj.labelWidth, textAlign: 'right', paddingRight: '10px'}"
    >
      <span style="font-size: 12px;" :style="obj.labelStyle" :class="obj.labelClass">{{obj.label}}</span>
    </span>
    <!-- 单选下拉框 -->
    <el-select
      :id="getUUID()"
      :ref="obj.name"
      :class="obj.class||''"
      :style="[obj.style, obj.inputWidth && {width: obj.inputWidth}]"
      :size="obj.size||'small'"
      v-bind="obj.props"
      v-model="obj.options"
      :name="obj.name"
      @change="selectChange"
      @keydown.native="inputKeyDown($event, obj)"
      placeholder="空"
    >
      <el-option v-for="item in obj.options"  :key="item" :label="item" :value="obj.options"></el-option>
    </el-select>
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

export default {
  name: "SelectBox",
  props: {
    obj: {
      type:Object,
      default:{}
    },
    formObj: Object,
    col: {
      type: Number,
      default: 1
    },
    model: {
      type: String,
      default: "normal"
    },
    property: {
      type: Object,
      default: () => new Object()
    }
  },
  components: {},
  data() {
    return {
      selectValue: ""
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
    obj(val1,val2){
      console.log('---obj----',val1,val2);
    },
    selectValue(valueNew, oldvaule) {
      console.log("watch:selectValue:", valueNew, oldvaule);
      this.formObj.model[this.obj.name] = valueNew;
      this.obj.style = "";
      if (
        this.obj.hasOwnProperty("rule") !== -1 &&
        this.obj.rule &&
        this.obj.rule.constructor === Array
      ) {
        console.log("rule:", this.obj.rule);
        this.obj.rule.map(r => {
          if (
            r.min &&
            r.max &&
            (~~valueNew >= ~~r.min && ~~valueNew <= ~~r.max)
          ) {
            this.obj.style = r.style;
          } else if (r.equal && r.equal === valueNew) {
            this.obj.style = r.style;
          } else if (r.equals && r.equals.indexOf(valueNew) !== -1) {
            this.obj.style = r.style;
          }
        });
      }
      this.$refs[
        this.obj.name
      ].$refs.reference.$refs.input.style = this.obj.style;

      console.log("obj:", this.obj, this.$refs);

      // this.$refs[this.obj.name].$refs.reference.$refs.input.focus()

      // this.$refs[this.obj.name].$children[0].$el.lastElementChild.focus();
    }
  },
  mounted() {
    console.log(this.obj,'fdafs fasfa f -----------------------------');
    let refName = this.obj.name; //+this.obj.type.toUpperCase()+(this.obj.title||this.obj.label)
    if (this.$refs[refName]) {
      this.$root.$refs[this.formCode][refName] = this.$refs[refName];
    }
    // console.log('inputMounted',this.$refs,this.$root.$refs)
  },
  created() {
    if (
      this.obj &&
      this.obj.hasOwnProperty("value") > -1 &&
      this.obj.value &&
      this.obj.value.constructor === Array
    ) {
      this.obj["options"] = this.obj.value;
    }
  },
  methods: {
    // selectChange(e, name, value='') {
    //   console.log('selectChange',e, name, value,this.formObj.model)
    // },
    selectChange(value) {
      console.log("selectChange", value);
      // e.target.focus()
    },
    inputClick(e, child) {
      console.log("inputClick", e, child, this.formObj.model, e.target.tagName);
      if (child.dialog) {
        console.log("child.dialog", child.dialog, this.$refs, this.$root.$refs);
        try {
          // this.$root.$refs.dialogBox.$el.draggable = true
          this.$root.$refs.dialogBox.openBox(child.dialog, this.selectValue); //$el draggable
        } catch (error) {
          console.log("error", error);
        }
      }
    },
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
  .el-checkbox,
  .el-select,
  .is-bordered,
  .el-checkbox--small,
  .el-input,
  .el-input--small,
  .el-input-group,
  .el-input-group--prepend
    margin: 5px 0px;
    vertical-align: bottom;
    width: 100%;
    &:hover
      outline 1px solid #4baf8d
      border none

>>>.el-input__inner.el-input__inner.el-input__inner
  width 100%
  border-radius 0px
  padding: 0px 5px!important;
  height: 22px!important;
  background: transparent;

.select-label
  margin-right: -6px;
  margin-left: 3px;
  vertical-align: super;

</style>
