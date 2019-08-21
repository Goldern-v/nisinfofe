import qs from "qs";
import Cookies from "js-cookie";
import { formUrl } from "@/common/pathConfig/index.js";
export default function getFormUrl(formObj) {
  if (formObj.typeName == "护理记录单") {
    return printSheet(formObj);
  } else if (formObj.typeName == "评估类型") {
    return printEval(formObj);
  } else if (formObj.formName == "护嘱单") {
    return printEval(formObj);
  }
}

function getToken() {
  let token;
  token = Cookies.get("NURSING_USER").split("##")[1];
  return `App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`;
}
function printSheet(info) {
  let { "App-Token-Nursing": appToken, "Auth-Token-Nursing": token } = qs.parse(
    getToken()
  );
  let url = `/crNursing/sheet-print?id=${info.formId}&startPageIndex=${
    info.pageIndex
  }&endPageIndex=${info.endPageIndex}&appToken=${appToken}&token=${token}`;
  return url;
}

function printEval(info) {
  let query = window.app.$route.query;
  info.todo = "";
  info = Object.assign({}, info, info);
  info = Object.assign(info, info);
  let url = "";
  if (!info.nooForm) {
    info.nooForm = "0";
  }
  let queryObj = {
    id: info.formId || "",
    formCode: info.formCode,
    formType: info.formType,
    patientId: query.patientId,
    visitId: query.visitId,
    name: query.name,
    sex: query.sex,
    age: query.age,
    deptCode: query.deptCode,
    deptName: query.deptName,
    diagnosis: query.diagnosis,
    bedLabel: query.bedLabel,
    inpNo: query.inpNo,
    wardCode: query.wardCode,
    wardName: query.wardName,
    admissionDate: query.admissionDate,
    token: getToken(),
    todo: info.todo,
    isPrint: true
    // title:info.title || ''
  };
  if (info.nooForm == "0") {
    info.pageUrl = info.pageUrl.replace(".html", "-打印.html");
  }

  if (info.nooForm == "1") {
    if (info.formName == "生长发育评估量表") {
      queryObj.formCode = "growth";
      url = `/crNursing/print/growth?${qs.stringify(queryObj)}`;
    } else {
      url = `${formUrl}/${info.pageUrl}?${qs.stringify(queryObj)}`;
    }
  } else {
    window.app.showSignSave = info.showSignSave || false;
    let formid = info.id;
    let http = window.app.isDev ? "" : "";

    url = `${http}${formUrl}/${info.pageUrl}?${qs.stringify(queryObj)}`;
  }
  return url;
}
