<template>
    <div class="modal-bg">
        <el-dialog
            title="请选择要打印的患者"
            :visible.sync="dialogVisible"
            width="30%"
            :modal="false"
            :before-close="handleClose">
            <span>
                <el-tree
                    :data="renderList"
                    :props="props"
                    node-key="patientId"
                    show-checkbox
                    ref="selectPatientTree"
                    :default-checked-keys="defaultSelect"
                    @check-change="handleCheckChange">
                </el-tree>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button @click="selectOrCancelAll">{{selectPatient.length?'取消全部':'全选'}}</el-button>
                <el-button type="primary" @click="onSumbit">打印</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang='scss' scoped>
.modal-bg{
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
}
.el-tree{
    max-height: 500px;
    overflow-y: auto;
}
</style>
<script>
export default {
props: {
    dialogVisible:Boolean,
    treeData:Array
},
data() {
return {
    props: {
          label: 'name',
          children: ''
        },
    selectPatient:[]
};
},
methods: {
    selectOrCancelAll(){
        if(this.selectPatient.length){
            this.$refs.selectPatientTree.setCheckedNodes([])
            this.selectPatient = []
        }else{
            this.$refs.selectPatientTree.setCheckedNodes(JSON.parse(JSON.stringify(this.renderList)))
            this.selectPatient = JSON.parse(JSON.stringify(this.renderList))
        }
    },
    onSumbit(){
        if(!this.selectPatient.length){
            this.$message.error("请选择至少一名患者！")
            return
        }
        this.$emit('setPrintList',this.selectPatient)
    },
    handleClose() {
        this.$emit("setIsSelectPatient",false)
    },
    handleCheckChange(currentPatient,currentSelect,childrenSelect){
        if(currentSelect){
            this.selectPatient.push(currentPatient)
            this.selectPatient.sort((pre,next)=>pre.sortValue - next.sortValue)
        }else{
            let currentIndex = this.selectPatient.findIndex(item=>item.patientId==currentPatient.patientId)
            this.selectPatient.splice(currentIndex,1)
        }
    }
},
components: {},
created(){
    this.renderList = this.treeData.filter(item=>item.patientId)
    this.defaultSelect = this.renderList.map(item=>item.patientId)
    this.selectPatient = JSON.parse(JSON.stringify(this.renderList))
}
};
</script>