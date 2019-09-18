import {
  createForm,
  save,
  del,
  get,
  list
} from "@/Page/sheet-hospital-eval/api/index.js";

import bus from "vue-happy-bus";
import commom from "@/common/mixin/common.mixin.js";
import dayjs from "dayjs";

export const getUUID = () => { };

export const getFormDetail = (id, callback = null) => {
  let result = null;
  get(id).then(res => {
    console.log("getFormDetail", res);
    if (callback) {
      callback(res);
    }
  });
};

export const saveForm = (formObj, callback = null) => {
  let patientInfo = window.app.$store.state.sheet.patientInfo;
  let formCode = "";
  let formName = "";
  let user = null;
  try {
    formCode = formObj.formSetting.formInfo.formCode;
    formName = formObj.formSetting.formInfo.formName;
    user = JSON.parse(localStorage.user);
  } catch (error) {
    return;
  }

  if (patientInfo && patientInfo.hasOwnProperty("patientId")) {
    // bus.$emit("setHosptialAdmissionLoading", {
    //   status: true,
    //   msg: "保存表单中..."
    // });
    window.app.$message.info(formName + "保存表单中...");
    let post = {
      id: formObj.model.hasOwnProperty("id") ? formObj.model.id : "", //"50376",
      patientId: patientInfo.patientId,
      visitId: patientInfo.visitId,
      formType: "eval",
      formCode: formCode, // formObj.formSetting.formInfo.formCode
      evalDate: dayjs().format("YYYY-MM-DD HH:mm"), //"2019-04-16 12:00",
      //   evalScore: "0",
      sign: false,
      empNo: user.empNo //"admin",
      // password: "123456"
    };

    post = Object.assign({}, post, formObj.model);

    if (!post.evalDate) {
      post.evalDate = dayjs().format("YYYY-MM-DD HH:mm")
    }

    let postData = new Object();
    for (const key in post) {
      if (post.hasOwnProperty(key)) {
        if (!key) {
          continue;
        }
        if (post[key] === null || post[key] === "null") {
          postData[key] = "";
          continue;
        }
        postData[key] = post[key] + "";
      }
    }

    console.log("保存post", "post", post, "postData", postData);



    save(postData)
      .then(res => {
        console.log("保存评估", res);
        window.app.$message.success(formName + "保存成功");
        let {
          data: {
            data: {
              formResult: { id: id },
              master:master,
            }
          }
        } = res;
        console.log("保存评估id", id);
        formObj.model["id"] = id;
        //
        if(master.updaterName && master.updateTime){
          formObj.formSetting.updateInfo = `由${master.updaterName}创建，最后编辑于${master.updateTime}`
        }
        if (callback) {
          callback(res);
        }
        // formResult.id: 50439
        // bus.$emit("setHosptialAdmissionLoading", false);
        // this.showMeasureDetialBox(res);
      })
      .catch(err => {
        console.log("保存评估err", err);
        //
        // bus.$emit("setHosptialAdmissionLoading", {
        //   status: false
        // });
      });
  }
  console.log("保存", user, formObj);
};

export default {};
