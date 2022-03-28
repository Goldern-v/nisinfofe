import Vue from "vue";
import Router from "vue-router";
import main from "@/Part/main";

// import lesion from "@/Page/lesion/lesion";
// import consultation from "@/Page/patientInfo/supPage/consultation/consultation";
// import diganosisDetails from "@/Page/patientInfo/supPage/diagnosis/diganosis-details/diganosisDetails";
// import task from "@/Page/lesion/supPage/task/task";
// import shift from "@/Page/lesion/supPage/shift/shift";
// import implementation from "@/Page/lesion/supPage/implementation/implementation";
// import login from "@/Page/login/login";
// 护理会诊
// import nursingConsultation from '@/Page/nursingConsultation/nursingConsultation'
// import nursingConsultationStaff from '@/Page/nursingConsultationStaff/nursingConsultationStaff'

// 智慧输液
const infuse = () => import("@/Page/lesion/supPage/infuse/infuse.vue");
// 报警日志
const alarmLog = () => import("@/Page/lesion/supPage/infuse/alarm-log.vue");
// 输液量统计
const infuseStat = () => import("@/Page/lesion/supPage/infuse/infuse-stat.vue");
// import log from "../Page/lesion/supPage/log/log.vue";
// 收件箱
// import inBox from "../Page/inBox/inBox.vue";
// import mailDetails from "../Page/mail-details/mail-details.vue";
//自动登录
import autoLogin from "../Part/auto-login";
import autoLoginGuizhou from "../Part/auto-login-guizhou";
// import whiteBoard from '@/Part/whiteBoard/whiteBoard'
// import home1 from "@/Page/catheter-page/home1/home";

const bed = () => import("@/Page/lesion/supPage/bed/bed"); // 厚街
const login = () => import("@/Page/login/login");
const templateShow = () => import("@/Page/templateShow/templateShow"); //文书模板展示
const resetPassword = () => import("@/Page/resetPassword/resetPassword");
const newResetPassword = () => import("@/Page/resetPassword/newResetPassword");
const indexXin = () => import("@/Page/index-xin/Nurse.vue");
const indexHd = () => import("@/Page/index-xin/Nurse-hd.vue");
const indexWujing = () => import("@/Page/index-xin/Nurse-wujing.vue");
const indexLiaocheng = () => import("@/Page/index-xin/Nurse-liaocheng.vue");
const imageView = () => import("@/Part/imageView/imageView");
const nursingDocumentation = () =>
  import("../Page/nursing-documentation/nursing-documentation.vue"); // 护理文书
const workloadSatisticsLc = () =>
  import("../Page/workloadSatisticsLc/workloadSatistics.vue"); // 陵城工作量统计
const workloadSatisticsZSQ = () =>
  import("../Page/workloadSatisticsLc/workloadSatistics-zhongshanqi.vue"); // 中山七工作量统计
const workloadSatisticsFuYou = () =>
  import("@/Page/workloadSatisticsLc/workloadSatistics-fuyou.vue"); // 江门妇幼工作量统计
const workloadSatisticsDghl = () =>
  import("@/Page/workloadSatisticsLc/workloadSatistics-Dghl.vue"); // 东莞横沥工作量统计
const NotFoundComponent = () =>
  import("../components/NotFound/NotFoundComponent.vue"); // 异常路径
const print = () => import("@/Part/print/print.vue");
const wardReport = () => import("@/Page/ward-report/ward-report.vue");
const wardReportDetail = () =>
  import("@/Page/ward-report/ward-report-detail.vue");
const inpatientReport = () =>
  import("@/Page/inpatient-report/inpatient-report.vue");
const inpatientReportDetail = () =>
  import("@/Page/inpatient-report/inpatient-report-detail.vue");
const nursingGradeStatistics = () =>
  import("@/Page/nursingGradeStatistics/nursingGrade-statistics.vue"); // 护理等级统计查询
const nursingGradeStatisticsDetail = () =>
  import("@/Page/nursingGradeStatistics/nursingGrade-statistics-detail.vue"); // 护理等级统计查询
const shiftWork = () => import("@/Page/shift-work/shift-work.vue");
const shiftWorkDetail = () => import("@/Page/shift-work/shift-work-detail.vue");
const shiftWorkLc = () => import("@/Page/shift-work-lc/shift-work.vue");
const shiftWorkDetailLc = () => import("@/Page/shift-work-lc/shift-work-detail.vue");
const shiftWorkHd = () => import("@/Page/shift-work-hd/shift-work.vue");
const shiftWorkDetailHd = () => import("@/Page/shift-work-hd/shift-work-detail.vue");
const shiftWorkFy = () => import("@/Page/shift-work-fy/shift-work.vue");
const shiftWorkDetailFy = () => import("@/Page/shift-work-fy/shift-work-detail.vue");
const shiftWorkLiaocheng = () => import("@/Page/shift-work-liaocheng/shift-work.vue");
const shiftWorkDetailLiaocheng = () => import("@/Page/shift-work-liaocheng/shift-work-detail.vue");
const shiftWorkBh = () => import("@/Page/shift-work-bh/shift-work.vue");
const shiftWorkDetailBh = () => import("@/Page/shift-work-bh/shift-work-detail.vue");
const shiftWorkFq = () => import("@/Page/shift-work-fq/shift-work.vue");
const shiftWorkDetailFq = () => import("@/Page/shift-work-fq/shift-work-detail.vue");
const shiftWorkWujing = () => import("@/Page/shift-work-wujing/shift-work.vue");
const shiftWorkDetailWujing = () => import("@/Page/shift-work-wujing/shift-work-detail.vue");
const shiftWorkWhfk = () => import("@/Page/shift-work-whfk/shift-work.vue");
const shiftWorkDetailWhfk = () => import("@/Page/shift-work-whfk/shift-work-detail.vue");

const shiftWorkGuizhou = () => import("@/Page/shift-work-gz/shift-work.vue");//贵州交班志
const shiftWorkNFZXY = () => import("@/Page/shift-work-nfzxy/shift-work.vue");//贵州交班志

const ISBARshiftWorkHd = () => import("@/Page/shift-work/shift-work.vue");//花都ISBAR交班志

const morningShiftWork = ()=>import("@/Page/shift-work-morning-nfzxy/shift-work.vue")
const morningShiftWorkDetail = ()=>import("@/Page/shift-work-morning-nfzxy/shift-work-detail.vue")

const shiftWorkDetailGuizhou = () => import("@/Page/shift-work-gz/shift-work-detail.vue");
const shiftWorkDetailNFZXY = () => import("@/Page/shift-work-nfzxy/shift-work-detail.vue");
const ISBARshiftWorkDetailHd = () => import("@/Page/shift-work/shift-work-detail.vue");

