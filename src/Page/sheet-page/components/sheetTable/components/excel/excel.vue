<template>
  <div
    class="sheet-excel-container"
    :class="{ icu_lc: sheetInfo.sheetType == 'icu_lc' }"
  >
    <!-- <div>
      <img :src="dataURL" alt :style="{width: fiexHeaderWidth}">
    </div>-->
    <table
      class="sheet-table table-fixed-th no-print"
      :style="{ width: fiexHeaderWidth }"
      :class="{ isFixed, isInPatientDetails }"
      v-if="hasFiexHeader && HOSPITAL_ID !== 'hengli'"
    >
      <tr class="body-con">
        <td v-for="(td, i) in titleModel" :key="i" :dataKey="td.key">
          <template>
            <div v-if="td.key == 'sign'" class="sign-text"></div>
            <div v-else-if="td.key == 'sign2'" class="sign-text"></div>
            <div v-else-if="td.key == 'audit'" class="sign-text"></div>
            <div v-else-if="td.key == 'signerNo'" class="sign-img"></div>
            <div v-else-if="td.key == 'signerNo2'" class="sign-img"></div>
            <textarea
              v-else-if="td.textarea"
              :style="
                Object.assign({}, td.style, {
                  minWidth: td.textarea.width + 'px',
                  maxWidth: td.textarea.width + 'px'
                })
              "
            ></textarea>
            <input type="text" :style="[td.style]" v-else />
          </template>
        </td>
      </tr>
      <tr
        class="head-con"
        v-for="(th, index) in data.titleModel.th"
        :key="index"
      >
        <th
          v-for="(item, i) in th"
          :key="i"
          :dataName="(item.name + '').trim()"
          :colspan="item.colspan"
          :rowspan="item.rowspan"
          :style="item.style"
          :class="{ canSet: item.canSet }"
          @click="item.canSet && setTitle(item)"
        >
          <span v-html="item.name"></span>
        </th>
      </tr>
    </table>

    <table class="sheet-table" ref="table">
      <tr
        class="head-con"
        v-for="(th, index) in data.titleModel.th"
        :key="index"
      >
        <th
          v-for="(item, i) in th"
          :key="i"
          :dataName="(item.name + '').trim()"
          :colspan="item.colspan"
          :rowspan="item.rowspan"
          :style="item.style"
          :class="{ canSet: item.canSet }"
          @click="item.canSet && setTitle(item)"
        >
          <span v-html="item.name"></span>
        </th>
      </tr>
      <tr
        class="body-con"
        @dblclick="openEditModal(tr, data, $event)"
        v-for="(tr, y) in data.bodyModel"
        :class="[
          {
            inPreview:
              !tr.find(item => item.key == 'id').value &&
              tr.find(item => item.key == 'recordDate').value,
            noSignRow: tr.find(item => item.key == 'status').value === '0',
            multiSign: tr.find(item => item.key == 'multiSign').value,
            selectedTr: sheetInfo.selectRow.includes(tr),
            clickRow: sheetInfo.clickRow === tr,
            redText:
              tr.find(item => {
                return item.key == 'recordSource';
              }).value == '5'
          },
          tr.find(item => {
            return item.key == 'markObj';
          }).value &&
            `mark-mark-mark mark-cell-status-${
              tr.find(item => {
                return item.key == 'markObj';
              }).value.status
            }`,
          {
            redTop: HOSPITAL_ID == 'huadu' && getBorderClass(tr)
          }
        ]"
        :key="y"
        @click="selectRow(tr, $event)"
        @mouseover="markTip($event, tr)"
        @mouseout="closeMarkTip"
        :recordId="tr.find(item => item.key == 'id').value"
      >
        <td
          v-for="(td, x) in tr"
          :key="td.key"
          :dataKey="td.key"
          :dataName="td.name"
          v-if="!td.hidden"
          @mouseover="markTip($event, td)"
          @mouseout="closeMarkTip"
          :class="[
            td.markObj &&
              `mark-mark-mark mark-cell-status-${td.markObj.status}`,
            HOSPITAL_ID == 'lingcheng' &&
              td.value &&
              td.statBottomLine &&
              `stat-bottom-line`
          ]"
          @contextmenu.stop="openContextMenu($event, y, tr, td)"
          @click="selectedItem(td)"
        >
          <!-- for 年份 -->
          <input
            type="text"
            :readonly="true"
            :value="tr.find(item => item.key == 'yearBreak').value"
            :data-value="tr.find(item => item.key == 'yearBreak').value"
            :style="[td.style, { height: '12px' }]"
            v-if="
              td.key === 'recordMonth' &&
                tr.find(item => item.key == 'yearBreak').value
            "
          />
          <div
            v-if="td.key == 'sign'"
            class="sign-text"
            @click.stop="
              toSign(tr, y, data.bodyModel, showSign(tr), $event, td)
            "
            v-html="showSign(tr)"
          ></div>
          <div
            v-else-if="HOSPITAL_ID === 'huadu' && td.key == 'sign2'"
            class="sign-text"
            @click.stop="
              toSign(tr, y, data.bodyModel, showSign_hd(tr), $event, td)
            "
            v-html="showSign_hd(tr)"
          ></div>
          <div
            v-else-if="td.key == 'audit'"
            class="sign-text"
            @click.stop="toAudit(tr, y, data.bodyModel, showAudit(tr), $event)"
            v-html="showAudit(tr)"
          ></div>
          <!-- 第一个签名的位置 -->
          <div v-else-if="td.key == 'signerNo'" class="sign-img">
            <img
              v-if="tr.find(item => item.key == 'auditorNo').value"
              :src="
                `/crNursing/api/file/signImage/${
                  tr.find(item => item.key == 'auditorNo').value
                }?${token}`
              "
              alt
            />
            <!-- 针对双签名打印预览为 xxx/xxx 显示 -->
            <!-- auditArr.includes(sheetInfo.sheetType) -->
            <img
              v-if="
                multiSignArr.includes(sheetInfo.sheetType) &&
                  tr.find(item => item.key == 'signerNo2').value
              "
              :src="
                `/crNursing/api/file/signImage/${
                  tr.find(item => item.key == 'signerNo2').value
                }?${token}`
              "
              alt
            />
            <span v-if="tr.find(item => item.key == 'auditorNo').value">/</span>
            <span
              v-if="
                (sheetInfo.sheetType === 'common_hd' ||
                  sheetInfo.sheetType === 'neurosurgery_hd') &&
                  tr.find(item => item.key == 'signerNo2').value
              "
              >/</span
            >
            <img
              v-if="td.value"
              :style="!td.value && { opacity: 0 }"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <!-- <div v-else-if="td.key == 'auditorNo'" class="sign-img">
            <img v-if="td.value" :src="`/crNursing/api/file/signImage/${td.value}?${token}`" alt>
          </div>-->
           <el-select
           v-else-if="td.type=='select' && HOSPITAL_ID == 'guizhou'"
          v-model="td.value"
          filterable
          remote
          placeholder=""
          size="small"
          class="access-select"
          autocomplete="off"
          :remote-method="remoteMethod"
          @visible-change="td.autoComplete && getOptionsData(td,tr,$event)"
        >
          <el-option
            v-for="item in accessOptionData[td.name]"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
          <textarea
            v-else-if="td.textarea"
            :class="{ towLine: isOverText(td) }"
            :readonly="isRead(tr)"
            :disabled="isDisabed(tr)"
            v-model="td.value"
            :data-value="td.value"
            :position="`${x},${y},${index}`"
            v-bind="td.props"
            :style="
              Object.assign(
                {},
                td.style,
                {
                  minWidth: td.textarea.width + 'px',
                  maxWidth: td.textarea.width + 'px'
                },
                isDisabed(tr) && { cursor: 'not-allowed' }
              )
            "
            @keydown="
              td.event($event, td);
              onKeyDown($event, { x, y, z: index, td });
            "
            :maxlength="td.textarea.maxLength || 1000"
            @input="td.change && td.change($event, td)"
            @focus="
              td.autoComplete &&
                onFocus($event, {
                  autoComplete: td.autoComplete,
                  x,
                  y,
                  z: index,
                  td,
                  tr,
                  splice: !!td.splice
                })
            "
            @blur="onBlur($event, { x, y, z: index })"
          ></textarea>
          <!-- 护理记录单特殊情况特殊记录单独处理 -->
          <div
            v-else-if="
              td.key === 'description' &&
                HOSPITAL_ID === 'lingcheng' &&
                sheetInfo.selectBlock.openRichText
            "
            v-html="td.value"
            :class="
              sheetInfo.sheetType == 'icu_lc' ? 'specialFontSize' : 'normal'
            "
            style="text-align: left"
          ></div>
          <input
            type="text"
            :readonly="isRead(tr)"
            :disabled="isDisabed(tr, td)"
            v-model="td.value"
            :data-value="td.value"
            :position="`${x},${y},${index}`"
            :style="[
              td.style,
              td.key === 'recordMonth' &&
                tr.find(item => item.key == 'yearBreak').value && {
                  height: '12px'
                },
              isDisabed(tr, td) && { cursor: 'not-allowed' }
            ]"
            @keydown="
              td.event($event, td);
              onKeyDown($event, { x, y, z: index, td });
            "
            @focus="
              td.autoComplete &&
                onFocus($event, {
                  autoComplete: td.autoComplete,
                  x,
                  y,
                  z: index,
                  td,
                  tr
                })
            "
            @blur="onBlur($event, { x, y, z: index })"
            @click="!isRead(tr) && td.click && td.click($event, td)"
            v-else
          />
        </td>
        <span v-show="false" v-else>{{ td.key }}: {{ td.value }}</span>
      </tr>
    </table>

    <slot
      name="bottomCon"
      v-if="
        sheetInfo.sheetType === 'neonatology_picc' ||
          sheetInfo.sheetType === 'internal_eval_lcey' ||
          sheetInfo.sheetType === 'intervention_cure_lcey' ||
          sheetInfo.sheetType === 'critical_lc' ||
          sheetInfo.sheetType === 'picu_hemodialysis_jm' ||
          sheetInfo.sheetType === 'rescue_hl'
      "
    ></slot>
    <!-- 表格下方的备注组件 -->
    <bottomRemark></bottomRemark>
    <div>
      <slot
        name="bottonInput"
        v-if="sheetInfo.sheetType == 'surgical_eval2_lcey'"
      ></slot>
    </div>
    <div
      class="table-footer"
      v-if="sheetInfo.sheetType != 'intervention_cure_hd'"
    >
      <!-- <span v-if="sheetInfo.sheetType == 'common_hl'" class="zg-name"> -->
      <span v-if="doubleSignArr.includes(sheetInfo.sheetType)" class="zg-name">
        <span>主管护士：</span>
        <span class="sign-img-con" @click="sign2">
          <span v-if="!isPrint" class="head-sign-text">{{
            sheetInfo.selectBlock.relSignInfo.signerName2
          }}</span>
          <img
            class="head-sign-img"
            v-if="sheetInfo.selectBlock.relSignInfo.signerNo2"
            :src="
              `/crNursing/api/file/signImage/${sheetInfo.selectBlock.relSignInfo.signerNo2}?${token}`
            "
            alt
          />
        </span>
      </span>
      第 {{ index + sheetStartPage }} 页
      <span class="sh-name" v-if="auditArr.includes(sheetInfo.sheetType)">
        <span
          v-if="
            sheetInfo.sheetType == 'com_lc' ||
              sheetInfo.sheetType == 'icu_lc' ||
              sheetInfo.sheetType == 'Record_Children_Serious_Lc' ||
              sheetInfo.sheetType == 'common_hd' ||
              sheetInfo.sheetType == 'neurosurgery_hd' ||
              sheetInfo.sheetType == 'stress_injury_hd' ||
              sheetInfo.sheetType == 'critical_lc' ||
              sheetInfo.sheetType == 'common_sn' ||
              sheetInfo.sheetType == 'maternity_sn'
          "
          >审核人：</span
        >
        <span
          v-else-if="
            sheetInfo.sheetType == 'common_wj' ||
              sheetInfo.sheetType == 'common_hl' ||
              sheetInfo.sheetType == 'rescue_hl' ||
              sheetInfo.sheetType == 'emergency_stay_hl'
          "
          >护士长签名：</span
        >
        <span
          v-else-if="
            sheetInfo.sheetType == 'obstetrics_hl' ||
              sheetInfo.sheetType == 'gynecology_hl' ||
              sheetInfo.sheetType == 'neonatology_hl'
          "
          >质控护士：</span
        >
        <span v-else-if="sheetInfo.sheetType == 'intervention_cure_lcey'"
          >护士签名：</span
        >
        <span v-else>上级护士签名：</span>
        <span class="sh-name-box">
          <div
            class="sign-null-box"
            @click="openAduitModal"
            v-if="!auditorNo"
          ></div>
          <div class="sign-in-box" v-else @click="cancelAduitModal">
            <div class="audit-text no-print">{{ auditorName }}</div>
            <div class="audit-img sign-img">
              <img
                class="in-print"
                :src="`/crNursing/api/file/signImage/${auditorNo}?${token}`"
                alt
              />
            </div>
          </div>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      <!-- / {{Math.max(sheetMaxPage,(length + sheetStartPage - 1))}}  -->
      <!-- <span class="sh-name">审核人：
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>-->
    </div>
    <span v-if="sheetInfo.model != 'print'">
      <signModal ref="signModal"></signModal>
      <signModal ref="delsignModal" title="删除签名需签名者确认"></signModal>
    </span>
  </div>
