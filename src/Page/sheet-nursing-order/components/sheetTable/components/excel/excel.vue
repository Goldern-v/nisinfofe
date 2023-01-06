<template>
  <div>
    <table class="sheet-table">
      <tr
        class="head-con"
        v-for="(th, index) in data.titleModel.th"
        :key="index"
      >
        <th
          v-for="(item, i) in th"
          :key="i"
          :colspan="item.colspan"
          :rowspan="item.rowspan"
          :style="item.style"
          :class="{ canSet: item.canSet }"
          @click="item.canSet && setTitle(item)"
        >
          <span v-if="item.key=='recordYear'&&HOSPITAL_ID=='huadu'">{{recordYear()}}</span>
          <span v-else v-html="item.name"></span>
        </th>
      </tr>

      <!-- @dblclick="openEditModal(tr, data, $event)" -->
      <tr
        class="body-con"
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
            `mark-mark-mark mark-row-${
              tr.find((item) => {
                return item.key == 'markObj';
              }).value.signType
            }`,
        ]"
        :key="y"
        @click="selectRow(tr)"
        @mouseover="markTip($event, tr)"
        @mouseout="closeMarkTip"
      >
        <td
          v-for="(td, x) in tr"
          :key="td.key"
          :dataKey="td.key"
          v-if="!td.hidden"
          @mouseover="markTip($event, td)"
          @mouseout="closeMarkTip"
          @click="td.click || null"
          @dblclick="openEditModal(tr, data, $event)"
          :class="[
            td.markObj && `mark-mark-mark mark-cell-${td.markObj.signType}`,
          ]"
          @contextmenu.stop="openContextMenu($event, y, tr, td)"
        >
          <div
            v-if="td.key == 'signerName'"
            class="sign-text"
            @click.stop="!isRead(tr)&&toSign(tr, y, data.bodyModel, showSign(tr, td.key), 1)"
            v-html="showSign(tr, td.key)"
          ></div>
          <div
            v-else-if="td.key == 'signerName2'"
            class="sign-text"
            @click="!isRead(tr)&&toSign(tr, y, data.bodyModel, showSign(tr, td.key), 2)"
            v-html="showSign(tr, td.key)"
          ></div>
          <div
            v-else-if="td.key == 'signerName3'"
            class="sign-text"
            @click="toSign(tr, y, data.bodyModel, showSign(tr, td.key), 3)"
            v-html="showSign(tr, td.key)"
          ></div>
          <div
            v-else-if="td.key == 'signerName4'"
            class="sign-text"
            @click="toSign(tr, y, data.bodyModel, showSign(tr, td.key), 4)"
            v-html="showSign(tr, td.key)"
          ></div>
          <div
            v-else-if="td.key == 'signerName5'"
            class="sign-text"
            @click="toSign(tr, y, data.bodyModel, showSign(tr, td.key), 5)"
            v-html="showSign(tr, td.key)"
          ></div>
          <div
            v-else-if="td.key == 'signerName6'"
            class="sign-text"
            @click="toSign(tr, y, data.bodyModel, showSign(tr, td.key), 6)"
            v-html="showSign(tr, td.key)"
          ></div>
          <masked-input
            v-else-if="['huadu'].includes(HOSPITAL_ID) && (td.key == 'stopTime' || td.key == 'startTime')  "
            :position="`${x},${y},${index}`"
            type="text"
            class="mask-input"
            :showMask="false"
            v-model="td.value"
            :mask="() => [ /\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            :data-value="td.value"
            placeholderChar=" "
            @click="td.click($event,td)"
            @keydown="onKeyDown($event, { x, y, z: index, td });"
            @focus="
              td.autoComplete &&
                onFocus($event, {
                  autoComplete: getCompleteArr(tr, td),
                  x,
                  y,
                  z: index,
                  td,
                  tr,
                  splice: td.splice,
                })
            "
            @blur="
              !HOSPITAL_ID === 'huadu' &&
                !td.splice &&
                onBlur($event, { x, y, z: index }, tr )
            "
          ></masked-input>
          <masked-input
            v-else-if="['huadu'].includes(HOSPITAL_ID) && (td.key == 'stopDate' || td.key == 'startDate')  "
            :position="`${x},${y},${index}`"
            type="text"
            class="mask-input"
            :showMask="false"
            v-model="td.value"
            :mask="() => [ /\d/, /\d/, '-', /\d/, /\d/]"
            :guide="true"
            :data-value="td.value"
            placeholderChar=" "
            @click="td.click($event,td)"
            @keydown="onKeyDown($event, { x, y, z: index, td });"
            @focus="
              td.autoComplete &&
                onFocus($event, {
                  autoComplete: getCompleteArr(tr, td),
                  x,
                  y,
                  z: index,
                  td,
                  tr,
                  splice: td.splice,
                })
            "
            @blur="
              !HOSPITAL_ID === 'huadu' &&
                !td.splice &&
                onBlur($event, { x, y, z: index }, tr )
            "
          ></masked-input>
          <div
            v-else-if="td.key == 'signerName7'"
            class="sign-text"
            @click="toSign(tr, y, data.bodyModel, showSign(tr, td.key), 7)"
            v-html="showSign(tr, td.key)"
          ></div>
          <!-- @click="toSign(tr, y, data.bodyModel, showSign(tr,td.key),1)" -->
          <div
            v-else-if="td.key == 'signerNo'"
            :class="td.value ? 'sign-img' : 'sign-text'"
          >
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <!-- @click="toSign(tr, y, data.bodyModel, showSign(tr,td.key),2)" -->
          <div
            v-else-if="td.key == 'signerNo2'"
            :class="td.value ? 'sign-img' : 'sign-text'"
          >
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <div
            v-else-if="td.key == 'signerNo3'"
            :class="td.value ? 'sign-img' : 'sign-text'"
          >
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <div
            v-else-if="td.key == 'signerNo4'"
            :class="td.value ? 'sign-img' : 'sign-text'"
          >
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <div
            v-else-if="td.key == 'signerNo5'"
            :class="td.value ? 'sign-img' : 'sign-text'"
          >
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <div
            v-else-if="td.key == 'signerNo6'"
            :class="td.value ? 'sign-img' : 'sign-text'"
          >
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <div
            v-else-if="td.key == 'signerNo7'"
            :class="td.value ? 'sign-img' : 'sign-text'"
          >
            <img
              v-if="td.value"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              alt
            />
          </div>
          <input :readonly="isRead(tr)" v-else-if="HOSPITAL_ID=='huadu'&&td.key=='orderContent'" @click="(e)=>{!isRead(tr)&&openOrderModal(e,td,tr,x,y,'护嘱内容',910)}" style="height:32px;text-align:left;" v-model="td.value" :data-value='td.value'>
          <!-- <div  v-else-if="HOSPITAL_ID=='huadu'&&td.key=='orderContent'" style="height:32px;text-align:left;"  :data-value='td.value' class="orderContent">
            <el-select
                placeholder=""
                v-model="td.value"
                filterable
                :disabled="isRead(tr)"
                @change="changeOrderContent(td.value)"
                clearable
            >
                <el-option
                v-for="(item,index) in contentOptions"
                :key="index"
                :label="item"
                :value="item"
                ></el-option>
            </el-select>
          </div> -->

          <input :readonly="isRead(tr)" v-else-if="HOSPITAL_ID=='huadu'&&td.key=='frequency'" @click="(e)=>{!isRead(tr)&&openOrderModal(e,td,tr,x,y,'频次',1090)}" v-model="td.value" style="height:32px;" :data-value='td.value'>
          <input
            type="text"
            :readonly="isRead(tr)"
            v-model="td.value"
            :data-value="td.value"
            :position="`${x},${y},${index}`"
            :style="td.style"
            @click="td.click || null"
            v-focus="{
              x,
              y,
              z: index,
              td,
              autoComplete: td.autoComplete,
              event: td.event,
              oninput: td.oninput,
              nextTr: data.bodyModel[y + 1],
              tr,
              table: data.bodyModel,
            }"
            v-else
          />
        </td>
        <span v-show="false" v-else>{{ td.key }}: {{ td.value }}</span>
      </tr>
    </table>
    <!-- <div @click="addNullRow"
    class="add-row">+ 添加新行</div>-->
    <div class="table-footer">
      第 {{ index + sheetStartPage }} /
      {{ Math.max(sheetMaxPage, length + sheetStartPage - 1) }} 页
      <!-- <span class="sh-name">审核人：
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>-->
    </div>
    <setTitleModal ref="setTitleModal"></setTitleModal>
    <signModal ref="signModal"></signModal>
    <signModal
      ref="delsignModal"
      title="删除签名需签名者确认。。。。"
    ></signModal>
    <specialModalHuadu ref="specialModalHuadu"></specialModalHuadu>
    <orderModal v-if="isShowOrderModal" @close="closeOrderModal" @changeOrderContent="changeOrderContent" :top='modalTop' :left='modalLeft' :type="type"/>
  </div>
