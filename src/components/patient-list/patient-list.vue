<template>
  <div class="patient-list-part" :style="{left: openLeft?'0':'-201px'}">
    <el-input placeholder="床号/姓名" icon="search" class="search-box" v-model="searchWord"></el-input>
    <div class="left-wapper">
      <div class="patient-list-contain">
        <div
          class="patient-box"
          flex="cross:center"
          v-for="item in sortList"
          :key="item.patientId+item.visitId+item.bedLabel"
          @click="selectPatient(item)"
          :class="{active: isActive(item)}"
        >
          <img
            :src="item.bedLabel.includes('_')?imageBoy:imageMan"
            alt
            :class="{img1:img1Show,img2:img2Show}"
            v-if="item.sex == '男'"
          />
          <img
            :src="item.bedLabel.includes('_')?imageGirl:imageWomen"
            alt
            :class="{img1:img1Show,img2:img2Show}"
            v-else
          />
          <div class="name" flex-box="1">{{item.name}}</div>
          <div class="bed">{{item.bedLabel}} 床</div>

          <span
            class="point-box"
            v-if="$route.path == '/formPage'"
            v-show="item.formLowestStatus !== '' && item.formLowestStatus != '2'"
            :class="{red: item.formLowestStatus == 0, green: item.formLowestStatus == 1,isImg2: img2Show}"
          ></span>
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
  height: auto;
  box-sizing: border-box;
  padding-top: 45px;
  position: relative;
  border-right: 1px solid #CBD5DD;
  position: relative;
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  background: #fff;
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
    font-size: 13px;
    border-radius: 3px;
    margin: 1px 0;
    position: relative;

    .img1 {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 11px;
    }

    .img2 {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 11px;
      margin-left: -11px;
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
  top: 10px;
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
  background-image: url('../../common/images/patient/隐藏框.png');
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
  height: calc(100vh - 114px);
}

.point-box {
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 1px solid #EAEEF1;
  margin-left: 5px;
  border-radius: 50%;
  position: absolute;
  left: 25px;
  top: 3px;

  &:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  &.red:after {
    background: #E62C2C;
  }

  &.green:after {
    background: #27A45E;
  }

  &.isImg2 {
    left: 14px;
  }
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
export default {
  props: {
    data: Array,
    isSelectPatient: Function
  },
  mixins: [common],
  data() {
    return {
      searchWord: "",
      bus: bus(this),
      img1Show: true,
      img2Show: false,
      selectPatientId: "",
      imageBoy: require("./images/男婴.png"),
      imageGirl: require("./images/女婴.png"),
      imageMan: require("./images/男.png"),
      imageWomen: require("./images/女.png")
    };
  },
  methods: {
    selectPatient(item) {
      this.selectPatientId = item.patientId;
      if(this.isSelectPatient){
        this.isSelectPatient(item);
      }
    },
    isActive(item) {
      return item.patientId == this.selectPatientId; //this.$route.query.patientId;
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
            cacheList[i].bedLabel !== cacheList[j].bedLabel &&
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
        this.img1Show = false;
        this.img2Show = true;
      } else {
        this.img1Show = true;
        this.img2Show = false;
      }
    }
  },
  create() {},
  mounted() {
    if (this.deptCode == "051102") {
      this.img1Show = false;
      this.img2Show = true;
    }
  },
  components: {}
};
</script>
