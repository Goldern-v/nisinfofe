<template>
  <div class="deep-info-contain">
    <div>
      <div>
        <span>
          <span>留置时间：</span>
          <masked-input
            type="text"
            class="bottom-line"
            style="width: 150px;margin-top: 8px"
            :showMask="true"
            v-model="relObj.zgzdate"
            :data-value="relObj.zgzdate"
            :mask="
              () => [
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                '年',
                /\d/,
                /\d/,
                '月',
                /\d/,
                /\d/,
                '日',
                /\d/,
                /\d/,
                '时'
              ]
            "
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </span>
        <span style="padding-left:20px">置管者：</span>
        <input
          type="text"
          class="bottom-line"
          style="width: 85px"
          v-model="relObj.zgz"
          :data-value="relObj.zgz"
        />
      </div>

      <div>
        <span>
          <!-- <input type="text" class="bottom-line" style="width: 128px" v-model="relObj.zgzdate" :data-value="relObj.zgzdate"> -->
          <span>带入本科时间：</span>
          <masked-input
            type="text"
            class="bottom-line"
            style="width: 150px;margin-top: 8px"
            :showMask="true"
            v-model="relObj.drbksj"
            :data-value="relObj.drbksj"
            :mask="
              () => [
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                '年',
                /\d/,
                /\d/,
                '月',
                /\d/,
                /\d/,
                '日',
                /\d/,
                /\d/,
                '时'
              ]
            "
            :guide="true"
            placeholderChar=" "
          ></masked-input
          >（选填）
        </span>
      </div>
    </div>
    <!-- {{relObj}} -->
    <table>
      <colgroup>
        <col width="3.4%" />
        <col width="9.5%" />
        <col width="24.1%" />
        <col width="9.8%" />
        <col width="10.3%" />
        <col width="10%" />
        <col width="10%" />
        <col width="23%" />
      </colgroup>
      <tr>
        <td rowspan="4" center>置管情况</td>
        <td>导管类型</td>
        <td colspan="8">
          <div style="text-align:left;">
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj._dglx"
                  value="1"
                  :ischecked="relObj._dglx == 1"
                />
                <span>PICC</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj._dglx"
                  value="2"
                  :ischecked="relObj._dglx == 2"
                />
                <span>中长导管</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj._dglx"
                  value="3"
                  :ischecked="relObj._dglx == 3"
                />
                <span>CVC</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj._dglx"
                  value="4"
                  :ischecked="relObj._dglx == 4"
                />
                <span>PORT</span>
              </label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td>管腔类型</td>
        <td colspan="4">
          <div flex="cross:center main:justify">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.dglx"
                  value="1"
                  :ischecked="relObj.dglx == 1"
                />
                <span>单腔</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.dglx"
                  value="2"
                  :ischecked="relObj.dglx == 2"
                />
                <span>双腔</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.dglx"
                  value="3"
                  :ischecked="relObj.dglx == 3"
                />
                <span>三腔</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.dglx"
                  value="4"
                  :ischecked="relObj.dglx == 4"
                />
                <span>耐高压</span>
              </label>
            </span>
          </div>
        </td>
        <td colspan="2">
          外露长度
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.wlcd"
            :data-value="relObj.wlcd"
          />
          cm
        </td>
        <td colspan="2">
          基础臂围
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.jcbw"
            :data-value="relObj.jcbw"
          />
          cm
        </td>
      </tr>
      <tr>
        <td>导管末端</td>
        <td colspan="4">
          <div flex="cross:left">
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj.dgmd"
                  value="1"
                  :ischecked="relObj.dgmd == 1"
                />
                <span>末端开口</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj.dgmd"
                  value="2"
                  :ischecked="relObj.dgmd == 2"
                />
                <span>三向瓣膜</span>
              </label>
            </span>
          </div>
        </td>
        <td colspan="2">
          置入刻度
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.zrkd"
            :data-value="relObj.zrkd"
          />
          cm
        </td>
        <td colspan="2">
          基础腿围
          <input
            type="text"
            class="bottom-line"
            v-model="relObj.jctw"
            :data-value="relObj.jctw"
          />
          cm
        </td>
      </tr>
      <tr>
        <td>置管部位</td>
        <td colspan="3">
          <div flex="cross:left">
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj.zgbw"
                  value="1"
                  :ischecked="relObj.zgbw == 1"
                />
                <span>左侧</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj.zgbw"
                  value="2"
                  :ischecked="relObj.zgbw == 2"
                />
                <span>右侧</span>
              </label>
            </span>
          </div>
          <div flex="cross:left">
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj.zgbw"
                  value="3"
                  :ischecked="relObj.zgbw == 3"
                />
                <span>上肢</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj.zgbw"
                  value="4"
                  :ischecked="relObj.zgbw == 4"
                />
                <span>下肢</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  type="radio"
                  v-model="relObj.zgbw"
                  value="other"
                  :ischecked="relObj.zgbw == 'other'"
                />
                <span>其他</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 30px"
                  :data-value="relObj.zgbwother"
                  v-model="relObj.zgbwother"
                  :disabled="relObj.zgbw !== 'other'"
                />
              </label>
            </span>
          </div>
        </td>
        <td>置管静脉</td>
        <td colspan="4" style="text-align: left">
          <span>
            <label>
              <input
                type="radio"
                v-model="relObj.zgjm"
                value="4"
                :ischecked="relObj.zgjm == 4"
              />
              <span>贵要静脉</span>
            </label>
          </span>
          <span>
            <label>
              <input
                type="radio"
                v-model="relObj.zgjm"
                value="5"
                :ischecked="relObj.zgjm == 5"
              />
              <span>肘正中静脉</span>
            </label>
          </span>
          <span>
            <label>
              <input
                type="radio"
                v-model="relObj.zgjm"
                value="6"
                :ischecked="relObj.zgjm == 6"
              />
              <span>头静脉</span>
            </label>
          </span>
          <span>
            <label>
              <input
                type="radio"
                v-model="relObj.zgjm"
                value="7"
                :ischecked="relObj.zgjm == 7"
              />
              <span>肱静脉</span>
            </label>
          </span>
          <br />
          <span>
            <label>
              <input
                type="radio"
                v-model="relObj.zgjm"
                value="1"
                :ischecked="relObj.zgjm == 1"
              />
              <span>颈内静脉</span>
            </label>
          </span>
          <span>
            <label>
              <input
                type="radio"
                v-model="relObj.zgjm"
                value="2"
                :ischecked="relObj.zgjm == 2"
              />
              <span>锁骨下静脉</span>
            </label>
          </span>
          <span>
            <label>
              <input
                type="radio"
                v-model="relObj.zgjm"
                value="3"
                :ischecked="relObj.zgjm == 3"
              />
              <span>股静脉</span>
            </label>
          </span>
          <span>
            <label>
              <input
                type="radio"
                v-model="relObj.zgjm"
                value="other"
                :ischecked="relObj.zgjm == 'other'"
              />
              <span>其他</span>
              <input
                type="text"
                class="bottom-line"
                style="width: 30px"
                :data-value="relObj.zgjmother"
                v-model="relObj.zgjmother"
                :disabled="relObj.zgjm !== 'other'"
              />
            </label>
          </span>
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
    pageNo: Number
  },
  data() {
    return {};
  },
  computed: {
    relObj() {
      return (
        (sheetInfo.relObjs[this.pageNo] &&
          sheetInfo.relObjs[this.pageNo].relObj) ||
        {}
      );
    }
  },
  created() {
    if (!this.relObj.zgzdate || !this.relObj.drbksj) {
      this.relObj.zgzdate = moment().format("YYYY年MM月DD日HH时");
      this.relObj.drbksj = moment().format("YYYY年MM月DD日HH时");
    }
  },
  methods: {},
  components: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.deep-info-contain {
  font-size: 12px;
  table {
    border-collapse: collapse;
    margin: 15px 0px 0;
    font-size: 12px;
    color: #000;
    width: 100%;

    &, tr, td, th {
      border: 1px solid #444444;
    }

    td {
      padding: 2px;
      text-align: center;
      vertical-align: middle;
      line-height: 18px;
      font-size: 12px;
    }
  }

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
      vertical-align: top !important;
    }

    input {
      position: relative;
      top: -1px;
      margin-right: 0;
    }
  }
}
</style>