</template>

<style lang="stylus" src="./style.styl"></style>

<script>
import { nullRow } from "../../../../components/render/Body.js";
import {
  saveTitle,
  sign,
  cancelSign,
  delRow,
  markSave,
  markDelete
} from "@/api/sheet.js";
import signModal from "@/components/modal/sign.vue";
import { Tr } from "../../../render/Body.js";
import {
  offset,
  getCursortPosition,
  focusElement,
  leftTopBottomRight,
  onFocusToAutoComplete,
  onBlurToAutoComplete
} from "./tool.js";
import sheetInfo from "../../../config/sheetInfo";
import Mark, { matchMark } from "../../../render/Mark.js";
import $ from "jquery";
import bus from "vue-happy-bus";
import sheetModel from "../../../../sheet.js";
import common from "@/common/mixin/common.mixin.js";
import {
  handlepz,
  delpz,
  auditpz,
  signBlockD,
  cancelSignD
} from "../../../../api/index.js";
import decode from "../../../../components/render/decode.js";
import moment from "moment";
import { getUser } from "@/api/common.js";
import bottomRemark from "./remark";
console.dir(sheetInfo);
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    scrollY: Number,
    hasFiexHeader: Boolean,
    isInPatientDetails: Boolean
  },
  mixins: [common],
  data() {
    return {
      Mark,
      matchMark,
      bus: bus(this),
      sheetInfo,
      fiexHeaderWidth: 0,
      isFixed: false,
      multiSign: false,
      auditArr: [
        "com_lc",
        "icu_lc",
        "common_hd",
        "stress_injury_hd",
        "wait_delivery_hd",
        "neurosurgery_hd",
        "neonatology_hd",
        "neonatology2_hd",
        "Record_Children_Serious_Lc",
        "contraction_inhibitor_hd",
        "magnesium_sulphate_hd",
        "prenatal_hd",
        "postpartum_hd", // 产后护理记录单
        "common_wj",
        "intervention_cure_lcey",
        "critical_lc",
        "common_hl",
        "rescue_hl",
        "emergency_stay_hl",
        "neonatology_hl",
        "obstetrics_hl",
        "gynecology_hl",
        "prenatal_hl",
        "common_sn",
        "maternity_sn"
      ],
      // 需要双签名的记录单code
      multiSignArr: [
        "common_hd", // 花都_通用护理记录单
        "neurosurgery_hd", // 花都_神经外科护理记录单
        "prenatal_hd", // 花都_产前记录单
        "neonatology2_hd", // 花都_新生儿护理记录单
        "postpartum_hd", // 花都_产后记录单
        "wait_delivery_hd", // 花都_候产记录单
        "neonatology_hd" // 花都_新生儿科护理记录单
      ],
      // 底部两个签名的其中一个自定义字段
      doubleSignArr: [
        "common_hl",
        "rescue_hl",
        "emergency_stay_hl",
        "neonatology_hl",
        "obstetrics_hl",
        "gynecology_hl",
        "prenatal_hl"
      ],
      accessOptionList: [],//下拉列表数据（贵州人医）
      defaultOptionList: [],//默认下拉列表数据
      accessOptionData: {//所有下拉列表数据
        入量名称: [],
        入量方式: [],
        途径: [],
        出量名称: [],
        出量方式: [],
        性质: []
      },
      currentKey: '',//点击下拉当前的key
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    sheetStartPage() {
      return this.sheetInfo.sheetStartPage;
    },
    sheetMaxPage() {
      return this.sheetInfo.sheetMaxPage;
    },
    auditorNo() {
      return (
        sheetInfo.auditorMap &&
        sheetInfo.auditorMap[`PageIndex_${this.index}_auditorNo`]
      );
    },
    auditorName() {
      return (
        sheetInfo.auditorMap &&
        sheetInfo.auditorMap[`PageIndex_${this.index}_auditorName`]
      );
    },
    titleModel() {
      return this.data.bodyModel[0].filter(td => {
        return !td.hidden;
      });
    }
  },
  methods: {
    /* 花都个别护记的出入量统计：增加红线与上一行做区分 */
    getBorderClass(tr) {
      // const redTopSheet_hd = [
      //   "common_hd",
      //   "prenatal_hd",
      //   "postpartum_hd",
      //   "neonatology_hd",
      //   "neurosurgery_hd"
      // ];
      // if (redTopSheet_hd.includes(this.sheetInfo.sheetType)) {
      //   const temp = this.data.bodyModel.findIndex(tr => {
      //     return tr.find(i => i.key === "recordSource").value === "5";
      //   });
      //   return temp === index;
      // }
      return tr.find(i => i.key === "recordSource").value === "5";
    },
    // 键盘事件
    onKeyDown(e, bind) {
      if (sheetInfo.model == "print") return;
      // 键盘切换事件
      leftTopBottomRight(e, bind);
    },
    onFocus(e, bind) {
      if (sheetInfo.model == "print") return;
      if (!this.sheetInfo.downControl) {
        onFocusToAutoComplete(e, bind);
      }
    },
    onBlur(e, bind) {
      if (sheetInfo.model == "print") return;
      onBlurToAutoComplete(e, bind);
    },
    setTitle(item) {
      this.$parent.$parent.$refs.sheetTool.$refs.setTitleModal.open(
        title => {
          let data = {
            patientId: this.patientInfo.patientId,
            visitId: this.patientInfo.visitId,
            pageIndex: this.index,
            fieldEn: item.key,
            fieldCn: title,
            recordCode: sheetInfo.sheetType
          };
          saveTitle(data).then(res => {
            item.name = title;
          });
        },
        item.name,
        item
      );
    },
    addNullRow(index, row) {
      let newRow = nullRow();
      if (row) {
        let recordSource = row.find(item => {
          return item.key == "recordSource";
        }).value;
        newRow.find(item => {
          return item.key == "recordSource";
        }).value = recordSource;
      }
      this.data.bodyModel.splice(index + 1, 0, newRow);
    },
    toCopyRow(index) {
      this.data.bodyModel.splice(index, 1, this.sheetInfo.copyRow);
    },
    delRow(index) {
      let curr_row = this.data.bodyModel[index];
      let next_row = this.data.bodyModel[index + 1];
      let recordMonth = curr_row.find(item => {
        return item.key == "recordMonth";
      }).value;
      let recordHour = curr_row.find(item => {
        return item.key == "recordHour";
      }).value;
      try {
        let next_Month = next_row.find(item => {
          return item.key == "recordMonth";
        }).value;
        let next_Hour = next_row.find(item => {
          return item.key == "recordHour";
        }).value;
        if (next_row) {
          if (recordMonth && !next_Month) {
            next_row.find(item => {
              return item.key == "recordMonth";
            }).value = recordMonth;
          }
          if (recordHour && !next_Hour) {
            next_row.find(item => {
              return item.key == "recordHour";
            }).value = recordHour;
          }
        }
      } catch (error) {}
      this.data.bodyModel.splice(index, 1);
    },
    getPrev(index, bodyModel, val) {
      if (index < 0) return "";
      let tr = bodyModel[index];
      let value = tr.find(item => {
        return item.key == val;
      }).value;
      if (value) {
        return value;
      } else {
        return this.getPrev(index - 1, bodyModel, val);
      }
    },
    getAllListAndCurrIndex(trArr) {
      let allList = [];
      let currIndex = 0;
      for (let i = 0; i < sheetModel.length; i++) {
        allList = allList.concat(sheetModel[i].bodyModel);
      }
      currIndex = allList.indexOf(trArr);
      return [allList, currIndex];
    },
    toSign(trArr, index, bodyModel, showSign, e, td) {
      this.sheetInfo.downControl = e.ctrlKey;
      if (this.sheetInfo.downControl) return;
      if (this.sheetInfo.selectRow.length) {
        return this.bus.$emit("toSheetMoreSign");
      }
      if (td.key === "sign") {
        this.signType = "1";
      }
      if (td.key === "sign2") {
        this.signType = "2";
      }
      // 判断表单code再赋值多签名字段！！！不能直接在表内赋值multiSign不然会打印报错
      if (this.multiSignArr.includes(this.sheetInfo.sheetType)) {
        this.multiSign = true;
      }
      if (!showSign) {
        let status = trArr.find(item => {
          return item.key == "status";
        }).value;
        // if (status == 1) return this.$message.warning('该记录已经签名了')
        let save = () => {
          this.$refs.signModal.open((password, empNo) => {
            let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            let data = {
              empNo,
              password,
              list: [
                Object.assign({}, trObj, {
                  recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                  recordHour: this.getPrev(currIndex, allList, "recordHour"),
                  recordYear: this.getPrev(currIndex, allList, "recordYear"),
                  patientId: this.patientInfo.patientId,
                  visitId: this.patientInfo.visitId,
                  pageIndex: this.index
                })
              ],
              multiSign: this.multiSign || false,
              // multiSign: this.HOSPITAL_ID === "huadu" ? true : false,
              signType: this.HOSPITAL_ID === "huadu" ? this.signType : ""
            };
            sign(
              this.patientInfo.patientId,
              this.patientInfo.visitId,
              data
            ).then(res => {
              let trArrClone = Tr(res.data.data[0]);
              if (
                trArr.find(item => {
                  return item.key == "recordMonth";
                }).value == ""
              ) {
                trArrClone.find(item => {
                  return item.key == "recordMonth";
                }).value = "";
              }
              if (
                trArr.find(item => {
                  return item.key == "recordHour";
                }).value == ""
              ) {
                trArrClone.find(item => {
                  return item.key == "recordHour";
                }).value = "";
              }
              trArr.splice(0, trArr.length);
              for (let i = 0; i < trArrClone.length; i++) {
                trArr.push(trArrClone[i]);
              }
              this.$notify.success({
                title: "提示",
                message: "签名成功"
              });
              this.bus.$emit("saveSheetPage", true);
            });
          });
        };
        let reverseList = [...decode().list].reverse();
        /** 最后的时间 */
        let lastRecordHour = (
          reverseList.find(item => item.recordDate && item.recordHour) || {}
        ).recordHour;
        /** 所有新增的时间 */
        let newRecordHours = reverseList
          .filter(
            item => item.recordHour && !item.recordMonth && !item.recordDate
          )
          .map(item => item.recordHour);
        /** 新增记录是否存在比原有记录更前 */
        let isBefore = newRecordHours.some(
          item =>
            moment("2019-9-20 " + item).unix() <
            moment("2019-9-20 " + lastRecordHour).unix()
        );
        if (isBefore) {
          this.$confirm(
            "新增记录比原有记录时间更前, 请确定日期, 是否确认保存?",
            "提示",
            {
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(res => {
            save();
          });
        } else {
          save();
        }
      } else {
        // 删除签名
        this.$refs.delsignModal.open((password, empNo) => {
          let id = trArr.find(item => {
            return item.key == "id";
          }).value;
          cancelSign({
            id,
            empNo,
            password,
            multiSign: this.multiSign,
            // multiSign: this.HOSPITAL_ID === "huadu" ? true : false,
            signType: this.HOSPITAL_ID === "huadu" ? this.signType : ""
          }).then(res => {
            this.bus.$emit("saveSheetPage", true);
          });
        });
      }
    },
    toAudit(trArr, index, bodyModel, showAudit, e) {
      this.sheetInfo.downControl = e.ctrlKey;
      if (this.sheetInfo.downControl) return;
      if (this.sheetInfo.selectRow.length) {
        return this.bus.$emit("toSheetMoreAudit");
      }
      if (!showAudit) {
        let status = trArr.find(item => {
          return item.key == "status";
        }).value;
        // if (status == 1) return this.$message.warning('该记录已经签名了')
        this.$refs.signModal.open((password, empNo) => {
          let trObj = {};
          for (let i = 0; i < trArr.length; i++) {
            trObj[trArr[i].key] = trArr[i].value;
          }
          let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
          let data = {
            empNo,
            password,
            audit: true,
            list: [
              Object.assign({}, trObj, {
                recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                recordHour: this.getPrev(currIndex, allList, "recordHour"),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index
              })
            ]
          };
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            res => {
              let trArrClone = Tr(res.data.data[0]);
              if (
                trArr.find(item => {
                  return item.key == "recordMonth";
                }).value == ""
              ) {
                trArrClone.find(item => {
                  return item.key == "recordMonth";
                }).value = "";
              }
              if (
                trArr.find(item => {
                  return item.key == "recordHour";
                }).value == ""
              ) {
                trArrClone.find(item => {
                  return item.key == "recordHour";
                }).value = "";
              }
              trArr.splice(0, trArr.length);
              for (let i = 0; i < trArrClone.length; i++) {
                trArr.push(trArrClone[i]);
              }
              this.$notify.success({
                title: "提示",
                message: "审核成功"
              });
              this.bus.$emit("saveSheetPage", true);
            }
          );
        });
      } else {
        // 删除签名
        this.$refs.delsignModal.open((password, empNo) => {
          let id = trArr.find(item => {
            return item.key == "id";
          }).value;
          cancelSign({
            id,
            empNo,
            password,
            audit: true
          }).then(res => {
            this.bus.$emit("saveSheetPage", true);
          });
        });
      }
    },
    // 展示签名状态
    showSign(trArr) {
      let status = trArr.find(item => {
        return item.key == "status";
      }).value;
      let signerName = trArr.find(item => {
        return item.key == "signerName";
      }).value;
      if (status == "1" || status == "2") {
        if (this.HOSPITAL_ID == "weixian") {
          return trArr.find(item => item.key == "signerNo").value
            ? `<img
              width="50"
              height="100%"
              style="object-fit: contain"
              src="/crNursing/api/file/signImage/${
                trArr.find(item => item.key == "signerNo").value
              }?${this.token}"
              alt
            /> `
            : "";
        } else {
          return signerName;
        }
      } else {
        return "";
      }
    },
    // 展示签名状态
    showSign_hd(trArr) {
      let signerName2 = trArr.find(item => {
        return item.key == "signerName2";
      }).value;
      return signerName2;
    },
    // 展示审核状态
    showAudit(trArr) {
      let status = trArr.find(item => {
        return item.key == "status";
      }).value;
      let auditorName = trArr.find(item => {
        return item.key == "auditorName";
      }).value;
      if (status == "2") {
        return auditorName;
      } else {
        return "";
      }
    },
    // 除第一行以外到结束行之内其他单元格不能录入内容（威县），出入量统计行除外
    isDisabed(tr, td) {
      if (
        this.HOSPITAL_ID == "huadu" &&
        sheetInfo.sheetType === "body_temperature_Hd" &&
        td &&
        td.key === "empName"
      ) {
        return true;
      }
      if (td && td.key == "recordYear") {
        if (!tr.find(item => item.key == "recordMonth").value) {
          td.value = "";
        }
        return true;
      }
      // 护理记录单特殊情况记录输入多行,签名后,其他项目不能在编辑
      if (
        this.HOSPITAL_ID == "huadu" &&
        tr.find(item => item.key == "status").value === "1"
      ) {
        return tr.find(item => item.key == "status").value === "1";
      }
      if (
        this.HOSPITAL_ID != "weixian" ||
        (td && td.key == "description") ||
        tr.find(item => item.key == "recordSource").value == 5
      ) {
        return false;
      }
      if (
        tr.find(item => item.key == "description").value &&
        !tr.find(item => item.key == "recordHour").value &&
        !tr.find(item => item.key == "recordMonth").value
      ) {
        return true;
      } else {
        return false;
      }
    },
    isRead(tr) {
      let status = tr.find(item => item.key == "status").value;
      let empNo = tr.find(item => item.key == "empNo").value;
      if (status == 1) {
        if (empNo == this.empNo || this.isAuditor) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    checkMaxLength(value, length) {
      const regC = /[^ -~]+/g;
      const regE = /\D+/g;
      console.log("textarea", value, length);
    },
    isOverText(td) {
      try {
        let inputWidth = td.textarea.width;
        let textWidth = td.value.split("").reduce((total, num) => {
          let charCode = num.charCodeAt(0);
          if (charCode >= 0 && charCode <= 128) return total + 5.9;
          else return total + 11.8;
        }, 0);

        if (textWidth > inputWidth) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    // 右键菜单
    openContextMenu(e, index, row, cell) {
      $(e.target)
        .parents("tr")
        .addClass("selectedRow");
      let style = {
        top: `${Math.min(e.clientY - 15, window.innerHeight - 280)}px`,
        left: `${Math.min(e.clientX + 15, window.innerWidth - 180)}px`
      };
      let data = [
        {
          name: "向上插入新行",
          icon: "charuxinhang",
          click: () => {
            this.addNullRow(index - 1, row);
          }
        },
        {
          name: "向下插入新行",
          icon: "xiangxiacharuyihang",
          click: () => {
            this.addNullRow(index, row);
          }
        },
        {
          name: "复制行",
          icon: "fuzhizhenghang",
          click: () => {
            this.sheetInfo.copyRow = row
              .filter(item => {
                return true;
              })
              .map(item => {
                let obj = {};
                if (
                  item.key == "id" ||
                  item.key == "sign" ||
                  item.key == "signerName" ||
                  item.key == "status"
                ) {
                  obj = { value: "" };
                }
                return Object.assign({}, item, obj);
              });
          }
        },
        {
          name: "复制内容",
          icon: "fuzhizhenghang",
          click: () => {
            this.sheetInfo.copyRow = getSelection().toString() || cell.value;
          }
        },
        {
          name: "粘贴内容",
          icon: "niantiezhenghang",
          disable: !this.sheetInfo.copyRow,
          click: () => {
            if (typeof this.sheetInfo.copyRow == "string") {
              cell.value = this.sheetInfo.copyRow;
            } else {
              this.toCopyRow(index);
            }
          }
        },
        {
          name: "删除整行",
          icon: "shanchuzhenghang",
          click: () => {
            let id = row.find(item => {
              return item.key == "id";
            }).value;
            let isRead = this.isRead(row);
            if (id) {
              if (isRead) {
                this.$parent.$parent.$refs.signModal.open((password, empNo) => {
                  delRow(id, password, empNo).then(res => {
                    this.delRow(index);
                    this.$notify.success({
                      title: "提示",
                      message: "删除成功"
                    });
                    this.bus.$emit("saveSheetPage", true);
                  });
                });
              } else {
                this.$confirm("你确定删除该行数据吗", "提示", {
                  confirmButtonText: "删除",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(res => {
                  delRow(id, "", "").then(res => {
                    this.delRow(index);
                    this.$notify.success({
                      title: "提示",
                      message: "删除成功"
                    });
                    this.bus.$emit("saveSheetPage", true);
                  });
                });
              }
            } else {
              this.$confirm("你确定删除该行数据吗", "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning"
              }).then(res => {
                this.delRow(index);
                this.$notify.success({
                  title: "提示",
                  message: "删除成功"
                });
                this.bus.$emit("saveSheetPage", true);
              });
            }
          }
        },
        {
          name: "添加格批注",
          icon: "pizhu",
          click: () => {
            this.bus.$emit("openPizhuModal", row, cell);
          }
        },
        {
          name: "添加行批注",
          icon: "pizhu",
          click: () => {
            this.bus.$emit("openPizhuModal", row, "all");
          }
        },
        {
          name: "新建护理单",
          iconClass: "el-icon-document",
          click: () => {
            this.bus.$emit("splitSheet", row, cell);
          }
        }
        // {
        //   name: "文字标红",
        //   icon: "charuxinhang",
        //   click: () => {
        //     row.find(item => {
        //       return item.key == "recordSource";
        //     }).value = "5";
        //   }
        // },
        // {
        //   name: "取消标红",
        //   icon: "charuxinhang",
        //   click: () => {
        //     row.find(item => {
        //       return item.key == "recordSource";
        //     }).value = "1";
        //   }
        // }
        // {
        //   type: 'mark',
        //   initValue: {
        //     rowValue: row.find((item) => { return item.key == 'markType' }).value,
        //     cellValue: cell.markType
        //   },
        //   click: (color, type) => {
        //     let id = row.find((item) => {
        //       return item.key == 'id'
        //     }).value
        //     let status = row.find((item) => {
        //       return item.key == 'status'
        //     }).value
        //     if (!id) {
        //       return this.$notify.warning({ title: '提示', message: '只能标记已签名的行' })
        //     }
        //     if (type == 'cell' && !cell.key) {
        //       return this.$notify.warning({ title: '提示', message: '请选中需要标记的单元格' })
        //     }
        //     let data = {
        //       recordId: id,
        //       fieldEn: type == 'cell' ? cell.key : 'all',
        //       signType: color.key
        //     }
        //     if (color.key == 0) {
        //       return this.$parent.$parent.$refs.signModal.open((password, empNo) => {
        //         Object.assign(data, { password, empNo })
        //         markDelete(data).then(res => {
        //           if (type == 'cell') {
        //             cell.markType = ''
        //           } else if (type == 'row') {
        //             row.find((item) => { return item.key == 'markType' }).value = ''
        //           }
        //         })
        //       })
        //     } else {
        //       markSave(data).then(res => {
        //         if (type == 'cell') {
        //           cell.markType = color.key
        //         } else if (type == 'row') {
        //           row.find((item) => { return item.key == 'markType' }).value = color.key
        //         }
        //       })
        //     }
        //     console.log(color, type)
        //   }
        // }
      ];

      if (this.HOSPITAL_ID == "hj") {
        let obj = {
          name: "同步至交班志",
          iconClass: "sync-decription",
          click: () => {
            this.bus.$emit("syncDecription", row, cell);
          }
        };
        data.push(obj);
      }
      e.preventDefault();
      window.openContextMenu({ style, data });
    },
    openEditModal(tr, data, e) {
      // 护理记录单特殊情况记录输入多行,签名后,其他项目不能在编辑
      if (
        this.HOSPITAL_ID == "huadu" &&
        tr.find(item => item.key == "status").value === "1"
      )
        return tr.find(item => item.key == "status").value === "1";

      if (sheetInfo.model == "print") return;
      // 双击的input key
      let key =
        $(e.target).attr("datakey") ||
        $(e.target)
          .parents("td")
          .attr("datakey");
      let name = $(e.target)
        .parents("td")
        .attr("dataName");
      let tab = "1";
      if (key == "description") {
        tab = "3";
      } else if (name || key.indexOf("field") == -1) {
        tab = "1";
      } else {
        tab = "2";
      }

      // 双击打开编辑框,（除第1条外）默认显示特殊记录tab栏
      if (this.isDisabed(tr)) {
        tab = "3";
      }

      let thead = data.titleModel;
      let table = data.bodyModel;
      // 数组重组
      let allList = [];
      // 当前行的index
      let currIndex = 0;
      // 拼接的记录
      let record = [];
      // 最后行的id 即最大的id
      let maxId = 0;
      // 当前的类型做唯一标识
      let curr_recordSource = tr.find(item => item.key == "recordSource").value;
      let curr_recordDate = tr.find(item => item.key == "recordDate").value;
      if (curr_recordDate) {
        for (let i = 0; i < sheetModel.length; i++) {
          allList = allList.concat(sheetModel[i].bodyModel);
        }
        for (let i = 0; i < allList.length; i++) {
          maxId = Math.max(
            maxId,
            allList[i].find(item => item.key == "id").value
          );
          if (
            allList[i].find(item => item.key == "recordDate").value ==
              curr_recordDate &&
            allList[i].find(item => item.key == "recordSource").value ==
              curr_recordSource
          ) {
            record.push(allList[i]);
          }
        }
      } else {
        record.push(tr);
      }
      let isLast =
        !record[record.length - 1].find(item => item.key == "id").value ||
        record[record.length - 1].find(item => item.key == "id").value == maxId;
      let config = {
        record,
        table,
        thead,
        tab,
        isLast
      };
      // if (
      //   this.HOSPITAL_ID == "weixian" ||
      //   this.HOSPITAL_ID == "lingcheng" ||
      //   this.HOSPITAL_ID == "huadu" ||
      //   this.HOSPITAL_ID == "hengli" ||
      //   this.HOSPITAL_ID == "liaocheng" ||
      //   this.HOSPITAL_ID == "zhongshanqi" ||
      //   this.HOSPITAL_ID == "shannan"
      // ) {
      //   window.openSpecialModal2(config);
      // } else {
      //   window.openSpecialModal(config); //旧版本
      // }
      // 双击出现记录单编辑弹框
      window.openSpecialModal2(config);
    },
    markTip(e, td) {
      if (sheetInfo.model == "print") return;
      let dom = $(e.target).parents("td").length
        ? $(e.target).parents("td")[0]
        : e.target;
      let key = $(dom).attr("dataKey");
      let obj;
      if (td.markObj) {
        // 格子
        obj = td.markObj;
        e.stopPropagation();
      } else {
        // 行
        try {
          obj = td.find(item => item.key == "markObj").value;
        } catch (e) {}
      }
      let left, top;
      if (obj) {
        if (key == "description" || key == "sign" || key == "audit") {
          left = dom.getBoundingClientRect().left - 240;
        } else {
          left =
            dom.getBoundingClientRect().left +
            dom.getBoundingClientRect().width;
        }
        top = Math.min(
          dom.getBoundingClientRect().top + 1,
          window.innerHeight - 140
        );
        window.openMarkTip({
          style: {
            left,
            top
          },
          data: obj,
          td,
          fun: {
            handlepz,
            delpz,
            auditpz
          }
        });
      }
    },
    closeMarkTip() {
      if (sheetInfo.model == "print") return;
      window.closeMarkTip();
    },
    // 按下commmand多选
    selectRow(tr, e) {
      if (sheetInfo.model == "print") return;
      if (this.HOSPITAL_ID == "weixian") {
        this.sheetInfo.clickRow = tr;
      }
      this.sheetInfo.clickRow = tr;
      if (this.sheetInfo.downControl) {
        this.sheetInfo.downControl = e.ctrlKey;
        let index = this.sheetInfo.selectRow.indexOf(tr);
        if (index > -1) {
          this.sheetInfo.selectRow.splice(index, 1);
        } else {
          this.sheetInfo.selectRow.push(tr);
        }
      }
    },
    selectedItem(td) {
      if (td.isSelected) {
        td.value = "✓";
      }
    },
    /** 审核整页 */
    openAduitModal() {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          let { empNo, empName } = res.data.data;
          sheetInfo.auditorMap[`PageIndex_${this.index}_auditorNo`] = empNo;
          sheetInfo.auditorMap[`PageIndex_${this.index}_auditorName`] = empName;
          sheetInfo.auditorMap = { ...sheetInfo.auditorMap };
          this.$notify.success({
            title: "提示",
            message: "审核成功",
            duration: 2000
          });
          this.bus.$emit("saveSheetPage", false);
        });
      }, "审核签名确认");
    },
    /** 取消审核整页 */
    cancelAduitModal() {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          let { empNo, empName } = res.data.data;
          if (this.auditorNo == empNo || this.HOSPITAL_ID === "huadu") {
            sheetInfo.auditorMap[`PageIndex_${this.index}_auditorNo`] = "";
            sheetInfo.auditorMap[`PageIndex_${this.index}_auditorName`] = "";
            sheetInfo.auditorMap = { ...sheetInfo.auditorMap };
            this.$notify.success({
              title: "提示",
              message: "取消审核成功",
              duration: 2000
            });
            this.bus.$emit("saveSheetPage", false);
          } else {
            this.$message.warning("非审核本人不可取消");
          }
        });
      }, "取消签名确认");
    },
    /** 右侧主管护士签名 */
    sign2() {
      if (this.sheetInfo.selectBlock.relSignInfo == undefined) {
        this.sheetInfo.selectBlock.relSignInfo = {};
      }
      let title = sheetInfo.selectBlock.relSignInfo.signerName2
        ? "取消签名"
        : "责任护士签名";
      window.openSignModal((password, username) => {
        if (sheetInfo.selectBlock.relSignInfo.signerName2) {
          cancelSignD(password, username, 2).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName2",
              res.data.data.relSignInfo.signerName2
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo2",
              res.data.data.relSignInfo.signerNo2
            );
          });
        } else {
          signBlockD(password, username, 2).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName2",
              res.data.data.relSignInfo.signerName2
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo2",
              res.data.data.relSignInfo.signerNo2
            );
          });
        }
        this.bus.$emit("saveSheetPage", true);
      }, title);
    },
    // 出入量下拉、可输入过滤（贵州）
    remoteMethod(query) {
      if (query !== "") {
        this.accessOptionList = this.defaultOptionList.filter(item => {
          return (
            item.includes(query)
          );
        });
      }
      if (!query || this.accessOptionList.length == 0 || this.deptName == query) {
        this.accessOptionList = JSON.parse(JSON.stringify(this.defaultOptionList));
      }
      if(this.currentKey){
        this.accessOptionData[this.currentKey] = [...this.accessOptionList];
      }
    },
     // 获取出入量下拉、可输入过滤数据（贵州）
    getOptionsData(td, tr,$event){
      if(!$event){
        return;
      }
      this.currentKey = td.name;
      let autoCompleteData = [];
      if(td.parentKey && td.autoComplete.data.length>0){
        let key = tr.find(item=>{
          return item.key == td.parentKey
        }).value;
        let data = td.autoComplete.data[0];
        autoCompleteData = data[key] && data[key].map(child => {
          return child.itemName
        })
      }
      this.defaultOptionList = td.parentKey ? autoCompleteData : td.autoComplete.data
      this.accessOptionList = JSON.parse(JSON.stringify(this.defaultOptionList));
      this.accessOptionData[td.name] = [...this.accessOptionList];
    },
  },
  watch: {
    scrollY() {
      if (!this.hasFiexHeader) return;
      let { top, bottom } = this.$refs.table.getBoundingClientRect();
      if (
        top < (this.isInPatientDetails ? 90 : 100) &&
        bottom > (this.isInPatientDetails ? 170 : 180)
      ) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
      // console.log(this.$refs.table.getBoundingClientRect());
    }
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  mounted() {
    this.fiexHeaderWidth =
      this.$refs.table && this.$refs.table.offsetWidth + "px";
    console.log("mounted");
  },
  created() {
    if (
      this.doubleSignArr.includes(sheetInfo.sheetType) &&
      sheetInfo.selectBlock.relSignInfo == undefined
    ) {
      this.$set(this.sheetInfo.selectBlock, "relSignInfo", {});
    }
  },
  components: {
    signModal,
    bottomRemark
  }
};
</script>
