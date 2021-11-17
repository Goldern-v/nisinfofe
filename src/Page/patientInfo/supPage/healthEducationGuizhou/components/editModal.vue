<template>
  <div>
    <SweetModal ref="modal" :title="title" :modal-width="450">
      <ElForm
        :model="form"
        ref="ruleForm"
        :rules="rules"
        class="edit-modal-form"
        style="margin-bottom: 20px"
        label-width="100px"
      >
        <ElFormItem prop="state" label="宣教内容："  >
          <div style="display:flex">
            <el-cascader v-model='cascaderValue' :options="optionList" filterable :show-all-levels="false" popper-class='health-education-exclusive-cascade-selector-drop-down'></el-cascader>
            <!-- <el-select
              v-model="form.state"
              filterable
              remote
              reserve-keyword
              :disabled="disabled"
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.missionId"
                :label="item.name"
                :value="item.missionId"
              > -->
                <!-- 添加科室名称 -->
                <!-- <span style="float: left">{{item.deptName}}</span> -->
                <!-- <span v-if="item.type && item.deptName && item.deptName!='' && item.name.indexOf(item.deptName)==-1" style="float: left">{{item.deptName}}</span> -->
                <!-- <span
                  v-for="(a, index) in setItem(item.name)"
                  :class="a.type >= 0 ? 'redColor' : ''"
                  :key="index"
                  style="float: left"
                  >{{ a.item }}</span
                > -->
                <!-- 添加宣教类型 -->
                <!-- <span v-if="item.type && item.type!='' && item.type!=item.name">-{{item.type}}</span> -->
              <!-- </el-option>
            </el-select> -->
            <el-button 
              type="text" 
              class="modal-btn" 
              @click="handleOpenRichEditorModal"
            >
              编辑
            </el-button>
          </div>
        </ElFormItem>
        <ElFormItem
          prop="date"
          label="教育时间："
          v-if="(modalStatus && HOSPITAL_ID == 'hj') || HOSPITAL_ID == 'guizhou'"
        >
          <el-date-picker
            popper-class="picker-dropdown"
            v-model="date"
            type="datetime"
            align="center"
            format="MM-dd HH:mm"
            placeholder="选择教育时间"
          ></el-date-picker>
        </ElFormItem>
        <ElFormItem prop="object" label="教育对象：">
          <ElSelect v-model="form.object" multiple >
            <ElOption
              v-for="item in educationObiect"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem prop="method" label="教育方法：">
          <ElSelect v-model="form.method">
            <!-- <ElOption value="3" key="3" label="在线" v-if="isOk">在线</ElOption> -->
            <ElOption
              v-for="item in educationMethod"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem prop="assessment" label="教育评估：">
          <ElSelect v-model="form.assessment">
            <ElOption
              v-for="item in educationAssessment"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem prop="remarks" label="备注：">
          <ElInput v-model="form.remarks" />
        </ElFormItem>
        <!-- <ElFormItem prop="signature" label="签名：">
          <ElInput v-model="form.signature" />
        </ElFormItem>-->
        <ElFormItem label="执行人：" required>
          <span>{{ curEmpName }}</span>
          <span class="btn" @click="openSignModal">切换</span>
        </ElFormItem>
      </ElForm>
      <ElButton slot="button" @click="close">取消</ElButton>
      <ElButton slot="button" type="primary" @click="submitForm('ruleForm')"
        >保存</ElButton
      >
    </SweetModal>
    <hdRichTextModal
      ref="richEditorModal"
      :content.sync="content"
      :storageContent="content"
      :title="templateTitle"
      @confirmEdit="updateContent"
    >
    </hdRichTextModal>
  </div>
</template>

