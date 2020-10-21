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

// import infuse from "../Page/lesion/supPage/infuse/infuse.vue";
// import log from "../Page/lesion/supPage/log/log.vue";
// 收件箱
// import inBox from "../Page/inBox/inBox.vue";
// import mailDetails from "../Page/mail-details/mail-details.vue";
//自动登录
// import autoLogin from "../Part/auto-login";
// import whiteBoard from '@/Part/whiteBoard/whiteBoard'
// import home1 from "@/Page/catheter-page/home1/home";

const bed = () => import("@/Page/lesion/supPage/bed/bed"); // 厚街
const login = () => import("@/Page/login/login");
const resetPassword = () => import("@/Page/resetPassword/resetPassword");
const indexXin = () => import("@/Page/index-xin/Nurse.vue");
const imageView = () => import("@/Part/imageView/imageView");
const nursingDocumentation = () =>
  import("../Page/nursing-documentation/nursing-documentation.vue"); // 护理文书
const workloadSatisticsLc = () =>
  import("../Page/workloadSatisticsLc/workloadSatistics.vue"); // 陵城工作量统计
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
const shiftWork = () => import("@/Page/shift-work/shift-work.vue");
const shiftWorkDetail = () => import("@/Page/shift-work/shift-work-detail.vue");
const shiftWorkLc = () => import("@/Page/shift-work-lc/shift-work.vue");
const shiftWorkDetailLc = () => import("@/Page/shift-work-lc/shift-work-detail.vue");

const singleRounds = () => import("@/Page/single-rounds/single-rounds.vue");
const singleRoundsDetail = () => import("@/Page/single-rounds/single-rounds-detail.vue");

const badEvent = () => import("@/Page/badEvent/badEvent.vue");
const badEventViewPage = () => import("@/Page/badEvent/badEventViewPage.vue");
const badEventEditPage = () => import("@/Page/badEvent/badEventEditPage.vue");
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
const catheterPage = () => import("@/Page/catheter-page/catheter-page"); //导管
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
const implementationListLc = () =>
  import("@/Page/implementation-list-lc/implementation-list.vue"); //陵城执行单
const dcList = () => import("@/Page/dc-list/dc-list.vue"); //执行单
const nursingRounds = () => import("@/Page/nursing-rounds/nursing-rounds.vue"); //护理巡视
const allTemperatureChart = () =>
  import("@/Page/temperature-chart/all-temperature-chart.vue"); //批量录入体温单
const showPatientDetails = () =>
  import("@/Page/showPatientDetails/showPatientDetails.vue");
const nursingDoc = () => import("@/Page/nursingDoc/nursingDoc.vue");

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
import diagnosis from "@/Page/patientInfo/supPage/diagnosis/diagnosis";
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar.vue"; // 厚街
import bloodSugarWeiXian from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_weixian.vue"; // 威县
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue";
import catheter from "@/Page/patientInfo/supPage/catheter/catheter.vue";
import healthEducation from "@/Page/patientInfo/supPage/healthEducation/healthEducation.vue"; // 厚街
import hospitalEval from "@/Page/patientInfo/supPage/hospital-eval/hospital-eval";

