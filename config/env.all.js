/*
  特殊配置项介绍：
  ENABLE_BLUETOOTH_SIGN:实际上是U盾形式ca的配置
  hasGroupHos:需要根据白板分组进行显示
  hasFollow:根据我的关注进行显示
  npm_config_report:需要生成报告的医院
  formPage_change_major:评估单模块患者护理文书通过科室区分（解决转科表单的问题）
*/

module.exports = {
  "": {
    HOSPITAL_ID: '"hj"',
    HOSPITAL_NAME: '"东莞市厚街医院"',
    HOSPITAL_NAME_SPACE: '"东 莞 市 厚 街 医 院"'
  },
  analyz: {
    HOSPITAL_ID: '"hj"',
    HOSPITAL_NAME: '"东莞市厚街医院"',
    HOSPITAL_NAME_SPACE: '"东 莞 市 厚 街 医 院"',
    npm_config_report: "true"
  },
  houjie: {
    HOSPITAL_ID: '"hj"',
    HOSPITAL_NAME: '"东莞市厚街医院"',
    HOSPITAL_NAME_SPACE: '"东 莞 市 厚 街 医 院"'
  },
  fqfybjy:{
    HOSPITAL_ID: '"fqfybjy"',
    HOSPITAL_NAME:'"福清妇幼保健院"',
    HOSPITAL_NAME_SPACE: '"福 清 妇 幼 保 健 院"'
  },
  guiyi: {
    HOSPITAL_ID: '"gy"',
    HOSPITAL_NAME: '"贵州医科大学附属医院"',
    HOSPITAL_NAME_SPACE: '"贵 州 医 科 大 学 附 属 医 院"'
  },
  wuhang: {
    HOSPITAL_ID: '"wuhang"',
    HOSPITAL_NAME: '"武汉市第一医院"',
    HOSPITAL_NAME_SPACE: '"武 汉 市 第 一 医 院"'
  },
  weixian: {
    HOSPITAL_ID: '"weixian"',
    HOSPITAL_NAME: '"威县人民医院"',
    HOSPITAL_NAME_SPACE: '"威 县 人 民 医 院"',
    ENABLE_BLUETOOTH_SIGN: "true"
  },
  lingcheng: {
    HOSPITAL_ID: '"lingcheng"',
    HOSPITAL_NAME: '"德州市陵城区人民医院"',
    HOSPITAL_NAME_SPACE: '"陵 城 区 人 民 医 院"',
    ENABLE_BLUETOOTH_SIGN: "true",
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  yanshi: {
    HOSPITAL_ID: '"yanshi"',
    HOSPITAL_NAME: '"东莞市厚街医院"',
    HOSPITAL_NAME_SPACE: '"东 莞 市 厚 街 医 院"'
  },
  huadu: {
    HOSPITAL_ID: '"huadu"',
    HOSPITAL_NAME: '"广州市花都区人民医院"',
    HOSPITAL_NAME_SPACE: '"广 州 市 花 都 区 人 民 医 院"',
    title: '"花都人医智慧护理信息系统"'
  },
  wujing: {
    HOSPITAL_ID: '"wujing"',
    HOSPITAL_NAME: '"武警广东省总队医院"',
    HOSPITAL_NAME_SPACE: '"武 警 广 东 省 总 队 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  hengxian: {
    HOSPITAL_ID: '"hengxian"',
    HOSPITAL_NAME: '"横县人民医院"',
    HOSPITAL_NAME_SPACE: '"横 县 人 民 医 院"'
  },
  fuyou: {
    HOSPITAL_ID: '"fuyou"',
    HOSPITAL_NAME: '"江门市妇幼保健院"',
    HOSPITAL_NAME_SPACE: '"江 门 市 妇 幼 保 健 院"',
    hasGroupHos:true, // 需要根据白板分组进行显示
  },
  liaocheng: {
    HOSPITAL_ID: '"liaocheng"',
    HOSPITAL_NAME: '"聊城市第二人民医院"',
    HOSPITAL_NAME_SPACE: '"聊 城 市 第 二 人 民 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"',
    hasFollow:true // 需要根据我的关注进行显示
  },
  lyxrm: {
    HOSPITAL_ID: '"lyxrm"',
    HOSPITAL_NAME: '"临邑县人民医院"',
    HOSPITAL_NAME_SPACE: '"临 邑 县 人 民 医 院"',
    COMPANY_NAME: '"百辰源（北京）科技有限公司"',
    ABOUT_INFO: '"关于百辰源"',
    title: '"智慧护理信息系统"',
    hasFollow:true
  },
  guizhou: {
    HOSPITAL_ID: '"guizhou"',
    HOSPITAL_NAME: '"贵州省人民医院"',
    HOSPITAL_NAME_SPACE: '"贵 州 省 人 民 医 院"',
    COMPANY_NAME: '"百辰源(广州)科技有限公司"',
    ABOUT_INFO: '"关于百辰源"',
    title: '"智慧护理信息系统"',
    splitSave:true
  },
  zhongshanqi: {
    HOSPITAL_ID: '"zhongshanqi"',
    HOSPITAL_NAME: '"中山大学附属第七医院"',
    HOSPITAL_NAME_SPACE: '"中 山 大 学 附 属 第 七 医 院"',
    title: '"中山七院智慧护理信息系统"'
  },
  hengli: {
    HOSPITAL_ID: '"hengli"',
    HOSPITAL_NAME: '"东莞市横沥医院"',
    HOSPITAL_NAME_SPACE: '"东 莞 市 横 沥 医 院"'
  },
  nanfangzhongxiyi: {
    HOSPITAL_ID: '"nanfangzhongxiyi"',
    HOSPITAL_NAME: '"南方医科大学中西医结合医院"',
    HOSPITAL_NAME_SPACE: '"南 方 医 科 大 学 中 西 医 结 合 医 院"',
    title: '"南方医科大学中西医结合医院智慧护理信息系统"',
    formPage_change_major: true
  },
  xiegang: {
    HOSPITAL_ID: '"xiegang"',
    HOSPITAL_NAME: '"东莞市谢岗医院"',
    HOSPITAL_NAME_SPACE: '"东 莞 市 谢 岗 医 院"'
  },
  shannan: {
    HOSPITAL_ID: '"shannan"',
    HOSPITAL_NAME: '"山南市人民医院"',
    HOSPITAL_NAME_SPACE: '"山 南 市 人 民 医 院"'
  },
  yangchunzhongyi: {
    HOSPITAL_ID: '"yangchunzhongyi"',
    HOSPITAL_NAME: '"阳春中医院"',
    HOSPITAL_NAME_SPACE: '"阳 春 中 医 院"'
  },
  beihairenyi: {
    HOSPITAL_ID: '"beihairenyi"',
    HOSPITAL_NAME: '"北海市人民医院"',
    HOSPITAL_NAME_SPACE: '"北 海 市 人 民 医 院"'
  },
  quzhou: {
    HOSPITAL_ID: '"quzhou"',
    HOSPITAL_NAME: '"曲周县医院"',
    HOSPITAL_NAME_SPACE: '"曲 周 县 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  foshanrenyi: {
    HOSPITAL_ID: '"foshanrenyi"',
    HOSPITAL_NAME: '"佛山市第一人民医院"',
    HOSPITAL_NAME_SPACE: '"佛 山 市 第 一 人 民 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"',
    ENABLE_BLUETOOTH_SIGN: "true"
  },
  fsxt: {
    HOSPITAL_ID: '"fsxt"',
    HOSPITAL_NAME: '"南方医科大学顺德医院附属杏坛医院"',
    HOSPITAL_NAME_SPACE: '"南 方 医 科 大 学 顺 德 医 院 附 属 杏 坛 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"',
    hasFollow:true
  },
  whyx: {
    HOSPITAL_ID: '"whyx"',
    HOSPITAL_NAME: '"武汉亚心医院"',
    HOSPITAL_NAME_SPACE: '"武 汉 亚 心 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  whfk: {
    HOSPITAL_ID: '"whfk"',
    HOSPITAL_NAME: '"武汉市肺科医院"',
    HOSPITAL_NAME_SPACE: '"武 汉 市 肺 科 医 院（武汉市结核病防治所）"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  sdlj: {
    HOSPITAL_ID: '"sdlj"',
    HOSPITAL_NAME: '"佛山市顺德区龙江医院"',
    HOSPITAL_NAME_SPACE: '"广 东 医 科 大 学 附 属 第 三 医 院  （佛山市顺德区龙江医院）"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  gdtj: {
    HOSPITAL_ID: '"gdtj"',
    HOSPITAL_NAME: '"广东同江医院"',
    HOSPITAL_NAME_SPACE: '"广 东 同 江 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  ytll: {
    HOSPITAL_ID: '"ytll"',
    HOSPITAL_NAME: '"玲珑英诚医院"',
    HOSPITAL_NAME_SPACE: '"玲 珑 英 诚 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  lyyz: {
    HOSPITAL_ID: '"lyyz"',
    HOSPITAL_NAME: '"临沂沂州医院"',
    HOSPITAL_NAME_SPACE: '"临 沂 沂 州 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  },
  qhwy: {
    HOSPITAL_ID: '"qhwy"',
    HOSPITAL_NAME: '"青海省第五人民医院"',
    HOSPITAL_NAME_SPACE: '"青 海 省 第 五 人 民 医 院"',
    COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
    ABOUT_INFO: '"关于宸瑞普惠"',
    title: '"智慧护理信息系统"'
  }
};
