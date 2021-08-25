var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"guizhou"',
  HOSPITAL_NAME: '"贵州省人民医院"',
  HOSPITAL_NAME_SPACE: '"贵 州 省 人 民 医 院"',
});
