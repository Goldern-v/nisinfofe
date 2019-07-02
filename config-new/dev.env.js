var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"hj"',
  HOSPITAL_NAME: '"东莞市厚街医院"',
  HOSPITAL_NAME_SPACE: '"东 莞 市 厚 街 医 院"'
});
