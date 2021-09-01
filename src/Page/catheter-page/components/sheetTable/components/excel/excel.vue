<template>
  <div>
    <table class="sheet-table">
      <tr>
        <td colspan="1" rowspan="100" style="width: 35px; line-height: 40px">
          维护记录
        </td>
      </tr>
      <tr
        class="head-con"
        v-for="(th, index) in data.titleModel.th"
        :key="index"
      >
        <th
          v-for="(item, index2) in th"
          :key="index2"
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
            noSignRow: tr.find((item) => item.key == 'status').value === '0',
            selectedTr: sheetInfo.selectRow.includes(tr),
            redText:
              tr.find((item) => {
                return item.key == 'recordSource';
              }).value == '5',
          },
          tr.find((item) => {
            return item.key == 'markObj';
          }).value &&
            `mark-mark-mark mark-cell-status-${
              tr.find((item) => {
                return item.key == 'markObj';
              }).value.status
            }`,
        ]"
        :key="y"
        @click="selectRow(tr, $event)"
        @mouseover="markTip($event, tr)"
        @mouseout="closeMarkTip"
        :recordId="tr.find((item) => item.key == 'id').value"
      >
        <td
          v-for="(td, x) in tr"
          @click="td.key == 'description' && openEditModal(tr, data, $event)"
          :key="x"
          :dataKey="td.key"
          :dataName="td.name"
          v-if="!td.hidden"
          @mouseover="markTip($event, td)"
          @mouseout="closeMarkTip"
          :class="[
            td.markObj &&
              `mark-mark-mark mark-cell-status-${td.markObj.status}`,
          ]"
          @contextmenu.stop="openContextMenu($event, y, tr, td)"
        >
          <!-- for 年份 -->
          <input
            type="text"
            :readonly="true"
            :value="tr.find((item) => item.key == 'yearBreak').value"
            :data-value="tr.find((item) => item.key == 'yearBreak').value"
            :style="[td.style, { height: '12px' }]"
            v-if="
              td.key === 'recordMonth' &&
              tr.find((item) => item.key == 'yearBreak').value
            "
          />
          <div
            v-if="td.key == 'sign'"
            class="sign-text"
            @click.stop="toSign(tr, y, data.bodyModel, showSign(tr), $event)"
            v-html="showSign(tr)"
          ></div>
          <div
            v-else-if="td.key == 'audit'"
            class="sign-text"
            @click="toAudit(tr, y, data.bodyModel, showAudit(tr))"
            v-html="showAudit(tr)"
          ></div>
          <div v-else-if="td.key == 'signerNo'" class="sign-img">
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <div v-else-if="td.key == 'auditorNo'" class="sign-img">
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <textarea
            v-else-if="td.textarea"
            :class="{ towLine: isOverText(td) }"
            :readonly="isRead(tr)"
            v-model="td.value"
            :data-value="td.value"
            :position="`${x},${y},${index}`"
            :style="[
              td.style,
              td.key === 'recordMonth' &&
                tr.find((item) => item.key == 'yearBreak').value && {
                  height: '12px',
                },
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
                  tr,
                })
            "
            @blur="onBlur($event, { x, y, z: index })"
          ></textarea>
          <input
            type="text"
            :readonly="isRead(tr)"
            v-model="td.value"
            :data-value="td.value"
            :position="`${x},${y},${index}`"
            :style="[
              td.style,
              td.key === 'recordMonth' &&
                tr.find((item) => item.key == 'yearBreak').value && {
                  height: '12px',
                },
            ]"
            @keydown="
              td.event && td.event($event, td);
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
                  tr,
                })
            "
            @blur="onBlur($event, { x, y, z: index })"
            @click="td.click && td.click($event, td)"
            v-else
          />
        </td>
        <span v-show="false" v-else>{{ td.key }}: {{ td.value }}</span>
      </tr>
    </table>

    <footerInfo
      :pageIndex="index + sheetStartPage"
      :pageNo="index"
    ></footerInfo>
    <div class="table-footer">第 {{ index + sheetStartPage }} 页</div>
    <setTitleModal ref="setTitleModal"></setTitleModal>
    <signModal ref="signModal"></signModal>
    <signModal ref="delsignModal" title="删除签名需签名者确认"></signModal>
  </div>
</template>

<style lang="stylus" src="./style.styl"></style>

