<template>
  <div>
    <sweet-modal ref="modal" title="上传图片" :modalWidth="400">
      <div class="upload-con">
        <el-upload class="avatar-uploader" :action="`/crNursing/api/file/upload?${tk}`" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarErros" :before-upload="beforeAvatarUpload" >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div slot="button">
        <el-button class="modal-btn" type="primary" @click="save">保存</el-button>
        <el-button class="modal-btn" @click="close">取消</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.upload-con
  width 180px
  height 180px
  margin 30px auto 40px
.avatar-uploader 
  >>>.el-upload 
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover
      border-color: #4BB08D;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }  
</style>

<script>
import common from '@/common/mixin/common.mixin.js'
import { profilePicture, signaturePicture } from '@/api/common.js'
import bus from 'vue-happy-bus'
  export default {
    mixins: [common],
    data() {
      return {
        imageUrl: '',
        path: '',
        id: '',
        bus: bus(this),
        tk: '',
        type: ''
      }
    },
    methods: {
      open(type) {
        this.imageUrl = ''
        this.id = ''
        this.type = type
        this.$refs.modal.open()
      },
      close() {
        this.$refs.modal.close()
      },
       handleAvatarSuccess(res, file) {
        if(res.code == '200') {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.id = res.data.id
        } else {
          this.$message.warning('登陆超时请重新登陆')
          this.$router.push('/login')
        }
      },
       handleAvatarErros(err) {
        console.log(err)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M
      },
      save() {
         if(!(this.id && this.type)) return this.$message.warning('请上传一张本地图片')
        switch(this.type) {
          case 'userHead' : {
            profilePicture(this.id).then(res => {
            this.$message.success('设置头像成功')
            localStorage.user = JSON.stringify(Object.assign(JSON.parse(localStorage.user), {icon: this.id}))
            this.bus.$emit('refreshUserImg')
            this.close()
           })
          } break
          case 'signImg' : {
            signaturePicture(this.id).then(res => {
            this.$message.success('设置签名成功')
            localStorage.user = JSON.stringify(Object.assign(JSON.parse(localStorage.user), {signature: this.id}))
            this.bus.$emit('refreshSign')
            this.close()
           })
          } break

        }

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.tk = this.token
      })
    },
    components: {}
  }
</script>
