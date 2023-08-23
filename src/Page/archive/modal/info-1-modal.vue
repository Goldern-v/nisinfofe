<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="400"
      title="归档打印"
      :enable-mobile-fullscreen="false"
    >
      <div class="list-con">
        <span class="key">责任护士：</span>
        <div class="value">
           <el-select
              class="select-multi"
              filterable
              v-model="details.dutyNurse"
              placeholder="请选择"
            >
              <el-option
                v-for="item in memberLists"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
        </div>
      </div>
      <div class="list-con">
        <span class="key">质控护士：</span>
        <div class="value">
           <el-select
              class="select-multi"
              filterable
              v-model="details.qcNurse"
              placeholder="请选择"
            >
              <el-option
                v-for="item in memberLists"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          <!-- <el-input v-model="details.qcNurse" placeholder="请输入名字" ></el-input> -->
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" @click="confirm">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.list-con {
  margin: 20px 10px;
  font-size: 16px;
  display: flex;
  align-items: center;

  .key {
    color: #687179;
  }

  .value {
    color: #333333;
  }
}

.icon-con {
  margin: 0 38px 10px;
  min-height: 20px;
}

.table-name {
  background: #FF263C;
  border-radius: 2px;
  width: 18px;
  height: 18px;
  margin-left: 4px;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 18px;
}

.modal-btn {
  overflow: hidden;
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import mixin from "../mixins/index.js";
import { uploadFileArchive, getAllNurseNamePinyin } from "../api/index.js";
export default {
  mixins: [common, mixin],
  data() {
    return {
      data: {},
      details: {},
      iconLoading: false,
      item: {},
      memberLists:[]
    };
  },
  props: {
    getArchiveList: Function
  },
  created() {
   this.getMemberLists()
  },
  watch:{
    deptCode(newVal){
      this.getMemberLists()
    }
  },
  methods: {
    getMemberLists() {
      console.log('ddddddddddddddddd');
      getAllNurseNamePinyin([this.deptCode]).then((res) => {
        this.memberLists = res.data.data || [];
      });
    },
    open(data) {
      this.item = data;
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
      this.details.dutyNurse = '',
      this.details.qcNurse = ''
    },
    // 文件归档上传
    uploadFileArchive() {
        uploadFileArchive(
          this.item.patientId,
          this.item.visitId,
          this.details.dutyNurse,
          this.details.qcNurse
        ).then(rep => {
          this.$message({
            type: "success",
            message: "文件上传成功"
          });
          this.getArchiveList();
        });
    },
    confirm() {
      this.uploadFileArchive();
      this.close();
    }
  },
  components: {}
};
</script>
