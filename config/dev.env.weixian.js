var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"weixian"',
  HOSPITAL_NAME: '"威县人民医院"',
  HOSPITAL_NAME_SPACE: '"威 县 人 民 医 院"'
});
