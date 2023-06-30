<template>
  <div ref="textArea">
    <sweet-modal
      ref="modal"
      @close="beforeClose"
      :modalWidth="modalOutWidth"
      :title="title"
      :enable-mobile-fullscreen="false"
      :blocking="HOSPITAL_ID == 'liaocheng' ? true : false"
    >
      <div id="specialForm">
        <div flex="cross:center" class="special-date-con">
          <!--佛一的时间 点击特殊记录有时间就不允许修改  要是没有时间，也就是新录入  就允许修改时间  默认为当前时间-->
          <div v-if="['foshanrenyi'].includes(HOSPITAL_ID)" style="display: inherit">
            <div class="date" v-if="tr && tr.length && isShowItem()">
              <label class="label">日期：</label>
              <input type="text" :disabled="recordDate!=''" v-model="staticObj.recordMonth"
                @keyup="dateKey($event, staticObj, 'recordMonth')" />
            </div>
            <div class="time">
              <label class="label">时间：</label>
              <input type="text" :disabled="recordDate!=''" v-model="staticObj.recordHour"
                @keyup="timeKey($event, staticObj, 'recordHour')" />
            </div>
          </div>
          <div v-else style="display:flex;">
            <div class="date" v-if="tr && tr.length && isShowItem()">
            <label class="label">日期：</label>
            <input
              type="text"
              :disabled="
                recordDate != '' &&
                HOSPITAL_ID != 'huadu' &&
                HOSPITAL_ID != 'wujing'&&
                HOSPITAL_ID != 'gdtj' &&
                HOSPITAL_ID != 'nfyksdyy' &&
                HOSPITAL_ID != 'whsl'
              "
              v-model="staticObj.recordMonth"
              @keyup="dateKey($event, staticObj, 'recordMonth')"
            />
          </div>
          <div class="time">
            <label class="label">时间：</label>
            <input
              type="text"
              :disabled="
                recordDate != '' &&
                HOSPITAL_ID != 'huadu' &&
                HOSPITAL_ID != 'wujing'&&
                HOSPITAL_ID != 'gdtj' &&
                HOSPITAL_ID != 'nfyksdyy' &&
                HOSPITAL_ID != 'whsl'
              "
              v-model="staticObj.recordHour"
              @keyup="timeKey($event, staticObj, 'recordHour')"
            />
          </div>
          </div>


          <div
            style="margin-left: 10px"
            v-if="
              (HOSPITAL_ID === 'huadu' &&
                sheetInfo.sheetType !== 'body_temperature_Hd') ||
              HOSPITAL_ID === 'zhongshanqi' ||
              (HOSPITAL_ID === 'beihairenyi' &&
                sheetInfo.sheetType !== 'infant_bh')
            "
          >
            <el-switch v-model="isSyncTemp"></el-switch>
            <span>是否同步</span>
          </div>
          <div class="modal-btn-box" v-if="activeTab === '3' &&['foshanrenyi', '925','zhzxy','whsl','qhwy'].includes(HOSPITAL_ID)">
            <el-button
              type="primary"
              size="mini"
              v-if="!['zhzxy','whsl'].includes(HOSPITAL_ID)"
              @click="emitFn('openEvalModel')"
            >
              评估同步
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openZxdtbModal"
            >
              执行单同步
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openPISlide('testModal')"
            >
              检验报告
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openPISlide('inspectModal')"
            >
              检查报告
            </el-button>
            <el-button
              v-if="['whsl', 'zhzxy'].includes(HOSPITAL_ID)"
              size="mini"
              @click="openModal('diagnosisModalRef')"
              >同步护理计划</el-button
            >
          </div>
          <div class="modal-btn-box" v-if="['nanfangzhongxiyi'].includes(HOSPITAL_ID)">
            <el-button
              type="primary"
              size="mini"
              @click="openZxdtbModal"
            >
              执行单同步
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openPISlide('testModal')"
            >
              检验报告
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openPISlide('inspectModal')"
            >
              检查报告
            </el-button>
          </div>

        </div>
        <div class="extra-box">
          <div class="extra-box__content">
            <el-button
              v-if="showAdviceBtn"
              size="mini"
              type="primary"
              @click="openPISlide('testModal')"
            >
              检验报告
            </el-button>
            <el-button
              v-if="showAdviceBtn"
              type="primary"
              size="mini"
              @click="openPISlide('inspectModal')"
            >
              检查报告
            </el-button>
            <el-button
              v-if="showAdviceBtn"
              size="mini"
              @click="openModal('adviceModalRef')"
              >同步医嘱</el-button
            >
            <el-button
              v-if="showDiagnosisBtn"
              size="mini"
              @click="openModal('diagnosisModalRef')"
              >同步护理计划</el-button
            >
          </div>
        </div>
        <el-tabs v-model="activeTab" class="tab-content" type="card">
          <el-tab-pane label="固定项目" name="1" :disabled="isDisabled">
            <div v-if="HOSPITAL_ID == 'hj'">
              <div class="input-row" flex="main:justify">
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">体温：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.temperature"
                  />
                  <div class="uniq">℃</div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">脉搏：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pulse"
                  />
                  <div class="uniq">次/分</div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">呼吸：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.breath"
                  />
                  <div class="uniq">次/分</div>
                </div>
              </div>
              <div class="input-row" flex="main:justify">
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">血压：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.bloodPressure"
                    @keydown="spaceToKey($event, staticObj, 'bloodPressure')"
                  />
                  <div class="uniq">mmHg</div>
                </div>
                <div
                  class="input-cell"
                  flex="cross:center"
                  flex-box="1"
                  v-if="staticObj.consciousness !== undefined"
                >
                  <div class="label">意识：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.consciousness"
                    v-autoComplete="{
                      dataList: dictionary.consciousness,
                      obj: staticObj,
                      key: 'consciousness',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div
                  class="input-cell"
                  flex="cross:center"
                  flex-box="1"
                  v-if="staticObj.spo2 !== undefined"
                >
                  <div class="label">
                    SOP
                    <sub>2</sub>：
                  </div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.spo2"
                  />
                  <div class="uniq">%</div>
                </div>
                <div
                  flex-box="1"
                  v-if="staticObj.consciousness === undefined"
                ></div>
                <div flex-box="1" v-if="staticObj.spo2 === undefined"></div>
              </div>
              <div
                class="input-row"
                v-if="staticObj.pupilSizeLeft !== undefined"
                flex="main:justify"
              >
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">瞳孔(大小)</div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="2">
                  <div class="label">左：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pupilSizeLeft"
                  />
                  <div class="uniq"></div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="2">
                  <div class="label">右：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pupilSizeRight"
                  />
                  <div class="uniq"></div>
                </div>
                <div flex-box="2"></div>
              </div>
              <div
                class="input-row"
                v-if="staticObj.pupilReflexLeft !== undefined"
                flex="main:justify"
              >
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">瞳孔(反射)</div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="2">
                  <div class="label">左：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pupilReflexLeft"
                    v-autoComplete="{
                      dataList: dictionary.pupilReflexLeft,
                      obj: staticObj,
                      key: 'pupilReflexLeft',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="2">
                  <div class="label">右：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pupilReflexRight"
                    v-autoComplete="{
                      dataList: dictionary.pupilReflexRight,
                      obj: staticObj,
                      key: 'pupilReflexRight',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div flex-box="2"></div>
              </div>
              <div
                class="input-row"
                v-if="staticObj.food !== undefined"
                flex="main:left"
              >
                <div class="input-cell" flex="cross:center">
                  <div class="label">入量名称：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    style="width: 195px"
                    v-model="staticObj.food"
                    v-autoComplete="{
                      dataList: dictionary.food,
                      obj: staticObj,
                      key: 'food',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div
                  class="input-cell"
                  flex="cross:center"
                  style="margin-left: 4px"
                >
                  <div class="label">量：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.foodSize"
                  />
                  <div class="uniq">ml</div>
                </div>
                <div flex-box="1"></div>
              </div>
              <div
                class="input-row"
                v-if="staticObj.discharge !== undefined"
                flex="main:left"
              >
                <div class="input-cell" flex="cross:center">
                  <div class="label">出量名称：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    style="width: 195px"
                    v-model="staticObj.discharge"
                    v-autoComplete="{
                      dataList: dictionary.discharge,
                      obj: staticObj,
                      key: 'discharge',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div
                  class="input-cell"
                  flex="cross:center"
                  style="margin-left: 4px"
                >
                  <div class="label">量：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.dischargeSize"
                  />
                  <div class="uniq">ml</div>
                </div>
                <div flex-box="1"></div>
              </div>
            </div>
            <div
              v-if="
                HOSPITAL_ID == 'liaocheng' &&
                sheetInfo.sheetType != 'critical2_lcey' &&
                sheetInfo.sheetType != 'critical_lcey' &&
                sheetInfo.sheetType != 'critical_new_lcey' &&
                sheetInfo.sheetType != 'access_lcey'
              "
            >
              <div class="input-row" flex="main:justify">
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">体温：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.temperature"
                  />
                  <div class="uniq">℃</div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">脉搏：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pulse"
                  />
                  <div class="uniq">次/分</div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">呼吸：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.breath"
                  />
                  <div class="uniq">次/分</div>
                </div>
              </div>
              <div class="input-row" flex="main:justify">
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">血压：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.bloodPressure"
                    @keydown="spaceToKey($event, staticObj, 'bloodPressure')"
                  />
                  <div class="uniq">mmHg</div>
                </div>
                <div
                  class="input-cell"
                  flex="cross:center"
                  flex-box="1"
                  v-if="staticObj.consciousness !== undefined"
                >
                  <div class="label">意识：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.consciousness"
                    v-autoComplete="{
                      dataList: dictionary.consciousness,
                      obj: staticObj,
                      key: 'consciousness',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div
                  class="input-cell"
                  flex="cross:center"
                  flex-box="1"
                  v-if="staticObj.spo2 !== undefined"
                >
                  <div class="label">
                    SOP
                    <sub>2</sub>：
                  </div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.spo2"
                  />
                  <div class="uniq">%</div>
                </div>
                <div
                  flex-box="1"
                  v-if="staticObj.consciousness === undefined"
                ></div>
                <div flex-box="1" v-if="staticObj.spo2 === undefined"></div>
              </div>
              <div
                class="input-row"
                v-if="staticObj.pupilSizeLeft !== undefined"
                flex="main:justify"
              >
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">瞳孔(大小)</div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="2">
                  <div class="label">左：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pupilSizeLeft"
                  />
                  <div class="uniq"></div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="2">
                  <div class="label">右：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pupilSizeRight"
                  />
                  <div class="uniq"></div>
                </div>
                <div flex-box="2"></div>
              </div>
              <div
                class="input-row"
                v-if="staticObj.pupilReflexLeft !== undefined"
                flex="main:justify"
              >
                <div class="input-cell" flex="cross:center" flex-box="1">
                  <div class="label">瞳孔(反射)</div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="2">
                  <div class="label">左：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pupilReflexLeft"
                    v-autoComplete="{
                      dataList: dictionary.pupilReflexLeft,
                      obj: staticObj,
                      key: 'pupilReflexLeft',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div class="input-cell" flex="cross:center" flex-box="2">
                  <div class="label">右：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.pupilReflexRight"
                    v-autoComplete="{
                      dataList: dictionary.pupilReflexRight,
                      obj: staticObj,
                      key: 'pupilReflexRight',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div flex-box="2"></div>
              </div>
              <div
                class="input-row"
                v-if="staticObj.food !== undefined"
                flex="main:left"
              >
                <div class="input-cell" flex="cross:center">
                  <div class="label">入量名称：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    style="width: 195px"
                    v-model="staticObj.food"
                    v-autoComplete="{
                      dataList: dictionary.food,
                      obj: staticObj,
                      key: 'food',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div
                  class="input-cell"
                  flex="cross:center"
                  style="margin-left: 4px"
                >
                  <div class="label">量：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.foodSize"
                  />
                  <div class="uniq">ml</div>
                </div>
                <div flex-box="1"></div>
              </div>
              <div
                class="input-row"
                v-if="staticObj.discharge !== undefined"
                flex="main:left"
              >
                <div class="input-cell" flex="cross:center">
                  <div class="label">出量名称：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    style="width: 195px"
                    v-model="staticObj.discharge"
                    v-autoComplete="{
                      dataList: dictionary.discharge,
                      obj: staticObj,
                      key: 'discharge',
                    }"
                  />
                  <div class="uniq"></div>
                </div>
                <div
                  class="input-cell"
                  flex="cross:center"
                  style="margin-left: 4px"
                >
                  <div class="label">量：</div>
                  <input
                    type="text"
                    :readonly="isRead"
                    v-model="staticObj.dischargeSize"
                  />
                  <div class="uniq">ml</div>
                </div>
                <div flex-box="1"></div>
              </div>
            </div>
            <div flex="wrap:wrap">
              <div
                v-for="(item, key) in fixedList"
                :key="sheetInfo.sheetType + item.key"
                style="min-width: 33%; margin-bottom: 12px; overflow: hidden"
                :style="[item.isWrap && { 'min-width': '50%' },item.outFixedList && {'display':'none'}]"
              >
                <div class="input-cell" flex="cross:center">
                  <el-checkbox
                    v-model="vitalSignKeys[item.name].check"
                    v-if="
                      (HOSPITAL_ID === 'huadu' &&
                        sheetInfo.sheetType !== 'body_temperature_Hd' &&
                        Object.keys(vitalSignKeys).includes(item.name)) ||
                      (HOSPITAL_ID === 'zhongshanqi' && item.name === '体温') ||
                      (HOSPITAL_ID === 'beihairenyi' &&
                        beihaiList.indexOf(item.name) > -1)
                    "
                  ></el-checkbox>
                  <div class="label" style="min-width: 70px">
                    {{ item.name || key }}：
                  </div>
                  <template v-if="HOSPITAL_ID == 'fuyou'">
                    <div class="fuyouDivInput">
                      <input
                        type="text"
                        :readonly="isRead"
                        v-model="fixedList[key].value"
                        @keydown="
                          spaceToKey($event, fixedList[key], 'bloodPressure')
                        "
                        v-if="key == 'bloodPressure'"
                        @blur="checkValue(fixedList[key])"
                        :style="item.maxWidth && { width: item.maxWidth + 'px' }"
                      />
                      <input
                        type="text"
                        v-else
                        :readonly="isRead"
                        v-model="fixedList[key].value"
                        @blur="checkValue(fixedList[key])"
                        v-autoComplete="{
                          dataList: dictionary[item.key],
                          obj: fixedList,
                          key: key,
                          tr,
                          td: item,
                        }"
                        :style="item.maxWidth && { width: item.maxWidth + 'px' }"
                      />
                      <el-tooltip
                        placement="top"
                        popper-class="custom-temp-dict-select"
                        :visible-arrow="false"
                        :manual="true"
                      >
                        <span class="redWarmIcon" @click="openNewDiagnosis(fixedList[key])" v-if="checkDiagnose(fixedList[key])" :title="`${fixedList[key].name}数值异常`"><i class="el-icon-information" ></i></span>
                        <!-- <div slot="content"></div> -->
                      </el-tooltip>
                    </div>
                  </template>
                  <template v-else>
                    <input
                      type="text"
                      :readonly="isRead"
                      v-model="fixedList[key].value"
                      @keydown="
                        spaceToKey($event, fixedList[key], 'bloodPressure')
                      "
                      v-if="key == 'bloodPressure'"
                      @blur="checkValue(fixedList[key])"
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
                        td: item,
                      }"
                      maxlength="10"
                      style="width: 140px"
                      v-else-if="
                        (sheetInfo.sheetType === 'common_hd'||sheetInfo.sheetType === 'seriousnursing_ytll') &&
                        (key === 'food' || key === 'discharge')
                      "
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
                        td: item,
                      }"
                      maxlength="16"
                      style="width: 220px"
                      v-else-if="
                        sheetInfo.sheetType === 'common_hd' &&
                        key === 'healthEducation'
                      "
                    />
                    <input
                      type="text"
                      :readonly="isRead"
                      v-model="foodVal"
                      v-autoComplete="{
                        dataList: dictionary[item.key],
                        obj: fixedList,
                        key: key,
                        tr,
                        td: item,
                      }"
                      :style="item.maxWidth && { width: item.maxWidth + 'px' }"
                      v-else-if="HOSPITAL_ID == 'beihairenyi' && key == 'food'"
                    />
                    <input
                      type="text"
                      :readonly="isRead"
                      v-model="fixedList[key].value"
                      @blur="checkValue(fixedList[key])"
                      v-autoComplete="{
                        dataList: dictionary[item.key],
                        obj: fixedList,
                        key: key,
                        tr,
                        td: item,
                      }"
                      :style="item.maxWidth && { width: item.maxWidth + 'px' }"
                      v-else
                    />
                  </template>
                  <div class="uniq">{{ item.next }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="自定义项目"
            name="2"
            v-if="customTitle && customTitle.length"
            :disabled="isDisabled"
          >
            <div
              class="custom-cell"
              v-for="(item, index) in customTitle"
              :key="item.key"
            >
              <div class="custom-box" flex="cross:center">
                <div class="label">{{ item.name }}</div>
                <input
                  type="text"
                  v-if="sheetInfo.sheetType === 'common_hd'"
                  @keydown="f1Key($event, staticObj, item.key)"
                  v-model="staticObj[item.key]"
                  :readonly="check[index] || isRead"
                  maxlength="8"
                  v-autoComplete="{
                    dataList: dictionary[item.key],
                    obj: staticObj,
                    key: item.key,
                  }"
                /><input
                  type="text"
                  v-else
                  @keydown="f1Key($event, staticObj, item.key)"
                  v-model="staticObj[item.key]"
                  :readonly="check[index] || isRead"
                  v-autoComplete="{
                    dataList: dictionary[item.key],
                    obj: staticObj,
                    key: item.key,
                  }"
                />
                <div class="button">
                  <el-checkbox
                    v-model="check[index]"
                    :disabled="isRead"
                  ></el-checkbox>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="特殊情况记录" name="3">
            <div class="title" flex="cross:center main:justify">
              <span>病情、药物治疗、护理措施、效果</span>
              <span
                style="color: #284fc2; cursor: pointer"
                @click="openTemplateSlider"
                v-if="sheetInfo.sheetType!='nursing_zhzxy'"
                >+模板</span
              >
              <div v-if="sheetInfo.sheetType=='nursing_zhzxy'">
                <span
                  style="color: #284fc2; cursor: pointer;margin-right: 10px;"
                  @click="openZkModal"
                 v-if="sheetInfo.sheetType=='nursing_zhzxy'">
                 专科模板
                </span>
                <span
                  style="color: #284fc2; cursor: pointer"
                  @click="openTemplateSlider"
                  >+普通模板</span
                >
              </div>
            </div>
            <!-- 陵城特殊情况特殊记录富文本（上下标） -->
            <!-- 武警护理记录单特殊特殊情况富文本（加粗）  -->
            <div
              class="edit_container"
              v-if="
                sheetInfo.selectBlock.openRichText &&
                (['lingcheng','nfyksdyy'].includes(HOSPITAL_ID) ||
                  sheetInfo.sheetType === 'common_wj')
              "
            >
              <quill-editor
                v-model="doc"
                ref="myQuillEditor"
                :options="editorOption"
              ></quill-editor>
            </div>
            <el-input
              v-else
              id="tsqk-textarea"
              type="textarea"
              class="text-con"
              :readonly="isRead"
              @blur="handleInputBlur"
              v-model="doc"
            ></el-input>
          </el-tab-pane>
          <el-tab-pane label="护理措施" name="4" v-if="['critical2_weihai'].includes(sheetInfo.sheetType)">
            <el-checkbox-group v-model="measuresHaicheck">
              <div class="measuresBox">
                <div class="measuresLi" :style="measures.style" :key="index + 'measure'" v-for="(measures,index) in measuresList">
                  <el-checkbox :label="measures.name"></el-checkbox>
                </div>
              </div>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="出量" name="5" v-if="['critical2_weihai'].includes(sheetInfo.sheetType)">
            <div class="title" flex="cross:center main:justify">固定项目：</div>
            <div class="outPro firstoutPro">
              <table v-for="(num,i) in 5" :key="i+'table'">
                <colgroup>
                  <col width="30%"/>
                  <col width="30%"/>
                  <col width="40%"/>
                </colgroup>
                <tr>
                  <td>项目</td>
                  <td>量（ml）</td>
                  <td>颜色</td>
                </tr>
                <tr :key="index + 'out11'" v-for="(out,index) in computedNum(i)">
                  <td>
                    <div>{{ out.discharge }}</div>
                  </td>
                  <td>
                    <div>
                      <el-input v-model="out.dischargeSize"></el-input>
                    </div>
                  </td>
                  <td>
                    <div>
                      <el-select v-model="out.outputColor" placeholder="请选择">
                        <el-option
                          v-for="item in colors"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="title" flex="cross:center main:justify">自定义项目：</div>
            <div class="outPro textareaDiv">
              <table v-for="(num,i) in 3" :key="i+'table'">
                <colgroup>
                  <col width="30%"/>
                  <col width="30%"/>
                  <col width="40%"/>
                </colgroup>
                <tr>
                  <td>项目</td>
                  <td>量（ml）</td>
                  <td>颜色</td>
                </tr>
                <tr :key="index + 'out'" v-for="(out,index) in computedNum(i,'secondTable')">
                  <td>
                    <div>
                      <textarea v-model="out.discharge" :rows="reactiveRows(out,'discharge',4,1,3)"></textarea>
                    </div>
                  </td>
                  <td>
                    <div>
                      <el-input v-model="out.dischargeSize"></el-input>
                    </div>
                  </td>
                  <td>
                    <div>
                      <el-select v-model="out.outputColor" placeholder="请选择">
                        <el-option
                          v-for="item in colors"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="入量" name="6" v-if="['critical2_weihai'].includes(sheetInfo.sheetType)">
            <div class="title" flex="cross:center main:justify">PDA同步数据：</div>
            <div class="outPro foodOne">
              <table v-for="(num,i) in 2" :key="i+'tableru'">
                <colgroup>
                  <col width="50%"/>
                  <col width="25%"/>
                  <col width="25%"/>
                </colgroup>
                <tr>
                  <td>项目</td>
                  <td>量（ml）</td>
                  <td>用法</td>
                </tr>
                <tr :key="index + 'out111' + i" v-for="(out,index) in computedFood(i)">
                  <td>
                    <div>
                      <textarea v-model="out.food" :rows="reactiveRows(out,'food',22,1,3)"></textarea>
                    </div>
                  </td>
                  <td>
                    <div>
                      <el-input v-model="out.foodSize"></el-input>
                    </div>
                  </td>
                  <td>
                    <div>
                      <el-select v-model="out.expand2" placeholder="请选择">
                        <el-option
                          v-for="item in toUseList"
                          :key="item.usage"
                          :label="item.usage"
                          :value="item.usage">
                        </el-option>
                      </el-select>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="title" flex="cross:center main:justify">自定义项目：</div>
            <div class="outPro foodSecond">
              <table v-for="(num,i) in 2" :key="i+'tableru2'">
                <colgroup>
                  <col width="50%"/>
                  <col width="25%"/>
                  <col width="25%"/>
                </colgroup>
                <tr>
                  <td>项目</td>
                  <td>量（ml）</td>
                  <td>用法</td>
                </tr>
                <tr :key="index + 'out' + i" v-for="(out,index) in computedFood(i,'secondTable')">
                  <td>
                    <div>
                      <textarea :key="index + 'out' + i" v-model="out.food" :rows="reactiveRows(out,'food',22,1,3)"></textarea>
                    </div>
                  </td>
                  <td>
                    <div>
                      <el-input v-model="out.foodSize"></el-input>
                    </div>
                  </td>
                  <td>
                    <div>
                      <el-select v-model="out.expand2" placeholder="请选择">
                        <el-option
                          v-for="item in toUseList"
                          :key="item.usage"
                          :label="item.usage"
                          :value="item.usage">
                        </el-option>
                      </el-select>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="symbols-btn" v-if="['foshanrenyi','nfyksdyy'].includes(HOSPITAL_ID) && activeTab == '3'">
          <el-button class="modal-btn" type="primary" @click="openSpecialSymbols">特殊符号</el-button>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button
          class="modal-btn"
          type="primary"
          @click="
            sheetInfo.selectBlock.openRichText &&
            (HOSPITAL_ID == 'lingcheng' ||
              HOSPITAL_ID == 'hengli' ||
              sheetInfo.sheetType === 'common_wj')
              ? postRichText()
              : post()
          "
          v-show="!isRead && (!isRecordBan || showSaveBtn)"
          >保存</el-button
        >
      </div>
    </sweet-modal>
    <templateSlide ref="templateSlide"></templateSlide>
    <templateSlideFSRY ref="templateSlideFsry"></templateSlideFSRY>
    <newDiagnosisModal ref="newDiagnosisModal"></newDiagnosisModal>
    <slideContant ref="slideContant"></slideContant>
    <slideConRight ref="slideConRight"></slideConRight>

    <zkModalZhzxy @addZkmodalDoc="addZkmodalDoc" ref="zkModalZhzxy"></zkModalZhzxy>
    <diagnosis-modal
      v-if="['guizhou', 'lyxrm', 'huadu', 'fuyou','whhk', '925', 'stmz', 'nfyksdyy','foshanrenyi', 'whsl','zhzxy'].includes(HOSPITAL_ID)"
      :modalWidth="diagnosisWid"
      ref="diagnosisModalRef"
      @handleOk="handleDiagnosis"
    />
    <advice-modal
      v-if="['lyxrm', 'whhk', 'stmz', 'nfyksdyy'].includes(HOSPITAL_ID)"
      ref="adviceModalRef"
      @handleOk="handleDiagnosis"
    />
    <zxdtbModal
      ref="zxdtbModal"
    />
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
  .fuyouDivInput{
    position: relative;
    input{
      width: 70px;
      padding-right: 15px;
    }
    .redWarmIcon{
      color: red;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
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

.guizhou {
  .special-date-con input {
    font-size: 14px;
  }

  .input-cell input {
    font-size: 14px;
  }
}

.measuresBox{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  .measuresLi{
    width: 33.333%;
    line-height: 50px;
  }
}

.outPro{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  &.firstoutPro{
      table{
        width:18%;
        &:first-of-type{
        height:260px;
      }
      &:nth-of-type(2){
        height:300px;
      }
      &:nth-of-type(3){
        height:300px;
      }
      &:nth-of-type(4){
        height:350px;
      }
      &:nth-of-type(5){
        height:350px;
      }
    }
  }
  &.foodOne,&.foodSecond{
    table{
      width:48%;
    }
  }
  &.textareaDiv{
    justify-content: flex-start;
    table{
      width:18%;
      &:nth-of-type(n+2){
        margin-left: 35px;
      }
      tr{
        td{
          vertical-align: middle;
        }
      }
    }
  }
  table{
    border-collapse: collapse;

    tr{
      &:first-of-type{
        td{
          background:#bdc9c8;
          text-align:center;
          vertical-align: middle;
          height: 22px;
          &:first-of-type{
            text-align:left;
          }
        }
      }
      td{
        border: 1px solid #000;
        color:#000;
        vertical-align: middle;
        >div{
          text-align:left;
          height:100%;
          line-height: 22px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 5px;
        }
        /deep/ .el-input__inner{
          height: 20px;
          text-align: left;
          border:0 !important;
        }
        textarea{
          width: 100%;
          flex: 1;
          resize: none;
          outline: none;
          border:0;
        }
      }
    }
  }
}
.extra-box {
  position: relative;

  .extra-box__content {
    display: flex;
    position: absolute;
    bottom: -35px;
    right: 0px;
    z-index: 90;
    justify-content: flex-end;
  }
}
.modal-btn-box {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}
.symbols-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
<script>
import bus from "vue-happy-bus";
import moment from "moment";
import { nullRow } from "@/Page/sheet-page/components/render/Body.js";
import sheetModel from "@/Page/sheet-page/sheet.js";
import templateSlide from "./template-slide.vue";
import templateSlideFSRY from "./template-slide-fsry.vue";
import newDiagnosisModal from "@/Page/patientInfo/supPage/diagnosis/modal/newDiagnosisModal.vue";
import slideConRight from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideRightGuizhou.vue";
import slideContant from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideContant.vue"
import { model } from "@/Page/patientInfo/supPage/diagnosis/diagnosisViewModel.js";

import zkModalZhzxy from "./zkModal-zhzxy.vue";
import sheetInfo from "../config/sheetInfo";
import { decoder_title, decoder_record2 } from "./render/decode.js";
import { mergeTr } from "./render/render.js";
import { measuresList,outProject,colors,defaultFood} from "./render/measures.js";
import { dateKey, timeKey } from "../config/keyEvent/date.js";
import { FormToEnter } from "@/plugin/tool/FormToTab.js";
import $ from "jquery";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { saveBatch, getmultiDict,inputItemAll } from "../../api/index";
import DiagnosisModal from "./diagnosis-modal.vue";
import AdviceModal from "./advice-modal.vue";
import { mapMutations, mapState } from 'vuex';
import zxdtbModal from "./zxdtb-modal.vue";

function autoComplete(el, bind) {
  if (bind.value.dataList) {
    let obj = bind.value.obj;
    let key = bind.value.key;
    let tr = bind.value.tr;
    let td = bind.value.td;
    const splice = td && td.splice
    el.onfocus = (e) => {
      let dataList = bind.value.dataList;
      if (el.readOnly) return;
      let scrollTop = document.querySelector(".sheetTable-contain").scrollTop;
      let scrollLeft = document.querySelector(".sheetTable-contain").scrollLeft;
      let xy = e.target.getBoundingClientRect();
      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 34}px`,
            left: `${xy.left}px`,
          },
          data: dataList,
          callback: function (data) {
            if (process.env.HOSPITAL_ID == "weixian") {
              if (td.value && td.value != data && td.childKey) {
                tr.map((item) => {
                  if (item.parentKey && item.parentKey == td.name) {
                    item.value = "";
                  }
                });
              }
            }
            if (data) {
              if (typeof obj[key] == "object") {
                // 多选
                if (splice) {
                  const split = typeof splice === 'string' ? splice : ','
                  const oldValue =  obj[key].value ? obj[key].value.split(split) : []
                  const index = oldValue.findIndex(v => v === data)
                  if (index > -1) {
                    oldValue.splice(index, 1)
                  } else {
                    oldValue.push(data.trim())
                  }
                  obj[key].value = oldValue.join()
                } else { // 单选
                  obj[key].value = data.trim();
                }
              } else {
                // 多选
                if (splice) {
                  const split = typeof splice === 'string' ? splice : ','
                  const oldValue =  obj[key] ? obj[key].split(split) : []
                  const index = oldValue.findIndex(v => v === data)
                  if (index > -1) {
                    oldValue.splice(index, 1)
                  } else {
                    oldValue.push(data.trim())
                  }
                  obj[key] = oldValue.join()
                } else { // 单选
                  obj[key] = data.trim();
                }
              }
            }
          },
          id: key,
          tr: tr,
          td: td,
        });
      });
    };
    // el.onblur = (e) => {
    //   setTimeout(() => {
    //     window.closeAutoComplete(key);
    //   }, 400);
    // };
  } else {
    el.onfocus = null;
  }
}
export default {
  directives: {
    autoComplete: {
      bind: autoComplete,
      update: autoComplete,
    },
  },
  provide() {
    return {
      openSlideCon: item => {
          this.$refs.slideConRight.open(item)
      },
      openSlideContant: async (item)=>{
        this.$refs.slideContant.open(item)
      }
    };
  },
  data() {
    return {
      bus: bus(this),
      foodVal: "",
      measuresList,
      outProject,
      colors,
      doc: "",
      measuresHaicheck:[],
      blurIndex: null,
      recordDate: "",
      record: [],
      model,
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
      zkModalZhzxyShow:false,
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
        false,
      ],
      tr: [],
      // 富文本编辑器配置
      editorOption: {
        placeholder: "请编辑内容",
        modules: {
          toolbar: [
            this.HOSPITAL_ID === "wujing"
              ? ["bold"]
              : [{ script: "sub" }, { script: "super" }], // 武警加粗/陵城上下标（别一起开，逻辑会有问题）
          ],
        },
        theme: "snow",
      },
      isSyncTemp: false,
      vitalSignKeys: {
        体温: { key: "temperature", check: false },
        脉搏: { key: "pulse", check: false },
        心率: { key: "heartRate", check: false },
        呼吸: { key: "breath", check: false },
        血压: { key: "bloodPressure", check: false },
      },
      vitalSignList: {
        list: [],
      },
      multiDictList: [],
      beihaiList: ["体温", "脉搏", "呼吸", "血压", "心率"],
      isSaving: false, //给弹窗保存做节流
      isRecordBan: false, // 佛医记录是否禁用编辑
      outFoodlist:[],
      toUseList:[]
    };
  },
  computed: {
    ...mapState({
      openModalFromSpecial: state => state.sheet.openModalFromSpecial,
      evalData: state => state.sheet.evalData
    }),
    modalOutWidth(){
      if(this.activeTab==="5" || this.activeTab==="6") return 1420
      return 720
    },
    title() {
      const recordDate =
        this.HOSPITAL_ID === "huadu" ? "&nbsp" : this.recordDate;
        const { patientName, age, bedLabel } = sheetInfo && sheetInfo.masterInfo || {}
      if (['foshanrenyi','gdtj'].includes(this.HOSPITAL_ID)) {
        //编辑记录
        if (this.recordDate) {
          if (this.isRead) {
            return "已签名&nbsp;&nbsp;&nbsp;&nbsp;" + ` 记录：${recordDate}    患者：${patientName}    床号：${bedLabel}    年龄：${age} `;
          } else {
            return "编辑护理记录&nbsp;&nbsp;&nbsp;&nbsp;" + ` 记录：${recordDate}    患者：${patientName}   床号：${bedLabel}    年龄：${age} `;
          }
        }else {
          //新建记录
        return "新建护理记录" + `   患者：${patientName}   床号：${bedLabel}    年龄：${age} `;
      }
      } else {
        if (this.recordDate) {
          if (this.isRead) {
            return "已签名&nbsp;&nbsp;&nbsp;&nbsp;" + recordDate;
          } else {
            return "编辑护理记录&nbsp;&nbsp;&nbsp;&nbsp;" + recordDate;
          }
        }else {
        return "新建护理记录";
      }

      }

    },
    // 神经内科
    isNeurology() {
      return this.sheetInfo.sheetType == "neurology";
    },
    isDisabled() {
      if (
        this.HOSPITAL_ID == "huadu" &&
        sheetInfo.sheetType === "body_temperature_Hd"
      ) {
        return false;
      }
      if (
        this.HOSPITAL_ID == "weixian" &&
        (this.tr.find((item) => item.key == "description") || {}).value &&
        (!this.tr.find((item) => item.key == "recordHour") || {}).value &&
        (!this.tr.find((item) => item.key == "recordMonth") || {}).value
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**通用记录单 by贵州 */
    commonFormGZ() {
      return this.sheetInfo.sheetType === "common_gzry";
    },
    showDiagnosisBtn() {
      switch (process.env.HOSPITAL_ID) {
        case "guizhou":
          return this.commonFormGZ && this.activeTab === "3";
        case "lyxrm":
        case "fuyou":
        case "huadu":
        case 'whhk':
        case "stmz":
        case "nfyksdyy":
        case "foshanrenyi":
          return this.activeTab === "3";
        default:
          return false;
      }
    },
    /**同步医嘱 */
    showAdviceBtn() {
      switch (process.env.HOSPITAL_ID) {
        case "lyxrm":
        case 'whhk':
        case "stmz":
        case "nfyksdyy":
          return this.activeTab === "3";
        default:
          return false;
      }
    },
    diagnosisWid() {
      switch (process.env.HOSPITAL_ID) {
        case "lyxrm":
        case "fuyou":
        case "huadu":
        case 'whhk':
        case "stmz":
        case "nfyksdyy":
        case "foshanrenyi":
          return 1200;
        default:
          return 720;
      }
    },
    // 是否显示保存按钮
    showSaveBtn() {
      return this.HOSPITAL_ID !== "foshanrenyi" ? true : this.activeTab == "3";
    },
  },
  methods: {
    ...mapMutations(['upOpenModalFromSpecial', 'upEvalData']),
    // 新医院注意 新增时需要在对应弹窗匹配
    // 检验 src/Page/sheet-page/components/sheet-tool/modal/test-modal.vue
    openPISlide(type) {
      // 三个参数 type打开哪个类型,close是否关闭弹窗,feature是否有回填护记特殊情况功能
      this.bus.$emit("openclosePatientInfo", type, false, true);
    },
    reactiveRows(row,key, maxLength, minRows, maxRows) {
      console.log(row[key],'row[key]')
      if (row[key]) {
        let number = row[key].replace(/[^0-9]/ig,"");
        let word = row[key].replace(/[^a-z]+/ig,"");
        let char = row[key].split('').filter(i => i == ',').join('')
        let curLength = (row[key].length - number.length - word.length - char.length) + ((number.length + word.length + char.length) / 2)
        if(Math.ceil(curLength / maxLength) > minRows) {
          if(maxRows) {
            return (Math.ceil(curLength / maxLength) >= maxRows ? maxRows : Math.ceil(curLength / maxLength))
          } else {
            return Math.ceil(curLength / maxLength)
          }
        } else {
          return minRows
        }
      } else {
        return minRows
      }
    },
    computedNum(i,table){
      if(table=='secondTable'){
        if(i==0) return this.outProject.slice(39,40)
        else if(i==1) return this.outProject.slice(40,41)
        else if(i==2) return this.outProject.slice(41,42)
      }else{
        if(i==0) return this.outProject.slice(0,7)
        else if(i==1) return this.outProject.slice(7,15)
        else if(i==2) return this.outProject.slice(15,23)
        else if(i==3) return this.outProject.slice(23,30)
        else return this.outProject.slice(30,39)
      }
    },
    computedFood(i,table){
      if(table=='secondTable'){
        if(i==0) return this.outFoodlist.slice(10,15)
        else if(i==1) return this.outFoodlist.slice(15,20)
      }else{
        if(i==0) return this.outFoodlist.slice(0,5)
        else if(i==1) return this.outFoodlist.slice(5,10)
      }
    },
    /* 是否同步体征信息 */
    syncTempChange() {
      if (this.isSyncTemp) {
        /* 处理勾选后的数据 */
        this.selectVitalSign();
      }
      if (this.vitalSignList.list.length === 0) {
        /* 未勾选 */
        this.isSyncTemp = false;
        this.$message({
          type: "info",
          message: `未选择体征选项，请选择后再同步。`,
        });
      }
      if (
        !this.staticObj.recordDate &&
        (!this.staticObj.recordMonth || !this.staticObj.recordHour)
      ) {
        this.isSyncTemp = false;
        this.$message({
          type: "info",
          message: `时间未保存，请保存后再同步。`,
        });
      }
      if (this.isSyncTemp && this.vitalSignList.list.length > 0) {
        this.isSyncTemp = true;
        saveBatch(this.vitalSignList)
          .then((res) => {
            this.$message({
              type: "success",
              message: "同步成功",
            });
            /* 同步成功后进行保存 */
            this.bus.$emit("saveSheetPage", this.isLast);
          })
          .catch((err) => {
            this.isSyncTemp = false;
            let errobj = this.vitalSignList.list.find((item) => {
              return item.vitalSignsValue === "";
            });
            this.$message({
              type: "info",
              message: `${errobj.vitalSigns}未填写信息，请补充后再同步。`,
            });
          });
      }
    },
    openNewDiagnosis(diagnose) {
      this.$refs.newDiagnosisModal.open();
      let endStr = ""
      if(diagnose.name==='体温' || diagnose.name==='T'){
        const {value} = diagnose
        endStr = Number(value)<35?'过低':Number(value)>37.5?'过高':""
      }
      this.$refs.newDiagnosisModal.searchWord=`${diagnose.name}`+endStr;
    },
    checkDiagnose(diagnose){
      const { name, value } = diagnose
      if (!["体温","T",'脉搏','P','呼吸','R','心率','HR','血压','BP'].includes(name)) {
        return
      } else {
        if(value){
          let setCheckValue = (name, value) => {
          switch (name) {
            case "体温":
            case "T":
              return Number(value) < 35 || Number(value) > 37.5
            case 'P':
            case "脉搏":
            case "HR":
            case "心率":
              return value < 60 || value > 100
            case "呼吸":
            case "R":
            return value < 16 || value > 20
            case "血压":
            case "BP":
            const Contract = value.includes('/')?value.split('/').slice(0,2)[0]:value
            const Diastolic = value.includes('/')?value.split('/').slice(0,2)[1]:""
              return (Contract < 90 || Contract > 139)||Diastolic&&(Diastolic<60||Diastolic>89)
            default:
              break;
          }
        }
        return setCheckValue(name, value)
        }
      }
    },
    /* 处理勾选了的体征信息 */
    selectVitalSign() {
      let patientInfo = this.$store.state.sheet.patientInfo;
      let staticObj = this.staticObj;
      let vitalTemp = this.multiDictList.filter((multiObj) =>
        Object.keys(this.vitalSignKeys)
          .filter((item) => this.vitalSignKeys[item].check)
          .includes(multiObj.vitalSign)
      );
      const currentYear = moment().format("YYYY");
      let vitalSignObj = {
        patientId: patientInfo.patientId,
        visitId: patientInfo.visitId,
        timePoint: staticObj.recordDate
          ? staticObj.recordDate + ":00"
          : currentYear +
            "-" +
            staticObj.recordMonth +
            " " +
            staticObj.recordHour +
            ":00",
        vitalSigns: "",
        vitalSignsValue: "",
        classCode: "",
        vitalCode: "",
        units: "",
        wardCode: patientInfo.wardCode,
        bedLabel: patientInfo.bedLabel,
      };
      vitalTemp.map((obj) => {
        let key = this.vitalSignKeys[obj.vitalSign].key;
        this.vitalSignList.list.push({
          ...vitalSignObj,
          vitalSigns: obj.vitalSign,
          vitalSignsValue: this.fixedList[key].value,
          classCode: obj.classCode,
          vitalCode: obj.vitalCode,
          units: obj.unit,
        });
      });
      if (
        this.HOSPITAL_ID === "beihairenyi" &&
        this.vitalSignKeys["体温"].check &&
        this.isSyncTemp
      ) {
        vitalTemp.push({
          classCode: "A",
          optionType: "",
          selectType: "",
          showType: "0",
          timePointType: "",
          unit: "℃",
          unitVitalCode: "",
          vitalCode: "042",
          vitalSign: "腋表",
          vitalSignType: "",
          vitalType: "1",
        });
        this.vitalSignList.list.push({
          ...vitalSignObj,
          vitalSigns: "腋表",
          vitalSignsValue: this.fixedList["temperature"].value,
          classCode: "A",
          vitalCode: "042",
          units: "℃",
        });
      }
    },
    /* 获取字典表，整理某一行的同步信息 */
    getVitalList() {
      let patientInfo = this.$store.state.sheet.patientInfo;
      getmultiDict(patientInfo.wardCode).then((res) => {
        this.multiDictList = res.data.data;
      });
    },
   async checkValue(td){
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
        if ((td.key == 'fieldOne') && td.value !== ''&&(isNaN(td.value) || td.value < 50 || td.value > 250)) {
            console.log(td.key,(td.value >= 50 && td.value <= 250))
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
        if ((td.key == 'fieldTwo') && td.value !== ''&&(isNaN(td.value) || td.value < 0 || td.value > 200)) {
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
    },
    // 珠海中西医新模板添加
    addZkmodalDoc(val){
      const regP = /(<\/?p.*?>)/gi;
      let doc = this.doc.replace(regP, "");
      let valRegP = val.replace(regP, "");
      let index = this.blurIndex;
      this.doc = doc.slice(0, index) + valRegP + doc.slice(index);
      this.$refs.zkModalZhzxy.close();
    },
    open(config) {
      console.log(config,'config')
      setTimeout(() => {
        window.closeAutoCompleteNoId();
      }, 300);
      let record = config.record;
      this.record = record
      /**以前isLast是判断是否是最后一条 时间久了功能好像更改了
       * 现在每次保存都必须传true更新页码 所以改为true
      */
      this.isLast = true
      // 判断是否能编辑
      let tr = record[record.length - 1];
      this.tr = tr || [];
      let isRead;
      let status = tr.find((item) => item.key == "status").value;
      let empNo = tr.find((item) => item.key == "empNo").value;
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
      // 江门上线需求,对部分工号开放特殊情况修改权限,由后端处理主表信息中的readOnly字段
      if (this.HOSPITAL_ID == "fuyou") {
        isRead = this.$store.state.form_masterInfo.masterInfo.readOnly;
      }
      // 佛山人医  完全根据canModify来控制
      if (
        this.HOSPITAL_ID == "foshanrenyi" ||
        this.HOSPITAL_ID == "nanfangzhongxiyi"
      ) {
        // status  三种状态  1签名（普通） 2审核
        if (status >= 1) {
          // 审核   isRead  sheet-page.vue这个文件的的isRead方法决定
          isRead = tr.isRead;
        } else {
          isRead = false;
        }
      }
      if (this.HOSPITAL_ID == "foshanrenyi") {
        // 特殊情况可以保存
        this.isRecordBan = config.canNotSave || false;
      }
      if(this.HOSPITAL_ID == "nfyksdyy") {
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
      // 贵州省医common_gzry，血压弹框分开为收缩压和舒张压
      if (this.sheetInfo.sheetType === 'common_gzry') {
        const bloodPressure = this.fixedList.bloodPressure
        if (bloodPressure.value && bloodPressure.value.includes('/')) {
          const [fieldOne, fieldTwo] = bloodPressure.value.split('/')
          this.fixedList.fieldOne.value = fieldOne
          this.fixedList.fieldTwo.value = fieldTwo
        } else {
          this.fixedList.fieldOne.value = bloodPressure.value
        }
        delete this.fixedList.bloodPressure
      }
      if(['critical2_weihai'].includes(this.sheetInfo.sheetType)){
        this.measuresHaicheck = []
        inputItemAll().then(res=>{
          let {data:{data:dataResult}} = res
          dataResult.unshift({
            id:"",isUsed:"",type:"",usage:""
          })
          this.toUseList = dataResult
        })
        let meavalue = config.record[0].find(item=>item.key==="measures").value
        measuresList.map(item=>{
          if(meavalue.split(",").includes(item.value)){
            this.measuresHaicheck.push(item.name)
          }
        })
        this.outProject.forEach(item=>{
          item.dischargeSize="";
          item.outputColor=""
          item.defaultInput && (item.discharge = "")
        })
        let confighasOuppTR = config.record.filter(item=>{
          return item.find(li=> (['discharge'].includes(li.key) && li.value)
          )
        })
        let confighasOupFood = config.record.filter(item=>{
          return item.find(li=> (['food'].includes(li.key) && li.value)
          )
        })
        let confighasOutFoodARR = confighasOupFood.map(tr=>{
          let food = tr.find(td=>td.key==='food').value
          let foodSize = tr.find(td=>td.key==='foodSize').value
          let expand2 = tr.find(td=>td.key==='expand2').value
          let expand = tr.find(td=>td.key==='expand').value
          return {
            food,
            foodSize,
            expand2,
            expand
          }
        })
        let confighasOutppARR = confighasOuppTR.map(tr=>{
          let discharge = tr.find(td=>td.key==='discharge').value
          let dischargeSize = tr.find(td=>td.key==='dischargeSize').value
          let outputColor = tr.find(td=>td.key==='outputColor').value
          return {
            discharge,
            dischargeSize,
            outputColor
          }
        })
        confighasOutppARR.map(item=>{
          let index =  this.outProject.findIndex(out=>out.discharge === item.discharge)
          index >=0 && this.outProject.splice(index,1,item)
          if(index < 0){
            let inputIndex = this.outProject.findIndex(item=>(!item.discharge))
            inputIndex>0 && (this.outProject[inputIndex] = {...this.outProject[inputIndex],...item})
          }
        })
        this.outFoodlist = []
        let PDAarr = [],inputArr = []
        confighasOutFoodARR.map(item=>{
          if(item.expand) PDAarr.push(item)
          else inputArr.push(item)
        })
        for(let i=0;i<10;i++){
          if(!PDAarr[i]) PDAarr.push({...defaultFood,expand:true})
          if(!inputArr[i]) inputArr.push({...defaultFood})
        }
        this.outFoodlist = [...PDAarr,...inputArr]
      }
      let tab = config.tab;
      // 特殊记录组合
      let doc = "";
      for (let i = 0; i < record.length; i++) {
        doc +=
          (record[i].find((item) => item.key == "description") || {}).value ||
          "";
      }
      let foodStr = "";
      if (
        this.HOSPITAL_ID == "beihairenyi" &&
        this.fixedList.hasOwnProperty("food")
      ) {
        for (let i = 0; i < record.length; i++) {
          foodStr += record[i].find((item) => item.key == "food").value || "";
        }
      }
      this.foodVal = foodStr;
        this.recordDate =
        config.recordDate ||
        record[0].find((item) => item.key == "recordDate").value || ""
      //佛一的修改日期  如果新增记录(也就是无日期时间传到这里)就默认当前时间  并且允许修改，也为后面批量签名做日期准备
      if (['foshanrenyi', 'gdtj', 'zhzxy', 'ytll','925','nfyksdyy','whsl'].includes(this.HOSPITAL_ID)) {
        const firstDate = record[0].find((item) => item.key == "recordDate")
        const itemListTime = config.recordDate || firstDate.value
          record[0].find((item) => item.key == "recordDate").value
        if(!itemListTime){
          const addRowDate = record[0].find((item) => item.key == "recordMonth").addRowDate
          if (!(record[0].find((item) => item.key == "recordMonth").value)) {
            this.staticObj.recordMonth = addRowDate || moment().format('MM-DD');
          if (!(record[0].find((item) => item.key == "recordHour").value)) {
            this.staticObj.recordHour = moment().format('HH:mm');
          }
          if (!(record[0].find((item) => item.key == "recordDate").value)) {
            this.staticObj.recordDate = moment().format('YYYY-MM-DD HH:mm');
          }
        }
        } else {
          if (!(record[0].find((item) => item.key == "recordMonth").value)) {
            this.staticObj.recordMonth = moment(itemListTime).format('MM-DD');
          }
          if (!(record[0].find((item) => item.key == "recordHour").value)) {
            this.staticObj.recordHour = moment(itemListTime).format('HH:mm');
          }

        }


      }

      //肺科特别需求。补记时间另起一行
      if (this.HOSPITAL_ID == "whfk" && doc.split("补记时间").length == 2) {
        // 截取最后补记时间，前面的内容
        let replenishTime = `补记时间${doc.split("补记时间")[1]}`;
        doc = doc.split("补记时间")[0];
        var reg = new RegExp(" ", "g");
        doc = doc.replace(reg, "");
        doc = `${doc}${replenishTime}`;
      } else {
        if (!['internal_xg', 'common_xg'].includes(this.sheetInfo.sheetType)) {
          // 清除空格
          var reg = new RegExp(" ", "g");
          doc = doc.replace(reg, "");
        }
      }
      //  if (true) {
      //    // 清除空格
      //    var reg = new RegExp(" ", "g");
      //    doc = doc.replace(reg, "");
      //  }
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
        false,
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
        let eleList = $('#specialForm input[type="text"]');
        FormToEnter(eleList);
      }, 100);
    },
    close() {
      this.$refs.modal.close();
      //关闭特殊记录模板
      if(this.$refs.templateSlideFsry){
      this.$refs.templateSlideFsry.close();
      }
    },
    // 处理特殊字符转换函数
    htmlEscape(str) {
      let reg = new RegExp(/&#44;/g);
      return String(str)
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&nbsp;/g, " ")
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
      // 加粗
      const strongArray = val.match(/<strong>(.*?)<\/strong>/g);
      if (
        (subArray && subArray.length) ||
        (supArray && supArray.length) ||
        (strongArray && strongArray.length)
      ) {
        var subReg = /(<\/?sub.*?>)/gi;
        var supReg = /(<\/?sup.*?>)/gi;
        // 加粗
        var strongReg = /(<\/?strong.*?>)/gi;
        subArray &&
          subArray.map((item) => {
            const wipeLabel = item.replace(subReg, "");
            const itemArray = wipeLabel.split("");
            let str = "";
            itemArray.map((item) => (str += "<sub>" + item + "</sub>"));
            item = changeRegKeyword(item); //转义reg关键字
            val = val.replace(new RegExp(item, "g"), str);
          });
        supArray &&
          supArray.map((item) => {
            const wipeLabel = item.replace(supReg, "");
            const itemArray = wipeLabel.split("");
            let str = "";
            itemArray.map((item) => (str += "<sup>" + item + "</sup>"));
            item = changeRegKeyword(item); //转义reg关键字
            val = val.replace(new RegExp(item, "g"), str);
          });
        // 加粗
        strongArray &&
          strongArray.map((item) => {
            const wipeLabel = item.replace(strongReg, "");
            const itemArray = wipeLabel.split("");
            let str = "";
            itemArray.map((item) => (str += "<strong>" + item + "</strong>"));
            item = changeRegKeyword(item); //转义reg关键字
            val = val.replace(new RegExp(item, "g"), str);
          });

        /**在利用item生成regExp的时候，需要注意item转regExp需要转义关键字
         *关键字：* . ? + ^ $ | \ / [ ] ( ) { }
         *(由于转换成\*,\.,\?关键字会和关键字'\'冲突，需要优先处理'\')
         **/
        function changeRegKeyword(item) {
          const regChangeArr = [
            "\\\\",
            "\\*",
            "\\.",
            "\\?",
            "\\+",
            "\\^",
            "\\$",
            "\\|",
            "\\/",
            "\\[",
            "\\]",
            "\\(",
            "\\)",
          ];
          for (let i = 0; i < regChangeArr.length; i++) {
            let keyword = regChangeArr[i];
            item = item.replace(
              new RegExp(keyword, "g"),
              `\\${keyword[keyword.length - 1]}`
            );
          }
          return item;
        }
      }
      return val;
    },
    // 保存（富文本）
    postRichText() {
      if (!this.staticObj.recordHour) {
        return this.$message.warning("记录时间不得为空！");
      }
      // okLength保存的时候，一条数据给后端传的字数长度
      let okLength = "";
      if (this.HOSPITAL_ID == "lingcheng" || this.HOSPITAL_ID == "hengli") {
        okLength = 46;
      } else if (this.sheetInfo.sheetType === "common_wj") {
        okLength = 41;
      } else {
        okLength = 23;
      }

      var GetLength = function (str, sheetType) {
        // 过滤上下标签替换
        const subReg = /(<\/?sub.*?>)/gi;
        const supReg = /(<\/?sup.*?>)/gi;
        // 过滤加粗标签替换
        const strongReg = /(<\/?strong.*?>)/gi;
        let wipeSubStr = str.replace(subReg, "");
        let wipeSupStr = wipeSubStr.replace(supReg, "");
        let wipeStrongStr = wipeSupStr.replace(strongReg, "");
        // 计算文本内容真实长度
        var realLength = 0,
          len = wipeStrongStr.length,
          charCode = -1;
        for (var i = 0; i < len; i++) {
          charCode = wipeStrongStr.charCodeAt(i);

          // if (charCode == 94) realLength += 0;
          // else if (charCode >= 0 && charCode <= 128 && charCode != 32)
          //   realLength += 1;
          // else realLength += 2;

          switch (sheetType) {
            //武警记录单不将'^'视作上标，故不做 charCode == 94 的判断
            case "common_wj": {
              console.log("common_wj!");
              if (charCode >= 0 && charCode <= 128 && charCode != 32)
                realLength += 1;
              else realLength += 2;
              break;
            }
            default: {
              if (charCode == 94) realLength += 0;
              else if (charCode >= 0 && charCode <= 128 && charCode != 32)
                realLength += 1;
              else realLength += 2;
              break;
            }
          }
        }
        return realLength;
      };
      // 存放切割数据
      let result = [];
      let text = "";
      // 处理特殊字符 标签
      const doc = this.htmlEscape(this.doc); //特殊字符
      let allDoc = this.setLabelData(doc); //标签
      // 首行缩进效果
      if (
        this.HOSPITAL_ID != "weixian" &&
        this.HOSPITAL_ID != "huadu" &&
        this.sheetInfo.sheetType != "common_wj" &&
        this.sheetInfo.sheetType != "special"
      ) {
        allDoc = "  " + allDoc;
      }
      // 开关 + 判断标签是否开始
      let isSpecialLabel = false;
      let index = 0;
      for (let i = 0; i < allDoc.length; i++) {
        let charCode = allDoc.charCodeAt(i);
        // 陵城是sub和sup标签<sup></sup>    <sub></sub>就是11
        let isContinue = isSpecialLabel && i <= index + 11;
        if (this.sheetInfo.sheetType === "common_wj") {
          // 武警是加粗<strong></strong>就是17。
          isContinue = isSpecialLabel && i <= index + 17;
        }
        // 字符为 ，。；,.：:
        if (
          charCode == "65292" ||
          charCode == "12290" ||
          charCode == "65307" ||
          charCode == "44" ||
          charCode == "46" ||
          charCode == "65306" ||
          charCode == "109" ||
          charCode == "103" ||
          charCode == "58" ||
          isContinue
        ) {
          text += allDoc[i];
        } else {
          if (GetLength(text, this.sheetInfo.sheetType) > okLength) {
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
        this.record[i].find((item) => item.key == "description").value = "";
      }
      for (let i = 0; i < result.length; i++) {
        if (i == 0) {
          // 合并数据
          mergeTr(this.record[0], this.staticObj, this.fixedList);
        }
        if (this.record[i]) {
          this.record[i].find((item) => item.key == "description").value =
            result[i];
        } else {
          let currRow = JSON.parse(JSON.stringify(this.record[0]));
          let nullRowArr = nullRow();

          nullRowArr.find((item) => item.key == "recordSource").value =
            currRow.find((item) => item.key == "recordSource").value;
          nullRowArr.find((item) => item.key == "recordDate").value =
            currRow.find((item) => item.key == "recordDate").value;

          sheetModel[this.lastZ].bodyModel.splice(
            this.lastY + 1,
            0,
            nullRowArr
          );
          this.lastY++;
          sheetModel[this.lastZ].bodyModel[this.lastY].find(
            (item) => item.key == "description"
          ).value = result[i];
        }
      }
      this.bus.$emit("saveSheetPage", this.isLast);
      this.close();
    },
    // 保存（普通文本）
    post(type) {
      if(['critical2_weihai'].includes(this.sheetInfo.sheetType)){
        if(this.outProject.find(item=>item.defaultInput && item.discharge && !item.dischargeSize.trim())) return this.$message.warning("出量自定义项目有已填项目但未填值")
        else if(this.outProject.find(item=>item.defaultInput && !item.discharge && item.dischargeSize.trim())) return this.$message.warning("出量自定义项目有已填但未填项目名")
        else if(this.outProject.find(item=>item.outputColor && !item.dischargeSize.trim())) return this.$message.warning("出量有已选颜色项但仍未填值")
        else if(this.outFoodlist.find(item=>item.food && !item.foodSize.trim())) return this.$message.warning("入量有未填值")
        else if(this.outFoodlist.find(item=>!item.food && item.foodSize.trim())) return this.$message.warning("入量有已填值但未有项目名")
      }

      if (this.isSaving) {
        return;
      }
      if (this.HOSPITAL_ID == "foshanrenyi" || this.HOSPITAL_ID == "zhzxy" || this.HOSPITAL_ID == "fuyou") {
        // 佛山市一，护记弹窗保存有换行\n,所以要全部清理。不然textarea显示有问题
        // 珠海中西医 弹窗保存会复制病例过来会有换行。所以全部清理
        this.doc = this.doc.replace(/\n/gi, "");
      }
      if (type != "asyncVisitedData" && !this.staticObj.recordHour) {
        return this.$message.warning("记录时间不得为空！");
      }
      this.isSaving = true;
      // 计算字节长度
      var GetLength = function (str) {
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
      let foodDoc = this.foodVal,
        foodText = "",
        foodResult = [];
      //北海人医的入量名称做换行
      if (
        this.HOSPITAL_ID == "beihairenyi" &&
        this.fixedList.hasOwnProperty("food")
      ) {
        for (let i = 0; i < foodDoc.length; i++) {
          let charCode = foodDoc.charCodeAt(i);
          // 字符为 ，。；,.：:
          if (GetLength(foodText) >= 7) {
            foodResult.push(foodText);
            foodText = foodDoc[i];
          } else {
            foodText += foodDoc[i];
          }
        }
        if (foodText) {
          foodResult.push(foodText);
        }
      }
      if (
        this.HOSPITAL_ID != "weixian" &&
        this.sheetInfo.sheetType != "special" &&
        this.HOSPITAL_ID != "huadu" &&
        this.HOSPITAL_ID != "nanfangzhongxiyi" &&
        this.HOSPITAL_ID != "wujing" &&
        this.sheetInfo.sheetType != "icu_qz"
      ) {
        allDoc = "    " + this.doc;
      }
      // 补记时间
      let replenishTime = "";
      if (this.HOSPITAL_ID == "whfk") {
        // 因为后端要配置行数不满 不拼接特殊特殊情况记录，需要整个医院做配置。所以武汉肺科单独出来
        let commonText = allDoc;
        if (allDoc.split("补记时间").length == 2) {
          // 非手术科室护理记录单和手术科室护理记录单需要 有‘补记时间’就另起一行
          replenishTime = `补记时间${allDoc.split("补记时间")[1]}`;
          // 截取最后补记时间，前面的内容
          commonText = allDoc.split("补记时间")[0];
        }
        // 循环补记时间前面的内容的长度就可以
        for (let i = 0; i < commonText.length; i++) {
          let charCode = commonText.charCodeAt(i);
          // 字符为 ，。；,.：:
          if (
            charCode == "65292" ||
            charCode == "12290" ||
            charCode == "65307" ||
            charCode == "44" ||
            charCode == "46" ||
            charCode == "65306" ||
            charCode == "109" ||
            charCode == "103" ||
            charCode == "58"
          ) {
            text += commonText[i];
          } else if (
            this.sheetInfo.sheetType === "nonsurgicalcare_fk" ||
            this.sheetInfo.sheetType === "operating_fk"
          ) {
            //  非手术科室护理记录单且包含补记时间
            if (GetLength(text) > 27) {
              result.push(text);
              text = commonText[i];
            } else {
              text += commonText[i];
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
      } else {
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
            charCode == "109" ||
            charCode == "103" ||
            charCode == "58"
          ) {
            text += allDoc[i];
          } else {
            if (
              this.HOSPITAL_ID == "lingcheng" ||
              this.HOSPITAL_ID == "shannan" ||
              this.sheetInfo.sheetType === "icu_qz" ||
              this.sheetInfo.sheetType === "intersurgerycure_qzx" ||
              this.sheetInfo.sheetType === "common_gzry" ||
              this.sheetInfo.sheetType === "baby_yz" ||
              this.sheetInfo.sheetType === "seriousnursing_ytll" ||
              this.sheetInfo.sheetType == "postpartum_fs"
            ) {
              // 特殊情况长度截取，前端控制部分(长度计算：输入的字数*2-2)
              if (GetLength(text) > 46) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (this.sheetInfo.sheetType == "hydrochloricacid_fs") {
              if (GetLength(text) > 47) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (this.HOSPITAL_ID == "hengli" || this.sheetInfo.sheetType == "custody_yz") {
              if (GetLength(text) > 40) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType == "common_xg" ||
              this.sheetInfo.sheetType == "internal_xg" ||
              this.sheetInfo.sheetType == "babyarea_fs"
            ) {
              if (GetLength(text) > 32) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "iabp_fs"
            ) {
              if (GetLength(text) > 57) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "internal_eval_lcey" ||
              this.sheetInfo.sheetType === "internal_eval_linyi"
            ) {
              if (GetLength(text) > 98) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (this.sheetInfo.sheetType === "generalcare_bh") {
              if (GetLength(text) > 130) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (this.sheetInfo.sheetType === "change_shift_jm") {
              if (GetLength(text) > 148) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (this.sheetInfo.sheetType === "prenatalcheck_bh") {
              if (GetLength(text) > 58) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "magnesiumsulf_fs" ||
              this.sheetInfo.sheetType == "prenatal_fs" ||
              this.sheetInfo.sheetType == "magnesiumsulf_fs"
              ) {
              if (GetLength(text) > 62) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "nursingrecords_zxy" ||
              this.sheetInfo.sheetType === "internal_eval_weihai" ||
              this.sheetInfo.sheetType === "babymilk_ytll"
            ) {
              if (GetLength(text) > 54) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (this.sheetInfo.sheetType === "recordicu2_zxy") {
              if (GetLength(text) > 70) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "common_wj" ||
              this.sheetInfo.sheetType === "babyarea_fs" ||
              this.sheetInfo.sheetType === "ipacu_fs"
            ) {
              if (GetLength(text) > 27) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (["baby_lcey","critical_linyi"].includes(this.sheetInfo.sheetType)) {
              if (GetLength(text) > 20) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "areageneral_fs" ||
              this.sheetInfo.sheetType === "pediatric_fs" ||
              this.sheetInfo.sheetType === "pupilgeneral_fs" ||
              this.sheetInfo.sheetType === "labor_bh" ||
              this.sheetInfo.sheetType === "department_bh" ||
              this.sheetInfo.sheetType === "cardiac_lcey" ||
              this.sheetInfo.sheetType === "labor_lcey" ||
              this.sheetInfo.sheetType === "caseamount_wx"||
              this.sheetInfo.sheetType === "chemotherapy_qhwy"
            ) {
              if (GetLength(text) > 36) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "diabetes_bh" ||
              this.sheetInfo.sheetType === "ophthalmology_bh" ||
              this.sheetInfo.sheetType === "observation_bh" ||
              this.sheetInfo.sheetType === "maternal_lcey"||
              this.sheetInfo.sheetType == "obstetrics_qhwy"
            ) {
              if (GetLength(text) > 26) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "revivemonitoring_bh" ||
              this.sheetInfo.sheetType === "emergency_treat_yx" ||
              this.sheetInfo.sheetType === "postpartum_nurse_wj"
            ) {
              if (GetLength(text) > 42) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (
              this.sheetInfo.sheetType === "paediatrician2_xt" ||
              this.sheetInfo.sheetType === "neonatalspecialty2_xt"
            ) {
              if (GetLength(text) > 14) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (["ultrasound_fs","baby_tj","baby_whhk","insulin_whhk","labor_whhk","intravenous_whhk", "neonatal_care_qhwy"].includes(this.sheetInfo.sheetType)) {
              if (GetLength(text) > 30) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (this.sheetInfo.sheetType === "nurse_jew"||this.sheetInfo.sheetType === "danger_nurse_jew"||this.sheetInfo.sheetType === "NICU_fs") {
              if (GetLength(text) > 34) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if (this.sheetInfo.sheetType === "icu_yz" || this.sheetInfo.sheetType === "prenatal_ytll") {
              if (GetLength(text) > 38) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            } else if ( this.sheetInfo.sheetType === "premiumcare_ytll") {
              if (GetLength(text) > 36) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            }else if (this.sheetInfo.sheetType == "nursing_qhwy") {
              if (GetLength(text) > 50) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            }else if (["neonatology_whhk"].includes(this.sheetInfo.sheetType)) {
              if (GetLength(text) > 28) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            }else {
              if (GetLength(text) > 23) {
                result.push(text);
                text = allDoc[i];
              } else {
                text += allDoc[i];
              }
            }
          }
        }
      }
      if (text) {
        result.push(text);
      }
      if (this.HOSPITAL_ID === "whfk" && replenishTime) {
        // 有补记时间最后自己一行推进去
        text = "";
        // result.push(replenishTime);
        for (let i = 0; i < replenishTime.length; i++) {
          if (
            this.sheetInfo.sheetType === "nonsurgicalcare_fk" ||
            this.sheetInfo.sheetType === "operating_fk"
          ) {
            if (GetLength(text) > 27) {
              result.push(text);
              text = replenishTime[i];
            } else {
              text += replenishTime[i];
            }
          } else {
            if (GetLength(text) > 23) {
              result.push(text);
              text = replenishTime[i];
            } else {
              text += replenishTime[i];
            }
          }
        }
        if (text) {
          result.push(text);
        }
      }

      if (type == "asyncVisitedData") {
        return result;
      }

      if (result.length == 0) {
        result.push("");
      }

      for (let i = 0; i < this.record.length; i++) {
        this.record[i].find(
          (item) => item.key == "description" || item.key == "specialRecord"
        ).value = "";
      }
      if (
        this.HOSPITAL_ID == "beihairenyi" &&
        this.fixedList.hasOwnProperty("food")
      ) {
        for (let j = 0; j < this.record.length; j++) {
          this.record[j].find((item) => item.key == "food").value = "";
        }
      }

      if (
        this.HOSPITAL_ID == "beihairenyi" &&
        this.fixedList.hasOwnProperty("food")
      ) {
        for (let i = 0; i < foodResult.length; i++) {
          if (i == 0) {
            //合并数据
            mergeTr(this.record[0], this.staticObj, this.fixedList);
          }
          if (this.record[i]) {
            this.record[i].find((item) => item.key == "food").value =
              foodResult[i];
            process.env.splitSave && (this.record[i].isChange = true);
          } else {
            let currRow = JSON.parse(JSON.stringify(this.record[0]));
            let nullRowArr = nullRow();

            nullRowArr.find((item) => item.key == "recordSource").value =
              currRow.find((item) => item.key == "recordSource").value;
            nullRowArr.find((item) => item.key == "recordDate").value =
              currRow.find((item) => item.key == "recordDate").value;

            sheetModel[this.lastZ].bodyModel.splice(
              this.lastY + 1,
              0,
              nullRowArr
            );
            this.lastY++;
            sheetModel[this.lastZ].bodyModel[this.lastY].find(
              (item) => item.key == "food"
            ).value = foodResult[i];
            process.env.splitSave &&
              (sheetModel[this.lastZ].bodyModel[this.lastY].isChange = true);
          }
        }
      }
      if(['critical2_weihai'].includes(this.sheetInfo.sheetType)){
        let valResult = [],length = "",measuresStr = "",foodResult =[]
        measuresList.map((prev)=>{
          if(prev && this.measuresHaicheck.includes(prev.name)){
            measuresStr += ","+ prev.value
          }
        })
        valResult = this.outProject.filter(item=>item.dischargeSize)
        foodResult = this.outFoodlist.filter(item=>(item.food && item.foodSize))
        length = Math.max(valResult.length,result.length,foodResult.length)
        for (let i = 0; i < length; i++) {
          if (i == 0) {
            this.fixedList.measures.value = measuresStr.slice(1)
            mergeTr(this.record[0], this.staticObj, this.fixedList);
            console.log(this.record,this.staticObj,this.fixedList,'this.record[0]')
          }
          if (this.record[i]) {
            this.record[i].find(
              (item) => item.key == "description" || item.key == "specialRecord"
            ).value = result[i];
            this.record[i].map(item=>{
              if(outProject[0].hasOwnProperty(item.key)) item.value=valResult[i]?valResult[i][item.key]:""
            })
            this.record[i].map(item=>{
              if(defaultFood.hasOwnProperty(item.key)) item.value=foodResult[i]?foodResult[i][item.key]:""
            })
            // return console.log(foodResult,this.record[i])
            process.env.splitSave && (this.record[i].isChange = true);
          } else {
          let currRow = JSON.parse(JSON.stringify(this.record[0]));
          let nullRowArr = nullRow();

          nullRowArr.find((item) => item.key == "recordSource").value =
            currRow.find((item) => item.key == "recordSource").value;
          nullRowArr.find((item) => item.key == "recordDate").value =
            currRow.find((item) => item.key == "recordDate").value;

          sheetModel[this.lastZ].bodyModel.splice(
            this.lastY + 1,
            0,
            nullRowArr
          );
          this.lastY++;
          sheetModel[this.lastZ].bodyModel[this.lastY].find(
            (item) => item.key == "description" || item.key == "specialRecord"
          ).value = result[i];
          if(valResult[i]){
            sheetModel[this.lastZ].bodyModel[this.lastY].map(item=>{
              if(valResult[i].hasOwnProperty(item.key)) item.value=valResult[i][item.key]
            })
          }
          if(foodResult[i]){
            sheetModel[this.lastZ].bodyModel[this.lastY].map(item=>{
              if(foodResult[i].hasOwnProperty(item.key)) item.value=foodResult[i][item.key]
            })
          }
            // return console.log(valResult,this.record[i])
          process.env.splitSave &&
            (sheetModel[this.lastZ].bodyModel[this.lastY].isChange = true);
          }
        }
        for(let i =0;i<(+this.record.length)-length;i++){
          this.record[length+i].map(item=>{
            if(outProject[0].hasOwnProperty(item.key)) item.value=""
            if(defaultFood.hasOwnProperty(item.key)) item.value=""
          })
        }
      }else{
        for (let i = 0; i < result.length; i++) {
        if (i == 0) {
          // 贵州省医-common_gzry，血压弹框分开为收缩压和舒张压
          if (this.sheetInfo.sheetType === 'common_gzry') {
            const fieldOne = this.fixedList.fieldOne
            const fieldTwo = this.fixedList.fieldTwo
            let bloodPressure = ''
            if (fieldOne.value && fieldTwo.value) {
              bloodPressure = fieldOne.value + '/' + fieldTwo.value
            } else {
              bloodPressure = fieldOne.value || fieldTwo.value
            }
            this.fixedList.bloodPressure = {
              ...fieldOne,
              key: 'bloodPressure',
              name: '血压',
              value: bloodPressure
            }
          }
          mergeTr(this.record[0], this.staticObj, this.fixedList);
          }
          if (this.record[i]) {
            this.record[i].find(
              (item) => item.key == "description" || item.key == "specialRecord"
            ).value = result[i];
            process.env.splitSave && (this.record[i].isChange = true);
          } else {
            let currRow = JSON.parse(JSON.stringify(this.record[0]));
            let nullRowArr = nullRow();

            nullRowArr.find((item) => item.key == "recordSource").value =
              currRow.find((item) => item.key == "recordSource").value;
            nullRowArr.find((item) => item.key == "recordDate").value =
              currRow.find((item) => item.key == "recordDate").value;

            sheetModel[this.lastZ].bodyModel.splice(
              this.lastY + 1,
              0,
              nullRowArr
            );
            this.lastY++;
            sheetModel[this.lastZ].bodyModel[this.lastY].find(
              (item) => item.key == "description" || item.key == "specialRecord"
            ).value = result[i];
            process.env.splitSave &&
              (sheetModel[this.lastZ].bodyModel[this.lastY].isChange = true);
          }
        }
      }
      // return console.log(sheetModel,this.record,'sheetModel')
      // 删减特殊情况超页(11页-10页);
      if (result.length < this.record.length) {
        const diff = this.record.length - result.length;
        for (let i = 0; i < diff; i++) {
          process.env.splitSave && (this.record[i + result.length].isChange = true);
        }
      }
      if (
        (this.HOSPITAL_ID === "huadu" &&
          sheetInfo.sheetType !== "body_temperature_Hd") ||
        this.HOSPITAL_ID === "zhongshanqi" ||
        (this.HOSPITAL_ID === "beihairenyi" &&
          this.sheetInfo.sheetType !== "infant_bh")
      ) {
        this.isSyncTemp
          ? this.syncTempChange()
          : this.bus.$emit("saveSheetPage", this.isLast);
      } else {
          this.bus.$emit("saveSheetPage", this.isLast);
      }
      setTimeout(() => {
        this.isSaving = false;
      }, 1000);
      this.close();
    },
    openZkModal(){
      this.$refs.zkModalZhzxy.open(this.doc);
    },
    openTemplateSlider() {
      //打开编辑特殊记录的弹框
      switch(this.HOSPITAL_ID){
        case "foshanrenyi":
        case "nfyksdyy":
      this.$refs.templateSlideFsry.open();
        break;
        default:
        this.$refs.templateSlide.open();
        break;
      }
    },
    beforeClose() {
      if(sheetInfo.sheetType=='nursing_zhzxy') this.$refs.zkModalZhzxy.close();
      this.$refs.templateSlide.close();
      //关闭特殊记录录入框
      this.$refs.templateSlideFsry.close();

    },
    dateKey,
    timeKey,
    spaceToKey(e, obj, key) {
      if (e.keyCode == 32) {
        obj[key] += "/";
        e.preventDefault();
      }
    },
    f1Key(e, obj, key) {
      if (e.keyCode == 192) {
        obj[key] += "√";
        e.preventDefault();
      }
    },
    // 是否显示该选项
    isShowItem() {
      return !this.tr.find((item) => item.key == "recordMonth").hidden;
    },
    //失去焦点
    handleInputBlur(e) {
      this.blurIndex = e.srcElement.selectionStart;
    },
    /**打开弹窗 */
    openModal(key) {
      this.$refs[key] && this.$refs[key].open();
    },
    /**获取选择的同步项 */
    handleDiagnosis({ item, key }) {
      item.forEach((v) => {
        if (this.doc && v[key]) {
          this.doc += "\n";
        }
        if (this.HOSPITAL_ID === 'fuyou')
          this.doc += `${v[key]},${v.diagMeasures}`;
        else
          this.doc += v[key];
      });
    },
    /**
     * emit
     */
    emitFn(todo, value) {
      // if (this.sheetInfo.sheetType != "body_temperature_Hd") {
      //   if (this.$store.state.form_masterInfo.masterInfo.readOnly) {
      //     return this.$message.warning("你无权操作此护记，仅供查阅");
      //   }
      // }
      if (todo == 'openEvalModel') {
        this.upOpenModalFromSpecial(true)
      }
      this.bus.$emit(todo, value);
    },
    openZxdtbModal() {
      this.upOpenModalFromSpecial(true)
      this.$refs.zxdtbModal.open();
    },
    openSpecialSymbols() {
      this.$refs.templateSlideFsry.openSpecialSymbols();
    }
  },
  beforeRouteLeave(){
    this.$refs.slideConRight.show=false
    this.$refs.newDiagnosisModal.show=false
    this.$refs.slideContant.show=false
  },
  mounted() {
    // 打开特殊情况
    if(this.HOSPITAL_ID == "fuyou"){
     this.model.newDiagnosisModal = this.$refs.newDiagnosisModal;
    }
    window.openSpecialModal2 = (config) => {
      console.log('openSpecialModal2',config)
      this.open(config);
      if (this.HOSPITAL_ID == "foshanrenyi") {
        // 打开编辑框时 检查项目:, 检查所见:, 印象:
        // 需要在签名添加\n，让回显的形式达到那边一样
        let str = this.doc;
        let array = ["检查项目:", "检查所见:", "印象:"];
        for (let i = 0; i < array.length; i++) {
          str = str.replace(new RegExp(array[i], "g"), `\n${array[i]}`);
        }
        this.doc = str;
      }
      this.isSyncTemp = false;
      (this.vitalSignKeys = {
        体温: { key: "temperature", check: false },
        脉搏: { key: "pulse", check: false },
        心率: { key: "heartRate", check: false },
        呼吸: { key: "breath", check: false },
        血压: { key: "bloodPressure", check: false },
      }),
        (this.vitalSignList.list = []);
      this.getVitalList();
    };
  },
  created() {
    this.bus.$on("addTemplateAtDoc", (val) => {
      // 模板添加
      const regP = /(<\/?p.*?>)/gi;
      let doc = this.doc.replace(regP, "");
      let valRegP = val.replace(regP, "");
      let index = this.blurIndex;
      this.doc = doc.slice(0, index) + valRegP + doc.slice(index);
    });

    // 同步护理巡视
    this.bus.$on("syncVisitWithDataSheet", (obj) => {
      this.doc = obj.description;
      let asyncVisitedData = {
        recordMonth: obj.recordMonth,
        recordHour: obj.recordHour,
        list: this.post("asyncVisitedData"),
      };
      this.bus.$emit("saveSheetPage", true, asyncVisitedData);
    });
    // 佛山市一检查报告和检验报告同步
    this.bus.$on("syncReportFSSY", (str) => {
      if (this.doc) {
        this.doc += "\n" + str;
      } else {
        this.doc += str;
      }
    });
  },
  watch: {
    check: {
      deep: true,
      handler() {
        for (let i = 0; i < this.customTitle.length; i++) {
          if (this.check[i]) {
            this.staticObj[this.customTitle[i].key] = "√";
          }
        }
      },
    },
    doc(val) {
      if (!val.trim().length) return;
      let reg = new RegExp(
        /<(?:(?!\bstrong\b|\bsub\b|\bsup\b|\bp\b|[<>]).)+>/g
      );
      if (reg.test(val)) {
        this.doc = val.replace(reg, "");
      }
    },
    // 评估同步返回的数据
    evalData(val, old) {
      if (val && old == '') {
        this.doc && (this.doc += "\n");
        this.doc += val;
        this.upEvalData('')
      }
    }
  },
  components: {
    templateSlide,
    quillEditor,
    DiagnosisModal,
    AdviceModal,
    zxdtbModal,
    zkModalZhzxy,
    templateSlideFSRY,
    newDiagnosisModal,
    slideConRight,
    slideContant
  },
};
</script>