const singleRounds = () => import("@/Page/single-rounds/single-rounds.vue");
const singleRoundsDetail = () => import("@/Page/single-rounds/single-rounds-detail.vue");

const badEvent = () => import("@/Page/badEvent/badEvent.vue");
const badEventViewPage = () => import("@/Page/badEvent/badEventViewPage.vue");
const badEventEditPage = () => import("@/Page/badEvent/badEventEditPage.vue");

const badEventGz = () => import("@/Page/badEventGuizhou/badEvent.vue");//贵州不良事件
const badEventViewPageGz = () => import("@/Page/badEventGuizhou/badEventViewPage.vue");
const badEventEditPageGz = () => import("@/Page/badEventGuizhou/badEventEditPage.vue");

const badEventNew = () => import("@/Page/badEventNew/badEvent.vue");//福清
const badEventViewPageNew = () => import("@/Page/badEventNew/badEventViewPage.vue");
const badEventEditPageNew = () => import("@/Page/badEventNew/badEventEditPage.vue");

//阳春中医不良事件
const badEventComm = () => import("@/Page/badEventComm/badEvent.vue");//阳春
const badEventViewPageComm = () => import("@/Page/badEventComm/badEventViewPage.vue");
const badEventEditPageComm = () => import("@/Page/badEventComm/badEventEditPage.vue");

const white = () => import("@/Page/white/white.vue");
const sheetHospitalEval = () =>
  import("@/Page/sheet-hospital-eval/sheet-hospital-eval.vue"); // 住院评估页面
const sheetHospitalEvalPage = () =>
  import("@/Page/sheet-hospital-eval/components/pages/page.vue");
const sheetHospitalAdmission = () =>
  import("@/Page/sheet-hospital-admission/sheet-hospital-admission.vue"); // 入院评估
const sheetHospitalAdmissionPage = () =>
  import("@/Page/sheet-hospital-admission/components/pages/page.vue"); // 入院评估

const admissionHisView = () =>
  import("@/Page/admissionHisView/admissionHisView.vue"); // 入院评估预览界面

const formPage = () => import("@/Page/form-page/form-page"); //  护理文书
const evalFormPage = () => import("@/Page/eval-form-page/form-page");
const MEWS = () => import("@/Page/MEWS/MEWS.vue");
// const catheterPage = () => import("@/Page/catheter-page/catheter-page"); //导管
const sugarPage = () => import("@/Page/sugar-page/sugar-page"); //血糖
const nursingRules = () => import("@/Page/nursing-rules/nursing-rules"); //护理制度
const noCheckTest = () => import("@/Page/no-check-test/no-check-test"); //未做检查/检验菜单
const toPdfPrint = () => import("@/Page/sheet-page/pdfPrintPage/toPdfPrint"); //护记pdf打印
const scheduling = () => import("@/Page/scheduling/scheduling"); //血透患者排班
const healthEdu = () => import("@/Page/healthEdu/healthEdu.vue"); //健康宣教
const handlingPage = () => import("@/Page/handling-page/handling-page"); //住院病人处理单
const oxygenPage = () => import("@/Page/oxygen-page/oxygen-page"); //血氧单
const departmentSharedFile = () =>
  import("@/Page/department-shared-file/department-shared-file"); //共享文件
const flatManagement = () => import("@/Page/flat-management/flat-management"); //扁平管理
const puerperantSituation = () =>
  import("@/Page/puerperantSituation/puerperantSituation"); //产科分娩登记表
const archive = () => import("@/Page/archive/archive.vue"); //归档
const archiveFSSY = () => import("@/Page/archive/archiveFSSY.vue"); //归档
const familyBigScreen = () =>
  import("@/Page/family-big-screen/family-big-screen.vue"); //家属大屏
const videoListSetting = () =>
  import("@/Page/family-big-screen/video-list-setting.vue");
const vaccineManagement = () =>
  import("@/Page/vaccine-management/vaccine-management.vue");
const deliveryRoomWhiteboard = () =>
  import("@/Page/delivery-room-whiteboard/delivery-room-whiteboard.vue");
const birthCertificate = () =>
  import("@/Page/birth-certificate/birth-certificate"); // 新出生医学证明
const birthCertificateForm = () =>
  import("@/Page/birth-certificate/birth-certificate-form");

const healthEducationList = () =>
  import("@/Page/healthEducation-list/healthEducation-list.vue");





const implementationList = () =>
  import("@/Page/implementation-list/implementation-list.vue"); //执行单
const implementationListLingcheng = () =>
  import("@/Page/implementation-list/implementation-list-lingcheng.vue"); //陵城执行单
const implementationListLiaocheng = () =>
  import("@/Page/implementation-list/implementation-list-liaocheng.vue"); //聊城执行单
const implementationListShannan = () =>
  import("@/Page/implementation-list/implementation-list-shannan.vue"); //山南执行单
const implementationListZhongshanqi = () =>
  import("@/Page/implementation-list/implementation-list-zhongshanqi.vue"); //中山七执行单
const implementationListHuadu = () =>
  import("@/Page/implementation-list/implementation-list-huadu.vue"); //花都执行单
const implementationListWujing = () =>
  import("@/Page/implementation-list/implementation-list-wujing.vue"); //武警执行单
const implementationListLyxrm= ()=>
import("@/Page/implementation-list/implementation-list-lyxrm.vue")//临邑执行单
const implementationListFSSY = () =>
  import("@/Page/implementation-list/implementation-list-FSSY.vue"); //武警执行单
const implementationListFsxt = ()=>
  import('@/Page/implementation-list/implementation-list-fsxt.vue') //佛山杏坛执行单
const implementationListQuzhou = () =>
  import("@/Page/implementation-list/implementation-list-quzhou.vue"); //曲周执行单
const implementationListFuyou = () =>
  import("@/Page/implementation-list/implementation-list-fuyou.vue"); //江门妇幼执行单
const implementationListHengli = () =>
  import("@/Page/implementation-list/implementation-list-hengli.vue"); //横沥执行单

const bottleLabel = () => import("@/Page/bottleLabel/index.vue"); //瓶签打印
const bottleLabelByProgram = () => import("@/Page/implementation-list/bottle-sign-print.vue"); //瓶签打印

