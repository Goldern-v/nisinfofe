<template>
  <div class="cardiac_intervent-info-contain">
    <!-- {{relObj}} -->
    <span>1.患者相关检查指标</span>
    <table style="width: 50%;">
      <colgroup>
        <col width="15%">
        <col width="20%">
        <col width="35%">
        <col width="30%">
      </colgroup>
      <tr>
        <td style="line-height: 30px;">项目</td>
        <td style="line-height: 30px;">FBGmmol/L</td>
        <td style="line-height: 30px;"> PBGmmol/L</td>
        <td style="line-height: 30px;">HbA1C%</td>
      </tr>
      <tr>
        <td style="line-height: 30px;">入院时</td>
        <td style="line-height: 30px;">  </td>
        <td style="line-height: 30px;">  </td>
        <td style="line-height: 30px;"> </td>
      </tr>
    </table>
   <span style="margin-top: 5px"> 2.安装及更换胰岛素泵记录表（由当班责任护士观察并打“√”）</span>
    <table style="margin-top: 5px">
      <colgroup>
        <col width="20%">
        <col width="20%">
        <col width="20%">
        <col width="20%">
        <col width="20%">
      </colgroup>
      <tr>
        <td>日期/时间</td>
        <td>机型编号</td>
        <td>消毒液</td>
        <td>部位</td>
        <td>签名</td>
        </tr>
        <tr>
        <td style="text-align: left;">
          <!-- <input
            type="text"
            class="bottom-line"
            style="text-align: left; width: 90%"
            :data-value="relObj.ryrq"
            v-model="relObj.ryrq"
          /> -->
          <span style="margin-left: 5px">{{ patientInfo.admissionDate | toymd }}</span>
        </td>
        <td> <input
                  type="text"
                  class="bottom-line"
                  style="width: 20px; height: 12px"
                  v-model="relObj.sysA"
                  :data-value="relObj.sysA"
                /></td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.jiujing"
                  v-model="relObj.jiujing"
                  value="1"
                  :ischecked="relObj.jiujing == 1"
                  @click="toNull(relObj, 'jiujing', '1')"
                />
                <span>酒精 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.aerd"
                  v-model="relObj.aerd"
                  value="2"
                  :ischecked="relObj.aerd == 2"
                  @click="toNull(relObj, 'aerd', '2')"
                />
                <span>安尔碘</span>
              </label>
            </span>
          </div>
        </td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zsf"
                  v-model="relObj.zsf"
                  value="1"
                  :ischecked="relObj.zsf == 1"
                  @click="toNull(relObj, 'zsf', '1')"
                />
                <span>左上腹 </span>
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
                <span>左上腹</span>
              </label>
            </span>
          </div>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>右上腹 </span>
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
                <span>右上腹</span>
              </label>
            </span>
          </div>
        </td>
        <td>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;">
          <!-- <input
            type="text"
            class="bottom-line"
            style="text-align: left; width: 90%"
            :data-value="relObj.ryrq"
            v-model="relObj.ryrq"
          /> -->
          <span style="margin-left: 5px">{{ patientInfo.admissionDate | toymd }}</span>
        </td>
        <td> <input
                  type="text"
                  class="bottom-line"
                  style="width: 20px; height: 12px"
                  v-model="relObj.sysA"
                  :data-value="relObj.sysA"
                /></td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>酒精 </span>
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
                <span>安尔碘</span>
              </label>
            </span>
          </div>
        </td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>左上腹 </span>
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
                <span>左上腹</span>
              </label>
            </span>
          </div>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>右上腹 </span>
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
                <span>右上腹</span>
              </label>
            </span>
          </div>
        </td>
        <td>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;">
          <!-- <input
            type="text"
            class="bottom-line"
            style="text-align: left; width: 90%"
            :data-value="relObj.ryrq"
            v-model="relObj.ryrq"
          /> -->
          <span style="margin-left: 5px">{{ patientInfo.admissionDate | toymd }}</span>
        </td>
        <td> <input
                  type="text"
                  class="bottom-line"
                  style="width: 20px; height: 12px"
                  v-model="relObj.sysA"
                  :data-value="relObj.sysA"
                /></td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>酒精 </span>
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
                <span>安尔碘</span>
              </label>
            </span>
          </div>
        </td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>左上腹 </span>
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
                <span>左上腹</span>
              </label>
            </span>
          </div>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>右上腹 </span>
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
                <span>右上腹</span>
              </label>
            </span>
          </div>
        </td>
        <td>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;">
          <!-- <input
            type="text"
            class="bottom-line"
            style="text-align: left; width: 90%"
            :data-value="relObj.ryrq"
            v-model="relObj.ryrq"
          /> -->
          <span style="margin-left: 5px">{{ patientInfo.admissionDate | toymd }}</span>
        </td>
        <td> <input
                  type="text"
                  class="bottom-line"
                  style="width: 20px; height: 12px"
                  v-model="relObj.sysA"
                  :data-value="relObj.sysA"
                /></td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>酒精 </span>
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
                <span>安尔碘</span>
              </label>
            </span>
          </div>
        </td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>左上腹 </span>
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
                <span>左上腹</span>
              </label>
            </span>
          </div>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss"
                  v-model="relObj.zqss"
                  value="1"
                  :ischecked="relObj.zqss == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>右上腹 </span>
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
                <span>右上腹</span>
              </label>
            </span>
          </div>
        </td>
        <td>

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
        line-height: 16px;
        // height: 28px;//需保留否则td内div没有内容

      }
    }
  }
}
</style>
