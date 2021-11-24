var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOSPITAL_ID: '"lingcheng"',
    HOSPITAL_NAME: '"德州市陵城区人民医院"',
    HOSPITAL_NAME_SPACE: '"陵 城 区 人 民 医 院"',
});