<script>
import setTitleModal from "../../../modal/set-title-modal.vue";
import { nullRow } from "../../../../components/render/Body.js";
import {
  saveTitle,
  sign,
  cancelSign,
  delRow,
  markSave,
  markDelete,
} from "../../../../api/sheet.js";
import signModal from "@/components/modal/sign.vue";
import { Tr } from "../../../render/Body.js";
import {
  offset,
  getCursortPosition,
  focusElement,
  leftTopBottomRight,
  onFocusToAutoComplete,
  onBlurToAutoComplete,
} from "./tool.js";
import sheetInfo from "../../../config/sheetInfo";
import Mark, { matchMark } from "../../../render/Mark.js";
import $ from "jquery";
import bus from "vue-happy-bus";
import sheetModel from "../../../../sheet.js";
import common from "@/common/mixin/common.mixin.js";
import infoTable from "../infoTable/infoTable";
import footerInfo from "../footerInfo/footerInfo";
import { handlepz, delpz, auditpz } from "../../../../api/index.js";
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
  },
  mixins: [common],
  data() {
    return {
      Mark,
      matchMark,
      bus: bus(this),
      sheetInfo,
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
  },
  methods: {
    // 键盘事件
    onKeyDown(e, bind) {
      // 键盘切换事件
      leftTopBottomRight(e, bind);
    },
    onFocus(e, bind) {
      onFocusToAutoComplete(e, bind);
    },
    onBlur(e, bind) {
      onBlurToAutoComplete(e, bind);
    },
    setTitle(item) {
      this.$refs.setTitleModal.open((title) => {
        let data = {
          patientId: this.patientInfo.patientId,
          visitId: this.patientInfo.visitId,
          pageIndex: this.index,
          fieldEn: item.key,
          fieldCn: title,
          recordCode: sheetInfo.sheetType,
        };
        saveTitle(data).then((res) => {
          item.name = title;
        });
      }, item.name);
    },
    addNullRow(index, row) {
      let newRow = nullRow();
      if (row) {
        let recordSource = row.find((item) => {
          return item.key == "recordSource";
        }).value;

        newRow.find((item) => {
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
      let recordMonth = curr_row.find((item) => {
        return item.key == "recordMonth";
      }).value;
      // let recordHour = curr_row.find(item => {
      //   return item.key == "recordHour";
      // }).value;
      try {
        let next_Month = next_row.find((item) => {
          return item.key == "recordMonth";
        }).value;
        // let next_Hour = next_row.find(item => {
        //   return item.key == "recordHour";
        // }).value;
        if (next_row) {
          if (recordMonth && !next_Month) {
            next_row.find((item) => {
              return item.key == "recordMonth";
            }).value = recordMonth;
          }
          // if (recordHour && !next_Hour) {
          //   next_row.find(item => {
          //     return item.key == "recordHour";
          //   }).value = recordHour;
          // }
        }
      } catch (error) {}
      this.data.bodyModel.splice(index, 1);
    },
    getPrev(index, bodyModel, val) {
      if (index < 0) return "";
      let tr = bodyModel[index];
      let value = tr.find((item) => {
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
    toSign(trArr, index, bodyModel, showSign, e) {
      this.sheetInfo.downControl = e.ctrlKey;
      if (this.sheetInfo.downControl) return;
      if (this.sheetInfo.selectRow.length) {
        return this.bus.$emit("toSheetMoreSign");
      }
      if (!showSign) {
        let status = trArr.find((item) => {
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
            list: [
              Object.assign({}, trObj, {
                recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                // recordHour: this.getPrev(currIndex, allList, "recordHour"),
                recordYear: this.getPrev(currIndex, allList, "recordYear"),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index,
              }),
            ],
          };
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            (res) => {
              let trArrClone = Tr(res.data.data[0]);
              if (
                trArr.find((item) => {
                  return item.key == "recordMonth";
                }).value == ""
              ) {
                trArrClone.find((item) => {
                  return item.key == "recordMonth";
                }).value = "";
              }
              trArr.splice(0, trArr.length);
              for (let i = 0; i < trArrClone.length; i++) {
                trArr.push(trArrClone[i]);
              }
              this.$notify.success({
                title: "提示",
                message: "签名成功",
              });
              this.bus.$emit("saveSheetPage", false);
            }
          );
        });
      } else {
        // 删除签名
        this.$refs.delsignModal.open((password, empNo) => {
          let id = trArr.find((item) => {
            return item.key == "id";
          }).value;
          cancelSign({
            id,
            empNo,
            password,
          }).then((res) => {
            trArr.find((item) => {
              return item.key == "status";
            }).value = 0;
            trArr.find((item) => {
              return item.key == "signerName";
            }).value = "";
            this.bus.$emit("saveSheetPage", false);
          });
        });
      }
    },
    toAudit(trArr, index, bodyModel, showAudit) {
      if (!showAudit) {
        let status = trArr.find((item) => {
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
                // recordHour: this.getPrev(currIndex, allList, "recordHour"),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index,
              }),
            ],
          };
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            (res) => {
              let trArrClone = Tr(res.data.data);
              if (
                trArr.find((item) => {
                  return item.key == "recordMonth";
                }).value == ""
              ) {
                trArrClone.find((item) => {
                  return item.key == "recordMonth";
                }).value = "";
              }
              // if (
              //   trArr.find(item => {
              //     return item.key == "recordHour";
              //   }).value == ""
              // ) {
              //   trArrClone.find(item => {
              //     return item.key == "recordHour";
              //   }).value = "";
              // }
              trArr.splice(0, trArr.length);
              for (let i = 0; i < trArrClone.length; i++) {
                trArr.push(trArrClone[i]);
              }
              this.$notify.success({
                title: "提示",
                message: "审核成功",
              });
              this.bus.$emit("saveSheetPage", true);
            }
          );
        });
      } else {
        // 删除签名
        this.$refs.delsignModal.open((password, empNo) => {
          let id = trArr.find((item) => {
            return item.key == "id";
          }).value;
          cancelSign({
            id,
            empNo,
            password,
            audit: true,
          }).then((res) => {
            this.bus.$emit("saveSheetPage", true);
          });
        });
      }
    },
    // 展示签名状态
    showSign(trArr) {
      let status = trArr.find((item) => {
        return item.key == "status";
      }).value;
      let signerName = trArr.find((item) => {
        return item.key == "signerName";
      }).value;
      if (status >= 1) {
        return signerName;
      } else {
        return "";
      }
    },
    // 展示审核状态
    showAudit(trArr) {
      let status = trArr.find((item) => {
        return item.key == "status";
      }).value;
      let auditorName = trArr.find((item) => {
        return item.key == "auditorName";
      }).value;
      if (status == "2") {
        return auditorName;
      } else {
        return "";
      }
    },
    isRead(tr) {
      let status = tr.find((item) => item.key == "status").value;
      let empNo = tr.find((item) => item.key == "empNo").value;
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
      $(e.target).parents("tr").addClass("selectedRow");
      let style = {
        top: `${Math.min(e.clientY - 15, window.innerHeight - 320)}px`,
        left: `${Math.min(e.clientX + 15, window.innerWidth - 180)}px`,
      };
      let data = [
        {
          name: "向上插入新行",
          icon: "charuxinhang",
          click: () => {
            this.addNullRow(index - 1, row);
          },
        },
        {
          name: "向下插入新行",
          icon: "xiangxiacharuyihang",
          click: () => {
            this.addNullRow(index, row);
          },
        },
        {
          name: "复制行",
          icon: "fuzhizhenghang",
          click: () => {
            this.sheetInfo.copyRow = row
              .filter((item) => {
                return true;
              })
              .map((item) => {
                let obj = {};
                if (
                  item.key == "id" ||
                  item.key == "sign" ||
                  item.key == "signerName" ||
                  item.key == "status" ||
                  item.key == "recordMonth"
                ) {
                  obj = {
                    value: "",
                  };
                }
                return Object.assign({}, item, obj);
              });
          },
        },
        {
          name: "复制内容",
          icon: "fuzhizhenghang",
          click: () => {
            this.sheetInfo.copyRow = getSelection().toString() || cell.value;
          },
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
          },
        },
        {
          name: "删除整行",
          icon: "shanchuzhenghang",
          click: () => {
            let id = row.find((item) => {
              return item.key == "id";
            }).value;
            let isRead = this.isRead(row);
            if (id) {
              if (isRead) {
                this.$parent.$parent.$refs.signModal.open((password, empNo) => {
                  delRow(id, password, empNo).then((res) => {
                    this.delRow(index);
                    this.$notify.success({
                      title: "提示",
                      message: "删除成功",
                    });
                    this.bus.$emit("saveSheetPage", false);
                  });
                });
              } else {
                this.$confirm("你确定删除该行数据吗", "提示", {
                  confirmButtonText: "删除",
                  cancelButtonText: "取消",
                  type: "warning",
                }).then((res) => {
                  delRow(id, "", "").then((res) => {
                    this.delRow(index);
                    this.$notify.success({
                      title: "提示",
                      message: "删除成功",
                    });
                    this.bus.$emit("saveSheetPage", false);
                  });
                });
              }
            } else {
              this.$confirm("你确定删除该行数据吗", "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning",
              }).then((res) => {
                this.delRow(index);
                this.$notify.success({
                  title: "提示",
                  message: "删除成功",
                });
                this.bus.$emit("saveSheetPage", false);
              });
            }
          },
        },
        {
          name: "添加格批注",
          icon: "pizhu",
          click: () => {
            this.bus.$emit("openPizhuModal", row, cell);
          },
        },
        {
          name: "添加行批注",
          icon: "pizhu",
          click: () => {
            this.bus.$emit("openPizhuModal", row, "all");
          },
        },
        // {
        //   name: '标记为出入量合计',
        //   icon: 'charuxinhang',
        //   click: () => {
        //     row.find((item) => {
        //       return item.key == 'recordSource'
        //     }).value = '5'
        //   }
        // },
        // {
        //   name: '标记为普通行',
        //   icon: 'charuxinhang',
        //   click: () => {
        //     row.find((item) => {
        //       return item.key == 'recordSource'
        //     }).value = '1'
        //   }
        // },
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
      e.preventDefault();
      window.openContextMenu({
        style,
        data,
      });
    },
    openEditModal(tr, data, e) {
      // 双击的input key
      let key =
        $(e.target).parents("td").attr("datakey") ||
        $(e.target).attr("datakey");
      let name = $(e.target).parents("td").attr("dataName");
      let tab = "1";
      if (key == "description") {
        tab = "3";
      } else if (name || key.indexOf("field") == -1) {
        tab = "1";
      } else {
        tab = "2";
      }
      let thead = data.titleModel;
      let table = data.bodyModel;
      // 数组重组
      let allList = [];
      // 当前行的index
      let currIndex = 0;
      // 拼接的记录
      let record = [];
      // 最后行的index
      // 当前的类型做唯一标识
      let curr_range = tr.find((item) => item.key == "recordRange").value;
      let curr_recordDate = tr.find((item) => item.key == "recordDate").value;
      if (curr_recordDate) {
        for (let i = 0; i < sheetModel.length; i++) {
          allList = allList.concat(sheetModel[i].bodyModel);
        }
        for (let i = 0; i < allList.length; i++) {
          if (
            allList[i].find((item) => item.key == "recordDate").value ==
              curr_recordDate &&
            allList[i].find((item) => item.key == "recordRange").value ==
              curr_range
          ) {
            record.push(allList[i]);
          }
        }
      } else {
        record.push(tr);
      }
      let config = {
        record,
        table,
        thead,
        tab,
      };
      window.openSpecialModal(config);
    },
    markTip(e, td) {
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
          obj = td.find((item) => item.key == "markObj").value;
        } catch (e) {}
      }
      let left, top;
      if (obj) {
        if (key == "description" || key == "sign") {
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
            top,
          },
          data: obj,
          td,
          fun: {
            handlepz,
            delpz,
            auditpz,
          },
        });
      }
    },
    closeMarkTip() {
      window.closeMarkTip();
    },
    // 按下commmand多选
    selectRow(tr, e) {
      this.sheetInfo.downControl = e.ctrlKey;
      if (this.sheetInfo.downControl) {
        let index = this.sheetInfo.selectRow.indexOf(tr);
        if (index > -1) {
          this.sheetInfo.selectRow.splice(index, 1);
        } else {
          this.sheetInfo.selectRow.push(tr);
        }
      }
    },
  },
  created() {},
  // mounted() {
  //   this.$forceUpdate();
  // },
  components: {
    setTitleModal,
    signModal,
    footerInfo,
  },
};
</script>
