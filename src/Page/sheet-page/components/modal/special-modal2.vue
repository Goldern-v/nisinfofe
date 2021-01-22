<template>
  <div ref="textArea">
    <sweet-modal
      ref="modal"
      @close="breforeClose"
      :modalWidth="720"
      :title="title"
      :enable-mobile-fullscreen="false"
    >
      <div id="specialForm">
        <div flex="cross:center" class="special-date-con">
          <div class="date" v-if="tr && tr.length && isShowItem()">
            <label class="label">日期：</label>
            <input
              v-if ="HOSPITAL_ID === 'huadu'"
              type="text"
              :placeholder="autoDate"
              v-model="staticObj.recordMonth"
              @keyup="dateKey($event, staticObj, 'recordMonth')"
            />
            <input
              v-else
              type="text"
              :placeholder="autoDate"
              v-model="staticObj.recordMonth"
              @keyup="dateKey($event, staticObj, 'recordMonth')"
            />
          </div>
          <div class="time">
            <label class="label">时间：</label>
            <input
              v-if ="HOSPITAL_ID === 'huadu'"
              type="text"
              v-model="staticObj.recordHour"
              @keyup="timeKey($event, staticObj, 'recordHour')"
            />
            <input
              v-else
              type="text"
              :disabled="recordDate != ''"
              v-model="staticObj.recordHour"
              @keyup="timeKey($event, staticObj, 'recordHour')"
            />
          </div>
        </div>
        <el-tabs v-model="activeTab" class="tab-content" type="card">
          <el-tab-pane label="固定项目" name="1" :disabled="isDisabed">
            <div flex="wrap:wrap">
              <div
                v-for="(item, key) in fixedList"
                :key="sheetInfo.sheetType + item.key"
                style="min-width: 33%;margin-bottom: 12px;overflow: hidden;"
                :style="item.isWrap && { 'min-width': '50%' }"
              >
                <div class="input-cell" flex="cross:center">
                  <div class="label" style="min-width: 70px;">{{ item.name || key }}：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="fixedList[key].value"
                    @keydown="
                      spaceToKey($event, fixedList[key], 'bloodPressure')
                    "
                    v-if="key == 'bloodPressure'"
                    :style="item.maxWidth && { width: item.maxWidth + 'px' }"
                  />
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="fixedList[key].value"
                    v-autoComplete="{
                      dataList: dictionary[item.key],
                      obj: fixedList,
                      key: key,
                      tr,
                      td: item
                    }"
                    :style="item.maxWidth && { width: item.maxWidth + 'px' }"
                    v-else
                  />
                  <div class="uniq">{{ item.next }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="自定义项目"
            name="2"
            v-if="customTitle && customTitle.length"
            :disabled="isDisabed"
          >
            <div class="custom-cell" v-for="(item, index) in customTitle" :key="item.key">
              <div class="custom-box" flex="cross:center">
                <div class="label">{{ item.name }}</div>
                <input
                  type="text"
                  @keydown="f1Key($event, staticObj, item.key)"
                  v-model="staticObj[item.key]"
                  :readonly="check[index] || isRead"
                  v-autoComplete="{
                    dataList: dictionary[item.key],
                    obj: staticObj,
                    key: item.key
                  }"
                />
                <div class="button">
                  <el-checkbox v-model="check[index]" :disabled="isRead"></el-checkbox>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="特殊情况记录" name="3">
            <div class="title" flex="cross:center main:justify">
              <span>病情、药物治疗、护理措施、效果</span>
              <span style="color: #284FC2;cursor: pointer" @click="openTemplateSlider">+模板</span>
            </div>
            <!-- 陵城特殊情况特殊记录富文本 -->
            <div
              class="edit_container"
              v-if="sheetInfo.selectBlock.openRichText && HOSPITAL_ID === 'lingcheng'"
            >
              <quill-editor v-model="doc" ref="myQuillEditor" :options="editorOption"></quill-editor>
            </div>
            <el-input v-else type="textarea" class="text-con" :readonly="isRead" v-model="doc"></el-input>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button
          class="modal-btn"
          type="primary"
          @click="sheetInfo.selectBlock.openRichText && HOSPITAL_ID == 'lingcheng'? postRichText() : post()"
          v-show="!isRead"
        >保存</el-button>
      </div>
    </sweet-modal>
    <templateSlide ref="templateSlide"></templateSlide>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.edit_container {
  margin-top: 10px;

  >>>.ql-container {
    height: 200px !important;
  }
}

.title {
  font-size: 14px;
  color: #333333;
}

