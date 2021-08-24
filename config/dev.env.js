var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  HOSPITAL_ID: '"fuyou"',
  HOSPITAL_NAME: '"江门市妇幼保健院"',
  HOSPITAL_NAME_SPACE: '"江 门 市 妇 幼 保 健 院"'
});
