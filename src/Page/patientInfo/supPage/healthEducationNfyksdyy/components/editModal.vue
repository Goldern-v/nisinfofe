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
        <ElFormItem prop="state" label="宣教内容：">
          <el-select
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
            >
              <span
                v-for="(a, index) in setItem(item.name)"
                :class="a.type >= 0 ? 'redColor' : ''"
                :key="index"
                style="float:left"
              >{{a.item}}</span>
            </el-option>
          </el-select>
        </ElFormItem>
        <ElFormItem prop="date" label="教育时间：" v-if="modalStatus &&['nfyksdyy','hj'].includes(HOSPITAL_ID)">
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
          <ElSelect v-model="form.object" multiple>
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
            <ElOption value="3" key="3" label="在线" v-if="isOk">在线</ElOption>
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
        <ElFormItem prop="remarks" label='备注'>
          <ElInput v-model="form.remarks" />
        </ElFormItem>
        <ElFormItem  label="执行人：" required>
          <span>{{curEmpName}}</span>
          <span class="btn" @click="openSignModal">切换</span>
        </ElFormItem>
      </ElForm>
      <ElButton slot="button" @click="close">取消</ElButton>
      <ElButton slot="button" type="primary" @click="submitForm('ruleForm')">保存</ElButton>
    </SweetModal>
  </div>
</template>

