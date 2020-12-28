<template>
  <div class="birth-certificate-form">
    <div class="toolBar">
      <button class="back" @click="goBack">返回上一页</button>
      <div>
        <button class="save" @click="saveForm">保存</button>
        <button class="preview" @click="printPreview">打印预览</button>
      </div>
    </div>
    <div class="form" ref="birthCertificateForm">
      <div class="form-wrap">
        <div class="form-content">
          <h3>东莞市《出生医学证明》首次签发登记表</h3>
          <div class="table-content">
            <excel
              :dataModel="dataModel"
              :formData.sync="formData"
              :otherFormData.sync="otherFormData"
              :saveForm="saveForm"
            ></excel>
          </div>
        </div>
        <div class="form-content from-paste">
          <div class="left">
            <p>新生儿父母有效证件复印件</p>
            <div class="paste-area">
              <span>粘贴处</span>
            </div>
          </div>
          <div class="right">
            <p>《出生医学证明》存根</p>
            <div class="paste-area">
              <span>粘贴处</span>
            </div>
          </div>
          <div class="pageNum">2/2页</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import excel from "./components/excel";
import tableModel from "./data/dataModel";
import { getBirthCertInfo, saveBirthCertInfo } from "./api/api";
let dataModel = [tableModel.table.tbody, tableModel.table2.tbody];
let otherFormData = {};
let formData = {};

