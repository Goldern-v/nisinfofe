import Vue from "vue";
import Router from "vue-router";
import main from "@/Part/main";

import lesion from "@/Page/lesion/lesion";

import patientInfo from "@/Page/patientInfo/patientInfo";
import nursingHome from "@/Page/patientInfo/supPage/nursingHome/nursingHome";
import information from "@/Page/patientInfo/supPage/information/information";
import advice from "@/Page/patientInfo/supPage/advice/advice";
import inspect from "@/Page/patientInfo/supPage/inspect/inspect";
import test from "@/Page/patientInfo/supPage/test/test";
import record from "@/Page/patientInfo/supPage/record/record";
import cost from "@/Page/patientInfo/supPage/cost/cost";
import home from "@/Page/patientInfo/supPage/home/home";
import consultation from "@/Page/patientInfo/supPage/consultation/consultation";
import temperature from "@/Page/patientInfo/supPage/temperature/temperature";
import diagnosis from "@/Page/patientInfo/supPage/diagnosis/diagnosis";
import diganosisDetails from "@/Page/patientInfo/supPage/diagnosis/diganosis-details/diganosisDetails";
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar.vue"; // 厚街
import bloodSugarWeiXian from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_weixian.vue"; // 威县
import healthEducation from "@/Page/patientInfo/supPage/healthEducation/healthEducation.vue"; // 厚街

import task from "@/Page/lesion/supPage/task/task";
import bed from "@/Page/lesion/supPage/bed/bed";
import shift from "@/Page/lesion/supPage/shift/shift";
import implementation from "@/Page/lesion/supPage/implementation/implementation";
import login from "@/Page/login/login";
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue";
import catheter from "@/Page/patientInfo/supPage/catheter/catheter.vue";
import sheetNursingOrder from "@/Page/patientInfo/supPage/sheetNursingOrder/sheetNursingOrder.vue"; // 护嘱记录单页面
import indexXin from "@/Page/index-xin/Nurse.vue";

import imageView from "@/Part/imageView/imageView";

// 护理会诊
// import nursingConsultation from '@/Page/nursingConsultation/nursingConsultation'
// import nursingConsultationStaff from '@/Page/nursingConsultationStaff/nursingConsultationStaff'

import infuse from "../Page/lesion/supPage/infuse/infuse.vue";
import log from "../Page/lesion/supPage/log/log.vue";
// 收件箱
import inBox from "../Page/inBox/inBox.vue";
import mailDetails from "../Page/mail-details/mail-details.vue";

// 护理文书
import nursingDocumentation from "../Page/nursing-documentation/nursing-documentation.vue";
//异常路径
import NotFoundComponent from "../components/NotFound/NotFoundComponent.vue";

//自动登录
import autoLogin from "../Part/auto-login";

// import whiteBoard from '@/Part/whiteBoard/whiteBoard'

import print from "@/Part/print/print.vue";

import wardReport from "@/Page/ward-report/ward-report.vue";
import wardReportDetail from "@/Page/ward-report/ward-report-detail.vue";

import inpatientReport from "@/Page/inpatient-report/inpatient-report.vue";
import inpatientReportDetail from "@/Page/inpatient-report/inpatient-report-detail.vue";

import shiftWork from "@/Page/shift-work/shift-work.vue";

import shiftWorkDetail from "@/Page/shift-work/shift-work-detail.vue";

import badEvent from "@/Page/badEvent/badEvent.vue";
import badEventViewPage from "@/Page/badEvent/badEventViewPage.vue";
import badEventEditPage from "@/Page/badEvent/badEventEditPage.vue";

import white from "@/Page/white/white.vue";
// 护理记录单页面
import sheetPage from "@/Page/sheet-page/sheet-page.vue";
// 住院评估页面
import sheetHospitalEval from "@/Page/sheet-hospital-eval/sheet-hospital-eval.vue";
// 入院评估
import sheetHospitalAdmission from "@/Page/sheet-hospital-admission/sheet-hospital-admission.vue";

