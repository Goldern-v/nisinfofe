var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"wh"',
  HOSPITAL_NAME: '"武汉市第一医院"',
  HOSPITAL_NAME_SPACE: '"武 汉 市 第 一 医 院"'
});
