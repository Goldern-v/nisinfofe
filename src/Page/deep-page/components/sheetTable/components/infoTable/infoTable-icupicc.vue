<template>
  <div class="deep-info-contain">
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
        <td rowspan="3" center>置管情况</td>
        <td>导管类型</td>
        <td>
          <div class="row-box top" flex="cross:center main:justify">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'dglx', '1')"
                  v-model="relObj.dglx"
                  value="1"
                  :ischecked="relObj.dglx == 1"
                />
                <span>双腔</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'dglx', '2')"
                  v-model="relObj.dglx"
                  value="2"
                  :ischecked="relObj.dglx == 2"
                />
                <span>末端开口</span>
              </label>
            </span>
          </div>
          <div class="row-box bottom" flex="cross:center main:justify">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'dglx', '3')"
                  v-model="relObj.dglx"
                  value="3"
                  :ischecked="relObj.dglx == 3"
                />
                <span>单腔</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'dglx', '4')"
                  v-model="relObj.dglx"
                  value="4"
                  :ischecked="relObj.dglx == 4"
                />
                <span>三向瓣膜</span>
              </label>
            </span>
          </div>
        </td>
        <td>
          <div class="row-box top row-line">外露长度</div>
          <div class="row-box bottom">置入刻度</div>
        </td>
        <td>
          <div class="row-box top row-line">
            <input type="text" class="bottom-line" v-model="relObj.wlcd" :data-value="relObj.wlcd" /> cm
          </div>
          <div class="row-box bottom">
            <input type="text" class="bottom-line" v-model="relObj.zrkd" :data-value="relObj.zrkd" /> cm
          </div>
        </td>
        <td>
          <div class="row-box top row-line">基础臂围</div>
          <div class="row-box bottom">PICC填</div>
        </td>
        <td>
          <input type="text" class="bottom-line" v-model="relObj.jcbw" :data-value="relObj.jcbw" /> cm
        </td>
        <td>
          <div class="row-box top">
            <span>置管者：</span>
            <input
              type="text"
              class="bottom-line"
              style="width: 85px"
              v-model="relObj.zgz"
              :data-value="relObj.zgz"
            />
          </div>
          <div class="row-box bottom">
            <!-- <input type="text" class="bottom-line" style="width: 128px" v-model="relObj.zgzdate" :data-value="relObj.zgzdate"> -->
            <!-- <span>置管时间：</span> -->
            <masked-input
              type="text"
              class="bottom-line"
              style="width: 100%;margin-top: 8px"
              :showMask="false"
              v-model="relObj.zgzdate"
              :data-value="relObj.zgzdate"
              :mask="() => [/\d/, /\d/, /\d/, /\d/, '年', /\d/, /\d/, '月', /\d/, /\d/, '日', /\d/, /\d/, '时']"
              :guide="true"
              placeholderChar=" "
            ></masked-input>
          </div>
        </td>
      </tr>

      <tr>
        <td>置管部位</td>
        <td>
          <div flex="cross:center main:justify" class="row-box top">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgbw', '1')"
                  v-model="relObj.zgbw"
                  value="1"
                  :ischecked="relObj.zgbw == 1"
                />
                <span>左侧</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgbw', '2')"
                  v-model="relObj.zgbw"
                  value="2"
                  :ischecked="relObj.zgbw == 2"
                />
                <span>右侧&nbsp;&nbsp;</span>
              </label>
            </span>
          </div>

          <div flex="cross:center main:justify" class="row-box bottom">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgbw', '3')"
                  v-model="relObj.zgbw"
                  value="3"
                  :ischecked="relObj.zgbw == 3"
                />
                <span>肘关节上</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgbw', '4')"
                  v-model="relObj.zgbw"
                  value="4"
                  :ischecked="relObj.zgbw == 4"
                />
                <span>肘关节下</span>
              </label>
            </span>
          </div>
        </td>
        <td>置管静脉</td>
        <td colspan="4" style="text-align: left">
          <div flex="cross:center main:justify" class="row-box top">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgjm', '1')"
                  v-model="relObj.zgjm"
                  value="1"
                  :ischecked="relObj.zgjm == 1"
                />
                <span>颈内静脉</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgjm', '2')"
                  v-model="relObj.zgjm"
                  value="2"
                  :ischecked="relObj.zgjm == 2"
                />
                <span>锁骨下静脉</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgjm', '3')"
                  v-model="relObj.zgjm"
                  value="3"
                  :ischecked="relObj.zgjm == 3"
                />
                <span style="margin-right: 8px">股静脉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </label>
            </span>
          </div>

          <div flex="cross:center main:justify" class="row-box bottom">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgjm', '4')"
                  v-model="relObj.zgjm"
                  value="4"
                  :ischecked="relObj.zgjm == 4"
                />
                <span>贵要静脉</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgjm', '5')"
                  v-model="relObj.zgjm"
                  value="5"
                  :ischecked="relObj.zgjm == 5"
                />
                <span>头静脉&nbsp;&nbsp;</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgjm', '6')"
                  v-model="relObj.zgjm"
                  value="6"
                  :ischecked="relObj.zgjm == 6"
                />
                <span>肘正中静脉</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'zgjm', '7')"
                  v-model="relObj.zgjm"
                  value="7"
                  :ischecked="relObj.zgjm == 7"
                />
                <span>肱静脉</span>
              </label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td>手卫生</td>
        <td>
          <div flex="cross:center main:justify">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'sws', '1')"
                  v-model="relObj.sws"
                  value="1"
                  :ischecked="relObj.sws == 1"
                />
                <span>置管前</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'sws', '2')"
                  v-model="relObj.sws"
                  value="2"
                  :ischecked="relObj.sws == 2"
                />
                <span>置管后&nbsp;</span>
              </label>
            </span>
          </div>
        </td>
        <td>无菌屏障</td>
        <td colspan="4" style="text-align: left">
          <div flex="cross:center main:justify">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'wjpz', '1')"
                  v-model="relObj.wjpz"
                  value="1"
                  :ischecked="relObj.wjpz == 1"
                />
                <span>大孔巾</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'wjpz', '2')"
                  v-model="relObj.wjpz"
                  value="2"
                  :ischecked="relObj.wjpz == 2"
                />
                <span>手术衣</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'wjpz', '3')"
                  v-model="relObj.wjpz"
                  value="3"
                  :ischecked="relObj.wjpz == 3"
                />
                <span>无菌手套</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'wjpz', '4')"
                  v-model="relObj.wjpz"
                  value="4"
                  :ischecked="relObj.wjpz == 4"
                />
                <span>口罩</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  @click="toNull(relObj, 'wjpz', '5')"
                  v-model="relObj.wjpz"
                  value="5"
                  :ischecked="relObj.wjpz == 5"
                />
                <span>圆帽&nbsp;</span>
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
export default {
  props:{
    pageNo:Number
  },
  data() {
    return {
    };
  },
  computed:{
    relObj(){
      return (sheetInfo.relObjs[this.pageNo] && sheetInfo.relObjs[this.pageNo].relObj) || {};
    },
  },
  methods: {
    toNull(obj, key, value) {
      if (obj[key] === value) {
        obj[key] = "";
      }
    }
  },
  created() {
    if (!this.relObj.zgzdate) {
      this.relObj.zgzdate = moment().format("YYYY年MM月DD日HH时");
    }
  },
  components: {}
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.deep-info-contain {
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
      padding: 2px 5px;
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

  .row-box {
    height: 50%;

    &.top {
      padding-bottom: 3px;
    }

    &.bottom {
      padding-top: 3px;
    }

    &.row-line {
      border-bottom: 1px solid #000;
      margin: 0 -5px;
    }
  }
}
</style>
