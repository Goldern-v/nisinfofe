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
        <div class="value" @click="onSign('dutyNurse')">
          {{details.dutyNurse}}
          <!-- <el-input v-model="details.dutyNurse" placeholder="请输入名字" ></el-input> -->
        </div>
      </div>
      <div class="list-con">
        <span class="key">质控护士：</span>
        <div class="value" @change="onSign('qcNurse')">
          {{ details.qcNurse }}
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
    width: 150px;
    height: 30px;
    text-align: center;
    border-bottom: 1px solid #000;
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
import { uploadFileArchive, getVerifyUser } from "../api/index.js";
export default {
  mixins: [common, mixin],
  data() {
    return {
      data: {},
      details: {},
      iconLoading: false,
      item: {}
    };
  },
  props: {
    getArchiveList: Function
  },
  methods: {
    onSign(key) {
      window.openSignModal((password, empNo) => {
        let post = {
          empNo,
          password,
        };
        getVerifyUser(post).then((res) => {
          let {data:{data}} = res;
          this.$set(this.details, key, data.empName)
          this.$message.success("签名成功");
        }).catch(err => {
          this.$message.success("签名失败" + err.data.desc);
        })
       })
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
