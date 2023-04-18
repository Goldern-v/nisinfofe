var path = require("path");
var publish = require("./publish.js");
/** 只上传文件到服务器
 * 前提是已经打包好了项目
 * 路径手动修改
 * sshUpload第一个参数手动修改
 */
const text = "阳春中医院";
let url = path.resolve(__dirname, `../dist/${text}`);
publish.sshUpload(text, url);
