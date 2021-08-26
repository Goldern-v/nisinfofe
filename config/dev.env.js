var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"beihairenyi"',
  HOSPITAL_NAME: '"北海市人民医院"',
  HOSPITAL_NAME_SPACE: '"北 海 市 人 民 医 院"'
});