const dcList = () => import("@/Page/dc-list/dc-list.vue"); //执行单
const patientList = () => import("@/Page/patientList/index"); //执行单
const nursingRounds = () => import("@/Page/nursing-rounds/nursing-rounds.vue"); //护理巡视
const allTemperatureChart = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chart.vue"); //所以版本的批量录入体温单
const allTemperatureChartBHRY = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chartBHRY.vue"); //北海人医批量录入体温单
const allTemperatureChartDGXG = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chartDGXG.vue"); //东莞谢岗批量录入体温单
const allTemperatureChartWHFK = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chartWHFK.vue"); //武汉肺科批量录入体温单
const allTemperatureChartNFZXY = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chartNFZXY.vue"); //武汉肺科批量录入体温单
const allTemperatureChartLYXRM = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chartLY.vue"); //临邑量录入体温单
const allTemperatureChartSDLJ = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chartSDLJ.vue"); //顺德龙江量录入体温单
const allTemperatureChartWHYX = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chartWHYX.vue"); //武汉亚心量录入体温单
const newSingleTemperatureChart = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart/new-singleTemperature-chart.vue"); //新版体温单录入页面
const newSingleTemperatureChartLiaoCheng = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-liaocheng/new-singleTemperature-chart.vue"); //聊城二院-新版体温单录入页面
const newSingleTemperatureChartGuizhou = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-guizhou/new-singleTemperature-chart.vue"); //贵州省人民医院-新版体温单录入页面
const newSingleTemperatureChartJmfy = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-fuyou/new-singleTemperature-chart.vue"); //江门妇幼医院-新版体温单录入页面
const newSingleTemperatureChartBhry = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-beihairenyi/new-singleTemperature-chart.vue");//北海人民医院-新版体温单录入页面
const newSingleTemperatureChartQuzhou = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-quzhou/new-singleTemperature-chart.vue");//曲周医院-新版体温单录入页面
const newSingleTemperatureChartDghl = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-hengli/new-singleTemperature-chart.vue");
const newSingleTemperatureChartWujing = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-wujing/new-singleTemperature-chart.vue");//武警新版体温单单人录入
const newSingleTemperatureChartZhongXiYi = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-nanfangzhongxiyi/new-singleTemperature-chart.vue");//南方中西医新版体温单单人录入
const newSingleTemperatureChartFSXT = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-fsxt/new-singleTemperature-chart.vue");//佛山杏坛新版体温单单人录入
const newSingleTemperatureChartFSSY = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-foshanrenyi/new-singleTemperature-chart.vue");//南方中西医新版体温单单人录入
const newSingleTemperatureChartDGXG = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-xiegang/new-singleTemperature-chart.vue");//谢岗新版体温单单人录入
const newSingleTemperatureChartWHFK = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-whfk/new-singleTemperature-chart.vue");//武汉肺科新版体温单单人录入
const newSingleTemperatureChartLYXRM = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-lyxrm/new-singleTemperature-chart.vue");//临邑新版体温单单人录入
const newSingleTemperatureChartSDLJ = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-sdlj/new-singleTemperature-chart.vue");//顺德龙江新版体温单单人录入
  const newSingleTemperatureChartWHYX = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-whyx/new-singleTemperature-chart.vue");//武汉亚心新版体温单单人录入
const showPatientDetails = () =>
  import("@/Page/show-patient-details/show-patient-details.vue"); //查看评估单、记录单、病历、检查、检验、体温单
const nursingPreview = () => import("@/Page/NursingPreview/NursingPreview.vue"); //查看所有的评估单、记录单、体温单
const nursingDoc = () => import("@/Page/nursingDoc/nursingDoc.vue"); //做跳转登录去 /nursingPreview /nursingDoc
const cognitiveStatistic = () =>
  import("@/Page/cognitive-statistic/cognitive-statistic.vue"); //住院病人认知情况统计表
const implementationReport = () =>
  import("@/Page/implementation-report/implementation-report.vue"); //执行单报表
const bedRecord = () =>
  import("@/Page/bed-record/bed-record.vue"); //转床记录
const changeMajorRecord = () =>
  import("@/Page/change-major-record/change-major-record.vue"); //转科记录
const changeMajorRecordHd = () =>
  import("@/Page/change-major-record-huadu/change-major-record.vue"); //花都转科记录
const rationalDoseStatistics = () =>
  import("@/Page/rational-dose-statistics/rational-dose-statistics.vue"); //合理用药

// 护理计划单
const planList = () => import("@/Page/plan-list/plan-list.vue");

const demo = () => import("@/demo/demo"); //demo
/** 包含全局样式的页面，患者详情子页面不可代码切割 */
import sheetPage from "@/Page/sheet-page/sheet-page.vue"; // 护理记录单页面
import sheetNursingOrderPage from "@/Page/sheet-nursing-order/sheet-page.vue"; // 护嘱记录单页面
import sheetNursingOrder from "@/Page/patientInfo/supPage/sheetNursingOrder/sheetNursingOrder.vue"; // 护嘱记录单页面
import record from "@/Page/patientInfo/supPage/record/record"; // 评估单
import home from "@/Page/patientInfo/supPage/home/home";
import BHBaby_sheetPage from "@/Page/sheet-page/BHBabysheet-page.vue"; // 北海新生儿护理记录单页面
import patientInfo from "@/Page/patientInfo/patientInfo"; //患者首页
import information from "@/Page/patientInfo/supPage/information/information";
import advice from "@/Page/patientInfo/supPage/advice/advice";
import inspect from "@/Page/patientInfo/supPage/inspect/inspect";
import test from "@/Page/patientInfo/supPage/test/test";
import doctorEmr from "@/Page/patientInfo/supPage/doctorEmr/doctorEmr"; //病历
import cost from "@/Page/patientInfo/supPage/cost/cost";
import temperature from "@/Page/patientInfo/supPage/temperature/temperature";//默认版本体温单，床位一览卡进入
import temperatureHD from "@/Page/patientInfo/supPage/temperature/temperature-huadu";
import temperatureGuizhou from "@/Page/patientInfo/supPage/temperature/temperature-guizhou";
import temperatureBhry from "@/Page/patientInfo/supPage/temperature/temperature-beihairenyi";
import temperatureLCEY from "@/Page/patientInfo/supPage/temperature/temperature-liaocheng";
import temperatureFSSY from "@/Page/patientInfo/supPage/temperature/temperature-foshanrenyi";
import temperatureFSXT from "@/Page/patientInfo/supPage/temperature/temperature-fsxt";
import temperatureJmfy from "@/Page/patientInfo/supPage/temperature/temperature-fuyou";
import temperatureDghl from "@/Page/patientInfo/supPage/temperature/temperature-hengli";
import temperatureQuZhou from "@/Page/patientInfo/supPage/temperature/temperature-quzhou";
import temperatureWuJing from "@/Page/patientInfo/supPage/temperature/temperature-wujing";
import temperatureNFZXY from "@/Page/patientInfo/supPage/temperature/temperature-nanfangzhongxiyi";
import temperatureDGXG from "@/Page/patientInfo/supPage/temperature/temperature-xiegang";
import temperatureWHFK from "@/Page/patientInfo/supPage/temperature/temperature-whfk";
import temperatureLYXRM from "@/Page/patientInfo/supPage/temperature/temperature-lyxrm";
import temperatureSDLJ from "@/Page/patientInfo/supPage/temperature/temperature-sdlj";
import temperatureWHYX from "@/Page/patientInfo/supPage/temperature/temperature-whyx";
import diagnosis from "@/Page/patientInfo/supPage/diagnosis/diagnosis";
import oxygenSugar from "@/Page/patientInfo/supPage/oxygen-sugar/oxygen-sugar.vue"; // 厚街
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar.vue"; // 厚街
import bloodSugarWeiXian from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_weixian.vue"; // 威县
import bloodSugarBeiHaiRenYi from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_bhry.vue";//北海
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue";
import catheter from "@/Page/patientInfo/supPage/catheter/catheter.vue";
import deep from "@/Page/patientInfo/supPage/deep/deep.vue";
import healthEducation from "@/Page/patientInfo/supPage/healthEducation/healthEducation.vue"; // 厚街
import hospitalEval from "@/Page/patientInfo/supPage/hospital-eval/hospital-eval";
import implementationPersonLiaocheng
  from "@/Page/patientInfo/supPage/implementation-list/implementation-list-liaocheng";
