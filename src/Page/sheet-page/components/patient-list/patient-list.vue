<template>
  <div class="patient-list-part">
    <el-input placeholder="床号/姓名" icon="search" class="search-box" v-model="searchWord"></el-input>
    <div :style="{left: openLeft?'0':'-201px'}" class="left-wapper">
      <div class="patient-list-contain">
        <div
          class="patient-box"
          flex="cross:center"
          v-for="item in sortList"
          :key="item.patientId"
          @click="selectPatient(item)"
          :class="{active: isActive(item)}"
        >
          <span v-if="imgShow">
            <img
              :src="item.age.indexOf('天')>-1?imageBoy:imageMan"
              alt
              class="img"
              v-if="item.sex == '男'"
            />
            <img :src="item.age.indexOf('天')>-1?imageGirl:imageWomen" alt class="img" v-else />
          </span>
          <div class="name" flex-box="1">{{item.name}}</div>
          <div class="bed">{{item.bedLabel}} 床</div>
        </div>
      </div>
      <div
        class="flag-con"
        :style="{top: flagTop}"
        flex="main:center cross:center"
        @click="toOpenLeft"
      >
        <i class="iconfont icon-yincang" v-show="openLeft" style="margin-left: -1px"></i>
        <i class="iconfont icon-xianshi" v-show="!openLeft" style="margin-left: -2px"></i>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-list-part {
  height: 100%;
  box-sizing: border-box;
  padding-top: 11px;
  position: relative;
  border-right: 1px solid #CBD5DD;
}

.patient-list-contain {
  padding: 0px 13px 11px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  cursor: pointer;
  position: relative;

  .patient-box {
    padding: 6px 6px;
    height: 25px;
    font-size: 13px;
    border-radius: 3px;
    margin: 1px 0;

    .img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 11px;
    }

    .name {
      color: #687179;
    }

    .bed {
      color: #333333;
    }

    &:hover {
      background: #F7F7FA;
    }

    &.active {
      background: #F1F1F5;
      font-weight: bold;

      .name {
        color: #333333;
      }
    }
  }
}

.search-box {
  position: absolute;
  top: -35px;
  left: 15px;
  width: 168px;

  >>>&.el-input {
    margin-bottom: 5px;
  }

  >>>.el-input__inner {
    height: 28px;
    outline: none;
    padding-left: 10px;
    background: #fff;
    border-radius: 4px;
    font-size: 12px !important;
    color: #333;
  }
}

.flag-con {
  width: 10px;
  height: 73px;
  position: absolute;
  right: -11px;
  top: 100px;
  z-index: 10;
  background-image: url('../../../../common/images/patient/隐藏框.png');
  cursor: pointer;

  &:hover {
    color: #5CC6A1;
  }

  i {
    font-size: 12px;
  }
}

.left-wapper {
  position: relative;
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  height: calc(100vh - 114px);
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import sheetInfo from "../config/sheetInfo";
export default {
  props: {
    data: Array
  },
  mixins: [common],
  data() {
    return {
      searchWord: "",
      sheetInfo,
      imgShow: true,
      imageBoy: require("./images/男婴.png"),
      imageGirl: require("./images/女婴.png"),
      imageMan: require("./images/男.png"),
      imageWomen: require("./images/女.png")
    };
  },
  methods: {
    selectPatient(item) {
      this.$store.commit("upPatientInfo", item);
    },
    isActive(item) {
      return item.patientId == this.$store.state.sheet.patientInfo.patientId;
    },
    toOpenLeft() {
      this.$store.commit("upOpenSheetLeft", !this.openLeft);
    }
  },
  computed: {
    list() {
      return this.data.filter(item => {
        return (
          item.bedLabel.indexOf(this.searchWord) > -1 ||
          item.name.indexOf(this.searchWord) > -1
        );
      });
    },
    //排序对应婴儿数据
    sortList() {
      let cacheGetList = [];
      let endList = [];
      let cacheList = JSON.parse(JSON.stringify(this.list));
      for (let i = 0; i < cacheList.length; i++) {
        // 736
        // let cacheSign = cacheList[i].name.indexOf("婴");
        let cacheSign;
        if (cacheList[i].name.charAt(cacheList[i].name.length - 1) === "婴") {
          cacheSign = cacheList[i].name.indexOf("婴");
        }
        if (cacheSign > -1) {
          cacheList[i].babyName = cacheList[i].name.substring(cacheSign);
          cacheList[i].name = cacheList[i].name.substring(0, cacheSign);
          if(cacheList[i].bedLabel.split('_').length>1){
            cacheList[i].bedLabel = cacheList[i].bedLabel.split('_')[0];
          }
        }
        cacheList[i].cacheNum = i;
      }
      let sortData = [];
      for (let i = 0; i < cacheList.length; i++) {
        let filter1Array = [];
        let sortFliter = [];
        let cacheData = [];
        if (!cacheList[i].babyName) {
          sortFliter.push(cacheList[i]);
        }
        for (let j = 0; j < cacheList.length; j++) {
          if (
            !cacheList[i].babyName &&
            cacheList[i].patientId !== cacheList[j].patientId &&
            cacheList[i].bedLabel == cacheList[j].bedLabel &&
            cacheList[i].name === cacheList[j].name &&
            cacheList[j].babyName == "婴"
          ) {
            filter1Array.push(cacheList[j]);
          }
        }
        cacheData = sortFliter.concat(filter1Array);
        sortData = sortData.concat(cacheData);
      }
      let putSortList = [];
      sortData.forEach((item, index) => {
        putSortList[index] = this.list[item.cacheNum];
      });
      return putSortList;
    },

    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    flagTop() {
      return `${this.wih * 0.4}px`;
    }
  },
  watch: {
    deptCode(ndata, odata) {
      if (ndata == "051102") {
        this.imgShow = false;
      } else {
        this.imgShow = true;
      }
    }
  },
  created() {
    this.$store.commit("upPatientInfo", {});
  },
  mounted() {
    if (this.deptCode == "051102") {
      this.imgShow = false;
    }
  },
  components: {}
};
</script>
