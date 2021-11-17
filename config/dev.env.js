var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"hengli"',
  HOSPITAL_NAME: '"东莞市横沥医院"',
  HOSPITAL_NAME_SPACE: '"东 莞 市 横 沥 医 院"'
});