import hospitalEval from "@/Page/patientInfo/supPage/hospital-eval/hospital-eval";
//  护理文书
import formPage from "@/Page/form-page/form-page";
import evalFormPage from "@/Page/eval-form-page/form-page";
import MEWS from "@/Page/MEWS/MEWS.vue";
//导管
import catheterPage from "@/Page/catheter-page/catheter-page";
//血糖
import sugarPage from "@/Page/sugar-page/sugar-page";
//护理制度
import nursingRules from "@/Page/nursing-rules/nursing-rules";
// 未做检查/检验菜单
import noCheckTest from "@/Page/no-check-test/no-check-test";

import home1 from "@/Page/catheter-page/home1/home";

/** 护记pdf打印 */
import toPdfPrint from "@/Page/sheet-page/pdfPrintPage/toPdfPrint";

/** 血透患者排班 */
import scheduling from "@/Page/scheduling/scheduling";

// 健康宣教
import healthEdu from "@/Page/healthEdu/healthEdu.vue";

// 住院病人处理单
import handlingPage from "@/Page/handling-page/handling-page";

// 血氧单
import oxygenPage from "@/Page/oxygen-page/oxygen-page";

// 共享文件
import departmentSharedFile from "@/Page/department-shared-file/department-shared-file";

// 扁平管理
import flatManagement from "@/Page/flat-management/flat-management";

// 归档
import archive from "@/Page/archive/archive.vue";

// 家属大屏
import familyBigScreen from "@/Page/family-big-screen/family-big-screen.vue";
import videoListSetting from "@/Page/family-big-screen/video-list-setting.vue";

/** demo */
import demo from "@/demo/demo";
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
        {
          path: "/inBox",
          component: inBox
        },
        {
          path: "/bed",
          component: bed
        },
        {
          path: "/infuse",
          component: infuse
        },
        {
          path: "/log",
          component: log
        },
        {
          path: "/healthEdu",
          component: healthEdu
        },
        {
          path: "/handlingPage",
          component: handlingPage
        },
        {
          path: "/oxygenPage",
          component: oxygenPage
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
          component: shiftWork,
          children: [
            {
              name: "shiftWork",
              path: "/shiftWork/:code?/:id?",
              component: shiftWorkDetail
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
        {
          path: "/mailDetails/:id",
          component: mailDetails
        },
        {
          path: "/lesion",
          component: lesion,
          redirect: "/lesion/bed",
          children: [
            {
              path: "task",
              component: task,
              name: "今日任务",
              alias: "今日任务"
            },
            {
              path: "shift",
              component: shift
            },
            {
              path: "implementation",
              component: implementation
            },
            {
              path: "/wait-bed",
              component: resolve => {
                require(["../Page/lesion/supPage/log/wait-bed.vue"], resolve);
              }
            }
          ]
        },
        {
          path: "/patientInfo",
          component: patientInfo,
          alias: "病人信息",
          children: [
            {
              path: "/nursingHome",
              component: nursingHome
            },
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
              path: "/cost",
              component: cost
            },
            {
              path: "/home",
              component: home
            },
            {
              path: "/home1",
              component: home1
            },
            {
              path: "/diagnosis",
              component: diagnosis
            },
            {
              path: "/diganosisDetails/:id",
              component: diganosisDetails
            },
            {
              path: "/consultation",
              component: consultation,
              name: "会诊",
              alias: "会诊"
            },
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
          component: nursingDocumentation
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
        { path: "/sheetHospitalAdmission", component: sheetHospitalAdmission },
        { path: "/sheetHospitalEval", component: sheetHospitalEval },
        { path: "/sheetPage", component: sheetPage },
        { path: "/MEWS", component: MEWS },
        { path: "/formPage", component: formPage },
        { path: "/evalFormPage", component: evalFormPage },
        { path: "/catheterPage", component: catheterPage },
        { path: "/sugarPage", component: sugarPage },
        { path: "/scheduling", component: scheduling },
        { path: "/nursingRules", component: nursingRules },
        { path: "/noCheckTest", component: noCheckTest },
        { path: "/departmentSharedFile", component: departmentSharedFile },
        { path: "/flatManagement", component: flatManagement }
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
      component: autoLogin
    },
    {
      path: "/print/:type",
      component: print
    },
    { path: "/indexXin", component: indexXin },
    { path: "/toPdfPrint", component: toPdfPrint },

    { path: "*", component: NotFoundComponent }
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
