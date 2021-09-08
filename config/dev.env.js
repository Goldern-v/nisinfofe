var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"huadu"',
  HOSPITAL_NAME: '"广州市花都区人民医院"',
  HOSPITAL_NAME_SPACE: '"广 州 市 花 都 区 人 民 医 院"',
  title: '"花都人医智慧护理信息系统"'
  // 贵州
  // NODE_ENV: '"development"',
  // HOSPITAL_ID: '"guizhou"',
  // HOSPITAL_NAME: '"贵州省人民医院"',
  // HOSPITAL_NAME_SPACE: '"贵 州 省 人 民 医 院"',
  // COMPANY_NAME: '"百辰源(广州)科技有限公司"',
  // ABOUT_INFO: '"关于百辰源"',
  // title: '"智慧护理信息系统"'
});
