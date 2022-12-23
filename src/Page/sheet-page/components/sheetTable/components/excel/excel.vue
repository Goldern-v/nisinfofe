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
      :class="{ isFixed, isInPatientDetails,'tableTd-14':wujingCommonHl}"
      ref="tableHead"
      v-if="hasFiexHeader"
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
                  maxWidth: td.textarea.width + 'px',
                })
              "
            ></textarea>
            <input type="text" :style="[td.style]" v-else />
          </template>
        </td>
      </tr>
      <tr
        class="head-con"
        :id="[sheetInfo.sheetType == 'common_wj'?'bigFonstSize':'']"
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
          :class="{ canSet: item.canSet}"
          @click="item.canSet && setTitle(item)"
        >
          <span v-if="item.key == 'recordYear'">{{
            recordYear()
          }}</span>
          <span v-else v-html="item.name"></span>
        </th>
      </tr>
    </table>

    <table
      class="sheet-table"
      ref="table"
      :class="{'tableTd-14':wujingCommonHl}"
      :style="{ width: sheetInfo.sheetType == 'access_gzry' ? '100%' : '' }"
    >
      <tr
        class="head-con"
        :id="[sheetInfo.sheetType == 'common_wj'?'bigFonstSize':'']"
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
          @click="item.canSet && setTitle(item, data.titleModel)"
        >
          <span v-if="item.key == 'recordYear'">{{ recordYear() }}</span>
          <span v-else v-html="item.name"></span>
        </th>
      </tr>
      <tr
        class="body-con"
        @dblclick="openEditModal(tr, data, $event)"
        v-for="(tr, y) in data.bodyModel"
        :id ="`row_${y}`"
        :class="[
          {
            inPreview:
              !tr.find((item) => item.key == 'id').value &&
              tr.find((item) => item.key == 'recordDate').value,
            noSignRow: tr.find((item) => item.key == 'status').value === '0',
            multiSign: tr.find((item) => item.key == 'multiSign').value,
            selectedTr: sheetInfo.selectRow.includes(tr),
            clickRow: sheetInfo.clickRow === tr,
            redText:
              tr.find((item) => {
                return item.key == 'recordSource';
              }).value == '5',
            redBottom:['wujing'].includes(HOSPITAL_ID)&&redBottom(tr,y) // 待性能优化
          },
          tr.find((item) => {
            return item.key == 'markObj';
          }).value &&
            `mark-mark-mark mark-cell-status-${
              tr.find((item) => {
                return item.key == 'markObj';
              }).value.status
            }`,
          {
            redTop:
              (HOSPITAL_ID == 'huadu' && getBorderClass(y)) ||
              (HOSPITAL_ID == 'wujing' && getBorderClass(y)) ||
              redTop(y),
            blackTop: BlackTop(y),
          },
        ]"
        :key="y"
        @click="selectRow(tr, $event)"
        @mouseover="markTip($event, tr)"
        @mouseout="closeMarkTip"
        :recordId="tr.find((item) => item.key == 'id').value"
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
              td.value &&
              td.statBottomLine &&
              `stat-bottom-line`,
          ]"
          :style="
            (['guizhou', '925'].includes(HOSPITAL_ID) &&
            sheetInfo.sheetType == 'access_gzry' && {
              boxSizing: 'border-box!important',
              width: td.style ? td.style.width : '',
            }) ||
            (HOSPITAL_ID=='wujing' &&
            td.key=='food' &&
            {
              textAlign:'left'
            }, (HOSPITAL_ID == 'foshanrenyi' && td.signDisabled && { cursor: 'not-allowed' }))
          "
          @contextmenu.stop="openContextMenu($event, y, tr, td)"
          @click="
            selectedItem(td);
            td.key == 'description' &&
              ['guizhou', '925'].includes(HOSPITAL_ID) &&
              !tr.isRead &&
              openEditModal(tr, data, $event);
          "
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
            :class="{ noClick: td.signDisabled }"
            @click.stop="
              toSign(tr, y, data.bodyModel, showSign(tr), $event, td)
            "
            v-html="showSign(tr)"
          >
          </div>
          <masked-input
            v-else-if="['huadu'].includes(HOSPITAL_ID) && td.key == 'recordHour'"
            :position="`${x},${y},${index}`"
            type="text"
            class="mask-input"
            :showMask="false"
            v-model="td.value"
            :mask="() => [ /\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            :data-value="td.value"
            placeholderChar=" "
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
              HOSPITAL_ID !== 'huadu' &&
                !td.splice &&
                onBlur($event, { x, y, z: index }, tr,td )
            "
          ></masked-input>
          <div
            v-else-if="['huadu', 'fuyou', 'liaocheng', 'zhzxy'].includes(HOSPITAL_ID) &&
              td.key == 'sign2'
            "
            class="sign-text"
            @click.stop="
              toSign(tr, y, data.bodyModel, showSign_hd(tr), $event, td)
            "
            v-html="showSign_hd(tr)"
          ></div>
          <div
            v-else-if="td.key == 'audit'"
            class="sign-text"
            :class="{ noClick: td.signDisabled }"
            @click.stop="toAudit(tr, y, data.bodyModel, showAudit(tr), $event)"
            v-html="showAudit(tr)"
          ></div>
          <!-- 第一个签名的位置 -->
          <div v-else-if="td.key == 'signerNo'" class="sign-img">
            <img
              v-if="tr.find((item) => item.key == 'auditorNo').value"
              :src="`/crNursing/api/file/signImage/${
                tr.find((item) => item.key == 'auditorNo').value
              }?${token}`"
              alt
              :class="{ xiegangSignImg: sheetInfo.sheetType === 'pediatric3_tj' || sheetInfo.sheetType === 'prenataldelivery2_tj' || sheetInfo.sheetType === 'postpartum2_tj'}"
            />
            <!-- 针对双签名打印预览为 xxx/xxx 显示 -->
            <!-- auditArr.includes(sheetInfo.sheetType) -->
            <img
              v-if="
                multiSignArr.includes(sheetInfo.sheetType) &&
                tr.find((item) => item.key == 'signerNo2').value
              "
              :src="`/crNursing/api/file/signImage/${
                tr.find((item) => item.key == 'signerNo2').value
              }?${token}`"
              alt
            />
            <span v-if="tr.find((item) => item.key == 'auditorNo').value && HOSPITAL_ID==='sdlj'" style="font-size: 12px;margin:10px -5px 0 0;"
              >、</span
            >
            <span v-else-if="tr.find((item) => item.key == 'auditorNo').value"
              >/</span
            >
            <!-- <span v-else-if="tr.find(item => item.key == 'signerNo2') && tr.find(item => item.key == 'signerNo2').value">/</span> -->
            <span
              v-if="
                (sheetInfo.sheetType === 'common_hd' ||
                  sheetInfo.sheetType === 'postpartum_hd' ||
                  sheetInfo.sheetType === 'neurosurgery_hd' ||
                  sheetInfo.sheetType === 'wait_delivery_hd' ||
                  sheetInfo.sheetType === 'wait_delivery_zhzxy' ||
                  sheetInfo.sheetType === 'neonatology_hd' ||
                  sheetInfo.sheetType === 'neonatology2_hd' ||
                  sheetInfo.sheetType === 'prenatal_hd' ||
                  sheetInfo.sheetType === 'neonatal_care_jm' ||
                  sheetInfo.sheetType === 'pediatric_surgery_jm' ||
                  sheetInfo.sheetType === 'pediatrics_jm' ||
                  sheetInfo.sheetType === 'child_recovery_jm' ||
                  sheetInfo.sheetType === 'gynaecology_jm' ||
                  sheetInfo.sheetType === 'antenatalwaiting_jm' ||
                  sheetInfo.sheetType === 'breastkenursing_jm' ||
                  sheetInfo.sheetType === 'postpartumnursing_jm' ||
                  sheetInfo.sheetType === 'entdepartment_jm' ||
                  sheetInfo.sheetType === 'catheterplacement_jm' ||
                  sheetInfo.sheetType === 'obstetricnursing_jm' ||
                  sheetInfo.sheetType === 'internal_eval_lcey' ||
                  sheetInfo.sheetType === 'critical_new_lcey'||
                  sheetInfo.sheetType === 'critical2_lcey'||
                  sheetInfo.sheetType === 'critical_lcey'||
                  sheetInfo.sheetType === 'internal_eval_yz')&&
                tr.find((item) => item.key == 'signerNo2').value
              "
              >/</span
            >
            <img
              v-if="td.value"
              :style="!td.value && { opacity: 0 }"
              :src="`/crNursing/api/file/signImage/${td.value}?${token}`"
              :class="{ xiegangSignImg: sheetInfo.sheetType === 'common_xg'||sheetInfo.sheetType === 'neonatology_xg' || HOSPITAL_ID==='wujing' || sheetInfo.sheetType === 'pediatric3_tj' || sheetInfo.sheetType === 'prenataldelivery2_tj' || sheetInfo.sheetType === 'postpartum2_tj'}"
              alt
            />
          </div>
          <!-- <div v-else-if="td.key == 'auditorNo'" class="sign-img">
            <img v-if="td.value" :src="`/crNursing/api/file/signImage/${td.value}?${token}`" alt>
          </div>-->
          <el-select
            v-else-if="td.type == 'select' && ['guizhou', '925'].includes(HOSPITAL_ID)"
            v-model="td.value"
            filterable
            remote
            placeholder=""
            size="small"
            class="access-select"
            autocomplete="off"
            :remote-method="remoteMethod"
            @visible-change="td.autoComplete && getOptionsData(td, tr, $event)"
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
            :class="{
              towLine: isOverText(td),
              maxHeight56: sheetInfo.sheetType == 'additional_count_hd',
              maxHeight40: sheetInfo.sheetType == 'cardiology_lcey',
            }"
            :readonly="tr.isRead"
            :disabled="td.isDisabed"
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
                  maxWidth: td.textarea.width + 'px',
                },
                td.isDisabed && { cursor: 'not-allowed' }
              )
            "
            @keydown="
              td.event($event, td);
              onKeyDown($event, { x, y, z: index, td });
            "
            :maxlength="td.textarea.maxLength || 1000"
            @input="
              splitSave && $emit('onModalChange',$event,tr,x,y,index);
              td.change && td.change($event, td);
              td.autoComplete && getOptionsData(td, tr, $event);
              remoteMethod($event.currentTarget.value);
              td.autoComplete &&
                onFocus($event, {
                  autoComplete: { data: td.name ? accessOptionData[td.name] : accessOptionData.armValue },
                  x,
                  y,
                  z: index,
                  td,
                  tr,
                  splice: td.splice,
                });
            "
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
              HOSPITAL_ID !== 'huadu' &&
                !td.splice &&
                onBlur($event, { x, y, z: index }, tr,td )
            "
            @click="
              sheetInfo.sheetType == 'antenatalwaiting_jm' &&
                !tr.isRead &&
                td.click &&
                td.click($event, td)
            "
          ></textarea>
          <!-- 护理记录单特殊情况特殊记录单独处理 -->
          <!-- 武警 护理记录单特殊情况单独处理，可以加粗 -->
          <div
            v-else-if="
              td.key === 'description' &&
             (HOSPITAL_ID === 'lingcheng' || sheetInfo.sheetType === 'common_wj') &&
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
            :readonly="tr.isRead"
            :disabled="td.isDisabed"
            v-model="td.value"
            :data-value="td.value"
            :position="`${x},${y},${index}`"
            @input="(e)=>splitSave && $emit('onModalChange',e,tr,x,y,index)"
            :style="[
              td.style,
              td.key === 'recordMonth' &&
                tr.find((item) => item.key == 'yearBreak').value && {
                  height: '12px',
                },
              td.isDisabed && { cursor: 'not-allowed' },
            ]"
            @select="mouseSelect1"
            @keydown="
              !selectType && td.event($event, td);
              selectType && mouseSelect2();
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
            @blur="onBlur($event, { x, y, z: index }, tr,td)"
            @click="!tr.isRead && td.click && td.click($event, td, tr)"
            v-else
          />
          <div
            v-if="HOSPITAL_ID=='wujing' && td.key=='food' && tr.barCodeIdentification"
            :class="[HOSPITAL_ID=='wujing' && td.key=='food' && tr.barCodeIdentification]"
            >
              {{tr.identificationUsage}}
            </div>
        </td>
        <span v-show="false" v-else>{{ td.key }}: {{ td.value }}</span>
      </tr>
    </table>

    <slot
      name="bottomCon"
      v-if="
        sheetInfo.sheetType === 'record_children_serious2_lc' ||
        sheetInfo.sheetType === 'neonatology_picc' ||
        sheetInfo.sheetType === 'internal_eval_lcey' ||
        sheetInfo.sheetType === 'intervention_cure_lcey' ||
        sheetInfo.sheetType === 'critical_lc' ||
        sheetInfo.sheetType === 'critical_new_lc' ||
        sheetInfo.sheetType === 'picu_hemodialysis_jm' ||
        sheetInfo.sheetType === 'rescue_hl' ||
        sheetInfo.sheetType === 'critical_new_linyi' ||
        sheetInfo.sheetType === 'critical_new_weihai' ||
        sheetInfo.sheetType === 'ultrasound_fs' ||
        sheetInfo.sheetType === 'postpartum_nurse_wj'||
        sheetInfo.sheetType === 'internal_eval_yz'
      "
    ></slot>
    <!-- 谢岗 -->
    <div v-if="sheetInfo.sheetType == 'icu_cpr_xg'">
      参加CPR人员签名:
      <textarea
      style='width:99%;resize:none;border:1px solid #444'
      cols="125"
      rows="3"
      v-model="sheetInfo.relObj[`${index}_CPR`]"
      :data-value="sheetInfo.relObj[`${index}_CPR`]"></textarea>
    </div>
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
            :src="`/crNursing/api/file/signImage/${sheetInfo.selectBlock.relSignInfo.signerNo2}?${token}`"
            alt
          />
        </span>
      </span>
      第 {{ index + sheetStartPage }} 页
      <!-- 表单底部开启审核签名时需要在src\Page\sheet-page\components\render\decode.js文件中添加对应医院 -->
      <span
        class="sh-name"
        v-if="auditArr.includes(sheetInfo.sheetType) || HOSPITAL_ID == 'fsxt'"
        :class="{
          'sh-time':
            sheetInfo.sheetType === 'internal_eval_lcey' ||
            sheetInfo.sheetType === 'critical_lcey'||
            sheetInfo.sheetType === 'critical_new_lcey'||
            sheetInfo.sheetType === 'critical2_lcey' ||
            sheetInfo.sheetType === 'internal_eval_linyi' ||
            sheetInfo.sheetType === 'ops_linyi' ||
            sheetInfo.sheetType === 'internal_eval_weihai' ||
            sheetInfo.sheetType === 'critical_linyi' ||
            sheetInfo.sheetType === 'baby_lcey'||
            sheetInfo.sheetType === 'internal_eval_yz',
        }"

      >
        <span
          v-if="
            sheetInfo.sheetType == 'com_lc' ||
            sheetInfo.sheetType == 'icu_lc' ||
            sheetInfo.sheetType == 'Record_Children_Serious_Lc' ||
            sheetInfo.sheetType == 'common_hd' ||
            sheetInfo.sheetType == 'nursing_dglb' ||
            sheetInfo.sheetType == 'neurosurgery_hd' ||
            sheetInfo.sheetType == 'stress_injury_hd' ||
            sheetInfo.sheetType == 'common_sn' ||
            sheetInfo.sheetType == 'maternity_sn' || 
            sheetInfo.sheetType == 'postpartum_dglb' || 
            sheetInfo.sheetType == 'prenatal_dglb'
          "
          >审核人：</span
        >
        <span
          v-else-if="
            sheetInfo.sheetType == 'common_wj' ||
            sheetInfo.sheetType == 'common_hl' ||
            sheetInfo.sheetType == 'rescue_hl' ||
            sheetInfo.sheetType == 'emergency_stay_hl' ||
            sheetInfo.sheetType == 'waiting_birth_wj' ||
            sheetInfo.sheetType == 'postpartum_nurse_wj'
          "
          >护士长签名：</span
        >
        <span
          v-else-if="
            sheetInfo.sheetType == 'obstetrics_hl' ||
            sheetInfo.sheetType == 'gynecology_hl' ||
            sheetInfo.sheetType == 'critical_lc' ||
            sheetInfo.sheetType == 'neonatology_hl' ||
            sheetInfo.sheetType == 'critical_new_linyi' ||
            sheetInfo.sheetType == 'ultrasound_fs' ||
            sheetInfo.sheetType == 'generalnursing_tj' ||
            sheetInfo.sheetType == 'magnesiumsulf_fs' ||
            sheetInfo.sheetType === 'pediatric3_tj'||
            sheetInfo.sheetType === 'prenataldelivery2_tj'||
            sheetInfo.sheetType === 'postpartum2_tj'||
            sheetInfo.sheetType === 'baby_tj'||
            sheetInfo.sheetType == 'internal_eval_linyi' ||
            sheetInfo.sheetType === 'ops_linyi' ||
            sheetInfo.sheetType === 'NICU_fs'||
            HOSPITAL_ID == 'fsxt'
          "
          >质控护士：</span
        >
        <span v-else-if="sheetInfo.sheetType == 'intervention_cure_lcey'"
          >护士签名：</span
        >
        <span v-else-if=" sheetInfo.sheetType == 'critical_new_weihai'"
          ></span
        >
        <span
          v-else-if="
            sheetInfo.sheetType == 'internal_eval_lcey' ||
            sheetInfo.sheetType == 'critical_lcey'||
            sheetInfo.sheetType == 'critical_new_lcey'||
            sheetInfo.sheetType == 'critical2_lcey' ||
            sheetInfo.sheetType == 'internal_eval_weihai' ||
            sheetInfo.sheetType == 'critical_linyi' ||
            sheetInfo.sheetType == 'baby_lcey'||
            sheetInfo.sheetType == 'internal_eval_yz'
          "
          ><strong>护士长审核：</strong></span
        >
        <span
          v-else-if="
            (sheetInfo.sheetType == 'nurse_jew' ||sheetInfo.sheetType == 'danger_nurse_jew')
          "
          ><strong>检查者签名：</strong></span
        >
        <span v-else>上级护士签名：</span>
        <span class="sh-name-box">
          <div
            class="sign-null-box"
            @click="openAduitModal"
            v-if="!auditorNo"
          ></div>
          <div class="sign-in-box" v-else @click="cancelAduitModal">
            <div class="no-print" v-if="HOSPITAL_ID === 'foshanrenyi'">
              <img
                class="in-print"
                :src="`/crNursing/api/file/signImage/${auditorNo}?${token}`"
                alt
              />
            </div>
            <div class="audit-text no-print" v-else>{{ auditorName }}</div>
            <div class="audit-img sign-img">
              <img
                class="in-print"
                :src="`/crNursing/api/file/signImage/${auditorNo}?${token}`"
                alt
              />
            </div>
          </div>
        </span>
        <!-- &nbsp;&nbsp;&nbsp; -->
        <div
          style="margin-right:50px">
        </div>
        <div
         v-if="
            sheetInfo.sheetType == 'internal_eval_lcey' ||
            sheetInfo.sheetType == 'critical_lcey'||
            sheetInfo.sheetType == 'critical_new_lcey'||
            sheetInfo.sheetType == 'critical2_lcey' ||
            sheetInfo.sheetType == 'internal_eval_weihai' ||
            sheetInfo.sheetType == 'critical_linyi' ||
            sheetInfo.sheetType == 'baby_lcey'||
            sheetInfo.sheetType == 'internal_eval_yz'"
            style="margin-right:50px"
          >
          <span> <strong>审核时间：</strong> </span>
          <span>{{ auditorTime }}</span>
        </div>
        <!-- &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
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
  delSelectRow,
  markSave,
  markDelete,
  saveTitleOptions,
  findListByBlockId,
} from "@/api/sheet.js";
import signModal from "@/components/modal/sign.vue";
import { Tr } from "../../../render/Body.js";
import {
  offset,
  getCursortPosition,
  focusElement,
  leftTopBottomRight,
  onFocusToAutoComplete,
  onBlurToAutoComplete,
  redTop,
  BlackTop,
} from "./tool.js";
import sheetInfo from "../../../config/sheetInfo";
import $ from "jquery";
import bus from "vue-happy-bus";
import sheetModel from "../../../../sheet.js";
import common from "@/common/mixin/common.mixin.js";
import {
  handlepz,
  delpz,
  auditpz,
  signBlockD,
  cancelSignD,
} from "../../../../api/index.js";
import decode from "../../../../components/render/decode.js";
import moment from "moment";
import { getUser } from "@/api/common.js";
import bottomRemark from "./remark";
import { GetUserList} from "@/api/caCardApi";
// console.dir(sheetInfo);
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    scrollY: Number,
    scrollX: Number,
    hasFiexHeader: Boolean,
    isInPatientDetails: Boolean,
    listData: Array,
  },
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      timeOnBlur: [false], //时间控制是否变红
      dateOnBlur: [false], //日期控制是否变红
      fiexHeaderWidth: 0,
      isFixed: false,
      multiSign: false,
      selectType: false, //时间日期鼠标选中修改控制限制
      flag:true,
      //底部签名
      auditArr: [
        "com_lc",
        "icu_lc",
        "common_hd",
        'nursing_dglb',
        "stress_injury_hd",
        "wait_delivery_hd",
        "wait_delivery_zhzxy",
        "neurosurgery_hd",
        "neonatology_hd",
        "neonatology2_hd",
        "Record_Children_Serious_Lc",
        "contraction_inhibitor_hd",
        "magnesium_sulphate_hd",
        "prenatal_hd",
        "postpartum_hd", // 产后护理记录单
        "common_wj",
        "postpartum_nurse_wj",
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
        "maternity_sn",
        "waiting_birth_wj",
        "internal_eval_lcey", //一般或者护理记录单
        "critical_lcey", //病重（病危）患者护理记录单（带瞳孔）
        "critical_new_lcey",
        "critical2_lcey",
        "internal_eval_yz",
        "baby_lcey",
        "internal_eval_linyi", //临邑人医_一般或者护理记录单
        "critical_linyi", //临邑人医_病重（病危）患者护理记录单（带瞳孔）
        "critical_new_linyi",
        "critical_new_weihai",
        "ultrasound_fs",
        "generalnursing_tj",
        "magnesiumsulf_fs",
        "pediatric3_tj",
        "prenataldelivery2_tj",
        "postpartum2_tj",
        'nurse_jew',
        'danger_nurse_jew',
        'baby_tj',
        'magnesiumsulphate_tj',//广东同江 - 硫酸镁注射液静脉滴注观察记录单
        'ops_linyi',
        'NICU_fs', // 佛一 新生儿NICU护理记录单
        'postpartum_dglb',
        'prenatal_dglb'
      ],
      // 需要双签名的记录单code
      multiSignArr: [
        "common_hd", // 花都_通用护理记录单
        "neurosurgery_hd", // 花都_神经外科护理记录单
        "prenatal_hd", // 花都_产前记录单
        "neonatology2_hd", // 花都_新生儿护理记录单
        "postpartum_hd", // 花都_产后记录单
        "wait_delivery_hd", // 花都_候产记录单
        "wait_delivery_zhzxy", // 珠海中西医_候产记录单
        "neonatology_hd", // 花都_新生儿科护理记录单
        "neonatal_care_jm", //江门妇幼_新生儿监护单
        "pediatric_surgery_jm", //江门妇幼_小儿外科护理记录单
        "pediatrics_jm", //江门妇幼_儿科护理记录单
        "child_recovery_jm", //江门妇幼_儿童康复科护理记录单
        "gynaecology_jm", //江门妇幼_妇科护理记录单
        "breastkenursing_jm", //江门妇幼_乳腺科护理记录单
        "obstetricnursing_jm", //江门妇幼_产科护理记录单
        "antenatalwaiting_jm", //江门妇幼_产前待产护理记录单
        "postpartumnursing_jm", //江门妇幼_产后护理记录单
        "entdepartment_jm", //江门妇幼_耳鼻喉科护理记录单
        "catheterplacement_jm", //江门妇幼_深静脉导管置入术后维护单

        "cardiology_fs", //佛山市一_心内科通用护理记录单
        "internal_eval_lcey",//聊城_一般患者护理记录单
        "critical_new_lcey",//聊城_病重（危）患者护理记录单(带瞳孔）
        "critical2_lcey",//聊城_病重（危）患者护理记录单
        "critical_lcey",//聊城_病重（病危）患者护理记录单（带瞳孔）
      ],
      // 底部两个签名的其中一个自定义字段
      doubleSignArr: [],
      accessOptionList: [], //下拉列表数据（贵州人医）
      defaultOptionList: [], //默认下拉列表数据
      isOpenEditModal: false, //是否双击打开编辑框
      accessOptionData: {
        //所有下拉列表数据
        入量名称: [],
        入量方式: [],
        途径: [],
        出量名称: [],
        出量方式: [],
        性质: [],
        armValue: [],//自定义表头使用

      },
      currentKey: "", //点击下拉当前的key
      wujingCommonHl:false
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
    auditorTime() {
      return (
        sheetInfo.auditorMap &&
        sheetInfo.auditorMap[`PageIndex_${this.index}_auditorTime`]
      );
    },
    titleModel() {
      return this.data.bodyModel[0].filter((td) => {
        return !td.hidden;
      });
    },
    splitSave(){
      return process.env.splitSave
    }

  },
  methods: {
    customCallBack(e,tr,x,y,index){
      if(!this.splitSave) return
      //这个方法是处理  自定义标题 每次选择 没有自动调用查询是否更改的方法的BUG
      this.$emit('onModalChange', e,tr,x,y,index)
    },
    redBottom(tr,y){
      return tr.find((item) => {
                return item.key == 'recordSource';
              }).value == '5' && this.data.bodyModel[y+1] && this.data.bodyModel[y+1].find((item) => {
                return item.key == 'recordSource';
              }).value != '5'
    },
    // 贵州需求：下拉选项二级联动，可输入可选择，附带智能检索
    getCompleteArr(tr, td) {
      if (['guizhou', '925'].includes(this.HOSPITAL_ID)) {
        if (td.parentKey) {
          let index = tr.findIndex((e) => e.key === td.parentKey); // 对比当前td的父级key以及当前行中的每一个key，找到对应下标
          let arr = td.autoComplete.data[0][[tr[index].value]] || []; // 获取父级对应的子选项数组
          return { data: arr.map((item) => item.itemName) };
        } else {
          if(td.key=="discharge"){
            let data =[...td.autoComplete.data]
            let autoCompleteData = {}
            let arr=["大便","小便","呕吐物","痰","胃液"];
            if(td.autoComplete.data.length>0){
              for(let i=0;i<td.autoComplete.data.length;i++){
                if(arr.includes(td.autoComplete.data[i])){
                  td.autoComplete.data.splice(i, 1);
                  break;
              }
            }
          }
          autoCompleteData = {data:arr.concat(td.autoComplete.data)}
          return autoCompleteData;
        }else{
          return td.autoComplete
        }
        }
      } else {
        return td.autoComplete;
      }
    },
    //时间日期选中事件
    mouseSelect1(e) {
      this.selectType = true;
    },
    mouseSelect2(e) {
      this.selectType = false;
    },
    //花都护记年份
    recordYear() {
      let year=this.data.bodyModel[0][0].value.split("-")[0]
      if((this.HOSPITAL_ID==='fuyou'||this.HOSPITAL_ID==='whfk')&&year){
        year=`${year}年`
      }
      if(this.HOSPITAL_ID === 'foshanrenyi' && this.sheetInfo.sheetType == 'babyarea_fs'){
         year=`${year || moment().format('YYYY')}年`
      }
      if(['wujing'].includes(this.HOSPITAL_ID)){
        let value = this.data.bodyModel[0].find(item=>item.key==="recordYear").value
        year = value || ''
      }
      if(this.HOSPITAL_ID==='fsxt'){
        year=`${year || moment().format('YYYY')}年`
      }

      return year;
    },
    show(td) {
      console.log(td);
    },
    /* 花都个别护记的出入量统计：增加红线与上一行做区分 */
    getBorderClass(index) {
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
      const lastTr =
        index > 0 &&
        this.data.bodyModel[index - 1].find((td) => td.key === "recordSource")
          .value !== "5";
      const currentTr =
        this.data.bodyModel[index].find((td) => td.key === "recordSource")
          .value === "5";
      return (index == 0 || lastTr) && currentTr;
    },
    redTop, // tool.js引进来的啦
    BlackTop, // 这个也是tool.js引进来的啦
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
            //自定义标题没有输入事件  所以当有医院配置 保存按需（修改记录）来传给后端后 需要调用这个事件
            onFocusToAutoComplete(e, bind, () => this.customCallBack(e, bind.tr, bind.x, bind.y, bind.index)); //下拉框延迟
          }
        }, 300);
        // onFocusToAutoComplete(e, bind);
      }
    },
    async onBlur(e, bind, tr,td){
      if (sheetInfo.model == "print") return;
      if (this.sheetInfo.sheetType == 'common_gzry' || this.sheetInfo.sheetType == 'waiting_birth_gzry' || this.sheetInfo.sheetType == 'newborn_care_gzry') {
        let confirmRes = '';
        if(td.key === 'temperature'&&td.value !== ''&&(isNaN(td.value)||td.value<35||td.value>42)){
          confirmRes = await this.$confirm(
            " 体温的填写范围是35～42，您的填写超出录入范围,请重新填写",
            "错误",
            {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "error",
            }
          ).catch(() => {});
            td.value ='';
        }
        if((td.key === 'pulse'||td.key === 'heartRate'||td.key === 'fetalRate')&&td.value !== ''&&(isNaN(td.value)||td.value<30||td.value>300)){
          confirmRes = await this.$confirm(
            td.name+ "的填写范围是30～300，您的填写超出录入范围,是否确定填写?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).catch(() => {});
          if (confirmRes !== "confirm") {
            td.value ='';
          }
        }
        if((td.key === 'spo2')&&td.value !== ''&&(isNaN(td.value)||td.value<50||td.value>100)){
          confirmRes = await this.$confirm(
            td.name+ "的填写范围是50～100，您的填写超出录入范围,是否确定填写?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).catch(() => {});
          if (confirmRes !== "confirm") {
            td.value ='';
          }
        }
        if((td.key === 'bloodPressure') && td.value !== ''&&!td.value.split('/')[1]){
          td.value ='';
        }
        if((td.key === 'bloodPressure')&&td.value !== ''&&(isNaN(td.value.split('/')[0])||!td.value.split('/')[1]
        ||(td.value.split('/')[0]>250||td.value.split('/')[0]<50)||td.value.split('/')[1]>200||td.value.split('/')[1]<0)){
          confirmRes = await this.$confirm(
            td.name+ "的收缩压的填写范围50~250,舒张压的填写范围0~200，您的填写超出录入范围,是否确定填写?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).catch(() => {});
          if (confirmRes !== "confirm") {
            td.value ='';
          }

        }
      }
      onBlurToAutoComplete(e, bind);
      let recordDate = tr.find(item=>{
        return item.key == "recordDate"
      })
      let recordYear = tr.find(item=>{
        return item.key == "recordYear"
      })
      //点击保存年份 有时候为空
      recordYear.value = moment().format('YYYY')
      if (['guizhou', '925'].includes(this.HOSPITAL_ID)) {
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
    setTitle(item,item2) {
      if (['foshanrenyi','fsxt', 'gdtj'].includes(this.HOSPITAL_ID)) {
        // if (item2.fromAddPage) {
        //   return
        // }
        this.setTitleFS(item)
        return
      }
      this.$parent.$parent.$refs.sheetTool.$refs.setTitleModal.open(
        (title) => {
          let data = {
            patientId: this.patientInfo.patientId,
            visitId: this.patientInfo.visitId,
            pageIndex: this.index,
            fieldEn: item.key,
            fieldCn: title,
            // sonData: sonData,
            recordCode: sheetInfo.sheetType,
          };
          saveTitle(data).then((res) => {
            item.name = title;
            // item.foshansiyiSonData = sonData
          });
        },
        item.name,
        item,
      );
    },
    //
    setTitleFS(item) {
      let self = this
      this.$parent.$parent.$refs.sheetTool.$refs.setTitleModal.open(
        (title, obj) => {
          let { list = [], id = '' } = obj  || {}
          list = list.map(v => v.options)
          let data = {
            // pageIndex: this.index,
            // columnName: item.key,
            // id,
            // title,
            // list1: list,
            list: [{
              pageIndex: this.index,
              fieldEn: item.key,
              id,
              fieldCn: title,
              option: list,
            }],
            recordCode: sheetInfo.sheetType,
          };
          self.bus.$emit("saveSheetPage");
          saveTitleOptions(data).then((res) => {
            // item.name = title;
            this.bus.$emit('refreshSheetPage')
          });
        },
        item.name,
        item,
      );
    },
    addNullRow(index, row) {
      let newRow = nullRow();
      if (['foshanrenyi','fsxt', 'gdtj'].includes(this.HOSPITAL_ID)) {
        // 发送请求。有自定义标题且含下拉的。放进去
        const {startPageIndex,endPageIndex} = this.$store.state.sheet.sheetPageArea
        findListByBlockId(startPageIndex,endPageIndex).then(res=>{
          const optionArr=res.data.data.Options
          if(optionArr.length>0){
             optionArr.forEach(option=>{
              if(option.pageIndex==this.index){
                newRow=newRow.map(activeKey=>{
                  if(activeKey.key==option.fieldEn){
                    if(activeKey.autoComplete==undefined){
                      activeKey.autoComplete={}
                      activeKey.autoComplete.data=[]
                    }
                    activeKey.autoComplete.data.unshift(option.options)
                  }
                  return activeKey
                })
              }
             })
           }
          //防止异步才在数据回来的结果写
          if (row) {
            let recordSource = row.find((item) => {
              return item.key == "recordSource";
            }).value;
            newRow.find((item) => {
               return item.key == "recordSource";
            }).value = recordSource;
           }
           this.data.bodyModel.splice(index + 1, 0, newRow);
       })
      }else{
        if (row) {
           let recordSource = row.find((item) => {
              return item.key == "recordSource";
           }).value;
           newRow.find((item) => {
            return item.key == "recordSource";
           }).value = recordSource;
        }
        this.data.bodyModel.splice(index + 1, 0, newRow);
      }
    },
    toCopyRow(index) {
      let row = JSON.parse(JSON.stringify(this.sheetInfo.copyRow));
      this.data.bodyModel.splice(index, 1, row);
    },
    delRow(index) {
      let curr_row = this.data.bodyModel[index];
      let next_row = this.data.bodyModel[index + 1];
      let recordMonth = curr_row.find((item) => {
        return item.key == "recordMonth";
      }).value;
      let recordHour = curr_row.find((item) => {
        return item.key == "recordHour";
      }).value;
      try {
        let next_Month = next_row.find((item) => {
          return item.key == "recordMonth";
        }).value;
        let next_Hour = next_row.find((item) => {
          return item.key == "recordHour";
        }).value;
        if (next_row) {
          if (recordMonth && !next_Month) {
            next_row.find((item) => {
              return item.key == "recordMonth";
            }).value = recordMonth;
          }
          if (recordHour && !next_Hour) {
            next_row.find((item) => {
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
    toSign(trArr, index, bodyModel, showSign, e, td) {
      if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
    GetUserList().then(res=>{
      if (res.data.length == 0) {
        localStorage.removeItem("caUser")
      }
    })
  }
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
        let status = trArr.find((item) => {
          return item.key == "status";
        }).value;

        // if (status == 1) return this.$message.warning('该记录已经签名了')
        let save = () => {
          if(this.HOSPITAL_ID=="foshanrenyi"){
            let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            let strSignDataOBJ =
                Object.assign({}, trObj, {
                  recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                  recordHour: this.getPrev(currIndex, allList, "recordHour"),
                  recordYear: this.getPrev(currIndex, allList, "recordYear"),
                  patientId: this.patientInfo.patientId,
                  visitId: this.patientInfo.visitId,
                  pageIndex: this.index,
                })
                let strSignData ={}
              for(let key in strSignDataOBJ){
                if(strSignDataOBJ[key]) strSignData[key]=strSignDataOBJ[key]
              }
            let SigndataObj = {
              Patient_ID:this.patientInfo.patientId,
              Visit_ID:this.patientInfo.visitId,
              Document_Title:this.$parent.patientInfo.recordName,
              Document_ID:sheetInfo.sheetType,
              Section_ID:trObj.id,
              strSignData: JSON.stringify(strSignData),
            };
            let verifySignObj = {
                    patientId:this.patientInfo.patientId,
                    visitId:this.patientInfo.visitId,
                    formName:this.$parent.patientInfo.recordName,
                    formCode:sheetInfo.sheetType,
                    instanceId:this.$parent.patientInfo.id,
                    recordId:strSignData.id,
                    signData:JSON.stringify(strSignData),
                  }
            this.$refs.signModal.open((password,empNo) => {
              let trObj = {};
              for (let i = 0; i < trArr.length; i++) {
                trObj[trArr[i].key] = trArr[i].value;
              }
              let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
              let data2 = {
                empNo,
                password,
                list: [
                  Object.assign({}, trObj, {
                    recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                    recordHour: this.getPrev(currIndex, allList, "recordHour"),
                    recordYear: this.getPrev(currIndex, allList, "recordYear"),
                    patientId: this.patientInfo.patientId,
                    visitId: this.patientInfo.visitId,
                    pageIndex: this.index,
                  }),
                ],
                multiSign: this.multiSign || false,
                // multiSign: this.HOSPITAL_ID === "huadu" ? true : false,
                signType:
                  this.HOSPITAL_ID === "huadu" || this.HOSPITAL_ID === "fuyou"||this.HOSPITAL_ID === "liaocheng"
                    ? this.signType
                    : "",
              };
                     sign(
                this.patientInfo.patientId,
                this.patientInfo.visitId,
                data2
              ).then((res) => {
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
                if (
                  trArr.find((item) => {
                    return item.key == "recordHour";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordHour";
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
                this.bus.$emit("saveSheetPage", true);
              });
                  // })
                // })
                // }else{
                //   this.$message.error("验证签名失败!")
                // }
              // });
            },'',null,false,'',{},undefined,undefined,undefined,SigndataObj,verifySignObj);
          }else{
            let parmas={},trObj = {};
            if(this.HOSPITAL_ID=="zhzxy"){
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            let strSignDataOBJ =
                Object.assign({}, trObj, {
                  recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                  recordHour: this.getPrev(currIndex, allList, "recordHour"),
                  recordYear: this.getPrev(currIndex, allList, "recordYear"),
                  patientId: this.patientInfo.patientId,
                  visitId: this.patientInfo.visitId,
                  pageIndex: this.index,
                })
                let strSignData ={}
              for(let key in strSignDataOBJ){
                if(strSignDataOBJ[key]) strSignData[key]=strSignDataOBJ[key]
              }
              parmas={
                  signType:this.signType,
                  patientName:this.patientInfo.name,//-- 患者名称
                  patientSex:this.patientInfo.sex,// -- 患者性别
                  patientCardType:"QT",//-- 患者证件类型
                  openId:localStorage["fuyouCaData"]?JSON.parse(localStorage["fuyouCaData"]).openId :"",// -- 当前用户唯一标识
                  patientAge:this.patientInfo.age,//-- 患者年龄
                  patientCard:"",// -- 患者证件号
                  templateId:"hash", //-- 模板id
                  formId:"1",// -- 表单ID
                  formCode:sheetInfo.sheetType,// -- 表单ID
                };
              }
            let p7SignObj = {}
            if(['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)){
              let trObj = {};
              for (let i = 0; i < trArr.length; i++) {
                trObj[trArr[i].key] = trArr[i].value;
              }
              let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
               let strSignDataOBJ = Object.assign({}, trObj, {
                    recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                    recordHour: this.getPrev(currIndex, allList, "recordHour"),
                    recordYear: this.getPrev(currIndex, allList, "recordYear"),
                    patientId: this.patientInfo.patientId,
                    visitId: this.patientInfo.visitId,
                    pageIndex: this.index,
                  })
                 let strSignData ={}
                  for(let key in strSignDataOBJ){
                  if(strSignDataOBJ[key]) strSignData[key]=strSignDataOBJ[key]
                }
               p7SignObj = {
                formId:this.$parent.patientInfo.id,
                patientId:this.patientInfo.patientId,
                visitId:this.patientInfo.visitId,
                formName:this.$parent.patientInfo.recordName,
                formCode:sheetInfo.sheetType,
                instanceId:this.$parent.patientInfo.id,
                recordId:strSignData.id,
                signData:JSON.stringify(strSignData)
                }
            }
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
                    pageIndex: this.index,
                  }),
                ],
                multiSign: this.multiSign || false,
                // multiSign: this.HOSPITAL_ID === "huadu" ? true : false,
                signType:
                  this.HOSPITAL_ID === "huadu" || this.HOSPITAL_ID === "fuyou"||this.HOSPITAL_ID === "liaocheng"
                    ? this.signType
                    : "",
              };
              sign(
                this.patientInfo.patientId,
                this.patientInfo.visitId,
                data
              ).then((res) => {
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
                if (
                  trArr.find((item) => {
                    return item.key == "recordHour";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordHour";
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
                this.bus.$emit("saveSheetPage", true);
              });
            },'',null,false,'',['guizhou', '925'].includes(this.HOSPITAL_ID)?{}:this.HOSPITAL_ID=="zhzxy"?trObj:null,undefined,undefined,undefined ,undefined ,['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)?p7SignObj:parmas);
          }
        };
        let reverseList = [...decode().list].reverse();
        /** 最后的时间 */
        let lastRecordHour = (
          reverseList.find((item) => item.recordDate && item.recordHour) || {}
        ).recordHour;
        /** 所有新增的时间 */
        let newRecordHours = reverseList
          .filter(
            (item) => item.recordHour && !item.recordMonth && !item.recordDate
          )
          .map((item) => item.recordHour);
        /** 新增记录是否存在比原有记录更前 */
        let isBefore = newRecordHours.some(
          (item) =>
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
              type: "warning",
            }
          ).then((res) => {
            save();
          });
        } else {
          save();
        }
      } else {
        // 删除签名
        let SigndataObj = {}, verifySignObj={}
        if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
          let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            let strSignDataOBJ =
                Object.assign({}, trObj, {
                  recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                  recordHour: this.getPrev(currIndex, allList, "recordHour"),
                  recordYear: this.getPrev(currIndex, allList, "recordYear"),
                  patientId: this.patientInfo.patientId,
                  visitId: this.patientInfo.visitId,
                  pageIndex: this.index,
                })
                let strSignData ={}
              for(let key in strSignDataOBJ){
                if(strSignDataOBJ[key]) strSignData[key]=strSignDataOBJ[key]
              }
            SigndataObj = {
              Patient_ID:this.patientInfo.patientId,
              Visit_ID:this.patientInfo.visitId,
              Document_Title:this.$parent.patientInfo.recordName,
              Document_ID:sheetInfo.sheetType,
              Section_ID:trObj.id,
              strSignData: JSON.stringify(strSignData),
            };
            verifySignObj = {
                    patientId:this.patientInfo.patientId,
                    visitId:this.patientInfo.visitId,
                    formName:this.$parent.patientInfo.recordName,
                    formCode:sheetInfo.sheetType,
                    instanceId:this.$parent.patientInfo.id,
                    recordId:strSignData.id,
                    signData:JSON.stringify(strSignData),
                  }
        }
        if(['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)){
              let trObj = {};
              for (let i = 0; i < trArr.length; i++) {
                trObj[trArr[i].key] = trArr[i].value;
              }
              let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
               let strSignDataOBJ = Object.assign({}, trObj, {
                    recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                    recordHour: this.getPrev(currIndex, allList, "recordHour"),
                    recordYear: this.getPrev(currIndex, allList, "recordYear"),
                    patientId: this.patientInfo.patientId,
                    visitId: this.patientInfo.visitId,
                    pageIndex: this.index,
                  })
                 let strSignData ={}
                  for(let key in strSignDataOBJ){
                  if(strSignDataOBJ[key]) strSignData[key]=strSignDataOBJ[key]
                }
                verifySignObj = {
                formId:this.$parent.patientInfo.id,
                patientId:this.patientInfo.patientId,
                visitId:this.patientInfo.visitId,
                formName:this.$parent.patientInfo.recordName,
                formCode:sheetInfo.sheetType,
                instanceId:this.$parent.patientInfo.id,
                recordId:strSignData.id,
                signData:JSON.stringify(strSignData)
                }
            }
          this.$refs.delsignModal.open((password, empNo) => {
            let id = trArr.find((item) => {
              return item.key == "id";
            }).value;
            cancelSign({
              id,
              empNo,
              password,
              multiSign: this.multiSign,
              // multiSign: this.HOSPITAL_ID === "huadu" ? true : false,
              signType:
                this.HOSPITAL_ID === "huadu" || this.HOSPITAL_ID === "fuyou"||this.HOSPITAL_ID === "liaocheng"
                  ? this.signType
                  : "",
            }).then((res) => {
              this.bus.$emit("saveSheetPage", true);
            });
          },'',null,false,'',['guizhou','foshanrenyi', '925'].includes(this.HOSPITAL_ID)?{}:null,undefined,undefined,undefined,SigndataObj,verifySignObj);
      }
    },
    toAudit(trArr, index, bodyModel, showAudit, e) {
      this.sheetInfo.downControl = e.ctrlKey;
      if (this.sheetInfo.downControl) return;
      if (this.sheetInfo.selectRow.length) {
        return this.bus.$emit("toSheetMoreAudit");
      }
      if (!showAudit) {
        let status = trArr.find((item) => {
          return item.key == "status";
        }).value;
        // if (status == 1) return this.$message.warning('该记录已经签名了')
        if(this.HOSPITAL_ID=="foshanrenyi"){
           let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            let strSignDataOBJ =
                Object.assign({}, trObj, {
                  recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                  recordHour: this.getPrev(currIndex, allList, "recordHour"),
                  recordYear: this.getPrev(currIndex, allList, "recordYear"),
                  patientId: this.patientInfo.patientId,
                  visitId: this.patientInfo.visitId,
                  pageIndex: this.index,
                })
                let strSignData ={}
              for(let key in strSignDataOBJ){
                if(strSignDataOBJ[key]) strSignData[key]=strSignDataOBJ[key]
              }
            let SigndataObj = {
              Patient_ID:this.patientInfo.patientId,
              Visit_ID:this.patientInfo.visitId,
              Document_Title:this.$parent.patientInfo.recordName,
              Document_ID:sheetInfo.sheetType,
              Section_ID:trObj.id,
              strSignData: JSON.stringify(strSignData),
            };
            let verifySignObj = {
                    patientId:this.patientInfo.patientId,
                    visitId:this.patientInfo.visitId,
                    formName:this.$parent.patientInfo.recordName,
                    formCode:sheetInfo.sheetType,
                    instanceId:this.$parent.patientInfo.id,
                    recordId:strSignData.id,
                    signData:JSON.stringify(strSignData),
                  }
          this.$refs.signModal.open((password,empNo) => {
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
                if (
                  trArr.find((item) => {
                    return item.key == "recordHour";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordHour";
                  }).value = "";
                }
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

            },'',undefined,undefined,undefined,undefined,undefined,undefined,undefined,SigndataObj,verifySignObj);
        }else{
          let parmas={},trObj = {};
            if(this.HOSPITAL_ID=="zhzxy"){
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            let strSignDataOBJ =
                Object.assign({}, trObj, {
                  recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                  recordHour: this.getPrev(currIndex, allList, "recordHour"),
                  recordYear: this.getPrev(currIndex, allList, "recordYear"),
                  patientId: this.patientInfo.patientId,
                  visitId: this.patientInfo.visitId,
                  pageIndex: this.index,
                })
                let strSignData ={}
              for(let key in strSignDataOBJ){
                if(strSignDataOBJ[key]) strSignData[key]=strSignDataOBJ[key]
              }
              parmas={
                  signType:this.signType,
                  patientName:this.patientInfo.name,//-- 患者名称
                  patientSex:this.patientInfo.sex,// -- 患者性别
                  patientCardType:"QT",//-- 患者证件类型
                  openId:JSON.parse(localStorage["fuyouCaData"]).openId,// -- 当前用户唯一标识
                  patientAge:this.patientInfo.age,//-- 患者年龄
                  patientCard:"",// -- 患者证件号
                  templateId:"hash", //-- 模板id
                  formId:"1",// -- 表单ID
                  formCode:sheetInfo.sheetType,// -- 表单ID
                };
              }
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
                if (
                  trArr.find((item) => {
                    return item.key == "recordHour";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordHour";
                  }).value = "";
                }
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
          },['guizhou', '925'].includes(this.HOSPITAL_ID)?"":null,"",undefined,undefined,this.HOSPITAL_ID=="zhzxy"?trObj:undefined,undefined,undefined,undefined,undefined,parmas);

        }
      } else {
        // 删除签名
        let SigndataObj = {}, verifySignObj={}
        if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
          let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            let strSignDataOBJ =
                Object.assign({}, trObj, {
                  recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                  recordHour: this.getPrev(currIndex, allList, "recordHour"),
                  recordYear: this.getPrev(currIndex, allList, "recordYear"),
                  patientId: this.patientInfo.patientId,
                  visitId: this.patientInfo.visitId,
                  pageIndex: this.index,
                })
                let strSignData ={}
              for(let key in strSignDataOBJ){
                if(strSignDataOBJ[key]) strSignData[key]=strSignDataOBJ[key]
              }
            SigndataObj = {
              Patient_ID:this.patientInfo.patientId,
              Visit_ID:this.patientInfo.visitId,
              Document_Title:this.$parent.patientInfo.recordName,
              Document_ID:sheetInfo.sheetType,
              Section_ID:trObj.id,
              strSignData: JSON.stringify(strSignData),
            };
            verifySignObj = {
                    patientId:this.patientInfo.patientId,
                    visitId:this.patientInfo.visitId,
                    formName:this.$parent.patientInfo.recordName,
                    formCode:sheetInfo.sheetType,
                    instanceId:this.$parent.patientInfo.id,
                    recordId:strSignData.id,
                    signData:JSON.stringify(strSignData),
                  }
        }
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
            if(res.data.code==200)
            this.$notify.success({
                title: "提示",
                message: "取消审核成功",
                duration: 1000,
              });
            this.bus.$emit("saveSheetPage", true);
          });
        },'',null,false,'',['guizhou','foshanrenyi', '925'].includes(this.HOSPITAL_ID)?{
        }:null,null,null,null,SigndataObj,verifySignObj);
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
      if (status == "1" || status == "2") {
        if (["weixian","foshanrenyi","nanfangzhongxiyi",'zhzxy'].includes(this.HOSPITAL_ID)) {
          return trArr.find((item) => item.key == "signerNo").value
            ? `<img
              width="50"
              height="100%"
              style="object-fit: contain"
              src="/crNursing/api/file/signImage/${
                trArr.find((item) => item.key == "signerNo").value
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
      let signerName2 = trArr.find((item) => {
        return item.key == "signerName2";
      }).value;
      return signerName2;
    },
    // 展示审核状态
    showAudit(trArr) {
      let status = trArr.find((item) => {
        return item.key == "status";
      }).value;
      const sign = trArr.find(item => item.key == 'auditorNo').value
        // console.log("koaosdad",status)
      let auditorName = trArr.find((item) => {
        return item.key == "auditorName";
      }).value;
        // console.log("koaosdad",auditorName)
      if (status == "2" && sign) {
        if (this.HOSPITAL_ID == "foshanrenyi") {
          return  `<img
              width="50"
              height="100%"
              style="object-fit: contain"
              src="/crNursing/api/file/signImage/${
                trArr.find((item) => item.key == "auditorNo").value
              }?${this.token}"
              alt
            /> `
        }else return auditorName;
      } else {
        return "";
      }
    },
    isFirst(tr, y) {
      let recordDate = tr.find((item) => item.key == "recordDate").value;
      let recordSource = tr.find((item) => item.key == "recordSource").value;
      let flag = false;
      if (recordDate && recordSource) {
        let dateIndex = this.data.bodyModel[0].findIndex(
          (e) => e.key == "recordDate"
        );
        let sourceIndex = this.data.bodyModel[0].findIndex(
          (e) => e.key == "recordSource"
        );
        let index = this.data.bodyModel.findIndex((item) => {
          return (
            item[dateIndex].value == recordDate &&
            item[sourceIndex].value == recordSource
          );
        });
        flag = index == y;
      }
      return flag;
    },
    // 除第一行以外到结束行之内其他单元格不能录入内容（威县），出入量统计行除外
    isDisabed(tr, td, index) {
      // canModify false可以修改，true禁止修改
      if (
        this.HOSPITAL_ID == "huadu" &&
        sheetInfo.sheetType === "body_temperature_Hd" &&
        td &&
        this.listData[index]
      ) {
        return !this.listData[index].canModify;
      }
      if (td && td.key == "recordYear") {
        if (!tr.find((item) => item.key == "recordMonth").value) {
          td.value = "";
        }
        return true;
      }
      // 护理记录单特殊情况记录输入多行,签名后,其他项目不能在编辑
      if (
        this.HOSPITAL_ID == "huadu" &&
        tr.find((item) => item.key == "status").value === "1"
      ) {
        let flag =
          tr.find((item) => item.key == "status").value === "1" && // 是否已签名
          this.listData &&
          this.listData[index] &&
          !this.listData[index].canModify; // 是否有权限
        //td存在才判断
        if (td) {
          flag =
            !this.isFirst(tr, index) &&
            (td.key === "recordMonth" || td.key === "recordHour"); // 已签名的recordMonth和recordHour单元格，并且不是第一行(最高等级)
        }
        return flag;
      }
      if (
        this.HOSPITAL_ID != "weixian" ||
        (td && td.key == "description") ||
        tr.find((item) => item.key == "recordSource").value == 5
      ) {
        return false;
      }
      if (
        tr.find((item) => item.key == "description").value &&
        !tr.find((item) => item.key == "recordHour").value &&
        !tr.find((item) => item.key == "recordMonth").value
      ) {
        return true;
      } else {
        return false;
      }
    },
    isRead(tr) {
      if (
        this.HOSPITAL_ID == "huadu" &&
        sheetInfo.sheetType === "body_temperature_Hd"
      ) {
        return false;
      }
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
    checkMaxLength(value, length) {
      const regC = /[^ -~]+/g;
      const regE = /\D+/g;
      // console.log("textarea", value, length);
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
        top: `${Math.min(e.clientY - 15, window.innerHeight - 280)}px`,
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
                  item.key == "status"
                ) {
                  obj = { value: "" };
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
            // 佛山人医签名修改与删除比较严格。
            if(this.HOSPITAL_ID == "foshanrenyi"){
              // 根据之前判断的isRead
              isRead=row.isRead
            }
            if(this.HOSPITAL_ID == "foshanrenyi"){
              // 佛山人医根据canModify
               if (id) {
                  if (isRead) {
                    //isRead=true.直接弹窗不让他删除
                    this.$message({
                     message: '您没有权限删除整行',
                     type: 'error',
                     duration: 2000,
                     });
                  }else{
                    //isRead=false,有权限输出。提示直接是否删除。不用输密码
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
                      duration: 1000,
                    });
                    this.bus.$emit("saveSheetPage", true);
                   });
                   });
                  }
               }else{
                  this.$confirm("你确定删除该行数据吗", "提示", {
                   confirmButtonText: "删除",
                   cancelButtonText: "取消",
                   type: "warning",
                  }).then((res) => {
                   this.delRow(index);
                   this.$notify.success({
                   title: "提示",
                   message: "删除成功",
                   duration: 1000,
                 });
                 this.bus.$emit("saveSheetPage", true);
                });
               }
            }else{
              if (id) {
                if (isRead) {
                     this.$parent.$parent.$refs.signModal.open((password, empNo) => {
                     delRow(id, password, empNo).then((res) => {
                       this.delRow(index);
                       this.$notify.success({
                       title: "提示",
                       message: "删除成功",
                       duration: 1000,
                     });
                    this.bus.$emit("saveSheetPage", true);
                   });
                  },);
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
                      duration: 1000,
                    });
                    this.bus.$emit("saveSheetPage", true);
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
                   duration: 1000,
                 });
                 this.bus.$emit("saveSheetPage", true);
                });
              }
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
        {
          name: "新建护理单",
          iconClass: "el-icon-document",
          click: () => {
            this.bus.$emit("splitSheet", row, cell);
          },
        },
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
          },
        };
        data.push(obj);
          let obj2 =  {
          name: "撤销同步",
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
                      message: "撤销同步成功"
                    });
                    this.bus.$emit("saveSheetPage", true);
                  });
                });
              } else {
                this.$confirm("你确定撤销该行数据吗", "提示", {
                  confirmButtonText: "撤销同步",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(res => {
                  delRow(id, "", "").then(res => {
                    this.delRow(index);
                    this.$notify.success({
                      title: "提示",
                      message: "撤销同步成功"
                    });
                    this.bus.$emit("saveSheetPage", true);
                  });
                });
              }
            } else {
              this.$confirm("你确定撤销同步该行数据吗", "提示", {
                confirmButtonText: "撤销同步",
                cancelButtonText: "取消",
                type: "warning"
              }).then(res => {
                this.delRow(index);
                this.$notify.success({
                  title: "提示",
                  message: "撤销同步成功"
                });
                this.bus.$emit("saveSheetPage", true);
              });
            }
          }
        }
        data.push(obj2)
      }else if(['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)){
        data.splice(5,0,
        {
          name: "批量删除选中行",
          icon: "shanchuzhenghang",
          disable: !this.sheetInfo.selectRow.length,
          click:()=>{
            let ids = this.sheetInfo.selectRow.map(row=>{
              return row.find((item) => {
                return item.key == "id";
              }).value;
            })
            let hasRoot = this.sheetInfo.selectRow.every(row=>{
              let empNo = row.find((item) => {
                return item.key == "empNo";
              }).value
              return empNo ? empNo == this.empNo : true;
            })
            if(!hasRoot) return this.$message.warning("所选记录有非本人记录！");
            this.$parent.$parent.$refs.signModal.open((password, empNo) => {
              delSelectRow({password,empNo,ids}).then(res=>{
                this.$notify.success({
                  title: "提示",
                  message: "删除成功",
                  duration: 1000,
                });
                this.bus.$emit("saveSheetPage", true);
              })
            })
          }
        },)
      }
      if(this.sheetInfo.sheetType=="nursingrecords_zxy"&&cell.key=="description"){
        let obj = {
          name: "导入检验项目结果",
          iconClass: "sync-decription",
          click: () => {
            this.bus.$emit("syncImportExam", row, cell);
          },
        };
        data.push(obj)
      }
      if(this.sheetInfo.sheetType=="nursingrecords_zxy"&&cell.key=="food"){
        let obj = {
          name: "入量",
          iconClass: "sync-decription",
          click: () => {
            this.bus.$emit("syncImportAmountExam", row, cell);
          },
        };
        data.push(obj)
      }
      e.preventDefault();
      window.openContextMenu({ style, data });
    },
    openEditModal(tr, data, e) {
      // 花都副页关闭编辑框
      if(this.sheetInfo.sheetType=='additional_count_hd' || this.sheetInfo.sheetType=='inandout_weihai' || this.sheetInfo.sheetType=='inout_ytll'){
        return
      }
      this.isOpenEditModal = true;
      setTimeout(() => {
        this.isOpenEditModal = false;
      }, 1000);
      // 护理记录单特殊情况记录输入多行,签名后,其他项目不能在编辑
      // console.log(tr,data);
      // if (
      //   this.HOSPITAL_ID == "huadu"
      //   // && tr.find(item => item.key == "status").value === "1"
      // )
      //   return tr.find(item => item.key == "status").value === "1";

      if (sheetInfo.model == "print") return;
      // 双击的input key
      let key =
        $(e.target).attr("datakey") ||
        $(e.target).parents("td").attr("datakey");
      let name = $(e.target).parents("td").attr("dataName");
      let tab = "1";
      if (key == "description") {
        tab = "3";
      } else if (name || key.indexOf("field") == -1) {
        tab = "1";
      } else {
        tab = "2";
      }
      //佛山市一不要双击时间出弹框
      if (this.HOSPITAL_ID == "foshanrenyi" && key == "recordHour") {
        return
      }
      // 双击打开编辑框,（除第1条外）默认显示特殊记录tab栏
      if (this.HOSPITAL_ID == "weixian") {
        if (this.isDisabed(tr)) {
          tab = "3";
        }
      }
      // 能否保存()
      const canNotSave = tr.find(item => item.key == 'recordMonth').isDisabed
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
        canNotSave
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
      let verifySignObj = "",SigndataObj=""
      if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
            SigndataObj = {
              Patient_ID:this.patientInfo.patientId,
              Visit_ID:this.patientInfo.visitId,
              Document_Title:this.$parent.patientInfo.recordName,
              Document_ID:sheetInfo.sheetType,
              Section_ID:"trObj.id",
              strSignData: "JSON.stringify(strSignData)",
            };
            verifySignObj = {
              patientId:this.patientInfo.patientId,
              visitId:this.patientInfo.visitId,
              formName:this.$parent.patientInfo.recordName,
              formCode:sheetInfo.sheetType,
              instanceId:this.$parent.patientInfo.id,
              recordId:"strSignData.id",
              signData:"JSON.stringify(strSignData)",
            }
      }
      window.openSignModal((password, empNo,auditDate=moment().format("YYYY-MM-DD HH:mm:ss")) => {
        getUser(password, empNo).then((res) => {
          let { empNo, empName } = res.data.data;
          sheetInfo.auditorMap[`PageIndex_${this.index}_auditorNo`] = empNo;
          sheetInfo.auditorMap[`PageIndex_${this.index}_auditorName`] = empName;
          const auditorTimeArr=['internal_eval_lcey','critical_lcey','critical_new_lcey','critical2_lcey','internal_eval_linyi','critical_linyi','baby_lcey',"generalnursing_tj",'magnesiumsulf_fs', 'internal_eval_weihai','pediatric3_tj','baby_tj','ops_linyi','internal_eval_yz']
          if(auditorTimeArr.includes(this.sheetInfo.sheetType)){
            // 审核时间签名时选择的时间
            sheetInfo.auditorMap[`PageIndex_${this.index}_auditorTime`] =
            moment(auditDate).format("YYYY-MM-DD HH:mm");
          }
          sheetInfo.auditorMap = { ...sheetInfo.auditorMap };
          this.$notify.success({
            title: "提示",
            message: "审核成功",
            duration: 2000,
          });
          this.bus.$emit("saveSheetPage", false);
        });
      }, "审核签名确认","","","","","","",this.sheetInfo.sheetType,SigndataObj,verifySignObj);
    },
    /** 取消审核整页 */
    cancelAduitModal() {
      let verifySignObj = "",SigndataObj=""
      if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
            SigndataObj = {
              Patient_ID:this.patientInfo.patientId,
              Visit_ID:this.patientInfo.visitId,
              Document_Title:this.$parent.patientInfo.recordName,
              Document_ID:sheetInfo.sheetType,
              Section_ID:"trObj.id",
              strSignData: "JSON.stringify(strSignData)",
            };
            verifySignObj = {
              patientId:this.patientInfo.patientId,
              visitId:this.patientInfo.visitId,
              formName:this.$parent.patientInfo.recordName,
              formCode:sheetInfo.sheetType,
              instanceId:this.$parent.patientInfo.id,
              recordId:"strSignData.id",
              signData:"JSON.stringify(strSignData)",
            }
      }
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then((res) => {
          let { empNo, empName } = res.data.data;
          if (this.auditorNo == empNo || this.HOSPITAL_ID === "huadu") {
            sheetInfo.auditorMap[`PageIndex_${this.index}_auditorNo`] = "";
            sheetInfo.auditorMap[`PageIndex_${this.index}_auditorName`] = "";
            sheetInfo.auditorMap[`PageIndex_${this.index}_auditorTime`] = "";
            sheetInfo.auditorMap = { ...sheetInfo.auditorMap };
            this.$notify.success({
              title: "提示",
              message: "取消审核成功",
              duration: 2000,
            });
            this.bus.$emit("saveSheetPage", false);
          } else {
            this.$message.warning("非审核本人不可取消");
          }
        });
      }, "取消签名确认","","","","","","","",SigndataObj,verifySignObj);
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
          cancelSignD(password, username, 2).then((res) => {
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
          signBlockD(password, username, 2).then((res) => {
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
        let type = Object.prototype.toString.call(this.defaultOptionList);
        if (type == "[object Object]") {
          let copyArr = JSON.parse(JSON.stringify(this.defaultOptionList));
          this.defaultOptionList = Object.keys(copyArr);
        } else if (type == "[object Array]") {
          // console.log(this.defaultOptionList);
        }
        this.accessOptionList = this.defaultOptionList.filter((item) => {
          return item.includes(query);
        });
      }
      if (
        !query ||
        this.accessOptionList.length == 0 ||
        this.deptName == query
      ) {
        this.accessOptionList = JSON.parse(
          JSON.stringify(this.defaultOptionList)
        );
      }
      if (this.currentKey) {
        this.accessOptionData[this.currentKey] = [...this.accessOptionList];
      }else{
        this.accessOptionData.armValue = [...this.accessOptionList];
      }
    },
    // 获取出入量下拉、可输入过滤数据（贵州）
    getOptionsData(td, tr, $event) {
      if (!$event) {
        return;
      }
      this.currentKey = td.name;
      let autoCompleteData = [];
      let type = Object.prototype.toString.call(td.autoComplete.data);
      if (td.parentKey && type == "[object Object]") {
        let key = tr.find((item) => {
          return item.name == td.parentKey;
        }).value;
        let data = td.autoComplete.data;
        autoCompleteData = data[key];
      }
      if (
        td.parentKey &&
        type == "[object Array]" &&
        td.autoComplete.data.length > 0
      ) {
        let key = tr.find((item) => {
          return item.key == td.parentKey;
        }).value;
        let data = td.autoComplete.data[0];
        autoCompleteData =
          (data[key] &&
            data[key].map((child) => {
              return child.itemName;
            })) ||
          [];
      }
      this.defaultOptionList = td.parentKey
        ? autoCompleteData
        : td.autoComplete.data;
      this.accessOptionList = JSON.parse(
        JSON.stringify(this.defaultOptionList)
      );
      this.accessOptionData[td.name] = [...this.accessOptionList];
    },
  },
  watch: {
    scrollY() {
      if (!this.hasFiexHeader) return;
      let { top, bottom, left, right } = this.$refs.table.getBoundingClientRect();
      if (
        top < (this.isInPatientDetails ? 90 : 100) &&
        bottom > (this.isInPatientDetails ? 170 : 180)
      ) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
      this.fiexHeaderWidth =
      this.$refs.table && this.$refs.table.offsetWidth + "px";
      // console.log(this.$refs.table.getBoundingClientRect());
    },
    scrollX(val) {
      if (!this.hasFiexHeader) return;
      let { top, bottom, left, right } = this.$refs.table.getBoundingClientRect();
      const tableHead = this.$refs.tableHead
      // 临邑护记横向滚动时表头跟着滚动
      if (['lyxrm', 'foshanrenyi', 'gdtj','whsl', 'stmz'].includes(this.HOSPITAL_ID)) {
        tableHead && (tableHead.style.left = left + 'px')
      }
    }
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  mounted() {
  },
  created() {
    if(this.HOSPITAL_ID == 'wujing' && sheetInfo.sheetType == 'common_hl'){
      let sUserAgent = navigator.userAgent;
      if(sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1 || sUserAgent.indexOf("Windows NT 5.1") > -1){
        this.wujingCommonHl=true
      }
    }
    if (
      this.doubleSignArr.includes(sheetInfo.sheetType) &&
      sheetInfo.selectBlock.relSignInfo == undefined
    ) {
      this.$set(this.sheetInfo.selectBlock, "relSignInfo", {});
    }
  },
  components: {
    signModal,
    bottomRemark,
  },
};
</script>
