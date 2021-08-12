<template>
  <div class="footer-con" flex>
    <div
      class="item-con"
      flex-box="1"
      v-for="item in list"
      :key="item.key"
      @click="selectType(item)"
      :class="{ active: selectName == item.key }"
    >
      {{ item.key }}（{{ item.length || 0 }}）
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.footer-con {
  position: fixed;
  right: 160px;
  left: 0;
  bottom: 0;
  height: 37px;
  background: #fff;
  border-top: 1px solid #D4DADE;
  border-right: 1px solid #D4DADE;
  z-index: 2;

  .item-con {
    height: 100%;
    max-width: 130px;
    font-size: 12px;
    color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #687179;
    letter-spacing: 0;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
    border-right: 1px solid #EAEEF1;
    cursor: pointer;

    &.active {
      background: #F1F1F5;
      color: #333333;
      font-weight: bold;
    }

    &:last-child {
      border-right: 0;
    }
  }
}
</style>
<script>
export default {
  props: {
    selectName: String,
    isTodayDischarg: Array,
    isTodayOperation: Array,
    isTommorowDischarge: Array,
    isTommorowOperation: Array,
    dangerInMorse: Array,
    dangerInYachuang: Array,
    hasYachuang: Array,
    isToadyHosipital: Array,
    MEWS: Array,
    isFever: Array,
    hasVteDanger: Array,
    isMultiDrugResistant:Array
  },
  data() {
    return {};
  },
  computed: {
    list() {
      let arr = [
        {
          key: "跌倒高风险",
          length: this.dangerInMorse.length
        },
        {
          key: "压疮高风险",
          length: this.dangerInYachuang.length
        },
        {
          key: "已有压疮",
          length: this.hasYachuang.length
        },
        {
          key: "新入",
          length: this.isToadyHosipital.length
        },
        {
          key: "预出院",
          value: "",
          length: this.isTodayDischarg.length
        },
        {
          key: "明日出院",
          length: this.isTommorowDischarge.length
        },
        {
          key: "今日手术",
          length: this.isTodayOperation.length
        },
        {
          key: "明日手术",
          length: this.isTommorowOperation.length
        },
        {
          key: "MEWS预警",
          length: this.MEWS.length
        }
      ];
      if (
        this.HOSPITAL_ID == "lingcheng" ||
        this.HOSPITAL_ID == "huadu" ||
        this.HOSPITAL_ID == "liaocheng"
      ) {
        arr.push({
          key: "发热",
          length: this.isFever.length
        });
      }
      if (this.HOSPITAL_ID == "liaocheng") {
        arr.push({
          key: "VTE高风险",
          length: this.hasVteDanger.length
        });
      }
      // if(this.HOSPITAL_ID == "huadu"){
      //   console.log("多重耐药患者:",this.isMultiDrugResistant);
      //    arr.push({
      //     key: "多重耐药患者",
      //     length: this.isMultiDrugResistant.length
      //   });
      // }
      // console.log(arr);
      return arr;
    }
  },
  methods: {
    selectType(item) {
      if (item.key == this.selectedType) {
        this.$parent.selectName = "";
      } else {
        this.$parent.selectName = item.key;
      }
    }
  },
  components: {}
};
</script>
