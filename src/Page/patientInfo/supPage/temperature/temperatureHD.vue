<template>
  <div>
    <div class="contain">
      <div class="date-select-box" flex="cross:center">
        <span style="width: 100px">体温单日期：</span>
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="tem-con" v-loading="pageList.length > 0 && !filePath" :style="contentHeight">
        <null-bg v-show="!filePath"></null-bg>
        <iframe
          id = "ifrID"
          v-if="filePath"
          :src="filePath"
          frameborder="0"
          @load="onload"
          ref="pdfCon"
          :class="HOSPITAL_ID === 'huadu'?'hdIframe':''"
          v-loading="false"
        ></iframe>
      </div>
      <!-- <div class="print-btn tool-btn">打印</div> -->
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 15px 20px 0;

  .tem-con {
    margin: 0px auto;
    width: 90%;
    height: 100%;
    background: #fff;
    .hdIframe{
      transform:scale(0.9);
      width: 100%;
      height: 100%;
    }
  }

  .date-select-box {
    position: relative;
    top : 0px;
    left: 0;
    font-size: 12px;
    white-space: nowrap;
    color: #687179;
    width: 220px;
    margin-bottom :10px;

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

.print-btn {
  position: fixed;
  right: 20px;
  top: 70px;
}
</style>

<script>
// import { getTemperatue } from "@/api/temperature";
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
      pageIndex: null,
      contentHeight:{height:''}
    };
  },
  methods: {
    getImg() {
      let date = new Date(this.date).Format("yyyy-MM-dd");
      let patientId = this.$route.query.patientId;
      let visitId = this.$route.query.visitId;
      // const tempUrl = `http://120.238.239.27:9091/temperature/#/?PatientId=72081255&VisitId=1&StartTime=2020-12-01`
      const tempUrl = `http://120.238.239.27:9091/temperature/#/?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`
      this.filePath = ''
      setTimeout(()=>{
        this.filePath = tempUrl
      },0)

    },
    onload() {
      // let wid = this.$refs.pdfCon.contentWindow
      // this.pdfHeight = wid.body.scrollHeight
    },
    getHeight(){
      this.contentHeight.height = window.innerHeight -130+'px'
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
  mounted(){
    let admissionDate = this.$route.query.admissionDate;
    let currDate = moment(admissionDate).add(0, "d");
    while (currDate.isBefore(moment(), "d") || currDate.isSame(moment(), "d")) {
      this.pageList.push(moment(currDate).format("YYYY-MM-DD"));
      currDate = moment(currDate).add(7, "d");
    }
    this.pageIndex = 0;
  },
  created(){
    window.addEventListener('resize',this.getHeight)
    this.getHeight()
  },
  components: {
    nullBg
  }
};
</script>