Vue.use(Router);
const router = new Router({
  mode: "history",
  base: "/crNursing/",
  routes: [
    {
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
      children: [
        {
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
        }
      ]
    },
    {
      path: "/nursingDoc",
      component: nursingDoc
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
          component: indexXin
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
          children: [
            {
              name: "videoListSetting",
              path: "/familyBigScreen/:name?",
              component: videoListSetting
            }
          ]
        },
        // {
        //   path: "/inBox",
        //   component: inBox
        // },
        {
          path: "/bed",
          component: bed
        },
        // {
        //   path: "/infuse",
        //   component: infuse
        // },
        // {
        //   path: "/log",
        //   component: log
        // },
        {
          path: "/healthEdu",
          component: healthEdu,
          children: [
            {
              name: "healthEdu",
              path: "/healthEdu/:patientId?/:visitId?/:formId?",
              component: healthEdu
            }
          ]
        },
        {
          path: "/handlingPage",
          component: handlingPage,
          children: [
            {
              name: "handlingPage",
              path: "/handlingPage/:patientId?/:visitId?/:formId?",
              component: handlingPage
            }
          ]
        },
        {
          path: "/oxygenPage",
          component: oxygenPage,
          children: [
            {
              name: "oxygenPage",
              path: "/oxygenPage/:patientId?/:visitId?/:formId?",
              component: oxygenPage
            }
          ]
        },
        {
          path: "/wardReport",
          name: "wardReports",
          component: wardReport,
          children: [
            {
              name: "wardReport",
              path: "/wardReport/:date?",
              component: wardReportDetail
            }
          ]
        },
        {
          path: "/inpatientReport",
          name: "inpatientReports",
          component: inpatientReport,
          children: [
            {
              name: "inpatientReport",
              path: "/inpatientReport/:date?",
              component: inpatientReportDetail
            }
          ]
        },
        {
          path: "/shiftWork",
          name: "shiftWorks",
          component:
            process.env.HOSPITAL_ID == "lingcheng" ? shiftWorkLc : shiftWork,
          children: [
            {
              name: "shiftWork",
              path: "/shiftWork/:code?/:id?",
              component:
                process.env.HOSPITAL_ID == "lingcheng"
                  ? shiftWorkDetailLc
                  : shiftWorkDetail
            }
          ]
        },
        {
          path: "/singleRound",
          name: "singleRounds",
          component: singleRounds,
          children: [
            {
              name: "singleRound",
              path: "/singleRound/:code?/:id?",
              component: singleRoundsDetail

            }
          ]
        },
        {
          path: "/badEvent",
          name: "badEvents",
          alias: "不良事件",
          component: badEvent,
          children: [
            {
              name: "badEventEdit",
              path: "/badEvent/:code?/:operation?/:id?/:type?/:name?",
              component: badEventEditPage
            },
            {
              name: "badEventView",
              path: "/badEvent/:code?/:operation?/:id?/:status?/:type?/:name?",
              component: badEventViewPage
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
          children: [
            {
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
              component: temperature,
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
              path: "/catheter",
              component: catheter,
              name: "导管",
              alias: "导管"
            },
            {
              path: "/sheetNursingOrder",
              component: sheetNursingOrder,
              name: "护嘱单",
              alias: "护嘱单"
            },
            {
              path: "/bloodSugar",
              component:
                process.env.HOSPITAL_NAME == "威县人民医院"
                  ? bloodSugarWeiXian
                  : bloodSugar,
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
          component: workloadSatisticsLc,
          name: "工作量统计"
        },
        {
          path: "/implementationList",
          component:
            process.env.HOSPITAL_ID == "lingcheng"
              ? implementationListLc
              : implementationList,
          name: "执行单"
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
          children: [
            {
              name: "sheetHospitalAdmissionPage",
              path: "/sheetHospitalAdmission/:patientId?/:visitId?/:formId?",
              component: sheetHospitalAdmissionPage
            }
          ]
        },
        {
          path: "/sheetHospitalEval",
          component: sheetHospitalEval,
          children: [
            {
              name: "sheetHospitalEvalPage",
              path: "/sheetHospitalEval/:patientId?/:visitId?/:formId?",
              component: sheetHospitalEvalPage
            }
          ]
        },
        {
          path: "/sheetPage",
          component: sheetPage,
          children: [
            {
              name: "sheetPage",
              path: "/sheetPage/:patientId?/:visitId?/:formId?",
              component: sheetPage
            }
          ]
        },
        {
          path: "/MEWS",
          component: MEWS
        },
        {
          path: "/formPage",
          component: formPage,
          children: [
            {
              name: "formPage",
              path: "/formPage/:patientId?/:visitId?/:formId?",
              component: formPage
            }
          ]
        },
        {
          path: "/evalFormPage",
          component: evalFormPage
        },
        {
          path: "/catheterPage",
          component: catheterPage
        },
        {
          path: "/sugarPage",
          component: sugarPage,
          children: [
            {
              name: "sugarPage",
              path: "/sugarPage/:patientId?/:visitId?/:formId?",
              component: sugarPage
            }
          ]
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
          path: "/nursingRounds",
          component: nursingRounds,
          name: "护理巡视"
        },
        {
          path: "/singleTemperatureChart",
          component: sheetPage,
          children: [
            {
              name: "singleTemperatureChart",
              path: "/singleTemperatureChart/:patientId?/:visitId?/:formId?",
              component: sheetPage
            }
          ]
        },
        {
          path: "/allTemperatureChart",
          component: allTemperatureChart,
          name: "批量录入体温单"
        }
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
    // {
    //   path: "/autoLogin",
    //   component: autoLogin
    // },
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
  next();
});

export default router;
