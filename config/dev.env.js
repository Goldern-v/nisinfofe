var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"xiegang"',
  HOSPITAL_NAME: '"东莞市谢岗医院"',
  HOSPITAL_NAME_SPACE: '"东 莞 市 谢 岗 医 院"'
});
