<template>
  <div>
    <el-dialog
      title="批量审核"
      :visible="batchAuditDialog"
      width="30%"
      :before-close="close"
    >
      <div class="border"></div>
      <div class="audit-form" v-if="!isEmpty">
        <el-checkbox
          v-model="checkAll"
          @change="handleCheckAllChange"
          :indeterminate="isIndeterminate"
        >
          全选
        </el-checkbox>
        <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
          <template v-for="(item, index) in batchAuditForms.children">
            <el-checkbox
              :key="item.form_id"
              :label="item.form_id"
              class="d-flex"
              v-if="item.status == '1'"
            >
              <span>
                <div>
                  {{`第${batchAuditForms.children.length - index}页`}}&nbsp;
                  {{item.formName}}&nbsp;{{item.label}}
                </div>
              </span>
            </el-checkbox>
          </template>
        </el-checkbox-group>
      </div>
      <div v-else class="empty">暂无数据</div>
      <div class="border"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirmAudit">确 定</el-button>
      </span>
    </el-dialog>
    <signModal ref="signModal"/>
  </div>
</template>

<script>
import signModal from "@/components/modal/sign.vue";
import moment from "moment";
import { handleBatchAudit } from "../api/index.js";
export default {
  components: { signModal },
  props: {
    batchAuditDialog: {
      type: Boolean,
      default: () => false
    },
    batchAuditForms: {
      type: Object,
      default: () => {}
    },
    refreshTree: {
      type: Function,
    }
  },
  data() {
    return {
      checkList: [],
      checkAll: false,
      isIndeterminate: false,
    };
  },
  mounted() {
  },
  computed: {
    isEmpty() {
      return this.batchAuditForms.children && this.batchAuditForms.children.filter(item => item.status == '1').length == 0
    },
    canAudit() {
      return this.batchAuditForms.children && this.batchAuditForms.children.filter(item => item.status == '1')
    }
  },
  methods: {
    close() {
      // console.log('eee', this.isEmpty);
      this.checkList = []
      this.checkAll = false
      this.isIndeterminate = false
      this.$emit('closeBatchAudit', false)
    },
    confirmAudit() {
      // console.log("确认签名", this.checkList)
      if (!this.checkList.length) {
        return this.$message({
          message: "请选择审核表单",
          center: true,
        });
      }
      const signData={}
      this.batchAuditForms.children.forEach((item,index)=>{
        signData['label'+index] =item.label
      })
      let SigndataObj={
        Document_ID:this.batchAuditForms.formCode,
        Document_Title:this.batchAuditForms.label,
        Section_ID:this.batchAuditForms.children[0].form_id,
        strSignData: JSON.stringify(signData),
        Patient_ID:this.batchAuditForms.query.patientId,
        Visit_ID:this.batchAuditForms.query.visitId
      }
      let verifySignObj={
        patientId:this.batchAuditForms.query.patientId,
        visitId:this.batchAuditForms.query.visitId,
        formCode:this.batchAuditForms.formCode,
        formName:this.batchAuditForms.label,
        instanceId:this.batchAuditForms.children[0].form_id,
        recordId:"",
        signData:JSON.stringify(signData)
      }
      this.$refs.signModal.open((password, empNo) => {
        const params = {
          ids: this.checkList,
          password,
          empNo
        }
        handleBatchAudit(params)
        .then(res => {
          // console.log('reszzzz', res);
          this.$message.success("操作成功");
          this.$emit('closeBatchAudit', true)
        })
        .catch(error => {
          return error
        })
      },undefined,false,undefined,undefined,undefined,undefined,undefined,undefined,SigndataObj,verifySignObj)
    },
    handleCheckAllChange(val) {
      this.checkList = this.checkAll ? this.canAudit.map(item => item.form_id) : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      const allLength = this.canAudit.map(item => item.form_id).length
      this.checkAll = allLength === value.length
      this.isIndeterminate = value.length > 0 && value.length < allLength;
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm")
    }
  }
};
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog {
    top: 25%;
    // max-height: calc(100vh - 30px);
    border-radius: 5px;
    .el-dialog__footer {
      padding-top: 0px;
      text-align: center;
    }
    .el-dialog__body {
      padding: 20px;
    }
    .audit-form {
      max-height: 420px;
      padding-top: 10px;
      overflow: auto;
    }
  }
  .border {
    border-bottom: 1px solid lightgray;
  }
  .d-flex {
    display: flex;
    align-items: center;
  }
  .wrap {
    flex-wrap: wrap;
  }
  .el-checkbox {
    margin: 10px 10px;
    &:first-child {
      margin-top: 0px;
    }
  }
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
  }
</style>
