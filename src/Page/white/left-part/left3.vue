<template>
  <div>
    <boxBase title="病人分组" :icon="require('../images/病人分组.png')" optionTitle="分组数量">
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <div class="title-con" flex>
          <span style="width: 60px; text-align: center">组号</span>
          <span flex-box="1" style="width: 0;margin-right: 20px">床位</span>
          <span flex-box="1" style="width: 0;margin-right: 10px">责任护士</span>
        </div>
        <div
          class="list-con"
          flex="cross:center"
          v-for="(item, index) in computedList"
          :key="index"
        >
          <span style="width: 60px; text-align: center" v-if="deptCode == '042302' && index==2 && HOSPITAL_ID=='hj'">A：</span>
          <span style="width: 60px; text-align: center" v-else-if="deptCode == '042302' && index==3 && HOSPITAL_ID=='hj'">A2：</span>
          <span style="width: 60px; text-align: center" v-else-if="deptCode == '042302' && index==4 && HOSPITAL_ID=='hj'">A3：</span>
          <span style="width: 60px; text-align: center" v-else>A{{(deptCode == '041002' && HOSPITAL_ID=='hj') || HOSPITAL_ID=='huadu' ? index+1 : index}}：</span>
          <input
            flex-box="1"
            style="width: 0;margin-right: 20px"
            v-model="item.bedSet"
            @blur="update"
          >
          <!-- <input
            flex-box="1"
            style="width: 0;margin-right: 10px"
            v-model="item.dutyNurse"
            @blur="update"
          >-->
          <el-autocomplete
            flex-box="1"
            style="width: 0;margin-right: 10px"
            v-model="item.dutyNurse"
            :fetch-suggestions="querySearch"
            @select="update"
          ></el-autocomplete>
        </div>
      </div>
      <span slot="head-con" class="selectCon">
        <el-select v-model="value" placeholder="请选择" @change="update">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
    </boxBase>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  padding 16px 18px
  box-sizing border-box
  min-height 220px
  overflow auto
.title-con
  font-size: 14px;
  font-weight bold
  color: #333333;
  border-bottom: 1px solid #CBD5DD
  padding-bottom 8px
  margin-bottom 13px
.list-con
  font-size: 14px;
  color: #333333;
  margin-bottom 15px
input
  height 32px
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px
  outline none
  padding-left 10px
.selectCon {
  height 28px !important
  &:hover {
    background #fff !important;
  }
  padding 0 !important
  >>> input {
    height 28px
    border 0
    width 90px
  }
}
</style>

<script>
import boxBase from "../base/box-base.vue";
import { userDictInfo } from "@/api/common";
import { viewListByDeptCode, updateByDeptCodeAndGroupCode } from "../api";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
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
          label: "4"
        },
        {
          value: 5,
          label: "5"
        },
        {
          value: 6,
          label: "6"
        },
        {
          value: 7,
          label: "7"
        },
        {
          value: 8,
          label: "8"
        }
      ],
      value: 4,
      timer: null
    };
  },
  created() {
    this.bus.$on("indexGetAllData", this.getData);
  },
  methods: {
    renderItem(groupCode) {
      return {
        bedSet: null,
        createTime: null,
        deptCode: null,
        dutyNurse: null,
        groupCode,
        id: null,
        updateTime: null
      };
    },
    mergeData(orginArr, dataArr) {
      for (let item of orginArr) {
        try {
          Object.assign(item, dataArr.find(j => j.groupCode == item.groupCode));
        } catch (e) {}
      }
      return orginArr;
    },
    getData() {
      let groupdList = [
        this.renderItem(1),
        this.renderItem(2),
        this.renderItem(3),
        this.renderItem(4)
      ];
      this.pageLoading = true;
      viewListByDeptCode(this.deptCode).then(res => {
        // this.list = this.mergeData(groupdList, res.data.data);
        this.list = res.data.data;
        this.value = this.list.length > 4 ? this.list.length : 4;
        this.pageLoading = false;
        setTimeout(() => {
          this.isSave = true;
        }, 300);
      });

      userDictInfo(this.deptCode).then(res => {
        this.nurseList = res.data.data.map(item => ({
          value: item.name,
          code: item.code
        }));
      });
    },
    update() {
      // if (this.isSave) return;

      let data = {};
      data.deptCode = this.deptCode;
      data.patientGroups = this.computedList;
      updateByDeptCodeAndGroupCode(data).then(res => {
        this.getData();
        // this.$message.success('更新病人分组信息成功')
      });
    },
    querySearch(queryString, cb) {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.update, 2000);
      cb(
        queryString
          ? this.nurseList.filter(item => {
              return item.value.indexOf(queryString) > -1;
            })
          : this.nurseList
      );
    }
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
            groupCode: i + 1
          });
        }
      }
      return resultList;
    }
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.isSave = false;
      }
    }
  },
  components: {
    boxBase
  }
};
</script>
