<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modalName"
    size="small"
    :title="title"
    :overlay-theme="overlayTheme"
  >
    <p for="" class="name-title" style="margin-top: 0">请输入当前密码</p>
    <div action="" @keyup.13="post">
      <el-input
        size="small"
        type="password"
        placeholder="请输入当前密码"
        v-model="oldPswd"
      ></el-input>
    </div>
    <p for="" class="name-title">请输入新密码</p>
    <div action="" @keyup.13="post">
      <el-input
        size="small"
        type="password"
        placeholder="请输入新密码"
        v-model="newPswd"
      ></el-input>
    </div>
    <p for="" class="name-title">请重复新密码</p>
    <div action="" @keyup.13="post">
      <el-input
        size="small"
        type="password"
        placeholder="请重复新密码"
        v-model="rePswd"
      ></el-input>
    </div>
    <p
      for=""
      class="name-title password-security-level"
      v-if="securityLevelVisible"
    >
      <span>密码强度</span>
      <span class="progress-bar">
        <span
          v-for="levelItem in securityLevelStatusList"
          :key="levelItem.level"
          :style="{
            backgroundColor:
              securityLevel >= levelItem.level ? levelItem.statusColor : '#ddd',
          }"
        >
        </span>
      </span>
    </p>
    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click="handleClose">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title {
  font-size: 14px;
  margin: 15px 0 10px;
  font-weight: bold;
}

.password-security-level {
  display: flex;
  align-items: center;

  .progress-bar {
    display: flex;
    flex: 1;
    align-items: center;
    padding-left: 15px;
    padding-right: 100px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.3);
    }

    &>span {
      flex: 1;
      display: block;
      height: 12px;
      margin: 0 1px;
    }
  }
}
</style>
<script>
import { changePassword } from "@/api/index.js";
import { getSysPasswordSet } from "@/api/common";

export default {
  props: {
    title: {
      type: String,
      default: "修改密码",
    },
    overlayTheme: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      oldPswd: "",
      newPswd: "",
      rePswd: "",
      securityLevelStatusList: [
        { level: 1, statusColor: "red" },
        { level: 2, statusColor: "darkorange" },
        { level: 3, statusColor: "orange" },
        { level: 4, statusColor: "yellow" },
        { level: 5, statusColor: "green" },
      ],
      securityLevelVisible: false,
      permit: {},
    };
  },
  computed: {
    securityLevel() {
      let newPsw = this.newPswd.trim();
      let level = 0;

      if (/[0-9]/.test(newPsw)) level++;
      if (/[a-z]/.test(newPsw)) level++;
      if (/[A-Z]/.test(newPsw)) level++;
      if (/[^a-zA-Z0-9]/.test(newPsw)) level++;
      if (newPsw.length >= 8) level++;

      return level;
    },
  },
  methods: {
    getSecurityLevelSetting() {
      if (this.HOSPITAL_ID === "zhongshanqi") {
        this.permit = {};

        getSysPasswordSet().then(
          (res) => {
            let params = res.data.data[0] || {};

            if (params.passwordVariety) {
              this.securityLevelVisible = true;
            } else {
              this.securityLevelVisible = false;
            }

            this.permit = params;
          },
          () => {}
        );
      }
    },
    open() {
      this.oldPswd = "";
      this.newPswd = "";
      this.rePswd = "";
      this.password = "";
      this.$refs.modalName.open();
      this.getSecurityLevelSetting();
    },
    handleClose() {
      this.$refs.modalName.close();
    },
    post() {
		if(this.HOSPITAL_ID == 'beihairenyi'){
			//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/  8~16位大写、小写和数字
			let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/  //大于8位大写、小写和数字
			if(this.oldPswd=='' || this.oldPswd!=localStorage.getItem('ppp')){
				this.$message({
					showClose: true,
					message: '请正确输入旧密码',
				});
				return false
			}else if(this.newPswd=='' || this.rePswd==''){
				this.$message({
					showClose: true,
					message: '新密码不能为空',
				});
				return false
			}else if(this.newPswd!=this.rePswd){
				this.$message({
					showClose: true,
					message: '两次密码不一样,请重新输入',
				});
				return false
			}else if(!reg.test(this.newPswd)){
				// 密码至少包含大写字母，小写字母，数字，且不少于8位
				this.$message({
					showClose: true,
					message: '密码必须包含英文字母大写、小写和数字，且不少于8位',
				});
				return false
			}
		}
      changePassword(this.oldPswd, this.newPswd, this.rePswd).then((res) => {
        let msg = this.permit.passwordThreshold
          ? "修改成功，建议三个月修改一次密码"
          : res.data.desc;

        this.$message({
          showClose: true,
          message: msg,
        });
        this.handleClose();
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      });
    },
  },
  components: {},
};
</script>
