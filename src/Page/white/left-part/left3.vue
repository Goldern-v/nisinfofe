<template>
  <div>
    <boxBase title="病人分组" :icon="require('../images/病人分组.png')" :optionTitle="controlStatus ? '分组名称' : '分组数量'">
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <div class="title-con" flex>
          <span style="width: 60px; text-align: center">{{ controlStatus ? '组名':'组号'}}</span>
          <span flex-box="1" style="width: 0;margin-right: 20px">床位</span>
          <span flex-box="1" style="width: 0;margin-right: 10px">管床护士</span>
        </div>
        <div v-if="controlStatus">
          <div v-for="(item) in hengliOptions" :key="item.id">
            <div class="list-con"  flex="cross:center" v-if="item.isShow === '1'">
              <span style="width: 60px; text-align: center">{{ item.groupName }}</span>
              <input v-if="HOSPITAL_ID !== 'fuyou'" flex-box="1" style="width: 0;margin-right: 20px" v-model="item.bedSet" @blur="update">
              <el-select
               @visible-change="update2"
               v-else style="margin-right: 20px;flex:1"
               v-model="item.bedSets"
               multiple
               allow-create
               filterable
               @remove-tag="$e=>update2(false,$e)"
               placeholder="请选择">
                <el-option
                  v-for="item in fuyouBedLisg"
                  :key="item.bedNo"
                  :label="item.bedLabel"
                  :value="item.bedLabel">
                </el-option>
              </el-select>
              <el-autocomplete v-if="HOSPITAL_ID !== 'fuyou'" flex-box="1" style="margin-right: 20px" v-model="item.dutyNurse" :fetch-suggestions="querySearch" @select="update"></el-autocomplete>
              <el-select
               @visible-change="update2"
               v-else
               style="margin-right: 20px;flex:1"
               v-model="item.dutyNurses"
               multiple
               allow-create
               filterable
               @remove-tag="$e=>update2(false,$e)"
               placeholder="请选择">
                <el-option
                  v-for="item in nurseList"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="list-con"  flex="cross:center" v-for="(item, index) in computedList" :key="index">
            <span style="width: 60px; text-align: center" v-if="deptCode == '042302' && index==2 && HOSPITAL_ID=='hj'">A：</span>
            <span style="width: 60px; text-align: center" v-else-if="deptCode == '042302' && index==3 && HOSPITAL_ID=='hj'">A2：</span>
            <span style="width: 60px; text-align: center" v-else-if="deptCode == '042302' && index==4 && HOSPITAL_ID=='hj'">A3：</span>

            <span style="width: 60px; text-align: center" v-else-if="HOSPITAL_ID=='whyx'">{{index+1}}：</span>
            <span style="width: 100px; text-align: center" v-else-if="['gdtj', 'zhzxy', 'xiegang', 'dglb'].includes(HOSPITAL_ID)">
              <input  style="width: 60px;margin-right: 20px" v-model="item.groupCode" @blur="update">
            </span>
            <span style="width: 60px; text-align: center" v-else>A{{(deptCode == '041002' && HOSPITAL_ID=='hj') || ['huadu','liaocheng','nanfangzhongxiyi','yangchunzhongyi',"nfyksdyy",'whhk','lyxrm','925', 'sdhpwk'].includes(HOSPITAL_ID)? index+1 : index}}：</span>
            <input v-if="HOSPITAL_ID !== 'liaocheng'" flex-box="1" style="width: 0;margin-right: 20px" v-model="item.bedSet" @blur="update">
            <!-- 聊城二院 床位 添加 下拉选项 -->
            <el-select
              v-else
              class='hengliSelect'
              flex-box="1" style="margin-right: 20px"
              v-model="item.bedSets"
              multiple
              @visible-change='updateLC'
              @remove-tag="removeTagLC"
              :collapse-tags='true'
              filterable
              allow-create>
              <template>
                <el-option
                  v-for="item in nursePatientList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </template>
            </el-select>
            <!-- <input
              flex-box="1"
              style="width: 0;margin-right: 10px"
              v-model="item.dutyNurse"
              @blur="update"
            >-->
            <el-autocomplete v-if="HOSPITAL_ID !== 'liaocheng'" flex-box="1" style="margin-right: 20px" v-model="item.dutyNurse" :fetch-suggestions="querySearch" @select="update"></el-autocomplete>
            <el-select
              v-else
              class='hengliSelect'
              v-model="item.dutyNurses"
              multiple
              multiple-limit='2'
              @visible-change='update'
              :collapse-tags='true'
              filterable
              allow-create
              >
              <template>
                <el-option
                  v-for="item in nurseList"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </template>
            </el-select>
          </div>
        </div>
      </div>
      <!-- <div class="patient-group_btn" slot="body-btn" v-if="HOSPITAL_ID === 'hengli'">
        <el-button>保存</el-button>
      </div> -->
      <!-- :class="{'selectCon': HOSPITAL_ID !== 'hengli'}" -->
      <p slot="head-con">
        <el-select class='hengliSelect' v-if="controlStatus" multiple size='small' v-model="tepHLOptions" placeholder="请选择" @remove-tag="removeTag" @visible-change='visibleChange' @change="HLupdate">
          <template>
            <el-option v-for="item in hengliOptions" :disabled='item.disabled' :key="item.id" :label="item.groupName" :value="item.id"></el-option>
          </template>
        </el-select>
        <el-select v-else v-model="value" size='small' class="diffSelect" placeholder="请选择" @change="update">
          <template>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </template>
        </el-select>
      </p>
      <div slot='head-btn' style="margin-left: 10px; display: flex" v-if="controlStatus">
        <!-- <el-button type="primary">主要按钮</el-button>
        <el-button size="small" type="primary">编辑</el-button> -->
        <!-- <span slot="head-tool" style="margin-right: 10px;" @click="add">新建</span> -->
        <span slot="head-tool" @click="edit">编辑</span>
      </div>
    </boxBase>
    <left3Modal ref='left3Modal' @on-deletePatient="deletePatient" @on-group='onGroup'></left3Modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con {
  padding: 16px 18px;
  box-sizing: border-box;
  min-height: 220px;
  overflow: auto;
}
.title-con {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  border-bottom: 1px solid #CBD5DD;
  padding-bottom: 8px;
  margin-bottom: 13px;
}
.list-con {
  font-size: 14px;
  color: #333333;
  margin-bottom: 15px;
}
input {
  height: 32px;
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  outline: none;
  padding-left: 10px;
}
// .selectCon {
//   height: 28px !important;
//   &:hover {
//     background: #fff !important;
//   }
//   padding: 0 !important;
//   >>> input {
//     height: 28px;
//     border: 0;
//     width: 90px;
//   }
// }
.patient-group_btn{
  width: 100%;
  text-align: right;
  margin: 10px -10px 10px;
}
.diffSelect{
  width: 100px;
}
.hengliSelect >>>.el-select__tags{
  white-space:nowrap;
  overflow:hidden;
  // text-overflow:ellipsis;
}
</style>

