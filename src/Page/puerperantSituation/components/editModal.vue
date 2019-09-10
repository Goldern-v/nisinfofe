<template>
  <div>
    <sweet-modal ref="modal" size="small" :title="title" @close="handleClose">
      <div class="model-content" v-loading="saveLoading" @keyup.enter="handleSave">
        <!-- 输入框 -->
        <el-input :value="editValue" class="pueperant-editmodal-input" v-if="type=='input'||type=='int'" @change="handleInputChange"></el-input>
        <!-- 日期选择 -->
        <el-date-picker
          v-if="type=='dateTime'"
          v-model="editValue"
          type="datetime"
          @change="handleValueChange"
          placeholder="选择日期时间"
        />
        <!-- 单选 -->
        <el-radio-group v-if="type=='radioGroup'" v-model="editValue" @change="handleValueChange">
          <el-radio :label="item" v-for="(item,idx) in options" :key="idx">{{item}}</el-radio>
        </el-radio-group>
        <!-- 接生者 护士列表 -->
        <el-select 
          class="nurse-select"
          v-if="type=='nurseGroup'" 
          v-model="nurseSelected" 
          multiple
          filterable
          value-key="empNo"
          @change="handleNurseSelect">
          <el-option 
            v-for="(item) in nurseList" 
            :key="item.empNo" 
            :value="item" :label="item.empName" />
        </el-select>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="handleClose" :disabled="saveLoading">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="handleSave" :disabled="saveLoading">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import commonMixin from "./../../../common/mixin/common.mixin";
import {getPatientList} from './../api/api'
export default {
  mixins:[commonMixin],
  props: {
    type: {
      type: String,
      default: "input"
    },
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "编辑"
    },
    name: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editValue: "",
      saveLoading: false,
      nurseList: [],
      nurseSelected: []
    };
  },
  mounted() {
    
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
      this.$emit("update:onClose", false);
    },
    handleValueChange(val) {
      this.$emit("update:value", val);
      this.$emit("onValueChange", val);
    },
    handleInputChange(val){
      if(this.type!=='int'){
        this.handleValueChange(val)
      }else{
        if(!val){
          this.editValue = '';
          this.handleValueChange('')
          return
        };

        let newVal = parseInt(val).toString();
        let targetChange = false;
        if(isNaN(Number(newVal))){
          newVal=this.editValue
          targetChange = true;
        }

        if(newVal.length!==val.length)targetChange = true

        this.editValue = newVal
        this.handleValueChange(newVal)

        if(targetChange){
          setTimeout(_=>document.querySelector(`.pueperant-editmodal-input input`).value=newVal)
        }
      }
    },
    handleSave() {
      // console.log(this.value);
      this.$emit("onOk", {modal:this,value: this.editValue});
    },
    handleNurseSelect(info){
      console.log(info);
      console.log(this.nurseSelected)
    } 
  },
  watch: {
    visible(val) {
      if (val) {
        this.$refs.modal.open();
      }else{
        if(this.$refs.modal.is_open)this.$refs.modal.close();
      }
    },
    value(val) {
      if (val !== this.editValue) this.editValue = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.model-content {
  margin: 15px auto;
  text-align: center;
  .nurse-select{
    width: 100%;
  }
}
</style>