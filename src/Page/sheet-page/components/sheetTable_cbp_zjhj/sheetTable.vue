<template>
  <div>
    <div class="contant sheetTable-oxytocin" :style="data.titleModel.style" :class="{readOnly}">
      <img src="../../images/仅供查阅.jpg" class="readOnly-img no-print" v-if="readOnly" alt />
      <div class="header-con">
        <div class="title">{{patientInfo.recordName}}</div>
        <div class="info-con" flex="main:justify" v-if="index==0">
          <span>
             病区：
             <div class="bottom-line" style="min-width: 100px">
                {{ patientInfo.deptName }}
             </div>
          </span>
          <span>
            住院号：
              <div class="bottom-line" style="min-width: 70px">{{patientInfo.inpNo}}</div>
          </span>
          <span>
            床号：
              <div
                class="bottom-line"
                style="min-width: 50px"
                @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)"
              >{{patientInfo.bedLabel}}</div>
          </span>
          <span>
            姓名：
            <div
                class="bottom-line"
                style="min-width: 70px"
            >{{patientInfo.patientName}}</div>
          </span>
          <span>
             性别：
             <div class="bottom-line" style="min-width: 30px">{{patientInfo.sex}}</div>
          </span>
          <span>
            年龄：
            <div class="bottom-line" style="min-width: 60px">{{patientInfo.age}}</div>
          </span>
        </div>
        <div class="info-con" flex="main:justify" v-if="index==0">
          <span
            @click="updateTetxInfo('diagnosis', '诊断', patientInfo.diagnosis)"
          >
            诊断:
            <div
              class="bottom-line"
              style="width: 615px;"
            >
               {{ patientInfo.diagnosis }}
            </div>
          </span>
          <span>
            日期：
              <input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['startYear_' + index]"
                v-model="sheetInfo.relObj['startYear_' + index]"
               />
               年 
               <input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['startMonth_' + index]"
                v-model="sheetInfo.relObj['startMonth_' + index]"
               />
               月
               <input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['startDay_' + index]"
                v-model="sheetInfo.relObj['startDay_' + index]"
               />
               日&nbsp;至&nbsp;
               <input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['endYear_' + index]"
                v-model="sheetInfo.relObj['endYear_' + index]"
               />
               年 
               <input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['endMonth_' + index]"
                v-model="sheetInfo.relObj['endMonth_' + index]"
               />
               月
               <input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['endDay_' + index]"
                v-model="sheetInfo.relObj['endDay_' + index]"
               />
               日
          </span>
        </div>
       <div class="info-con" flex="main:justify" v-if="index==0">
          <span
          >
            治疗模式:
            <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['zlms_' + index]"
              v-model="sheetInfo.relObj['zlms_' + index]"
              style="width: 100px;"
            />
          </span>
          <span
          >
            置换液:
            前
            <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['zhyBefore_' + index]"
              v-model="sheetInfo.relObj['zhyBefore_' + index]"
            />
            ml/h&nbsp;&nbsp;后
            <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['zhyAfter_' + index]"
              v-model="sheetInfo.relObj['zhyAfter_' + index]"
            />
            ml/h
          </span>
          <span>
            抗凝模式: 
             <input
               type="checkbox"
               :ischecked="checkedknmsWgs"
               v-model="checkedknmsWgs"
              />无肝素
              <input
               type="checkbox"
               :ischecked="checkedknmsGsn"
               v-model="checkedknmsGsn"
              />肝素钠
              <input
               type="checkbox"
               :ischecked="checkedknmsDfzgs"
               v-model="checkedknmsDfzgs"
              />低分子肝素
              <input
               type="checkbox"
               :ischecked="checkedknmsElse"
               v-model="checkedknmsElse"
              />其他
             <input
              class="bottom-line-input"
              style="width: 100px;"
              :data-value="sheetInfo.relObj['knmsQt_' + index]"
              v-model="sheetInfo.relObj['knmsQt_' + index]"
            />
          </span>
        </div>
        <div class="info-con" flex="main:justify" v-if="index==0">
          <span>
             <strong>透前评估:</strong>
             患者神志：
            <input
               type="checkbox"
                :ischecked="checkedHzszQx"
               v-model="checkedHzszQx"
            />清醒
            <input
               type="checkbox"
                :ischecked="checkedHzszFz"
               v-model="checkedHzszFz"
            />烦躁
            <input
               type="checkbox"
                :ischecked="checkedHzszSs"
               v-model="checkedHzszSs"
            />嗜睡
            <input
               type="checkbox"
                :ischecked="checkedHzszHm"
               v-model="checkedHzszHm"
            />昏迷
            <input
               type="checkbox"
                :ischecked="checkedHzszZj"
               v-model="checkedHzszZj"
            />镇静
          </span>
           <span>
             血管通路类型：
             AVF
             <input
               type="checkbox"
               :ischecked="checkedXgtllxAvf"
               v-model="checkedXgtllxAvf"
            />
            (<input
               type="checkbox"
               :ischecked="checkedXgtllxAvfZ"
               v-model="checkedXgtllxAvfZ"
             />左<input
               type="checkbox"
               :ischecked="checkedXgtllxAvfY"
               v-model="checkedXgtllxAvfY"
            />右)
            AVG
             <input
               type="checkbox"
               :ischecked="checkedXgtllxAvg"
               v-model="checkedXgtllxAvg"
             />
            (<input
               type="checkbox"
               :ischecked="checkedXgtllxAvgZ"
               v-model="checkedXgtllxAvgZ"
             />左<input
               type="checkbox"
               :ischecked="checkedXgtllxAvgY"
               v-model="checkedXgtllxAvgY"
             />右)
          </span>
           <span> 
              静脉置管(<input
               type="checkbox"
               :ischecked="checkedJmzgLs"
               v-model="checkedJmzgLs"
              />临时<input
               type="checkbox"
               :ischecked="checkedJmzgCq"
               v-model="checkedJmzgCq"
              />长期)
              <input
               type="checkbox"
               :ischecked="checkedJmzgJn"
               v-model="checkedJmzgJn"
              />颈内
              <input
               type="checkbox"
               :ischecked="checkedJmzgSgs"
               v-model="checkedJmzgSgs"
              />锁骨上
              <input
               type="checkbox"
               :ischecked="checkedJmzgSgx"
               v-model="checkedJmzgSgx"
              />锁骨下
              <input
               type="checkbox"
               :ischecked="checkedJmzgG"
               v-model="checkedJmzgG"
              />股V
          </span>
        </div>
        <div class="info-con" flex="main:justify" v-if="index==0">
          <span
          >
            通路流量:
            <input
               type="checkbox"
               :ischecked="checkedTlllLh"
               v-model="checkedTlllLh"
              />良好
               <input
               type="checkbox"
               :ischecked="checkedTlllQj"
               v-model="checkedTlllQj"
              />欠佳
               <input
               type="checkbox"
               :ischecked="checkedTlllBc"
               v-model="checkedTlllBc"
              />不畅
          </span>
          <span
          >
            渗血:
            <input
               type="checkbox"
               :ischecked="checkedSxS"
               v-model="checkedSxS"
              />是
               <input
               type="checkbox"
               :ischecked="checkedSxF"
               v-model="checkedSxF"
              />否
          </span>
          <span
          >
            红肿:
             <input
               type="checkbox"
              :ischecked="checkedHzS"
               v-model="checkedHzS"
              />是
               <input
               type="checkbox"
              :ischecked="checkedHzF"
               v-model="checkedHzF"
              />否
          </span>
          <span
          >
            导管固定:
            <input
               type="checkbox"
              :ischecked="checkedDggdGd"
               v-model="checkedDggdGd"
              />固定
               <input
               type="checkbox"
              :ischecked="checkedDggdFxtl"
               v-model="checkedDggdFxtl"
              />风险脱落
          </span>
        </div>
         <div class="info-con" flex="main:justify" style="justify-content: end;" v-if="index==0">
          <span
          >
            护士签名:
            <span class="sign-img-con" @click="sign('topSign')">
              <img
               v-if="TopsignImgSrc"
               :src="`/crNursing/api/file/signImage/${TopsignImgSrc}?${token}`"
               alt
               style="width:80px;height:24px;cursor: pointer;"
              >
              <span style="display: inline-block;width:80px; cursor: pointer;" v-else>

              </span>
            </span>
           
          </span>

        </div>
      </div>
      <excel
          :data="data"
          :index="index"
          :length="length"
          :scrollY="scrollY"
          :hasFiexHeader="true"
          :isInPatientDetails="isInPatientDetails"
      ></excel>
      <div class="bottomCon" v-if="index==1">
        <div class="showModal ">
          <strong>透析小结：</strong>
          本次CRRT治疗
          <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['crrtZl_' + index]"
              v-model="sheetInfo.relObj['crrtZl_' + index]"
              style="width: 60px;"
          />h；&nbsp;&nbsp;总透析量:
          <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['ztxl_' + index]"
              v-model="sheetInfo.relObj['ztxl_' + index]"
              style="width: 60px;"
          />L；&nbsp;&nbsp;总置换量:
          <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['zzhl_' + index]"
              v-model="sheetInfo.relObj['zzhl_' + index]"
              style="width: 60px;"
          />L；&nbsp;&nbsp;血浆置换量:
           <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['xjzhl_' + index]"
              v-model="sheetInfo.relObj['xjzhl_' + index]"
              style="width: 60px;"
          />ml；
        </div>
      </div>
      <div class="bottomCon" v-if="index==1">
        <div class="showModal ">
           AVF/AVG：内瘘杂音：<input
               type="checkbox"
              :ischecked="checkednlzyCz"
               v-model="checkednlzyCz"
           />存在
          <input
               type="checkbox"
              :ischecked="checkednlzyJr"
               v-model="checkednlzyJr"
           />减弱
            <input
               type="checkbox"
              :ischecked="checkednlzyXs"
               v-model="checkednlzyXs"
           />消失；&nbsp;&nbsp;
           穿刺部位是否红肿:
          <input
               type="checkbox"
              :ischecked="checkedsfhzF"
               v-model="checkedsfhzF"
           />否
           <input
               type="checkbox"
              :ischecked="checkedsfhzS"
               v-model="checkedsfhzS"
           />是&nbsp;&nbsp;(范围:<input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['sfhzFw_' + index]"
              v-model="sheetInfo.relObj['sfhzFw_' + index]"
              style="width: 400px;"
          />)；
        </div>
      </div>
      <div class="bottomCon" v-if="index==1">
        <div class="showModal ">
         导管：<input
               type="checkbox"
              :ischecked="dgTc"
               v-model="dgTc"
              />通畅
          <input
               type="checkbox"
               :ischecked="dgZxj"
               v-model="dgZxj"
             />正向接
            <input
               type="checkbox"
               :ischecked="dgFxj"
               v-model="dgFxj"
             />反向接
             <input
               type="checkbox"
               :ischecked="dgDs"
               v-model="dgDs"
             />堵塞；&nbsp;渗血:
             <input
               type="checkbox"
               :ischecked="bottomsxS"
               v-model="bottomsxS"
             />是
             <input
               type="checkbox"
               :ischecked="bottomsxF"
               v-model="bottomsxF"
             />否；&nbsp;红肿：
             <input
               type="checkbox"
               :ischecked="bottomhzS"
               v-model="bottomhzS"
             />是
             <input
               type="checkbox"
               :ischecked="bottomhzF"
               v-model="bottomhzF"
             />否；&nbsp;导管固定:
            <input
               type="checkbox"
               :ischecked="bottomdggdLg"
               v-model="bottomdggdLg"
             />牢固
             <input
               type="checkbox"
               :ischecked="bottomdggdfxtl"
               v-model="bottomdggdfxtl"
             />风险脱落重新缝线；&nbsp;
             双腔管封管液量:A<input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['sqgA_' + index]"
              v-model="sheetInfo.relObj['sqgA_' + index]"
              style="width: 60px;"
           />ml、V<input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['sqgV_' + index]"
              v-model="sheetInfo.relObj['sqgV_' + index]"
              style="width: 60px;"
           />ml；
        </div>
      </div>
       <div class="bottomCon" v-if="index==1">
        <div class="showModal ">
         封管液：<input
               type="checkbox"
               :ischecked="checkefgy10Gs"
               v-model="checkefgy10Gs"
             />10mg/ml肝素盐水
             <input
               type="checkbox"
               :ischecked="checkefgy50Gs"
               v-model="checkefgy50Gs"
             />50mg/ml肝素盐水
             <input
               type="checkbox"
               :ischecked="checkefgyTs"
               v-model="checkefgyTs"
             />特殊
             <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['fgyElse_' + index]"
              v-model="sheetInfo.relObj['fgyElse_' + index]"
              style="width: 200px;"
           />；&nbsp;&nbsp;
           血路管堵塞:
           <input
               type="checkbox"
               :ischecked="checkedxlgdsW"
               v-model="checkedxlgdsW"
            />无
            <input
               type="checkbox"
               :ischecked="checkedxlgds1"
               v-model="checkedxlgds1"
            />+
            <input
               type="checkbox"
               :ischecked="checkedxlgds2"
               v-model="checkedxlgds2"
            />++
            <input
               type="checkbox"
               :ischecked="checkedxlgds3"
               v-model="checkedxlgds3"
            />+++&nbsp;&nbsp;
           滤器堵塞:
           <input
               type="checkbox"
               :ischecked="checkedlqdsW"
               v-model="checkedlqdsW"
            />无
            <input
               type="checkbox"
               :ischecked="checkedlqds1"
               v-model="checkedlqds1"
            />+
            <input
               type="checkbox"
               :ischecked="checkedlqds2"
               v-model="checkedlqds2"
            />++
            <input
               type="checkbox"
               :ischecked="checkedlqds3"
               v-model="checkedlqds3"
            />+++
        </div>
      </div>
       <div class="bottomCon" v-if="index==1">
        <div class="showModal ">
          <input
               type="checkbox"
               :ischecked="checkedzlgcSl"
               v-model="checkedzlgcSl"
            />治疗过程顺利。
           <input
               type="checkbox"
               :ischecked="checkedtsqk"
               v-model="checkedtsqk"
            />特殊情况:<input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj['lastTsqk_' + index]"
              v-model="sheetInfo.relObj['lastTsqk_' + index]"
              style="width: 1020px;"
           />

        </div>
      </div>
       <div class="bottomCon" style="justify-content: end;bottom:20px" v-if="index==1">
        <div class="showModal">
         <span
          >
            护士签名:
            <span class="sign-img-con"  @click="sign('bottomSign')">
              <img
               v-if="BottomsignImgSrc"
               :src="`/crNursing/api/file/signImage/${BottomsignImgSrc}?${token}`"
               alt
               style="width:80px;height:24px; cursor: pointer;"
              >
              <span style="display: inline-block;width:80px; cursor: pointer;" v-else>

              </span>
            </span>
            &nbsp;&nbsp;日期:<input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['overYear_' + index]"
                v-model="sheetInfo.relObj['overYear_' + index]"
                style="width: 60px;"
               />
               年 
               <input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['overMonth_' + index]"
                v-model="sheetInfo.relObj['overMonth_' + index]"
                 style="width: 60px;"
               />
               月
               <input
                class="bottom-line-input"
                :data-value="sheetInfo.relObj['overDay_' + index]"
                v-model="sheetInfo.relObj['overDay_' + index]"
                 style="width: 60px;"
               />
               日

          </span>
        </div>
      </div>
      <div class="bottomCon" style="justify-content: center;bottom:20px">
        <div class="showModal">
           第 {{index+1}} 页
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.sheetTable-oxytocin {
& {
  border-radius: 2px;
  background: #FFFFFF;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 20px 20px;
  box-sizing: border-box;
  width: 800px; // 关键
  margin: 0 auto 20px;
  box-sizing: content-box;
  position: relative;
}

.header-con {
.title {
  font-size: 21px;
  padding: 5px 0 5px;
  text-align: center;
  font-weight: bold;
  font-family: simsun, 'Times New Roman', Georgia, Serif !important;
}

span {
  margin-right: 4px;
  font-size: 14px;
  color: #000;
}

.info-con {
  margin: 2px 0;
  text-align: left;
}
}

&.readOnly {
   pointer-events: none;
 }

.readOnly-img {
  position: absolute;
  right: 5px;
  top: 5px;
}


.bottom-line {
  display: inline-block;
  padding: 2px 0 2px 2px;
  border-bottom: 1px solid #000 !important;
}

.bottomCon {
  position: relative;
  bottom: 28px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;

}

 .table-footer {
  margin-top: 60px !important;
 }

 .bottom-line-input {
  display: inline-block;
  border: 0;
  width: 30px;
  border-bottom: 1px solid #000;
  padding: 2px 0 2px 2px;
  height: 12px;
  position: relative;
  outline: none;
  text-align: center;
 }

 .showModal {
  position: relative;
 }

 ::-webkit-scrollbar {
  display: none;
 }
}