</template>

<style lang="stylus" src="./style.styl" scoped></style>

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
} from "@/api/nursingOrderSheet.js";
import signModal from "@/components/modal/sign.vue";
import specialModalHuadu from '@/Page/sheet-nursing-order/components/modal/special-modal_huadu'
import { Tr } from "../../../render/Body.js";
import { TrHj } from "../../../render/Body_hj.js";
import { offset, getCursortPosition, focusElement, bindFocus,leftTopBottomRight, onFocusToAutoComplete,onBlurToAutoComplete} from "./tool.js";
import sheetInfo from "../../../config/sheetInfo";
import Mark, { matchMark } from "../../../render/Mark.js";
import $ from "jquery";
import bus from "vue-happy-bus";
import sheetModel from "../../../../sheet.js";
import common from "@/common/mixin/common.mixin.js";
import orderModal from "../modal/orderModal.vue"
import item1Vue from '@/Part/whiteBoard/page2/components/item-1.vue';
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
  },
  directives: {
    focus: {
      bind: bindFocus,
      update: bindFocus,
    },
  },
  mixins: [common],
  data() {
    return {
      Mark,
      matchMark,
      bus: bus(this),
      sheetInfo,
      isShowOrderModal:false,
      modalTop:'0px',
      modalLeft:'0px',
      currentColumn:{},
      contentOptions:[
        '协助更衣',
        '指/趾甲护理',
        '面部清洁和梳头',
        '鼻饲',
        '协助进食',
        '糖尿病饮食宣教',
        '口腔护理',
        '吞咽评估',
        '吞咽冰刺激训练',
        '言语训练',
        '会阴护理',
        '留置尿管护理',
        '足部护理',
        '压疮预防及护理',
        '肛周皮肤护理',
        '协助/指导患者翻身及有效咳嗽',
        "抬高床头15-30°",
        '抬高床头30°以上',
        '协助床上移动',
        '指导/协助被动肢体功能锻炼',
        '指导主动肢体功能锻炼',
        '指导坐轮椅',
        '指导使用助行器',
        '协助上下楼梯',
        '防跌倒',
        '床上使用便器',
        '床边放大便椅',
        '床上擦浴',
        '床上洗头',
        '温水擦浴',
        '餐前打胰岛素',
        '脐部护理',
        '洗浴',
        '防坠床',
        '翻身拍背',
        "肢体气压治疗",
        '母乳喂养知识宣教',
        '观察产程进展',
        '落实减痛措施',
        '指导分娩技巧',
        '观察胎心情况',
        '观察宫缩情况',
        '指导自数胎动',
        '观察膀胱排空及羊水情况',
        '保持会阴清洁',
        '禁止下床',
        '指导床上活动',
        '指导卧位',
        '观察阴道流血情况',
        '观察宫腔止血球囊引流情况',
        '保持管道通畅及防管道脱落',
        '协助翻身',
        '指导挤奶技巧',
        '指导肢体功能锻炼促进产后康复',
        '观察伤口出血/渗血情况',
        '检查伤口敷料情况',
        '剪指甲/更换病人服',
        '控制入量',
        '观察会阴情况',
        '观察下肢血运情况',
        '腹部按摩',
        '右下肢制动',
    ],
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
  mounted(){
  },
  methods: {
    recordYear(){
     return this.data.bodyModel[0][0].value.split('-')[0]
    },
    show(td){
      console.log(td);

    },
    changeOrderContent(item){
      if(this.rowIndex<=26){
      this.currentColumn.value = item
      }else{
        return
      }
      if(this.rowIndex<26){
        this.rowIndex++
        this.currentColumn = this.data.bodyModel[this.rowIndex][this.columnIndex]
      }
    },
    openOrderModal(e,td,tr,x,y,type,width){
      this.type = type
      this.modalLeft = width + e.currentTarget.offsetWidth + 'px';
      this.modalTop = e.clientY  + 'px';
      this.currentColumn = td
      this.columnIndex = x;
      this.rowIndex = y;
      console.log(x,y);
      this.isShowOrderModal = true
    },
    closeOrderModal(){
      this.isShowOrderModal = false
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
      // let curr_row = this.data.bodyModel[index]
      // let next_row = this.data.bodyModel[index + 1]
      // let recordMonth = curr_row.find((item) => {
      //   return item.key == 'recordMonth'
      // }).value
      // let recordHour = curr_row.find((item) => {
      //   return item.key == 'recordHour'
      // }).value

      // let next_Month = next_row.find((item) => {
      //   return item.key == 'recordMonth'
      // }).value
      // let next_Hour = next_row.find((item) => {
      //   return item.key == 'recordHour'
      // }).value
      // if (next_row) {
      //   if (recordMonth && !next_Month) {
      //     next_row.find((item) => {
      //       return item.key == 'recordMonth'
      //     }).value = recordMonth
      //   }
      //   if (recordHour && !next_Hour) {
      //     next_row.find((item) => {
      //       return item.key == 'recordHour'
      //     }).value = recordHour
      //   }
      // }
      this.data.bodyModel.splice(index, 1);
    },
    getPrev(index, bodyModel, val) {
      if (index < 0) return "";
      console.log("getPrev", index, bodyModel, val);
      let tr = bodyModel[index];
      try {
        let value = tr.find((item) => {
          return item.key == val;
        }).value;
        if (value) {
          return value;
        } else {
          return this.getPrev(index - 1, bodyModel, val);
        }
      } catch (error) {
        //
        console.log("error", error);
      }
      return null;
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
    //
    toSign(trArr, index, bodyModel, showSign, signType) {
      if (this.sheetInfo.downControl) return;
      if (this.sheetInfo.selectRow.length) {
        var selectRow = [];
        this.sheetInfo.selectRow.map((item) => {
          selectRow.push(item);
        });
        console.log("toSign:selectRow", selectRow);
        return this.bus.$emit(
          "toNursingOrderSheetMoreSign",
          selectRow,
          signType
        );
      }
      if (!showSign) {
        let status = trArr.find((item) => {
          return item.key == "status";
        }).value;
        console.log("status", status);
        // if (status == 1) return this.$message.warning('该记录已经签名了')
        this.$refs.signModal.open((password, empNo) => {
          let trObj = {};
          for (let i = 0; i < trArr.length; i++) {
            trObj[trArr[i].key] = trArr[i].value;
          }
          let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
          console.log("toSign_TrOjb", trObj, allList, currIndex, trArr);
          let data = {
            empNo,
            password,
            list: [
              Object.assign({}, trObj, {
                // recordMonth: this.getPrev(currIndex, allList, 'recordMonth'),
                // recordHour: this.getPrev(currIndex, allList, 'recordHour'),
                // recordYear: this.getPrev(currIndex, allList, 'recordYear'),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index,
              }),
            ],
            signType: signType,
          };
          console.log("toSign_postData", data);

          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            (res) => {
              console.log("签名成功", res);
              if (!this.sheetInfo.selectBlock.id) {
                this.sheetInfo.selectBlock.id = res.data.data[0].parentId;
              }
              let trArrClone;
              if (this.HOSPITAL_ID === "hj") {
                trArrClone = TrHj(res.data.data[0]);
              } else {
                trArrClone = Tr(res.data.data[0]);
              }
              // if (trArr.find((item) => {
              //   return item.key == 'recordMonth'
              // }).value == '') {
              // trArrClone.find((item) => {
              //     return item.key == 'recordMonth'
              //   }).value = ''
              // }
              // if (trArr.find((item) => {
              //   return item.key == 'recordHour'
              // }).value == '') {
              //   trArrClone.find((item) => {
              //     return item.key == 'recordHour'
              //   }).value = ''
              // }
              trArr.splice(0, trArr.length);
              for (let i = 0; i < trArrClone.length; i++) {
                trArr.push(trArrClone[i]);
              }
              console.log("签名成功trArr", trArr);
              this.$notify.success({
                title: "提示",
                message: "签名成功",
              });
              this.bus.$emit("saveNursingOrderSheetPage");
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
            id: this.sheetInfo.selectBlock.id,
            list: [{ id: id }],
            empNo: empNo,
            password: password,
            signType: signType,
          }).then((res) => {
            this.bus.$emit("saveNursingOrderSheetPage");
          });
        });
      }
    },
    // toAudit(trArr, index, bodyModel, showAudit) {
    //   if (!showAudit) {
    //     let status = trArr.find((item) => {
    //       return item.key == 'status'
    //     }).value
    //     // if (status == 1) return this.$message.warning('该记录已经签名了')
    //     this.$refs.signModal.open((password, empNo) => {
    //       let trObj = {}
    //       for (let i = 0; i < trArr.length; i++) {
    //         trObj[trArr[i].key] = trArr[i].value
    //       }
    //       let [allList, currIndex] = this.getAllListAndCurrIndex(trArr)
    //       let data = {
    //         empNo,
    //         password,
    //         audit: true,
    //         list: [Object.assign({}, trObj, {
    //           recordMonth: this.getPrev(currIndex, allList, 'recordMonth'),
    //           recordHour: this.getPrev(currIndex, allList, 'recordHour'),
    //           patientId: this.patientInfo.patientId,
    //           visitId: this.patientInfo.visitId,
    //           pageIndex: this.index
    //         })]
    //       }
    //       sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(res => {
    //         let trArrClone = Tr(res.data.data)
    //         if (trArr.find((item) => {
    //           return item.key == 'recordMonth'
    //         }).value == '') {
    //           trArrClone.find((item) => {
    //             return item.key == 'recordMonth'
    //           }).value = ''
    //         }
    //         if (trArr.find((item) => {
    //           return item.key == 'recordHour'
    //         }).value == '') {
    //           trArrClone.find((item) => {
    //             return item.key == 'recordHour'
    //           }).value = ''
    //         }
    //         trArr.splice(0, trArr.length)
    //         for (let i = 0; i < trArrClone.length; i++) {
    //           trArr.push(trArrClone[i])
    //         }
    //         this.$notify.success({
    //           title: '提示',
    //           message: '审核成功'
    //         });
    //         this.bus.$emit('saveNursingOrderSheetPage')
    //       })
    //     })
    //   } else {
    //     // 删除签名
    //     this.$refs.delsignModal.open((password, empNo) => {
    //       let id = trArr.find((item) => {
    //         return item.key == 'id'
    //       }).value
    //       cancelSign({
    //         id,
    //         empNo,
    //         password,
    //         signType,
    //         audit: true,
    //       }).then(res => {
    //         this.bus.$emit('saveNursingOrderSheetPage')
    //       })
    //     })
    //   }
    // },
    // 展示签名状态
    showSign(trArr, keyname = "singerName") {
      let status = trArr.find((item) => {
        return item.key == "status";
      }).value;
      let signerName = trArr.find((item) => {
        return item.key.indexOf(keyname) > -1;
      }).value;
      // console.log('展示签名状态',status,signerName,trArr)
      return signerName;
      if (status == "1" || status == "2") {
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
      // let stopSign = tr.find((item) => item.key == "signerName2").value;
      // if(stopSign&&!['']) return true
      if (status >= 1) {
        if (empNo == this.empNo) {
          return false;
        } else {
          return true;
        }
      } else {
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
                  item.key.indexOf("sign") > -1 ||
                  item.key.indexOf("signerName") > -1 ||
                  item.key == "status"
                ) {
                  obj = { value: "" };
                }
                return Object.assign({}, item, obj);
              });
          },
        },
        {
          name: "复制格",
          icon: "fuzhizhenghang",
          click: () => {
            this.sheetInfo.copyRow = cell.value;
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
            let isRead = true; //this.isRead(row)
            if (id) {
              if (isRead) {
                this.$parent.$parent.$refs.signModal.open((password, empNo) => {
                  delRow({
                    list: [{ id: id }],
                    password: password,
                    empNo: empNo,
                  }).then((res) => {
                    this.delRow(index);
                    this.$notify.success({
                      title: "提示",
                      message: "删除成功",
                    });
                    this.bus.$emit("saveNursingOrderSheetPage");
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
                    this.bus.$emit("saveNursingOrderSheetPage");
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
                this.bus.$emit("saveNursingOrderSheetPage");
              });
            }
          },
        },
      ];
      e.preventDefault();
      window.openContextMenu({ style, data });
    },
    openEditModal(tr, data, e) {
      if (sheetInfo.model == "print") return;
      // 双击的input key
      let key =
        $(e.target).attr("datakey") ||
        $(e.target).parents("td").attr("datakey");
      let name = $(e.target).parents("td").attr("dataName");
      let tab = "1";
      if (key == "orderContent") {
        //orderContent  description
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
      // 最后行的id 即最大的id
      let maxId = 0;
      // 当前的类型做唯一标识
      let curr_recordSource = tr.find(
        (item) => item.key == "recordSource"
      ).value;
      let curr_recordDate = tr.find((item) => item.key == "recordDate").value;
      if (curr_recordDate) {
        for (let i = 0; i < sheetModel.length; i++) {
          allList = allList.concat(sheetModel[i].bodyModel);
        }
        for (let i = 0; i < allList.length; i++) {
          maxId = Math.max(
            maxId,
            allList[i].find((item) => item.key == "id").value
          );
          if (
            allList[i].find((item) => item.key == "recordDate").value ==
              curr_recordDate &&
            allList[i].find((item) => item.key == "recordSource").value ==
              curr_recordSource
          ) {
            record.push(allList[i]);
          }
        }
      } else {
        record.push(tr);
      }
      let isLast =
        !record[record.length - 1].find((item) => item.key == "id").value ||
        record[record.length - 1].find((item) => item.key == "id").value ==
          maxId;
      let config = {
        record,
        table,
        thead,
        tab,
        isLast,
      };
      // window.openSpecialModalOrder(config);
      this.$refs.specialModalHuadu.open(config)
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
      } else {
        // 行
        try {
          obj = td.find((item) => item.key == "markObj").value;
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
        window.openMarkTip({ style: { left, top }, data: obj, td });
      }
    },
    closeMarkTip() {
      window.closeMarkTip();
    },
    // 按下commmand多选
    selectRow(tr) {
      if (this.sheetInfo.downControl) {
        console.log("按下commmand多选", this.sheetInfo, sheetInfo);
        let index = this.sheetInfo.selectRow.indexOf(tr);
        if (index > -1) {
          this.sheetInfo.selectRow.splice(index, 1);
          // sheetInfo.selectRow.splice(index, 1)
        } else {
          this.sheetInfo.selectRow.push(tr);
          // sheetInfo.selectRow.push(tr)
        }
        console.log("按下commmand多选==", this.sheetInfo, sheetInfo);
      }
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
        setTimeout(() => {
          if(!this.isOpenEditModal){
            onFocusToAutoComplete(e, bind); //下拉框延迟
          }
        }, 300);
        // onFocusToAutoComplete(e, bind);
      }
    },
    getCompleteArr(tr, td){
      return td.autoComplete;
    },
    onBlur(e, bind, tr) {
      if (sheetInfo.model == "print") return;
      onBlurToAutoComplete(e, bind);
      let recordDate = tr.find(item=>{
        return item.key == "recordDate"
      })
      if (this.HOSPITAL_ID == "guizhou") {
        //不允许输入未来时间
        if (bind.x == 0) {
          let inputDate = ""
          if(recordDate.value){
            inputDate = Date.parse(
              new Date(recordDate.value.substring(0,4) + "-" + e.target.value)
            ); //输入日期
          }else{
            inputDate = Date.parse(
              new Date(moment().format("YYYY") + "-" + e.target.value)
            ); //输入日期
          }
          let nowDate = Date.parse(new Date(moment().format("YYYY-MM-DD"))); //当前日期
          if (inputDate - nowDate > 0) {
            this.$message.warning("不允许输入未来时间！");
            this.dateOnBlur[bind.y] = true;
          } else {
            this.dateOnBlur[bind.y] = false;
          }
        } else if (bind.x == 1) {
          let inputTime = ""
          if(recordDate.value){
            inputTime = Date.parse(
              new Date(recordDate.value.substring(0,10) + " " + e.target.value)
            ); //输入日期
          }else{
            inputTime = Date.parse(
              new Date(moment().format("YYYY-MM-DD") + " " + e.target.value)
            ); //输入日期
          }
          let nowTime = Date.parse(
            new Date(moment().format("YYYY-MM-DD HH:mm"))
          ); //当前日期
          if (inputTime - nowTime > 0) {
            this.$message.warning("不允许输入未来时间！");
            this.timeOnBlur[bind.y] = true;
          } else {
            this.timeOnBlur[bind.y] = false;
          }
        }
      }
    },

  },
  created() {
    // sheetInfo.
  },
  components: {
    setTitleModal,
    signModal,
    specialModalHuadu,
    orderModal
  },
};
</script>
