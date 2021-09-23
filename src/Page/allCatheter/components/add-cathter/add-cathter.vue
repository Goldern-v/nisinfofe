<template>
    <div class="modal-page" @click.stop="closeSelf">
        <div class="add-modal" @click.stop>
            <div class="modal-title">
                创建导管
            </div>
            <div class="modal-body">
                <div class="body-seach">
                    <input type="text" placeholder="搜索导管">
                    <button class="search-btn">查询</button>
                </div>
                <div class="cathter-type">
                    <div class="type-item" v-for="(item,index) in cathterType" :key="index" @click="createCathter(item)">
                        <img src="1" alt="">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.modal-page{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
}
    .add-modal{
        width: 500px;
        height:300px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 8px;
        .modal-title{
            line-height: 50px;
            text-indent: 20px;
            border-bottom: 1px solid #ccc;
        }
        .modal-body{
            .body-seach{
                height: 40px;
                line-height: 40px;
                padding: 0 0 5px 20px;
                margin:0 10px;
                border-bottom: 1px dashed #ccc;
                input{
                    height: 28px;
                    outline: none;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .search-btn{
                    height: 28px;
                    width: 50px;
                    background-color: #ccc;
                    color: #fff;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                }
            }
            .cathter-type{
                display: flex;
                padding: 20px;
                justify-content: space-between;
                .type-item{
                    width: 100px;
                    height: 40px;
                    border-radius: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    line-height: 40px;
                    font-size: 12px;
                    cursor: pointer;
                    color: #777;
                }
            }
        }
    }
</style>
<script>
import {getCatheterTemplate} from "../../api/catheter"
export default {
props: {},
data() {
return {
    cathterType:[],
    isCreate:false
};
},
methods: {
    closeSelf(){
        this.$emit('close')
    },
    createCathter(info){
        this.$emit('create',info)
    }
},
created(){
    let deptCode = this.$store.state.sheet.patientInfo.deptCode
    if(deptCode){
        getCatheterTemplate({deptCode}).then(res=>{
            this.cathterType = res.data.data.list
            console.log(this.cathterType);
        })
    }
    
},
components: {}
};
</script>