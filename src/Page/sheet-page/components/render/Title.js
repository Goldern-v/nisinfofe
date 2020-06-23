import sheetInfo from "../config/sheetInfo/index";

export default function Title(data = [], autoData = [], index) {
  let Th;
  switch (sheetInfo.sheetType) {
    case "special":
      {
        // 陵城外一科 特别护理单
        Th = JSON.parse(
          JSON.stringify(require("../config/tbhld_lc/th").default)
        )
      }
      break;
    case "icu_lc":
      {
        // 内科重症医学科
        Th = JSON.parse(
          JSON.stringify(require("../config/nkzzyxk_lc/th").default)
        );
      }
      break;
    case "com_lc":
      {
        // 外科重症医学科
        Th = JSON.parse(
          JSON.stringify(require("../config/wkzzyxk_lc/th").default)
        );
      }
      break;
    case "newborn_lc": {
      //  陵城区新生儿科 里的 新生儿监护
      Th = JSON.parse(
        JSON.stringify(require("../config/neonatology_lc/th").default)
      );
    }
      break;
    case "Record_Children_Serious_Lc": {
      // 陵城区-病重（病危）
      Th = JSON.parse(
        JSON.stringify(require("../config/picu_lc/th.js").default)
      );
    }
      break;
    case "neurology":
      {
        // 神经内科
        Th = JSON.parse(
          JSON.stringify(require("../config/neurology/th").default)
        );
      }
      break;
    case "obstetrics":
      {
        // 产科
        Th = JSON.parse(
          JSON.stringify(require("../config/obstetrics/th").default)
        );
      }
      break;
    case "neurosurgery":
      {
        // 神经外科
        Th = JSON.parse(
          JSON.stringify(require("../config/neurosurgery/th").default)
        );
      }
      break;
    case "burn_plastic":
      {
        // 烧伤整形科护理
        Th = JSON.parse(
          JSON.stringify(require("../config/burn_plastic/th").default)
        );
      }
      break;
    case "general_surgery":
      {
        // 普外科
        Th = JSON.parse(
          JSON.stringify(require("../config/general_surgery/th").default)
        );
      }
      break;
    case "gynecology":
      {
        // 妇科
        Th = JSON.parse(
          JSON.stringify(require("../config/default/th").default)
        );
      }
      break;
    case "infectious_diseases":
      {
        // 感染科
        Th = JSON.parse(
          JSON.stringify(require("../config/default/th").default)
        );
      }
      break;
    case "orthopedics":
      {
        // 骨科
        Th = JSON.parse(
          JSON.stringify(require("../config/orthopedics/th").default)
        );
      }
      break;
    case "micro_surgery":
      {
        // 显微手足科
        Th = JSON.parse(
          JSON.stringify(require("../config/orthopedics/th").default)
        );
      }
      break;
    case "respiration":
      {
        // 呼吸科
        Th = JSON.parse(
          JSON.stringify(require("../config/default/th").default)
        );
      }
      break;
    case "emergency":
      {
        // 急诊科
        Th = JSON.parse(
          JSON.stringify(require("../config/default/th").default)
        );
      }
      break;
    case "urology":
      {
        // 泌尿科
        Th = JSON.parse(
          JSON.stringify(require("../config/urology/th").default)
        );
      }
      break;
    case "endocrinology":
      {
        // 内分泌科
        Th = JSON.parse(
          JSON.stringify(require("../config/default/th").default)
        );
      }
      break;
    case "burn":
      {
        // 烧伤科
        Th = JSON.parse(JSON.stringify(require("../config/burn/th").default));
      }
      break;
    case "ear_nose_throat":
      {
        // 耳喉鼻科
        Th = JSON.parse(
          JSON.stringify(require("../config/default/th").default)
        );
      }
      break;
    case "reha_medicin":
      {
        // 康复医学科
        Th = JSON.parse(
          JSON.stringify(require("../config/default/th").default)
        );
      }
      break;
    case "medicine_cardiovascular":
      {
        // 心血管内科
        Th = JSON.parse(
          JSON.stringify(
            require("../config/medicine_cardiovascular/th").default
          )
        );
      }
      break;
    case "neonatology":
      {
        // 产科 里的 新生儿科
        Th = JSON.parse(
          JSON.stringify(require("../config/neonatology/th").default)
        );
      }
      break;
    case "neonatology2":
      {
        // 新生儿科 里的 新生儿科
        Th = JSON.parse(
          JSON.stringify(require("../config/neonatology2/th").default)
        );
      }
      break;
    case "hemodialysis":
      {
        // 血透室
        Th = JSON.parse(
          JSON.stringify(require("../config/default/th").default)
        );
      }
      break;
    // case "tumor_hemodialysis":
    //   {
    //     // 肿瘤血液科
    //     Th = JSON.parse(
    //       JSON.stringify(require("../config/tumor_hemodialysis/th").default)
    //     );
    //   }
    //   break;
    case "trauma_orthopedics":
      {
        // 创骨科
        Th = JSON.parse(
          JSON.stringify(require("../config/trauma_orthopedics/th").default)
        );
      }
      break;
    case "joint":
      {
        // 关节骨科
        Th = JSON.parse(JSON.stringify(require("../config/joint/th").default));
      }
      break;
    case "spinal_orthopedics":
      {
        // 脊柱骨科
        Th = JSON.parse(
          JSON.stringify(require("../config/spinal_orthopedics/th").default)
        );
      }
      break;
    case "gastroenterology":
      {
        // 消化内科
        Th = JSON.parse(
          JSON.stringify(require("../config/gastroenterology/th").default)
        );
      }
      break;
    case "prenatal":
      {
        // 产前
        Th = JSON.parse(
          JSON.stringify(require("../config/prenatal/th").default)
        );
      }
      break;
    case "post_partum":
      {
        // 产后观察
        Th = JSON.parse(
          JSON.stringify(require("../config/post_partum/th").default)
        );
      }
      break;
    case "blood_purification":
      {
        // 血透
        Th = JSON.parse(
          JSON.stringify(require("../config/blood_purification/th").default)
        );
      }
      break;
    case "oxytocin":
      {
        // 催产素静脉点滴观察
        Th = JSON.parse(
          JSON.stringify(require("../config/oxytocin/th").default)
        );
      }
      break;
    case "dressing_count":
      {
        // 经阴道接生器械敷料清点
        Th = JSON.parse(
          JSON.stringify(require("../config/dressing_count/th").default)
        );
      }
      break;
    case "neurology_wx":
      {
        // 威县-神经内科
        Th = JSON.parse(
          JSON.stringify(require("../config/neurology_wx/th").default)
        );
      }
      break;
    case "unified_wx":
      {
        // 威县-统一护理记录单
        Th = JSON.parse(
          JSON.stringify(require("../config/unified_wx/th").default)
        );
      }
      break;
    case "intensive_care_wx":
      {
        // 威县-脑外科重症监护单
        Th = JSON.parse(
          JSON.stringify(require("../config/intensive_care_wx/th").default)
        );
      }
      break;
    case "ccu_wx":
      {
        // 威县-CCU监护单（心血管内科）
        Th = JSON.parse(
          JSON.stringify(require("../config/ccu_wx/th").default)
        );
      }
      break;
    case "cpr":
      {
        // cpr心肺复苏单（心血管内科）
        Th = JSON.parse(
          JSON.stringify(require("../config/cpr/th").default)
        );
      }
      break;
    case "maternal_newborn_lc":
      {
        // 陵城-孕产妇、新生儿护理观察记录单
        Th = JSON.parse(
          JSON.stringify(require("../config/maternal_newborn_lc/th").default)
        );
      }
      break;
    default: {
      Th = JSON.parse(JSON.stringify(require("../config/default/th").default));
    }
  }
  if (Th.th.title && Th.th.title.length) {
    for (let i = 0; i < Th.th.title.length; i++) {
      if (Th.th.title[i].canSet) {
        try {
          Th.th.title[i].name = data.find(item => {
            return item.fieldEn == Th.th.title[i].key;
          }).fieldCn;
        } catch (e) {
          try {
            let reverseArr = [];
            if (sheetInfo.selectBlock.recordTitleCoyeType !== "no") {
              reverseArr = [...autoData];
            }
            Th.th.title[i].name = reverseArr.find(item => {
              return item.fieldEn == Th.th.title[i].key && item.pageIndex === index;
            }).fieldCn;
          } catch (e) { }
        }
      }
    }
  }

  for (let i = 0; i < Th.th.top.length; i++) {
    if (Th.th.top[i].canSet) {
      try {
        Th.th.top[i].name = data.find(item => {
          return item.fieldEn == Th.th.top[i].key;
        }).fieldCn;
      } catch (e) {
        try {
          let reverseArr = [];
          if (sheetInfo.selectBlock.recordTitleCoyeType !== "no") {
            reverseArr = [...autoData];
          }
          Th.th.top[i].name = reverseArr.find(item => {
            return item.fieldEn == Th.th.top[i].key && item.pageIndex === index;
          }).fieldCn;
        } catch (e) { }
      }
    }
  }
  for (let i = 0; i < Th.th.mid.length; i++) {
    if (Th.th.mid[i].canSet) {
      try {
        Th.th.mid[i].name = data.find(item => {
          return item.fieldEn == Th.th.mid[i].key;
        }).fieldCn;
      } catch (e) {
        try {
          let reverseArr = [];
          if (sheetInfo.selectBlock.recordTitleCoyeType !== "no") {
            reverseArr = [...autoData];
          }
          Th.th.mid[i].name = reverseArr.find(item => {
            return item.fieldEn == Th.th.mid[i].key && item.pageIndex === index;
          }).fieldCn;
        } catch (e) { }
      }
    }
  }
  if (Th.th.bottom) {
    for (let i = 0; i < Th.th.bottom.length; i++) {
      if (Th.th.bottom[i].canSet) {
        try {
          Th.th.bottom[i].name = data.find(item => {
            return item.fieldEn == Th.th.bottom[i].key;
          }).fieldCn;
        } catch (e) {
          try {
            let reverseArr = [];
            if (sheetInfo.selectBlock.recordTitleCoyeType !== "no") {
              reverseArr = [...autoData];
            }
            Th.th.bottom[i].name = reverseArr.find(item => {
              return (
                item.fieldEn == Th.th.bottom[i].key && item.pageIndex === index
              );
            }).fieldCn;
          } catch (e) { }
        }
      }
    }
  }

  return Th;
}
