// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path");
var chalk = require("chalk");
var envAll = require("./env.all");
var merge = require("webpack-merge");
// crNursing  argv
var _origin = process.env.npm_config_argv ? JSON.parse(process.env.npm_config_argv).original : '';
const _hospitalName = _origin[2];

let prodEnv;
let devEnv;
let envFileName = "";
let hospitalName = "";
devEnv = require("./dev.env");
prodEnv = require("./prod.env");
hospitalName = prodEnv.HOSPITAL_NAME;

if (_hospitalName) {
    envFileName = _hospitalName.replace("--", "");
    if (Object.keys(envAll).indexOf(envFileName) > -1) {
        devEnv = merge(prodEnv, envAll[envFileName]);
        prodEnv = envAll[envFileName];
        // devEnv = require("./dev.env." + envFileName);
        // prodEnv = require("./prod.env." + envFileName);
        hospitalName = prodEnv.HOSPITAL_NAME;
    }
}

hospitalName = hospitalName.replace(/["']/g, "");

devEnv["NODE_ENV"] = '"development"';
prodEnv["NODE_ENV"] = '"production"';

console.log(
    chalk.bgCyan.black(" 部署配置 "),
    chalk.yellow(hospitalName || "东莞市厚街医院")
);

console.log(__dirname);

module.exports = {
    build: {
        env: prodEnv,
        index: path.resolve(__dirname, `../dist/${hospitalName}/index.html`),
        assetsRoot: path.resolve(__dirname, `../dist/${hospitalName}`),
        assetsSubDirectory: "static",
        // assetsPublicPath: './webpage/dist/',
        assetsPublicPath: "/crNursing/",
        // assetsPublicPath: "/crNursing/webpage/dist/",
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
        parallel: require("os").cpus().length > 1 // 构建时开启多进程处理babel编译
    },
    dev: {
        env: devEnv,
        port: 4889,
        autoOpenBrowser: true,
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        // proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        proxyTable: {
            "/crNursing/api": {
                //target: "http://120.197.141.41 1:9091", //厚街正式
                // target: "http://58.42.249.209:17953", //贵州医科大正式
                target: "http://120.197.141.41:9094", //东莞正式库的测试

                // target: "http://120.25.105.45:9864", //厚街测试
                // target: "http://120.25.105.45:9865", //厚街测试
                // target: "http://120.25.105.45:9866", //厚街测试
                // target: "http://192.168.1.20:8964", // 内网测试cno
                // target: "http://dev.cr-health.com:4453", // 外网测试
                // target: "http://192.168.2.91:8062", // 内网兆彬IP测试
                // target: 'http://10.35.9.115:8085', // 厚街内网俊涛ip测试
                // target: "http://192.168.2.229:8084", // 厚街内网俊涛ip测试
                // target: "http://192.168.2.91:8062", //东莞兆彬ip测试
                // target: "http://192.168.2.144:8080", //广豪
                // target: "http://120.25.105.45:9867",
                // target: "http://192.168.3.115:8080",
                changeOrigin: true,
                pathRewrite: {
                    // crNursing 东莞厚街护理系统 路径
                    "^/crNursing/api": "/crNursing/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
            "/crNursing/formUrl": {
                // target: "http://120.197.141.41:9091", //东莞
                // target: "http://120.197.141.41:9094", //东莞正式库的测试

                // target: "http://120.25.105.45:9864", //测试
                target: "http://59.38.110.189:9092", //测试-基准
                // target: "http://192.168.1.54:9901", //测试


                // target: "http://192.168.1.20:8964", // 内网测试cno
                // target: "http://dev.cr-health.com:4453", // 外网测试
                // target: 'http://192.168.1.88:8062', // 内网兆彬IP测试
                // target: 'http://10.35.9.115:8085', // 厚街内网俊涛ip测试
                // target: "http://192.168.2.229:8084", // 厚街内网俊涛ip测试
                // target: "http://120.197.141.41:9094", //东莞正式库的测试

                changeOrigin: true,
                pathRewrite: {
                    // crNursing 东莞厚街护理系统 路径
                    "^/crNursing/formUrl": "/crNursing/formUrl" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
            "/crNursing/sheet-print": {
                // target: "http://120.197.141.41:9091", //东莞
                // target: "http://120.197.141.41:9094", //东莞正式库的测试

                // target: "http://120.25.105.45:9864", //测试
                target: "http://120.25.105.45:9866", //厚街测试
                // target: "http://120.25.105.45:9867", //陵城测试

                target: "http://120.25.105.45:9864", //测试

                // target: "http://192.168.1.20:8964", // 内网测试cno
                // target: "http://dev.cr-health.com:4453", // 外网测试
                // target: 'http://192.168.1.88:8062', // 内网兆彬IP测试
                // target: 'http://10.35.9.115:8085', // 厚街内网俊涛ip测试
                // target: "http://192.168.2.229:8084", // 厚街内网俊涛ip测试

                changeOrigin: true,
                pathRewrite: {
                    // crNursing 东莞厚街护理系统 路径
                    "^/crNursing/sheet-print": "/crNursing/sheet-print" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
            // "/crNursing/printServer": {
            //   target: "http://10.35.9.115:8085",
            //   ws: true,
            //   changeOrigin: true,
            //   secure: false
            // },
            // "/crNursing/message": {
            //   target: "http://120.197.141.41:9091",
            //   ws: true,
            //   changeOrigin: true,
            //   secure: false
            // }
        }
    }
};
