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
const indexXin = () => import("@/Page/index-xin/Nurse.vue");
const indexHd = () => import("@/Page/index-xin/Nurse-hd.vue");
const imageView = () => import("@/Part/imageView/imageView");
const nursingDocumentation = () =>
  import("../Page/nursing-documentation/nursing-documentation.vue"); // 护理文书
const workloadSatisticsLc = () =>
  import("../Page/workloadSatisticsLc/workloadSatistics.vue"); // 陵城工作量统计
const workloadSatisticsZSQ = () =>
  import("../Page/workloadSatisticsLc/workloadSatistics-zhongshanqi.vue"); // 中山七工作量统计
const workloadSatisticsFuYou = () =>
  import("@/Page/workloadSatisticsLc/workloadSatistics-fuyou.vue"); // 江门妇幼工作量统计
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
const shiftWorkGuizhou = () => import("@/Page/shift-work-gz/shift-work.vue");//贵州交班志
const ISBARshiftWorkHd = () => import("@/Page/shift-work-hd/shift-work-ISBAR.vue");//花都ISBAR交班志

const shiftWorkDetailGuizhou = () => import("@/Page/shift-work-gz/shift-work-detail.vue");
const ISBARshiftWorkDetailHd = () => import("@/Page/shift-work-hd/shift-work-ISBAR-detail.vue");

const singleRounds = () => import("@/Page/single-rounds/single-rounds.vue");
const singleRoundsDetail = () => import("@/Page/single-rounds/single-rounds-detail.vue");

const badEvent = () => import("@/Page/badEvent/badEvent.vue");
const badEventViewPage = () => import("@/Page/badEvent/badEventViewPage.vue");
const badEventEditPage = () => import("@/Page/badEvent/badEventEditPage.vue");

const badEventGz = () => import("@/Page/badEventGuizhou/badEvent.vue");//贵州不良事件
const badEventViewPageGz = () => import("@/Page/badEventGuizhou/badEventViewPage.vue");
const badEventEditPageGz = () => import("@/Page/badEventGuizhou/badEventEditPage.vue");
const white = () => import("@/Page/white/white.vue");
const sheetHospitalEval = () =>
  import("@/Page/sheet-hospital-eval/sheet-hospital-eval.vue"); // 住院评估页面
const sheetHospitalEvalPage = () =>
  import("@/Page/sheet-hospital-eval/components/pages/page.vue");
const sheetHospitalAdmission = () =>
  import("@/Page/sheet-hospital-admission/sheet-hospital-admission.vue"); // 入院评估
const sheetHospitalAdmissionPage = () =>
  import("@/Page/sheet-hospital-admission/components/pages/page.vue"); // 入院评估

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
const implementationListWujing = () =>
  import("@/Page/implementation-list/implementation-list-wujing.vue"); //武警执行单
const implementationListQuzhou = () =>
  import("@/Page/implementation-list/implementation-list-quzhou.vue"); //曲周执行单
const implementationListFuyou = () =>
  import("@/Page/implementation-list/implementation-list-fuyou.vue"); //江门妇幼执行单
const bottleLabel = () => import("@/Page/bottleLabel/index.vue"); //瓶签打印

const dcList = () => import("@/Page/dc-list/dc-list.vue"); //执行单
const patientList = () => import("@/Page/patientList/index"); //执行单
const nursingRounds = () => import("@/Page/nursing-rounds/nursing-rounds.vue"); //护理巡视
const allTemperatureChart = () =>
  import("@/Page/temperature-chart/all-temperature-chart/all-temperature-chart.vue"); //批量录入体温单
const newSingleTemperatureChart = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart/new-singleTemperature-chart.vue"); //聊城二院-新版体温单录入页面
const newSingleTemperatureChartGuizhou = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-guizhou/new-singleTemperature-chart-guizhou.vue"); //贵州省人民医院-新版体温单录入页面
const newSingleTemperatureChartJmfy = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-jmfy/new-singleTemperature-chart.vue"); //江门妇幼医院-新版体温单录入页面
  const newSingleTemperatureChartBhry = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-beihairenyi/new-singleTemperature-chart.vue");//北海人民医院-新版体温单录入页面
