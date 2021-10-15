<template>
    <div class="del-modal">
        <div class="bg" @click="cancel"></div>
        <div class="contont">
            <div class="contont-title">{{modalTitle||'删除'}}</div>
            <div class="contont-contont">
                {{modalContont||'是否确定删除？'}}
                <!-- 是否确定删除？ -->
            </div>
            <!-- <div class="username">
                <div style="width:100px;">用户名：</div><el-input placeholder="请输入用户名" v-model="empNo"></el-input>
            </div>
            <div class="password">
                <div style="width:100px;">密码：</div><el-input placeholder="请输入密码" v-model="password" type="password"></el-input>
            </div> -->
            <div class="btns">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="sureDel">确认</el-button>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.del-modal{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.3);
    }
    .contont{
        width: 400px;
        height: 200px;
        padding: 80px 100px;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        .btns{
            display: flex;
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            justify-content: space-between;
            padding: 0 130px 20px;
            box-sizing: border-box;
        }
        .contont-title{
            display: flex;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-indent: 20px;
            font-weight: 700;
            position: fixed;
            top: 0;
            left: 0;
        }
        .contont-contont{
            text-align: center;
        }
    }
    .username,.password{
        margin-bottom: 20px;
        display: flex;
        line-height: 37px;
        /deep/ .el-input__inner{
            border: 1px solid #c2cbd2;
            width: 200px;
        }
    }
}
</style>
<script>
export default {
props: {
    modalTitle:{
        type:String,
        value:''
    },
    modalContont:{
        type:String,
        value:''
    }
},
data() {
return {
    empNo:JSON.parse(localStorage.getItem('user')).empNo||'',
    password:''
};
},
methods: {
    cancel(){
        this.$emit('closeModal');
    },
    sureDel(){
        this.$emit('delRow','','')
    }
},
components: {}
};
</script>