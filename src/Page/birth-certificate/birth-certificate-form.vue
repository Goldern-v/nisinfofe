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
let formData = {};
let otherFormData = {};
dataModel.map(table => {
  table.map(row => {
    row.map(col => {
      if (col["setKey"]) {
        formData[col["setKey"]] = "";
      }
      if (col["setKey2"]) {
        formData[col["setKey2"]] = "";
      }
      if (col.children && col.type == "inputGroup") {
        col.children.map(child => {
          if (child["setKey"]) {
            otherFormData[child["setKey"]] = "";
            formData[child["setKey"]] = "";
          }
        });
      }
    });
  });
});
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
    // let data = {};
    // this.dataModel.map(table => {
    //   table.map(row => {
    //     row.map(col => {
    //       if (col["setKey"]) {
    //         this.formData[col["setKey"]] = data[col["getKey"]] || "";
    //       }
    //       if (col["setKey2"]) {
    //         this.formData[col["setKey2"]] = data[col["setKey2"]] || "";
    //       }
    //     });
    //   });
    // });
    // console.log(this.formData);
    // this.getBirthCertInfo();
    // let data;
    // if (
    //   this.$route.query.type == "view" &&
    //   localStorage.getItem("birthCertificateFormView")
    // ) {
    //   data = JSON.parse(localStorage.getItem("birthCertificateFormView"));
    //   this.init(data);
    // }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    init(data = {}) {
      this.dataModel.map(table => {
        table.map(row => {
          row.map(col => {
            if (col["setKey"]) {
              this.formData[col["setKey"]] =
                data[col["setKey"]] || data[col["getKey"]] || "";
            }
            if (col["setKey2"]) {
              this.formData[col["setKey2"]] = data[col["setKey2"]] || "";
            }
          });
        });
      });
    },
    printPreview() {
      if (this.$refs.birthCertificateForm) {
        // let html = this.$refs.birthCertificateForm.innerHTML;
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
            patientId: "7674131" || this.$route.query.patientId,
            visitId: "1" || this.$route.query.visitId
          }
        ]
      };

      getBirthCertInfo(data).then(res => {
        let data = {};
        this.dataModel.map(table => {
          table.map(row => {
            row.map(col => {
              if (col["setKey"]) {
                this.formData[col["setKey"]] = data[col["getKey"]] || "";
              }
              if (col["setKey2"]) {
                this.formData[col["setKey2"]] = data[col["setKey2"]] || "";
              }
              if (col.children && col.type == "inputGroup") {
                let key = col["setKey"],
                  key1 = key + "1",
                  key2 = key + "2",
                  key3 = key + "3",
                  key4 = key + "4",
                  key5 = key + "5";
                if (col.format == "YYYY-MM-DD") {
                  let str = this.formData[key].replace(/[-:]/g, " ").split(" ");
                  this.otherFormData[key1] = str[0];
                  this.otherFormData[key2] = str[1];
                  this.otherFormData[key3] = str[2];
                } else if (col.format == "YYYY-MM-DD HH:mm") {
                  let str = this.formData[key].replace(/[-:]/g, " ").split(" ");
                  this.otherFormData[key1] = str[0];
                  this.otherFormData[key2] = str[1];
                  this.otherFormData[key3] = str[2];
                  this.otherFormData[key4] = str[3];
                  this.otherFormData[key5] = str[4];
                } else {
                  this.otherFormData[key1] = this.formData[key1];
                  this.otherFormData[key2] = this.formData[key2];
                  this.otherFormData[key3] = this.formData[key3];
                }
              }
            });
          });
        });
      });
    },
    saveForm() {
      this.formData["patientId"] = this.$route.query.patientId || "7674131";
      this.formData["visitId"] = this.$route.query.visitId || "1";
      this.formData["id"] = this.$route.query.id || "";
      saveBirthCertInfo(this.formData).then(res => {
        this.$message.success({ message: "保存成功" });
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
      line-height: 30px;
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