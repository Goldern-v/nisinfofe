/*
江门妇幼-PICU监护单
 */
<template>
  <div>
    <div
      class="contant sheetTable-picc_custody_jm"
      :style="data.titleModel.style"
      :class="{ readOnly }"
    >
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/厚街医徽.png" />-->
      <img
        src="../../images/仅供查阅.jpg"
        class="readOnly-img no-print"
        v-if="readOnly"
        alt
      />
      <div class="header-con">
        <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
        <div class="title">{{ patientInfo.recordName }}</div>
        <div class="info-con" flex="main:justify">
          <!-- <span>
            科室：{{ patientInfo.realDeptName }}
          </span> -->
          <!-- <span>
            床号：{{ patientInfo.bedLabel }}
          </span> -->
          <span>
            床号：
            <span :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
              {{ patientInfo.bedLabel }}
            </span>
          </span>
          <span>
            姓名： {{ patientInfo.patientName }}
          </span>
           <span>
            性别：{{ patientInfo.sex }}
          </span>
          <span>
            年龄：{{ patientInfo.age }}
          </span>
          <span>
            住院号：{{ patientInfo.patientId }}
          </span>
          <span>
            入院日期：{{ patientInfo.admissionDate | toymd }}
          </span>
          <span @click="updateSurgeryDate('surgeryDate', '手术日期', patientInfo.surgeryDate)"> 
            手术日期：
            <div
              class="bottom-line1"
              style="
                display:inline-block;
                width: 120px;
                max-width: 200px;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ surgeryDate | toymd }}
            </div>
          </span>
        </div>
        <table>
          <!-- <colgroup>
            <col v-for="i in 19" :key="i" width="5%"/>
          </colgroup> -->
          <tbody> 
            <tr>
              <td style="width:205px">
                <div class="boxLine">
                  <div class="boxTitle">呼吸机型号：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:97%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.hxjxh"
                      :data-value="sheetInfo.relObj.hxjxh"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <div class="boxTitle">气管插管经：</div>
                  <input type="radio" style="margin-left:-5px;" value="口" :ischecked="sheetInfo.relObj.qgcgj == '口'" v-model="sheetInfo.relObj.qgcgj">口
                  <input type="radio" value="鼻" :ischecked="sheetInfo.relObj.qgcgj == '鼻'" v-model="sheetInfo.relObj.qgcgj">鼻
                  <div class="boxTitle" style="margin-left:5px;">口径：</div>
                  <input
                    type="textarea"
                    style="width:30px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj.kj"
                    :data-value="sheetInfo.relObj.kj"
                  />
                </div>
                <div class="boxLine">
                  <div class="boxTitle">深度：</div>
                  <input
                    type="textarea"
                    style="width:45px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj.sd"
                    :data-value="sheetInfo.relObj.sd"
                  />mm
                </div>
                <div class="boxLine">
                  <div class="boxTitle">气囊：</div>
                  <input type="radio" style="margin-left:-5px;" value="有" v-model="sheetInfo.relObj.qn" :ischecked="sheetInfo.relObj.qn == '有'">有
                  <input type="radio" value="无" v-model="sheetInfo.relObj.qn" :ischecked="sheetInfo.relObj.qn == '无'">无
                  <div class="boxTitle" style="margin-left:5px;">气囊压：</div>
                  <input
                    type="textarea"
                    style="width:25px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj.qny"
                    :data-value="sheetInfo.relObj.qny"
                  />cmH2o
                </div>
                <div style="margin-left:1px;">
                  <textarea style="cursor:text" v-model="sheetInfo.relObj.xpwz" :data-value="sheetInfo.relObj.xpwz" @input="(e)=>onXpChang(e)"></textarea>
                </div>
              </td>
              <td style="width:180px">
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="鼻氧管"
                    :ischecked="sheetInfo.relObj.byg"
                    v-model="checkedbyg"
                  />鼻氧管
                  <input
                    type="checkbox"
                    value="面罩"
                    :ischecked="sheetInfo.relObj.mz"
                    v-model="checkedmz"
                  />面罩
                  <input
                    type="checkbox"
                    value="头罩"
                    :ischecked="sheetInfo.relObj.tz"
                    v-model="checkedtz"
                  />头罩
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="胃管"
                    :ischecked="sheetInfo.relObj.wg"
                    v-model="checkedwg"
                  />胃管
                  <input
                    type="checkbox"
                    value="胃肠减压"
                    :ischecked="sheetInfo.relObj.wcjy"
                    v-model="checkedwcjy"
                  />胃肠减压
                  <input
                    type="checkbox"
                    value="鼻肠管"
                    :ischecked="sheetInfo.relObj.bcg"
                    v-model="checkedbcg"
                  />鼻肠管
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="CVC"
                    :ischecked="sheetInfo.relObj.cvc"
                    v-model="checkedcvc"
                  />CVC
                  <input
                    type="checkbox"
                    value="PICC"
                    :ischecked="sheetInfo.relObj.picc"
                    v-model="checkedpicc"
                  />PICC
                  <input
                    type="checkbox"
                    value="血透管"
                    :ischecked="sheetInfo.relObj.xtg"
                    v-model="checkedxtg"
                  />血透管
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="外周留置针"
                    :ischecked="sheetInfo.relObj.wzlzz"
                    v-model="checkedwzlzz"
                  />外周留置针
                  <input
                    type="checkbox"
                    value="动脉置管"
                    :ischecked="sheetInfo.relObj.dmzg"
                    v-model="checkeddmzg"
                  />动脉置管
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="导尿管"
                    :ischecked="sheetInfo.relObj.dng"
                    v-model="checkeddng"
                  />导尿管
                  <input
                    type="checkbox"
                    value="闭式胸腔引流管"
                    :ischecked="sheetInfo.relObj.bsxqylg"
                    v-model="checkedbsxqylg"
                  />闭式胸腔引流管
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="其他"
                    :ischecked="sheetInfo.relObj.qita"
                    v-model="checkedqita"
                  />
                  <div class="boxTitle">其他：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:97%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.qitaInput"
                      :data-value="sheetInfo.relObj.qitaInput"
                    />
                  </div>
                </div>
              </td>
              <td style="width:240px">
                <div class="boxLine">
                  <div class="boxTitle">中心静脉导管穿刺部位：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:95%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.zxjmdgccbw"
                      :data-value="sheetInfo.relObj.zxjmdgccbw"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <div class="boxTitle">穿刺日期：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:100px;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.ccrq"
                      :data-value="sheetInfo.relObj.ccrq"
                      @keyup="(e)=>inputChange1(e)"
                    />
                  </div>
                  <div class="boxTitle">外露：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:37px;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.wl"
                      :data-value="sheetInfo.relObj.wl"
                    />
                  </div>
                </div>  
                <div class="boxLine">穿刺点：
                  <input
                    type="checkbox"
                    value="完好"
                    :ischecked="sheetInfo.relObj.wh"
                    v-model="checkedwh"
                  />完好
                  <input
                    type="checkbox"
                    value="渗血"
                    :ischecked="sheetInfo.relObj.sx"
                    v-model="checkedsx"
                  />渗血
                  <input
                    type="checkbox"
                    value="渗液"
                    :ischecked="sheetInfo.relObj.sy"
                    v-model="checkedsy"
                  />渗液
                  <input
                    type="checkbox"
                    value="皮疹"
                    :ischecked="sheetInfo.relObj.pz"
                    v-model="checkedpz"
                  />皮疹
                </div> 
                <div class="boxLine">管道：
                  <input
                    type="checkbox"
                    value="通畅"
                    :ischecked="sheetInfo.relObj.tc"
                    v-model="checkedtc"
                  />通畅
                  <input
                    type="checkbox"
                    value="阻塞"
                    :ischecked="sheetInfo.relObj.zs"
                    v-model="checkedzs"
                  />阻塞
                  <input
                    type="checkbox"
                    value="通畅但无回血"
                    :ischecked="sheetInfo.relObj.whx"
                    v-model="checkedwhx"
                  />通畅但无回血
                </div> 
                <div class="boxLine">护理：
                  <input
                    type="checkbox"
                    value="更换敷料"
                    :ischecked="sheetInfo.relObj.ghfl"
                    v-model="checkedghfl"
                  />更换敷料
                  <input
                    type="checkbox"
                    value="三通"
                    :ischecked="sheetInfo.relObj.st"
                    v-model="checkedst"
                  />三通
                  <input
                    type="checkbox"
                    value="输液接头"
                    :ischecked="sheetInfo.relObj.syjt"
                    v-model="checkedsyjt"
                  />输液接头
                </div> 
              </td>
              <td style="width:240px">
                <div class="boxLine">
                  <div class="boxTitle">动脉导管穿刺部位：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:96%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.dmdgccbw"
                      :data-value="sheetInfo.relObj.dmdgccbw"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <div class="boxTitle">穿刺日期：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:96%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.dmccrq"
                      :data-value="sheetInfo.relObj.dmccrq"
                      @keyup="(e)=>inputChange(e)"
                    />
                  </div>
                </div>  
                <div class="boxLine">周围循环：
                  <input
                    type="checkbox"
                    value="良好"
                    :ischecked="sheetInfo.relObj.lh"
                    v-model="checkedlh"
                  />良好
                  <input
                    type="checkbox"
                    value="不良"
                    :ischecked="sheetInfo.relObj.bl"
                    v-model="checkedbl"
                  />不良
                </div> 
                <div class="boxLine">穿刺点：
                  <input
                    type="checkbox"
                    value="完好"
                    :ischecked="sheetInfo.relObj.wh1"
                    v-model="checkedwh1"
                  />完好
                  <input
                    type="checkbox"
                    value="渗血"
                    :ischecked="sheetInfo.relObj.sx1"
                    v-model="checkedsx1"
                  />渗血
                  <input
                    type="checkbox"
                    value="渗液"
                    :ischecked="sheetInfo.relObj.sy1"
                    v-model="checkedsy1"
                  />渗液
                  <input
                    type="checkbox"
                    value="皮疹"
                    :ischecked="sheetInfo.relObj.pz1"
                    v-model="checkedpz1"
                  />皮疹
                </div> 
                <div class="boxLine">管道：
                  <input
                    type="checkbox"
                    value="通畅"
                    :ischecked="sheetInfo.relObj.tc1"
                    v-model="checkedtc1"
                  />通畅
                  <input
                    type="checkbox"
                    value="阻塞"
                    :ischecked="sheetInfo.relObj.zs1"
                    v-model="checkedzs1"
                  />阻塞
                  <input
                    type="checkbox"
                    value="通畅但无回血"
                    :ischecked="sheetInfo.relObj.whx1"
                    v-model="checkedwhx1"
                  />通畅但无回血
                </div> 
              </td>
              <td style="width:240px">
                <div class="boxLine">
                  <div class="boxTitle">体位与皮肤评估：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:96%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.twypfpg"
                      :data-value="sheetInfo.relObj.twypfpg"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="翻身"
                    :ischecked="sheetInfo.relObj.fs"
                    v-model="checkedfs"
                  />ql<sup>~</sup>2h翻身
                  <input
                    type="checkbox"
                    value="制动"
                    style="margin-left:5px;"
                    :ischecked="sheetInfo.relObj.zd"
                    v-model="checkedzd"
                  />制动
                  <input
                    type="checkbox"
                    value="俯卧位"
                    style="margin-left:5px;"
                    :ischecked="sheetInfo.relObj.fww"
                    v-model="checkedfww"
                  />俯卧位
                </div> 
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="去枕平卧"
                    :ischecked="sheetInfo.relObj.qzpw"
                    v-model="checkedqzpw"
                  />
                  <div class="boxTitle">去枕平卧（时间：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:85%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.qzpw1"
                      :data-value="sheetInfo.relObj.qzpw1"
                      @keyup="(e)=>inputChange2(e)"
                    />）
                  </div>
                </div> 
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="潮红"
                    :ischecked="sheetInfo.relObj.chbw"
                    v-model="checkedchbw"
                  />
                  <div class="boxTitle">潮红（部位：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:87%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.chbw1"
                      :data-value="sheetInfo.relObj.chbw1"
                    />）
                  </div>
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="皮损"
                    :ischecked="sheetInfo.relObj.psbw"
                    v-model="checkedpsbw"
                  />
                  <div class="boxTitle">皮损（部位：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:87%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj.psbw1"
                      :data-value="sheetInfo.relObj.psbw1"
                    />）
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <excel
          :data="data"
          :index="index"
          :length="length"
          :scrollY="scrollY"
          :hasFiexHeader="true"
          :isInPatientDetails="isInPatientDetails"
        >
        </excel>
      </div>
    </div>
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

