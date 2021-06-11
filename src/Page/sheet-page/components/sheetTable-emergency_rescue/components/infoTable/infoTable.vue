<template>
  <div class="rescue-info-contain">
    <table class="info-table">
      <colgroup>
        <col width="6%" />
        <col width="30%" />
        <col width="8%" />
        <col width="31%" />
      </colgroup>
      <tr>
        <td>主诉</td>
        <td>
          <input
            style="text-align: left"
            type="text"
            class="bottom-line"
            v-model="relObj.zhusu"
            :data-value="relObj.zhusu"
          />
        </td>
        <td>过敏史</td>
        <td>
          <div class="radio-con">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.gms"
                  value="1"
                  :ischecked="relObj.gms == 1"
                  @click="toNull(relObj, 'gms', '1')"
                />
                <span>青霉素</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.gms"
                  value="2"
                  :ischecked="relObj.gms == 2"
                  @click="toNull(relObj, 'gms', '2')"
                />
                <span>普鲁卡因</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.gms"
                  value="3"
                  :ischecked="relObj.gms == 3"
                  @click="toNull(relObj, 'gms', '3')"
                />
                <span>其他</span>
              </label>
            </span>
          </div>
        </td>
      </tr>
    </table>

    <table class="info-table">
      <colgroup>
        <col width="6%" />
        <col width="12%" />
        <col width="6%" />
        <col width="12%" />
        <col width="8%" />
        <col width="31%" />
      </colgroup>
      <tr>
        <td>入抢救室时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            style="width: 100px"
            :showMask="false"
            v-model="relObj.rqjssj"
            :data-value="relObj.rqjssj"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td>抢救医生到达时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            style="width: 100px"
            :showMask="false"
            v-model="relObj.qjysddsj"
            :data-value="relObj.qjysddsj"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td>诊断</td>
        <td>
          <input
            style="text-align: left"
            type="text"
            class="bottom-line"
            v-model="relObj.zd"
            :data-value="relObj.zd"
          />
        </td>
      </tr>
    </table>

    <table class="info-table">
      <colgroup>
        <col width="6%" />
        <col width="12%" />
        <col width="6%" />
        <col width="51%" />
      </colgroup>
      <tr>
        <td>联系方式</td>
        <td>
          <input
            style="text-align: left"
            type="text"
            class="bottom-line"
            v-model="relObj.lxfs"
            :data-value="relObj.lxfs"
          />
        </td>
        <td>入院方式</td>
        <td>
          <div class="radio-con">
            <span flex="cross:center" class="radio-box">
              <label>
                <input
                  type="radio"
                  v-model="relObj.ryfs"
                  value="1"
                  :ischecked="relObj.ryfs == 1"
                  @click="toNull(relObj, 'ryfs', '1')"
                />
                <span>平车</span>
              </label>
            </span>
            <span flex="cross:center" class="radio-box">
              <label>
                <input
                  type="radio"
                  v-model="relObj.ryfs"
                  value="2"
                  :ischecked="relObj.ryfs == 2"
                  @click="toNull(relObj, 'ryfs', '2')"
                />
                <span>轮椅</span>
              </label>
            </span>
            <span flex="cross:center" class="radio-box">
              <label>
                <input
                  type="radio"
                  v-model="relObj.ryfs"
                  value="3"
                  :ischecked="relObj.ryfs == 3"
                  @click="toNull(relObj, 'ryfs', '3')"
                />
                <span>搀扶</span>
              </label>
            </span>
            <span flex="cross:center" class="radio-box">
              <label>
                <input
                  type="radio"
                  v-model="relObj.ryfs"
                  value="4"
                  :ischecked="relObj.ryfs == 4"
                  @click="toNull(relObj, 'ryfs', '4')"
                />
                <span>步行</span>
              </label>
            </span>
            <span flex="cross:center" class="radio-box">
              <label>
                <input
                  type="radio"
                  v-model="relObj.ryfs"
                  value="5"
                  :ischecked="relObj.ryfs == 5"
                  @click="toNull(relObj, 'ryfs', '5')"
                />
                <span>抱送</span>
              </label>
            </span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import sheetInfo from "../../../config/sheetInfo";
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      relObj: sheetInfo.relObj
    };
  },
  computed: {
    patientInfo() {
      return sheetInfo.selectBlock || {};
    },
    ...mapState(["sheet"])
  },
  methods: {
    onMaskClick(item) {
      console.log(item);
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
  created() {
    if (!this.relObj.cjsz) {
      this.relObj.cjsz = moment().format("YYYY年MM月DD日");
    }
    if (!this.relObj.zd) {
      this.relObj.zd = this.sheet.patientInfo.diagnosis;
    }
  },
  components: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.rescue-info-contain {
  margin-bottom: -16px;
  .info-table {
    border-collapse: collapse;
    margin: 5px 0px 0;
    font-size: 12px;
    color: #000;
    width: 100%;
    table-layout: fixed;

    & +.info-table {
      margin-top: -1px;
    }

    &, tr, td, th {
      border: 1px solid #444444;
    }

    td {
      padding: 5px;
      text-align: center;
      vertical-align: middle;
      line-height: 18px;
      font-size: 12px;
    }
  }

  .top-info {
    text-align: right;
    margin-top: -5px;
  }

  .bottom-line {
    border: 0;
    // border-bottom: 1px solid #000000;
    width: 100%;
    outline: none;
    text-align: center;
    height: 14px;
    padding: 2px 0 0;
  }

  input[type='radio'] {
    -webkit-appearance: none;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    border: 1px solid #777;
    border-radius: 2px;
    position: relative;
    top: -2px;
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

  .radio-con {
    display: flex;
    align-items: center;
  }

  .radio-con {
    .radio-box {
      & +.radio-box {
        margin-left: 10px;
      }
    }
  }
}
</style>
