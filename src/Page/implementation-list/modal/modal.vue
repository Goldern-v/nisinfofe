<template>
    <div class="modal" id="printIframe" style="display:none">
        <div class="page">
            <div class="modal-title">
                    瓶签打印
            </div>
            <i class="el-icon-close cancel-btn" @click="close()"></i>
            <div class="pre-print">
                <iframe :src="src" frameborder="0" id="pdfpage" style="display:none"></iframe>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
    .modal{
        position:absolute;
        z-index:999;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow-x:auto;
        background-color:rgba(0,0,0,.5);
        .page{
            width: 60vw;
            height: 90vh;
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translate(-50%);
            border: 1px solid #000;
            box-shadow:10px 10px 5px #000;
            background-color:#dddddd;
            .modal-title{
                line-height: 40px;
                background-color: #f7fafa;
                text-indent: 30px;
            }
            .cancel-btn{
                position: absolute;
                top: 15px;
                right: 15px;
                cursor: pointer;
            }
            .pre-print{
                padding: 20px;
                iframe{
                width: 100%;
                height: 80vh;
            }
            }
        }
    }
</style>
<script>
export default {
props: {
    src:{
        type:String,
        value:''
    }
},
data() {
return {};
},
methods: {
    close(){
        this.$emit("changeModal",false)
    }
},
created(){
    this.$nextTick(()=>{
        $('#pdfpage')[0].contentWindow.print()
})
},
mounted(){
},
computed:{
},
watch:{
},
components: {}
};
</script>