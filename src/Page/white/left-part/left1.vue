<template>
  <div>
    <boxBase title="病区动态" :icon="require('../images/病区动态.png')">
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <div
          v-for="(item, key) in whiteBoardDtos"
          :key="key"
        >
         <!-- v-if="!(item.showOrHide && !item.configureValue && (!item.boardConfigures || (item.boardConfigures && item.boardConfigures.length == 0)))" -->
          <template  v-if="['nfyksdyy'].includes(HOSPITAL_ID) && item.customItem ? item.customItem : !(item.showOrHide && !item.configureValue && (!item.boardConfigures || (!otherHisList.includes(HOSPITAL_ID) && item.boardConfigures && item.boardConfigures.length == 0)))">
            <lineBox :dataKey="`${item.name}`" :keyStyle="keyStyle" v-if="item.customItem">
              <span slot="value-con">
                <div class="save-con">
                  <el-input
                    type="textarea"
                    class="customItem-input"
                    autosize
                    placeholder="请输入内容"
                    v-model="item.configureValue"
                  ></el-input>
                  <el-button
                    @click="updateBoardConfigure(item.name,item.configureValue, item)"
                    size="mini"
                    type="primary"
                    :disabled="_whiteBoardDtos[key].configureValue == item.configureValue"
                  >保存</el-button>
                </div>
              </span>
            </lineBox>
            <lineBox
              :dataKey="`${item.name}（${filterList(item).length}）`"
              :keyStyle="keyStyle"
              v-else-if="showRow(key)"
            >
              <span slot="value-con">
                <span
                  v-for="(option, index) in item.boardConfigures"
                  :key="index"
                  :style="[item.verticalShow && {display: 'block'}, item.name === '借他科床' && moment(option.admissionDateTime).format('YYYY-MM-DD') ===moment().format('YYYY-MM-DD') && {color: 'red'}]"
                  @click="openInfoModal(option, item.name)"
                  class="item-con"
                  v-show="showOrderType(option, item)"
                >
                  <span>
                    <span v-show="item.bedLabelShow">{{HOSPITAL_ID !== 'guizhou' ? option.bedLabel + '床' : (item.name === '今日换床' ? option.oldbedLabel + '床' + '转至' + option.bedLabel + '床' : option.bedLabel + '床')}}</span>
                    <span v-show="item.nameShow">{{option.name}}</span>
                  </span>
                  <!-- <span v-if="item.diagnosisShow">({{option.expand}})</span> -->
                  <!-- <span v-if="item.addExpand && option[item.addExpand]">({{option[item.addExpand]}})</span> -->
                  <span v-if="option.addExpand">({{option.addExpand}})</span>
                  <span
                    v-if="!item.verticalShow"
                  >{{((index == (item.boardConfigures.length - 1)) ? '' : '、' )}}</span>
                </span>
              </span>
            </lineBox>
          </template>
        </div>
        <nullText v-if="whiteBoardDtos.length == 0" style="margin: 100px 0"></nullText>
        <!-- <lineBoxNull :keyStyle="keyStyle" :num="list.allName && (list.allName.split(',').length - list.configure.split(',').length)"></lineBoxNull> -->
      </div>
      <span slot="head-tool" v-if="HOSPITAL_ID === 'guizhou'|| HOSPITAL_ID === 'xiegang'" @click="openPrintModal" style="margin-right: 10px;">打印</span>
      <span slot="head-tool" @click="openConfigModal">显示配置项</span>
    </boxBase>
    <configModal ref="configModal"></configModal>
    <infoModal ref="infoModal"></infoModal>
    <editBlockModal ref="editBlockModal"></editBlockModal>
    <left1PrintModal ref="left1PrintModal"></left1PrintModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con {
  margin: 0;
  min-height: 220px;
  overflow: auto;
}

.item-con {
  cursor: pointer;
}

.customItem-input {
  width: 100%;

  >>>.el-textarea__inner {
    padding: 0;
    border: 0;
    outline: none;
    resize: none;
  }
}