.sheetTable-picc_custody_jm {
  & {
    border-radius: 2px;
    // position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 1100px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
    position: relative;
  }
  .boxLine {
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size:14px;
  }
  textarea {
    border: none;
    resize: none;
    cursor: pointer;
    outline:none;
    overflow:hidden; 
    resize:none;
    width: 98%;
    height: 55px;
    font-size: 16px;
  }
  .boxRight {
    flex: 1;
    margin-right: 5px; 
  }
  input[type='checkbox'] {
    -webkit-appearance: none;
    vertical-align: text-top;
    width: 14px;
    height: 14px;
    border: 1px solid #000;
    border-radius: 0px;
    outline: none;
    margin: 0 5px;
    cursor: pointer;
  }

  input[type='checkbox']:checked {
    font-size: 10;
    position: relative;
  }

  input[type='checkbox']:checked:before {
    content: '';
    width: 8px;
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    left: -2px;
    border-top: 2px solid blue;
  }

  input[type='checkbox']:checked:after {
    content: '';
    width: 14px;
    transform: rotate(-50deg) translateY(-50%) translateX(50%);
    position: absolute;
    border-top: 2px solid blue;
    top: 10px;
    left: -2px;
  }
  .header-con {
    text-align: center;

    .his-name {
      font-size: 18px;
      padding: 0 0px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    .title {
      font-size: 21px;
      padding: 5px 0 5px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    span {
      font-size: 14px;
      color: #000;
    }

    .info-con {
      margin: 8px 0;
      text-align: left;
    }
    table {
      width: 100%;
      text-align: left;
      margin-bottom: -16px;
      td {
        border: 1px solid #000;
        .boxTitle {
          height: 20px;
          line-height: 20px;
        }
        .bottomInput {
          border: none;
          outline: none;
          font-size: 14px;
          height: 20px;
        }
      }
    }
  }

  .add-btn {
    position: absolute;
    top: 60px;
    right: 20px;
  }

  .his-logo {
    position: absolute;
    left: 21px;
    top: 21px;
    height: 44px;
  }

  .diagnosis-con {
    max-width: 340px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.readOnly {
    pointer-events: none;
  }

  .readOnly-img {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .footer-data {
    display: flex;
    border: 1px solid #000;
    text-align: left;
    margin-top: 15px;
    padding: 2px;
    input {
      width: 70%;
      border: none;
      outline: none;
    }
  }
  

  .bottomCon {
    position: relative;
    bottom: 40px;
    // transform translateY(-30px)
    // margin-top:-80px;
    width: 100%;
    font-size: 14px;

    input[type='checkbox'] {
      position: relative;
    }

    input[type='checkbox'] {
      -webkit-appearance: none;
      vertical-align: text-top;
      width: 14px;
      height: 14px;
      border: 1px solid #000;
      border-radius: 0px;
      outline: none;
      margin: 1px 3px 0 0;
    }

    .isChecked {
      font-size: 10;
      position: relative;
    }

    .isChecked:before {
      content: '';
      width: 8px;
      transform: rotate(45deg);
      position: absolute;
      top: 7px;
      left: -2px;
      border-top: 2px solid #000;
    }

    .isChecked:after {
      content: '';
      width: 14px;
      transform: rotate(-50deg) translateY(-50%) translateX(50%);
      position: absolute;
      border-top: 1px solid #000;
      top: 10px;
      left: -2px;
    }

    .bottomInput {
      border: none;
      outline: none;
      border-bottom: 1px solid #000;
      font-size: 14px;
      width: 80px;
      text-align: center;
    }
  }

  .table-footer {
    margin-top: 40px !important;
  }
}
</style>
<script>
import excel from "../../components/sheetTable/components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import { updateSheetHeadInfo } from "../../api/index";
import watchAttr,{changeThis} from "./watchAttr"
import bedRecordModal from "../modal/bedRecord-modal";

export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    isFirst: Boolean /** 首页 */,
    scrollY: Number,
    isInPatientDetails: Boolean
  },
  mixins: [common],
  data() {
    return {
      watchItem:{},
      bus: bus(this),
      sheetInfo,
      checked:"false",
      deliveryMode: [],
      createTime:
        (sheetInfo.relObj && sheetInfo.relObj.createTime) ||
        sheetInfo.selectBlock.createTime
    };
  },
  methods: {
    openBedRecordModal(){
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      this.$refs.bedRecordModal.open();
    },
    inputChange(e) {
      let val = e.currentTarget.value
      if(e.keyCode == 8) {
        this.sheetInfo.relObj.dmccrq = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj.dmccrq = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj.dmccrq = val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj.dmccrq = val.substr(0, 10) + "日"
        }
      } 
    },
    inputChange1(e) {
      let val = e.currentTarget.value
      if(e.keyCode == 8) {
        this.sheetInfo.relObj.ccrq = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj.ccrq = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj.ccrq = val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj.ccrq = val.substr(0, 10) + "日"
        }
      } 
    },
    inputChange2(e) {
      let val = e.currentTarget.value
      if(e.keyCode == 8) {
        this.sheetInfo.relObj.qzpw1 = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj.qzpw1 = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj.qzpw1 = val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj.qzpw1 = val.substr(0, 10) + "日"
        }
      } 
    },
    checkboxClicked(e) {
      this.deliveryMode = [e.target.value];
      this.sheetInfo.relObj["deliveryMode"] = e.target.value;
    },
    onXpChang(e){
      e.currentTarget.value = '胸片位置：' + (e.currentTarget.value.split("：")[1] || "")
      this.sheetInfo.relObj.xpwz = e.currentTarget.value 
    },
    updateSurgeryDate(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_surgeryDate_${this.index}`] = text;
          this.$message.success(`修改手术日期成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.surgeryDate,
        `修改手术日期`
      );
    },
  },
  computed: {
    ...watchAttr,
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    },
    /** 只读模式 */
    readOnly() {
      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    },
    surgeryDate() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_surgeryDate_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_surgeryDate_${realIndex}`] ||
        this.patientInfo.surgeryDate
      );
    },
  },
  filters: {
    toymd(val) {
      return val ? moment(val).format("YYYY年MM月DD日") : "";
    }
  },
  created() {
    changeThis(this)
  },
  update() {},
  mounted() {
    if(!this.sheetInfo.relObj.xpwz){
      console.log("mounted-----" + this.sheetInfo.relObj.xpwz);
      this.$set(this.sheetInfo.relObj,'xpwz',"胸片位置：")
    }
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    bedRecordModal,
    excel,
  }
};
</script>