const newSingleTemperatureChartDghl = () =>
  import("@/Page/temperature-chart/new-singleTemperature-chart-dghl/new-singleTemperature-chart.vue");
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
import sheetNursingOrder from "@/Page/patientInfo/supPage/sheetNursingOrder/sheetNursingOrder.vue"; // 护嘱记录单页面
import record from "@/Page/patientInfo/supPage/record/record"; // 评估单
import home from "@/Page/patientInfo/supPage/home/home";
import patientInfo from "@/Page/patientInfo/patientInfo"; //患者首页
import information from "@/Page/patientInfo/supPage/information/information";
import advice from "@/Page/patientInfo/supPage/advice/advice";
import inspect from "@/Page/patientInfo/supPage/inspect/inspect";
import test from "@/Page/patientInfo/supPage/test/test";
import doctorEmr from "@/Page/patientInfo/supPage/doctorEmr/doctorEmr"; //病历
import cost from "@/Page/patientInfo/supPage/cost/cost";
import temperature from "@/Page/patientInfo/supPage/temperature/temperature";
import temperatureHD from "@/Page/patientInfo/supPage/temperature/temperatureHD";
import temperatureLCEY from "@/Page/patientInfo/supPage/temperature/temperatureLCEY";
import temperatureGuizhou from "@/Page/patientInfo/supPage/temperature/temperatureGuizhou";
import temperatureBhry from "@/Page/patientInfo/supPage/temperature/temperatureBhry";
import temperatureJmfy from "@/Page/patientInfo/supPage/temperature/temperatureJmfy";
import temperatureDghl from "@/Page/patientInfo/supPage/temperature/temperatureDghl";
import temperatureWuJing from "@/Page/patientInfo/supPage/temperature/temperatureWuJing";
import diagnosis from "@/Page/patientInfo/supPage/diagnosis/diagnosis";
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar.vue"; // 厚街
import bloodSugarWeiXian from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_weixian.vue"; // 威县
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue";
import catheter from "@/Page/patientInfo/supPage/catheter/catheter.vue";
import deep from "@/Page/patientInfo/supPage/deep/deep.vue";
import healthEducation from "@/Page/patientInfo/supPage/healthEducation/healthEducation.vue"; // 厚街
import hospitalEval from "@/Page/patientInfo/supPage/hospital-eval/hospital-eval";
import implementationPersonLiaocheng
  from "@/Page/patientInfo/supPage/implementation-list/implementation-list-liaocheng";
// 深静脉导管维护单页面
import deepPage from "@/Page/deep-page/deep-page.vue";
// 导管监测单
import catheterPage from "@/Page/catheter-page/catheter-page.vue";

//患者360视图，目前只有花都在用
const otherPage = () => import("@/Page/patientInfo/supPage/otherPage/otherPage.vue"); //360视图

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
    component: resetPassword,
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
          case 'liaocheng':
            return temperatureLCEY
          case 'guizhou':
            return temperatureGuizhou
            case 'beihairenyi':
              return temperatureBhry
          case 'fuyou':
            return temperatureJmfy
          case 'hengli':
            return temperatureDghl
          case 'wujing':
            return temperatureWuJing
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
            default:
              return indexXin
          }
        })()
      },
      {
        path: "/archive",
        component: archive,
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
              return shiftWorkHd
            case 'fuyou':
              return shiftWorkFy
            case 'liaocheng' || 'zhongshanqi':
              return shiftWorkLiaocheng
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
                return shiftWorkDetailHd
              case 'fuyou':
                return shiftWorkDetailFy
              case 'liaocheng' || 'zhongshanqi':
                return shiftWorkDetailLiaocheng
              // case 'guizhou':
              //   return shiftWorkDetailGuizhou
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
              return ISBARshiftWorkHd
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
                return ISBARshiftWorkDetailHd
              default:
                return shiftWorkDetailGuizhou
            }
          })(),
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
        component: HOSPITAL_ID == "guizhou" ? badEventGz : badEvent,
        children: [{
          name: "badEventEdit",
          path: "/badEvent/:code?/:operation?/:id?/:type?/:name?",
          component: HOSPITAL_ID == "guizhou" ? badEventEditPageGz : badEventEditPage
        },
        {
          name: "badEventView",
          path: "/badEvent/:code?/:operation?/:id?/:status?/:type?/:name?",
          component: HOSPITAL_ID == "guizhou" ? badEventViewPageGz : badEventViewPage
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
          component: catheter,
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
          component: process.env.HOSPITAL_NAME == "威县人民医院" ?
            bloodSugarWeiXian : bloodSugar,
          name: "血糖",
          alias: "血糖"
        },
        {
          path: "/healthEducation",
          component: healthEducation,
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
            case 'huadu':
              return implementationListZhongshanqi
            case 'wujing':
              return implementationListWujing
            case 'quzhou':
              return implementationListQuzhou
            case 'fuyou':
              return implementationListFuyou
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
          path: "/sheetPage/:patientId?/:visitId?/:formId?",
          component: sheetPage
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
        component: allTemperatureChart,
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
            case 'fuyou':
              return newSingleTemperatureChartJmfy
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
