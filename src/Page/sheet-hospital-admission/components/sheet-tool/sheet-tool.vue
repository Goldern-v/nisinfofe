<template>
  <div>
    <div class="tool-contain" flex="cross:center">
      <!-- buttonsLeft -->
      <template v-for="(button, i) in buttonsLeft">
        <div
          :key="button.label + i"
          class="item-box"
          flex="cross:center main:center"
          @click.stop="button.onClick"
          :class="{
            disabled: button.getDisabled && button.getDisabled(selectBlock),
          }"
          :style="button.style"
          v-if="button.getDisabled ? !button.getDisabled(selectBlock) : true"
        >
          <div class="text-con">{{ button.label }}</div>
        </div>
      </template>
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
            v-for="(item, i) in sheetBlockList"
            :key="i"
            :label="blockLabel(item) + ' ' + item.wardName"
            :value="item"
          >
            <div class="list-con" flex="cross:stretch">
              <div class="col-1" :title="item.id">
                {{ i + 1 }}-{{ item.id }}
              </div>
              <div class="col-2" :title="item.wardName">
                {{ item.wardName }}
              </div>
              <div class="col-3" :title="item.evalDate">
                {{ item.evalDate }}
              </div>
            </div>
          </el-option>
        </div>
      </el-select>

      <div style="width: 5px"></div>
      <div
        class="item-box"
        flex="cross:center main:center"
        :class="{ disabled: selectBlock.status != '2' }"
        v-show="selectBlock.status == '2'"
        @click="printPage()"
      >
        <div class="text-con" flex="cross:center">打印</div>
      </div>
      <div style="width: 5px"></div>
    </div>
    <previewEvalModal ref="previewEvalModal"></previewEvalModal>
    <el-dialog
      title="体征同步"
      :visible.sync="dialogTableVisible"
      class="vaillist"
    >
      <el-date-picker
        v-model="searchData.date"
        type="datetime"
        placeholder="开始日期"
        style="width: 180px"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <span>-</span>
      <el-date-picker
        v-model="endData.date"
        type="datetime"
        placeholder="结束日期"
        style="width: 180px"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <el-button @click="searchsign">查询</el-button>
      <el-table
        :data="gridData"
        border
        stripe
        height="250"
        @row-click="leftTablelist"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column property="dateStr" label="日期"></el-table-column>
        <el-table-column property="timeStr" label="时间"></el-table-column>
        <el-table-column
          property="axillaryTemperature"
          label="体温（T）"
        ></el-table-column>
        <el-table-column
          property="pulse"
          label="脉搏（P）"
        ></el-table-column>
        <el-table-column property="breathe" label="呼吸（R）"></el-table-column>
        <el-table-column
          property="bloodPressure"
          label="血压（BP）"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" src="./tool.styl" scoped></style>

<style lang="stylus" scoped>
.pegeSelect {
  >>> .el-input__inner {
    border: 0 !important;
    font-size: 12px;
    color: #333333;
    border-radius: 4px;
  }
}

.label {
  font-size: 12px;
  color: #333;
}

.vaillist >>> .el-input__inner {
  border-radius: 3px;
  margin-bottom: 20px;
}

>>> .el-dialog el-dialog--small {
  border: 1px solid #000;
  box-shadow: 3px 3px 10px 0px rgb(0 5 2 / 87%);
}