const patientFlowForm = () => import("@/Page/patientInfo/supPage/patient-flow-form/index.vue")
const medicalCheck = () => import("@/Page/patientInfo/supPage/medical-check/index.vue")
// 患者个人护理巡视
const patientNursingRound = () => import("@/Page/patientInfo/supPage/patient-nursing-rounds/nursing-rounds.vue")
// 深静脉导管维护单页面
import deepPage from "@/Page/deep-page/deep-page.vue";
import allCatheter from "@/Page/allCatheter/all-catheter.vue";
// 导管监测单
import catheterPage from "@/Page/catheter-page/catheter-page.vue";

//患者360视图，目前只有花都在用
const otherPage = () => import("@/Page/patientInfo/supPage/otherPage/otherPage.vue"); //360视图

// 健康教育
const healthEducationGuizhou = () => import("@/Page/patientInfo/supPage/healthEducationGuizhou/healthEducation.vue");

const healthEducationBerhairenyi = () => import("@/Page/patientInfo/supPage/healthEducationBeihairenyi/healthEducation.vue")

// 患者流转列表
const patientFlowList = () => import("@/Page/patient-flow-list/patientFlowList.vue")
const patientFlowMsg = () => import("@/Page/patient-flow-msg/patientFlowMsg.vue")
// 患者流转统计
const patientFlowStatistics = () => import("@/Page/patient-flow-statistics/patientFlowStatistics.vue")

// 统计查询
const statisticalQuery = () => import("@/Page/statistical-query/index.vue")
const statisticalOperation = () => import("@/Page/statistical-query/statistical-operation/index.vue")
const statisticalHeartRate = () => import("@/Page/statistical-query/statistical-heartRate/index.vue")
const statisticalPulseHeartRate = () => import("@/Page/statistical-query/statistical-pulseHeartRate/index.vue")
const statisticalPressure = () => import("@/Page/statistical-query/statistical-pressure/index.vue")
const statisticalBloodPressure = () => import("@/Page/statistical-query/statistical-bloodPressure/index.vue")
const statisticalTemperature = () => import("@/Page/statistical-query/statistical-temperature/index.vue")
const statisticalNursingLv = () => import("@/Page/statistical-query/statistical-nursingLv/index.vue")
const statisticalWorkload = () => import("@/Page/statistical-query/statistical-workload/index.vue")
const statisticalBreath = () => import("@/Page/statistical-query/statistical-breath/index.vue")
const statisticalExitAdmission = () => import("@/Page/statistical-query/statistical-exitAdmission/index.vue")
const statisticalVTE = () => import("@/Page/statistical-query/statistical-VTE/index.vue")

