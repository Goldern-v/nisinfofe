<template>
  <div class="patient-list-part">
    <el-input placeholder="床号/姓名" icon="search" class="search-box" v-model="searchWord"></el-input>
    <div class="patient-list-contain">
      <div
        class="patient-box"
        flex="cross:center"
        v-for="item in sortList"
        :key="item.patientId"
        @click="selectPatient(item)"
        :class="{active: isActive(item)}"
      >
        <img src="./images/男默认头像.png" alt class="img" v-if="item.sex == '男'">
        <img src="./images/女士默认头像.png" alt class="img" v-else>
        <div class="name" flex-box="1">{{item.name}}</div>
        <div class="bed">{{item.bedLabel}} 床</div>
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

  .patient-box {
    padding: 6px 10px;
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
</style>
<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      searchWord: ""
    };
  },
  methods: {
    selectPatient(item) {
      this.$store.commit("upPatientInfo", item);
    },
    isActive(item) {
      return item.patientId == this.$store.state.sheet.patientInfo.patientId;
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
    }
  },
  created() {
    this.$store.commit("upPatientInfo", {});
  },
  components: {}
};
</script>
