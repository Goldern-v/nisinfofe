<template>
  <div>
    <div class="tool-contain" flex="cross:center">
      <div
        v-for="(button,i) in buttonsLeft"
        :key="button.label+i"
        class="item-box"
        flex="cross:center main:center"
        @click.stop="button.onClick"
        :class="{disabled: button.getDisabled && button.getDisabled(selectBlock)}"
        :style="button.getDisabled && button.getDisabled(selectBlock)?'display:none':(button.style||'')"
      >
        <div class="text-con">{{button.label}}</div>
      </div>

      <div flex-box="1"></div>
      <span class="label">评估记录：</span>
      <el-select
        v-model="selectBlock"
        @change="changeSelectBlock"
        value-key="id"
        placeholder="请选择评估记录"
        class="select-con"
      >
        <div class="sheetSelect-con-sheet">
          <div class="head-con" flex="cross:stretch">
            <div class="col-1">ID</div>
            <div class="col-2">科室</div>
            <div class="col-3">评估时间</div>
          </div>
          <el-option
            v-for="(item,i) in sheetBlockList"
            :key="i"
            :label="(i+1)+' - '+blockLabel(item)"
            :value="item"
          >
            <div class="list-con" flex="cross:stretch">
              <div class="col-1" :title="item.id">{{i+1}}-{{item.id}}</div>
              <div class="col-2" :title="item.wardName">{{item.wardName}}</div>
              <div class="col-3" :title="item.evalDate">{{item.evalDate}}</div>
            </div>
          </el-option>
        </div>
      </el-select>

      <div style="width: 5px;"></div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" src="./tool.styl" scoped></style>

<style lang="stylus" scoped>
.pegeSelect {
  >>>.el-input__inner {
    border: 0 !important;
    font-size: 12px;
    color: #333333;
  }
}