.text-con {
  margin-top: 20px;
  margin-bottom: 20px;

  >>>textarea {
    height: 200px;
  }
}

.special-date-con {
  margin: 0 0 18px 0;

  .date {
    margin-right: 30px;
  }

  .label {
    font-size: 14px;
    color: #333333;
  }

  input {
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px;
    height: 30px;
    width: 60px;
    outline: none;
    text-align: center;
  }
}

.tab-content {
  >>>.el-tabs__header {
    margin-left: -20px;
    margin-right: -20px;
    background: #F7FAFA;
  }

  >>>.el-tabs__item {
    height: 37px;
    border-radius: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &.is-active {
      background: #fff;
      border-radius: 0;
      border-top: 3px solid #4BB08D;
      border-bottom: 3px solid transparent;
      box-sizing: border-box;
      font-weight: bold;
      line-height: 33px;
      color: #333;
    }
  }

  >>>.el-tabs__item {
    line-height: 37px;
  }
}

>>> {
  .el-tabs {
    min-height: 340px;
  }
}

.input-row {
  margin-bottom: 12px;
}

.input-cell {
  padding-right: 20px;

  &[flex-box] {
    width: 0;
  }

  .label {
    font-size: 14px;
    color: #333333;
  }

  input {
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px;
    height: 32px;
    width: 85px;
    outline: none;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
  }
}

.tab-content {
  .custom-cell {
    &:nth-of-type(2n) .custom-box {
      padding-left: 15px;
    }
  }
}

.custom-cell {
  float: left;
  width: 50%;
  margin-bottom: 10px;

  .custom-box {
    box-sizing: border-box;

    .label {
      background: #EEF6F5;
      height: 34px;
      font-size: 14px;
      color: #333333;
      box-sizing: border-box;
      padding-left: 13px;
      border: 1px solid #CBD5DD;
      width: 100px;
      border-radius: 2px 0 0 2px;
      display: flex;
      align-items: center;
    }

    input {
      width: 190px;
      height: 34px;
      font-size: 14px;
      padding-left: 13px;
      box-sizing: border-box;
      border: 1px solid #CBD5DD;
      border-left: 0;
      border-radius: 0 2px 2px 0;
      outline: none;
    }

    .button {
      margin-left: 9px;
    }
  }
}
</style>
<script>
import bus from "vue-happy-bus";
import { nullRow } from "@/Page/sheet-page/components/render/Body.js";
import sheetModel from "@/Page/sheet-page/sheet.js";
import templateSlide from "./template-slide.vue";
import sheetInfo from "../config/sheetInfo";
import { decoder_title, decoder_record2 } from "./render/decode.js";
import { mergeTr } from "./render/render.js";
import { dateKey, timeKey } from "../config/keyEvent/date.js";
import { offset } from "../sheetTable/components/excel/tool.js";
import { listItem } from "../../api/recordDesc.js";
import { FormToEnter } from "@/plugin/tool/FormToTab.js";
import $ from "jquery";
import { isNumber } from "util";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

