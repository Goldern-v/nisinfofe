<template>
  <div class="search-con">
    <div class="input-con" flex="cross:stretch">
      <input type="text" class="search-input" flex-box="1" placeholder="床号/姓名" v-model="searchText">
      <div class="search-btn" flex="cross:center main:center">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <div v-for="(item, index) in list" :key="index">
      <div
        class="s-item"
        flex="cross:center"
        v-if="item.type == 'bed'"
        :class="{active: selectName == item.name}"
        @click="selectType(item.name)"
      >
        <i class="icon-chuangwei iconfont"></i>
        <span>{{item.name}}（{{item.num}}）</span>
      </div>

      <div style="height:20px" v-if="item.type == 'block'"></div>

      <div
        class="s-item"
        flex="cross:center"
        v-if="item.type.indexOf('type') > -1"
        :class="{active: selectName == item.name}"
        @click="selectType(item.name)"
      >
        <aside class="sq" :class="item.type"></aside>
        <span>{{item.name}}（{{item.num}}）</span>
      </div>

      <div class="line" v-if="item.type == 'line'"></div>

      <div
        class="s-item"
        flex="cross:center"
        v-if="item.type == 'state'"
        :class="{active: selectName == item.name}"
        @click="selectType(item.name)"
      >
        <i class="icon-bingwei iconfont"></i>
        <span>{{item.name}}（{{item.num}}）</span>
      </div>

      <div
        class="s-item"
        flex="cross:center"
        v-if="item.type == 'heart'"
        :class="{active: selectName == item.name}"
        @click="selectType(item.name)"
      >
        <i class="icon-shoucang iconfont"></i>
        <span>{{item.name}}（{{item.num}}）</span>
      </div>
    </div>
    <footerBar
      :selectName="selectName"
      :isTodayDischarg="isTodayDischarge"
      :isTodayOperation="isTodayOperation"
      :isTommorowDischarge="isTommorowDischarge"
      :isTommorowOperation="isTommorowOperation"
      :dangerInMorse="dangerInMorse"
      :dangerInYachuang="dangerInYachuang"
      :isToadyHosipital="isToadyHosipital"
      :hasYachuang="hasYachuang"
    ></footerBar>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-con
  padding 16px 10px
  .input-con
    background #FFFFFF
    border 1px solid #C2CBD2
    border-radius 2px 0 0 2px
    height 30px
    margin-bottom 20px
    .search-input
      width 0
      outline none
      border 0
      font-size 12px
      color #687179
      padding-left 15px
    .search-btn
      width 40px
      border-left 1px solid #C2CBD2
      i
        font-size 18px
        color #788188
  .s-item
    height 34px
    padding-left 12px
    font-size 13px
    color #687179
    cursor pointer
    &:hover
      background #F7F7FA
      border-radius 3px
    &.active
      background #F1F1F5
      border-radius 3px
      font-weight bold
      color #333333
    i
      color #687179
      font-size 14px
      line-height 16px
    span
      margin-left 8px
    aside
      display inline-block
      border-radius 2px
      width 11px
      height 11px
      &.type-1
        background:rgb(255,0,0)
      &.type-2
        background: rgb(255,255,0)
      &.type-3
        background: rgb(0,255,0)
      &.type-4
        background: rgb(255, 192, 203);
  .line
    background #ECEEEF
    height 1px
    margin 10px 0
