<template>
  <div>
    <table>
      <colgroup>
        <col width="150" />
        <col
          width="40"
          v-for="(item, index, key) of formData.trends"
          :key="key"
        />
      </colgroup>
      <thead></thead>
      <tbody>
        <tr>
          <td rowspan="5">
            <div style="height: 152px; margin: 0 -5px">
              <svg
                width="100%"
                height="100%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="100%"
                  style="stroke: rgb(99, 99, 99); stroke-width: 1"
                />
              </svg>
            </div>
            <div
              style="height: 100%; margin: -152px -5px 0; position: relative"
            >
              <svg
                width="100%"
                height="100%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="0"
                  style="stroke: rgb(99, 99, 99); stroke-width: 1"
                />
              </svg>
              <div class="title-1">
                病室动态
                <br />（人）
              </div>
              <!-- <div class="title-2">
                护理
                <br />内容
              </div> -->
              <div class="title-3">
                床号
                <br />姓名 <br />诊断 <br />类别标志
                <br />
              </div>
            </div>
          </td>
        </tr>
        <tr v-for="num of formData.trends[0].length" :key="num">
          <td
            v-for="(item, index, key) of formData.trends"
            :key="key"
            class="text-center"
          >
            {{ item[num - 1] }}
          </td>
        </tr>
        <tr v-for="(item, key) of formData.contents" :key="key">
          <td v-for="(option, index) of item" :key="index" :colspan="5">
            {{ key }}:{{ option }}
          </td>
        </tr>
        <tr v-for="(item, key) in formList" :key="key">
          <td class="text-center">{{ key }}</td>
          <td :colspan="formData.trends.length">
            <!-- {{item.list}} -->
            <div v-if="item.format == 'inline'">
              <span v-for="(patItem, index) in item.list" :key="index">
                <span v-if="index !== 0">、</span>
                <span>{{ patItem.bedLabel }}床 {{ patItem.name }} {{`（${patItem.deptName}）`}}</span>
              </span>
            </div>
            <div class="edit-area" v-else-if="item.format == 'inline-block'">
              <div
                v-for="(patItem, index) in item.list"
                :key="index"
                :style="index === 0 && { borderTop: '0' }"
                class="inline-block-con"
                @click="openSetInfoModal(patItem, key)"
              >
                <span>
                  {{
                    `${patItem.bedLabel}床 ${patItem.name} （${patItem.deptName}） ${
                      patItem.remark1 || ""
                    } ${patItem.diagnosis || ""}`
                  }}
                </span>
              </div>
            </div>
            <div class="edit-area" v-else-if="item.format == 'block'">
              <div
                v-for="(patItem, index) in item.list"
                :key="index"
                :style="index === 0 && { borderTop: '0' }"
                class="block-con"
                @click="openSetInfoModal(patItem, key)"
              >
                <span>
                  {{
                    `${patItem.bedLabel}床 ${patItem.name} （${patItem.deptName}） ${
                      patItem.diagnosis || ""
                    }`
                  }}
                </span>
                <div v-if="key == '病危' && patItem.remark1">
                  <span style="padding-left: 30px"></span>
                  {{ `${patItem.remark1 || ""}` }}
                </div>
                <div v-if="key == '病重' && patItem.remark1">
                  <span style="padding-left: 30px"></span>
                  {{ `${patItem.remark1 || ""}` }}
                </div>
                <div v-if="key == '手术' && patItem.remark2">
                  <span style="padding-left: 30px"></span>
                  {{ `${patItem.remark2 || ""}` }}
                </div>
                <!-- <div v-if="key == '预手术' && patItem.remark3">
                  <span style="padding-left: 30px"></span>
                  {{`${patItem.remark3 || ""}`}}
                </div> -->
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-center">特殊记录</td>
          <td :colspan="15" @click="openSpecialTextModal">
            <pre class="pre edit-area" v-html="specialTxt"></pre>
          </td>
        </tr>
      </tbody>
    </table>
    <setInfoModal ref="setInfoModal"></setInfoModal>
    <specialTextModal ref="specialTextModal"></specialTextModal>
  </div>
</template>

<script>
function initFormData(data = {}) {
  return {
    trends: [
      ["班别", "A班", "P班", "N班"],
      ["原有", data.aOrigin, data.pOrigin, data.nOrigin],
      ["出院", data.aDischarge, data.pDischarge, data.nDischarge],
      ["转出", data.aTransOut, data.pTransOut, data.nTransOut],
      ["死亡", data.aDead, data.pDead, data.nDead],
      ["入院", data.aAdmission, data.pAdmission, data.nAdmission],
      ["转入", data.aTransIn, data.pTransIn, data.nTransIn],
      ["手术", data.aOperation, data.pOperation, data.nOperation],
      ["分娩", data.aBorn, data.pBorn, data.nBorn],
      // ["预手术", data.aPreOperation, data.pPreOperation, data.nPreOperation],
      ["病危", data.aDanger, data.pDanger, data.nDanger],
      ["病重", data.aSerious, data.pSerious, data.nSerious],
      ["特护", data.aSpecial, data.pSpecial, data.nSpecial],
      ["一级", data.aFirst, data.pFirst, data.nFirst],
      ["现有", data.aNow, data.pNow, data.nNow],
    ],
    // contents: {
    //   自动外出: [data.aSelfOut, data.pSelfOut, data.nSelfOut],
    //   未完成输液者: [data.aUnfinished, data.pUnfinished, data.nUnfinished],
    //   动静脉置管护理: [data.aVein, data.pVein, data.nVein],
    //   留置引流管护理: [data.aUrine, data.pUrine, data.nUrine],
    //   鼻饲护理: [data.aNose, data.pNose, data.nNose],
    //   吸氧护理: [data.aOxygen, data.pOxygen, data.nOxygen],
    //   其他: [data.aOther, data.pOther, data.nOther],
    // },
    typeList: {
      病危: data.typeDanger || "",
      病重: data.typeSerious || "",
      出院: data.typeDischarge || "",
      转出: data.typeTransOut || "",
      死亡: data.typeDead || "",
      入院: data.typeAdmission || "",
      转入: data.typeTransIn || "",
      手术: data.typeOperation || "",
      // 预手术: data.typePreOperation || ""
    },
  };
}

