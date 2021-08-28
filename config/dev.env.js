var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"huadu"',
  HOSPITAL_NAME: '"广州市花都区人民医院"',
  HOSPITAL_NAME_SPACE: '"广 州 市 花 都 区 人 民 医 院"'
});
