
<template>
  <span style="margin: 0 0px 0 0;">
    <!-- <el-input v-if="obj.type==='input'" v-model="checkboxValue" border size="small" :label="obj.title" :class="obj.class" :style="obj.style">{{obj.title}}</el-input> -->
    <span v-if="obj.label">
      <span style="font-size: 12px;" :style="obj.labelStyle" :class="obj.labelClass">{{obj.label}}</span>
    </span>
    <!-- 表格 -->
    <el-table size="mini" :data="tableData" stripe>
      <el-table-column size="mini" prop="option" :label="obj.title">
        <template slot-scope="scope">
          <div class="option-list">
            <el-input
              size="mini"
              v-if="typeof scope.row.option==='string'"
              v-model="property.options[scope.$index]"
            ></el-input>
            <span v-else-if="typeof scope.row.option!=='string'">{{scope.row.option}}</span>
            <el-button @click="optionDelete($event,scope)" type="text" size="mini">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-button-table">
      <div class="option-list">
        <el-input size="mini" placeholder="批量添加:a,b,c" v-model="addNewValue"></el-input>
        <el-button style="padding: 0px 16px;" @click="optionAddNew" type="text" size="mini">添加</el-button>
      </div>
    </div>

    <!-- <el-table
      v-if="obj.type==='table' && !obj.children"
      :id="getUUID()"
      :ref="obj.name"
      :class="obj.class||''"
      :style="obj.style||''"
      :size="obj.size||'small'"
      v-model="selectValue"
      :name="obj.name"
      @change="selectChange"
      @keydown.native="inputKeyDown($event, obj)"
      :placeholder="obj.options && obj.options.length>0 ? obj.options[0]+'' : (obj.placeholder+''||'')">
        <el-option
          v-for="item in obj.options"
          v-if="item"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
    </el-table>-->
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

export default {
  name: "TableBox",
  props: {
    obj: Object,
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
      selectValue: "",
      tableData: [],
      addNewValue: ""
    };
  },
  computed: {},
  watch: {
    selectValue(valueNew, oldvaule) {
      console.log("watch:selectValue:", valueNew, oldvaule);
      // this.formObj.model[this.obj.name] = valueNew
      // this.obj.style = ""
      // if(this.obj.hasOwnProperty('rule')!==-1 && this.obj.rule && this.obj.rule.constructor === Array){
      //   console.log("rule:",this.obj.rule)
      //   this.obj.rule.map(r=>{
      //     if(r.min && r.max
      //     && ( ~~valueNew>=~~r.min && ~~valueNew<=~~r.max ) ) {
      //       this.obj.style = r.style
      //     } else if(r.equal && r.equal === valueNew){
      //       this.obj.style = r.style
      //     } else if(r.equals && r.equals.indexOf(valueNew) !== -1){
      //       this.obj.style = r.style
      //     }
      //   })
      // }
      // this.$refs[this.obj.name].$refs.reference.$refs.input.style=this.obj.style

      // console.log("obj:",this.obj, this.$refs)

      // // this.$refs[this.obj.name].$refs.reference.$refs.input.focus()

      // this.$refs[this.obj.name].$children[0].$el.lastElementChild.focus()
    },
    obj: {
      handler(curVal, oldVal) {
        console.log("handler", curVal, oldVal);
        if (
          this.obj &&
          this.obj.hasOwnProperty("value") > -1 &&
          curVal.value != undefined
        ) {
          this.tableData = [];
          curVal.value.map(v => {
            // option
            this.tableData.push({ option: v });
          });
        }
        // if(this.obj && this.obj.hasOwnProperty('value')>-1 && curVal.value!=undefined &&curVal.value.constructor === Array){
        //   this.inputValue = curVal.value + ''
        // }
      },
      deep: true
    }
  },
  mounted() {
    let refName = this.obj.name; //+this.obj.type.toUpperCase()+(this.obj.title||this.obj.label)
    if (this.$refs[refName]) {
      this.$root.$refs[refName] = this.$refs[refName];
    }
    // tableData

    // console.log('inputMounted',this.$refs,this.$root.$refs)
    if (
      this.obj &&
      this.obj.hasOwnProperty("value") > -1 &&
      this.obj.value &&
      this.obj.value.constructor === Array
    ) {
      // this.obj['options'] = this.obj.value
      // tableData
      this.tableData = [];
      this.obj.value.map(v => {
        // option
        this.tableData.push({ option: v });
      });
    }
  },
  created() {},
  methods: {
    optionDelete(e, scope) {
      console.log(
        "optionDelete",
        e,
        scope,
        this.obj,
        this.property,
        this.formObj,
        this.tableData
      );
      // property.options[scope.$index]
      let option = scope.row.option;
      this.tableData = this.tableData.filter(r => r.option !== option);
      this.property.options = this.property.options.filter(r => r !== option);
    },
    optionAddNew(e) {
      console.log(
        "optionAddNew",
        e,
        this.addNewValue,
        this.obj,
        this.property,
        this.formObj,
        this.tableData
      );
      if (this.addNewValue) {
        if (this.addNewValue.indexOf(",") > -1) {
          let newArray = this.addNewValue.split(",");
          newArray.map(r => {
            if (r && this.property.options.indexOf(r) === -1) {
              this.property.options.push(r + "");
              this.tableData.push({ option: r + "" });
            }
          });
        } else {
          this.property.options.push(this.addNewValue + "");
          this.tableData.push({ option: this.addNewValue + "" });
        }
      }
      this.addNewValue = "";
    },
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
          child.dialog["callback"] = res => {
            console.log("表单填写结果", res);
          };
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
.el-checkbox, .is-bordered, .el-checkbox--small, .el-input, .el-input--small, .el-input-group, .el-input-group--prepend {
  margin: 5px 0px;
  vertical-align: bottom;
  width: 100%;
}

.el-table {
  margin: 10px 0px;
}

.option-list {
  display: flex;
  justify-content: space-between;
}

>>>.el-input__inner.el-input__inner.el-input__inner {
  width: 100%;
  border-radius: 0px;
  border: 0;
  background: transparent;
}

.table-label {
  margin-right: -6px;
  margin-left: 3px;
  vertical-align: super;
}

.add-button-table {
  border: 1px solid #ebeef5;
  font-size: 12px;
  margin-top: -11px;
  border-top: 0;
}
</style>