<script>
import boxBase from "../base/box-base.vue";
import { userDictInfo, getAllPatient,leftBedlist } from "@/api/common";
import {
  viewListByDeptCode,
  viewListByDeptCodeLC,
  updateByDeptCodeAndGroupCode,
  updateByDeptCodeAndGroupCodeLC,
  deletePatientGroupById,
  saveOrUpdateHL,
  getviewListByDeptCodeZhzxy,
  getListByDeptCodeWhhk
} from "../api";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import left3Modal from '../modal/letf3-modal.vue'
import moment from 'moment'
import { hisMatch } from '@/utils/tool'
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      list: [],
      nurseList: [],
      nursePatientList: [], // 科室患者 床位
      // nurseListLecy: [], //
      loadingPatient: false,
      nursePatientSelect: [],
      isSave: true,
      fuyouBedLisg:[],
      options: [
        ...hisMatch({
          map: {
            xiegang: [
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
            ],
            other: [],
          }
        }),
        {
          value: 4,
          label: "4",
        },
        {
          value: 5,
          label: "5",
        },
        {
          value: 6,
          label: "6",
        },
        {
          value: 7,
          label: "7",
        },
        {
          value: 8,
          label: "8",
        },
        ...hisMatch({
          map: {
            'beihairenyi': [
              { value: 9, label: '9' },
              { value: 10, label: '10' },
            ],
            other: [],
          }
        }),
      ],
      hengliOptions: [],
      value: 4,
      timer: null,
      tepHLOptions: [], // 病例分组-接口返回已经保存的分组组号（groupName）
      HLlabel: [],
      controlStatus: this.HOSPITAL_ID === 'hengli' || this.HOSPITAL_ID === 'fuyou'
    };
  },
  created() {
    if (this.HOSPITAL_ID === 'hengli' || this.HOSPITAL_ID === 'fuyou') {
      // this.getViewListByDeptCode()
      // this.userDictInfo()
      this.bus.$on("indexGetAllData", this.getViewListByDeptCode);
      this.bus.$on("indexGetAllData", this.userDictInfo);
      this.bus.$on('indexGetAllData', this.getAllPatientData)
    } else {
      this.bus.$on("indexGetAllData", this.getData);
    }
    if(this.HOSPITAL_ID === 'fuyou'){
      this.bus.$on("indexGetAllBed", this.leftBedlist);
    }
  },
  mounted(){
    if(this.HOSPITAL_ID == 'zhzxy'){
      this.getGroupcode()
    }
  },
  methods: {
    getGroupcode(){
      let groupsList = [];
      this.computedList.forEach(item =>{
        groupsList.push(item.groupCode)
      } )
      if(groupsList.length){
        const groupsObj = {
          startSendTime: moment().format("YYYY-MM-DD"),
          groupsList
        }
        getviewListByDeptCodeZhzxy(this.deptCode,groupsObj).then((res)=>{
          console.log(res);
        })
      }
    },
    deletePatient() {
      this.getViewListByDeptCode()
    },
    userDictInfo() {
      userDictInfo(this.deptCode).then((res) => {
        this.nurseList = res.data.data.map((item) => ({
          value: item.name,
          code: item.code,
        }));
      });
    },
    leftBedlist() {
      leftBedlist(this.deptCode).then((res) => {
        this.fuyouBedLisg = res.data.data
      });
    },
    getAllPatientData() {
      getAllPatient(this.deptCode).then((res) => {
        if(res.data.code === '200') {
          this.nursePatientList = res.data.data
        }
      });
    },
    getViewListByDeptCode() {
      let http = this.HOSPITAL_ID === 'liaocheng' ? viewListByDeptCodeLC : viewListByDeptCode
      http(this.deptCode).then((res) => {
        if (res.data.code === '200') {
          if (res.data.data.length > 0) {
            this.hengliOptions = JSON.parse(JSON.stringify(res.data.data));
            this.hengliOptions.forEach(item => {
              if (item.bedSet || item.dutyNurse)
                this.$set(item, 'disabled', true)
              else this.$set(item, 'disabled', false)
              if(item.dutyNurse.length>0){
                item.dutyNurses = item.dutyNurse.split(",")
              }else item.dutyNurses=[]
              if(item.bedSet.length>0){
                item.bedSets = item.bedSet.split(",")
              }else item.bedSets=[]
              // item.dutyNurseNos = []
              this.$set(item, 'dutyNurseNos', [])
              item.bedSetlist = []
            })
            this.tepHLOptions = []
            res.data.data.forEach(item => {
              if(item.isShow === '1') {
                this.tepHLOptions.push(item.id)
              }
            })
          }
        }
      });
    },
    onGroup(item) {
      this.getViewListByDeptCode()
    },
    edit() {
      this.$refs.left3Modal.visible = true
      // 横沥-病人分组-编辑的时候-获取分组名称
      viewListByDeptCode(this.deptCode).then((res) => {
        if (res.data.code === '200') {
          if (res.data.data.length > 0)
            this.$refs.left3Modal.form.patientGroups = res.data.data;
        }
      });
    },
    renderItem(groupCode) {
      return {
        bedSet: null,
        createTime: null,
        deptCode: null,
        dutyNurse: null,
        groupCode,
        id: null,
        updateTime: null,
      };
    },
    mergeData(orginArr, dataArr) {
      for (let item of orginArr) {
        try {
          Object.assign(
            item,
            dataArr.find((j) => j.groupCode == item.groupCode)
          );
        } catch (e) {}
      }
      return orginArr;
    },
    getData() {
      let groupdList = [
        this.renderItem(1),
        this.renderItem(2),
        this.renderItem(3),
        this.renderItem(4),
      ];
      this.pageLoading = true;
      const resultArray = [];
      for (let i = 1; i <= this.value; i++) {
        resultArray.push(`A${i}`);
      }
      let http = this.HOSPITAL_ID === 'liaocheng' ? viewListByDeptCodeLC  : this.HOSPITAL_ID === 'whhk'? getListByDeptCodeWhhk:  viewListByDeptCode
      let whhkParams={
        startSendTime:moment().format('YYYY-MM-DD'),
        groupsList:resultArray,
        deptCode:this.deptCode
      }
      http(this.HOSPITAL_ID =='whhk'? whhkParams: this.deptCode).then((res) => {
        // this.list = this.mergeData(groupdList, res.data.data);
        this.list = res.data.data;
        this.value = this.list.length > this.minGroupValue ? this.list.length : this.minGroupValue;
        this.pageLoading = false;
        setTimeout(() => {
          this.isSave = true;
        }, 300);
      });

      userDictInfo(this.deptCode).then((res) => {
        this.nurseList = res.data.data.map((item) => ({
          value: item.name,
          code: item.code,
        }));
      });
      this.getAllPatientData()
    },
    visibleChange(val) {
      let form = {
        creator: localStorage.getItem('rememberAccount'),
        patientGroups: this.HLlabel,
        deptCode:  this.deptCode
      }
      if (!val) {
        saveOrUpdateHL(form).then(res => {
          if (res.data.code === '200') {
            this.getViewListByDeptCode()
          }
        })
      }
    },
    HLupdate(val) {
      let newval=JSON.parse(JSON.stringify(val));
      let arr = JSON.parse(JSON.stringify(this.hengliOptions));
      let newList = arr.map(item=>{
          let newModel=JSON.parse(JSON.stringify(item));
          let filterItem=newval.find(newItem=>newItem==newModel.id)
        if(filterItem){
          newModel.isShow = "1"
        }else{
          newModel.isShow = "0"
        }
        return newModel;
      })
      this.HLlabel = newList
    },
    removeTag(val) {
      let arr = JSON.parse(JSON.stringify(this.hengliOptions));
      let newList = arr.find(newItem=>newItem.id === val.value)
      if (!newList.bedSet && !newList.dutyNurse) {
        this.hengliOptions.forEach((item, index) => {
          if (val.value === item.id) {
            this.hengliOptions[index].isShow = '0'
          }
        })
        let form = {
          creator: localStorage.getItem('rememberAccount'),
          patientGroups: this.hengliOptions,
          deptCode:  this.deptCode
        }
        saveOrUpdateHL(form).then(res => {
          if (res.data.code === '200') {
            this.getViewListByDeptCode()
          }
        })
      } else {
        this.tepHLOptions.push(newList.id)
        this.$message.warning("如果要隐藏本条分组，需要清空床位和责任护士")
      }
    },
    // 聊城二院 床位号多选问题
    updateLC(val) {
      if (!val) {
        this.update()
      }
    },
    removeTagLC() {
      this.update()
    },
    update(val) {
      // if (this.isSave) return;
      let data = {};
      data.deptCode = this.deptCode;
      data.patientGroups = this.controlStatus ? this.hengliOptions  : this.computedList
      let url = this.HOSPITAL_ID === 'liaocheng' ? updateByDeptCodeAndGroupCodeLC : updateByDeptCodeAndGroupCode
      url(data).then((res) => {
        if (res.data.code === '200') {
          if (this.controlStatus)
            this.getViewListByDeptCode()
          else this.getData();
        }
        // this.$message.success('更新病人分组信息成功')
      });
    },
    update2(val) {
      // if (this.isSave) return;
      if(val) return
      let data = {};
      data.deptCode = this.deptCode;
      data.patientGroups = this.controlStatus ? this.hengliOptions  : this.computedList
      data.patientGroups.forEach(item=>{
        let dutyNurseNo = []
        item.dutyNurses.forEach(nameNo=>{
          // dutyNurseNo.push(this.nurseList.find(nurse=>nameNo==nurse.value).code)
          let obj = this.nurseList.find(nurse=>nameNo==nurse.value)
          if (obj) {
            dutyNurseNo.push(obj.code)
          }
        })
        item.dutyNurseNo = dutyNurseNo.length>0 ? dutyNurseNo.join(",") : ''
        item.dutyNurse = item.dutyNurses.length>0 ? item.dutyNurses.join(",") : ''
        item.bedSet = item.bedSets.length>0 ? item.bedSets.join(",") : ''
      })
      let url = this.HOSPITAL_ID === 'liaocheng' ? updateByDeptCodeAndGroupCodeLC : updateByDeptCodeAndGroupCode
      url(data).then((res) => {
        if (res.data.code === '200') {
          if (this.controlStatus)
            this.getViewListByDeptCode()
          else this.getData();
        }
        // this.$message.success('更新病人分组信息成功')
      });
    },
    querySearch(queryString, cb) {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.update, 2000);
      cb(
        queryString
          ? this.nurseList.filter((item) => {
              return item.value.indexOf(queryString) > -1;
            })
          : this.nurseList
      );
    },
  },
  computed: {
    minGroupValue() {
      const groupValue = {
        xiegang: 1,
      }
      return groupValue[this.HOSPITAL_ID] || 4;
    },
    computedList() {
      let resultList = [];
      for (let i = 0; i < this.value; i++) {
        if (this.list[i]) {
          !this.list[i].groupCode && (this.list[i].groupCode = 'A'+(i + 1));
          !this.list[i].deptCode && (this.list[i].deptCode = this.deptCode);
          this.list[i].bedSets = this.list[i].bedSets ? this.list[i].bedSets : []
          this.list[i].dutyNurses = this.list[i].dutyNurses ? this.list[i].dutyNurses : []
          resultList.push(this.list[i]);
        } else {
          resultList.push({
            bedSet: '',
            bedSets: [], // 聊城二院 床位可以多选
            deptCode: this.deptCode,
            dutyNurse: "",
            dutyNurses: [], // 聊城二院 护士可以多选
            groupCode: 'A'+( i + 1),
          });
        }
      }
      return resultList;
    },
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.isSave = false;
      },
    },
  },
  components: {
    boxBase,
    left3Modal
  },
  filters: {
    //东莞横沥分组规则
    filterHengliGroup(index) {
      //赖振波 需求 A,A1,A1-1,A1-2,A1-3
      // A2,A2-1,A2-2,A1-3 以此类推
      let str = "A";
      if (index === 0) {
        return str;
      } else {
        let newIndex = index - 1;
        let newModel = newIndex / 4;
        let newNumber = parseInt(newModel.toString().substring(0, 1)) + 1;
        let remainderNumber = newIndex % 4;
        if (remainderNumber !== 0) {
          str = str + newNumber + "-" + remainderNumber;
        } else {
          str = str + newNumber;
        }
        return str;
      }
    },
  },
  beforeDestroy () {
    this.bus.$off("indexGetAllData");
  }
};
</script>
