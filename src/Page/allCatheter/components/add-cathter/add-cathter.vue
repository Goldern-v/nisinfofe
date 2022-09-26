<template>
    <div class="modal-page" @click.stop="closeSelf">
        <div class="add-modal" @click.stop>
            <div class="modal-title">
                创建导管
            </div>
            <div class="modal-body">
                <div class="body-seach">
                    <input type="text" placeholder="搜索导管" v-model="type">
                    <button class="search-btn" @click="search">查询</button>
                </div>
                <div class="cathter-type">
                    <div class="type-item" v-for="(item,index) in renderList" :key="index" @click="createCathter(item)">
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
        height:350px;
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
                    background-color: #4bb08d;
                    color: #fff;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                }
            }
            .cathter-type{
                display: flex;
                height: 243px;
                overflow: auto;
                box-sizing: border-box;
                flex-wrap: wrap;
                padding: 20px;
                .type-item{
                    box-sizing: border-box;
                    min-width: 100px;
                    margin-right:10px;
                    margin-bottom:5px;
                    height: 40px;
                    border-radius: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    line-height: 40px;
                    font-size: 12px;
                    cursor: pointer;
                    color: #777;
                    padding: 0 5px;
                }
            }
        }
    }
</style>
<script>
import {getCatheterTemplate} from "@/Page/allCatheter/api/catheter"
export default {
props: {},
data() {
return {
    cathterType:[],
    renderList:[],
    isCreate:false,
    type:''
};
},
methods: {
    closeSelf(){
        this.$emit('close')
    },
    createCathter(info){
        this.$emit('create',info)
    },
    search(){
        if(this.type){
            this.renderList = this.cathterType.filter(item=>{
                return item.name.includes(this.type)
            })
        }else{
            this.renderList = this.cathterType
        }
    }
},
created(){
    let deptCode = this.$store.state.sheet.patientInfo.deptCode
    if(deptCode){
        getCatheterTemplate({deptCode}).then(res=>{
            this.cathterType = res.data.data.list
            this.renderList = this.cathterType
        })
    }

},
components: {}
};
</script>