function initFormList(list) {
  // let _list = list.sort((a, b) => a.bedLabel - b.bedLabel);
  let formList = {
    出院: {
      list: [],
      format: "inline",
    },
    转出: {
      list: [],
      format: "inline-block",
    },
    死亡: {
      list: [],
      format: "inline",
    },
    入院: {
      list: [],
      format: "inline-block",
    },
    转入: {
      list: [],
      format: "inline-block",
    },
    手术: {
      list: [],
      format: "block",
    },
    分娩: {
      list: [],
      format: "inline-block",
    },
    // 预手术: {
    //   list: [],
    //   format: "block"
    // },
    病危: {
      list: [],
      format: "block",
    },
    病重: {
      list: [],
      format: "block",
    },
  };
  for (let item of list) {
    formList[item.status] && formList[item.status].list.push(item);
  }
  return formList;
}

import setInfoModal from "../modal/set-info-modal";
import specialTextModal from "../modal/special-text-modal";
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    let data = this.data;
    return {
      formData: initFormData(data.changeShiftTimes),
      formList: initFormList(data.changeShiftPatientLists),
    };
  },
  computed: {
    specialTxt() {
      let str =
        '<div class="patient-detail">' +
        this.data.changeShiftTimes.specialRecords.replace(
          /\n\n/g,
          '</div><br/><div class="patient-detail">'
        ) +
        "</div>";
      return str.replace(/\n/g, "<br/>");
    },
  },
  methods: {
    /** 解析病人信息添加数据 */
    openSetInfoModal(item, key) {
      let data = {
        status: item.status,
        pat: `${item.bedLabel}床 ${item.name} ${item.sex} ${item.age}`,
        diagnosis: item.diagnosis,
      };
      if (key === "病危") {
        data.remark = item.remark1;
      } else if (key === "病重") {
        data.remark = item.remark1;
      } else if (key === "入院" || key === "转入") {
        data.remark = item.remark1;
      } else if (key === "手术") {
        data.remark = item.remark2;
      } else if (key === "预手术") {
        data.remark = item.remark3;
      }
      this.$refs.setInfoModal.open(data, (obj) => {
        if (key === "病危") {
          obj.remark1 = obj.remark;
        } else if (key === "病重") {
          obj.remark1 = obj.remark;
        } else if (key === "入院" || key === "转入") {
          obj.remark1 = obj.remark;
        } else if (key === "手术") {
          obj.remark2 = obj.remark;
        } else if (key === "预手术") {
          obj.remark3 = obj.remark;
        }
        Object.assign(item, obj);
        this.$emit("save");
      });
    },
    openSpecialTextModal() {
      let data = {
        specialRecords: this.data.changeShiftTimes.specialRecords,
      };
      this.$refs.specialTextModal.open(data, (obj) => {
        this.data.changeShiftTimes.specialRecords = obj.specialRecords;
        this.$emit("save");
      });
    },
  },
  filters: {},
  components: {
    setInfoModal,
    specialTextModal,
  },
};
</script>

<style lang='stylus' scoped>
table {
  border-collapse: collapse;
  width: 100%;

  th, td {
    height: 38px;
    border: 1px solid #444444;
    font-size: 14px;
    vertical-align: middle;
    line-height: 14px;
    box-sizing: border-box;
    color: #000;
    padding: 0 5px;

    &.text-center {
      text-align: center;
    }
  }
}

.title-1 {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 14px;
  color: #000;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  letter-spacing: 2px;
  width: 70px;
}

.title-2 {
  position: absolute;
  right: 20px;
  top: 180px;
  font-size: 14px;
  color: #000;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  letter-spacing: 2px;
  width: 40px;
}

.title-3 {
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 14px;
  color: #000;
  font-weight: bold;
  text-align: left;
  line-height: 20px;
  letter-spacing: 2px;
}

.inline-block-con {
  border-top: 1px solid #000;
  margin: 0 -5px;
  min-height: 24px;
  line-height: 24px;
  padding: 5px 5px;
}

.block-con {
  border-top: 1px solid #000;
  margin: 0 -5px;
  // min-height: 30px;
  line-height: 22px;
  padding: 5px 5px;
}

.edit-area {
  .block-con, .inline-block-con {
    &:first-of-type {
      border-top: none;
    }
  }
}

.pre {
  border: 0;
  outline: 0;
  color: #000;
  font-size: 14px;
  padding: 0;
  line-height: 22px;
  white-space: pre-wrap;
}
</style>
