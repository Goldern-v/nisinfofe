<template>
  <div class="label-warpper">
    <div class="label-con" flex>
      <table>
        <colgroup>
          <col width="127px;" />
          <col width="127px;" />
          <col width="127px;" />
          <col width="127px;" />
        </colgroup>
        <tbody>
          <tr>
            <td colspan="2" class="title">
              <div class="label-item">
                {{ printLabelInfo.bedLabel }}
                {{ printLabelInfo.patientName }}
              </div>
            </td>
            <td style="vertical-align: middle;">
              <div class="label-item" style="text-align: center;">
                住院号
              </div>
              <div class="label-item" style="text-align: center;">
                {{ printLabelInfo.patientId }}
              </div>
            </td>
            <td rowspan="2">
              <img class="qr-code" :src="qrCode" />
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 5px;vertical-align: middle;">
              <div class="label-item">
                {{ printLabelInfo.executeDateTime | ymdhm }}
              </div>
            </td>
            <td style="padding: 10px 5px;vertical-align: middle;">
              <div class="label-item">
                {{ printLabelInfo.repeatIndicator }}
              </div>
            </td>
            <td style="padding: 10px 5px;vertical-align: middle;">
              <div
                class="label-item"
                v-if="printLabelInfo.groupNo"
                style="text-align: center;"
              >
                第{{
                  printLabelInfo.groupNo.split("/")[0] == 0
                    ? 1
                    : printLabelInfo.groupNo.split("/")[0]
                }}次用药
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" style="height: 180px;">
              <div class="label-item" v-if="printLabelInfo.children">
                <ul>
                  <li
                    class="label-item"
                    v-for="item in printLabelInfo.children"
                    :key="item.orderSubNo"
                  >
                    {{ item.itemName || item.orderText }}
                  </li>
                </ul>
              </div>
              <div class="label-item" v-else>
                {{ printLabelInfo.itemName || printLabelInfo.orderText }}
              </div>
            </td>
            <td>
              <div class="label-item" v-if="printLabelInfo.children">
                <ul>
                  <li
                    class="label-item"
                    v-for="item in printLabelInfo.children"
                    :key="item.orderSubNo"
                  >
                    {{ item.dosage }} {{ item.dosageUnits }}
                  </li>
                </ul>
              </div>
              <div class="label-item" v-else>
                {{ printLabelInfo.dosage }} {{ printLabelInfo.dosageUnits }}
              </div>
            </td>
          </tr>
          <tr>
            <td>配液者</td>
            <td><div class="label-item"></div></td>
            <td>配液时间</td>
            <td><div class="label-item"></div></td>
          </tr>
          <tr>
            <td>校对者</td>
            <td><div class="label-item"></div></td>
            <td>频次途径</td>
            <td>
              <div class="label-item">
                {{ printLabelInfo.freqeuncy }}
                {{ printLabelInfo.administration }}
              </div>
            </td>
          </tr>
          <tr>
            <td>执行者</td>
            <td>
              <div class="label-item">{{ printLabelInfo.endNurse }}</div>
            </td>
            <td>医生说明</td>
            <td><div class="label-item"></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.label-warpper {
  background: #fff;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  display: inline-block;
  font-size: 16px;
  position: absolute;
  z-index: -1000;

  >>> * {
    font-family: "SimHei", "Microsoft Yahei" !important;
    font-weight: bold;
  }
}

.label-con {
  margin: 20px;
  width: 511px;
  height: 335px;
  box-sizing: border-box;
  border-right: 5px solid #fff;
  position: relative;
  border: 1px solid #000;
  height: 370px;

  table {
    width: 100%;
    td {
      border: 1px solid #000;
      padding: 4px 5px;
      box-sizing: border-box;
    }
    .title {
      font-size: 26px;
      vertical-align: middle;
      padding: 12px 5px;
    }
    .label-item {
      min-height: 16px;
      span {
      }
      li {
        padding-bottom: 5px;
      }
    }
  }

  // &.remarkCon
  .qr-code {
    height: 85px;
    width: 105px;
    vertical-align: middle;
  }
}
</style>
<script>
import moment from "moment";
export default {
  props: {
    printLabelInfo: Object,
    qrCode: String
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD") : "";
    }
  }
};
</script>