.label {
  font-size: 12px;
  color: #333;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
>>>.item-box {
  width: auto;
  // padding: 0px 10px;
}

.sheetSelect-con-sheet {
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 400px !important;
  left: auto !important;
  right: 5px;

  >>>.el-select-dropdown__list, .el-select-dropdown__item {
    padding: 0px !important;
    height: auto;
  }

  .el-select-dropdown__wrap {
    max-height: 500px;
  }

  .head-con {
    height: 37px;
    background: #F7FAFA;
    border-bottom: 1px solid #EAEEF1;
    font-size: 13px;
    color: #333333;
    font-weight: bold;
    text-align: center;
  }

  .col-1, .col-2, .col-3, .col-4 {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .col-1 {
    width: 40px;
    padding: 0 24px;
    border-right: 1px solid #EAEEF1;
  }

  .col-2 {
    width: 150px;
    padding: 0 16px;
    border-right: 1px solid #EAEEF1;
  }

  .col-3 {
    width: 120px;
    padding: 0 14px;
    border-right: 1px solid #EAEEF1;
  }

  .col-4 {
    width: 80px;
    padding: 0 14px;
  }

  .list-con {
    font-size: 13px;
    color: #333333;
    height: 37px;
    border-bottom: 1px solid #EAEEF1;
  }

  .el-select-dropdown__item.selected {
    background: #f1f2f6;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      height: 20px;
      width: 4px;
      background: #4bb08d;
    }
  }

  .el-select-dropdown__item.hover {
    background: #f1f2f6;
  }

  .el-select-dropdown__item:hover {
    background: #E5F1F0;
  }
}

.red-border {
  border: 2px solid red !important;
}

>>>.el-select-dropdown__list {
  padding: 0px !important;
}
</style>

<script>
import bus from "vue-happy-bus";
import $ from "jquery";
import commom from "@/common/mixin/common.mixin.js";
import dayjs from "dayjs";
import {
  createForm,
  save,
  del,
  cancelSignOrAduit,
  get,
  list
} from "@/Page/sheet-hospital-eval/api/index.js";
import mergeDefaultValue from "../data/defalutValue/utils";
import { getReEvaTask } from "../../api/index";
export default {
  mixins: [commom],
  data() {
    return {
      bus: bus(this),
      tool: "",
      showCurve: false,
      creator: "",
      user: JSON.parse(localStorage.user),
      selectList: [],
      pageArea: "",
      formCode: "E0100",
      formId: "",
      // sheetModel,
      // sheetInfo,
      selectBlock: {},
      sheetBlockList: [],
      buttonsLeft: [
        // 新建评估
        {
          label: "新建评估",
          onClick: e => {
            if (
              this.patientInfo &&
              this.patientInfo.hasOwnProperty("patientId")
            ) {
              this.createNewForm();
            }
            console.log("新建评估", this.patientInfo);
          }
        },
        // 提交
        {
          label: "提交",
          onClick: e => {
            this.formSave();
            console.log("提交", this.user, this.formObj);
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
            if (selectBlock.status != "0") return true;
          }
        },
        // 删除
        {
          label: "删除",
          onClick: e => {
            //
            try {
              window.app.$refs.autoBox.closeAutoBox();
            } catch (error) {}
            //
            window.openSignModal((password, empNo) => {
              let post = {
                id: this.formObj.model.id,
                empNo,
                password
              };
              del(post).then(result => {
                console.log("删除", result);
                let {
                  data: { desc: message }
                } = result;
                this.$message.success(message);
                this.bus.$emit("closeHosptialEvalForm");
                this.getHEvalBlockList();
              });
            }, "你确定要删除本记录吗？");
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
          }
        },
        // 取消签名
        {
          label: "取消签名",
          onClick: e => {
            window.openSignModal((password, empNo) => {
              let post = {
                sign: true,
                empNo,
                id: this.formId,
                password
              };
              cancelSignOrAduit(post).then(res => {
                this.changeSelectBlock(this.selectBlock);
                this.selectBlock.status = "0";
                this.$message.success("取消签名成功");
              });
            }, "取消签名");
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
            if (selectBlock.status != "1") return true;
          }
        },
        // 复评检查
        {
          label: "复评检查",
          onClick: e => {
            this.formSave({
              showMeasure: false,
              showLoading: false,
              message: "评估预警检查",
              callback: this.formCheckEvalTask
            });
            console.log("检查");
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
          }
        },
        // 查看护理记录
        {
          label: "查看护理记录",
          style: "width: auto;padding: 0px 10px;",
          onClick: e => {
            console.log(
              "查看护理记录单",
              this.$store.getters.getCurrentPatient()
            );
            const { href } = this.$router.resolve({
              path: "/sheet",
              query: {
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId
              }
            });
            console.log(href, "href");
            window.open(href, "_blank");
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
          }
        }
      ]
    };
  },
  methods: {
    emit(todo, value) {
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      if (!this.patientInfo.patientId) {
        return this.$message.warning("请选择一名患者");
      }
      this.bus.$emit(todo, value);
    },
    createNewForm() {
      this.bus.$emit("setHosptialEvalLoading", {
        status: true,
        msg: "新建表单中..."
      });
      //
      try {
        window.app.$refs.autoBox.closeAutoBox();
      } catch (error) {}
      let post = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        formType: "eval",
        formCode: this.formCode
      };
      createForm(post).then(res => {
        console.log("新建评估", res);
        if (res && res.data.data) {
          //
          let pdata = res.data.data;
          this.formObj.model = new Object();
          this.formObj.model["id"] = pdata.id;
          this.getHEvalBlockList(pdata);
          // this.$message.success("新建成功");
        }
      });
    },
    getHEvalBlockList(patientInfo = this.patientInfo) {
      this.selectBlock = "";
      let postData = {
        patientId: patientInfo.patientId,
        visitId: patientInfo.visitId,
        formCode: this.formCode
      };
      list(postData).then(res => {
        console.log("---获取表单列表", res);

        if (res && res.data && res.data.data.list) {
          let listData = res.data.data.list;

          this.sheetBlockList = listData;
          //
          let len = this.sheetBlockList.length;
          if (this.sheetBlockList && len > 0) {
            this.changeSelectBlock(this.sheetBlockList[len - 1]);
            this.selectBlock = this.sheetBlockList[len - 1];
          }
        }
        console.log("---获取表单列表:sheetBlockList", this.sheetBlockList);
        if (this.sheetBlockList.length === 0) {
          // this.selectBlock = "无数据"
          this.bus.$emit("closeHosptialEvalForm");
          // this.$message.success("无数据");
          this.bus.$emit("setHosptialEvalPageMessage", "新建评估单");
          this.bus.$emit("setHosptialEvalLoading", false);
        }
      });
    },
    setElementValue(key, value) {
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        this.$root.$refs[this.formCode][key][elkey].setCurrentValue(value);
      });
    },
    changeSelectBlock(item) {
      if (!this.selectBlock.id) return;

      // 清空评估任务
      try {
        this.$root.$refs.tableOfContent.updateEvalTaskItems([]);
        this.$root.$refs.tableOfContent.updateAlertMessageItems([]);
        // this.$root.$refs.tableOfContent.updateMissingItems([])
        //
        Object.keys(this.formObj.model).map(k => {
          window.formObj.model[k] = "";
          this.formObj.model[k] = "";
          this.setElementValue(k, "");
        });
      } catch (error) {}
      //
      // window.performance.mark("mark_blocklist_start_xhr");
      console.log("changeSelectBlock", item);
      //
      this.bus.$emit("setHosptialEvalLoading", true);
      //
      if (typeof item === "object" && item.hasOwnProperty("wardName")) {
        if (
          item.hasOwnProperty("patientName") &&
          !item.hasOwnProperty("name")
        ) {
          item["name"] = item.patientName;
        }
        this.formId = item.id + "";
        //
        //
        get(item.id).then(res => {
          let {
            data: {
              data: { itemData: itemData, master: master }
            }
          } = res;
          // window.performance.mark("mark_blocklist_end_xhr");
          // window.performance.measure(
          //   "measure_xhr_blocklist" + new Date().toISOString(),
          //   "mark_blocklist_start_xhr",
          //   "mark_blocklist_end_xhr"
          // );
          // var items = window.performance.getEntriesByType("measure");
          // console.log("measure", items);
          //
          //
          // try {
          //   window.formObj.header[0].children.map(h => {
          //     h.value = master[h.name];
          //   });
          // } catch (error) {
          //   //
          // }
          // window.formObj.model = { ...itemData, ...master };

          let formObj = { ...itemData, ...master };

          // Object.keys(formObj).map(k=>{
          //   if(!formObj[k]){
          //     formObj[k] = ""
          //   }
          // })

          window.formObj["model"] = JSON.parse(JSON.stringify(formObj));
          //
          window.formObj.model["formId"] = master.id || "";

          // this.formObj.model = { ...this.formObj.model,...window.formObj.model}

          try {
            window.formObj.formSetting.formInfo.status = master.status || "";
          } catch (error) {}

          // 增加默认值
          mergeDefaultValue(formObj);

          console.log(
            "---获取页面数据",
            res,
            itemData,
            "master",
            master,
            item,
            "formObj",
            window.formObj
          );

          //
          if (master.updaterName && master.updateTime) {
            this.formObj.formSetting.updateInfo = `由${master.updaterName}创建，最后编辑于${master.updateTime}`;
          }

          this.bus.$emit("openHosptialEvalForm", {
            patient: item,
            formObj: formObj
          });
          // this.bus.$emit("setHosptialEvalLoading", false);

          // window.formObj.model
        });
      }
      // this.bus.$emit("openHosptialEvalForm", item);
      // this.bus.$emit('refreshNursingOrderSheetPage', true,e)
    },
    blockLabel(item) {
      return `${item.evalDate}`;
      // return `${item.wardName} ${dayjs(item.createTime).format('MM-DD')} 至 ${item.completeTime ? dayjs(item.completeTime).format('MM-DD') : '至今'}`
    },
    showMeasureDetialBox(res) {
      let {
        data: {
          data: { diags: diags }
        }
      } = res;
      console.log("显示评估详情", res, diags, window.formObj.dialogs);
      let diagsArray = (diags || []).map(d => {
        return d;
      });

      this.$root.$refs.diagnosisModal.open(diagsArray);
    },
    formCheckEvalTask(diags = null) {
      let obj = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        formCode: "E0100"
      };

      //
      try {
        window.app.$refs.autoBox.closeAutoBox();
      } catch (error) {}

      try {
        this.$root.$refs.tableOfContent.updateCurrentMenu("评估预警");
      } catch (error) {
        console.log(error);
      }

      getReEvaTask(obj).then(res => {
        if (res.data.data.length === 0) {
          this.$notify.info({
            title: "检查",
            message: "没有超时，未处理的复评任务。"
          });
          if (diags) {
            this.$root.$refs.tableOfContent.updateEvalTaskItems([...diags]);
            //
            console.log("评估任务：", [...diags]);
          }
        } else {
          //
          let {
            data: { data: list }
          } = res;
          this.$root.$refs.tableOfContent.updateEvalTaskItems([...list]);
          //
          console.log("评估任务：", res, [...list]);
        }
      });
    },
    formSave({
      showMeasure = true,
      showLoading = true,
      callback = null,
      message = ""
    } = {}) {
      if (this.patientInfo && this.patientInfo.hasOwnProperty("patientId")) {
        let msg = message || "保存";

        //
        if (showLoading || message) {
          this.bus.$emit("setHosptialEvalLoading", {
            status: true,
            msg: msg + "表单中..."
          });
        }

        //
        try {
          window.app.$refs.autoBox.closeAutoBox();
        } catch (error) {}

        let post = {
          id: this.formId || "",
          patientId: this.patientInfo.patientId,
          visitId: this.patientInfo.visitId,
          formType: "eval",
          formCode: this.formCode,
          // evalDate: dayjs().format("YYYY-MM-DD HH:mm"), //"2019-04-16 12:00",
          // evalScore: "0",
          sign: false,
          empNo: this.user.empNo //"admin",
          // password: "123456"
        };
        this.formObj.model.formCode = this.formCode;

        post = Object.assign({}, this.formObj.model, post);

        // post.formCode = this.formCode

        let postData = new Object();
        for (const key in post) {
          if (post.hasOwnProperty(key)) {
            if (!key) {
              continue;
            }
            if (post[key] === null || post[key] === "null") {
              postData[key] = "";
              continue;
            }
            postData[key] = post[key] + "";
          }
        }

        console.log("保存post", post, postData);

        save(postData)
          .then(res => {
            console.log(msg + "评估", res);
            if (showLoading) {
              this.$message.success(msg + "完成");
            }
            this.bus.$emit("setHosptialEvalLoading", false);
            // 更新住院单
            try {
              window.formTool.fillForm();
            } catch (error) {}

            //
            if (showMeasure) {
              this.showMeasureDetialBox(res);
            }
            //
            let {
              data: {
                data: { master, diags }
              }
            } = res;
            //
            if (master.updaterName && master.updateTime) {
              this.formObj.formSetting.updateInfo = `由${master.updaterName}创建，最后编辑于${master.updateTime}`;
            }
            //

            //
            if (callback) {
              callback(diags);
            } else if (
              diags &&
              diags.length > 0 &&
              this.$root.$refs.tableOfContent
            ) {
              this.$root.$refs.tableOfContent.updateEvalTaskItems([...diags]);
              console.log("评估任务：", [...diags]);
            }
          })
          .catch(err => {
            console.log("保存评估err", err);
            this.bus.$emit("setHosptialEvalLoading", {
              status: false
            });
          });
      }
    },
    hotkeyForm() {
      window.document.onkeydown = e => {
        var currKey = 0;
        e = e || event || window.event;
        currKey = e.keyCode || e.which || e.charCode;
        var currKeyStr = String.fromCharCode(currKey);
        // console.log('currKeyStr',currKeyStr)
        // Ctrl / Command +
        if (e.ctrlKey || e.metaKey) {
          let text = window.getSelection().toString();
          switch (currKeyStr.toUpperCase()) {
            case "S": //Ctrl+S
              e.preventDefault();
              e.returnvalue = false;
              this.formSave({ showMeasure: false });
              e.stopPropagation();
              break;
            case "G": //Ctrl+N
              this.formSave({ showMeasure: false, showLoading: false });
              console.log("新建页面");
              // createForm()
              break;
            case "C": //Ctrl+C
              console.log("复制", text);
              break;
            default:
              break;
          }
        }
      };
    }
  },
  computed: {
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    patientId() {
      return this.$store.state.sheet.patientInfo.id;
    },
    formObj() {
      return window.formObj; //this.$store.state.hospitalEval.formObj;
    }
    // formCode() {
    //   try {
    //     return this.formObj.formSetting.formInfo.formCode;
    //   } catch (error) {}
    //   return "";
    // }
  },
  created() {
    this.bus.$on("getHEvalBlockList", patientInfo => {
      console.log("getHEvalBlockList");
      this.getHEvalBlockList(patientInfo);
    });
    this.bus.$on("createHEvalForm", this.createNewForm);
  },
  mounted() {
    let tool = {
      ...window.formTool,
      formSave: this.formSave,
      formCheckEvalTask: this.formCheckEvalTask
      // formDelete: this.formDelete,
      // reloadForm: this.reloadForm
    };
    window.formTool = tool;
    //
    this.hotkeyForm();
    //
  },
  watch: {
    deptCode() {
      this.selectBlock = {};
      this.sheetBlockList = [];
      this.$store.commit("upCurrentPatientObj", {});
      this.bus.$emit("closeHosptialEvalForm");
      this.bus.$emit("setHosptialEvalLoading", false);
      this.bus.$emit("setHosptialEvalPageMessage", "请选择左侧患者~");
      this.$router.push({ name: "sheetHospitalEvalPage" });
    }
  },
  components: {}
};
</script>
