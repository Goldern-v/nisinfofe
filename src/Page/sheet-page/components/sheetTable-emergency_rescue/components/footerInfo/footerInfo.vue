<template>
  <div class="footer-con ill-footer-container">
    <table class="footer-table">
      <colgroup>
        <col width="4%" />
        <col width="6%" />
        <col width="8%" />
        <col width="7%" />
        <col width="11%" />
        <col width="6%" />
        <col width="8%" />
        <col width="7%" />
        <col width="11%" />
        <col width="6%" />
        <col width="8%" />
        <col width="7%" />
        <col width="11%" />
        <col width="6%" />
        <col width="8%" />
        <col width="7%" />
        <col width="11%" />
        <col width="6%" />
        <col width="8%" />
        <col width="7%" />
        <col width="11%" />
      </colgroup>
      <tr>
        <td rowspan="2">会诊情况</td>
        <td rowspan="2">科室</td>
        <td rowspan="2">
          <textarea
            style="width: 100%;height:30px;resize:none;overflow:hidden;"
            type="text"
            class="bottom-line"
            v-model="relObj.ks1"
            :data-value="relObj.ks1"
          />
        </td>
        <td>通知时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.tzsj1"
            :data-value="relObj.tzsj1"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td rowspan="2">科室</td>
        <td rowspan="2">
          <textarea
            style="width: 100%;height:30px;resize:none;overflow:hidden;"
            type="text"
            class="bottom-line"
            v-model="relObj.ks2"
            :data-value="relObj.ks2"
          />
        </td>
        <td>通知时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.tzsj2"
            :data-value="relObj.tzsj2"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td rowspan="2">科室</td>
        <td rowspan="2">
          <textarea
            style="width: 100%;height:30px;resize:none;overflow:hidden;"
            type="text"
            class="bottom-line"
            v-model="relObj.ks3"
            :data-value="relObj.ks3"
          />
        </td>
        <td>通知时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.tzsj3"
            :data-value="relObj.tzsj3"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td rowspan="2">科室</td>
        <td rowspan="2">
          <textarea
            style="width: 100%;height:30px;resize:none;overflow:hidden;"
            type="text"
            class="bottom-line"
            v-model="relObj.ks4"
            :data-value="relObj.ks4"
          />
        </td>
        <td>通知时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.tzsj4"
            :data-value="relObj.tzsj4"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td rowspan="2">科室</td>
        <td rowspan="2">
          <textarea
            style="width: 100%;height:30px;resize:none;overflow:hidden;"
            type="text"
            class="bottom-line"
            v-model="relObj.ks5"
            :data-value="relObj.ks5"
          />
        </td>
        <td>通知时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.tzsj5"
            :data-value="relObj.tzsj5"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
      </tr>
      <tr>
        <td>到达时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.ddsj1"
            :data-value="relObj.ddsj1"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td>到达时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.ddsj2"
            :data-value="relObj.ddsj2"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td>到达时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.ddsj3"
            :data-value="relObj.ddsj3"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td>到达时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.ddsj4"
            :data-value="relObj.ddsj4"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
        <td>到达时间</td>
        <td>
          <masked-input
            type="text"
            class="bottom-line"
            :showMask="false"
            v-model="relObj.ddsj5"
            :data-value="relObj.ddsj5"
            :mask="() => [/\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </td>
      </tr>
    </table>

    <table class="footer-table">
      <colgroup>
        <col width="15%" />
        <col width="40%" />
        <col width="15%" />
        <col width="30%" />
      </colgroup>
      <tr>
        <td>抢救医生</td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.qjys"
            :data-value="relObj.qjys"
          />
        </td>
        <td>抢救护士</td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.qjhs"
            :data-value="relObj.qjhs"
          />
        </td>
      </tr>
    </table>

    <table class="footer-table">
      <colgroup>
        <col width="15%" />
        <col width="85%" />
      </colgroup>
      <tr>
        <td>患者转归</td>
        <td>
          <div class="radio-con">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.hzzg"
                  value="1"
                  :ischecked="relObj.hzzg == 1"
                  @click="toNull(relObj, 'hzzg', '1')"
                />
                <span>观察室&nbsp;</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.hzzg"
                  value="2"
                  :ischecked="relObj.hzzg == 2"
                  @click="toNull(relObj, 'hzzg', '2')"
                />
                <span>手术室&nbsp;</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.hzzg"
                  value="3"
                  :ischecked="relObj.hzzg == 3"
                  @click="toNull(relObj, 'hzzg', '3')"
                />
                <span
                  >入院
                  <input
                    type="text"
                    class="bottom-line"
                    style="display:inline-block;width:50px"
                    v-model="relObj.ryks"
                    :data-value="relObj.ryks"
                  />科&nbsp;</span
                >
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.hzzg"
                  value="4"
                  :ischecked="relObj.hzzg == 4"
                  @click="toNull(relObj, 'hzzg', '4')"
                />
                <span>出院&nbsp;</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.hzzg"
                  value="5"
                  :ischecked="relObj.hzzg == 5"
                  @click="toNull(relObj, 'hzzg', '5')"
                />
                <span>死亡&nbsp;</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.hzzg"
                  value="6"
                  :ischecked="relObj.hzzg == 6"
                  @click="toNull(relObj, 'hzzg', '6')"
                />
                <span>转院&nbsp;</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.hzzg"
                  value="7"
                  :ischecked="relObj.hzzg == 7"
                  @click="toNull(relObj, 'hzzg', '7')"
                />
                <span>自动离院&nbsp;</span>
              </label>
            </span>
          </div>
        </td>
      </tr>
    </table>

    <table class="footer-table">
      <colgroup>
        <col width="15%" />
        <col width="85%" />
      </colgroup>
      <tr>
        <td>备注</td>
        <td>
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.remark"
            :data-value="relObj.remark"
          />
        </td>
      </tr>
    </table>

    <div class="bz">
      意识：清醒、嗜睡、意识模糊、昏迷、浅昏迷 &nbsp; 对光反射：存在用“+” &nbsp;
      消失用“-” &nbsp; 迟钝用“±”表示
    </div>
  </div>
</template>

<script>
import sheetInfo from "../../../config/sheetInfo";
import moment from "moment";
export default {
  data() {
    return {
      relObj: sheetInfo.relObj,
      bgyyotherstore: ""
    };
  },
  methods: {
    toNull(obj, key, value) {
      if (obj[key] === value) {
        obj[key] = "";
      }
    }
  },

  components: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ill-footer-container {
  font-size: 13px;

  .footer-table {
    border-collapse: collapse;
    margin: -16px 0px 0;
    font-size: 12px;
    color: #000;
    width: 100%;
    table-layout: fixed;

    & +.footer-table {
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

  .footer-con {
    font-size: 13px;
    margin-top: 15px;
  }

  .bz {
    margin-top: 10px;
    font-size: 13px;
  }

  .bz-title {
    float: left;
  }

  .bz-text {
    margin-left: 30px;
    line-height: 18px;
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
}
</style>
