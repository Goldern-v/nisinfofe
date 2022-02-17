var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"liaocheng"',
  HOSPITAL_NAME: '"聊城市第二人民医院"',
  HOSPITAL_NAME_SPACE: '"聊 城 市 第 二 人 民 医 院"',
});
