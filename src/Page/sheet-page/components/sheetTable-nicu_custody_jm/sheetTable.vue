/*
江门妇幼-PICU监护单
 */
<template>
  <div>
    <div
      class="contant sheetTable-nicu_custody_jm"
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
            住院号：{{ patientInfo.inpNo }}
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
              <td style="width:185px">
                <div class="boxLine">
                  <div class="boxTitle">呼吸机编号：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:97%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['hxjxh' + index]"
                      :data-value="sheetInfo.relObj['hxjxh' + index]"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <div class="boxTitle">气管插管经：</div>
                  <input type="radio" style="margin-left:-5px;" value="口" :ischecked="sheetInfo.relObj['qgcgj' + index] == '口'" v-model="sheetInfo.relObj['qgcgj' + index]">口
                  <input type="radio" value="鼻" :ischecked="sheetInfo.relObj['qgcgj' + index] == '鼻'" v-model="sheetInfo.relObj['qgcgj' + index]">鼻
                  <!-- <div class="boxTitle" style="margin-left:5px;">口径：</div>
                  <input
                    type="textarea"
                    style="width:30px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj.kj"
                    :data-value="sheetInfo.relObj.kj"
                  /> -->
                </div>
                <div class="boxLine">
                  <div class="boxTitle">管径：</div>
                  <input
                    type="textarea"
                    style="width:32px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj['gj' + index]"
                    :data-value="sheetInfo.relObj['gj' + index]"
                  />cm
                  <div class="boxTitle" style="margin-left:10px;">深度：</div>
                  <input
                    type="textarea"
                    style="width:32px;"
                    class="bottomInput"
                    v-model="sheetInfo.relObj['sd' + index]"
                    :data-value="sheetInfo.relObj['sd' + index]"
                  />mm
                </div>
                <div style="margin-left:1px;">
                  <textarea style="cursor:text" v-model="sheetInfo.relObj['xpwz' + index]" :data-value="sheetInfo.relObj['xpwz' + index]" @input="(e)=>onXpChang(e)"></textarea>
                </div>
              </td>
              <td style="width:195px">
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="鼻氧管"
                    :ischecked="sheetInfo.relObj['byg' + index]"
                    v-model="checkedbyg"
                  />鼻氧管
                  <input
                    type="checkbox"
                    value="面罩"
                    :ischecked="sheetInfo.relObj['mz' + index]"
                    v-model="checkedmz"
                  />面罩
                  <input
                    type="checkbox"
                    value="头罩"
                    :ischecked="sheetInfo.relObj['tz' + index]"
                    v-model="checkedtz"
                  />头罩
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="胃管"
                    :ischecked="sheetInfo.relObj['wg' + index]"
                    v-model="checkedwg"
                  />胃管
                  <input
                    type="checkbox"
                    value="胃肠减压"
                    :ischecked="sheetInfo.relObj['wcjy' + index]"
                    v-model="checkedwcjy"
                  />胃肠减压
                  <input
                    type="checkbox"
                    value="鼻肠管"
                    :ischecked="sheetInfo.relObj['bcg' + index]"
                    v-model="checkedbcg"
                  />鼻肠管
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="CVC"
                    :ischecked="sheetInfo.relObj['cvc' + index]"
                    v-model="checkedcvc"
                  />CVC
                  <input
                    type="checkbox"
                    value="PICC"
                    :ischecked="sheetInfo.relObj['picc' + index]"
                    v-model="checkedpicc"
                  />PICC
                  <input
                    type="checkbox"
                    value="血透管"
                    :ischecked="sheetInfo.relObj['xtg' + index]"
                    v-model="checkedxtg"
                  />血透管
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="外周留置针"
                    :ischecked="sheetInfo.relObj['wzlzz' + index]"
                    v-model="checkedwzlzz"
                  />外周留置针
                  <input
                    type="checkbox"
                    value="动脉置管"
                    :ischecked="sheetInfo.relObj['dmzg' + index]"
                    v-model="checkeddmzg"
                  />动脉置管
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="导尿管"
                    :ischecked="sheetInfo.relObj['dng' + index]"
                    v-model="checkeddng"
                  />导尿管
                  <input
                    type="checkbox"
                    value="闭式胸腔引流管"
                    :ischecked="sheetInfo.relObj['bsxqylg' + index]"
                    v-model="checkedbsxqylg"
                  />闭式胸腔引流管
                </div> 
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="腹腔引流管"
                    :ischecked="sheetInfo.relObj['fqylg' + index]"
                    v-model="checkedfqylg"
                  />腹腔引流管
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="其他"
                    :ischecked="sheetInfo.relObj['qita' + index]"
                    v-model="checkedqita"
                  />
                  <div class="boxTitle">其他：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:97%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['qitaInput' + index]"
                      :data-value="sheetInfo.relObj['qitaInput' + index]"
                    />
                  </div>
                </div>
              </td>
              <td style="width:245px">
                <div class="boxLine">
                  <div class="boxTitle">中心静脉导管穿刺部位：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:95%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['zxjmdgccbw' + index]"
                      :data-value="sheetInfo.relObj['zxjmdgccbw' + index]"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <div class="boxTitle">臂围：左侧：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:30px;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['bwzc' + index]"
                      :data-value="sheetInfo.relObj['bwzc' + index]"
                    />cm
                  </div>
                  <div class="boxTitle">右侧：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:30px;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['bwyc' + index]"
                      :data-value="sheetInfo.relObj['bwyc' + index]"
                    />cm
                  </div>
                </div>
                <div class="boxLine">
                  <div class="boxTitle">穿刺日期：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:100px;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['ccrq' + index]"
                      :data-value="sheetInfo.relObj['ccrq' + index]"
                      @keyup="(e)=>inputChange1(e)"
                    />
                  </div>
                  <div class="boxTitle">外露：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:26px;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['wl' + index]"
                      :data-value="sheetInfo.relObj['wl' + index]"
                    />
                  </div>
                </div>  
                <div class="boxLine">穿刺点：
                  <input
                    type="checkbox"
                    value="完好"
                    :ischecked="sheetInfo.relObj['wh' + index]"
                    v-model="checkedwh"
                  />完好
                  <input
                    type="checkbox"
                    value="渗血"
                    :ischecked="sheetInfo.relObj['sx' + index]"
                    v-model="checkedsx"
                  />渗血
                </div> 
                 <div class="boxLine">
                   <input
                    style="margin-left:61px;"
                    type="checkbox"
                    value="渗液"
                    :ischecked="sheetInfo.relObj['sy' + index]"
                    v-model="checkedsy"
                  />渗液
                  <input
                    type="checkbox"
                    value="皮疹"
                    :ischecked="sheetInfo.relObj['pz' + index]"
                    v-model="checkedpz"
                  />皮疹
                 </div>
                <div class="boxLine">管道：
                  <input
                    type="checkbox"
                    value="通畅"
                    :ischecked="sheetInfo.relObj['tc' + index]"
                    v-model="checkedtc"
                  />通畅
                  <input
                    type="checkbox"
                    value="阻塞"
                    :ischecked="sheetInfo.relObj['zs' + index]"
                    v-model="checkedzs"
                  />阻塞
                  <input
                    type="checkbox"
                    value="通畅但无回血"
                    :ischecked="sheetInfo.relObj['whx' + index]"
                    v-model="checkedwhx"
                  />通畅但无回血
                </div> 
                <div class="boxLine">护理：
                  <input
                    type="checkbox"
                    value="更换敷料"
                    :ischecked="sheetInfo.relObj['ghfl' + index]"
                    v-model="checkedghfl"
                  />更换敷料
                  <input
                    type="checkbox"
                    value="三通"
                    :ischecked="sheetInfo.relObj['st' + index]"
                    v-model="checkedst"
                  />三通
                  <input
                    type="checkbox"
                    value="输液接头"
                    :ischecked="sheetInfo.relObj['syjt' + index]"
                    v-model="checkedsyjt"
                  />无针接头
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
                      v-model="sheetInfo.relObj['dmdgccbw' + index]"
                      :data-value="sheetInfo.relObj['dmdgccbw' + index]"
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
                      v-model="sheetInfo.relObj['dmccrq' + index]"
                      :data-value="sheetInfo.relObj['dmccrq' + index]"
                      @keyup="(e)=>inputChange(e)"
                    />
                  </div>
                </div>  
                <div class="boxLine">周围循环：
                  <input
                    type="checkbox"
                    value="良好"
                    :ischecked="sheetInfo.relObj['lh' + index]"
                    v-model="checkedlh"
                  />良好
                  <input
                    type="checkbox"
                    value="不良"
                    :ischecked="sheetInfo.relObj['bl' + index]"
                    v-model="checkedbl"
                  />不良
                </div> 
                <div class="boxLine">穿刺点：
                  <input
                    type="checkbox"
                    value="完好"
                    :ischecked="sheetInfo.relObj['wh1' + index]"
                    v-model="checkedwh1"
                  />完好
                  <input
                    type="checkbox"
                    value="渗血"
                    :ischecked="sheetInfo.relObj['sx1' + index]"
                    v-model="checkedsx1"
                  />渗血
                </div> 
                <div class="boxLine">
                  <input
                    style="margin-left:61px;"
                    type="checkbox"
                    value="渗液"
                    :ischecked="sheetInfo.relObj['sy1' + index]"
                    v-model="checkedsy1"
                  />渗液
                  <input
                    type="checkbox"
                    value="皮疹"
                    :ischecked="sheetInfo.relObj['pz1' + index]"
                    v-model="checkedpz1"
                  />皮疹
                </div>
                <div class="boxLine">管道：
                  <input
                    type="checkbox"
                    value="通畅"
                    :ischecked="sheetInfo.relObj['tc1' + index]"
                    v-model="checkedtc1"
                  />通畅
                  <input
                    type="checkbox"
                    value="阻塞"
                    :ischecked="sheetInfo.relObj['zs1' + index]"
                    v-model="checkedzs1"
                  />阻塞
                  <input
                    type="checkbox"
                    value="通畅但无回血"
                    :ischecked="sheetInfo.relObj['whx1' + index]"
                    v-model="checkedwhx1"
                  />通畅但无回血
                </div> 
              </td>
              <td style="width:250px">
                <div class="boxLine">
                  <div class="boxTitle">体位与皮肤评估：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:96%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['twypfpg' + index]"
                      :data-value="sheetInfo.relObj['twypfpg' + index]"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="翻身"
                    :ischecked="sheetInfo.relObj['fs' + index]"
                    v-model="checkedfs"
                  />ql<sup>~</sup>2h翻身
                  <input
                    type="checkbox"
                    value="制动"
                    style="margin-left:5px;"
                    :ischecked="sheetInfo.relObj['zd' + index]"
                    v-model="checkedzd"
                  />制动
                  <input
                    type="checkbox"
                    value="俯卧位"
                    style="margin-left:5px;"
                    :ischecked="sheetInfo.relObj['fww' + index]"
                    v-model="checkedfww"
                  />俯卧位
                </div> 
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="去枕平卧"
                    :ischecked="sheetInfo.relObj['qzpw' + index]"
                    v-model="checkedqzpw"
                  />
                  <div class="boxTitle">去枕平卧（时间：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:84%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['qzpw1' + index]"
                      :data-value="sheetInfo.relObj['qzpw1' + index]"
                      @keyup="(e)=>inputChange2(e)"
                    />）
                  </div>
                </div> 
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="潮红"
                    :ischecked="sheetInfo.relObj['chbw' + index]"
                    v-model="checkedchbw"
                  />
                  <div class="boxTitle">潮红（部位：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:87%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['chbw1' + index]"
                      :data-value="sheetInfo.relObj['chbw1' + index]"
                    />）
                  </div>
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="皮损"
                    :ischecked="sheetInfo.relObj['psbw' + index]"
                    v-model="checkedpsbw"
                  />
                  <div class="boxTitle">皮损（部位：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:87%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['psbw1' + index]"
                      :data-value="sheetInfo.relObj['psbw1' + index]"
                    />）
                  </div>
                </div>
              </td>
              <td style="width:150px">
                <div class="boxLine">
                  <div class="boxTitle">防坠床安全措施：</div>
                  <div class="boxRight">
                    <input
                      type="textarea"
                      style="width:96%;"
                      class="bottomInput"
                      v-model="sheetInfo.relObj['fzcaqcs' + index]"
                      :data-value="sheetInfo.relObj['fzcaqcs' + index]"
                    />
                  </div>
                </div>
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="放置防坠床警示标识"
                    :ischecked="sheetInfo.relObj['fzjsbs' + index]"
                    v-model="checkedfzjsbs"
                  />放置防坠床警示标识
                </div> 
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="拉好抢救台挡栏"
                    :ischecked="sheetInfo.relObj['lhdl' + index]"
                    v-model="checkedlhdl"
                  />拉好抢救台挡栏
                </div> 
                <div class="boxLine">
                  <input
                    type="checkbox"
                    value="关好箱门"
                    :ischecked="sheetInfo.relObj['ghxm' + index]"
                    v-model="checkedghxm"
                  />关好箱门
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

