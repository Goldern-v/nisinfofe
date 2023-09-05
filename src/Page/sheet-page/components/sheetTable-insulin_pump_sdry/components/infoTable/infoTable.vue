<template>
  <div class="cardiac_intervent-info-contain">
    <!-- {{relObj}} -->
    <span>1.患者相关检查指标</span>
    <table style="margin-bottom: 5px;">
      <colgroup>
        <col width="19%" />
        <col width="27%" />
        <col width="27%" />
        <col width="27%" />
      </colgroup>
      <tr>
        <td>项目</td>
        <td>FBGmmol/L</td>
        <td>PBGmmol/L</td>
        <td>HbA1C%</td>
      </tr>
      <tr>
        <td>入院时</td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.FBG"
            :data-value="relObj.FBG"
          />
        </td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.PBG"
            :data-value="relObj.PBG"
          />
        </td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.HbA"
            :data-value="relObj.HbA"
          />
        </td>
      </tr>
    </table>

    <span> 2.安装及更换胰岛素泵记录表（由当班责任护士观察并打“√”）</span>
    <table style="margin-top: 5px">
      <colgroup>
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
      </colgroup>
      <tr>
        <td>日期/时间</td>
        <td>机型编号</td>
        <td>消毒液</td>
        <td>部位</td>
        <td>签名</td>
      </tr>
      <tr>
        <td>
          <span style="margin-left: 5px">
            <cr-date-picker
              :data-value="relObj.placentaTime"
              v-model="relObj.placentaTime"
              :width="140"
              style="border:none;height:22px"
            />
          </span>
        </td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.sysA"
            :data-value="relObj.sysA"
          />
        </td>
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
          <div class="sign-img-con">
            <div
              class="sign-null-box"
              @click="sign2('signerNo2', 'signerName2')"
              v-if="!relObj.signerNo2"
            ></div>
            <div
              class="sign-in-box"
              v-else
              @click="sign2('signerNo2', 'signerName2', true)"
            >
              <div class="audit-img sign-img">
                <img
                  class="in-print"
                  :src="
                    `/crNursing/api/file/signImage/${relObj.signerNo2}?${token}`
                  "
                  alt
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <cr-date-picker
            :data-value="relObj.placentaTime1"
            v-model="relObj.placentaTime1"
            :width="140"
            style="border:none;height:22px"
          />
        </td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.sysA1"
            :data-value="relObj.sysA1"
          />
        </td>
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
           <div class="sign-img-con">
            <div
              class="sign-null-box"
              @click="sign2('signerNo3', 'signerName3')"
              v-if="!relObj.signerNo3"
            ></div>
            <div
              class="sign-in-box"
              v-else
              @click="sign2('signerNo3', 'signerName3', true)"
            >
              <div class="audit-img sign-img">
                <img
                  class="in-print"
                  :src="
                    `/crNursing/api/file/signImage/${relObj.signerNo3}?${token}`
                  "
                  alt
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <cr-date-picker
            :data-value="relObj.placentaTime2"
            v-model="relObj.placentaTime2"
            :width="140"
            style="height:22px;border:none;"
          />
        </td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.sysA2"
            :data-value="relObj.sysA2"
          />
        </td>
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
           <div class="sign-img-con">
            <div
              class="sign-null-box"
              @click="sign2('signerNo4', 'signerName4')"
              v-if="!relObj.signerNo4"
            ></div>
            <div
              class="sign-in-box"
              v-else
              @click="sign2('signerNo4', 'signerName4', true)"
            >
              <div class="audit-img sign-img">
                <img
                  class="in-print"
                  :src="
                    `/crNursing/api/file/signImage/${relObj.signerNo4}?${token}`
                  "
                  alt
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <cr-date-picker
            :data-value="relObj.placentaTime3"
            v-model="relObj.placentaTime3"
            :width="140"
            style="border:none;height:22px"
          />
        </td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.sysA3"
            :data-value="relObj.sysA3"
          />
        </td>
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
           <div class="sign-img-con">
            <div
              class="sign-null-box"
              @click="sign2('signerNo5', 'signerName5')"
              v-if="!relObj.signerNo5"
            ></div>
            <div
              class="sign-in-box"
              v-else
              @click="sign2('signerNo5', 'signerName5', true)"
            >
              <div class="audit-img sign-img">
                <img
                  class="in-print"
                  :src="
                    `/crNursing/api/file/signImage/${relObj.signerNo5}?${token}`
                  "
                  alt
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <span>3.每天观察记录表(局部情况编码：1=正常，2=红肿，3=硬结，4=出血，5=瘀斑，6=疼痛，7=针头脱出，8=针头堵塞)</span>
  </div>
</template>

<script>
import sheetInfo from "../../../config/sheetInfo";
import moment from "moment";
import { getUser } from "../../../../api";
import commom from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";
export default {
  mixins:[commom],
  props: {
    patientInfo: Object
  },
  data() {
    let a = Object.assign(
      {
        ryrq: "",
        zqss: "",
        hyzk: "",
        jzss: "",
        mzfs: "",
        jws: "",
        gms: "",
        sysL: "",
        sysA: "",
        sysP: "",
        sysG: "",
        T: "",
        P: "",
        R: "",
        BP: ""
      },
      sheetInfo.relObj
    );
    Object.assign(sheetInfo.relObj, a);

    return {
      // relObj: sheetInfo.relObj
       bus: bus(this),
    };
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    }
  },
  methods: {
    sign2(signerNo, signerName, isCancel) {
      let title = isCancel ? "取消签名" : "确认签名";
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          if (isCancel) {
            this.relObj[signerNo] = "";
            this.relObj[signerName] = "";
            this.bus.$emit("saveSheetPage");
            this.$notify.success({
              title: "提示",
              message: "取消签名成功"
            });
          } else {
            this.relObj[signerNo] = res.data.data.empNo;
            this.relObj[signerName] = res.data.data.empName;
            this.bus.$emit("saveSheetPage");
            this.$notify.success({
              title: "提示",
              message: "签名成功"
            });
            console.log(this.relObj[signerNo],this.relObj[signerName]);
          }
        });
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
      this.relObj.ryrq = moment(this.patientInfo.admissionDate).format(
        "YYYY-MM-DD HH:mm"
      );
      sheetInfo.relObj = { ...sheetInfo.relObj };
    }
    if (!this.relObj.zd) {
      this.relObj.zd = this.patientInfo.diagnosis;
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
<style lang="scss" scoped>
.bottom-line {
    border: 0;
    width: 96%;
    outline: none;
    text-align: center;
  }

</style>
<style lang="stylus" rel="stylesheet/stylus" >
.cardiac_intervent-info-contain {
  font-size: 13px;

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
 .sign-img-con{
  display: flex;
  align-items: center;
  height: 30px;
  .sign-null-box {
      cursor: pointer;
      margin: auto;
      height: 30px;
      width: 80px;
    }
    .sign-in-box {
      min-width: 52px;
      height: 30px;
      cursor: pointer;
      margin: auto;
      object-fit: cover;
      .audit-text {
        line-height: 30px;
      }
      .audit-img {
        height: 30px;
        object-fit: cover;
        padding-bottom: 2px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
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
        line-height: 20px;
         vertical-align: middle;
        // height: 28px;//需保留否则td内div没有内容

      }
    }
  }
}
</style>