let init = (formData, data = {}) => {
  dataModel.map(table => {
    table.map(row => {
      row.map(col => {
        if (col["setKey"]) {
          formData[col["setKey"]] =
            data[col["getKey"]] || col["defaultVal"] || "";
        }
        if (col.type == "sign") {
          if (data[col["getKey"]] && data[col["getKey2"]]) {
            formData[col["setKey"]] =
              data[col["getKey"]] + "/" + data[col["getKey2"]];
          } else {
            formData[col["setKey"]] =
              data[col["getKey"]] || data[col["getKey2"]] || "";
          }
        }
        if (col.type == "inputGroup" && col.children) {
          col.children.map(child => {
            otherFormData[child["setKey"]] =
              data[child["getKey"]] || child["defaultVal"] || "";
          });
        }

        if (col.type == "table") {
          col.table.tbody.map(child => {
            child.map(chil => {
              if (chil["setKey"]) {
                if (
                  chil["getKey"] == "newBornWeight" &&
                  data[chil["getKey"]] &&
                  Number(data[chil["getKey"]])
                ) {
                  formData[chil["setKey"]] =
                    Number(data[chil["getKey"]]) * 1000;
                } else {
                  formData[chil["setKey"]] =
                    data[chil["getKey"]] || chil["defaultVal"] || "";
                }
              }
              if (chil.children) {
                chil.children.map(chi => {
                  if (chi["setKey"]) {
                    otherFormData[chi["setKey"]] =
                      data[chi["getKey"]] || chi["defaultVal"] || "";
                  }
                  if (chil["setKey"] == "csdd") {
                    formData[chi["setKey"]] =
                      data[chi["getKey"]] || chi["defaultVal"] || "";
                  }
                });
              }
            });
          });
        }
      });
    });
  });
};
init(formData);
export default {
  props: {},
  data() {
    return {
      dataModel,
      formData,
      otherFormData
    };
  },
  mounted() {
    init(this.formData);
    if (
      this.$route.query.id &&
      localStorage.getItem("birthCertificateFormView")
    ) {
      let data = JSON.parse(localStorage.getItem("birthCertificateFormView"));
      for (let key in this.formData) {
        this.formData[key] = data[key];
      }
      this.handelData(data);
    } else {
      this.getBirthCertInfo();
    }
    if (!this.formData["cfxm"]) {
      this.formData["cfxm"] = this.$route.query.patientName;
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    handelData(data) {
      // 出生地点
      this.otherFormData["csddOne"] = this.formData["csddOne"] || "";
      this.otherFormData["csddTwo"] = this.formData["csddTwo"] || "";
      this.otherFormData["csddThree"] = this.formData["csddThree"] || "";
      // 出生时间
      let birthTime = this.formData["cssj"]
        ? this.formData["cssj"].replace(/[-:]/g, " ").split(" ")
        : [];
      if (birthTime && birthTime.length) {
        this.otherFormData["cssj1"] = birthTime[0];
        this.otherFormData["cssj2"] = birthTime[1];
        this.otherFormData["cssj3"] = birthTime[2];
        this.otherFormData["cssj4"] = birthTime[3];
        this.otherFormData["cssj5"] = birthTime[4];
        this.otherFormData["cssj"] =
          birthTime[0] +
          "-" +
          birthTime[1] +
          "-" +
          birthTime[2] +
          " " +
          birthTime[3] +
          ":" +
          birthTime[4];
      }

      // 填表日期
      this.formData["jsryqzTbrq"] =
        this.formData["jsryqzTbrq"] || this.formData["cssj"];
      let fillTime = this.formData["jsryqzTbrq"]
        ? this.formData["jsryqzTbrq"].replace(/[-:]/g, " ").split(" ")
        : birthTime;

      if (fillTime && fillTime.length) {
        this.otherFormData["jsryqzTbrq1"] = fillTime[0];
        this.otherFormData["jsryqzTbrq2"] = fillTime[1];
        this.otherFormData["jsryqzTbrq3"] = fillTime[2];
        this.otherFormData["jsryqzTbrq"] =
          fillTime[0] + "-" + fillTime[1] + "-" + fillTime[2];
      }
    },
    printPreview() {
      if (this.$refs.birthCertificateForm) {
        let html = $(this.$refs.birthCertificateForm).html();
        localStorage.setItem("previewBirthCertificate", html);
        if (process.env.NODE_ENV === "production") {
          let newWid = window.open();
          newWid.location.href = "/crNursing/print/birthCertificate";
        } else {
          this.$router.push(`/print/birthCertificate`);
        }
      }
    },
    getBirthCertInfo() {
      let data = {
        list: [
          {
            patientId: this.$route.query.patientId,
            visitId: this.$route.query.visitId
          }
        ]
      };
      getBirthCertInfo(data).then(res => {
        if (res.data.data && res.data.data.length) {
          let data = res.data.data || [];
          let obj = data.find(item=>{
            return item.patientId == this.$route.query.patientId && item.visitId == this.$route.query.visitId
          }) || {};
          init(this.formData, obj);
          this.handelData(obj);
        }
      });
    },
    saveForm() {
      if (!this.formData["cssj"]) {
        this.$message.warning({ message: "请填写出生时间" });
        return;
      }
      this.formData["patientId"] = this.$route.query.patientId;
      this.formData["visitId"] = this.$route.query.visitId;
      this.formData["id"] = this.$route.query.id;
      localStorage.setItem(
        "birthCertificateFormView",
        JSON.stringify(this.formData)
      );
      saveBirthCertInfo(this.formData).then(res => {
        this.$message.success({ message: "保存成功" });
        let id = res.data.data;
        if (!this.formData["id"] && id) {
          this.$router.replace(this.$route.fullPath + "&id=" + id);
        }
      });
    }
  },
  components: {
    excel
  }
};
</script>
<style lang="scss" scoped>
.birth-certificate-form {
  padding-top: 65px;
  padding-bottom: 57px;
  background-color: #dfdfdf;
  .toolBar {
    position: fixed;
    top: 60px;
    width: 100%;
    height: 49px;
    padding: 10px 19px 8px 20px;
    border: 1px solid #cbd5dd;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: linear-gradient(
      180deg,
      rgba(246, 246, 248, 1) 0%,
      rgba(235, 236, 240, 1) 100%
    );
    > div {
      text-align: right;
    }
    button {
      font-size: 12px;
      text-align: center;
      line-height: 28px;
      border: 1px solid #cbd5dd;
      border-radius: 2px;
      height: 30px;
      background-color: #fff;
      cursor: pointer;
      outline: none;
      &.back {
        width: 102px;
        float: left;
      }
      &.save {
        width: 62px;
        margin-right: 10px;
      }
      &.prview {
        width: 76px;
      }
    }
  }
}
.form-content {
  width: 740px;
  margin: 0 auto;
  padding: 28px 50px 41px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
  color: #333;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;

  h3 {
    font-size: 22px;
    text-align: center;
    line-height: 30px;
    padding-bottom: 13px;
  }
  input {
    border: none;
  }
  .date {
    input {
      width: 20px;
    }
  }
}
.from-paste {
  padding: 77px 70px 35px 70px;
  p {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 25px;
    padding-bottom: 16px;
  }
  .left,
  .right {
    .paste-area {
      width: 300px;
      height: 840px;
      border: 1px solid rgba(0, 0, 0, 1);
      box-sizing: border-box;
      text-align: center;
    }
    span {
      display: inline-block;
      width: 43px;
      font-size: 30px;
      line-height: 63px;
      padding-top: 172px;
    }
  }
  .left {
    float: left;
  }
  .right {
    padding-left: 310px;
  }
  .pageNum {
    font-size: 15px;
    line-height: 21px;
    text-align: center;
    padding-top: 50px;
  }
}
</style>
