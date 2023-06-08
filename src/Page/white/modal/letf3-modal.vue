<template>
	<div ref="modal" class="modal">
		<el-dialog
			title="编辑"
			:visible.sync="visible"
			size="tiny"
			center>
			<el-form :model="form" ref="formRef" size='small' label-width="100px" class="modal_form">
				<el-form-item
					v-for="(item, index) in form.patientGroups"
					:label="index + 1 + '.'"
					:key="item.id"
					:prop="'patientGroups.' + index + '.groupName'"
					:rules="{
						required: true, message: '不能为空', trigger: 'blur'
					}"
				>
					<div style="display: flex">
						<el-input :maxlength='8' v-model="item.groupName"></el-input>
						<el-button class="remove" @click.prevent="remove(item)">-</el-button>
						<!-- <i class="el-icon-remove-outline"></i> -->
					</div>
				</el-form-item>
				<el-form-item>
					<el-button class="addBtn" size='mini' @click="add">+</el-button>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancel('formRef')">取 消</el-button>
				<el-button type="primary" @click="submitForm('formRef')">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { saveOrUpdateHL, deletePatientGroupById } from "../api";
import common from "@/common/mixin/common.mixin.js";

  export default {
    mixins: [common],
    props: {
    },
    data() {
      return {
        visible: false,
		    form: {
          creator: localStorage.getItem('rememberAccount'),
          patientGroups: [{
            groupName: '',
            groupCode: '',
            id: '',
            isShow: '1'
          }]
        },
		    groupName: [],
      };
    },
		methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form['deptCode'] = this.deptCode
            this.form.patientGroups.forEach((e, i) => {
              e.groupCode = i + 1
            });
            saveOrUpdateHL(this.form).then(res => {
              if (res.data.code === '200') {
                this.$message.success(res.data.desc);
                this.visible = false
                this.$emit('on-group', this.groupName)
              }
            })
          } else {
            return false;
          }
        });
      },
      cancel(formName) {
        this.visible = false
        this.$refs[formName].resetFields();
      },
      remove(item) {
        if (item.id) {
          if (!item.bedSet && !item.dutyNurse) {
            deletePatientGroupById(item.id).then(res => {
              if (res.data.code === '200') {
                this.$message.success("删除成功")
                this.$emit('on-deletePatient')
                var index = this.form.patientGroups.indexOf(item)
                if (index !== -1) {
                  this.form.patientGroups.splice(index, 1)
                }
              }
            })
          } else {
            this.$message.warning("如果要删除本条分组，需要清空床位和责任护士")
          }
          
        } else {
        var index = this.form.patientGroups.indexOf(item)
        if (index !== -1) {
          this.form.patientGroups.splice(index, 1)
        }
		  }
      },
      add() {
        this.form.patientGroups.push({
          groupName: '',
          groupCode: '',
          id: '',
          isShow: '1'
        });
      }
    }
  };
</script>

<style scoped lang="stylus">
.remove{
	padding: 0;
	margin-left: 10px;
	width: 19px;
	height: 16px;
	border-radius: 50%;
	margin: auto 10px;
	color: #c4c4c4;
}
.addBtn{
	padding: 5px 8px;
}
.modal_form{
	max-height: 300px;
	overflow: auto;
	.el-form-item{
		// margin-bottom: 0
	}
}
</style>