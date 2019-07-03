
var config = require("../config");
var moment = require("moment");
var fs = require("fs");

var info = {
    "医院名": config.build.env.HOSPITAL_NAME,
    "软件名称": "宸瑞智慧护理系统",
    "版本号": moment().format("YYYY.MM.DD"),
    "最近打包时间": moment().format("YYYY-MM-DD HH:mm"),
    "proxyTable": config.dev.proxyTable || "",
    "关于": {
        "研发单位": "广州宸瑞软件科技有限公司",
        "电话": "020-81192725  |  020-81192726",
        "邮箱": "gzcr@cr-health.com",
        "地址": "广州市海珠区江南大道中180号富力天域中心1301-1314室",
        "官网": "http://www.cr-health.com/",
        "投递简历": "http://www.cr-health.com/jobs12321321"
    }
}

fs.writeFile(
    "./src/version.json",
    JSON.stringify(info, null, 4),
    "utf8",
    function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    }
);

module.exports = info
