
<template>
  <span style="margin: 0; display: flex; align-items: center">
    <!-- {{formObj.model}} -->
    <!-- <TipsBox :obj='obj'  :formObj="formObj"> obj.name+obj.type.toUpperCase()+obj.title||obj.label-->
    <span :id="obj.name" style="font-size: 12px" v-if="obj.prefix">{{obj.prefix}}</span>
    <el-checkbox
      :ref="refName"
      :name="obj.code || obj.name || obj.title"
      v-if="obj.type==='checkbox'"
      v-model="checkboxValue"
      border
      @click.native.stop="(e) => checkboxClick(e, obj.name)"
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
      return "E0001";
    }
  },
  watch: {
    checkboxValue(valueNew, oldvaule) {
      if(this.formCode == 'E1316' && this.formObj.model.I1316020){
        this.$root.$refs[this.formCode]["evalScore"].setCurrentValue('45');
        this.$root.$refs[this.formCode]["evalDesc"].setCurrentValue('跌倒高风险');
      }

      if(this.formCode == 'E1316' && !this.formObj.model.I1316020){
        let scoreList = ["I1316001","I1316002","I1316003","I1316004","I1316006","I1316038"]
        let Score =  scoreList.reduce((pro,cur) =>{
            return pro + parseInt(this.formCode.model[cur])
        },0)
        this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(Score);
      }
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

    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = new Array();
    }

    if (!this.$root.$refs[this.formCode][this.obj.name]) {
      this.$root.$refs[this.formCode][this.obj.name] = new Array();
    }

    if (this.$refs[this.refName]) {
      // this.$refs[this.refName].model = []
      // this.$refs[this.refName].model.push(this.refName)
      // this.$refs[this.refName].store = this.refName
      // this.$refs[this.refName].store.push(this.refName)
      this.$refs[this.refName]["runTasks"] = this.runTasks;
      this.$refs[this.refName]["childObject"] = this.obj;
      // this.$refs[this.refName]['checkboxValue'] = this.checkboxValue
      // if(this.obj.defaultValue){
      //   this.checkboxValue = this.obj.defaultValue
      // }
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
    runTasks(init = false) {
      this.abnormalClick()
      if (!this.obj.tasks) return

        if (this.HOSPITAL_ID === 'foshanrenyi') {
          let arr = ['破损部位', '溃疡部位', '瘢痕部位', '水疱部位', '硬结部位', '瘀斑部位', '出血点部位', '湿疹部位',
          '斑疹部位', '丘疹部位', '汗疱疹部位', '脓疱疹部位', '糜烂部位', '皲裂部位', '抓痕部位', '其他部位']

          arr.forEach(item => {
            let value = this.formObj.model['I2333068'] || this.formObj.model['I2332052'] || ''
            let newArr = value.split(',').map(it => it + '部位')
            if (!newArr.includes(item)) {
              if (this.$root.$refs[this.formCode]["formGroupColBox" + item]) {
                this.$root.$refs[this.formCode]["formGroupColBox" + item].hidden = true;
              }
            }
          })
        }

      try {
        if (this.obj.tasks.constructor == Array) {
          this.obj.tasks.map(task => {
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
                  }
                });
              } else {
                if (this.$root.$refs[this.formCode]["formGroupColBox" + task.show]) {
                  this.$root.$refs[this.formCode]["formGroupColBox" + task.show].hidden = false;
                }
              }
            }
          });
        }
      } catch (error) {
        console.log("tasks:error", error, this.obj);
      }
    },
    // 点击异常的时候显示异常
    abnormalClick () {
      let obj = []
      if (this.HOSPITAL_ID === 'foshanrenyi' && !this.obj.tasks) {
        if (this.formCode === 'E2332') {
          obj = [
            {
              id: 'I2332067',
              value: '异常：',
              correlationID: "I2332069"
            },
            {
              id: 'I2332067',
              value: '异常：',
              inp: true,
              correlationID: "I2332070"
            },
            {
              id: 'I2332067',
              value: ['异常：'],
              hiddenformGroupColBox: true,
              correlationID: "排尿留置导管"
            },
            {
              id: 'I2332237',
              value: 'CVC',
              hiddeninputBox: true,
              correlationID: "I2332238CVCINPUT"
            },
            {
              id: 'I2332237',
              value: 'PICC',
              hiddeninputBox: true,
              correlationID: "I2332239PICCINPUT"
            },
            {
              id: 'I2332067',
              value: ['异常：'],
              hiddenformGroupColBox: true,
              correlationID: "排尿造瘘"
            },
            {
              id: 'I2332044',
              value: ['普食','软食','半流质','流质','特殊治疗饮食：','其他：'],
              hiddenImportantVal:"禁食",
              hiddenformGroupColBox: true,
              correlationID: "禁食啊"
            },
          ]
        } else {
          obj = [
            // 是儿童模块

          {
            id: 'I2333154',
            value: '异常：',
            correlationID: "I2333156",
          },
          {
            id: 'I2333114',
            hiddenCheckBox:true,
            excludeVal:["异常",'正常'],
            value: '异常',
            correlationID: "I2333114"
          },
          {
            id: 'I2333227',
            value: '黄染',
            correlationID: "I2333222",
            hiddenRadio:true,
            valDefault:","
          },
          {
            id: 'I2333154',
            value: '异常：',
            correlationID: "I2333158",
            inp: true,  // input类型
            prefixId: "I2333158" // 有前缀或者后缀
          },
          {
            id: 'I2333154',
            value: '异常：',
            correlationID: "I2333159",
            inp: true,  // input类型
          },
          {
            id: 'I2333154',
            value: '异常：',
            correlationID: "I2333160",
            inp: true,  // input类型
          },
          ]
        }
      }
      if(this.HOSPITAL_ID === 'nfyksdyy' && !this.obj.tasks){
        obj=[

          {
            id: 'I2332067',
            value: '异常:',
            correlationID: "I2332069"
          },
          {
            id: 'I2332067',
            value: '异常:',
            inp: true,
            correlationID: "I2332070"
          },
          {
            id: 'I2332067',
            value: ['异常:'],
            hiddenformGroupColBox: true,
            correlationID: "排尿留置导管"
          },
          {
            id: 'I2332067',
            value: ['异常:'],
            hiddenformGroupColBox: true,
            correlationID: "排尿造瘘"
          },
          {
            id: 'I2332044',
            value: ['普食','软食','半流质','流质','特殊治疗饮食：','其他:'],
            hiddenImportantVal:"禁食",
            hiddenformGroupColBox: true,
            correlationID: "禁食啊"
          },
          // {
          //   id: 'I2332045',
          //   value: '无',
          //   correlationID: "I2332042"
          // },
        ]
      }
      if (obj.length > 0) {
        obj.forEach(item => {
          // input类型
          if(!this.formObj.model[item.id] && !item.valDefault) return

          if (item.inp) {
            let inp = this.$root.$refs[this.formCode][item.correlationID]
            if(this.formObj.model[item.id]){
              inp.$parent.$el.style = !this.formObj.model[item.id].includes(item.value) ? "display: none" : "display: flex;align-items: center;"
              if (item.prefixId) document.getElementById(item.prefixId).style = !this.formObj.model[item.id].includes(item.value) ? "display: none" : "display: inlink-block;align-items: center;"
            }
          }else if(item.hiddenformGroupColBox){
            if(this.formObj.model[item.id]){
              let formGroupColBox = this.$root.$refs[this.formCode]['formGroupColBox' + item.correlationID]
              let end = item.value.find(val=>this.formObj.model[item.id].includes(val))
              if(item.hiddenImportantVal){
                formGroupColBox.style.display = this.formObj.model[item.id].includes(item.hiddenImportantVal) ? "none" : "block"
              }else formGroupColBox.style.display = !end ? "none" : "block"
            }
          }else if(item.hiddeninputBox){
            if(this.formObj.model[item.id]){
              let hiddeninputBox = this.$root.$refs[this.formCode]['inputBox' + item.correlationID]
              hiddeninputBox.parentElement.style.display = (!this.formObj.model[item.id].includes(item.value)) ? "none" : "inline-block"
            }
          }else if(item.hiddenRadio){
            if(this.formObj.model[item.id]){
              let hiddenRadioArr = this.$root.$refs[this.formCode][item.correlationID]
              Object.keys(hiddenRadioArr).forEach(radio=>{
                hiddenRadioArr[radio].$parent.$el.parentNode.style.display = !this.formObj.model[item.id].includes(item.value) ? "none" : "inline-block"
              })
            }
          }else if(item.hiddenCheckBox){
            if(this.formObj.model[item.id]){
              let hiddenCheckBox = this.$root.$refs[this.formCode][item.correlationID]
              Object.keys(hiddenCheckBox).forEach(checkbox=>{
                if(!item.excludeVal.includes((checkbox))){
                  hiddenCheckBox[checkbox].$parent.$el.parentNode.style.display = !this.formObj.model[item.id].includes(item.value) ? "none" : "flex"
                }
              })
            }
          }else {
            if(this.formObj.model[item.id]){
              let elArr = Object.values(this.$root.$refs[this.formCode][item.correlationID])
              console.log('elArr===',this.$root.$refs[this.formCode],[item.correlationID],elArr)
              if (elArr.length > 0) {
                elArr.forEach(it => {
                  console.log('it.$el===',it.$el)
                  it.$el.style = !this.formObj.model[item.id].includes(item.value) ? "display: none" : "display: inlink-block"
                  if (item.prefixId) document.getElementById(item.prefixId).style = !this.formObj.model[item.id].includes(item.value) ? "display: none" : "display: inlink-block"
                })
              }
            }
          }
        })
      }
    },
    runTasksClick(code) {
      this.abnormalClick()
      // if (this.HOSPITAL_ID !== 'foshanrenyi') return;
      if (!this.obj.tasks) return
      let checked = !this.$root.$refs[this.formCode][this.obj.name][this.obj.title].isChecked
      try {
        if (this.obj.tasks.constructor == Array) {
          this.obj.tasks.map(task => {
            if (task.clean) {
              if (task.clean.constructor == Array) {
                task.clean.map(c => {
                  if (this.$root.$refs[this.formCode]["formGroupColBox" + c]) {
                    this.$root.$refs[this.formCode]["formGroupColBox" + c].hidden = ["I2333068", "I2332052"].includes(code) ? true : checked;
                  }
                });
              } else {
                if (this.$root.$refs[this.formCode]["formGroupColBox" + task.clean]) {
                  this.$root.$refs[this.formCode]["formGroupColBox" + task.clean].hidden = checked;
                }
              }
            }
            if (task.show) {
              if (task.show.constructor == Array) {
                task.show.map(c => {
                  if (this.$root.$refs[this.formCode]["formGroupColBox" + c]) {
                    this.$root.$refs[this.formCode]["formGroupColBox" + c].hidden = !checked;
                  }
                });
              } else {
                if (this.$root.$refs[this.formCode]["formGroupColBox" + task.show]) {
                  this.$root.$refs[this.formCode]["formGroupColBox" + task.show].hidden = !checked;
                }
              }
            }
          });
        }
      } catch (error) {
        console.log("tasks:error", error, this.obj);
      }
    },

    checkboxClick(e, code) {
      if (e.target.tagName !== "INPUT") {
        return;
      }

      if (this.$refs[this.refName]) {
        try {
          this.$refs[this.refName].$parent.$parent.$parent.$el.style.outline =
            "none";
        } catch (error) {}
      }

      let rootRefs = this.$root.$refs[this.formCode][this.obj.name];

      // console.log(
      //   "--obj.name:",
      //   this.obj.name,
      //   rootRefs,
      //   this.$root.$refs,
      //   this.$refs[this.refName]
      // );

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
        if (this.formObj.selectedItems) {
          this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
            return c.title !== this.obj.title;
          });
          // console.log("取消选中", "index", index, objArray);
        }
        this.formObj.model[this.obj.name] = objArray.toString();
      } else {
        this.formObj.model[this.obj.name] = objArray.toString();
        //插入
        if (this.formObj.selectedItems) {
          this.formObj.selectedItems.push(this.obj);
        }
      }

      if (e.target.checked !== undefined) {
        // console.log(
        //   "checkboxClick",
        //   e.target.checked,
        //   e,
        //   this.obj,
        //   this.$root.$refs[this.formCode][this.obj.name][this.refName],
        //   this.formObj
        // );
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
      if(this.formCode == 'E1316') { //特殊处理：跌倒风险评估单自动列入高风险多选不能累加分数
        score = this.obj.score
      } else{
        if (this.formObj.selectedItems) {
          this.formObj.selectedItems.map(item => {
            score += ~~item.score;
          });
      }
      }
      //

      //
      if (this.obj.score != undefined) {
        this.formObj.model["evalScore"] = score;
        if (this.$root.$refs[this.formCode]["evalScore"]) {
          this.formObj.model["evalScore"] = score;
          this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(score);

          let textResult = this.$root.$refs[this.formCode][
            "evalDesc"
          ].checkValueRule(score);
          // console.log("evalDesc-textResult", score, textResult);
          this.formObj.model["evalDesc"] = textResult + "";
          this.$root.$refs[this.formCode]["evalDesc"].setCurrentValue(
            textResult
          );
          this.$root.$refs[this.formCode]["evalDesc"].checkValueRule(
            textResult
          );
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
        this.$root.$refs[this.formCode]["I047012"].$parent.inputValue = "+";
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
        this.$root.$refs[this.formCode]["I047024"].$parent.inputValue = "+";
      }
      this.runTasksClick(code);
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

