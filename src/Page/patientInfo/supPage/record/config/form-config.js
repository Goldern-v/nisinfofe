/**
 * 表单配置
 * 定义表单的配置信息 2018-08-24 lzj
 */
/**
 * @param {hasMeasure} 是否有措施
 * @param {isOutSign} 是否表单外签名
 * @param {isOutAudit} 是否表单外审核
 */

import weixian from './weixian.js'

const defaultConfig = {
  hasMeasure: true,
  isOutSign: true,
  isOutAudit: true,
  hasCheck: true,
  isAddNewPage: false,
  isPushForward: false
};

// 护理评估列表 有多项签名
const formMSNames = [
  //护理评估
  "CCU护士交接班卡",
  "髋关节置换患者护理单",
  "髋关节置换术后回访表",
  "引流管护理单",
  "造口自护能力护理单",
  "危重患者转运转科记录单",
  "腹股沟疝临床护理路径表单",
  "手足口病临床路径表单",
  "慢性乙型肝炎临床路径表单",
  "临床护理质量指标统计表",
  "病人伤口情况报告表",
  // 护理记录单 样式模版
  "双侧上肢血压登记表",
  "立卧位上肢血压登记表",
  "血氧饱和度测定登记表",
  "间歇性清洁导尿术护理记录单",
  "直肠训练护理记录单",
  // "住院病人处理单",
  "生长发育评估量表",
  //
  "盆底评估报告",
  "子宫复旧治疗单",
  "翻身鼻饲吸痰尿量登记表",
  "纤维支气管镜预约告知单",
  "六分钟步行试验记录表",
  "自发性气胸临床路径表单",
  "社区获得性肺炎临床路径表单",
  "支气管扩张症临床路径表单",
  "支气管哮喘临床路径表单",
  "难免压疮风险告知书",
  "身体约束知情同意书",
  "导尿知情同意书",
  "PICC知情同意书",
  "多重耐药菌感染患者转科或辅助检查通知单",
  "产妇告知书",
  "营养护理单",
  "NRS(2002)营养风险筛查表",
  "经外周穿刺中心静脉导管置入术后维护单",
  "广东省卡介苗接种知情同意书",
  "广东省预防乙型病毒性肝炎疫苗接种知情同意书",
  "一对一陪产服务同意书",
  "催产素静脉点滴观察表",

  // 监测记录
  "脑梗塞溶栓临床护理路径",
  "脑梗塞非溶栓临床护理路径",
  // "MMSE", // 简易智能精神状态量表（MMSE）
  // "简易智力状态检查",

  // 报告单
  "护理会诊单",
  "手术病人交接单",
  "输血安全护理单",

  "急性心肌梗死康复训练表",
  "髋关节置换术后回访表",
  "护理分级评价表",

  "间歇性导尿知情同意书",
  "指力刺激直肠训练知情同意书",
  "分娩记录单",

  // 威县医院表单
  ...(weixian.formMSNames)

];

// 护理评估列表 有多项签名 新建页面
const formRecordsNames = ["心肺复苏单", "住院病人处理单"];

const formPushForward = ["健康教育单"];

export function getFormConfig(formName) {
  // 护理评估列表 有多项签名
  if (formMSNames.indexOf(formName) > -1) {
    let config = Object.assign({}, defaultConfig);
    config.hasMeasure = false;
    config.isOutSign = false;
    config.isOutAudit = false;
    config.hasCheck = false;
    return config;
  }

  // 护理评估列表
  if (formRecordsNames.indexOf(formName) > -1) {
    let config = Object.assign({}, defaultConfig);
    config.hasMeasure = false;
    config.isOutSign = false;
    config.isOutAudit = false;
    config.hasCheck = false;
    config.isAddNewPage = true;
    return config;
  }

  // 推送功能单
  if (formPushForward.indexOf(formName) > -1) {
    let config = Object.assign({}, defaultConfig);
    config.hasMeasure = false;
    config.isOutSign = false;
    config.isOutAudit = false;
    config.hasCheck = false;
    config.isPushForward = true;
    return config;
  }

  switch (formName) {
    // 仅有 责任护士签名
    case "入院评估表(神经内科)":
    case "入院评估表(心血管内科)":
    case "VTE风险评估量表(手术科室)":
    case "VTE风险评估量表(非手术科室)":
    case "监控CAUTI或早期拔除尿管质量指标评估记录表":
    case "监控CAUTI质量指标评估记录表":
    case "监控CRBSI质量指标评估记录表":
    case "呼吸内科监控HAP质量指标评估记录表":
    case "监控HAP质量指标评估记录表": {
      let config = Object.assign({}, defaultConfig);
      config.hasMeasure = false;
      config.isOutSign = false;
      config.isOutAudit = false;
      config.hasCheck = false;
      return config;
    }

    // 有 责任护士签名 审核人签名
    case "入院评估表":
    case "入院评估表(产科)":
    case "入院评估表(新生儿科)":
    case "入院评估表(妇科)":
    case "入院评估表(外科)":
    case "入院评估表(内科)":
    case "入院评估表(儿科)":
    case "首次护理记录单(产科)":
    case "首次护理记录单(新生儿科)":  
    case "首次护理记录单(妇科)":
    case "首次护理记录单(外科)":
    case "首次护理记录单(内科)":
    case "首次护理记录单(儿科)": {
      let config = Object.assign({}, defaultConfig);
      config.hasMeasure = false;
      config.isOutSign = true;
      config.isOutAudit = true;
      config.hasCheck = true;
      return config;
    }
    default: {
      return defaultConfig;
    }
  }
}
