var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"foshanrenyi"',
  HOSPITAL_NAME: '"佛山市第一人民医院"',
  HOSPITAL_NAME_SPACE: '"佛 山 市 第 一 人 民 医 院"',
  COMPANY_NAME: '"宸瑞普惠(广州)科技有限公司"',
  ABOUT_INFO: '"关于宸瑞普惠"',
  title: '"智慧护理信息系统"',
  ENABLE_BLUETOOTH_SIGN: false
});