<script>
import { educationObiect, educationMethod, educationAssessment } from "../text";
import dayjs from "dayjs";
import { getEduFormTemplate, saveMission, getUser, getContentByMissionId } from "../api/healthApi";
import qs from "qs";
import hdRichTextModal from './hdRichTextModal.vue';
import { isEqualDateStr } from '@/Page/index/supComponents/calendar/tools';
export default {
  props: {
    blockId: {
      type: Number,
      default: "",
    },
    pageParam: {
      //表格数据
      type: Array,
      default: () => [],
    },
  },
  components: { hdRichTextModal },
  data() {
    let validateObject = (rule, value, callback) => {
        if (!value || value == '' || (Array.isArray(value) && value.length<=0)) {
          callback(new Error('请选择教育对象'));
        } else {
          callback();
        }
      };
    return {
      isEdit:false,
      title: "",
      modalStatus: false, // 判断当前状态是编辑还是添加
      missionId:"",
      form: {
        state: "",
        object: [],
        method: "",
        assessment: "",
        remarks: "",
        signature: "",
      },
      curEmpName: "", // 初始化签名姓名
      curEmpNo: "", // 初始化签名工号
      disabled: false, // 宣教内容是否置灰
      type: 1, // 弹框类型 1-修改 2-新增
      name: "", // 宣教内容下拉搜索框内容
      loading: false, // 下拉框load
      missionList: [], // 健康教育下拉框数据
      options: [], // 宣教内容下拉框数据
      optionList:[],
      cascaderValue:[],
      itemData: {}, // 修改时暂存参数
      date: "", // 修改时的宣教时间
      isOk: false, // 教育对象是否禁用（根据状态判断 -1:删除，0:未推送，1:未读，1R:已读，2:已明白，3:有疑问， 后面三个可以）
      rules: {
        state: [{ required: true, message: "请输入宣教内容", trigger: "blur" }],
        object: [
          {  required: true, validator: validateObject, trigger: "blur" },
          //{ required: true, message: "请选择教育对象", trigger: "blur" },
        ],
        method: [
          { required: true, message: "请选择教育方法", trigger: "blur" },
        ],
        assessment: [
          { required: true, message: "请选择教育评估", trigger: "blur" },
        ],
        signature: [{ required: true, message: "请输入签名", trigger: "blur" }],
      },
      educationObiect: educationObiect,
      educationMethod: educationMethod,
      educationAssessment: educationAssessment,
      content: "", // 宣教内容模板
      templateTitle: "", // 模板标题
      debounceTimer:null,//防抖定时器
    };
  },
  methods: {
    // 打开弹框
    async open(title, form) {
      var obj = JSON.parse(localStorage.getItem("user"));
      this.curEmpName = obj.empName;
      this.curEmpNo = obj.empNo;
      this.type = form ? 2 : 1;
      this.disabled = !!form;
      if (form) {
        this.isEdit=true
        this.content = form.item.content;
        //console.log('this.content', this.content);
        //赋值富文本
         this.$refs.richEditorModal.changeEditContent(form.item.content);

        //编辑
        this.modalStatus = true;
        let statusText = this.setStatus(form["item"].status); // 推送状态
        let status = form["item"].status;
        if (status && (status === "1R" || status === "2" || status === "3")) {
          this.isOk = true;
        }
        this.title =
          title +
          `<span style="margin-left:10px;color:${
            statusText === "未推送" ? "red" : "blue"
          };">${statusText}</span>`;
        this.itemData = form["item"];
        this.form.state = form["宣教内容"];
        this.date = form["教育时间"];
        // let object = educationObiect.filter(
        //   (item) => item.text === form["教育对象"]
        // )[0];
        let object=[];
        if(form["教育对象"] && form["教育对象"]!=''){
          object=educationObiect.reduce((total,item,index)=>{
          return total=form["教育对象"].split(",").includes(item.text)?total.concat(item.value):total
        },[]);
        }
        
        let method = educationMethod.filter(
          (item) => item.text === form["教育方法"]
        )[0];
        let assessment = educationAssessment.filter(
          (item) => item.text === form["教育评估"]
        )[0];
        this.form.object = object ? object : [];
        // this.form.method = method ? method.value || "3" : "1";
        this.form.method = method
          ? method.value
          : form["教育方法"] === "在线"
          ? "3"
          : "1";
        this.form.assessment = assessment ? assessment.value : "";
        this.form.remarks = form["备注"] || "";
        this.form.signature = form["签名"] || "";
      } else {
        //新增
        this.modalStatus = false;
        this.title = title;
        this.isOk = false;
        this.cascaderValue = [];
        // 添加时清空表单
        this.form = {
          state: "",
          object: [],
          method: "1",
          assessment: "",
          remarks: "",
          signature: "",
        };
        //贵州给初始教育时间
        (this.HOSPITAL_ID == 'guizhou') && (this.date=dayjs(new Date()).format("MM-DD HH:mm"));
        //赋值富文本
         this.$refs.richEditorModal.changeEditContent("");
      }
      let params = {
        type: "",
        name: ' ',
      };
      (this.$route.query.wardCode) && (params.deptCode=this.$route.query.wardCode);
      let optionRes = await getEduFormTemplate(params);
      this.optionList = this.getOption(optionRes.data.data)
      if(form&&form.item&&form.item.missionId){
        let currentObj = this.options.filter(e=>e.missionId==form.item.missionId)[0]
        this.form.state = currentObj.missionId
        this.cascaderValue = [currentObj.type,currentObj.missionId]
      }
      this.$refs.modal.open();
    },
    getOption(arr){
      if(!arr.length)return []
      let obj = {}
      let newArr = []
      arr.map(item=>{
        this.options.push(item)
        obj[item.type] = obj[item.type]||[]
        obj[item.type].push({value:item.missionId,label:item.name})
      })
      Object.keys(obj).map((key,index)=>{
        newArr.push({
          value:key,
          label:key,
          children:obj[key]
        })
      })
      console.log(newArr);
      return JSON.parse(JSON.stringify(newArr))
    },
    // 打开富文本编辑弹框
    handleOpenRichEditorModal() {
      this.$refs.richEditorModal.open(this.isEdit);     
    },
    // 更新宣教内容
    updateContent(content) {
      this.content = content;
      //this.$refs.richEditorModal.close();
    },
    // 设置推送状态
    setStatus(data) {
      let val = "";
      switch (data) {
        case "1":
          val = "已推送";
          break;
        case "2":
          val = "已明白";
          break;
        case "3":
          val = "有疑问";
          break;
        case "1R":
          val = "已阅读";
          break;
        default:
          val = "未推送";
      }
      return val;
    },

    openSignModal() {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then((res) => {
          this.curEmpName = res.data.data.empName;
          this.curEmpNo = res.data.data.empNo;
        });
      });
    },

    // 关闭弹框
    close() {
      this.$refs.modal.close();
      //清除防抖宣教内容定时器
      clearTimeout(this.debounceTimer);
      this.debounceTimer=null;
    },
    // 设置单个宣教内容
    setItem(item) {
      let data = [];
      let name = this.name;
      let array = item.split("");
      array.forEach((item) => {
        let obj = {};
        obj.type = name.indexOf(item);
        obj.item = item;
        data.push(obj);
      });
      return data;
    },
    
    //防抖宣教内容下拉搜索框方法
    debounceRemote(func, delay) {
      this.debounceTimer = null;
      return function(...args) {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.loading = true;
        this.debounceTimer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    // 宣教内容下拉搜索框
    // async remoteMethod(query) {
    //   if (query !== "") {
    //     this.name = query;
    //     this.loading = true;
    //     try {
    //       let params = {
    //         type: "",
    //         name: query,
    //       };
    //       (this.$route.query.wardCode) && (params.deptCode=this.$route.query.wardCode);
    //       let { data } = await getEduFormTemplate(params);
    //       this.options = data.data||[];
    //       //isEdit true
    //       this.content = data.data[0].content;
    //       //赋值富文本
    //       this.$refs.richEditorModal.changeEditContent(data.data[0].content);
    //       this.templateTitle = data.data[0].name;
    //       this.loading = false;
    //     } catch (e) {
    //       this.options = [];
    //     } finally {
    //       this.loading = false;
    //     }
    //   } else {
    //     this.loading = false;
    //     this.options = [];
    //   }
    // },
    // 处理保存入参
    setParams() {
      let date = dayjs(new Date()).format("MM-DD HH:mm");
      let itemData = this.options.filter(
        (item) => item.missionId === this.form.state
      )[0]; // 宣教内容item
      // let object = educationObiect.filter(
      //   (item) => item.value === this.form.object
      // )[0].text; // 教育对象
      let object=educationObiect.reduce((total,item,index)=>{
        let findeModel=this.form.object.find(findItem=>findItem==item.value);
        (findeModel) && (total.push(item.text));
        return total
          //return total=this.form.object.includes(item.value)?total.concat(item.value):total
        },[]).join(",");
      let haveValue = educationMethod.filter(
        (item) => item.value === this.form.method
      );
      let method = (haveValue.length > 0 && haveValue[0].text) || "在线"; // 教育方法
      let assessment = educationAssessment.filter(
        (item) => item.value === this.form.assessment
      )[0].text; // 教育评估
      let pageParam = {
        教育时间: this.date ? dayjs(this.date).format("MM-DD HH:mm") : date,
        教育对象: object,
        教育方法: method,
        教育评估: assessment,
        备注: this.form.remarks,
        签名: this.curEmpName,
        lc签名: this.curEmpNo,
      };
      let queryInfo = this.$route.query;
      let data = {
        content: this.content,
        blockId: this.blockId,
        id: this.type === 2 ? this.itemData.id : "", // 非必须，宣教实例id
        patientId: queryInfo.patientId, // 非必须，病人id
        patientName: queryInfo.name, // 非必须，病人姓名
        visitId: queryInfo.visitId, // 非必须，visitId
        bedLabel: queryInfo.bedLabel, // 非必须，床号
        eduFormCode: "form_edu", // 非必须，教育单代码
        wardCode: queryInfo.wardCode, // 非必须，科室代码
        wardName: queryInfo.wardName, // 非必须，科室名称
        missionId: this.form.state ? this.form.state : this.itemData.missionId, // 非必须，宣教模版id
        title: itemData ? itemData.name : this.itemData.name, // 非必须，宣教名称
        type: itemData ? itemData.type : this.itemData.type, // 非必须，宣教类型
        pageParam: JSON.stringify(pageParam), // 非必须，页面参数
      };
      console.log(data);
      return data;
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.setParams();
          let isOk = false; //用来判断是否弹窗提示已推送是否继续添加
          let arr = this.pageParam.filter(
            (item) => item.instance.missionId == this.form.state
          );
          if (arr.length > 0) {
            arr.map((item) => {
              if (item.instance.status == "1") {
                isOk = true;
              }
            });
          }
          if (isOk) {
            this.$confirm("该宣教内容已推送过，确定再次添加？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                saveMission(data).then((res) => {
                  this.content = res.data.data.instance.content;
                  this.$message.success("保存成功");
                  this.$emit("confirm", this.content);
                  this.close();
                });
              })
              .catch((e) => {
                this.close();
              });
          } else {
            saveMission(data).then((res) => {
              this.$message.success("保存成功");
              this.$emit("confirm");
              this.close();
            });
          }
        } else {
          return false;
        }
      });
    },
  },
  watch:{
    cascaderValue:{
      deep:true,
      immediate:true,
      handler(newVal){
        if(newVal.length){
          this.form.state = newVal[newVal.length-1]
          this.currentSelect = this.options.filter(
            (item) => item.missionId === this.form.state
          )[0];
          this.content = this.currentSelect.content
          this.$refs.richEditorModal&&this.$refs.richEditorModal.changeEditContent(this.content)
          this.templateTitle = this.currentSelect.name
        }else{
          this.form.state = ''
          this.currentSelect = {}
          this.content = ''
          this.$refs.richEditorModal&&this.$refs.richEditorModal.changeEditContent(this.content)
          this.templateTitle =''
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.sweet-modal-overlay{
  z-index:2000;
}
.status-text {
  position: absolute;
  top: 0px;
  left: 20px;
  color: blue;
}
.is-red-color {
  color: red;
}

.redColor {
  color: red;
}
.modal {
  width: "450px";
}
.el-autocomplete {
  width: 264px !important;
}

.edit-modal-form {
  padding-right: 50px;

  .el-input,
  .el-select,
  .el-input-number {
    width: 264px !important;
  }
  .unit {
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: 5px;
    word-break: keep-all;
  }

  .btn {
    cursor: pointer;
    color: blue;
    margin-left: 5px;
  }
}
</style>

