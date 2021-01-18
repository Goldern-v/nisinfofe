<template>
  <div :class="{'bed-hd': HOSPITAL_ID == 'huadu'}">
    <div class="right-part">
      <search-con ref="searchCon"></search-con>
    </div>
    <!-- :style="{height: bedHeight}" -->
    <div
      class="left-part"
      v-loading="loading"
      :element-loading-text="getLoadingText()"
      :style="'position: relative;height:auto;min-height:'+bedHeight"
    >
      <el-row :gutter="12" class="card-con">
        <div class="null-bg" v-if="bedList.length == 0 && !loading">
          <img src="../../../../common/images/card/默认图.png" height="220" width="220" />
          <p>暂时没有护理单元～</p>
        </div>
        <component :is="currentBedItem" v-for="(item, index) in bedList"
          :key="index"
          :data="item"
          :toLike="toLike"
          :toInfo="toInfo"
          :prevent="prevent"
          v-show="filterSearch(item)">
        </component>
      </el-row>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.left-part {
  margin-right: 160px;
  overflow: auto;
  overflow-x: hidden;
  position: relative;
  // z-index 10
}

.card-con {
  padding: 5px 10px 50px;
}

.right-part {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 160px;
  background: #fff;
  border-left: 1px solid #D4DADE;
  z-index: 2;
  top: 62px;
}

.null-bg {
  img {
    display: block;
    width: 217px;
    height: 217px;
    margin: 110px auto 0;
  }

  p {
    font-size: 18px;
    color: #B3BEC6;
    text-align: center;
    margin-top: 32px;
  }
}
.bed-hd {
  .card-con {
    padding: 15px 15px 50px;
  }
  .left-part {
    margin-right: 240px;
  }
  .right-part {
    width: 240px;
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.custorm-tip {
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(189, 195, 196, 1);

  .head {
    font-size: 13px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-left: 4px solid rgba(75, 176, 141, 1);
    padding-left: 6px;
    margin-bottom: 10px;
    line-height: 13px;
    font-weight: bold;
  }

  .desc {
    font-size: 12px;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
  }
}
.bed-hd {
  .footer-con {
    right: 240px !important;
  }
}
</style>

<script>
import { follow, unfollow, unfollowHd } from "@/api/lesion";
import bedItem from "./component/bed-item/bed-item.vue";
import bedItemHd from "./component/bed-item-hd/bed-item.vue";
import searchCon from "./component/search-con/search-con.vue";
import common from "@/common/mixin/common.mixin.js";
import qs from "qs";
export default {
  mixins: [common],
  data() {
    return {
      searchWord: "",
      bedList: [],
      loading: false
    };
  },
  computed: {
    likeList() {
      return this.bedList.filter(item => {
        return item.isFollow === "1";
      });
    },
    deptCode() {
      return this.$store.state.lesion.deptCode;
    },
    bedHeight() {
      return this.wih - 93 + "px";
    },
    currentBedItem(){
      if(this.HOSPITAL_ID == 'huadu'){
        return bedItemHd;
      }else {
        return bedItem;
      }
    }
  },
  filters: {
    dayNum(value) {
      function DateDiff(sDate1, sDate2) {
        var aDate, oDate1, oDate2, iDays;
        aDate = sDate1.split("-");
        oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
        return iDays;
      }
      let day = DateDiff(
        new Date().Format("yyyy-MM-dd"),
        new Date(value).Format("yyyy-MM-dd")
      );
      return `${value} 第(${day})天`;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleIconClick(tab, event) {
      console.log(tab, event);
    },
    toLike(item) {
      if (item.isFollow === "0") {
        follow(this.deptCode, item.bedLabel, item.bedNo).then(res => {
          item.isFollow = "1";
          this.$message({
            message: "关注该床位成功",
            type: "success"
          });
        });
      }
      if (item.isFollow === "1" && this.HOSPITAL_ID == 'huadu') {
        unfollowHd(this.deptCode,item.bedNo).then(res => {
          item.isFollow = "0";
        });
      }else if (item.isFollow === "1") {
        unfollow(item.bedLabel).then(res => {
          item.isFollow = "0";
        });
      }
    },
    filterSearch(item) {
      let searchWord = this.$refs.searchCon.searchText;
      if (searchWord == "") return true;
      if (!item.name) {
        if (item.bedLabel.indexOf(searchWord) > -1) {
          return true;
        } else {
          return false;
        }
      }
      if (
        item.bedLabel.indexOf(searchWord) > -1 ||
        item.name.indexOf(searchWord) > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    prevent(item, e) {
      if (!item.name) {
        this.$message({
          showClose: true,
          message: "这是空床位",
          type: "warning"
        });
        e.preventDefault();
      }
    },
    toInfo(item) {
      if (!item.name) {
        this.$message({
          showClose: true,
          message: "这是空床位",
          type: "warning"
        });
        return;
      }
      let obj = {};
      for (let i in item) {
        if (item[i] && item.hasOwnProperty(i) && typeof item[i] !== "object") {
          obj[i] = item[i];
        }
      }
      // this.$router.push({
      //   path: '/home',
      //   query: obj
      // })
      window.open(
        `/crNursing/home?${qs.stringify({
          patientId: obj.patientId,
          visitId: obj.visitId
        })}`
      );
    }
  },
  components: {
    bedItem,
    searchCon,
    bedItemHd
  }
};
</script>
