<template>
  <div>
    <boxBase title="病人分组" :icon="require('../images/病人分组.png')" optionTitle="分组数量">
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <div class="title-con" flex>
          <span style="width: 60px; text-align: center">组号</span>
          <span flex-box="1" style="width: 0;margin-right: 20px">床位</span>
          <span flex-box="1" style="width: 0;margin-right: 10px">责任护士</span>
        </div>
        <div class="list-con" flex="cross:center" v-for="(item, index) in HOSPITAL_ID === 'hengli' ? currentHLOptions : computedList" :key="index">
          <!-- <span style="width: 60px; text-align: center" v-if="HOSPITAL_ID == 'hengli'">{{index | filterHengliGroup(index)}}</span> -->
          <span style="width: 60px; text-align: center" v-if="HOSPITAL_ID === 'hengli'">{{ item }}</span>
          <span style="width: 60px; text-align: center" v-else-if="deptCode == '042302' && index==2 && HOSPITAL_ID=='hj'">A：</span>
          <span style="width: 60px; text-align: center" v-else-if="deptCode == '042302' && index==3 && HOSPITAL_ID=='hj'">A2：</span>
          <span style="width: 60px; text-align: center" v-else-if="deptCode == '042302' && index==4 && HOSPITAL_ID=='hj'">A3：</span>
          <span style="width: 60px; text-align: center" v-else>A{{(deptCode == '041002' && HOSPITAL_ID=='hj') || HOSPITAL_ID=='huadu' ? index+1 : index}}：</span>
          <input flex-box="1" style="width: 0;margin-right: 20px" v-model="item.bedSet" @blur="update">
          <!-- <input
            flex-box="1"
            style="width: 0;margin-right: 10px"
            v-model="item.dutyNurse"
            @blur="update"
          >-->
          <el-autocomplete flex-box="1" style="margin-right: 10px" v-model="item.dutyNurse" :fetch-suggestions="querySearch" @select="update"></el-autocomplete>
        </div>
      </div>
      <div class="patient-group_btn" slot="body-btn" v-if="HOSPITAL_ID === 'hengli'">
        <el-button>保存</el-button>
      </div>
      <!-- :class="{'selectCon': HOSPITAL_ID !== 'hengli'}" -->
      <p slot="head-con">
        <el-select v-if="HOSPITAL_ID=='hengli'" multiple size='small' v-model="hengliValue" placeholder="请选择" @change="update">
          <template>
            <el-option v-for="item in hengliOptions" :key="item.id" :label="item.groupName" :value="item.groupName"></el-option>
          </template>
        </el-select>
        <el-select v-else v-model="value" size='small' class="diffSelect" placeholder="请选择" @change="update">
          <template>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </template>
        </el-select>
      </p>
      <div slot='head-btn' style="margin-left: 10px; display: flex" v-if="HOSPITAL_ID === 'hengli'">
        <!-- <el-button type="primary">主要按钮</el-button>
        <el-button size="small" type="primary">编辑</el-button> -->
        <!-- <span slot="head-tool" style="margin-right: 10px;" @click="add">新建</span> -->
        <span slot="head-tool" @click="edit">编辑</span>
      </div>
    </boxBase>
    <left3Modal ref='left3Modal' @on-group='onGroup' :status='status' :currentIndex='currentIndex'></left3Modal>
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
</style>

<script>
import boxBase from "../base/box-base.vue";
import { userDictInfo } from "@/api/common";
import { viewListByDeptCode, updateByDeptCodeAndGroupCode, getPatientGroup } from "../api";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import left3Modal from '../modal/letf3-modal.vue'
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      list: [],
      nurseList: [],
      isSave: true,
      options: [
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
      ],
      hengliOptions: [],
      currentHLOptions: [], // 横沥-病例分组-选中分组存储数组
      value: 4, 
      hengliValue: '',
      currentIndex: 0, // 横沥-选中分组类型的index
      status: '',
      timer: null,
    };
  },
  created() {
    this.bus.$on("indexGetAllData", this.getData);
    if (this.HOSPITAL_ID === 'hengli') {
      this.getPatientGroup()
    }
  },
  methods: {
    getPatientGroup() {
      getPatientGroup(this.deptCode).then(res => {
        this.hengliOptions = res.data.data || []
      })
    },
    onGroup(item) {
      this.getPatientGroup()
      // this.hengliOptions = item
      // this.hengliValue = item[0].value
    },
    // add() {
    //   this.$refs.left3Modal.visible = true
    //   if (this.$refs.left3Modal.$refs['formRef']) {
    //     this.$refs.left3Modal.$refs['formRef'].resetFields()
    //   }
    // },
    edit() {
      this.$refs.left3Modal.visible = true
      // this.$refs.left3Modal.form.patientGroupHLs = this.hengliOptions[this.currentIndex].group
      // this.status = 'edit'
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
      viewListByDeptCode(this.deptCode).then((res) => {
        // this.list = this.mergeData(groupdList, res.data.data);
        this.list = res.data.data;
        this.value = this.list.length > 4 ? this.list.length : 4;
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
    },
    update(val) {
      // if (this.isSave) return;
      // console.log(val)
      this.currentHLOptions = val
      // // 横沥-获得选中分组的index
      // this.hengliOptions.forEach((item, index) => {
      //   if (item.value === val) {
      //     this.currentIndex = index
      //   }
      // })
      // console.log(this.currentIndex)
      let data = {};
      data.deptCode = this.deptCode;
      data.patientGroups = this.computedList;
      updateByDeptCodeAndGroupCode(data).then((res) => {
        this.getData();
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
    computedList() {
      let resultList = [];
      for (let i = 0; i < this.value; i++) {
        if (this.list[i]) {
          !this.list[i].groupCode && (this.list[i].groupCode = i + 1);
          !this.list[i].deptCode && (this.list[i].deptCode = this.deptCode);
          resultList.push(this.list[i]);
        } else {
          resultList.push({
            bedSet: "",
            deptCode: this.deptCode,
            dutyNurse: "",
            groupCode: i + 1,
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
};
</script>