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
                  :data-value="relObj.zsf1"
                  v-model="relObj.zsf1"
                  value="1"
                  :ischecked="relObj.zsf1 == 1"
                  @click="toNull(relObj, 'zsf', '1')"
                />
                <span>左上腹 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss1"
                  v-model="relObj.zqss1"
                  value="2"
                  :ischecked="relObj.zqss1 == 2"
                  @click="toNull(relObj, 'zqss', '2')"
                />
                <span>左下腹</span>
              </label>
            </span>
          </div>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss2"
                  v-model="relObj.zqss2"
                  value="1"
                  :ischecked="relObj.zqss2 == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>右上腹 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss3"
                  v-model="relObj.zqss3"
                  value="2"
                  :ischecked="relObj.zqss3 == 2"
                  @click="toNull(relObj, 'zqss', '2')"
                />
                <span>右下腹</span>
              </label>
            </span>
          </div>
        </td>
        <td>
          <div class="sign-img-con" @click="sign2">
          <span
            v-if="!isPrint"
            class="head-sign-text"
          >{{relObj.signerName2}}</span>
          <img
            class="head-sign-img"
            v-if="relObj.signerNo2"
            :src="`/crNursing/api/file/signImage/${relObj.signerNo2}?${token}`"
            alt
          >
        </div>
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
                  v-model="relObj.sysA1"
                  :data-value="relObj.sysA1"
                /></td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zq13"
                  v-model="relObj.zq13"
                  value="1"
                  :ischecked="relObj.zq13 == 1"
                  @click="toNull(relObj, 'zq13', '1')"
                />
                <span>酒精 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zq12"
                  v-model="relObj.zq12"
                  value="2"
                  :ischecked="relObj.zq12 == 2"
                  @click="toNull(relObj, 'zq12', '2')"
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
                  :data-value="relObj.zq11"
                  v-model="relObj.zq11"
                  value="1"
                  :ischecked="relObj.zq11 == 1"
                  @click="toNull(relObj, 'zq11', '1')"
                />
                <span>左上腹 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss4"
                  v-model="relObj.zqss4"
                  value="2"
                  :ischecked="relObj.zqss4 == 2"
                  @click="toNull(relObj, 'zqss4', '2')"
                />
                <span>左下腹</span>
              </label>
            </span>
          </div>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss5"
                  v-model="relObj.zqss5"
                  value="1"
                  :ischecked="relObj.zqss5 == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>右上腹 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqss6"
                  v-model="relObj.zqss6"
                  value="2"
                  :ischecked="relObj.zqss6 == 2"
                  @click="toNull(relObj, 'zqss', '2')"
                />
                <span>右下腹</span>
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
                  v-model="relObj.sysA2"
                  :data-value="relObj.sysA2"
                /></td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.mk1"
                  v-model="relObj.mk1"
                  value="1"
                  :ischecked="relObj.mk1 == 1"
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
                  :data-value="relObj.zqs1"
                  v-model="relObj.zqs1"
                  value="1"
                  :ischecked="relObj.zqs1 == 1"
                  @click="toNull(relObj, 'zqss', '1')"
                />
                <span>左上腹 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.z26"
                  v-model="relObj.z26"
                  value="2"
                  :ischecked="relObj.z26 == 2"
                  @click="toNull(relObj, 'zq26', '2')"
                />
                <span>左下腹</span>
              </label>
            </span>
          </div>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zq25"
                  v-model="relObj.zq25"
                  value="1"
                  :ischecked="relObj.zq25 == 1"
                  @click="toNull(relObj, 'zq25', '1')"
                />
                <span>右上腹 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zq24"
                  v-model="relObj.zq24"
                  value="2"
                  :ischecked="relObj.zq24 == 2"
                  @click="toNull(relObj, 'zq24', '2')"
                />
                <span>右下腹</span>
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
                  v-model="relObj.sysA3"
                  :data-value="relObj.sysA3"
                /></td>
        <td>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zq32"
                  v-model="relObj.zq32"
                  value="1"
                  :ischecked="relObj.zq32 == 1"
                  @click="toNull(relObj, 'zq32', '1')"
                />
                <span>酒精 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zq31"
                  v-model="relObj.zq31"
                  value="2"
                  :ischecked="relObj.zq31 == 2"
                  @click="toNull(relObj, 'zq31', '2')"
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
                  :data-value="relObj.zq22"
                  v-model="relObj.zq22"
                  value="1"
                  :ischecked="relObj.zq22 == 1"
                  @click="toNull(relObj, 'zq22', '1')"
                />
                <span>左上腹 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.zqs2"
                  v-model="relObj.zqs2"
                  value="2"
                  :ischecked="relObj.zqs2 == 2"
                  @click="toNull(relObj, 'zqs2', '2')"
                />
                <span>左下腹</span>
              </label>
            </span>
          </div>
          <div flex>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.yous"
                  v-model="relObj.yous"
                  value="1"
                  :ischecked="relObj.yous == 1"
                  @click="toNull(relObj, 'yous', '1')"
                />
                <span>右上腹 </span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  :data-value="relObj.yous1"
                  v-model="relObj.yous1"
                  value="2"
                  :ischecked="relObj.yous1 == 2"
                  @click="toNull(relObj, 'yous1', '2')"
                />
                <span>右下腹</span>
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
  methods: {
    sign() {
      if(this.sheetInfo.selectBlock.relSignInfo == undefined) {
        this.sheetInfo.selectBlock.relSignInfo = {}
      }
      let title = this.sheetInfo.selectBlock.relSignInfo.signerName
        ? "取消签名"
        : "责任护士签名";
      window.openSignModal((password, username) => {
        if (this.sheetInfo.selectBlock.relSignInfo.signerName2) {
          cancelSignD(password, username,2).then(res => {
            this.sheetInfo.selectBlock.signerName = res.data.data.signerName;
            this.sheetInfo.selectBlock.signerNo = res.data.data.signerNo;
            this.sheetInfo.selectBlock.relSignInfo.signerName = res.data.data.relSignInfo.signerName;
            this.sheetInfo.selectBlock.relSignInfo.signerName = res.data.data.relSignInfo.signerNo;
          });
        } else {
          signBlockD(password, username,2).then(res => {
            this.sheetInfo.selectBlock.signerName = res.data.data.signerName;
            this.sheetInfo.selectBlock.signerNo = res.data.data.signerNo;
             this.sheetInfo.selectBlock.relSignInfo.signerName = res.data.data.relSignInfo.signerName;
            this.sheetInfo.selectBlock.relSignInfo.signerNo = res.data.data.relSignInfo.signerN;
          });
        }
      }, title);
    },
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
    sign3() {
      if (this.sheetInfo.selectBlock.relSignInfo == undefined) {
        this.sheetInfo.selectBlock.relSignInfo = {};
      }
      let title = sheetInfo.selectBlock.relSignInfo.signerName3
        ? "取消签名"
        : "责任护士签名";
      window.openSignModal((password, username) => {
        if (sheetInfo.selectBlock.relSignInfo.signerName3) {
          cancelSignD(password, username, 3).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName3",
              res.data.data.relSignInfo.signerName3
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo3",
              res.data.data.relSignInfo.signerNo3
            );
          });
        } else {
          signBlockD(password, username, 3).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName3",
              res.data.data.relSignInfo.signerName3
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo3",
              res.data.data.relSignInfo.signerNo3
            );
          });
        }
      }, title);
      this.bus.$emit("saveSheetPage", true);
    },
    sign4() {
      if (this.sheetInfo.selectBlock.relSignInfo == undefined) {
        this.sheetInfo.selectBlock.relSignInfo = {};
      }
      let title = sheetInfo.selectBlock.relSignInfo.signerName4
        ? "取消签名"
        : "责任护士签名";
      window.openSignModal((password, username) => {
        if (sheetInfo.selectBlock.relSignInfo.signerName4) {
          cancelSignD(password, username, 4).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName4",
              res.data.data.relSignInfo.signerName4
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo4",
              res.data.data.relSignInfo.signerNo4
            );
          });
        } else {
          signBlockD(password, username, 4).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName4",
              res.data.data.relSignInfo.signerName4
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo4",
              res.data.data.relSignInfo.signerNo4
            );
          });
        }
        this.bus.$emit("saveSheetPage", true);
      }, title);
    },

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
  .sign-img-con:before {
        content: "";
        display: inline-block;
        height: 100%;
        ver
        tical-align: middle;
      }
      .head-sign-img {
          transform: translate(-1px, 10px);
          margin-top: -10px;
          display: none;
          height: 28px;
          line-height: 28px;
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