<script>
import { educationObiect, educationMethod, educationAssessment } from "../text";
import dayjs from "dayjs";
import { getEduFormTemplate, saveMission, getUser } from "../api/healthApi";
import qs from "qs";
export default {
  props: {
    blockId: {
      type: Number,
      default: ""
    },
    pageParam: {
      //表格数据
      type: Array,
      default: () => []
    }
  },
  data() {
    let validateObject = (rule, value, callback) => {
      if (!value || value == '' || (Array.isArray(value) && value.length<=0)) {
        callback(new Error('请选择教育对象'));
      } else {
        callback();
      }
    };
    return {
      title: "",
      modalStatus: false, // 判断当前状态是编辑还是添加
      form: {
        state: "",
        object:[],
        method: "",
        assessment: "",
        remarks: "",
        signature: ""
      },
      curEmpName: "", // 初始化签名姓名
      curEmpNo: "", // 初始化签名工号
      disabled: false, // 宣教内容是否置灰
      type: 1, // 弹框类型 1-修改 2-新增
      name: "", // 宣教内容下拉搜索框内容
      loading: false, // 下拉框load
      missionList: [], // 健康教育下拉框数据
      options: [], // 宣教内容下拉框数据
      itemData: {}, // 修改时暂存参数
      date: "", // 修改时的宣教时间
      isOk: false, // 教育对象是否禁用（根据状态判断 -1:删除，0:未推送，1:未读，1R:已读，2:已明白，3:有疑问， 后面三个可以）
      rules: {
        state: [{ required: true, message: "请输入宣教内容", trigger: "blur" }],
        object: [
          { required: true, validator: validateObject, trigger: "blur" }
        ],
        method: [
          { required: true, message: "请选择教育方法", trigger: "blur" }
        ],
        assessment: [
          { required: true, message: "请选择教育评估", trigger: "blur" }
        ],
        signature: [{ required: true, message: "请输入签名", trigger: "blur" }]
      },
      educationObiect: educationObiect,
      educationMethod: educationMethod,
      educationAssessment: educationAssessment,
      verifySignObj:{},
      SigndataObj:{}
    };
  },
  methods: {
    // 打开弹框
    open(title, form) {
      var obj = JSON.parse(localStorage.getItem("user"));
      this.curEmpName = obj.empName;
      this.curEmpNo = obj.empNo;
      this.type = form ? 2 : 1;
      this.disabled = !!form;
      if (form) {
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
        let object=[];
        if(form["教育对象"] && form["教育对象"]!=''){
          object=educationObiect.reduce((total,item,index)=>{
            return total=form["教育对象"].split(",").includes(item.text)?total.concat(item.value):total
          },[]);
        }
        let method = educationMethod.filter(
          item => item.text === form["教育方法"]
        )[0];
        let assessment = educationAssessment.filter(
          item => item.text === form["教育评估"]
        )[0];
        this.form.object = object ? object : [];
        // this.form.method = method ? method.value || "3" : "1";
        this.form.method = method
          ? method.value
          : form["教育方法"] === "在线"
          ? "3"
          : "1";
        this.form.assessment = assessment ? assessment.value : "";
        this.form.remarks = form[this.HOSPITAL_ID === "whhk" ? "宣教情况" : "备注"] || "";
        this.form.signature = form["签名"] || "";
      } else {
        this.modalStatus = false;
        if (this.HOSPITAL_ID === 'nfyksdyy') {
          this.modalStatus = true;
        }
        this.title = title;
        this.isOk = false;
        // 添加时清空表单
        this.form = {
          state: "",
          object: [],
          method: "1",
          assessment: "",
          remarks: "",
          signature: ""
        };
      }
      this.$refs.modal.open();
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
    openFoshanRYModal(){
      this.setParams()
      console.log(this.SigndataObj,this.verifySignObj,"this.SigndataObj,this.verifySignObj")
      return new Promise((resolve, reject) => {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          this.curEmpName = res.data.data.empName;
          this.curEmpNo = res.data.data.empNo;
          resolve()
        });
        },'',null,false,'',"",undefined, undefined ,undefined,this.SigndataObj,this.verifySignObj);
      })
    },
    openSignModal() {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          this.curEmpName = res.data.data.empName;
          this.curEmpNo = res.data.data.empNo;
        },'',null,false,'',"",undefined, undefined ,undefined);
      });
    },

    // 关闭弹框
    close() {
      this.$refs.modal.close();
    },
    // 设置单个宣教内容
    setItem(item) {
      let data = [];
      let name = this.name;
      let array = item.split("");
      array.forEach(item => {
        let obj = {};
        obj.type = name.indexOf(item);
        obj.item = item;
        data.push(obj);
      });
      return data;
    },

    // 宣教内容下拉搜索框
    async remoteMethod(query) {
      if (query !== "") {
        this.name = query;
        this.loading = true;
        try {
          let params = {
            type: "",
            name: query
          };
          let { data } = await getEduFormTemplate(params);
          this.options = data.data;
        } catch (e) {
          this.options = [];
        } finally {
          this.loading = false;
        }
      } else {
        this.options = [];
      }
    },
    // 处理保存入参
    setParams() {
      let date = dayjs(new Date()).format("MM-DD HH:mm");
      let itemData = this.options.filter(
        item => item.missionId === this.form.state
      )[0]; // 宣教内容item
      // let object = educationObiect.filter(
      //   item => item.value === this.form.object
      // )[0].text; // 教育对象
      let object=educationObiect.reduce((total,item,index)=>{
        let findModel=this.form.object.find(findItem=>findItem==item.value);
        (findModel) && (total.push(item.text));
        return total
      },[]).join(",");

      let haveValue = educationMethod.filter(
        item => item.value === this.form.method
      );
      let method = (haveValue.length > 0 && haveValue[0].text) || "在线"; // 教育方法
      let assessment = educationAssessment.filter(
        item => item.value === this.form.assessment
      )[0].text; // 教育评估
      let pageParam = {
        教育时间: this.date ? dayjs(this.date).format("MM-DD HH:mm") : date,
        教育对象: object,
        教育方法: method,
        教育评估: assessment,
        签名: this.curEmpName,
        lc签名: this.curEmpNo
      };
      pageParam = {...pageParam, 备注: this.form.remarks}
      let queryInfo = this.$route.query;
      let data = {
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
        pageParam: JSON.stringify(pageParam) // 非必须，页面参数
      };
            this.SigndataObj = {
        Patient_ID:queryInfo.patientId,
        Visit_ID:queryInfo.visitId,
        Document_Title:itemData ? itemData.name : this.itemData.name,
        Document_ID:"form_edu",
        Section_ID:this.form.state ? this.form.state : this.itemData.missionId,
        strSignData: JSON.stringify(pageParam),
      };

       this.verifySignObj = {
        patientId:queryInfo.patientId,
        visitId:queryInfo.visitId,
        formName:itemData ? itemData.name : this.itemData.name,
        formCode:"form_edu",
        instanceId:this.form.state ? this.form.state : this.itemData.missionId,
        recordId:this.type === 2 ? this.itemData.id : "",
        signData:JSON.stringify(pageParam),
      }
      console.log("queryInfo",queryInfo,this.form,this.itemData)
      return data;
    },
    submitFormFun(){
          let data = this.setParams();
          let isOk = false; //用来判断是否弹窗提示已推送是否继续添加
          let arr = this.pageParam.filter(
            item => item.instance.missionId == this.form.state
          );
          if (arr.length > 0) {
            arr.map(item => {
              if (item.instance.status == "1") {
                isOk = true;
              }
            });
          }
          if (isOk) {
            this.$confirm("该宣教内容已推送过，确定再次添加？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                saveMission(data).then(res => {
                  this.$message.success("保存成功");
                  this.$emit("confirm");
                  this.close();
                });
              })
              .catch(e => {
                this.close();
              });
          } else {
            saveMission(data).then(res => {
              this.$message.success("保存成功");
              this.$emit("confirm");
              this.close();
            });
          }
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitFormFun()
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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

