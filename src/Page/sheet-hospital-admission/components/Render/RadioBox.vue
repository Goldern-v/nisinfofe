<template>
  <span style="margin: 0 0px 0 0;">
    <!-- !!单选!! -->
    <!-- <TipsBox :obj='obj'  :formObj="formObj"> -->
    <!-- :ref="obj.name+obj.type.toUpperCase()+obj.title||obj.label" -->
    <span :id="obj.name" v-if="obj.prefix" style="font-size: 12px">{{obj.prefix}}</span>
    <el-checkbox
      :ref="obj.title||obj.label"
      :name="obj.name||obj.code"
      v-model="checkboxValue"
      border
      @click.native.stop="checkboxClick"
      :size="obj.size||'small'"
      :label="obj.code || obj.title"
      :class="obj.class"
      :style="obj.style"
    >{{ obj.title }}</el-checkbox>
    <!-- </TipsBox> -->
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import TipsBox from "./TipsBox";

export default {
  name: "RadioBox",
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
      } catch (error) {
      }
      return "E0001";
    }
  },
  watch: {
    checkboxValue(valueNew, oldvaule) {
      // this.formObj.model[this.obj.name] = valueNew +'';
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
    let refName = this.obj.title || this.obj.label; //this.obj.name +this.obj.type.toUpperCase() +(this.obj.title || this.obj.label);
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = []; //new Array();
    }

    if (!this.$root.$refs[this.formCode][this.obj.name]) {
      this.$root.$refs[this.formCode][this.obj.name] = []; //new Array();
    }

    if (this.$refs[refName]) {
      // if(this.obj.defaultValue !== undefined && this.obj.defaultValue===true){
      //   // model
      //   this.formObj.model[this.obj.name] = refName
      //   this.$refs[refName].model = []
      //   this.$refs[refName].model.push(refName)
      //   console.log('this.obj.defaultValue',this.obj.defaultValue,this.obj,this.$refs[refName])
      // }
      if (this.obj.defaultValue) {
        this.checkboxValue = this.obj.defaultValue;
      }
      this.$refs[refName]["runTasks"] = this.runTasks;
      this.$refs[refName]["childObject"] = this.obj;
      this.$root.$refs[this.formCode][this.obj.name][refName] = this.$refs[
        refName
        ];
    }
  },
  created() {
  },
  methods: {
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    checkboxClick(e) {
      if (e.target.tagName !== "INPUT") {
        return;
      }

      if (this.$refs[this.refName]) {
        this.$refs[this.refName].$parent.$parent.$parent.$el.style.outline =
          "none";
        this.$refs[
          this.refName
          ].$parent.$parent.$parent.$el.style.backgroundColor = "transparent";
      }

      let rootRefs = this.$root.$refs[this.formCode][this.obj.name];
      console.log("--obj.name:", this.obj.name, rootRefs, this.$root.$refs);
      // if (!rootRefs || !this.obj || !this.obj.name) {
      //   return;
      // }
      for (const key in rootRefs) {
        if (rootRefs.hasOwnProperty(key) > -1) {
          let item = rootRefs[key];
          if (item && typeof item == "object") {
            // , item && item.childObject && item.childObject.title
            console.log(
              "-----typeof:",
              typeof item,
              item,
              key,
              rootRefs,
              rootRefs[key]
            );
            // if(item && typeof item.constructor !== 'object'){
            //   continue
            // }

            // item &&
            // item.constructor === "object" &&
            // item.hasOwnProperty("childObject") &&
            if (item.childObject && item.childObject.title !== this.obj.title) {
              // console.log('---++',item.childObject.title ,item)
              item.model = [];
              // this.$root.$refs[this.formCode][this.obj.name][key].model = [];
            }
          }
        }
      }

      // if(this.$root.$refs[this.formCode][this.obj.name]){
      // this.$root.$refs[this.formCode][this.obj.name].map(item=>{
      //   console.log('-----',item.childObject.title ,item)
      //   if(item.childObject.title !== this.obj.title){
      //     console.log('---++',item.childObject.title ,item)
      //     item.value = []
      //   }
      // })
      // }
      // if (e.target.checked !== undefined) {
      // console.log("checkboxClick", e.target.checked, e, this.obj,this.obj.name,this.$refs,this.$root.$refs);
      // console.log(this.$refs[this.obj.title].checked , this.$refs[this.obj.title].isChecked , this.$refs[this.obj.title].value)
      // }

      // if(!this.formObj.selectedItems){
      //   this.formObj.selectedItems=[]
      // }

      let index = -1;

      if (this.formObj.selectedItems) {
        index = this.formObj.selectedItems.findIndex(c => {
          return c.name === this.obj.name && c.title === this.obj.title;
        });

        if (index === -1) {
          this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
            return c.name !== this.obj.name;
          });
          if (this.formObj.selectedItems) {
            this.formObj.selectedItems.push(this.obj);
          }
        }
      }
      if (this.$refs[this.obj.title].isChecked) {
        if (this.formObj.selectedItems) {
          this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
            return c.name !== this.obj.name;
          });
          console.log("取消选中", "index", index, this.formObj.selectedItems);
        }
        this.formObj.model[this.obj.name] = "";
      } else {
        this.formObj.model[this.obj.name] = this.obj.code || this.obj.title;
      }

      //
      //
      let score = 0;
      let sumdata = 0;
      let str = ''
      // 计算总分
      if (this.formObj.selectedItems) {
        this.formObj.selectedItems.map(item => {
          if(this.formObj.formSetting && this.formObj.formSetting.formInfo.formCode == 'E0616'){
          score =  (this.formObj.model["I616001"]?this.formObj.model["I616001"]:"_")+"+"+(this.formObj.model["I616002"]?this.formObj.model["I616002"]:"_")+"+"+(this.formObj.model["I616003"]?this.formObj.model["I616003"]:"_")
          return score
          }else{
            score += ~~item.score;
          }
        });
      }
      //
      this.formObj.model["evalScore"] = score;
      //
      if (this.$root.$refs[this.formCode]["evalScore"]) {
        try {
          this.formObj.model["evalScore"] = score;
          this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(score);
          let textResult = this.$root.$refs[this.formCode][
            "evalDesc"
            ].checkValueRule(score);
          this.formObj.model["evalDesc"] = textResult + "";
          this.$root.$refs[this.formCode]["evalDesc"].setCurrentValue(
            textResult
          );
          this.$root.$refs[this.formCode]["evalDesc"].checkValueRule(
            textResult
          );
        } catch (error) {
          console.log(error);
        }
      }
      //

      this.runTasks();
      //
      // this.$forceUpdate();
      // this.$root.$forceUpdate();
      // console.log(this.$root,this)
      //
      // 评估得分：0-20分完全依赖；20-40分严重依赖；40-60分明显依赖；＞60分基本自理
      //
      // console.log(
      //   "radioClicked",
      //   e,
      //   "obj:",
      //   this.obj,
      //   "formObj:",
      //   this.formObj,
      //   "selectedItems",
      //   this.formObj.selectedItems,
      //   this.formObj.model,
      //   e.target.tagName,
      //   e.target.checked,
      //   "index",
      //   index,
      //   "score",
      //   score
      // );

    },
    runTasks(init = false) {
      let obj = []
      if (this.HOSPITAL_ID === 'foshanrenyi' && !this.obj.tasks) {
        // 成人
        if (this.formCode === "E2332") {
          obj = [
            {
              id: 'I2332012',
              value: '有：',
              correlationID: "I2332013"
            },
            {
              id: 'I2332084',
              value: '活动受限：',
              correlationID: "I2332085"
            },
            {
              id: 'I2332084',
              value: '肌力',
              hiddenformGroupColBox: true,
              correlationID: "肌力Label3"
            },
            {
              id: 'I2332098',
              value: '有',
              hiddentipsBox: true,
              correlationID: "I2332099部位"
            },
            {
              id: 'I2332149',
              value: 'PICC：',
              correlationID: "I2332152"
            },
            {
              id: 'I2332124',
              value: '有',
              correlationID: "I2332125",
              prefixId: "I2332125",
            },
            {
              id: 'I2332124',
              value: '有',
              correlationID: "I2332211"
            },
            {
              id: 'I2332124',
              value: '有',
              correlationID: "I2332126"
            },
            {
              id: 'I2332127',
              value: '异常：',
              correlationID: "I2332212"
            },
            {
              id: 'I2332101',
              value: '有：',
              correlationID: "I2332231"
            },
            {
              id: 'I2332102',
              value: '有：',
              correlationID: "I2332232"
            },
            {
              id: 'I2332102',
              value: '有：',
              inp: true,
              correlationID: "I2332103",
              prefixId: "I2332103",
            },
            {
              id: 'I2332102',
              value: '有：',
              inp: true,
              correlationID: "I2332104"
            },
            {
              id: 'I2332060',
              value: '有：',
              hiddenInputBox: true,
              correlationID: "I2332250部位："
            },
            {
              id: 'I2332060',
              value: '有：',
              hiddenSelectBox: true,
              correlationID: "I2332062性质"
            },
            {
              id: 'I2332060',
              value: '有：',
              hiddenSelectBox: true,
              correlationID: "I2332061程度"
            },
          ]
        }else{
          obj = [
            {
              id: 'I2333075',
              value: '有：',
              inp: true,
              prefixId: "I2333078",
              correlationID: "I2333076"
            },
            {
              id: 'I2333075',
              value: '有：',
              correlationID: "I2333077",
              prefixId: "I2333077"
            },
            {
              id: 'I2333075',
              value: '有：',
              correlationID: "I2333078",
              prefixId: "I2333078"
            },
            {
              id: 'I2333114',
              hiddenCheckBox: true,
              excludeVal:["异常", '正常', '其他'],
              value: '异常',
              correlationID: "I2333114"
            },
          ]
        }
        // if(this.HOSPITAL_ID === 'nfyksdyy' && !this.obj.tasks){
        //   obj=[
        //     {
        //       id: 'I2332045',
        //       value: '有',
        //       hiddenInputBox: true,
        //       correlationID: "I2332042疼痛部位"
        //     },
        //   ]
        // }
        if (obj.length > 0) {
          obj.forEach(item => {
            // input类型
            if(!this.formObj.model[item.id]) return

            if (item.inp) {
              let inp = this.$root.$refs[this.formCode][item.correlationID]
              inp.$el.style = this.formObj.model[item.id] !== item.value ? "display: none" : "display: inlink-block"
              if (item.prefixId) document.getElementById(item.prefixId).style = this.formObj.model[item.id] !== item.value ? "display: none" : "display: inlink-block"

            }else if(item.hiddenformGroupColBox){
              let formGroupColBox = this.$root.$refs[this.formCode]['formGroupColBox' + item.correlationID]
              formGroupColBox.style.display = (!this.formObj.model[item.id].includes(item.value)) ? "none" : "block"
            }else if(item.hiddentipsBox){
              let hiddentipsBox = this.$root.$refs[this.formCode]['tipsBox' + item.correlationID]
              hiddentipsBox.style.display = (!this.formObj.model[item.id].includes(item.value)) ? "none" : "block"
            } else if(item.hiddenInputBox){
              let hiddenInputBox = this.$root.$refs[this.formCode]['inputBox' + item.correlationID]
              hiddenInputBox.parentNode.style.display = (!this.formObj.model[item.id].includes(item.value)) ? "none" : "inline-block"
            } else if(item.hiddenSelectBox){
              let hiddenSelectBox = this.$root.$refs[this.formCode]['selectInputBox' + item.correlationID]
              hiddenSelectBox.parentNode.style.display = (!this.formObj.model[item.id].includes(item.value)) ? "none" : "inline-block"
            } else if (item.hiddenCheckBox) {
              if(this.formObj.model[item.id]){
                let hiddenCheckBox = this.$root.$refs[this.formCode][item.correlationID]
                Object.keys(hiddenCheckBox).forEach(checkbox=>{
                  if(!item.excludeVal.includes((checkbox))){
                    hiddenCheckBox[checkbox].$parent.$el.parentNode.style.display =
                      !this.formObj.model[item.id] || !this.formObj.model[item.id].includes(item.value) ? "none" : "flex"
                  }
                })
              }
            } else {
              let elArr = Object.values(this.$root.$refs[this.formCode][item.correlationID])
              if (elArr.length > 0) {
                elArr.forEach(it => {
                  it.$el.style = this.formObj.model[item.id] !== item.value ? "display: none" : "display: inlink-block"
                  if (item.prefixId) document.getElementById(item.prefixId).style = this.formObj.model[item.id] !== item.value ? "display: none" : "display: inlink-block"
                })
              }

            }
          })
        }
      }


      //
      if (this.obj.tasks) {

        // 特殊处理  tasks_special为true 点击 this.obj.tasks 这个配置字段的隐藏 其余显示
        if (this.obj.tasks_special) {
          if (this.obj.title === this.obj.tasks) {
            this.$root.$refs[this.formCode][
            "formGroupColBox" + this.obj.tasks
              ].hidden = true;
          } else {
            this.$root.$refs[this.formCode][
            "formGroupColBox" + this.obj.tasks
              ].hidden = false;
          }
          return
        }

        if (
          !this.$root.$refs[this.formCode][this.obj.name][this.obj.title]
            .isChecked
        ) {
          // this.obj.tasks.checked.clean
          try {
            this.obj.tasks.map(task => {
              // let clean = task.clean
              // clean.map(c=>{
              //   this.$root.$refs[this.formCode]['formGroupColBox'+c].hidden = true
              // })
              if (task.clean) {
                if (task.clean.constructor == Array) {

                  task.clean.map(c => {
                    if (this.$root.$refs[this.formCode]["formGroupColBox" + c]) {
                      this.$root.$refs[this.formCode]["formGroupColBox" + c].hidden = true;
                    }
                  });
                } else {
                  if (this.$root.$refs[this.formCode]["formGroupColBox" + task.clean]) {
                    this.$root.$refs[this.formCode]["formGroupColBox" + task.clean].hidden = true;
                  }
                }
              }

              if (task.show) {
                if (task.show.constructor == Array) {
                  task.show.map(c => {
                    if (this.$root.$refs[this.formCode]["formGroupColBox" + c]) {
                      this.$root.$refs[this.formCode]["formGroupColBox" + c].hidden = false;
                    } else if (this.$root.$refs[this.formCode][c]) {
                      this.$root.$refs[this.formCode][c].hidden = false;
                    }
                  });
                } else {
                  if (this.$root.$refs[this.formCode]["formGroupColBox" + task.show]) {
                    this.$root.$refs[this.formCode]["formGroupColBox" + task.show].hidden = false;
                  }
                }
              }
            });
          } catch (error) {
            console.log("tasks:error", error, this.obj);
          }
        }
      }

      if (init && this.obj.showName) {
        if (this.obj.showName !== this.obj.title.trim()){
          this.$root.$refs[this.formCode][
          "formGroupColBox" + this.obj.showName
            ].hidden = false;
        }
      }

      if (this.$root.$refs[this.formCode]["formGroupColBox" + this.obj.title]) {
        if (this.formObj.model[this.obj.name] === this.obj.title) {
          this.$root.$refs[this.formCode][
          "formGroupColBox" + this.obj.title
            ].hidden = false;
        } else {
          this.$root.$refs[this.formCode][
          "formGroupColBox" + this.obj.title
            ].hidden = true;
        }
      }
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
  /* display: flex; */
  display: inline-block;
}

.el-checkbox >>> .el-checkbox__label {
  padding-top: 2px;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

>>> .el-checkbox__label
  font-size 12px !important;
  padding-left: 5px;
  padding-right: 5px;

>>> .el-checkbox__inner
  border-radius 15px !important;
  width: 15px;
  height: 15px;
  border-color: #4bb08d !important;

>>> .el-checkbox__inner::after
  border 2px solid #fff;
  border-left: 0;
  border-top: 0;
  left: 3px;
  top: 0px;

>>> .el-checkbox__input.is-checked + .el-checkbox__label
  color: #333 !important;

</style>