function autoComplete(el, bind) {
  if (bind.value.dataList) {
    let obj = bind.value.obj;
    let key = bind.value.key;
    let tr = bind.value.tr;
    let td = bind.value.td;
    el.onfocus = e => {
      let dataList = bind.value.dataList;
      if (el.readOnly) return;
      let scrollTop = document.querySelector(".sheetTable-contain").scrollTop;
      let scrollLeft = document.querySelector(".sheetTable-contain").scrollLeft;
      let xy = e.target.getBoundingClientRect();
      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 34}px`,
            left: `${xy.left}px`
          },
          data: dataList,
          callback: function(data) {
            if (process.env.HOSPITAL_ID == "weixian") {
              if (td.value && td.value != data && td.childKey) {
                tr.map(item => {
                  if (item.parentKey && item.parentKey == td.name) {
                    item.value = "";
                  }
                });
              }
            }
            if (data) {
              if (typeof obj[key] == "object") {
                obj[key].value = data.trim();
              } else {
                obj[key] = data.trim();
              }
            }
          },
          id: key,
          tr: tr,
          td: td
        });
      });
    };
    el.onblur = e => {
      setTimeout(() => {
        window.closeAutoComplete(key);
      }, 400);
    };
  } else {
    el.onfocus = null;
  }
}
export default {
  directives: {
    autoComplete: {
      bind: autoComplete,
      update: autoComplete
    }
  },
  data() {
    return {
      bus: bus(this),
      doc: "",
      recordDate: "",
      record: [],
      table: [],
      lastZ: 0,
      lastY: 0,
      activeTab: "1",
      customTitle: [],
      staticObj: {},
      sheetInfo,
      isRead: false,
      fixedList: {},
      dictionary: {},
      check: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      tr: [],
      // 富文本编辑器配置
      editorOption: {
        placeholder: "请编辑内容",
        modules: {
          toolbar: [
            [{ script: "sub" }, { script: "super" }] // 上下标
          ]
        },
        theme: "snow"
      }
    };
  },
  computed: {
    title() {
      const recordDate = this.HOSPITAL_ID === "huadu" ? '&nbsp' : this.recordDate;
      if (this.recordDate) {
        if (this.isRead) {
          return "已签名，不可以编辑&nbsp;&nbsp;&nbsp;&nbsp;" + recordDate;
        } else {
          return "编辑护理记录&nbsp;&nbsp;&nbsp;&nbsp;" + recordDate;
        }
      } else {
        return "新建护理记录";
      }
    },
    autoDate() {
      if (this.recordDate) {
        return new Date(this.recordDate).Format("MM-dd");
      } else {
        return "";
      }
    },
    // 神经内科
    isNeurology() {
      return this.sheetInfo.sheetType == "neurology";
    },
    isDisabed() {
      if (
        this.HOSPITAL_ID == "weixian" &&
        this.tr.find(item => item.key == "description").value &&
        !this.tr.find(item => item.key == "recordHour").value &&
        !this.tr.find(item => item.key == "recordMonth").value
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    open(config) {
      setTimeout(() => {
        window.closeAutoCompleteNoId();
      }, 300);
      let record = config.record;
      this.record = record;
      this.isLast = config.isLast;
      // 判断是否能编辑
      let tr = record[record.length - 1];
      this.tr = tr || [];
      let isRead;
      let status = tr.find(item => item.key == "status").value;
      let empNo = tr.find(item => item.key == "empNo").value;
      let isAuditor = JSON.parse(localStorage.user).nursingStaff;
      if (status >= 1) {
        if (empNo == JSON.parse(localStorage.user).empNo || isAuditor) {
          isRead = false;
        } else {
          isRead = true;
        }
      } else {
        isRead = false;
      }
      this.isRead = isRead;
      this.table = config.table;
      this.customTitle = decoder_title(config.thead);
      let decodeData = decoder_record2(config.record, this.customTitle);
      this.staticObj = decodeData[0];
      this.dictionary = decodeData[1];
      this.fixedList = decodeData[2];
      for (let item in this.fixedList) {
        let width = this.fixedList[item].width;
        if (width && Number(width) && width > 85) {
          this.fixedList[item].maxWidth = width + 10;
        }
      }
      let tab = config.tab;
      // 特殊记录组合
      let doc = "";
      for (let i = 0; i < record.length; i++) {
        doc += record[i].find(item => item.key == "description").value || "";
      }
      this.recordDate =
        config.recordDate ||
        record[0].find(item => item.key == "recordDate").value ||
        "";

      if (true) {
        // 清除空格
        var reg = new RegExp(" ", "g");
        doc = doc.replace(reg, "");
      }
      // 富文本处理（去除字符串开头空格）
      this.doc = doc.replace(/&nbsp;/g, " ").replace(/^\s*/g, "");
      for (let j = 0; j < sheetModel.length; j++) {
        for (let k = 0; k < sheetModel[j].bodyModel.length; k++) {
          if (
            sheetModel[j].bodyModel[k] === this.record[this.record.length - 1]
          ) {
            this.lastZ = j;
            this.lastY = k;
          }
        }
      }
      this.$refs.modal.open();
      this.check = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];

      this.activeTab = tab || "1";
      if (tab == "1") {
        setTimeout(() => {
          $("#specialForm input")[2].focus();
        }, 100);
      } else if (tab == "2") {
        setTimeout(() => {
          $("#specialForm .custom-box input")[0].focus();
        }, 100);
      } else if (tab == "3") {
        setTimeout(() => {
          this.$refs.textArea.querySelector(".text-con textarea").focus();
        }, 100);
      }

      setTimeout(() => {
        let elelist = $('#specialForm input[type="text"]');
        FormToEnter(elelist);
      }, 100);
    },
    close() {
      this.$refs.modal.close();
    },
    // 处理特殊字符转换函数
    htmlEscape(str) {
      return String(str)
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
    },
    /**
     * 处理标签函数(拆分上下标签 过滤P标签)
     * 例子：
     *   const egStr = <p>你好吗<sup>11</sup><sub>22</sub>好的</p>;
     *   setLabelData(egStr); // 你好吗<sup>1</sup>sup>1</sup><sub>2</sub><sub>2</sub>好的
     */
    setLabelData(data) {
      if (!data.trim().length) return "";
      const regP = /(<\/?p.*?>)/gi;
      let val = data.replace(regP, "");
      const subArray = val.match(/<sub>(.*?)<\/sub>/g);
      const supArray = val.match(/<sup>(.*?)<\/sup>/g);
      if ((subArray && subArray.length) || (supArray && supArray.length)) {
        var subReg = /(<\/?sub.*?>)/gi;
        var supReg = /(<\/?sup.*?>)/gi;
        subArray &&
          subArray.map(item => {
            const wipeLabel = item.replace(subReg, "");
            const itemArray = wipeLabel.split("");
            let str = "";
            itemArray.map(item => (str += "<sub>" + item + "</sub>"));
            val = val.replace(new RegExp(item, "g"), str);
          });
        supArray &&
          supArray.map(item => {
            const wipeLabel = item.replace(supReg, "");
            const itemArray = wipeLabel.split("");
            let str = "";
            itemArray.map(item => (str += "<sup>" + item + "</sup>"));
            val = val.replace(new RegExp(item, "g"), str);
          });
      }
      return val;
    },
    // 保存（富文本）
    postRichText() {
      let okLength = this.HOSPITAL_ID === "lingcheng" ? 46 : 23;
      var GetLength = function(str) {
        // 过滤上下标签替换
        const subReg = /(<\/?sub.*?>)/gi;
        const supReg = /(<\/?sup.*?>)/gi;
        let wipeSubStr = str.replace(subReg, "");
        let wipeSupStr = wipeSubStr.replace(supReg, "");
        // 计算文本内容真实长度
        var realLength = 0,
          len = wipeSupStr.length,
          charCode = -1;
        for (var i = 0; i < len; i++) {
          charCode = wipeSupStr.charCodeAt(i);
          if (charCode == 94) realLength += 0;
          else if (charCode >= 0 && charCode <= 128 && charCode != 32)
            realLength += 1;
          else realLength += 2;
        }
        return realLength;
      };
      // 存放切割数据
      let result = [];
      let text = "";
      // 处理特殊字符 标签
      const doc = this.htmlEscape(this.doc);
      let allDoc = this.setLabelData(doc);
      // 首行缩进效果
      if (
        this.HOSPITAL_ID != "weixian" &&
        this.HOSPITAL_ID != "huadu" &&
        this.sheetInfo.sheetType != "special"
      ) {
        allDoc = "  " + allDoc;
      }
      // 开关 + 判断标签是否开始
      let isSpecialLabel = false;
      let index = 0;
      for (let i = 0; i < allDoc.length; i++) {
        let charCode = allDoc.charCodeAt(i);
        const isContinue = isSpecialLabel && i <= index + 11;
        if (
          charCode == "65292" ||
          charCode == "12290" ||
          charCode == "65307" ||
          charCode == "44" ||
          charCode == "46" ||
          charCode == "65306" ||
          charCode == "58" ||
          isContinue
        ) {
          text += allDoc[i];
        } else {
          if (GetLength(text) > okLength) {
            text = text.replace(/\s/g, "&nbsp;");
            result.push(text);
            isSpecialLabel = false;
            text = allDoc[i];
          } else {
            // 通过<s双重判断是否开始标签
            if (allDoc[i] === "<" && allDoc[i + 1] === "s") {
              isSpecialLabel = true;
              index = i;
            }
            text += allDoc[i];
          }
        }
      }
      if (text) {
        result.push(text.replace(/\s/g, "&nbsp;"));
      }
      if (result.length == 0) {
        result.push("");
      }
      for (let i = 0; i < this.record.length; i++) {
        this.record[i].find(item => item.key == "description").value = "";
      }
      for (let i = 0; i < result.length; i++) {
        if (i == 0) {
          // 合并数据
          mergeTr(this.record[0], this.staticObj, this.fixedList);
        }
        if (this.record[i]) {
          this.record[i].find(item => item.key == "description").value =
            result[i];
        } else {
          let currRow = JSON.parse(JSON.stringify(this.record[0]));
          let nullRowArr = nullRow();

          nullRowArr.find(
            item => item.key == "recordSource"
          ).value = currRow.find(item => item.key == "recordSource").value;
          nullRowArr.find(
            item => item.key == "recordDate"
          ).value = currRow.find(item => item.key == "recordDate").value;

          sheetModel[this.lastZ].bodyModel.splice(
            this.lastY + 1,
            0,
            nullRowArr
          );
          this.lastY++;
          sheetModel[this.lastZ].bodyModel[this.lastY].find(
            item => item.key == "description"
          ).value = result[i];
        }
      }
      this.bus.$emit("saveSheetPage", this.isLast);
      this.close();
    },
    // 保存（普通文本）
    post() {
      // 计算字节长度
      var GetLength = function(str) {
        var realLength = 0,
          len = str.length,
          charCode = -1;
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          // 字符串^(String.fromCharCode([Unicode Value,]);可还原原字符.例如String.fromCharCode(94))
          if (charCode == 94) realLength += 0;
          else if (charCode >= 0 && charCode <= 128) realLength += 1;
          else realLength += 2;
        }
        return realLength;
      };
      let result = [];
      let text = "";
      let allDoc = this.doc;
      if (
        this.HOSPITAL_ID != "weixian" &&
        this.sheetInfo.sheetType != "special" &&
        this.HOSPITAL_ID != "huadu"
      ) {
        allDoc = "    " + this.doc;
      }
      for (let i = 0; i < allDoc.length; i++) {
        let charCode = allDoc.charCodeAt(i);
        // 字符为 ，。；,.：:
        if (
          charCode == "65292" ||
          charCode == "12290" ||
          charCode == "65307" ||
          charCode == "44" ||
          charCode == "46" ||
          charCode == "65306" ||
          charCode == "58"
        ) {
          text += allDoc[i];
        } else {
          if (this.HOSPITAL_ID == "lingcheng") {
            if (GetLength(text) > 46) {
              result.push(text);
              text = allDoc[i];
            } else {
              text += allDoc[i];
            }
          } else {
            if (GetLength(text) > 23) {
              result.push(text);
              text = allDoc[i];
            } else {
              text += allDoc[i];
            }
          }
        }
      }
      if (text) {
        result.push(text);
      }
      if (result.length == 0) {
        result.push("");
      }
      for (let i = 0; i < this.record.length; i++) {
        this.record[i].find(item => item.key == "description").value = "";
      }
      for (let i = 0; i < result.length; i++) {
        if (i == 0) {
          // 合并数据
          mergeTr(this.record[0], this.staticObj, this.fixedList);
        }
        if (this.record[i]) {
          this.record[i].find(item => item.key == "description").value =
            result[i];
        } else {
          let currRow = JSON.parse(JSON.stringify(this.record[0]));
          let nullRowArr = nullRow();

          nullRowArr.find(
            item => item.key == "recordSource"
          ).value = currRow.find(item => item.key == "recordSource").value;
          nullRowArr.find(
            item => item.key == "recordDate"
          ).value = currRow.find(item => item.key == "recordDate").value;

          sheetModel[this.lastZ].bodyModel.splice(
            this.lastY + 1,
            0,
            nullRowArr
          );
          this.lastY++;
          sheetModel[this.lastZ].bodyModel[this.lastY].find(
            item => item.key == "description"
          ).value = result[i];
        }
      }
      this.bus.$emit("saveSheetPage", this.isLast);
      this.close();
    },
    openTemplateSlider() {
      // this.$message.warning('正在开发中')
      this.$refs.templateSlide.open();
    },
    breforeClose() {
      this.$refs.templateSlide.close();
    },
    dateKey,
    timeKey,
    spaceToKey(e, obj, key) {
      if (e.keyCode == 32) {
        obj.value += "/";
        e.preventDefault();
      }
    },
    f1Key(e, obj, key) {
      if (e.keyCode == 192) {
        obj[key] += "✓";
        e.preventDefault();
      }
    },
    // 是否显示该选项
    isShowItem() {
      return !this.tr.find(item => item.key == "recordMonth").hidden;
    }
  },
  mounted() {
    // 打开特殊情况
    window.openSpecialModal2 = config => {
      this.open(config);
    };
  },
  created() {
    this.bus.$on("addTemplateAtDoc", val => {
      // 模板添加
      const regP = /(<\/?p.*?>)/gi;
      let doc = this.doc.replace(regP, "");
      let valRegP = val.replace(regP, "");
      this.doc = doc + valRegP;
    });
  },
  watch: {
    check: {
      deep: true,
      handler() {
        for (let i = 0; i < this.customTitle.length; i++) {
          if (this.check[i]) {
            this.staticObj[this.customTitle[i].key] = "✓";
          }
        }
      }
    }
  },
  components: {
    templateSlide,
    quillEditor
  }
};
</script>
