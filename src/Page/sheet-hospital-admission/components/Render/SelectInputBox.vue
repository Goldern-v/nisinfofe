
<template>
  <span :ref="refName2" style="display:flex; align-items:center;" class="input-box">
    <!-- <autoComplete v-if="isShow" ref="autoInput" /> -->
    <!-- <el-input v-if="obj.type==='input'" v-model="checkboxValue" border size="small" :label="obj.title" :class="obj.class" :style="obj.style">{{obj.title}}</el-input> -->
    <span
      v-if="obj.label"
      :style="{width: obj.labelWidth, textAlign: 'right', paddingRight: '10px'}"
    >
      <span style="font-size: 12px;" :style="obj.labelStyle" :class="obj.labelClass">{{obj.label}}</span>
    </span>

    <!-- v-autoComplete="{dataList: obj.options, obj:formObj.model, key: obj.name}" -->
    <!-- :placeholder="obj.options && obj.options.length>0 ? (obj.options[0].name + '') : (obj.placeholder||'')"  || obj.type==='select' -->
    <el-input
      v-model="inputVal"
      :id="getUUID()"
      :ref="obj.name"
      :name="obj.name"
      v-if="['select','selectInput'].indexOf(obj.type)>-1 && !obj.children"
      placeholder="空"
      :class="obj.class||'select-cursor'"
      :style="[obj.style, obj.inputWidth && {width: obj.inputWidth}]"
      :size="obj.size||''"
      :type="obj.inputType||'text'"
      :disabled="!!obj.readOnly || isDisabled(obj)"
      v-bind="obj.props"
      @change="inputChange($event, obj)"
      @dblclick.native.stop="inputdbClick($event, obj)"
      @click.stop="inputClick($event, obj)"
      @focus="inputFocus($event, obj)"
      @keydown.native="inputKeyDown($event, obj)"
      :readonly="obj.selectOnly"
    >
      <span class="pre-text" v-if="obj.prefixDesc" slot="prepend">{{obj.prefixDesc}}</span>
      <!-- <span slot="append"> -->
      <!-- <i
        slot="append"
        v-if="obj.options&&!obj.suffixDesc"
        @click.prevent.stop="iconClick"
        class="el-input__icon el-icon-caret-top"
        :style="isShowDownList?'transform: translateY(-50%)!important;':''"
      ></i>-->
      <span slot="append" class="post-text" v-if="obj.suffixDesc">{{obj.suffixDesc}}</span>
      <!-- </span> -->
      <!-- <template slot="append" v-if="obj.options"> -->
      <!-- </template> -->
    </el-input>
    <!-- <span>{{this.formObj.model[this.obj.name] + ':' + inputVal}}</span> -->
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import { setTimeout } from "timers";
import bus from "vue-happy-bus";
import {入院默认值, defaultFS_adult, defaultFS_child} from '@/Page/sheet-hospital-admission/components/data/defalutValue/入院评估.js'
// import autoComplete from "./autoComplete.vue"

