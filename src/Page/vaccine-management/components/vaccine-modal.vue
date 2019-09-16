<template>
  <sweet-modal ref="modalName" :title="title" :modalWidth="500">
    <div class="content vaccine-modal">
      <div>
        <span class="type-label">疫苗名称：</span>
        <el-select
          v-model="updateData.vaccineName"
          size="small"
          placeholder="全部"
          @change="selectedVaccineName"
        >
          <el-option value>全部</el-option>
          <el-option :key="item.id" v-for="item in allVaccine" :value="item.name">{{item.name}}</el-option>
        </el-select>
        <span class="redIcon">*</span>
      </div>
      <div>
        <span class="type-label">入库日期：</span>
        <ElDatePicker
          class="date-picker"
          type="datetime"
          size="small"
          format="yyyy-MM-dd HH:mm"
          placeholder="请选择日期"
          v-model="updateData.entryTime"
          clearable
        />
        <span class="redIcon">*</span>
      </div>
      <div>
        <span class="type-label">厂家：</span>
        <el-input
          placeholder="请输入厂家"
          v-model="updateData.vaccineSupplier"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <span class="redIcon">*</span>
      </div>
      <div>
        <span class="type-label">批号：</span>
        <el-input
          placeholder="请输入批号"
          v-model="updateData.batchNumber"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <span class="redIcon">*</span>
      </div>
      <div>
        <span class="type-label">入库数量：</span>
        <el-input
          placeholder="请输入数量"
          v-model="updateData.numberOfEntries"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <span class="redIcon">*</span>
      </div>
      <div>
        <span class="type-label">状态:</span>
        <el-select
          v-model="isSelectedStatus"
          size="small"
          placeholder="全部"
          :disabled="updateData.numberOfEntries - editData.numberOfUsed<=0"
          @change="selectedStatus"
        >
          <el-option value>全部</el-option>
          <el-option :key="item.id" v-for="item in statusList" :value="item.id">{{item.name}}</el-option>
        </el-select>
        <span class="redIcon">*</span>
      </div>
    </div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
.content {
  text-align: center;
  > div {
    padding-bottom: 20px;
  }
  .type-label {
    display: inline-block;
    min-width: 70px;
    font-size: 14px;
    color: #333;
    text-align: right;
  }
  .redIcon {
    color: red;
  }
}
</style>
<style lang='scss'>
.vaccine-modal {
  .el-input {
    display: inline-block;
    width: 200px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  input {
    width: 200px;
    height: 31px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
<script>
import dayjs from "dayjs";
export default {
  props: {
    title: String,
    saveVaccine: Function,
    updateVaccine: Function
  },
  data() {
    return {
      updateData: {
        vaccineName: "", //疫苗名称
        entryTime: "", //入库日期
        vaccineSupplier: "", //厂家
        batchNumber: "", //批号
        numberOfEntries: "", //入库数量
        status: "" //状态（1有效；0无效）
      },
      isSelectedStatus: "", //选择状态
      allVaccine: [{ id: 1, name: "卡介苗" }, { id: 2, name: "乙肝疫苗" }], //全部疫苗
      statusList: [{ id: 1, name: "有效" }, { id: 0, name: "无效" }],
      editData: {}
    };
  },
  methods: {
    open(item) {
      if (item) {
        this.editData = item;
        this.updateData.vaccineName = item.vaccineName;
        this.updateData.entryTime = item.entryTime;
        this.updateData.vaccineSupplier = item.vaccineSupplier;
        this.updateData.batchNumber = item.batchNumber;
        this.updateData.numberOfEntries = item.numberOfEntries;
        this.updateData.status = item.status;
        this.updateData.id = item.id;
        this.isSelectedStatus = item.status == 1 ? "有效" : "无效";
      } else {
        for (let key in this.updateData) {
          this.updateData[key] = "";
        }
        this.isSelectedStatus = "";
      }
      this.$refs.modalName.open();
    },
    close() {
      this.$refs.modalName.close();
    },
    post() {
      this.updateData.entryTime = this.updateData.entryTime
        ? dayjs(this.updateData.entryTime).format("YYYY-MM-DD HH:mm:ss")
        : "";
      this.isSelectedStatus;
      if (
        !this.updateData.vaccineName ||
        !this.updateData.entryTime ||
        !this.updateData.vaccineSupplier ||
        !this.updateData.batchNumber ||
        !this.updateData.numberOfEntries ||
        this.updateData.status === ""
      ) {
        this.$message.warning("带*号的必须填写");
        return;
      }
      if (this.updateData.numberOfEntries < this.editData.numberOfUsed) {
        let num = this.updateData.numberOfEntries - this.editData.numberOfUsed;
        this.$message.warning("数量不能低于" + num);
        return;
      }
      if ((this.title = "添加疫苗")) {
        this.saveVaccine(this.updateData);
      } else {
        this.updateVaccine(this.updateData);
      }
    },
    // 选择疫苗
    selectedVaccineName(name) {
      this.updateData.vaccineName = name;
    },
    // 选择状态
    selectedStatus(id) {
      if (this.updateData.numberOfEntries - this.editData.numberOfUsed <= 0) {
        return;
      }
      if (!isNaN(Number(id))) {
        this.updateData.status = id;
        if (id !== "") {
          for (let i = 0; i < this.statusList.length; i++) {
            if (this.statusList[i].id == id) {
              this.isSelectedStatus = this.statusList[i].name;
              return;
            }
          }
        }
      }
    }
  },
  components: {}
};
</script>