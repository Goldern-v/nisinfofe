<template>
  <div class="cardiac_intervent-info-contain">
    <!-- {{relObj}} -->
    <table>
      <colgroup>
        <col width="15%">
        <col width="20%">
        <col width="35%">
        <col width="30%">
      </colgroup>
      <tr>
        <td>入院日期：</td>
        <td colspan="2">
          <input
            type="text"
            class="bottom-line"
            style="text-align: left; width: 90%"
            :data-value="relObj.ryrq"
            v-model="relObj.ryrq"
          />
        </td>
        <td>
          <div flex>
            <span flex="cross:center">
              <span>入院方式：</span>
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>门诊</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="2"
                  :ischecked="relObj.zqss == 2"
                  @click="toNull(relObj, 'zqss', '2')"
                />
                <span>急诊</span>
              </label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <div>
            <span>诊断：</span>
            <input
              type="text"
              class="bottom-line"
              style="width: 500px; text-align: left"
              :data-value="relObj.zd"
              v-model="relObj.zd"
            />
          </div>
        </td>
        <td>
          <div flex>
            <span flex="cross:center">
              <span>婚姻状况：</span>
              <label>
                <input
                  type="radio"
                  :data-value="relObj.hyzk"
                  v-model="relObj.hyzk"
                  value="1"
                  :ischecked="relObj.hyzk == 1"
                  @click="toNull(relObj, 'hyzk', '1')"
                />
                <span>未婚</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.hyzk"
                  v-model="relObj.hyzk"
                  value="2"
                  :ischecked="relObj.hyzk == 2"
                  @click="toNull(relObj, 'hyzk', '2')"
                />
                <span>已婚</span>
              </label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <div flex>
            <span>生命体征：</span>
            <span flex="cross:center">
              <span>
                <span style="position: relative;top:1px">T</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 50px; height: 12px"
                  v-model="relObj.T"
                  :data-value="relObj.T"
                />
                <span>℃ &nbsp;</span>
              </span>
            </span>
            <span flex="cross:center">
              <span>
                <span style="position: relative;top:1px">P</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 50px; height: 12px"
                  v-model="relObj.P"
                  :data-value="relObj.P"
                />
                <span>次/分 &nbsp;</span>
              </span>
            </span>
            <span flex="cross:center">
              <span>
                <span style="position: relative;top:1px">R</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 50px; height: 12px"
                  v-model="relObj.R"
                  :data-value="relObj.R"
                />
                <span>次/分 &nbsp;</span>
              </span>
            </span>
            <span flex="cross:center">
              <span>
                <span style="position: relative;top:1px">BP</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 60px; height: 12px"
                  v-model="relObj.BP"
                  :data-value="relObj.BP"
                />
                <span>mmHg </span>
              </span>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div flex>
            <span>生育史：</span>
            <span flex="cross:center">
              <span>
                <span style="position: relative;top:1px">G</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 20px; height: 12px"
                  v-model="relObj.sysG"
                  :data-value="relObj.sysG"
                />
                <span> &nbsp;</span>
              </span>
            </span>
            <span flex="cross:center">
              <span>
                <span style="position: relative;top:1px">P</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 20px; height: 12px"
                  v-model="relObj.sysP"
                  :data-value="relObj.sysP"
                />
                <span> &nbsp;</span>
              </span>
            </span>
            <span flex="cross:center">
              <span>
                <span style="position: relative;top:1px">A</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 20px; height: 12px"
                  v-model="relObj.sysA"
                  :data-value="relObj.sysA"
                />
                <span>&nbsp;</span>
              </span>
            </span>
            <span flex="cross:center">
              <span>
                <span style="position: relative;top:1px">L</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width:20px; height: 12px"
                  v-model="relObj.sysL"
                  :data-value="relObj.sysL"
                />
              </span>
            </span>
          </div>
        </td>
        <td>
          <div>
            <span>过敏史：</span>
            <input
              type="text"
              class="bottom-line"
              style="width: 75%; text-align: left"
              :data-value="relObj.gms"
              v-model="relObj.gms"
            />
          </div>
        </td>
        <td>
          <div>
            <span>既往史：</span>
            <input
              type="text"
              class="bottom-line"
              style="width: 74%; text-align: left"
              :data-value="relObj.jws"
              v-model="relObj.jws"
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import sheetInfo from "../../../config/sheetInfo";
import moment from "moment";
export default {
  props: {
    patientInfo: Object,
  },
  data() {
    let a = Object.assign(
      {
        ryrq: "",
        zqss: "",
        hyzk: '',
        jzss: "",
        mzfs: "",
        jws: '',
        gms: '',
        sysL: '',
        sysA: '',
        sysP: '',
        sysG: '',
        T: '',
        P: '',
        R: '',
        BP: '',
      },
      sheetInfo.relObj
    );
    Object.assign(sheetInfo.relObj, a);

    return {
      // relObj: sheetInfo.relObj
    };
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    },
  },
  // computed: {
  //   patientInfo() {
  //     // return this.sheet.patientInfo
  //     return this.sheetInfo.masterInfo || {};
  //   },
  // },
  // mounted() {
  //   this.relObj.ryrq
  //   this.$set(this.relObj, 'ryrq', this.relObj.ryrq | toymd || this.patientInfo.admissionDate | toymd)
  // },
  mounted() {
    if (!this.relObj.ryrq) {
      this.relObj.ryrq = moment(this.patientInfo.admissionDate).format("YYYY-MM-DD HH:mm");
      sheetInfo.relObj = { ...sheetInfo.relObj };
    }
    if (!this.relObj.zd) {
      this.relObj.zd = this.patientInfo.diagnosis
      sheetInfo.relObj = { ...sheetInfo.relObj };
    }
  },
  methods: {
    onMaskClick(item) {
      console.log(this.patientInfo, 10000000);
      if (!item.zgsj) {
        item.zgsj = moment().format("YYYY年MM月DD日HH时");
      }
    },
    toNull(obj, key, value) {
      if (obj[key] === value) {
        obj[key] = "";
      }
    }
  },
  computed: {
    relObj() {
      return sheetInfo.relObj;
    }
  },
  components: {}
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.cardiac_intervent-info-contain {
  font-size: 13px;

  .bottom-line {
    border: 0;
    border-bottom: 1px solid #000000;
    width: 30px;
    outline: none;
    text-align: center;
  }

  input[type='radio'] {
    -webkit-appearance: none;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    border: 1px solid #777;
    border-radius: 2px;
    margin-right: -3px;
  }

  input[type='radio']:checked {
    font-size: 10;
    position: relative;
  }

  input[type='radio']:checked:before {
    content: '';
    width: 8px;
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    left: -2px;
    border-top: 3px solid #000;
  }

  input[type='radio']:checked:after {
    content: '';
    width: 14px;
    transform: rotate(-50deg) translateY(-50%) translateX(50%);
    position: absolute;
    border-top: 3px solid #000;
    top: 10px;
    left: -2px;
  }

  label {
    cursor: pointer;

    input, span {
      vertical-align: middle !important;
    }

    input {
      position: relative;
      top: -1px;
      margin-right: 0;
    }
  }

  .row {
    display: flex;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    table-layout:fixed;

    tr {
      td {
        border: 1px solid #000;
        margin: 0;
        padding: 1px;
        line-height: 28px;
        // height: 28px;//需保留否则td内div没有内容

      }
    }
  }
}
</style>
