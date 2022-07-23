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
    max-width: 138px;
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
    dangerInVteLy: Array,
    dangerInYachuang: Array,
    hasYachuang: Array,
    isToadyHosipital: Array,
    MEWS: Array,
    isFever: Array,
    hasVteDanger: Array,
    isMultiDrugResistant:Array,
    isDangerInThrombus:Array,
    isAdl:Array,
    isPain:Array,
    tubingShedding:Array,
  },
  data() {
    return {};
  },
  computed: {
    list() {
      let arr = [
        {
          key: this.HOSPITAL_ID=="whfk"?"跌倒风险":"跌倒高风险",
          length: this.dangerInMorse.length
        },
        {
          key: this.HOSPITAL_ID=="whfk"?"压疮风险":this.HOSPITAL_ID=="liaocheng" ? "压力性损伤高风险" : this.HOSPITAL_ID=="lyxrm" ?"跌倒压力性损伤高风险":"压疮高风险",
          length: this.dangerInYachuang.length
        },
        {
          key: this.HOSPITAL_ID=="beihairenyi"?"难免压疮": this.HOSPITAL_ID=="liaocheng" ?"已有压力性损伤": this.HOSPITAL_ID=="lyxrm" ?"已有压力性损伤风险" : "已有压疮",
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
        },


      ];
      if (
        this.HOSPITAL_ID == "lingcheng" ||
        this.HOSPITAL_ID == "huadu" ||
        this.HOSPITAL_ID == "liaocheng" ||
        ['lyyz','qhwy'].includes(this.HOSPITAL_ID)
      ) {
        arr.push({
          key: "发热",
          length: this.isFever.length
        });
      }
      if (['liaocheng','lyyz','qhwy'].includes(this.HOSPITAL_ID)) {
        arr.push({
          key: "VTE高风险",
          length: this.hasVteDanger.length
        });
      }
      if (['lyxrm'].includes(this.HOSPITAL_ID)) {
        arr.splice(1,0,
          {
          key: "VTE高风险",
          length: this.dangerInVteLy.length
          }
        );
      }
      if(this.HOSPITAL_ID == "whfk"){
        arr = arr.filter((item)=> {
          return (item.key !='MEWS预警'&& item.key != "预出院"&& item.key != "已有压疮")
        })
        arr.splice(2,0, {key: "ADL",length: this.isPain.length},
          {key: "疼痛",length: this.isAdl.length},
          {key: "管道脱落风险",length: this.tubingShedding.length},)

      }
      if(this.HOSPITAL_ID == "beihairenyi"){
        // console.log("多重耐药患者:",this.isMultiDrugResistant);
        arr.splice(1,1,
          {
          key: "压疮高风险",
          length: this.dangerInYachuang.length
          },
          {
            key: "血栓高危",
            length: this.isDangerInThrombus.length
          }
        );
        arr.splice(5,4)
        arr.push(
          {key: "今日手术",length: this.isTodayOperation.length},
          {key: "明日手术",length: this.isTommorowOperation.length},
          {key: "预出院",value: "",length: this.isTodayDischarg.length},
          {key: "明日出院",length: this.isTommorowDischarge.length},
        )
      }
      return arr;
    }
  },
  methods: {
    selectType(item) {
      console.log(item);
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