>>> .el-dialog .el-dialog__header {
  border-bottom: 2px solid #eef6f5;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.sheetSelect-con-sheet {
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 400px !important;
  left: auto !important;
  right: 5px;

  .el-select-dropdown__list, .el-select-dropdown__item {
    padding: 0;
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
</style>

<script>
import bus from "vue-happy-bus";
import $ from "jquery";
import commom from "@/common/mixin/common.mixin.js";
import dayjs from "dayjs";
import qs from "qs";
import {
  createForm,
  save,
  del,
  cancelSignOrAduit,
  get,
  list,
  vitalsign,
} from "@/Page/sheet-hospital-eval/api/index.js";

import {
  formUrl,
  devFormTempUrl,
  devFormUrl,
  devFormUrl_p80,
} from "@/common/pathConfig/index.js";

import { messageBox } from "./messageBox.js";
import { notifyBox } from "./notifyBox.js";

import mergeDefaultValue, { setDefaultValue } from "../data/defalutValue/utils";
import { getReEvaTask, loadPatient } from "../../api/index";
import previewEvalModal from "../Render/modal/previewEvalModal";

export default {
  mixins: [commom],
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      thisRowData: "",
      searchData: {
        date: "",
      },
      endData: {
        date: "",
      },
      bus: bus(this),
      tool: "",
      showCurve: false,
      creator: "",
      isNewForm: false,
      user: JSON.parse(localStorage.user),
      selectList: [],
      pageArea: "",
      formCode: "E0001",
      formId: "",
      // sheetModel,
      // sheetInfo,
      currentFormConfig: {
        patient: new Object(),
        formObj: new Object(),
      },
      selectBlock: {},
      sheetBlockList: [],
      buttonsLeft: [
        {
          label: "新建评估",
          onClick: (e) => {
            if (
              this.patientInfo &&
              this.patientInfo.hasOwnProperty("patientId")
            ) {
              this.createNewForm();
            }
            console.log("新建评估", this.patientInfo);
          },
        },
        {
          label: "保存",
          onClick: (e) => {
            this.formSave();
            console.log("保存", this.user, this.formObj);
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
            // if (selectBlock.status != "0") return true;
            return false;
          },
        },
        {
          label: "删除",
          onClick: (e) => {
            this.formDelete();
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
          },
        },
        {
          label: "责任护士签名",
          style: "width:90px",
          onClick: (e) => {
            this.formSignOrAudit();
            console.log(e);
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
            if (selectBlock.status != "0") return true;
          },
        },
        {
          label: "取消责任护士签名",
          style: "width:110px",
          onClick: (e) => {
            this.cancelSignOrAduit();
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
            if (selectBlock.status != "1") return true;
          },
        },
        {
          label: "审核护士签名",
          style: "width:90px",
          onClick: (e) => {
            this.formSignOrAudit({ type: "audit" });
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
            if (selectBlock.status != "1") return true;
          },
        },
        {
          label: "取消审核护士签名",
          style: "width:110px",
          onClick: (e) => {
            this.cancelSignOrAduit({ type: "audit" });
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
            if (selectBlock.status != "2") return true;
          },
        },
        {
          label: "填写检查",
          onClick: (e) => {
            this.checkFormMissingItems();
            console.log("填写检查");
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
          },
        },
        {
          label: "同步HIS+默认值",
          style: "min-width:100px",
          onClick: (e) => {
            this.fillDefaultValue();
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
          },
        },
        {
          label: "体征同步",
          style: "min-width:100px",
          onClick: (e) => {
            this.formSignsOfsync();
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
          },
        },
        {
          label: "打印预览",
          // style: "min-width:100px",
          onClick: (e) => {
            this.$refs.previewEvalModal.open(window.formObj.model);
          },
          getDisabled(selectBlock) {
            if (!selectBlock.id) return true;
            if (selectBlock.status != "1") return true;
          },
        },
      ],
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
    printPage(e) {
      let patient = this.currentFormConfig.patient;

      let queryObj = {
        id: patient.id || "",
        formCode: patient.formCode,
        patientId: patient.patientId,
        visitId: patient.visitId,
        name: patient.name,
        sex: patient.sex,
        age: patient.age,
        deptCode: patient.deptCode,
        deptName: patient.deptName,
        diagnosis: patient.diagnosis,
        bedLabel: patient.bedLabel,
        inpNo: patient.inpNo,
        wardCode: patient.wardCode,
        wardName: patient.wardName,
        admissionDate: patient.admissionDate,
        token: this.token,
        todo: patient.todo || "",
        isPrint: true,
        // title:this.info.title || ''
      };

      let appurl = this.isDev ? devFormUrl : formUrl;

      let pageUrl = ((wardName) => {
        let wardList = {
          内: "入院评估表(内科).html",
          外: "入院评估表(外科).html",
          妇: "入院评估表(妇科).html",
          产: "入院评估表(产科).html",
          儿: "入院评估表(儿科).html",
          新生儿: "入院评估表(新生儿科).html",
        };
        let result = "";
        Object.keys(wardList).map((w) => {
          return wardName.indexOf(w) > -1 ? (result = wardList[w]) : "";
        });
        return result;
        // 入院评估表(内科).html
      })(patient.wardName);

      let url = `${appurl}/${pageUrl}?${qs.stringify(queryObj)}`;
      // 打印模式isPrint
      localStorage["assessment_printUrl"] = url;
      console.log("printPage", queryObj, localStorage["assessment_printUrl"]);
      let print_wid = window.open(`/crNursing/print/assessmentv1`);
    },
    fillDefaultValue() {
      this.bus.$emit("setHosptialAdmissionLoading", {
        status: true,
        msg: "更新表单数据中...",
      });
      this.removeCheckMark();
      setDefaultValue(window.formObj.model);
      loadPatient(this.patientInfo.patientId, this.patientInfo.visitId)
        .then((res) => {
          let valData = res.data.data
          // console.log(valData,'fafas sfasfsf');
            window.formObj.model.I001012 = valData.marriage;
          // 直接赋值，有点问题 临邑不需要
          if (!['lyxrm'].includes(this.HOSPITAL_ID)) {
            window.formObj.model.I001002 = valData.occupation;
            window.formObj.model.I001003 = valData.nation;
          }
          this.syncHIS(res.data.data);
          // 回填表单
          this.$root.$refs["sheetPage"].fillForm();
          this.bus.$emit("setHosptialAdmissionLoading", false);
          window.messageBox.show(
            "完成补填默认值+同步HIS最新数据...",
            "success",
            5000
          );
        })
        .catch((err) => {
          // 回填表单
          this.$root.$refs["sheetPage"].fillForm();
          this.bus.$emit("setHosptialAdmissionLoading", false);
        });

      console.log("默认填写");
    },
    /** 同步his数据 */
    syncHIS(model = window.formObj.model) {
      let keyMap = {
        diagnosis: "I001001", // 入院诊断
        temperature: "I100001", // 体温
        pulse: "I100002", // 脉博P
        // 'heartRate':'I100002', // 心率HR
        breathe: "I100003", // 呼吸频率是R
        bloodPressure: "I100005", // 血压是BP
        height: "I100009", // 身高  .replace(/\D*/g,'')
        weight: "I100010", // 体重  .replace(/\D*/g,'')
        bmi: "I100011", // 体征
        nation: "I001003", // 国籍
        occupation: "I001002", // 工作
        religion: "I001004", // 宗教
        // 'admissionDate':'', // 入院日期
      };
      let keys = Object.keys(keyMap);
      // console.log(
      //   "===keyMap",
      //   keyMap,
      //   keys,
      //   keyMap["diagnosis"],
      //   window.formObj.model["I001001"]
      // );

      keys = [...keys];
      keys.map((key) => {
        // 临邑 不需要同步已存在数据的字段
        if(['lyxrm'].includes(this.HOSPITAL_ID) && window.formObj.model[keyMap[key]]) return
        if (
          model[key] != undefined &&
          model[key] != "undefined" &&
          model[key] != "" &&
          model[key] != null
        ) {
          if (key === "diagnosis" && window.formObj.model[keyMap[key]]) {
            // this.formObj.model[keyMap[key]] = model[key] || "";
          } else {
            this.formObj.model[keyMap[key]] = model[key] || "";
          }
          // console.log("----key", key, model[key]);
        }
      });
    },
    createNewForm() {
      this.bus.$emit("setHosptialAdmissionLoading", {
        status: true,
        msg: "新建表单中...",
      });
      this.isNewForm = true;
      //
      let post = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        formType: "eval",
        formCode: this.formCode,
      };
      Promise.all([
        loadPatient(this.patientInfo.patientId, this.patientInfo.visitId),
        createForm(post),
      ]).then((res) => {
        this.formObj.model = new Object();

        if (res[0] && res[0].data.data) {
          console.log("病人HIS数据", res[0], res[0].data.data);
          this.syncHIS(res[0].data.data);
          // let keyMap={
          //     'diagnosis':'I001001', // 入院诊断
          //     'temperature':'I100001', // 体温
          //     'pulse':'I100002', // 脉博P
          //     // 'heartRate':'I100002', // 心率HR
          //     'breathe':'I100003', // 呼吸频率是R
          //     'bloodPressure':'I100005', // 血压是BP
          //     'height':'I100009', // 身高
          //     'weight':'I100010', // 体重
          //     'bmi':'I100011', // 体征
          //     'nation':'I001003', // 国籍
          //     'occupation':'I001002', // 工作
          //     'religion':'I001004', // 宗教
          //     // 'admissionDate':'', // 入院日期
          //   };
          //   let keys = Object.keys(keyMap)
          //   console.log('===keyMap',keyMap,keys)
          //   keys = [...keys]
          //   keys.map(key=>{
          //     if(res[0].data.data[key]!=undefined && res[0].data.data[key]!="undefined" && res[0].data.data[key]!='' && res[0].data.data[key]!=null){
          //       this.formObj.model[keyMap[key]] = res[0].data.data[key] || ''
          //       console.log('----key',key,res[0].data.data[key])
          //     }
          //   })
        }

        console.log("--新建评估", res[0], res[1], this.formObj.model);
        if (res[1] && res[1].data.data) {
          //
          let pdata = res[1].data.data;

          this.formObj.model["id"] = pdata.id;
          this.getHEvalBlockList(pdata);
          // this.$message.success("新建成功");
          try {
            window.notifyBox.showMessage({
              duration: 20000,
              type: "info",
              title: "提示：启用自动默认填写",
              message: `已为您默认选填每项评估的第一项，请稍后按病人实际信息增删改。`,
            });
            // window.app.$notify({
            //   duration: 20000,
            //   type: "info",
            //   title: "提示：启用自动默认填写",
            //   message: `已为您默认选填每项评估的第一项，请稍后按病人实际信息增删改。`
            // });
          } catch (error) {}
        }
        //
        //
      });
      // // His data
      // loadPatient(this.patientInfo.patientId,this.patientInfo.visitId).then(res=>{
      //   //
      // })
      // // 新建评估
      // createForm(post).then(res => {
      //   console.log("新建评估", res);
      //   if (res && res.data.data) {
      //     //
      //     let pdata = res.data.data;
      //     this.formObj.model = new Object();
      //     this.formObj.model["id"] = pdata.id;
      //     this.getHEvalBlockList(pdata);
      //     // this.$message.success("新建成功");
      //   }
      // });
    },
    getHEvalBlockList(patientInfo = this.patientInfo) {
      this.selectBlock = "";
      console.log("getHEvalBlockList:patientInfo", patientInfo);
      let postData = {
        patientId: patientInfo.patientId,
        visitId: patientInfo.visitId,
        formCode: this.formCode,
      };
      list(postData).then((res) => {
        console.log("---获取表单列表", res, this.formObj.model);

        if (res && res.data && res.data.data.list) {
          let listData = res.data.data.list;
          listData.sort((a, b) => {
            return a.id - b.id;
          });
          // sort
          this.sheetBlockList = listData;
          // this.sheetBlockList.length - 1
          let len = this.sheetBlockList.length;
          if (this.sheetBlockList && len > 0) {
            this.changeSelectBlock(this.sheetBlockList[len - 1]);
            this.selectBlock = this.sheetBlockList[len - 1];
          }
          // blockLabel(item)
        }
        console.log("---获取表单列表:sheetBlockList", this.sheetBlockList);
        if (this.sheetBlockList.length === 0) {
          // this.selectBlock = "无数据"
          this.bus.$emit("closeHosptialAdmissionForm");
          // this.$message.success("无数据");
          this.bus.$emit("setHosptialAdmissionPageMessage", "新建评估单");
          this.bus.$emit("setHosptialAdmissionLoading", false);
        }
      });
    },
    changeSelectBlock(item) {
      if (!this.selectBlock.id) return;
      window.performance.mark("mark_blocklist_start_xhr");
      console.log("changeSelectBlock", item);
      this.bus.$emit("setHosptialAdmissionLoading", true);

      this.removeCheckMark();

      if (
        this.$root.$refs.tableOfContent &&
        this.$root.$refs.tableOfContent.updateMissingItems
      ) {
        this.$root.$refs.tableOfContent.updateMissingItems(null);
      }

      if (typeof item === "object" && item.hasOwnProperty("wardName")) {
        if (
          item.hasOwnProperty("patientName") &&
          !item.hasOwnProperty("name")
        ) {
          item["name"] = item.patientName;
        }
        this.formId = item.id + "";
        get(item.id).then((res) => {
          let {
            data: {
              data: { itemData: itemData, master: master },
            },
          } = res;
          window.performance.mark("mark_blocklist_end_xhr");
          window.performance.measure(
            "measure_xhr_blocklist" + new Date().toISOString(),
            "mark_blocklist_start_xhr",
            "mark_blocklist_end_xhr"
          );
          var items = window.performance.getEntriesByType("measure");
          console.log("measure", items);
          //

          // try {
          //   window.formObj.header[0].children.map(h => {
          //     h.value = master[h.name];
          //   });
          // } catch (error) {
          //   //
          // }
          // window.formObj.model = { ...itemData, ...master };

          window.formObj.missingItems = new Object();

          let formObj = { ...itemData, ...master };

          // this.formObj.model
          if (this.isNewForm) {
            formObj = { ...formObj, ...this.formObj.model };
          }

          window.formObj.model = formObj;
          window.formObj.model["formId"] = master.id || "";

          if (this.isNewForm) {
            // 增加默认值
            mergeDefaultValue(formObj);
            setDefaultValue(formObj);
            this.formSave();
          }
          // window.formObj.model.I100000 = "耳温";
          // window.formObj.model = Object.assign(window.formObj.model, itemData);
          // window.formObj.model = Object.assign(window.formObj.model, master);
          console.log(
            "---获取页面数据",
            res,
            itemData,
            "master",
            master,
            item,
            "formObj",
            window.formObj,
            this.formObj,
            formObj
          );

          //
          if (master.updaterName && master.updateTime) {
            this.formObj.formSetting.updateInfo = `由${master.updaterName}创建，最后编辑于${master.updateTime}`;
          }

          this.currentFormConfig = {
            patient: item,
            formObj: window.formObj.model,
            isDevMode: false,
          };

          // window.formObj.header.children
          // master
          this.bus.$emit("openHosptialAdmissionForm", {
            patient: item,
            formObj: formObj,
          });
          // 解锁loading动画
          // this.bus.$emit("setHosptialAdmissionLoading", false);

          this.$root.$refs.mainPage["formSignOrAudit"] = this.formSignOrAudit;

          this.$root.$refs.mainPage["cancelSignOrAduit"] =
            this.cancelSignOrAduit;

          this.$root.$refs.mainPage["checkFormMissingItems"] =
            this.checkFormMissingItems;

          // window.formObj.model
        });
      }
      // this.bus.$emit("openHosptialAdmissionForm", item);
      // this.bus.$emit('refreshNursingOrderSheetPage', true,e)
    },
    reloadForm() {
      this.currentFormConfig.isDevMode = true;
      this.bus.$emit("closeHosptialAdmissionForm");
      this.bus.$emit("openHosptialAdmissionForm", this.currentFormConfig);
      this.bus.$emit("setHosptialAdmissionLoading", false);
    },
    blockLabel(item) {
      return `${dayjs(item.evalDate).format("MM-DD")}`;
      // return `${item.wardName} ${dayjs(item.createTime).format('MM-DD')} 至 ${item.completeTime ? dayjs(item.completeTime).format('MM-DD') : '至今'}`
    },
    showMeasureDetialBox(res) {
      let {
        data: {
          data: { diags: diags },
        },
      } = res;
      console.log("显示评估详情", res, diags, window.formObj.dialogs);
      let diagsArray = diags.map((d) => {
        return d;
      });
      // let dialog = {
      //   title: "住院评估内容确认",
      //   type: "formGroupVerticalBox",
      //   name: "",
      //   showTitle: false,
      //   modalWidth: 720,
      //   message: "",
      //   require: "false",
      //   prefixDesc: "",
      //   suffixDesc: "",
      //   style: null,
      //   classes: null,
      //   readOnly: null,
      //   children: [
      //     {
      //       type: "html",
      //       title: "",
      //       style: "width:100%;text-indent: 0em;",
      //       class: null,
      //       html: `根据本次评估内容分析，患者可能有以下${
      //         diagsArray.length
      //       }个护理问题，请您确认：`
      //     },
      //     ...diagsArray
      //   ]
      // };
      //
      // let dArray = window.formObj.dialogs.filter(d => d.title === dialog.title);
      // if (dArray && dArray.length > 0) {
      //   dArray[0] = dialog;
      // } else {
      //   window.formObj.dialogs.push(dialog);
      // }
      //
      this.$root.$refs.diagnosisModal.open(diagsArray);
    },
    removeCheckMark(isXRadiobox = true) {
      let object = this.$root.$refs;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          let element = object[key];
          if (element && element.constructor === Array) {
            let keys = Object.keys(element);
            console.log(
              "Array:element",
              typeof element,
              element.constructor,
              element,
              element[keys[0]],
              [...element].length,
              Object.keys(element)
            );
            // name = '',value=''
            try {
              element[keys[0]].$parent.$parent.$parent.$el.style.outline =
                "none";
              element[
                keys[0]
              ].$parent.$parent.$parent.$el.style.backgroundColor =
                "transparent";
            } catch (error) {
              console.log("----error", error, key, element);
            }
            if (isXRadiobox && key === this.formObj.design.XRadiobox.name) {
              keys.map((x) => {
                element[x].checked = false;
              });
            }
          }
          if (
            element &&
            element.$el &&
            element.$parent &&
            element.$parent.hasOwnProperty("obj") > -1 &&
            element.$parent.obj &&
            element.$parent.obj.hasOwnProperty("name") > -1
          ) {
            element.$el.style.outline = "none";
            element.$el.style.backgroundColor = "transparent";
          }
        }
      }
      this.$root.$refs.tableOfContent.updateMissingItems(null);
    },
    // 检查表单漏填
    checkFormMissingItems() {
      // todo
      console.log("检查表单漏填", this.$root.$refs, this.formObj);
      // K0001
      let missingObj = {};
      let missingObjArrayList = [];
      let totalItems = 0;
      let missItems = 0;
      let skipItems = window.formObj.model.K0001
        ? window.formObj.model.K0001.split(",")
        : [];
      // 孕前体重(产科)
      skipItems = [...skipItems, "孕前体重(产科)"];
      skipItems = skipItems.filter((s) => {
        return s !== "";
      });
      console.log("检查表单漏填skipItems", skipItems);
      //
      let checkSkipItems = (name) => {
        return skipItems.indexOf(name) === -1;
      };
      //
      let object = this.$root.$refs[this.formCode];
      if (!object) {
        return;
      }
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          let element = object[key];
          let name = "",
            value = "",
            parentName = "",
            title = "";

          // 多选单选组件
          if (element && element.constructor === Array) {
            // console.log('Array:element',typeof(element),element.constructor,element,element[0],element.length,Object.keys(element));
            (name = ""), (value = "");
            let keys = Object.keys(element);
            totalItems += 1;
            try {
              if (element[keys[0]].$parent) {
                name = element[keys[0]].$parent.obj.name;
                title = element[keys[0]].$parent.obj.title;
                parentName = element[keys[0]].$parent.obj.parentName
                  ? element[keys[0]].$parent.obj.parentName
                  : "";
                value = window.formObj.model[name];
              }

              if (skipItems.indexOf(title) > -1) {
                //  continue
                console.log("===多选单选组件:title", title, skipItems);
              }

              if (
                (skipItems.indexOf(title) == -1 && !value && !parentName) ||
                (!value && parentName && !window.formObj.model[parentName])
              ) {
                // element[keys[0]].$parent.$parent.$el.style.outline =
                //   "1px solid red";

                //
                if (title) {
                  missItems += 1;
                  element[keys[0]].$parent.$parent.$parent.$el.style.outline =
                    "1px solid red";
                  element[
                    keys[0]
                  ].$parent.$parent.$parent.$el.style.backgroundColor =
                    "yellow;";
                  console.log("!!!!", title, element, missingObj);

                  let itemTitle =
                    element[keys[0]].$parent.$parent.$parent.$parent.$parent.obj
                      .title;
                  //
                  if (!itemTitle) {
                    console.log("===:itemTitle", title, element);
                  }

                  //
                  title =
                    element[keys[0]].$parent.$parent.$parent.$parent.obj.title;

                  if (skipItems.indexOf(title) > -1) {
                    console.log("===多选单选组件:title", title, skipItems);
                    element[keys[0]].$parent.$parent.$parent.$el.style.outline =
                      "none";
                    element[
                      keys[0]
                    ].$parent.$parent.$parent.$el.style.backgroundColor =
                      "transparent";
                    continue;
                  }

                  if (!missingObj[itemTitle]) {
                    missingObj[itemTitle] = new Array();
                  }
                  if (itemTitle) {
                    missingObj[itemTitle].push(title);
                  }

                  //
                  let top = 0;
                  try {
                    top = element.$el.getBoundingClientRect().top - 20;
                  } catch (error) {
                    console.log(
                      "error!!!",
                      title,
                      error,
                      top,
                      element,
                      element.$el
                    );
                    top =
                      element[
                        keys[0]
                      ].$parent.$parent.$parent.$parent.$el.getBoundingClientRect()
                        .top - 20;
                  }

                  //
                  missingObjArrayList.push({
                    title: title,
                    element: element.$el,
                    top: top,
                  });
                }
                //
              } else {
                element[keys[0]].$parent.$parent.$parent.$el.style.outline =
                  "none";
                element[
                  keys[0]
                ].$parent.$parent.$parent.$el.style.backgroundColor =
                  "transparent";
                // element[keys[0]].$parent.$parent.$el.style.outline = "none";
              }
            } catch (error) {
              console.log("error", title, error, element);
            }
          }
          //

          // 输入框组件
          if (
            element &&
            element.$el &&
            element.$parent &&
            element.$parent.hasOwnProperty("obj") > -1 &&
            element.$parent.obj &&
            element.$parent.obj.hasOwnProperty("name") > -1
          ) {
            (name = ""), (value = "");
            if (element.constructor !== Array) {
              try {
                let readOnly = element.$parent.obj.readOnly;
                if (readOnly) {
                  continue;
                }
                //佛山人医，添加input disabled属性的校验
                let disabled = element.disabled;
                if(disabled) {
                  console.log( 'cmd disabled',disabled)
                  continue;
                }
                name = element.$parent.obj.name;
                title = element.$parent.obj.title;
                // element.$parent.$parent.$parent.$parent.obj.title;
                parentName = element.$parent.obj.parentName
                  ? element.$parent.obj.parentName
                  : "";
                value = window.formObj.model[name];
              } catch (error) {
                console.log("error", error, element);
              }

              totalItems += 1;

              //
              if (
                skipItems.indexOf(title) > -1 ||
                skipItems.indexOf(
                  element.$parent.$parent.$parent.$parent.obj.title
                ) > -1
              ) {
                console.log("===输入框组件:title", title, skipItems);
                element.$el.style.outline = "none";
                element.$el.style.backgroundColor = "transparent";
                continue;
              }

              if (
                (skipItems.indexOf(title) == -1 && !value && !parentName) ||
                (!value && parentName && !window.formObj.model[parentName])
              ) {
                console.log(
                  "==输入框组件:title",
                  title,
                  parentName,
                  name,
                  element,
                  skipItems,
                  [window.formObj.model[name]],
                  [value]
                );

                let parentTitle = "";
                let parent = element.$parent;
                while (parent) {
                  if (
                    parent.hasOwnProperty("uui") ||
                    !parent.$parent ||
                    (parent.obj.type &&
                      parent.obj.type.indexOf("formGroup") > -1)
                  ) {
                    break;
                  }
                  parent = parent.$parent;
                }
                //
                if (
                  parent.obj.hasOwnProperty("parentKey") > -1 &&
                  parent.obj.parentKey
                ) {
                  // parent.obj.title == window.formObj.model[parent.obj.parentKey]
                }

                //
                if (
                  (!value && !parent.obj.title) ||
                  (parent.obj.title &&
                    (parent.obj.hasOwnProperty("parentKey") === -1 ||
                      !parent.obj.parentKey ||
                      (parent.obj.hasOwnProperty("parentKey") > -1 &&
                        parent.obj.parentKey &&
                        parent.obj.title ==
                          window.formObj.model[parent.obj.parentKey])))
                ) {
                  let parentTitle = parent.obj.title;

                  if (!parentTitle) {
                    if (parent.obj.parentTitle) {
                      parentTitle = parent.obj.parentTitle;
                      console.log(
                        "===:itemTitle",
                        title,
                        parent,
                        element,
                        window.formObj.model[parent.obj.parentKey]
                      );
                    }
                  }

                  if (!missingObj[parentTitle]) {
                    missingObj[parentTitle] = new Array();
                  }
                  missingObj[parentTitle].push(element.$parent.obj.title);
                  missingObjArrayList.push({
                    title: element.$parent.obj.title,
                    element: element.$el,
                    top: element.$el.getBoundingClientRect().top - 120,
                  });

                  missItems += 1;
                  element.$el.style.outline = "1px solid red";
                  element.$el.style.backgroundColor = "yellow";
                }
                //
                console.log(
                  "漏项",
                  [element, parent],
                  [element.$el],
                  [parent.obj.title ? parent.obj.title : ""],
                  [
                    parent.obj.name,
                    parent.obj.parentKey,
                    parent.obj,
                    window.formObj.model[
                      parent.obj.name || parent.obj.parentKey
                    ],
                  ]
                );

                //
                // element.$el.style.outline = "1px solid red";
                // element.$el.style.border = "1px solid red"
              } else {
                element.$el.style.outline = "none";
                element.$el.style.backgroundColor = "transparent";
                // element.$el.style.border = "1px solid #eee"
              }
            }
          }
        }
      }
      //
      // 七、专科护理评估
      if (missingObj) {
        let keys = Object.keys(missingObj);
        let deptList = ["妇科", "儿科", "产科", "新生儿科"];
        let key = "七、专科护理评估";
        deptList.map((d) => {
          if (keys.indexOf(d) > -1) {
            if (!missingObj[key]) {
              missingObj[key] = [];
            }
            missingObj[key] = [...missingObj[key], ...missingObj[d]];
          }
        });
      }

      //
      if (
        this.$root.$refs.tableOfContent &&
        this.$root.$refs.tableOfContent.updateMissingItems
      ) {
        this.$root.$refs.tableOfContent.updateMissingItems(
          JSON.parse(JSON.stringify(missingObj))
        );
      }
      //
      //
      window.formObj.missingItems = JSON.parse(JSON.stringify(missingObj));
      console.log("漏项统计", missingObj);
      // $el
      // window.notifyBox().setMissObj()   totalItems  missItems  missArray
      // window.notifyBox.setMissObj({
      //   missingObj,
      //   totalItems,
      //   missItems,
      //   missingObjArrayList,
      //   removeCheckMark: this.removeCheckMark
      // });
      // window.notifyBox.show(5000);
      try {
        window.notifyBox.showMessage({
          duration: 20000,
          type: "info",
          title: "填写检查结果：",
          message: `请查看右侧目录栏提示。`,
        });
      } catch (error) {}
      return object;
    },
    // 取消责任护士签名
    cancelSignOrAduit(config = {}) {
      let titleModal = "取消责任护士签名";
      let signType = { sign: true };
      if (config && config.type && config.type === "audit") {
        signType = { audit: true };
        titleModal = "取消审核护士签名";
      }
      window.openSignModal((password, empNo) => {
        let post = {
          // sign: true,
          ...signType,
          empNo,
          id: this.formId,
          password,
        };

        this.bus.$emit("setHosptialAdmissionLoading", {
          status: true,
          msg: "取消签名中...",
        });

        cancelSignOrAduit(post)
          .then((res) => {
            this.getHEvalBlockList(this.patientInfo);
            this.changeSelectBlock(this.selectBlock);
            this.selectBlock["status"] = "0";
            this.$message.success("取消签名成功");
            // this.bus.$emit("setHosptialAdmissionLoading", false);
          })
          .catch((err) => {
            console.log("取消签名评估err", err);
            this.bus.$emit("setHosptialAdmissionLoading", {
              status: false,
            });
          });
      }, titleModal);
    },
    // 责任护士签名
    formSignOrAudit(config = {}) {
      if (this.patientInfo && this.patientInfo.hasOwnProperty("patientId")) {
        let titleModal = "责任护士签名";
        let signType = {
          sign: true,
          evalDate: dayjs().format("YYYY-MM-DD HH:mm"), //"2019-04-16 12:00",
        };
        if (config && config.type && config.type === "audit") {
          signType = { audit: true };
          titleModal = "审核护士签名";
        }

        let datapost = Object.assign({}, window.formObj.model);
        let SigndataObj = {
              Patient_ID:this.patientInfo.patientId,
              Visit_ID:this.patientInfo.visitId,
              Document_Title:this.formObj.formSetting.formTitle.formName,
              Document_ID:"eval",
              Section_ID:this.formId,
              strSignData: JSON.stringify(datapost),
            };

        let verifySignObj = {
                    patientId:this.patientInfo.patientId,
                    visitId:this.patientInfo.visitId,
                    formName:this.formObj.formSetting.formTitle.formName,
                    formCode:"eval",
                    instanceId:this.formId,
                    recordId:"",
                    signData:JSON.stringify(datapost),
                  }

        window.openSignModal(
          (password, empNo, signDate) => {
            this.bus.$emit("setHosptialAdmissionLoading", {
              status: true,
              msg: "签名中...",
            });

            // signDate = dayjs(signDate).format('YYYY-MM-DD HH:mm')||""

            if (signType.hasOwnProperty("sign")) {
              signType["evalDate"] =
                dayjs(signDate).format("YYYY-MM-DD HH:mm") || "";
            } else if (signType.hasOwnProperty("audit")) {
              signType["auditTime"] =
                dayjs(signDate).format("YYYY-MM-DD HH:mm") || "";
            }

            let post = {
              id: this.formId || "",
              patientId: this.patientInfo.patientId,
              visitId: this.patientInfo.visitId,
              formType: "eval",
              formCode: this.formCode,
              // evalDate: dayjs().format("YYYY-MM-DD HH:mm"), //"2019-04-16 12:00",
              evalScore: "",
              empNo,
              password,
              ...signType,
            };



            window.formObj.model.formCode = this.formCode;

            post = Object.assign({}, window.formObj.model, post);
            //
            let postData = new Object();
            for (const key in post) {
              if (post.hasOwnProperty(key)) {
                if (!key) {
                  continue;
                }
                if (!post[key] || post[key] === null || post[key] === "null") {
                  postData[key] = "";
                  continue;
                }
                postData[key] = post[key] + "";
              }
            }

            console.log("签名post", post, postData);

            //
            save(postData)
              .then((res) => {
                this.getHEvalBlockList(this.patientInfo);
                this.$message.success("签名成功");
                this.selectBlock.status = "1";
                this.changeSelectBlock(this.selectBlock);
                // this.bus.$emit("setHosptialAdmissionLoading", false);
                //
                let {
                  data: {
                    data: { master },
                  },
                } = res;
                //
                if (master.updaterName && master.updateTime) {
                  this.formObj.formSetting.updateInfo = `由${master.updaterName}创建，最后编辑于${master.updateTime}`;
                }
                this.checkFormMissingItems();
              })
              .catch((err) => {
                console.log("签名评估err", err);
                this.bus.$emit("setHosptialAdmissionLoading", {
                  status: false,
                });
              });
            console.log("表单填写结果", post);
          },
          titleModal,
          true,undefined,  undefined, undefined, undefined ,undefined,undefined,
          SigndataObj,verifySignObj
        );
      }
    },
    // 删除表单
    formDelete() {
      window.openSignModal((password, empNo) => {
        let post = {
          id: window.formObj.model.id,
          empNo,
          password,
        };
        del(post).then((result) => {
          console.log("删除", result);
          let {
            data: { desc: message },
          } = result;
          this.$message.success(message);
          this.bus.$emit("closeHosptialAdmissionForm");
          this.getHEvalBlockList();
        });
      }, "你确定要删除本记录吗？");
    },
    // 保存表单
    formSave() {
      if (this.patientInfo && this.patientInfo.hasOwnProperty("patientId")) {
        this.bus.$emit("setHosptialAdmissionLoading", {
          status: true,
          msg: "保存表单中...",
        });
        this.isNewForm = false;

        let post = {
          id: this.formId || "",
          patientId: this.patientInfo.patientId,
          visitId: this.patientInfo.visitId,
          formType: "eval",
          formCode: this.formCode,
          // evalDate: dayjs().format("YYYY-MM-DD HH:mm"), //"2019-04-16 12:00",
          evalScore: "",
          sign: false,
          empNo: this.user.empNo, //"admin",
          // password: "123456"
          // ...window.formObj.model
        };

        post = { ...window.formObj.model, ...post };

        this.formObj.model.formCode = this.formCode;

        console.log("save!!!", this.formObj.model);

        post = Object.assign({}, this.formObj.model, post);

        console.log("savePost!!!", this.formObj.model, window.formObj.model);

        // post.formCode = this.formCode

        let postData = new Object();
        for (const key in post) {
          if (post.hasOwnProperty(key)) {
            if (!key) {
              continue;
            }
            if (
              post[key] === null ||
              post[key] === "null" ||
              post[key] === "undefined" ||
              post[key] === undefined
            ) {
              postData[key] = "";
              continue;
            }
            postData[key] = post[key] + "";
          }
        }

        console.log("保存post", post, postData);

        save(postData)
          .then((res) => {
            console.log("保存评估", res);
            this.$message.success("保存成功");
            this.bus.$emit("setHosptialAdmissionLoading", false);
            // this.showMeasureDetialBox(res);
            //
            let {
              data: {
                data: { master },
              },
            } = res;
            //
            if (master.updaterName && master.updateTime) {
              this.formObj.formSetting.updateInfo = `由${master.updaterName}创建，最后编辑于${master.updateTime}`;
            }
            this.checkFormMissingItems();
          })
          .catch((err) => {
            console.log("保存评估err", err);
            this.bus.$emit("setHosptialAdmissionLoading", {
              status: false,
            });
          });
      }
    },
    hotkeyForm() {
      window.document.onkeydown = (e) => {
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
              // console.log("复制", text);
              break;
            default:
              break;
          }
        }
      };
    },
    // 体征同步
    formSignsOfsync() {
      this.dialogTableVisible = true;
      let postData = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        startDate: this.searchData.date,
        endDate: this.endData.date,
      };
       console.log(postData,"postDatapostDatapostDatapostData");
      vitalsign(postData)
        .then((res) => {
          // console.log(res.data.data.list);
          this.gridData = res.data.data.list;
          // console.log(window.formObj.model);
        })
        .catch((err) => {
          console.log("错误事件", err);
        });
    },
    leftTablelist(val) {
      this.thisRowData = this;
      this.thisRowData = val;
      this.dialogTableVisible = false;
      window.formObj.model.I100001 = val.axillaryTemperature;
      window.formObj.model.I100002 = val.pulse;
      window.formObj.model.I100003 = val.breathe;
      window.formObj.model.I100005 = val.bloodPressure;
      this.bus.$emit("setHosptialAdmissionLoading", {
        status: true,
        msg: "更新表单数据中...",
      });
      this.removeCheckMark();
      setDefaultValue(window.formObj.model);
      loadPatient(this.patientInfo.patientId, this.patientInfo.visitId)
        .then((res) => {
          this.syncHIS(res.data.data);
          // 回填表单
          this.$root.$refs["sheetPage"].fillForm();
          this.bus.$emit("setHosptialAdmissionLoading", false);
          window.messageBox.show("体征同步完成", "success", 5000);
        })
        .catch((err) => {
          // 回填表单
          this.$root.$refs["sheetPage"].fillForm();
          this.bus.$emit("setHosptialAdmissionLoading", false);
        });

      console.log("默认填写");
    },
    getFilterData() {
      this.$emit("getFilterData", this.searchData);
    },
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); // 得到年份
      var month = now.getMonth(); // 得到月份
      var date = now.getDate(); // 得到日期
      var HH = now.getHours(); // 得到小时
      var MM = now.getMinutes(); // 得到分钟
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date} ${HH}:${MM}`;
      var defaultDate1 = `${year}-${month}-${date - 1} ${HH}:${MM}`;
      this.$set(this.endData, "date", defaultDate);
      this.$set(this.searchData, "date", defaultDate1);
    },
    searchsign() {
      const sd = new Date(this.searchData.date);

      const sDate =
        sd.getFullYear() +
        "-" +
        this.p(sd.getMonth() + 1) +
        "-" +
        this.p(sd.getDate()) +
        " " +
        this.p(sd.getHours()) +
        ":" +
        this.p(sd.getMinutes());
      this.searchData.date = sDate;
      console.log(this.searchData.date, "kaishi");

      const end = new Date(this.endData.date);
      const eDate =
        end.getFullYear() +
        "-" +
        this.p(end.getMonth() + 1) +
        "-" +
        this.p(end.getDate()) +
        " " +
        this.p(end.getHours()) +
        ":" +
        this.p(end.getMinutes());
      this.endData.date = eDate;
      console.log(this.endData.date, "kaishi");
      this.formSignsOfsync();
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
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
    },
  },
  created() {
    this.bus.$on("getHEvalBlockList", (patientInfo) => {
      console.log("getHEvalBlockList");
      this.getHEvalBlockList(patientInfo);
    });
    this.bus.$on("createHEvalForm", this.createNewForm);
    this.bus.$on("checkFormMissingItems", this.checkFormMissingItems);
    this.bus.$on("formSignOrAudit", this.formSignOrAudit);

    this.bus.$on("formSignsOfsync", this.formSignsOfsync);

    this.bus.$on("setIsNewForm", (isNewForm) => {
      this.isNewForm = isNewForm;
    });
    // this.isNewForm = false;
    this.getNowTime();
  },
  mounted() {
    window.rundev = () => {
      this.reloadForm();
    };
    //
    this.isNewForm = false;
    //
    let tool = {
      formSave: this.formSave,
      formDelete: this.formDelete,
      reloadForm: this.reloadForm,
    };
    window.formTool = tool;
    //
    this.hotkeyForm();
    // if (window.formObj && !window.formObj.hasOwnProperty("tool")) {
    //   window.formObj["tool"] = {};
    //   window.formObj["tool"] = tool;
    //   this.formObj["tool"] = {};
    //   this.formObj["tool"] = tool;
    // }
    //
    // this.$root.$refs.mainPage['formSignOrAudit'] = this.formSignOrAudit
    //
    this.getNowTime();
  },
  watch: {
    deptCode() {
      this.selectBlock = {};
      this.sheetBlockList = [];
      this.$store.commit("upCurrentPatientObj", {});
      this.bus.$emit("closeHosptialAdmissionForm");
      this.bus.$emit("setHosptialAdmissionLoading", false);
      this.bus.$emit("setHosptialAdmissionPageMessage", "请选择左侧患者~");
      let route = {name:this.$route.name}
      this.$router.push(route);
    },
  },
  components: {
    previewEvalModal,
  },
};
</script>
