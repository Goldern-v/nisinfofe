<template>
  <div class="catheter-info-containter">
    <!-- {{relObj}} -->
    <table>
      <colgroup>
        <col width="5.1%">
        <col width="10.8%">
        <col width="9.8%">
        <col width="9.8%">
        <col width="14%">
        <col width="10%">
        <col width="10%">
        <col width="27.6%">
      </colgroup>

      <tr>
        <td rowspan="2" center>置管情况</td>
        <td rowspan="2">尿管类型</td>
        <td rowspan="2">
          <div flex="cross:center main:center">
            <span flex="cross:center">
              <label>
                <input type="radio" v-model="relObj.nglx" value="2" :ischecked="relObj.nglx == 2">
                <span>双腔</span>
              </label>
            </span>
          </div>
          <div flex="cross:center main:center" style="margin-top: 2px;">
            <span flex="cross:center">
              <label>
                <input type="radio" v-model="relObj.nglx" value="3" :ischecked="relObj.nglx == 3">
                <span>三腔</span>
              </label>
            </span>
          </div>
        </td>
        <td rowspan="2">尿管材质</td>
        <td rowspan="2">
          <div flex="cross:center main:justify">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.ngcz"
                  value="1"
                  :ischecked="relObj.ngcz == 1"
                  style="margin-left: 0; margin-right: -1px;"
                >
                <span>乳胶</span>
              </label>
            </span>
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.ngcz"
                  value="2"
                  :ischecked="relObj.ngcz == 2"
                  style="margin-left: 0;margin-right: -1px;"
                >
                <span>硅胶</span>
              </label>
            </span>
          </div>
          <div flex="cross:center main:justift" style="margin-top: 2px;">
            <span flex="cross:center">
              <label>
                <input
                  type="radio"
                  v-model="relObj.ngcz"
                  value="other"
                  :ischecked="relObj.ngcz == 'other'"
                  style="margin-left: 0;margin-right: -1px;"
                >
                <span>其他</span>
                <input
                  type="text"
                  class="bottom-line"
                  style="width: 40px"
                  v-model="relObj.ngcz_other"
                  :disabled="relObj.ngcz !='other'"
                  :data-value="relObj.ngcz_other"
                >
              </label>
            </span>
          </div>
        </td>
        <td rowspan="1">尿管型号</td>
        <td rowspan="1">
          <input
            type="text"
            class="no-line"
            style="width: 100%"
            center
            v-model="relObj.ngxh"
            :data-value="relObj.ngxh"
          >
        </td>
        <td rowspan="2">
          <div>
            置管者：
            <input
              type="text"
              class="bottom-line"
              style="width: 120px"
              v-model="relObj.zgz"
              :data-value="relObj.zgz"
            >
          </div>
          <div>
            <span>置管时间：</span>
            <masked-input
              type="text"
              @click="onMaskClick(relObj)"
              class="bottom-line"
              style="width: 108px;margin-top: 6px"
              :showMask="false"
              v-model="relObj.zgzdate"
              :data-value="relObj.zgzdate"
              :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]"
              :guide="true"
              placeholderChar=" "
            ></masked-input>
          </div>
        </td>
      </tr>
      <tr>
        <td rowspan="1">注入水囊</td>
        <td rowspan="1">
          <input
            type="text"
            class="no-line"
            style="width: 60%"
            center
            v-model="relObj.jcbw"
            :data-value="relObj.jcbw"
          > ml
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
    onMaskClick(item) {
      console.log(item);
      if (!item.zgzdate) {
        item.zgzdate = moment().format("YYYY-MM-DD");
      }
    }
  },
  components: {}
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.catheter-info-containter {
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
      padding: 5px;
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

  .no-line {
    border: 0;
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

  input:disabled {
    color: #fff !important;
    background: #fff !important;
  }
}
</style>