Vue.use(Router);
const HOSPITAL_ID = process.env.HOSPITAL_ID;
const router = new Router({
  mode: "history",
  base: "/crNursing/",
  routes: [{
    path: "/",
    redirect: "/index",
    alias: "主页"
  },
  {
    path: "/demo",
    component: demo,
    alias: "测试"
  },
  {
    path: "/templateShow",
    component: templateShow,
    alias: "文书模板展示",
    meta: {
      title: '智慧护理表单库'
    }
  },
  {
    path: "/login",
    component: login,
    alias: "登陆"
  },
  {
    path: "/resetPassword",
    component: (() => {
      switch (HOSPITAL_ID) {
        case 'whfk':
          // 新版修改密码
          return newResetPassword
        default:
          return resetPassword
      }
    })(),
    alias: "重置密码"
  },
  // 医生查看患者表单详情
  {
    path: "/showPatientDetails",
    component: showPatientDetails,
    children: [{
      path: "record",
      component: record
    },
    {
      path: "sheet",
      component: sheet,
      name: "护理记录单"
    },
    {
      path: "doctorEmr",
      component: doctorEmr,
      name: "病历"
    },
    {
      path: "inspect",
      component: inspect,
      name: "检查"
    },
    {
      path: "test",
      component: test,
      name: "检验"
    },
    {
      path: "temperature",
      component: (() => {
        switch (process.env.HOSPITAL_ID) {
          case 'huadu':
            return temperatureHD
          case 'liaocheng'  || 'whyx':
            return temperatureLCEY
          case 'guizhou':
            return temperatureGuizhou
          case 'beihairenyi':
            return temperatureBhry
          case 'fuyou':
            return temperatureJmfy
          case 'hengli':
            return temperatureDghl
          case 'quzhou':
            return temperatureQuZhou
          case 'nanfangzhongxiyi':
            return temperatureNFZXY
          case 'foshanrenyi':
            return temperatureFSSY
          case 'wujing':
            return temperatureWuJing
          case 'xiegang':
            return temperatureDGXG
          case 'whfk':
            return temperatureWHFK
          case 'lyxrm':
            return temperatureLYXRM
          case 'sdlj':
            return temperatureSDLJ
          case 'fsxt':
            return temperatureFSXT
          case 'whyx':
            return temperatureWHYX
          default:
            return temperature
        }
      })(),
      name: "体温单"
    }
    ]
  },
  {
    path: "/nursingDoc",
    component: nursingDoc
  },
  {
    path: "/nursingPreview",
    component: nursingPreview
  },
  {
    path:"/admissionHisView/:patientId?/:visitId?/:formId?",
      name: "admissionHisView",
      component:admissionHisView
  },
  {
    path: "/main",
    component: main,
    children: [
      // {
      //   path: "/index-xin",
      //   component: indexXin
      // },
      {
        path: "/index",
        component: (() => {
          switch (HOSPITAL_ID) {
            case 'huadu':
              return indexHd
            case 'fqfybjy':
              return shiftWorkFq;
            case 'liaocheng' || 'whfk' || 'whyx' || 'lyxrm':
              return indexLiaocheng
            case 'wujing':
              return indexWujing
            default:
              return indexXin
          }
        })()
      },
      {
        path: "/archive",
        component: (() => {
          switch(HOSPITAL_ID) {
            case 'lyxrm':
            case 'foshanrenyi':
              return archiveFSSY
            default:
              return archive
          }
        })(),
        alias: "归档"
      },
      {
        path: "/board",
        component: white,
        alias: "白板"
      },
      {
        path: "/familyBigScreen",
        component: familyBigScreen,
        alias: "家属大屏",
        children: [{
          name: "videoListSetting",
          path: "/familyBigScreen/:name?",
          component: videoListSetting
        }]
      },
      // {
      //   path: "/inBox",
      //   component: inBox
      // },
      {
        path: "/bed",
        component: bed
      },
      {
        path: "/infuse",
        component: infuse,
        children: [{
          path: "/infuse/alarmLog",
          component: alarmLog
        },
        {
          path: "/infuse/infuseStat",
          component: infuseStat
        },
        ]
      },
      // {
      //   path: "/log",
      //   component: log
      // },
      {
        path: "/healthEdu",
        component: healthEdu,
        children: [{
          name: "healthEdu",
          path: "/healthEdu/:patientId?/:visitId?/:formId?",
          component: healthEdu
        }]
      },
      {
        path: "/handlingPage",
        component: handlingPage,
        children: [{
          name: "handlingPage",
          path: "/handlingPage/:patientId?/:visitId?/:formId?",
          component: handlingPage
        }]
      },
      {
        path: "/oxygenPage",
        component: oxygenPage,
        children: [{
          name: "oxygenPage",
          path: "/oxygenPage/:patientId?/:visitId?/:formId?",
          component: oxygenPage
        }]
      },
      {
        path: "/wardReport",
        name: "wardReports",
        component: wardReport,
        children: [{
          name: "wardReport",
          path: "/wardReport/:date?",
          component: wardReportDetail
        }]
      },
      {
        path: "/inpatientReport",
        name: "inpatientReports",
        component: inpatientReport,
        children: [{
          name: "inpatientReport",
          path: "/inpatientReport/:date?",
          component: inpatientReportDetail
        }]
      },
      {
        path: "/nursingGradeStatistics",
        component: HOSPITAL_ID == "zhongshanqi" ? nursingGradeStatisticsDetail : nursingGradeStatistics,
        name: "nursingGradeStatistics",
        children: [{
          name: "nursingGradeStatistics",
          path: "/nursingGradeStatistics/:date?",
          component: nursingGradeStatisticsDetail
        }]
      },
      { //护士文书完成数量统计
        path: "/nursePapersStatistics/:type?",
        component: () => import('@/Page/numberOfPapers'),
        name: "nursePapersStatistics",
      },
      {
        path: "/shiftWork",
        name: "shiftWorks",
        component: (() => {
          switch (HOSPITAL_ID) {
            case 'lingcheng':
              return shiftWorkLc
            case 'huadu':
              return ISBARshiftWorkHd
            case 'fuyou':
              return shiftWorkFy
            case 'liaocheng' || 'zhongshanqi' || 'foshanrenyi' || 'whfk' || 'whyx' || 'sdlj' || 'lyxrm':
              return shiftWorkLiaocheng
            case 'beihairenyi':
              return shiftWorkBh
            case 'fqfybjy':
              return shiftWorkFq
            case 'wujing':
              return shiftWorkWujing
            case 'whfk':
              return shiftWorkWhfk
            case 'nanfangzhongxiyi':
              return shiftWorkNFZXY
            // case 'guizhou':
            //   return shiftWorkGuizhou
            default:
              return shiftWork
          }
        })(),
        children: [{
          name: "shiftWork",
          path: "/shiftWork/:code?/:id?",
          component: (() => {
            switch (HOSPITAL_ID) {
              case 'lingcheng':
                return shiftWorkDetailLc
              case 'huadu':
                return ISBARshiftWorkDetailHd
              case 'fuyou':
                return shiftWorkDetailFy
              case 'liaocheng' || 'zhongshanqi' || 'foshanrenyi' || 'whfk' || 'whyx' || 'sdlj' || 'lyxrm':
                return shiftWorkDetailLiaocheng
              // case 'guizhou':
              //   return shiftWorkDetailGuizhou
              case 'nanfangzhongxiyi':
                return shiftWorkDetailNFZXY
              case 'beihairenyi':
                return shiftWorkDetailBh
              case 'fqfybjy':
                return shiftWorkDetailFq
              case 'wujing':
                return shiftWorkDetailWujing
              case 'whfk':
                return shiftWorkDetailWhfk
              default:
                return shiftWorkDetail
            }
          })(),
        }]
      },
      {
        path: "/shiftWork2",
        name: "shiftWorks2",
        component: (() => {
          switch (HOSPITAL_ID) {
            case 'huadu':
              return shiftWorkHd
            default:
              return shiftWorkGuizhou
          }
        })(),
        children: [{
          name: "shiftWork2",
          path: "/shiftWork2/:code?/:id?",
          component: (() => {
            switch (HOSPITAL_ID) {
              case 'huadu':
                return shiftWorkDetailHd
              default:
                return shiftWorkDetailGuizhou
            }
          })(),
        }]
      },
      {
        path: "/morningShiftWork",
        name: "morningShiftWork",
        component: morningShiftWork,
        children: [{
          name: "morningShiftWork",
          path: "/morningShiftWork/:code?/:id?",
          component:  morningShiftWorkDetail
        }]
      },
      {
        path: "/singleRound",
        name: "singleRounds",
        component: singleRounds,
        children: [{
          name: "singleRound",
          path: "/singleRound/:code?/:id?",
          component: singleRoundsDetail
        }]
      },
      {
        path: "/badEvent",
        name: "badEvents",
        alias: "不良事件",
        //component: HOSPITAL_ID == "guizhou" ? badEventGz : badEvent,
        component: (() => {
          switch (HOSPITAL_ID) {
            case 'guizhou':
              return badEventGz
            case 'hj':
              return badEvent
            default:
                return badEventComm
          }
        })(),

        children: [{
          name: "badEventEdit",
          path: "/badEvent/:code?/:operation?/:id?/:type?/:name?",
          //component: HOSPITAL_ID == "guizhou" ? badEventEditPageGz : badEventEditPageGz
          component: (() => {
            switch (HOSPITAL_ID) {
              case 'guizhou':
                return badEventEditPageGz
              case 'hj':
                return badEventEditPage
              default:
                return badEventEditPageComm
            }
          })(),
        },
        {
          name: "badEventView",
          path: "/badEvent/:code?/:operation?/:id?/:status?/:type?/:name?",
          //component: HOSPITAL_ID == "guizhou" ? badEventViewPageGz : badEventViewPage
          component: (() => {
            switch (HOSPITAL_ID) {
              case 'guizhou':
                return badEventViewPageGz
              case 'hj':
                return badEventViewPage
              default :
              return badEventViewPageComm
            }
          })(),
        }
        ]
      },
      // {
      //   path: "/mailDetails/:id",
      //   component: mailDetails
      // },
      // {
      //   path: "/lesion",
      //   component: lesion,
      //   redirect: "/lesion/bed",
      //   children: [
      //     {
      //       path: "task",
      //       component: task,
      //       name: "今日任务",
      //       alias: "今日任务"
      //     },
      //     {
      //       path: "shift",
      //       component: shift
      //     },
      //     {
      //       path: "implementation",
      //       component: implementation
      //     },
      //     {
      //       path: "/wait-bed",
      //       component: resolve => {
      //         require(["../Page/lesion/supPage/log/wait-bed.vue"], resolve);
      //       }
      //     }
      //   ]
      // },
      {
        path: "/patientInfo",
        component: patientInfo,
        alias: "病人信息",
        children: [{
          path: "/information",
          component: information
        },
        {
          path: "/advice",
          component: advice
        },
        {
          path: "/inspect",
          component: inspect
        },
        {
          path: "/test",
          component: test
        },
        {
          path: "/record",
          component: record
        },
        {
          path: "/doctorEmr",
          component: doctorEmr
        },
        {
          path: "/cost",
          component: cost
        },
        {
          path: "/home",
          component: home
        },
        {
          path: "/otherPage",
          component: otherPage
        },
        // {
        //   path: "/home1",
        //   component: home1
        // },
        {
          path: "/diagnosis",
          component: diagnosis
        },
        // {
        //   path: "/diganosisDetails/:id",
        //   component: diganosisDetails
        // },
        // {
        //   path: "/consultation",
        //   component: consultation,
        //   name: "会诊",
        //   alias: "会诊"
        // },
        {
          path: "/temperature",
          //床位一览卡进入体温单
          // component: process.env.HOSPITAL_ID !== "huadu" ? temperature : temperatureLCEY,
          component: (() => {
            switch (process.env.HOSPITAL_ID) {
              case 'huadu':
                return temperatureHD
              case 'liaocheng':
                return temperatureLCEY
              case 'guizhou':
                return temperatureGuizhou
              case 'beihairenyi':
                return temperatureBhry
              case 'wujing':
                return temperatureWuJing
              case 'fuyou':
                return temperatureJmfy
              case 'foshanrenyi':
                return temperatureFSSY
              case 'nanfangzhongxiyi':
                return temperatureNFZXY
              case 'whyx':
                return temperatureNFZXY
              case 'quzhou':
                return temperatureQuZhou
              case 'hengli':
                return temperatureDghl
              case 'fsxt':
                return temperatureFSXT
              case 'xiegang':
                return temperatureDGXG
              case 'lyxrm':
                return temperatureLYXRM
              case 'sdlj':
                return temperatureSDLJ
              case 'whfk':
                return temperatureWHFK
              case 'whyx':
                return temperatureWHYX
              default:
                return temperature
            }
          })(),
          name: "体温单",
          alias: "体温单"
        },
        {
          path: "/sheet",
          component: sheet,
          name: "护理记录单",
          alias: "护理记录单"
        },
        {
          path: "/deep",
          component: deep,
          name: "深静脉导管"
        },
        {
          path: "/catheter",
          // component: catheter,
          component: (() => {
            switch (process.env.HOSPITAL_ID) {
              case 'liaocheng' || 'whyx' || 'sdlj' || 'foshanrenyi' || 'lyxrm':
                return allCatheter
              default:
                return catheter
            }
          })(),
          // name: "导管",
          // alias: "导管"
          name: "导尿管",
          alias: "导尿管"
        },
        {
          path: "/sheetNursingOrder",
          component: sheetNursingOrder,
          name: "护嘱单",
          alias: "护嘱单"
        },
        {
          path: "/bloodSugar",
          // component: process.env.HOSPITAL_NAME == "威县人民医院" ?
          //   bloodSugarWeiXian : bloodSugar,
          component: (() => {
            switch (process.env.HOSPITAL_ID) {
              case 'weixian':
                return bloodSugarWeiXian
              case 'beihairenyi':
                return bloodSugarBeiHaiRenYi
              default:
                return bloodSugar
            }
          })(),
          name: "血糖",
          alias: "血糖"
        },
        {
          path: "/oxygenSugar",
          // component: process.env.HOSPITAL_NAME == "威县人民医院" ?
          //   bloodSugarWeiXian : bloodSugar,
          component: oxygenSugar,
          name: "血氧",
          alias: "血氧"
        },
        {
          path: "/healthEducation",
          //component: healthEducation,
          component: (() => {
            switch (process.env.HOSPITAL_ID) {
              case 'guizhou':
                return healthEducationGuizhou
              case 'beihairenyi':
                return healthEducationBerhairenyi
              default:
                return healthEducation
            }
          })(),
          name: "健康教育单",
          alias: "健康教育单"
        },
        {
          path: "/hospitalEval",
          component: hospitalEval,
          name: "住院表",
          alias: "住院表"
        },
        {
          path: "/implementationPerson",
          component: implementationPersonLiaocheng,
          name: "执行单",
          alias: "执行单"
        },
        {
          path: "/patientFlowForm",
          component: patientFlowForm,
          name: "患者流转单",
          alias: "患者流转单"
        },
        // 谢岗
        {
          path: "/medicalCheck",
          component: medicalCheck,
          name: "病历查看",
          alias: "病历查看"
        },
          // 陵城床位一览卡护理巡视
          {
            path: "/patientNursingRound",
            component: patientNursingRound,
            name: "护理巡视",
            alias: "护理巡视"
          }
        ]
      },
      {
        path: "/nursingDocumentation",
        component: nursingDocumentation,
        name: "患者查询"
      },
      {
        path: "/workloadSatistics",
        //component: HOSPITAL_ID == "lingcheng" || HOSPITAL_ID == "fuyou"  ? workloadSatisticsLc : workloadSatisticsZSQ,
        component: (() => {
          switch (HOSPITAL_ID) {
            case 'lingcheng':
              return workloadSatisticsLc
            case 'hengli':
              return workloadSatisticsDghl
            case 'fuyou':
              return workloadSatisticsFuYou
            default:
              return workloadSatisticsZSQ
          }
        })(),
        name: "工作量统计"
      },
      {
        path: "/implementationList",
        component: (() => {
          switch (HOSPITAL_ID) {
            case 'lingcheng':
              return implementationListLingcheng
            case 'liaocheng':
              return implementationListLiaocheng
            case 'shannan':
              return implementationListShannan
            case 'zhongshanqi':
              return implementationListZhongshanqi
            case 'lyxrm':
              return implementationListLyxrm
            case 'wujing':
            case 'sdlj':
            case 'whfk':
            case 'fsxt':
              return implementationListWujing
            // case 'fsxt':
            //   return implementationListFsxt
            case 'foshanrenyi':
              return implementationListFSSY
            case 'quzhou':
              return implementationListQuzhou
            case 'huadu':
              return implementationListHuadu
            case 'fuyou':
              return implementationListFuyou
            case 'hengli':
              return implementationListHengli
            default:
              return implementationList
          }
        })(),
        name: "执行单"
      },
      {
        path: "/bottleLabel",
        component: bottleLabel,
        name: "瓶签打印"
      },
      {
        path: "/bottleLabelByProgram",
        component: bottleLabelByProgram,
        name: "本地程序执行瓶签打印"
      },
      {
        path: "/healthEducationList",
        component: healthEducationList,
        name: "健康宣教"
      },
      // {
      //   path: '/nursingConsultation',
      //   component: nursingConsultation,
      //   beforeEnter: (to, from, next) => {
      //     let nursingStaff = false
      //     try {
      //       nursingStaff = JSON.parse(localStorage.user).nursingStaff
      //     } catch (e) { console.log(e) }
      //     next(nursingStaff)
      //   }
      // },
      // {
      //   path: '/nursingConsultationStaff',
      //   component: nursingConsultationStaff,
      //   beforeEnter: (to, from, next) => {
      //     let nursingStaff = false
      //     try {
      //       nursingStaff = JSON.parse(localStorage.user).nursingStaff
      //     } catch (e) { console.log(e) }
      //     next(!nursingStaff)
      //   }
      // }
      {
        path: "/sheetHospitalAdmission",
        component: sheetHospitalAdmission,
        children: [{
          name: "sheetHospitalAdmissionPage",
          path: "/sheetHospitalAdmission/:patientId?/:visitId?/:formId?",
          component: sheetHospitalAdmissionPage
        }]
      },
      {
        path: "/sheetHospitalEval",
        component: sheetHospitalEval,
        children: [{
          name: "sheetHospitalEvalPage",
          path: "/sheetHospitalEval/:patientId?/:visitId?/:formId?",
          component: sheetHospitalEvalPage
        }]
      },
      {
        path: "/sheetPage",
        component: sheetPage,
        children: [{
          name: "sheetPage",
          path: "/sheetPage/:patientId?/:visitId?/:formId?/:inpNo?",
          component: sheetPage
        }]
      },
      {
        path: "/Baby_sheetPage",
        component: BHBaby_sheetPage,
        children: [{
          name: "Baby_sheetPage",
          path: "/Baby_sheetPage/:patientId?/:visitId?/:formId?/:inpNo?",
          component: BHBaby_sheetPage
        }]
      },
      {
        path: "/sheetNursingOrderPage",
        component: sheetNursingOrderPage,
        children: [{
          name: "sheetNursingOrderPage",
          path: "/sheetNursingOrderPage/:patientId?/:visitId?/:formId?",
          component: sheetNursingOrderPage
        }]
      },
      {
        path: "/MEWS",
        component: MEWS
      },
      {
        path: "/formPage",
        component: formPage,
        children: [{
          name: "formPage",
          path: "/formPage/:patientId?/:visitId?/:formId?",
          component: formPage
        }]
      },
      {
        path: "/evalFormPage",
        component: evalFormPage
      },
      {
        path: "/deepPage",
        component: deepPage
      },
      {
        path: "/allCatheter",
        component: allCatheter
      },
      {
        path: "/catheterPage",
        component: catheterPage
      },
      {
        path: "/sugarPage",
        component: sugarPage,
        children: [{
          name: "sugarPage",
          path: "/sugarPage/:patientId?/:visitId?/:formId?",
          component: sugarPage
        }]
      },
      {
        path: "/scheduling",
        component: scheduling
      },
      {
        path: "/nursingRules",
        component: nursingRules
      },
      {
        path: "/noCheckTest",
        component: noCheckTest
      },
      {
        path: "/departmentSharedFile",
        component: departmentSharedFile
      },
      {
        path: "/flatManagement",
        component: flatManagement
      },
      {
        path: "/puerperantSituation",
        component: puerperantSituation
      },
      {
        path: "/vaccineManagement",
        component: vaccineManagement
      },
      {
        path: "/deliveryRoomWhiteboard",
        component: deliveryRoomWhiteboard
      },
      {
        path: "/birthCertificate",
        component: birthCertificate
      },
      {
        path: "/birthCertificateForm",
        component: birthCertificateForm
      },
      {
        path: "/dcList",
        component: dcList
      },
      {
        path: "/planList",
        component: planList,
        name: '护理计划单'
      },
      {
        path: "/patientList",
        component: patientList
      },
      {
        path: "/nursingRounds",
        component: nursingRounds,
        name: "护理巡视"
      },
      {
        path: "/singleTemperatureChart",
        component: sheetPage,
        children: [{
          name: "singleTemperatureChart",
          path: "/singleTemperatureChart/:patientId?/:visitId?/:formId?",
          component: sheetPage
        }]
      },
      {
        path: "/allTemperatureChart",
        component: (() => {
          switch (HOSPITAL_ID) {
            case 'beihairenyi':
              return allTemperatureChartBHRY
            case 'xiegang':
              return allTemperatureChartDGXG
            case 'whfk':
              return allTemperatureChartWHFK
            case 'nanfangzhongxiyi':
              return allTemperatureChartNFZXY
            case 'lyxrm':
              return allTemperatureChartLYXRM
            case 'sdlj':
              return allTemperatureChartSDLJ
            case 'whyx':
              return allTemperatureChartWHYX
            default:
              return allTemperatureChart
          }
        })(),
        name: "批量录入体温单"
      },
      {
        path: "/newSingleTemperatureChart",
        component: (() => {
          switch (HOSPITAL_ID) {
            case 'guizhou':
              return newSingleTemperatureChartGuizhou
            case 'beihairenyi':
              return newSingleTemperatureChartBhry
            case 'quzhou':
              return newSingleTemperatureChartQuzhou
            case 'wujing':
              return newSingleTemperatureChartWujing
            case 'hengli':
              return newSingleTemperatureChartDghl
            case 'fuyou':
              return newSingleTemperatureChartJmfy
            case 'foshanrenyi':
              return newSingleTemperatureChartFSSY
            case 'nanfangzhongxiyi':
              return newSingleTemperatureChartZhongXiYi
            case 'fsxt':
              return newSingleTemperatureChartFSXT
            case 'xiegang':
              return newSingleTemperatureChartDGXG
            case 'whfk':
              return newSingleTemperatureChartWHFK
            case 'lyxrm':
              return newSingleTemperatureChartLYXRM
            case 'sdlj':
              return newSingleTemperatureChartSDLJ
              case 'whyx':
                return newSingleTemperatureChartWHYX
              case 'liaocheng':
                return newSingleTemperatureChartLiaoCheng
            default:
              return newSingleTemperatureChart
          }
        })(),
        name: "newSingleTemperatureChart"
      },
      {
        path: "/cognitiveStatistic",
        component: cognitiveStatistic,
        name: "住院病人认知情况统计表"
      },
      {
        path: "/implementationReport",
        component: implementationReport,
        name: "执行单报表"
      },
      {
        path: "/bedRecord",
        component: bedRecord,
        name: "转床记录"
      },
      {
        path: "/changeMajorRecord",
        component: changeMajorRecord,
        name: "转科记录"
      },
      {
        path: "/changeMajorRecordHd",
        component: changeMajorRecordHd,
        name: "转科记录"
      },
      {
        path: "/rationalDoseStatistics",
        component: rationalDoseStatistics,
        name: "合理用药"
      },
      /**聊城二院-患者流转 */
      {
        path: "/patientFlowList",
        name: "patientFlowList",
        component: patientFlowList
      },
      {
        path: "/patientFlowMsg",
        name: "patientFlowMsg",
        component: patientFlowMsg
      },
      {
        path: "/patientFlowStatistics",
        name: "patientFlowStatistics",
        component: patientFlowStatistics
      },
      // 聊城二院-统计查询
      {
        path: "/statisticalQuery",
        name: "statisticalQuery",
        component: statisticalQuery,
        redirect: {
          name: "statisticalExitAdmission"
        },
        children: [
          {
            path: "statisticalOperation",
            name: "statisticalOperation",
            meta: {
              title: '手术统计'
            },
            component: statisticalOperation,
          },
          {
            path: "statisticalPulseHeartRate",
            name: "statisticalPulseHeartRate",
            meta: {
              title: '脉搏统计'
            },
            component: statisticalPulseHeartRate,
          },
          {
            path: "statisticalHeartRate",
            name: "statisticalHeartRate",
            meta: {
              title: '心率统计'
            },
            component: statisticalHeartRate,
          },
          {
            path: "statisticalPressure",
            name: "statisticalPressure",
            meta: {
              title: '压力性损伤统计'
            },
            component: statisticalPressure,
          },
          {
            path: "statisticalBloodPressure",
            name: "statisticalBloodPressure",
            meta: {
              title: '血压统计'
            },
            component: statisticalBloodPressure,
          },
          {
            path: "statisticalTemperature",
            name: "statisticalTemperature",
            meta: {
              title: '体温统计'
            },
            component: statisticalTemperature,
          },
          {
            path: "statisticalNursingLv",
            name: "statisticalNursingLv",
            meta: {
              title: '护理级别统计'
            },
            component: statisticalNursingLv,
          },
          {
            path: "statisticalWorkload",
            name: "statisticalWorkload",
            meta: {
              title: '工作量统计'
            },
            component: statisticalWorkload,
          },
          {
            path: "statisticalBreath",
            name: "statisticalBreath",
            meta: {
              title: '呼吸统计'
            },
            component: statisticalBreath,
          },
          {
            path: "statisticalExitAdmission",
            name: "statisticalExitAdmission",
            meta: {
              title: '出入院统计'
            },
            component: statisticalExitAdmission,
          },
          {
            path: "statisticalVTE",
            name: "statisticalVTE",
            meta: {
              title: 'VTE统计'
            },
            component: statisticalVTE,
          },
        ]
      },
    ]
  },
  {
    path: "/dev",
    beforeEnter: (to, from, next) => {
      window.app.$notify.info({
        title: "提示",
        message: "正在开发，敬请期待"
      });
      next(false);
    }
  },
  {
    path: "/imageView",
    component: imageView
  },
  {
    path: "/autoLogin",
    component: (() => {
      switch (HOSPITAL_ID) {
        case 'guizhou':
          return autoLoginGuizhou
        default:
          return autoLogin
      }
    })(),
  },
  {
    path: "/print/:type",
    component: print
  },
  {
    path: "/indexXin",
    component: indexXin
  },
  {
    path: "/toPdfPrint",
    component: toPdfPrint
  },

  {
    path: "*",
    component: NotFoundComponent
  }
  ]
});

// 打印 router
// console.log('打印Router',router,router.options.routes)

router.beforeEach((to, from, next) => {
  // debugger
  // var token = Cookies.get('NURSING_USER') || ''
  // var user = localStorage['user']
  // window.Cookies  = Cookies
  // if (to.path.indexOf('login') > -1 || to.path.indexOf('autoLogin') > -1) {
  //   return next()
  // }
  // if (token) {
  //   if (user) {
  //     if (JSON.parse(user).token != token.split('##')[1]) {
  //       if (JSON.parse(user).id != token.split('##')[0]) {
  //         Cookies.remove('NURSING_USER', { path: '' })
  //         localStorage.removeItem('user')
  //         router.push('/login')
  //       } else {
  //        router.push('/autoLogin')
  //       }
  //     } else {
  //       // let newToken = window.app.$getCookie('NURSING_USER') || ''
  //       // config.headers.common['Auth-Token-Nursing'] = newToken.split('##')[1] || ''
  //       return next()
  //     }
  //   } else {
  //     router.push('/autoLogin')
  //   }
  // } else {
  //   // 跳转到登录页
  //   router.push('/login')
  // }
  if (to.meta.title) {

    document.title = to.meta.title
  }
  next();
});

export default router;
