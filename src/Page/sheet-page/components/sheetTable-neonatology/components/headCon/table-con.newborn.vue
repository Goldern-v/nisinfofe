<template>
  <div class="sheet-neonatology-head">
    <!-- {{formatData.data.formData}} -->
    <table
      v-for="(tables,tablesIndex) in formatData.tables[tableName]"
      :key="tablesIndex"
      :class="tables.class"
      :style="tables.style"
    >
      <!-- 固定宽高表格 -->
      <!-- <colgroup>
        <col
          v-for="(tds,colTdsIndex) in (tables.maxcol||tables.tr[0].td)"
          :key="'col'+colTdsIndex"
          :width="tables.width[colTdsIndex]||((100/tables.maxcol) +'%')||(100/tables.tr[0].td.length) +'%'"
        >
      </colgroup>-->
      <colgroup>
        <col width="25%" />
        <col width="20%" />
        <col width="55%" />
      </colgroup>
      <tr
        v-for="(tds,tdsIndex) in tables.tr"
        :key="tdsIndex"
        :style="tables.style"
        :class="tables.class"
      >
        <td
          v-for="(groups,tdIndex) in tds.td"
          :key="tdIndex"
          :colspan="tds.colspan[tdIndex]||tables.colspan[tablesIndex]||'1'"
          :rowspan="tds.rowspan[tdIndex]||tables.rowspan[tablesIndex]||'1'"
          :style="tds.style"
          :class="tds.class"
        >
          <!-- tr{{tablesIndex}},td{{ tdsIndex }},len{{tds.td.length}}<br> -->
          <!-- {{ tds}} -->
          <!-- td内多组多元素 -->
          <!-- td内单组多元素 -->
          <span
            v-for="(group,gkey,gIndex) in groups"
            :key="gIndex"
            :style="groups.style"
            :class="groups.class"
          >
            <label v-if="gkey" for>{{gkey}}:</label>
            <span
              v-for="(item,elkey,elIndex) in group"
              :key="elIndex"
              :style="group.style"
              :class="group.class"
            >
              <span v-html="item.html"></span>
              <!-- aa{{item.label}} -->
              <input
                v-if="item.type=='radio'||item.type=='checkbox'"
                :data-label="item.label"
                :type="item.type"
                :name="item.name"
                :ischecked="formatData.data.formData[item.name] && formatData.data.formData[item.name].includes(item.label)"
                :multiplechoice="item.multiplechoice"
                :value="item.label"
                v-model="formatData.data.formData[item.name]"
                @click="inputClick($event,item.multiplechoice)"
                :style="item.style"
                :class="item.class"
                :id="'CR-'+getKeyIdString(gkey)+'-'+tablesIndex+'-'+tdsIndex+'-'+gIndex+'-'+elkey"
              />
              <label
                :for="'CR-'+getKeyIdString(gkey)+'-'+tablesIndex+'-'+tdsIndex+'-'+gIndex+'-'+elkey"
              >{{item.label}}</label>

              <span
                v-if="item.type=='text'"
                :data-label="item.label"
                :contenteditable="item.contenteditable"
                :multiplechoice="item.multiplechoice"
                :type="item.type"
                :name="item.name"
                :style="item.style"
                :class="item.class"
                @click="textClick($event,item,item.multiplechoice)"
                @keydown="textKeyDown"
                @keyup="textKeyUp"
                @focusout="focusout"
                :id="'CR-'+getKeyIdString(gkey)+'-'+(gIndex-1)"
              >{{formatData.data.formData[item.name]}}</span>
              <!-- {{gkey==='病人信息'?(formatData.formHeadInfo[item.name]||patientInfo[item.name]||queryInfo[item.name]):formatData.formData[item.name]}} -->
              <span
                v-if="item.type=='signBox' "
                style="min-width: 40px;height: 30px;margin-right: 0px; cursor: pointer;"
                @click.stop="toSign($event,item.name)"
              >
                <span
                  v-if="!isPrint"
                >{{formatData.data.signPostData.auditorName||formatData.data.formData[item.name]||"(未签名)"||item.name}}</span>
                <img
                  v-if="isPrint&&formatData.data.formData['empNo']"
                  class="sign-image"
                  :src="signUrl(formatData.data.formData['empNo'])"
                  style="margin: 0px 0 0 0"
                  :alt="formatData.data.formData['empNo']"
                />
              </span>

              <span v-html="item.postText"></span>
            </span>
          </span>
        </td>
      </tr>
      <!-- <slot></slot> -->
    </table>
  </div>
