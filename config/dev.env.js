var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"nanfangzhongxiyi"',
  HOSPITAL_NAME: '"南方医科大学中西医结合医院"',
  HOSPITAL_NAME_SPACE: '"南 方 医 科 大 学 中 西 医 结 合 医 院"',
});