</style>
<script>
import excel from "../../components/sheetTable/components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import common from "@/common/mixin/common.mixin";
import { updateSheetHeadInfo } from "../../api/index";
 import {  getUser } from "@/Page/sheet-page/api/index.js";
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
      bus: bus(this),
      sheetInfo
    };
  },
  methods: {
     sign(type) {
      let Imgsrc=type=='topSign'?this.TopsignImgSrc:this.BottomsignImgSrc
      let title = Imgsrc
        ? "取消签名"
        : "护士签名";
      window.openSignModal((password, username) => {
        getUser(password, username).then(res => {
         if (Imgsrc) {
           sheetInfo.relObj[`${type}_${this.index}`] = ''
         } else {
           sheetInfo.relObj[`${type}_${this.index}`] = res.data.data.empNo
         }
           this.bus.$emit("saveSheetPage", true);
         });
      }, title);
    },
    updateTetxInfo(key, label, autoText) {
      window.openSetTextModal(
          text => {
            updateSheetHeadInfo({ [key]: text }).then(res => {
              this.patientInfo[key] = res.data.data[key];
              this.$message.success(`修改${label}成功`);
            });
          },
          autoText,
          `修改${label}`
      );
    },
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.masterInfo || {};
    },
    /** 只读模式 */
    readOnly() {
      return !this.userDeptList
          .map(item => item.code)
          .includes(this.sheetInfo.selectBlock.deptCode);
    },
    'checkedknmsWgs':{
        get(){
          return this.sheetInfo.relObj[`knmsWgs_${this.index}`] == 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`knmsWgs_${this.index}`] = nVal ? "true" : "false"
        }
    },
    'checkedknmsGsn':{
       get(){
         return this.sheetInfo.relObj[`knmsGsn_${this.index}`] == 'true'
       },
       set(nVal){
         this.sheetInfo.relObj[`knmsGsn_${this.index}`] = nVal ? "true" : "false"
       }
    },
    'checkedknmsDfzgs':{
      get(){
        return this.sheetInfo.relObj[`knmsDfzgs_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`knmsDfzgs_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedknmsElse':{
      get(){
        return this.sheetInfo.relObj[`knmsElse_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`knmsElse_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedHzszQx':{
      get(){
        return this.sheetInfo.relObj[`hzszQx_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`hzszQx_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedHzszFz':{
      get(){
        return this.sheetInfo.relObj[`hzszFz_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`hzszFz_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedHzszSs':{
        get(){
          return this.sheetInfo.relObj[`hzszSs_${this.index}`] == 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`hzszSs_${this.index}`] = nVal ? "true" : "false"
        }
    },
    'checkedHzszHm':{
       get(){
         return this.sheetInfo.relObj[`hzszHm_${this.index}`] == 'true'
       },
       set(nVal){
         this.sheetInfo.relObj[`hzszHm_${this.index}`] = nVal ? "true" : "false"
       }
    },
    'checkedHzszZj':{
       get(){
         return this.sheetInfo.relObj[`hzszZj_${this.index}`] == 'true'
       },
       set(nVal){
         this.sheetInfo.relObj[`hzszZj_${this.index}`] = nVal ? "true" : "false"
       }
    },
    'checkedXgtllxAvf':{
       get(){
         return this.sheetInfo.relObj[`xgtllxAvf_${this.index}`] == 'true'
       },
       set(nVal){
         this.sheetInfo.relObj[`xgtllxAvf_${this.index}`] = nVal ? "true" : "false"
       }
    },
    'checkedXgtllxAvg':{
      get(){
        return this.sheetInfo.relObj[`xgtllxAvg_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xgtllxAvg_${this.index}`] = nVal ? "true" : "false"
      }
    },
   
   'xgtllxAvfFx': {
     get() {
      return this.sheetInfo.relObj[`xgtllxAvfFx_${this.index}_${this.sheetInfo.selectBlock.id}`];
     },
     set(nVal) {
      this.sheetInfo.relObj[`xgtllxAvfFx_${this.index}_${this.sheetInfo.selectBlock.id}`] = nVal;
     }
    },
    // 有问题
   'xgtllxAvgAvg':{
      get(){
        return this.sheetInfo.relObj[`xgtllxAvgAvg_${this.index}_${this.sheetInfo.selectBlock.id}`]
      },
      set(nVal){
        this.sheetInfo.relObj[`xgtllxAvgAvg_${this.index}_${this.sheetInfo.selectBlock.id}`] = nVal
      }
    },
    // 有问题
    'jmzgTime':{
      get(){
        return this.sheetInfo.relObj[`jmzgTime_${this.index}_${this.sheetInfo.selectBlock.id}`]
      },
      set(nVal){
        this.sheetInfo.relObj[`jmzgTime_${this.index}_${this.sheetInfo.selectBlock.id}`] = nVal
      }
    },
    'checkedJmzgJn':{
       get(){
         return this.sheetInfo.relObj[`jmzgJn_${this.index}}`] == 'true'
       },
       set(nVal){
         this.sheetInfo.relObj[`jmzgJn_${this.index}`] = nVal ? "true" : "false"
       }
    },
    'checkedJmzgSgs':{
       get(){
         return this.sheetInfo.relObj[`jmzgSgs_${this.index}`] == 'true'
       },
       set(nVal){
         this.sheetInfo.relObj[`jmzgSgs_${this.index}`] = nVal ? "true" : "false"
       }
    },
    'checkedJmzgSgx':{
       get(){
         return this.sheetInfo.relObj[`jmzgSgx_${this.index}`] == 'true'
       },
       set(nVal){
         this.sheetInfo.relObj[`jmzgSgx_${this.index}`] = nVal ? "true" : "false"
       }
    },
    'checkedJmzgG':{
       get(){
         return this.sheetInfo.relObj[`jmzgG_${this.index}`] == 'true'
       },
       set(nVal){
         this.sheetInfo.relObj[`jmzgG_${this.index}`] = nVal ? "true" : "false"
       }
    },
    'checkedTlllLh':{
      get(){
        return this.sheetInfo.relObj[`tlllLh_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`tlllLh_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedTlllQj':{
      get(){
        return this.sheetInfo.relObj[`tlllQj_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`tlllQj_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedTlllBc':{
      get(){
        return this.sheetInfo.relObj[`tlllBc_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`tlllBc_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedSxS':{
      get(){
        return this.sheetInfo.relObj[`sxS_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`sxS_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedSxF':{
      get(){
        return this.sheetInfo.relObj[`sxF_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`sxF_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedHzS':{
      get(){
        return this.sheetInfo.relObj[`hzS_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`hzS_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedHzF':{
      get(){
        return this.sheetInfo.relObj[`hzF_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`hzF_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedDggdGd':{
      get(){
        return this.sheetInfo.relObj[`dggdGd_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`dggdGd_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedDggdFxtl':{
      get(){
        return this.sheetInfo.relObj[`dggdFxtl_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`dggdFxtl_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkednlzyCz':{
      get(){
        return this.sheetInfo.relObj[`nlzyCz_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`nlzyCz_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkednlzyJr':{
      get(){
        return this.sheetInfo.relObj[`nlzyJr_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`nlzyJr_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkednlzyXs':{
      get(){
        return this.sheetInfo.relObj[`nlzyXs_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`nlzyXs_${this.index}`] = nVal ? "true" : "false"
      }
     },
     'checkedsfhzS':{
      get(){
        return this.sheetInfo.relObj[`sfhzS_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`sfhzS_${this.index}`] = nVal ? "true" : "false"
      }
     },
     'checkedsfhzF':{
      get(){
        return this.sheetInfo.relObj[`sfhzF_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`sfhzF_${this.index}`] = nVal ? "true" : "false"
      }
     },
    'dgTc':{
      get(){
        return this.sheetInfo.relObj[`dgTc_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`dgTc_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'dgZxj':{
      get(){
        return this.sheetInfo.relObj[`dgZxj_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`dgZxj_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'dgFxj':{
      get(){
        return this.sheetInfo.relObj[`dgFxj_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`dgFxj_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'dgDs':{
      get(){
        return this.sheetInfo.relObj[`dgDs_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`dgDs_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'bottomsxS':{
      get(){
        return this.sheetInfo.relObj[`sxS_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`sxS_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'bottomsxF':{
      get(){
        return this.sheetInfo.relObj[`sxF_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`sxF_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'bottomhzS':{
      get(){
        return this.sheetInfo.relObj[`hzS_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`hzS_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'bottomhzF':{
      get(){
        return this.sheetInfo.relObj[`hzF_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`hzF_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'bottomdggdLg':{
      get(){
        return this.sheetInfo.relObj[`dggdLg_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`dggdLg_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'bottomdggdfxtl':{
      get(){
        return this.sheetInfo.relObj[`dggdfxtl_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`dggdfxtl_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkefgy10Gs':{
      get(){
        return this.sheetInfo.relObj[`efgy10Gs_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`efgy10Gs_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkefgy50Gs':{
      get(){
        return this.sheetInfo.relObj[`efgy50Gs_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`efgy50Gs_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkefgyTs':{
      get(){
        return this.sheetInfo.relObj[`efgyTs_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`efgyTs_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedxlgdsW':{
      get(){
        return this.sheetInfo.relObj[`xlgdsW_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xlgdsW_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedxlgds1':{
      get(){
        return this.sheetInfo.relObj[`xlgds1_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xlgds1_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedxlgds2':{
      get(){
        return this.sheetInfo.relObj[`xlgds2_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xlgds2_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedxlgds3':{
      get(){
        return this.sheetInfo.relObj[`xlgds3_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xlgds3_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedlqdsW':{
      get(){
        return this.sheetInfo.relObj[`lqdsW_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`lqdsW_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedlqds1':{
      get(){
        return this.sheetInfo.relObj[`lqds1_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`lqds1_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedlqds2':{
      get(){
        return this.sheetInfo.relObj[`lqds2_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`lqds2_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedlqds3':{
      get(){
        return this.sheetInfo.relObj[`lqds3_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`lqds3_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedzlgcSl':{
      get(){
        return this.sheetInfo.relObj[`zlgcSl_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`zlgcSl_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedtsqk':{
      get(){
        return this.sheetInfo.relObj[`tsqk_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`tsqk_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'TopsignImgSrc':{
       get(){
        return this.sheetInfo.relObj[`topSign_${this.index}`] ? this.sheetInfo.relObj[`topSign_${this.index}`] : ''
      },
       set(nVal){
        this.sheetInfo.relObj[`topSign_${this.index}`] = nVal 
       }
    },
    'BottomsignImgSrc':{
      get(){
       return this.sheetInfo.relObj[`bottomSign_${this.index}`] ? this.sheetInfo.relObj[`bottomSign_${this.index}`] : ''
     },
      set(nVal){
       this.sheetInfo.relObj[`bottomSign_${this.index}`] = nVal 
      }
    },
    'checkedXgtllxAvfZ':{
      get(){
        return this.sheetInfo.relObj[`xgtllxAvfZ_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xgtllxAvfZ_${this.index}`] = nVal ? "true" : "false"
      }
    },
    'checkedXgtllxAvfY':{
      get(){
        return this.sheetInfo.relObj[`xgtllxAvfY_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xgtllxAvfY_${this.index}`] = nVal ? "true" : "false"
      }
     },
     'checkedXgtllxAvgZ':{
      get(){
        return this.sheetInfo.relObj[`xgtllxAvgZ_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xgtllxAvgZ_${this.index}`] = nVal ? "true" : "false"
      }
     },
     'checkedXgtllxAvgY':{
      get(){
        return this.sheetInfo.relObj[`xgtllxAvgY_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`xgtllxAvgY_${this.index}`] = nVal ? "true" : "false"
      }
     },
     'checkedJmzgLs':{
      get(){
        return this.sheetInfo.relObj[`jmzgLs_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`jmzgLs_${this.index}`] = nVal ? "true" : "false"
      }
     },
     'checkedJmzgCq':{
      get(){
        return this.sheetInfo.relObj[`jmzgCq_${this.index}`] == 'true'
      },
      set(nVal){
        this.sheetInfo.relObj[`jmzgCq_${this.index}`] = nVal ? "true" : "false"
      }
     },
     
     
   },
  created() {
    
  },
  update() {},
  mounted() {
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel
  }
};
</script>