.save-con {
  padding-right: 80px;
  position: relative;

  button {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: 30px;
  }
}
</style>
<script>
import boxBase from "../base/box-base.vue";
import lineBox from "../components/line-box/line-box.vue";
import lineBoxNull from "../components/line-box/line-box-null.vue";
import configModal from "../modal/config-modal.vue";
import infoModal from "../modal/info-modal.vue";
import { getWardLog, updateBoardConfigure, getCatheterBlock } from "../api";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import nullText from "@/components/null/null-text.vue";
import editBlockModal from "../modal/edit-block-modal";
import moment from "moment";
import left1PrintModal from '../modal/left1-print-modal.vue'

export default {
  mixins: [common],
  data() {
    return {
      moment,
      bus: bus(this),
      pageLoading: false,
      whiteBoardDtos: [],
      _whiteBoardDtos: [],
      boardConfigures: [],
      keyStyle: {
        textAlign: "left",
        width: "160px",
        boxSizing: "border-box",
        paddingLeft: "20px"
      },
      otherHisList:["nanfangzhongxiyi"],//不需要过滤患者为空的类型医院
    };
  },
  created() {
    this.bus.$on("indexGetAllData", this.getData);
  },
  methods: {
    // 贵州-打印 谢岗-打印
    openPrintModal() {
      let data = this.whiteBoardDtos.filter(item => {
        if (!(item.showOrHide && !item.configureValue && (!item.boardConfigures || (item.boardConfigures && item.boardConfigures.length == 0))))
          return item
      })
      this.$refs.left1PrintModal.getPrintData(data);
    },
    getData() {
      this.pageLoading = true;
      getWardLog(this.deptCode).then(res => {
        if(this.HOSPITAL_ID=='huadu'){
          let arr = res.data.data[0].whiteBoardDtos;
          arr.map(item=>{
            let boardConfigures = [],newBoardConfigures = [];
            newBoardConfigures = item.boardConfigures.filter(child=>{
              if(!boardConfigures.includes(child.patientId)){
                boardConfigures.push(child.patientId);
                return child;
              }
            })
            item.boardConfigures = newBoardConfigures;
          })
          this.whiteBoardDtos = arr;
          this._whiteBoardDtos = JSON.parse(
            JSON.stringify(arr)
          );
        }else {
          this.whiteBoardDtos = res.data.data[0].whiteBoardDtos;
          this._whiteBoardDtos = JSON.parse(
            JSON.stringify(res.data.data[0].whiteBoardDtos)
          );
          console.log( this.whiteBoardDtos, 'dddddddddddddddddddddd');
        }
        this.boardConfigures = res.data.data[0].boardConfigures;
        this.pageLoading = false;
      });
    },
    showRow(key) {
      if (key == "boardConfigureList" || key == "科室名字") {
        return false;
      } else {
        return true;
      }
    },
    openConfigModal() {
      this.$refs.configModal.open(this.boardConfigures);
    },
    async openInfoModal(item, name) {
      if (name == "尿管更换" || name == "胃管更换") {
        let res = await getCatheterBlock(
          item.patientId,
          item.visitId,
          item.orderNo,
          item.orderSubNo,
          item.startDateTime,
          item.id
        );
        let block = res.data.data;
        this.$refs.editBlockModal.open(block, false);
      } else {
        this.$refs.infoModal.open(item);
      }
    },
    updateBoardConfigure(configure, configureValue, td) {
      let data = {
        boardConfigures: [
          {
            configure,
            configureValue
          }
        ],
        deptCode: this.deptCode
      };
      updateBoardConfigure(data).then(res => {
        this.$message.success("保存成功");
        this.getData();
        // td.configureValue = res.data.data[0].configureValue;
      });
    },
    showOrderType(option, item) {
      let strategy = {
        "0": "全部",
        "1": "临时",
        "2": "长期"
      };
      if (!item.orderTypeShow || item.orderTypeShow == "0") {
        return true;
      } else {
        return option.orderType == strategy[item.orderTypeShow];
      }
    },
    filterList(item) {
      return item.boardConfigures.filter(option => {
        let strategy = {
          "0": "全部",
          "1": "临时",
          "2": "长期"
        };
        if (!item.orderTypeShow || item.orderTypeShow == "0") {
          return true;
        } else {
          return option.orderType == strategy[item.orderTypeShow];
        }
      });
    }
  },
  components: {
    boxBase,
    lineBox,
    lineBoxNull,
    configModal,
    infoModal,
    nullText,
    editBlockModal,
    left1PrintModal
  }
};
</script>
