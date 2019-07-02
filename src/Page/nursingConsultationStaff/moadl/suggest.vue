<template>
    <div class="people-modal">
        <el-dialog title="接受会诊申请" :visible.sync="dialogVisible" size="tiny" :close-on-click-modal="false" :modal="false" :before-close="beforeClose">
            <div>
                <p class="title">最主要的主要护理问题</p>
                <el-input v-model="data.problem" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" class="textare"></el-input>
                <p class="title">预期目标</p>
                <el-input  v-model="data.goal" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" class="textare"></el-input>
                <p class="title">可采取护理措施</p>
                <el-input  v-model="data.measure" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" class="textare"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" :loading="btn.postLoading" @click="submit">提 交</el-button>
                  </span>
        </el-dialog>
    </div>
</template>

<style lang="stylus" scoped>
.title
  font-size: 13px;
  color: #687179;
  margin-bottom 12px
.textare
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.20);
  border-radius: 4px;  
  font-size: 13px;
  color: #333333;
  margin-bottom 20px
  outline none
</style>

<style lang="stylus">
.people-modal
  .el-dialog__header
    background #f7fafa
    padding 10px
    border: 1px solid #EAEEF1;
    .el-dialog__title
      font-size: 13px;
      color: #333333;
  .el-dialog__body
    padding 20px    
</style>

<script>
    import {
        sug
    } from '@/api/consultation'
    export default {
        props: ['id'],
        data() {
            return {
                dialogVisible: false,
                btn: {
                    postLoading: false,
                },
                data: {
                    problem: '',
                    goal: '',
                    measure: '',
                },
            };
        },
        methods: {
            init(item) {
                this.dateTime = new Date()
                this.btn.postLoading = false
            },
            open(item) {
                this.init(item)
                this.dialogVisible = true
            },
            close() {
                this.dialogVisible = false
                this.$emit('refresh')
            },
            beforeClose(done) {
              this.$emit('refresh')
              done()
			},
            submit() {
                let postData = {}
                postData.conId = this.id,
                postData.status = '完成',
                postData.problem = this.data.problem,
                postData.measure = this.data.measure,
                postData.goal = this.data.goal,
                this.btn.postLoading = true
                sug(postData).then(res => {
                    this.$message({
                        showClose: true,
                        message: res.data.data,
                        type: 'success'
                    }) 
                    this.btn.postLoading = false
                    this.close()
                })
                .catch(()=>{
                    this.btn.postLoading = false
                })
            }
        }
    };
</script>