</style>
<script>
import { patients } from "@/api/lesion";
import footerBar from "../footer-bar/footer-bar.vue";
export default {
  data() {
    return {
      selectName: "全部床位",
      searchText: "",
      bedList: []
    };
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    },
    // 全部床位
    allBed() {
      return this.bedList;
    },
    nullBed() {
      return this.bedList.filter(item => !item.patientId);
    },
    inBed() {
      return this.bedList.filter(item => item.patientId);
    },
    type4() {
      return this.bedList.filter(item => item.nursingClass == "特级护理");
    },
    type1() {
      return this.bedList.filter(item => item.nursingClass == "一级护理");
    },
    type2() {
      return this.bedList.filter(item => item.nursingClass == "二级护理");
    },
    type3() {
      return this.bedList.filter(item => item.nursingClass == "三级护理");
    },
    bw() {
      return this.bedList.filter(item => item.patientCondition == "病危");
    },
    bz() {
      return this.bedList.filter(item => item.patientCondition == "病重");
    },
    gm() {
      return this.bedList.filter(item => item.drugGms);
    },
    heart() {
      return this.bedList.filter(item => item.isFollow == "1");
    },
    // 预出院
    isTodayDischarge() {
      return this.bedList.filter(item => item.isTodayDischarge == "1");
    },
    // 今日手术
    isTodayOperation() {
      return this.bedList.filter(item => item.isTodayOperation == "1");
    },
    // 明日出院
    isTommorowDischarge() {
      return this.bedList.filter(item => item.isTommorowDischarge == "1");
    },
    // 明日手术
    isTommorowOperation() {
      return this.bedList.filter(item => item.isTommorowOperation == "1");
    },
    // 新入
    isToadyHosipital() {
      return this.bedList.filter(
        item =>
          new Date(item.admissionDate).Format("yyyy-MM-dd") ==
          new Date().Format("yyyy-MM-dd")
      );
    },
    // 跌倒高分险
    dangerInMorse() {
      return this.bedList.filter(item => item.dangerInMorse);
    },
    // 压疮高分险
    dangerInYachuang() {
      return this.bedList.filter(item => item.dangerInYachuang);
    },
    // 已有压疮
    hasYachuang() {
      return this.bedList.filter(item => item.hasYachuang);
    },
    list() {
      return [
        {
          name: "全部床位",
          num: this.allBed.length,
          type: "bed"
        },
        {
          name: "空床",
          num: this.nullBed.length,
          type: "bed"
        },
        {
          name: "在床",
          num: this.inBed.length,
          type: "bed"
        },
        //  {
        //   name: "我的关注",
        //   num: this.heart.length,
        //   type: "heart"
        // },
        {
          name: "",
          num: "",
          type: "line"
        },
        {
          name: "特级护理",
          num: this.type4.length,
          type: "type-4"
        },
        {
          name: "一级护理",
          num: this.type1.length,
          type: "type-1"
        },
        {
          name: "二级护理",
          num: this.type2.length,
          type: "type-2"
        },
        {
          name: "三级护理",
          num: this.type3.length,
          type: "type-3"
        },
        {
          name: "",
          num: "",
          type: "line"
        },
        {
          name: "病危",
          num: this.bw.length,
          type: "state"
        },
        {
          name: "病重",
          num: this.bz.length,
          type: "state"
        },
        {
          name: "过敏",
          num: this.gm.length,
          type: "state"
        }
      ];
    }
  },
  methods: {
    getDate() {
      if (this.deptCode) {
        this.$parent.loading = true;
        patients(this.deptCode).then(res => {
          this.bedList = res.data.data;
          this.$parent.bedList = this.bedList;
          this.$parent.loading = false;
          this.selectName = "全部床位";
        });
      }
    },
    selectType(name) {
      if (this.selectName == name) {
        this.selectName = "全部床位";
      } else {
        this.selectName = name;
      }
    }
  },
  watch: {
    deptCode() {
      this.getDate();
    },
    selectName(val) {
      switch (val) {
        case "":
        case "全部床位":
          {
            this.$parent.bedList = this.allBed;
          }
          break;
        case "空床":
          {
            this.$parent.bedList = this.nullBed;
          }
          break;
        case "在床":
          {
            this.$parent.bedList = this.inBed;
          }
          break;
        case "特级护理":
          {
            this.$parent.bedList = this.type4;
          }
          break;
        case "一级护理":
          {
            this.$parent.bedList = this.type1;
          }
          break;
        case "二级护理":
          {
            this.$parent.bedList = this.type2;
          }
          break;
        case "三级护理":
          {
            this.$parent.bedList = this.type3;
          }
          break;
        case "病危":
          {
            this.$parent.bedList = this.bw;
          }
          break;
        case "病重":
          {
            this.$parent.bedList = this.bz;
          }
          break;
        case "过敏":
          {
            this.$parent.bedList = this.gm;
          }
          break;
        case "我的关注":
          {
            this.$parent.bedList = this.heart;
          }
          break;
        case "预出院":
          {
            this.$parent.bedList = this.isTodayDischarge;
          }
          break;
        case "明日出院":
          {
            this.$parent.bedList = this.isTommorowDischarge;
          }
          break;
        case "今日手术":
          {
            this.$parent.bedList = this.isTodayOperation;
          }
          break;
        case "明日手术":
          {
            this.$parent.bedList = this.isTommorowOperation;
          }
          break;
        case "新入":
          {
            this.$parent.bedList = this.isToadyHosipital;
          }
          break;
        case "跌倒高风险":
          {
            this.$parent.bedList = this.dangerInMorse;
          }
          break;
        case "压疮高风险":
          {
            this.$parent.bedList = this.dangerInYachuang;
          }
          break;
        case "已有压疮":
          {
            this.$parent.bedList = this.hasYachuang;
          }
          break;
      }
    }
  },
  created() {
    this.getDate();
  },
  components: { footerBar }
};
</script>