.sheetTable-nicu_custody_jm {
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
    height: 90px;
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
        this.sheetInfo.relObj['dmccrq' + this.index] = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj['dmccrq' + this.index] = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj['dmccrq' + this.index] = val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj['dmccrq' + this.index] = val.substr(0, 10) + "日"
        }
      } 
    },
    inputChange1(e) {
      let val = e.currentTarget.value
      if(e.keyCode == 8) {
        this.sheetInfo.relObj['ccrq' + this.index] = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj['ccrq' + this.index] = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj['ccrq' + this.index]= val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj['ccrq' + this.index]= val.substr(0, 10) + "日"
        }
      } 
    },
    inputChange2(e) {
      let val = e.currentTarget.value
      if(e.keyCode == 8) {
        this.sheetInfo.relObj['qzpw1' + this.index] = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj['qzpw1' + this.index] = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj['qzpw1' + this.index] = val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj['qzpw1' + this.index] = val.substr(0, 10) + "日"
        }
      } 
    },
    checkboxClicked(e) {
      this.deliveryMode = [e.target.value];
      this.sheetInfo.relObj["deliveryMode"] = e.target.value;
    },
    onXpChang(e){
      e.currentTarget.value = '胸片位置：' + (e.currentTarget.value.split("：")[1] || "")
      this.sheetInfo.relObj['xpwz' + this.index] = e.currentTarget.value 
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
    ...{
      'checkedbyg':{
    get(){
      return this.sheetInfo.relObj[`byg${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`byg${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedmz':{
    get(){
      return this.sheetInfo.relObj[`mz${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`mz${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedtz':{
    get(){
      return this.sheetInfo.relObj[`tz${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`tz${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedwg':{
    get(){
      return this.sheetInfo.relObj[`wg${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`wg${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedwcjy':{
    get(){
      return this.sheetInfo.relObj[`wcjy${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`wcjy${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedbcg':{
    get(){
      return this.sheetInfo.relObj[`bcg${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`bcg${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedcvc':{
    get(){
      return this.sheetInfo.relObj[`cvc${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`cvc${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedpicc':{
    get(){
      return this.sheetInfo.relObj[`picc${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`picc${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedxtg':{
    get(){
      return this.sheetInfo.relObj[`xtg${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`xtg${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedwzlzz':{
    get(){
      return this.sheetInfo.relObj[`wzlzz${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`wzlzz${this.index}`] = nVal ? "true" : "false"
    }
  },'checkeddmzg':{
    get(){
      return this.sheetInfo.relObj[`dmzg${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`dmzg${this.index}`] = nVal ? "true" : "false"
    }
  },'checkeddng':{
    get(){
      return this.sheetInfo.relObj[`dng${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`dng${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedbsxqylg':{
    get(){
      return this.sheetInfo.relObj[`bsxqylg${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`bsxqylg${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedqita':{
    get(){
      return this.sheetInfo.relObj[`qita${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`qita${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedwh':{
    get(){
      return this.sheetInfo.relObj[`wh${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`wh${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedsx':{
    get(){
      return this.sheetInfo.relObj[`sx${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`sx${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedsy':{
    get(){
      return this.sheetInfo.relObj[`sy${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`sy${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedpz':{
    get(){
      return this.sheetInfo.relObj[`pz${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`pz${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedtc':{
    get(){
      return this.sheetInfo.relObj[`tc${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`tc${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedzs':{
    get(){
      return this.sheetInfo.relObj[`zs${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`zs${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedwhx':{
    get(){
      return this.sheetInfo.relObj[`whx${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`whx${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedwh1':{
    get(){
      return this.sheetInfo.relObj[`wh1${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`wh1${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedsx1':{
    get(){
      return this.sheetInfo.relObj[`sx1${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`sx1${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedsy1':{
    get(){
      return this.sheetInfo.relObj[`sy1${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`sy1${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedpz1':{
    get(){
      return this.sheetInfo.relObj[`pz1${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`pz1${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedtc1':{
    get(){
      return this.sheetInfo.relObj[`tc1${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`tc1${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedzs1':{
    get(){
      return this.sheetInfo.relObj[`zs1${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`zs1${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedwhx1':{
    get(){
      return this.sheetInfo.relObj[`whx1${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`whx1${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedghfl':{
    get(){
      return this.sheetInfo.relObj[`ghfl${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`ghfl${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedst':{
    get(){
      return this.sheetInfo.relObj[`st${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`st${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedsyjt':{
    get(){
      return this.sheetInfo.relObj[`syjt${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`syjt${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedlh':{
    get(){
      return this.sheetInfo.relObj[`lh${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`lh${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedbl':{
    get(){
      return this.sheetInfo.relObj[`bl${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`bl${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedfs':{
    get(){
      return this.sheetInfo.relObj[`fs${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`fs${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedzd':{
    get(){
      return this.sheetInfo.relObj[`zd${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`zd${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedfww':{
    get(){
      return this.sheetInfo.relObj[`fww${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`fww${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedqzpw':{
    get(){
      return this.sheetInfo.relObj[`qzpw${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`qzpw${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedchbw':{
    get(){
      return this.sheetInfo.relObj[`chbw${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`chbw${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedpsbw':{
    get(){
      return this.sheetInfo.relObj[`psbw${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`psbw${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedfzjsbs':{
    get(){
      return this.sheetInfo.relObj[`fzjsbs${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`fzjsbs${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedlhdl':{
    get(){
      return this.sheetInfo.relObj[`lhdl${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`lhdl${this.index}`] = nVal ? "true" : "false"
    }
  },'checkedghxm':{
    get(){
      return this.sheetInfo.relObj[`ghxm${this.index}`] === 'true'
    },
    set(nVal){
      this.sheetInfo.relObj[`ghxm${this.index}`] = nVal ? "true" : "false"
    }
  }
    },
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
  },
  update() {},
  mounted() {
    if(!this.sheetInfo.relObj["xpwz"+this.index]){
      this.$set(this.sheetInfo.relObj,`xpwz${this.index}`,"胸片位置：")
    }
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel,
    bedRecordModal
  }
};
</script>
