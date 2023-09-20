<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="HOSPITAL_ID == 'hj' ? 1070 : 820"
      title="检查预约项目配置"
      :fullBtn="true"
      :enable-mobile-fullscreen="false"
    >
      <div class="select-con">
        <!-- <el-checkbox-group v-model="checkList">
          <el-checkbox :label="item" v-for="item in allList" :key="item"></el-checkbox>
        </el-checkbox-group>-->

        <!-- <masked-input type="text" name="phone" class="form-control" v-model="phone" :mask="[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]" :guide="true" placeholderChar="0">
        </masked-input>
        {{phone}}-->
        <table class="table-con">
          <colgroup>
            <col width="100" />
            <col width="80" />
            <col width="100" />
            <col width="350" />
            <col width="220" />
            <col width="250" v-if="HOSPITAL_ID == 'hj'" />
          </colgroup>
          <tr>
            <th center p1>是否显示</th>
            <th center p2>床号</th>
            <th center p3>姓名</th>
            <th left p4>检查项目</th>
            <th center p5>预约时间</th>
            <th center p5 v-if="HOSPITAL_ID == 'hj'">检查特殊交代</th>
          </tr>
          <tr v-for="item of list" :key="item.id">
            <td center p1>
              <el-checkbox
                v-model="item.showFlag"
                @change="onCheckBoxClick(item)"
              ></el-checkbox>
            </td>
            <td center p2>
              <span>{{ item.bedLabel }}</span>
            </td>
            <td center p3>
              <span v-if="HOSPITAL_ID == 'xiegang'">{{ item.name }}</span>
              <span v-else>{{ item.nameOrigin }}</span>
            </td>
            <td left p4>
              <span>{{ item.examItem }}</span>
            </td>
            <td left p5>
              <!-- <input type="text" class="auto-input" v-model="item.scheduleDate" center> -->
              <el-date-picker
                v-if="HOSPITAL_ID === 'huadu'"
                v-model="item.scheduleDate"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                @change="changeDate(item)"
              >
              </el-date-picker>
              <masked-input
                v-else
                @click="onMaskClick(item)"
                type="text"
                class="mask-input"
                :showMask="false"
                v-model="item.scheduleDate"
                :mask="
                  () => [
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    ':',
                    /\d/,
                    /\d/
                  ]
                "
                :guide="true"
                placeholderChar="O"
              ></masked-input>
            </td>
            <td left p5 v-if="HOSPITAL_ID == 'hj'">
              <el-select
                v-model="item.description"
                multiple
                filterable
                allow-create
                placeholder="请选择"
              >
                <el-option
                  v-for="option in options"
                  :key="option.name"
                  :label="option.name"
                  :value="option.name"
                >
                </el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </div>
      <div slot="button">
        <el-button class="modal-btn" type="primary" @click="post"
          >&nbsp;保存&nbsp;</el-button
        >
        <el-button class="modal-btn" @click="close">&nbsp;取消&nbsp;</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.table-con {
  border-collapse: collapse;
  margin-bottom: 40px;
  width: 100%;

  td, tr, th {
    border: 1px solid #E3E7EA;
  }

  td {
    height: 36px;
    vertical-align: middle;
  }

  th {
    background: #F7FAFA;
    height: 36px;
    font-size: 13px;
    color: #687179;
    font-weight: bold;
    vertical-align: middle;
  }

  *[left] {
    text-align: left;
  }

  *[center] {
    text-align: center;
  }

  *[p1] {
    padding: 0 12px;
  }

  *[p2] {
    padding: 0;
  }

  *[p3] {
    padding: 0 8px;
  }

  *[p4] {
    padding: 0 13px;
  }

  *[p5] {
    padding: 0 13px;
  }
  >>>.el-select {
    input {
      border: none;
    }
    .el-input__icon {
      display: none;
    }
  }
}

.auto-input, .mask-input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  font-size: 16px;
}
</style>
<script>
import { GetAllExamAppoint, saveExamAppointList } from "../api/index.js";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import { multiDictInfo, setList } from "@/api/common.js";
export default {
  mixins: [common],
  data() {
    return {
      list: [],
      options: []
    };
  },
  computed: {
    maxSortValue() {
      return Math.max(
        ...this.boardConfigureList.map(item => item.sortValue),
        0
      );
    }
  },
  mounted() {
    if (this.HOSPITAL_ID == "hj") {
      this.getMulOptions();
    }
  },
  methods: {
    open() {
      GetAllExamAppoint(this.deptCode).then(res => {
        this.list = res.data.data.map(item => {
          if (item.showFlag == "0") {
            item.showFlag = false;
          } else {
            item.showFlag = true;
          }
          if (this.HOSPITAL_ID == "hj") {
            item.description = item.description
              ? item.description.split(",")
              : [];
          }
          return item;
        });
      });
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let data = this.list.map(item => {
        if (item.showFlag == false) {
          item.showFlag = "0";
        } else {
          item.showFlag = "1";
        }
        item.scheduleDate =
          item.scheduleDate && item.scheduleDate.replace(/\O/g, 0);
        if (this.HOSPITAL_ID == "hj") {
          item.description = item.description.join(",");
        }
        return item;
      });
      saveExamAppointList({ list: data }).then(res => {
        this.$message.success("配置修改成功");
        this.$parent.getData();
        this.close();
      });
    },
    onMaskClick(item) {
      if (!item.scheduleDate) {
        item.scheduleDate = moment("08:00", "HH:mm")
          .add(1, "d")
          .format("YYYY-MM-DD HH:mm");
      }
    },
    changeDate(item) {
      if (item.scheduleDate) {
        item.scheduleDate = moment(item.scheduleDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    },
    onCheckBoxClick(item) {
      if (!item.scheduleDate && item.showFlag) {
        item.scheduleDate = moment("08:00", "HH:mm")
          .add(1, "d")
          .format("YYYY-MM-DD HH:mm");
      }
      if (!item.showFlag) {
        item.scheduleDate = "";
      }
    },
    getMulOptions() {
      multiDictInfo(["检查特殊交代"]).then(res => {
        let data = res.data.data;
        setList(this.options, "检查特殊交代", data);
      });
    }
  },
  components: {}
};
</script>
