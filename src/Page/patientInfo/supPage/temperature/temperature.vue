<template>
  <div>
    <div class="contain">
      <div flex="corss:center main:center" style="margin: 20px 0 18px">
        <div class="tool-btn" @click="pageIndex = 0">第一页</div>
        <div class="tool-btn" :class="{disable: pageIndex == 0}" @click="sub">上一页</div>
        <div class="page-num">{{pageIndex + 1}}/{{pageList.length }}</div>
        <div class="tool-btn" :class="{disable: pageIndex == pageList.length - 1}" @click="add">下一页</div>
        <div class="tool-btn" @click="pageIndex = pageList.length - 1">最后一页</div>
      </div>
      <div class="tem-con" v-loading="pageList.length > 0 && !filePath">
        <null-bg v-show="!filePath"></null-bg>
        <img v-if="filePath && HOSPITAL_ID == 'gy'" :src="filePath" alt />
        <iframe
          v-if="filePath && HOSPITAL_ID != 'gy'"
          :src="filePath"
          frameborder="0"
          @load="onload"
          ref="pdfCon"
          :style="{height: pdfHeight + 'px'}"
          v-loading="true"
        ></iframe>
      </div>
      <div flex="corss:center main:center" style="margin: 20px 0 18px">
        <div class="tool-btn" @click="pageIndex = 0">第一页</div>
        <div class="tool-btn" :class="{disable: pageIndex == 0}" @click="sub">上一页</div>
        <div class="page-num">{{pageIndex + 1}}/{{pageList.length }}</div>
        <div class="tool-btn" :class="{disable: pageIndex == pageList.length - 1}" @click="add">下一页</div>
        <div class="tool-btn" @click="pageIndex = pageList.length - 1">最后一页</div>
      </div>
      <div class="date-select-box" flex="cross:center">
        <span style="width: 100px">体温单日期：</span>
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <!-- <div class="print-btn tool-btn">打印</div> -->
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 20px 20px 0;
  position: relative;

  .tem-con {
    margin: 0 auto;
    width: 640px;
    padding: 10px;
    min-height: 700px;
    background: #fff;

    iframe, img {
      width: 100%;
      height: 100%;
    }
  }

  .date-select-box {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    white-space: nowrap;
    color: #687179;
    width: 220px;

    >>>.el-input {
      // width 135px
      position: relative;
    }

    >>>.el-input__inner {
      height: 30px;
      width: 100px;
      width: 135px;
      border: 1px solid #C2CBD2;
      border-radius: 4px;
      margin-left: 5px;
    }
  }
}

.tool-btn {
  width: 82px;
  height: 32px;
  background: #FFFFFF;
  border: 1px solid #C2CBD2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  margin: 0 5px;

  &:hover {
    color: #4BB08D;
    border-color: #4BB08D;
    cursor: pointer;
  }

  &.disable {
    color: #b5b5b5;
    border-color: #b5b5b5;
    cursor: not-allowed;
  }
}

.page-num {
  font-size: 17px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 34px;
  margin: 0 10px;
}

.print-btn {
  position: fixed;
  right: 20px;
  top: 70px;
}
</style>

<script>
import { getTemperatue } from "@/api/temperature";
import nullBg from "../../../../components/null/null-bg";
import moment from "moment";
export default {
  data() {
    return {
      date: "",
      pageLoading: false,
      pickerOptions: {},
      filePath: "",
      pdfHeight: 1000,
      pageList: [],
      pageIndex: null
    };
  },
  methods: {
    getImg() {
      let date = new Date(this.date).Format("yyyy-MM-dd");
      getTemperatue(
        this.$route.query.patientId,
        this.$route.query.visitId,
        date
      ).then(res => {
        this.filePath =
          this.HOSPITAL_ID == "lingcheng" || this.HOSPITAL_ID == "huadu"
            ? res.data.data.expand
            : res.data.data.filePath;
      });
    },
    onload() {
      // let wid = this.$refs.pdfCon.contentWindow
      // this.pdfHeight = wid.body.scrollHeight
    },
    add() {
      if (this.pageIndex < this.pageList.length - 1) {
        this.pageIndex++;
      }
    },
    sub() {
      if (this.pageIndex > 0) {
        this.pageIndex--;
      }
    }
  },
  watch: {
    date() {
      this.getImg();
    },
    pageIndex() {
      this.date = this.pageList[this.pageIndex];
    }
  },
  mounted() {
    let admissionDate = this.$route.query.admissionDate;
    let currDate = moment(admissionDate).add(0, "d");
    while (currDate.isBefore(moment(), "d") || currDate.isSame(moment(), "d")) {
      this.pageList.push(moment(currDate).format("YYYY-MM-DD"));
      currDate = moment(currDate).add(7, "d");
    }
    this.pageIndex = 0;
  },
  components: {
    nullBg
  }
};
</script>