export default {
  name: "SelectInputBox",
  props: {
    obj: Object,
    getOtherText: String,
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
  components: {
    // autoComplete
  },
  data() {
    return {
      inputValue: "",
      isShow: true,
      isFirstClick: true,
      isShowDownList: false,
      readOnly: false,
      bus: bus(this),
      refName2: 'selectInputBox' + this.obj.name + this.obj.title
    };
  },
  computed: {
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0001";
    },
    inputVal: {
      get() {
        return this.inputValue || this.formObj.model[this.obj.name]
      },
      set(val) {
        this.inputValue = val
      }
    }
  },
  watch: {
    inputValue(valueNew, oldvaule) {
      this.formObj.model[this.obj.name] = valueNew;
      // window.formObj.model[this.obj.name] = valueNew;
      this.checkValueRule(valueNew);
      this.isShowDownList = false;
      // return valueNew;
    },
    'formObj.model'(newValue){
      // this.inputValue = this.formObj.model.id ? this.formObj.model[this.obj.name] : window.formObj.model[this.obj.name] ;
      if(this.obj.formCodeArr){
        let flag = this.obj.formCodeArr.find(item=>this.formObj.model[item])
        if(!flag){
          let defaultObj =  (process.env.HOSPITAL_ID === 'foshanrenyi'||process.env.HOSPITAL_ID === 'nfyksdyy') ? (this.formCode === 'E2332' ? defaultFS_adult : defaultFS_child) : 入院默认值
          this.inputValue= defaultObj[this.obj.name] || ""
          this.formObj.model[this.obj.name] = defaultObj[this.obj.name] || ""
        }
      }else this.inputValue = this.formObj.model.id ? this.formObj.model[this.obj.name] : window.formObj.model[this.obj.name] ;
    }
  },
  mounted() {
    let refName = this.obj.name; //+this.obj.type.toUpperCase()+(this.obj.title||this.obj.label)
    this.readOnly = this.obj.readOnly ? this.obj.readOnly : false;
    if (this.$refs[refName]) {
      this.$refs[refName]["childObject"] = this.obj;
      this.$refs[refName]["checkValueRule"] = this.checkValueRule;
      this.$root.$refs[this.formCode][refName] = this.$refs[refName];
    }
    if (this.$refs[this.refName2]) {
      this.$root.$refs[this.formCode][this.refName2] = this.$refs[this.refName2];
    }
    //vue-happy-bus添加修改inputvalue方法
    this.bus.$on(`updateValue${this.obj.name}`,()=>{
      this.inputValue = this.formObj.model[this.obj.name]
    });

    // if(this.obj && this.obj.hasOwnProperty('value')>-1 && this.obj.value &&this.obj.value.constructor === Array){
    //   this.obj['options'] = this.obj.value
    // }
  },
  created() {
    let refName = this.obj.name + "";
    let dictionary = {};
    if (window.formObj && window.formObj.hasOwnProperty("dictionary")) {
      dictionary = window.formObj.dictionary;
    }
    if (this.formObj && this.formObj.hasOwnProperty("dictionary")) {
      dictionary = this.formObj.dictionary;
    }
    let options = dictionary[refName] ? dictionary[refName] : this.obj.options;
    if (options && options.length > 0) {
      if (options[0].constructor === Object) {
        this.obj.options = options;
      } else {
        this.obj.options = [];
        options.map(item => {
          this.obj.options.push({ name: item, code: item, pinyin: "" });
        });
      }
    }
    if (
      !this.obj.hasOwnProperty("options") ||
      (this.obj.hasOwnProperty("options") &&
        this.obj.options.length === 0 &&
        !this.formObj.dictionary[refName])
    ) {
      this.obj["options"] = [{ name: "未测量", code: "未测量", pinyin: "wcl" }];
    }
  },
  beforeDestroy(){
    this.inputValue = null
  },
  methods: {
    checkValueRule(valueNew, isClick, itemClick = null) {
      let textResult = valueNew;
      this.inputValue = valueNew
      this.obj.style = "";
      if (
        this.obj.hasOwnProperty("rule") !== -1 &&
        this.obj.rule &&
        this.obj.rule.constructor === Array
      ) {
        const openKeys = this.obj.rule.filter(item => item.dialog).map(item => item.dialog.openKey)
        // 遍历规则
        this.obj.rule.map(r => {
          let [min, max] = [Number(r.min), Number(r.max)];
          let value = Number(valueNew);
          min = min === NaN ? 0 : min;
          max = max === NaN ? 0 : max;
          value = value === NaN ? 0 : value;
          // 判断规则
          if (r.min && r.max && (value >= min && value < max)) {
            // console.log(value, r.min, r.max,  r.style)
            this.obj.style = r.style;
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.equal && r.equal === valueNew) {
            this.obj.style = r.style;
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.equals && valueNew && valueNew.indexOf(r.equals) !== -1) {
            this.obj.style = r.style;
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (
            r.diff &&
            (r.diff != valueNew || r.diff.indexOf(valueNew) == -1)
          ) {
            this.obj.style = r.style;
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.scoreMin || r.scoreMax) {
            let [scoreMin, scoreMax] = [Number(r.scoreMin), Number(r.scoreMax)];
            let score = Number(valueNew.split("分")[0]);
            scoreMin = scoreMin === NaN ? 0 : scoreMin;
            scoreMax = scoreMax === NaN ? 0 : scoreMax;
            score = score === NaN ? 0 : score;
            if (
              r.scoreMin &&
              r.scoreMax &&
              (score >= scoreMin && score <= scoreMax)
            ) {
              this.obj.style = r.style;
            }
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.indexOfScore && r.scoreStrMin && r.scoreStrMax) {
            let [scoreMin, scoreMax] = [Number(r.scoreStrMin), Number(r.scoreStrMax)];
            let score = valueNew && Number(valueNew.replace(/[^\d]/g, ''));
            scoreMin = scoreMin === NaN ? 0 : scoreMin;
            scoreMax = scoreMax === NaN ? 0 : scoreMax;
            score = score === NaN ? 0 : score;
            if (
              r.scoreStrMin &&
              r.scoreStrMax &&
              (score >= scoreMin && score <= scoreMax)
            ) {
              if (r.ScoreOpenkey){
                // 莫得办法了 添加成功 就在循环编列了一次  一直取rule最后一条  也有想过把判断添加到对应的 relationForm 但这样子就会打不开关联表单（阿弥陀佛）
                if (valueNew.indexOf('有,Autar评估表') > -1 && score > 10) {
                  this.obj.style = r.style
                }
                if (valueNew.indexOf('有,Capiric评估表') > -1) {
                  this.obj.style = r.style
                }
              } else
                this.obj.style = r.style;
            }
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.dialog && isClick) {
            const last = valueNew.split(',').reverse().find(v => {
              return openKeys.find(key => v === key)
            })
            if (
              valueNew == r.dialog.openKey ||
              (valueNew && r.dialog.openKey.indexOf(valueNew) > -1) ||
              (r.dialog.openDiffKey &&
                r.dialog.openDiffKey.indexOf(valueNew) == -1) ||
              // (itemClick &&
              //   (r.dialog.openKey + "").includes(itemClick) &&
              //   (valueNew + "").includes(r.dialog.openKey + "")) ||
              // (itemClick && (itemClick + "").includes(r.dialog.openKey + "")) ||
              (itemClick && last && (Array.isArray(r.dialog.openKey) ? r.dialog.openKey.includes(last) : last === r.dialog.openKey))
            ) {
              this.$root.$refs.dialogBox.openBox(
                r.dialog.dialogList || r.dialog
              );
              //
              if (this.$root.$refs.autoInput) {
                this.$root.$refs.autoInput.closeBox();
              }
            }
            // || r.dialog.cleanKeyDiff !== valueNew
            else if (
              valueNew == r.dialog.cleanKey ||
              r.dialog.cleanKey.indexOf(valueNew) > -1 ||
              (r.dialog.hasOwnProperty("cleanKeyDiff") !== -1 &&
                r.dialog.cleanKeyDiff !== valueNew)
            ) {
              /** 清空 */
              // let obj = this.formObj.dialogs.find(
              //   f => f.title == r.dialog.title
              // );
              let obj = this.formObj.dialogs[r.dialog.title] || null;

              if (obj && obj.children) {
                obj.children.forEach(item => {
                  this.formObj.model[item.name] = "";
                });
              }
              if (obj && obj.body) {
                obj.body.forEach(b => {
                  if (b && b.children) {
                    b.children.forEach(item => {
                      this.formObj.model[item.name] = "";
                    });
                  }
                });
              }
            }
          }
          /*规则：关联表单*/
          else if (r.relationForm && isClick) {
            if (
              valueNew == r.relationForm.openKey ||
              r.relationForm.openKey.indexOf(valueNew) > -1 ||
              (r.relationForm.openDiffKey &&
                r.relationForm.openDiffKey.indexOf(valueNew) == -1) ||
              (itemClick &&
                (r.relationForm.openKey + "").includes(itemClick) &&
                (valueNew + "").includes(r.relationForm.openKey + "")) ||
              (itemClick && (itemClick + "").includes(r.relationForm.openKey + ""))
            ) {
              /**评估单需要的公共数据,不一定齐全，如有需要自行补全*/
              const {
                patientName,
                deptName,
                deptCode,
                visitId,
                patientId,
                diagnosis,
                sex,
                bedLabel,
                inpNo,
                age,
              } = this.formObj.model;
              const query = {
                patientName,
                deptName,
                deptCode,
                visitId,
                patientId,
                diagnosis,
                sex,
                bedLabel,
                inpNo,
                age,
                id: this.formObj.model[r.relationForm.params.formCode] //关联表单id
              };
              const params = {
                formId: this.formObj.model[r.relationForm.params.formCode] || "",
                showSignBtn: true,
                query,
                ...r.relationForm.params,
                valueNew,
                TSInputVal: this.TSInputVal // 记录下拉前的值  为了点击关联表单又取消 上一次的值消失
              };
              this.$root.bus.$emit('showRelationFormModal',params)

            }
          }
          /**回显光标定位*/
          else if(r.cursorReposition && isClick) {
            let positionList = r.cursorReposition.find(item => {return item.value === valueNew })
            let target = this.$refs[this.obj.name].$refs.input
            if(positionList) {
              target.focus();
              this.$nextTick(()=>{
                target.setSelectionRange(positionList.position, positionList.position);
              })
            }
          }
        });
      } else {
        return;
      }
      try {
        this.$refs[this.obj.name].$refs.input.style = this.obj.style;
      } catch (error) {
      }
      return textResult;
    },
    inputBlur(e) {
      // setTimeout(() => {
      // if(this.$root.$refs.autoInput){
      // this.$root.$refs.autoInput.closeBox()
      // this.isShowDownList = false
      // }
      // }, 1);
      // this.isShow = false
    },
    iconClick(e) {
      let target = this.$refs[this.obj.name].$refs.input;
      target.focus();
      // this.openAutoCompleteBox(target)
      // this.inputFocus(e, child)
      // this.isShowDownList = !this.isShowDownList
      if (this.isFirstClick) {
        this.isFirstClick = false;
      } else {
        this.isShowDownList = !this.isShowDownList;
      }
      setTimeout(() => {
        // this.$root.$refs.autoInput.switch()
        this.openAutoCompleteBox(target);
        // if (!this.isShowDownList) {
        //   this.openAutoCompleteBox(target);
        //   this.isShowDownList = true;
        // } else {
        //   this.$root.$refs.autoInput.close();
        //   this.isShowDownList = false;
        // }
      }, 100);
    },
    inputClick(e, child) {
      if (this.readOnly) {
        return;
      }
      let target = this.$refs[this.obj.name].$refs.input;
      // if(e.target.tagName!=='INPUT'){
      // target.focus()
      // this.openAutoCompleteBox(target)
      // return
      // }
      // this.$root.$refs.autoInput.switch()
      // setTimeout(() => {

      if (this.isFirstClick) {
        this.isFirstClick = false;
      } else {
        this.isShowDownList = !this.isShowDownList;
      }

      this.openAutoCompleteBox(target);
      // if (this.isShowDownList) {
      //   // this.inputFocus(e, child)
      //   this.openAutoCompleteBox(target);
      //   this.isShowDownList = true;
      // } else {
      //   this.$root.$refs.autoInput.close();
      // }

      // }, 1);
    },
    inputFocus(e, child) {
      this.TSInputVal = this.inputVal
      let target = this.$refs[this.obj.name].$refs.input;

      if (this.$refs[this.obj.name]) {
        this.$refs[this.obj.name].$el.style.outline = "none";
        this.$refs[this.obj.name].$el.style.backgroundColor = "transparent";
      }

      // if(e.target.tagName!=='INPUT'){
      //   let target = this.$refs[this.obj.name].$refs.input
      //   target.focus()
      //   return
      // }
      // if(e.target.parentNode.id === window.document.getSelection().focusNode.id){return}
      this.openAutoCompleteBox(target);
    },
    openAutoCompleteBox(target) {
      // let self = this
      if (this.readOnly) {
        return;
      }
      let xy = target.getBoundingClientRect();
      let delt = xy.height;

      if (this.obj.options) {
        let dataList = this.obj.options;
        let key = this.obj.name;
        let obj = this.formObj.model;
        let multiplechoice = this.obj.multiplechoice
          ? this.obj.multiplechoice
          : false;
        if (this.$root.$refs.autoInput) {
          this.isShowDownList = true;
          this.$root.$refs.autoInput.open({
            obj: obj,
            multiplechoice: multiplechoice,
            parentEl: target,
            currentValue: this.inputValue,
            style: {
              top: `${xy.top + delt}px`,
              left: `${xy.left}px`,
              width: `${xy.width}px`,
              "min-width": "max-content"
            },
            selectedList: obj[key] ? obj[key].split(",") : [],
            data: dataList,
            callback: data => {
              if (obj && data) {
                // 单选
                if (!multiplechoice || multiplechoice == false) {
                  // obj[key] = data;
                    this.inputValue = null;
                    this.$nextTick(()=>{
                      obj[key] = data.code;
                      this.inputValue = data.name;
                      this.checkValueRule(data.name, true);
                    // if (target.hasOwnProperty("$rightNode")) {
                      //   target.$rightNode.focus();
                    // }
                      this.$forceUpdate()
                    })
                }
                // 多选
                if (multiplechoice === true) {
                  let values = obj[key] ? obj[key].split(",") : [];
                  // 新增选项
                  if (!obj[key] || obj[key].indexOf(data.code) === -1) {
                    // values.push(data.code);
                    values = [...values, data.code];
                  } else if (obj[key] && obj[key].indexOf(data.code) > -1) {
                    // 反选选项
                    values = values.filter(v => {
                      return v != data.code;
                    });
                  }
                  obj[key] = values + "";
                  this.inputValue = obj[key] + "";
                  this.checkValueRule(obj[key], true, data.code);
                  target.focus();
                }
              }
              if (target.tagName !== "INPUT") {
                target.innerText = obj[key] + "";
              }
              //
              // if (data) {
              //   obj[key] = data.code;
              //   this.inputValue = data.name;
              //   this.checkValueRule(data.name, true);
              //   if (target.tagName !== "INPUT") {
              //     target.innerText = data.name;
              //   }
              //   if (target.tagName === "INPUT") {
              //     target.value = data.name;
              //   }
              // }
              // // target.focus();
              // // this.isShowDownList = false
              // return false;
            },
            id: key
          });
        }
      }
    },
    inputChange(e, child) {
    },
    inputdbClick(e, child) {
      if (child.dialog) {
        try {
          // this.$root.$refs.dialogBox.$el.draggable = true
          this.$root.$refs.dialogBox.openBox(child.dialog, this.inputValue); //$el draggable
        } catch (error) {
        }
      }
    },
    inputKeyDown(e, child) {
      console.log(child, "获取下拉值")
      if (
        e.keyCode === 37 &&
        e.target.selectionStart === 0 &&
        e.target.$leftNode
      ) {
        // ArrowLeft
        e.target.$leftNode.focus();
        this.isShowDownList = false;
      } else if (
        e.keyCode === 39 &&
        e.target.selectionEnd === e.target.value.length &&
        e.target.$rightNode
      ) {
        // ArrowRight
        // if(e.target.$rightNode){
        e.target.$rightNode.focus();
        this.isShowDownList = false;
        // }
      } else if (e.keyCode === 13) {
        // 13 Enter
        // this.isShowDownList = false
        setTimeout(() => {
          if (!this.$root.$refs.autoInput.getStatus() && e.target.$rightNode) {
            e.target.$rightNode.focus();
            // this.openAutoCompleteBox(e.target.$rightNode)
          }
        }, 100);

        // this.$root.$refs.autoInput.close()
      }
      // else if([38,40].indexOf(e.keyCode)===-1){
      //   this.inputFocus(e, child)
      // }
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

.input-box
  font-size 12px
  &:focus,:ative
    outline none
    border 1px solid #4baf8d

.el-checkbox,
.el-select,
.is-bordered,
.el-checkbox--small,
.el-input,
.el-input--small,
.el-input-group,
.el-input-group--prepend
  margin: 5px 1px;
  vertical-align: bottom;
  width: calc(100% - 2px);
  &:hover
    outline 1px solid #4baf8d
    border none
  &:focus
    outline none
    border 1px solid #4baf8d
  &:placeholder
    color: #dbe6e4;

.select-box-small
  width 65px!important
  vertical-align super

.select-label
  margin-right: -4px;
  margin-left: 4px;
  vertical-align: super;

.select-cursor
  cursor pointer

>>>.el-input__inner.el-input__inner.el-input__inner
  width 100%
  border-radius 0px
  cursor pointer
  color blue
  padding: 0px 5px!important;
  height: 22px!important;
  background: transparent;

  &:focus
    outline none
    border 1px solid #4baf8d
    // background #dfffdf
  &:placeholder
    color: #dbe6e4;

  &:read-only
    cursor: no-drop!important;
    color: black!important;
    background:rgb(238, 246, 245);

// .el-input
//   width: 172px;

.pre-text, .post-text, >>>.el-input-group__append
  color #486a62
  background: white;
  border-radius: 0;

  // i.el-input__icon.el-icon-caret-top.is-reverse

.el-input__icon
  position: absolute;
  width: 35px;
  height: 35px;
  right: 0;
  top: 0;
  text-align: center;
  color: rgb(191, 217, 210);
  transition: all .3s

.el-input__icon
  color: rgb(191, 217, 210);
  font-size: 12px;
  transition: transform .3s;
  -ms-transform: translateY(-50%) rotate(180deg);
  transform: translateY(-50%) rotateZ(180deg);
  line-height: 16px;
  top: 50%;
  cursor: pointer;
  width: 100%;
  height: auto;
  &.is-reverse
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);

.el-icon-caret-top:before
    content: "\E607";

.el-input__icon:after
    content: '';
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle;

i {
  background: transparent;
  .is-reverse{
    -ms-transform: translateY(-50%)!important;
    transform: translateY(-50%)!important;
  }
}

.post-text {
  margin -8px -14px -8px -10px;
  padding 8px 12px 8px 10px
  background #fff
}
>>>.el-input:hover {
  .post-text {
    border-left 1px solid #4baf8d
    background #eef5f5
  }
}
</style>

<style lang="scss">
.main-page {
  td:hover {
    .post-text {
      background: #eef5f5;
    }
  }
}
</style>