</template>
<style lang="scss">
// @import '../../../../common/print/input-print.styl'
.sheet-neonatology-head {
  font-size: 14px;
  input[type="checkbox"] {
    position: relative;
    /* top: -3px; */
  }
  input[type="checkbox"] {
    -webkit-appearance: none;
    vertical-align: text-top;
    width: 14px;
    height: 14px;
    border: 1px solid #000;
    border-radius: 0px;
    outline: none;
    margin: 0;
  }
  input[type="checkbox"]:checked {
    font-size: 10;
    position: relative;
  }
  input[type="checkbox"]:checked:before {
    content: "";
    width: 8px;
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    left: -2px;
    border-top: 2px solid #000;
  }
  input[type="checkbox"]:checked:after {
    content: "";
    width: 14px;
    transform: rotate(-50deg) translateY(-50%) translateX(50%);
    position: absolute;
    border-top: 1px solid #000;
    top: 10px;
    left: -2px;
  }
  input[type="radio"] {
    -webkit-appearance: none;
    vertical-align: text-top;
    width: 14px;
    height: 14px;
    border: 1px solid #000;
    border-radius: 0px;
    outline: none;
  }
  input[type="radio"]:checked {
    font-size: 10;
    position: relative;
  }
  input[type="radio"]:checked:before {
    content: "";
    width: 8px;
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    left: -2px;
    border-top: 2px solid #000;
  }
  input[type="radio"]:checked:after {
    content: "";
    width: 14px;
    transform: rotate(-50deg) translateY(-50%) translateX(50%);
    position: absolute;
    border-top: 2px solid #000;
    top: 10px;
    left: -2px;
  }
  .sign-image {
    width: 60px;
    height: auto;
    margin: -8px 0px -12px 0px !important;
  }

  .signTable {
    margin-top: 5px;
    border: 0px;
    text-align: center;
    td {
      padding: 0px;
      border: 0px;
    }

    .border-bottom {
      width: 120px;
    }
  }

  .sign-cursor {
    text-align: left;
    cursor: pointer;
  }

  .sign-cursor-none {
    text-align: left;
    cursor: default;
  }

  .outline-checking {
    outline: 2px auto red;
  }

  .outline-none {
    outline: none;
  }

  .bg-checking {
    background-color: #ff6347 !important;
  }

  .bg-none {
    background-color: inherit !important;
  }

  table {
    border: 1px solid;
    table-layout: fixed;
    >>> sup {
      font-size: 11px;
    }

    tr {
      padding: 5px;
      line-height: 25px;
      .group-input-justify {
        display: flex;
        justify-content: space-between;
      }

      .group-input-justify-start {
        justify-content: start;
      }
      .padding-left {
        padding: 0px 20px 0px 0px;
      }

      .table-group {
        padding: 0px 5px;
        label {
          vertical-align: top;
          font-size: 13px !important;
          padding: 0px 0px 0px 5px;
        }
      }
      >>> label {
        vertical-align: top;
      }
    }
  }

  thead {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px dashed black;
  }
  .border-bottom {
    font-size: 14px !important;
    text-align: center;
    background-color: transparent;
    display: inline-block !important;
    min-width: 30px !important;
    // width 30px!important
    height: 20px;
    padding: 0px 5px;
    border: 0px !important;
    border-bottom: 1px solid black !important;
    outline: none;
  }
  .border-none {
    /* border: 0px !important; */
  }

  .table-border-none {
    border: 0px !important;
  }

  .table-padding-none {
    padding: 0px;
  }

  .table-border-bottom {
    border-bottom: 1px solid black !important;
  }

  .table-groups {
    border-bottom: 0px;
  }

  .table-groups-last {
    border-bottom: 1px solid black;
  }

  .page-print {
    border: 0px;
    border-top: 1px black solid;
    page-break-after: always;
    width: 100%;
    height: 40px;
    display: block;
  }
}
</style>
<script>
import dayjs from "dayjs";
import sheetInfo from "../../../../components/config/sheetInfo";
import { data, tables } from "./formatData";
import { getLastDetail } from "@/api/common.js";
export default {
  // mixins: [common],
  props: {
    formatData: Object,
    tableName: String,
  },
  data() {
    return {
      sheetInfo,
    };
  },
  methods: {
    getKeyIdString(id) {
      return id.replace(/["?/]/g, "");
    },
    inputClick(e, multiplechoice) {
      console.log("多选框点击");
      let type = e.target.type;
      let name = e.target.getAttribute("name");
      let value = e.target.getAttribute("value");
      let id = e.target.id;
      let input = undefined;
      console.log(
        "多选框:",
        e,
        multiplechoice,
        type,
        name,
        value,
        id,
        this.formatData
      );

      //
      if (
        typeof this.formatData.data.formData[name] === "boolean" &&
        name !== undefined
      ) {
        this.formatData.data.formData[name] = [];
      }

      // 单选
      if (!multiplechoice) {
        //
        if (type === "checkbox") {
          this.formatData.data.formData[name] = [];
          this.formatData.data.formData[name].push(value);
        }
      } else {
        // 多选
        //
        if (name && value && this.formatData.data.formData[name]) {
          if (this.formatData.data.formData[name].indexOf(value) > -1) {
            this.formatData.data.formData[name].splice(
              this.formatData.data.formData[name].indexOf(value),
              1
            );
          } else {
            this.formatData.data.formData[name].push(value);
          }
        }
      }
    },
    textClick(e, item, multiplechoice) {
      console.log(
        "输入框点击",
        e,
        item.name,
        item.label,
        item.bind,
        this.formatData.data.formData[item.name]
      );
      if (this.formatData.data.formData[item.name].length === 0 && item.bind) {
        switch (item.bind) {
          case "timeStr":
            this.formatData.data.formData[item.name] = dayjs().format("HH:mm");
            break;
          case "dateStr":
            this.formatData.data.formData[item.name] = dayjs().format("MM-DD");
            break;
          case "datetime":
            this.formatData.data.formData[item.name] = dayjs().format(
              "YYYY-MM-DD HH:mm"
            );
            break;
          default:
            this.formatData.data.formData[item.name] = "√" || "✓";
            break;
        }
      }
    },
    textKeyDown(e) {
      // console.log("输入框按键按下", e);
    },
    textKeyUp(e) {
      // console.log("输入框按键弹起", e);
    },
    focusout(e) {
      // console.log("光标取消", e);
      // console.log(
      //   "textChange",
      //   e,
      //   e.target.getAttribute("name"),
      //   e.target.innerHTML
      // );
      // debugger;
      // e.preventDefault();
      let id = e.target.id;
      let input = window.document.getElementById(id); // .querySelector(`input[id=${id}]`)
      let name = e.target.getAttribute("name");

      if (name === "signDate" || name === "auditDate") {
        this.formatData.data.formData[name] = e.target.innerText;
        e.target.innerText = this.formatData.data.formData[name];
        return;
      }

      // console.log('focusout', e, name, e.target.innerHTML, this.formatData.data.formData[name], this.formatData.data.formData)

      if (this.formatData.data.formData[name] !== e.target.innerText) {
        console.log(
          this.formatData.data.formData[name],
          e.target.innerText,
          88
        );
        this.formatData.data.formData[name] = e.target.innerText;
        e.target.innerText = this.formatData.data.formData[name];
      }
    },
    toSign(e, signName) {
      console.log("签名按钮", e, signName);
      let empNumber, empName;

      if (this.formatData.data.formData["empNo"]) {
        return;
      }

      console.log("toSign", empNumber, empName);
      parent.openSignModal((password, empNo) => {
        //
        checkUser(empNo, password).then((res) => {
          console.log("checkUser", res);

          this.formatData.data.formData["empNo"] = res.data.data.empNo;

          this.formatData.data.formData[signName] = res.data.data.empName;

          this.$nextTick(() => {
            window
              .saveForm()
              .then((res) => {
                parent.app.$message.success("签名成功");
              })
              .catch((err) => {
                parent.app.$message.success("签名失败");
              });
          });
        });
      }, "签名校验");
    },
  },
  computed: {
    isPrint() {
      return window.location.href.indexOf("print") > -1;
    },
    formModel() {
      return this.formatData.data.formData;
    },
    patientInfo() {
      // return this.sheet.patientInfo
      return this.sheetInfo.selectBlock || {};
    },
  },
  created() {
    data.initFormData(tables, {});
    data.cleanData();

    /** 如果没有数据 */
    /** 找到父母的id */
    let p_id = this.patientInfo.patientId.split("_")[0];
    let p_obj = sheetInfo.bedList.find((item) => item.patientId == p_id);
    if (Object.keys(sheetInfo.relObj).length == 0 && p_obj) {
      getLastDetail("form_childbirth", p_obj.patientId, p_obj.visitId).then(
        (res) => {
          var lastEvalData = {};
          if (res.data.data && res.data.data.pageMap) {
            let pageMap = res.data.data.pageMap;
            lastEvalData = {
              孕周: pageMap.form_childbirth_gnyz_explain,
              分娩方式: pageMap.form_childbirth_temcfs_option
                ? [pageMap.form_childbirth_temcfs_option]
                : [],
              羊水: pageMap.form_childbirth_pmsys_option
                ? [pageMap.form_childbirth_pmsys_option.replace("°", "")]
                : [],
              皮肤: pageMap.form_childbirth_pifu_option
                ? [pageMap.form_childbirth_pifu_option]
                : [],
              "1分钟Apgar评分": pageMap.form_childbirth_zf_1min,
              "5分钟Apgar评分": pageMap.form_childbirth_zf_5min,
              "10分钟Apgar评分": pageMap.form_childbirth_zf_10min,
              体重: pageMap.form_childbirth_tz_explain,
              身长: pageMap.form_childbirth_sc_explain,
              头围: pageMap.form_childbirth_tw_explain,
            };
            sheetInfo.relObj.birthday = pageMap.form_childbirth_temcsj_explain;
          }

          // Object.assign(this.formModel, lastEvalData);
          // Object.assign(this.formModel, sheetInfo.relObj);
          // sheetInfo.relObj = this.formModel;
          // sheetInfo.relObj = { ...sheetInfo.relObj };
          for (let key in this.formatData.data.formData) {
            if (this.formatData.data.formData[key].constructor == Array) {
              this.formatData.data.formData[key] = [];
            } else {
              this.formatData.data.formData[key] = "";
            }
          }

          /* 第一次创建的时候 sheetInfo src\Page\sheet-page\components\sheetTable-neonatology\components\headCon\新生儿.js拿的是这个 */
          /* 然后后面空的把前面的覆盖了 */
          /*  Object.assign之前,先把lastEvalData和sheetInfo.relObj先处理一下. */
          for(let index in lastEvalData){
             /* 如果relobj已经有数据，就不变。没有数据就把接口的数据赋值 */
             if(sheetInfo.relObj[index] instanceof Array){
                /* relobj有数据，不做处理，没有数据就赋值 */
                if(sheetInfo.relObj[index].length!=0) return
                sheetInfo.relObj[index]=[...lastEvalData[index]]   
              }else{
                sheetInfo.relObj[index] =sheetInfo.relObj[index] ? sheetInfo.relObj[index] : lastEvalData[index]
              }        
          }
          let obj = Object.assign(
            {},
            this.formatData.data.formData,
            lastEvalData,
            sheetInfo.relObj
          );
          this.formatData.data.formData = obj;
          sheetInfo.relObj = obj;
        }
      );
    } else {
      // Object.assign(this.formModel, sheetInfo.relObj);
      // sheetInfo.relObj = this.formModel;
      // console.dir(this.formModel);
      let obj = Object.assign(
        {},
        this.formatData.data.formData,
        sheetInfo.relObj
      );
      this.formatData.data.formData = obj;
      sheetInfo.relObj = obj;
    }
  },
  watch: {
    formModel: {
      deep: true,
      handler() {
        sheetInfo.relObj = this.formModel;
      },
    },
  },
  components: {},
};
</script>
