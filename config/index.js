// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path");
var chalk = require("chalk");
var envAll = require("./env.all");
var merge = require("webpack-merge");
// crNursing  argv
var _origin = JSON.parse(process.env.npm_config_argv).original;
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

const HOSPITAL_ID = devEnv.HOSPITAL_ID.replace(/"/g, '');
const currentTargetUrl = (() => {
  switch (HOSPITAL_ID) {
    /** 厚街 */
    case "hj":
      // return "http://120.197.141.41:9091" //厚街正式
      // return "http://120.197.141.41:9094" //东莞正式库的测试
    // return "https://info.cr-health.com:20203" // 公司-厚街测试-外网
    return "http://192.168.1.54:9866" // 公司-厚街测试-内网

    /** 威县 */
    case "weixian":
      // return "http://211.143.127.136:9093" //威县正式
      // return "http://wxzf.hbwxrmyy.com:9093" //威县正式
      return "http://192.168.1.54:9865" // 公司-威县测试-内网

    /** 陵城正式 */
    case "lingcheng":
      return "http://120.224.184.10:9094" // 陵城正式正式   1520   654321
      // return "https://info.cr-health.com:20204" // 公司-陵城测试-外网
      // return "http://192.168.1.54:9867" // 公司-陵城测试-内网
      // return "http://192.168.1.54:9866" // 公司-陵城测试-内网

    /** 花都 */
    case "huadu":
      return "http://120.238.239.27:9094" //花都正式
      // return "https://info.cr-health.com:20206" // 公司-花都测试-外网
      // return "http://192.168.1.54:9868" //公司-花都测试-内网

    /** 贵州医科大正式 */
    case "gy":
      return "http://58.42.249.209:17953" //贵州医科大正式

    /** 聊城 */
    case "liaocheng":
      // return "http://120.224.211.7:9094" //聊城正式
      return "https://info.cr-health.com:20209" // 公司-聊城测试-外网
      // return "http://192.168.1.54:9871" //公司-聊城测试-内网

    /** 江门妇幼 */
    case "fuyou":
      return "http://218.14.180.38:9094" // 江门妇幼正式
      // return "https://info.cr-health.com:20211" // 公司-江门妇幼测试-外网
      // return "http://192.168.1.54:9872" // 公司-江门妇幼测试-内网
      // return "http://192.168.17.215:8080" // 伟彬本地

    /** 中山七 */
    case "zhongshanqi":
      // return "http://119.136.20.125:9094" // 中山七正式
      return "http://192.168.1.54:9873" // 公司-中山七测试-内网

    /** 东莞横沥 */
    case "hengli":
      // return "http://183.63.206.194:9091" // 东莞横沥正式
      return "http://192.168.1.54:9874" // 公司-东莞横沥测试-内网
      // return "http://192.168.20.138:8080" // 伟彬本地

    /** 南方中西医 */
    case "nanfangzhongxiyi":
      // return "http://183.63.206.194:9091" // 南方中西医正式
      // return "http://192.168.1.54:9876" // 公司-南方中西医测试-内网
      return "http://192.168.1.54:9879" // 公司-南方中西医测试-内网(真)

    /** 贵州省人民医院 */
    case "guizhou":
      // return "http://183.63.206.194:9091" // 贵州省人民医院
      return "http://192.168.1.54:9875" // 公司-贵州省人民医院-内网
      // return "http://192.168.20.250:8080" // 彬哥本地
      // return "https://info.cr-health.com:20203" // 公司-贵州省人民医院-外网
      // return "http://192.168.8.204:9091" // 贵州正式
      // return "http://10.207.40.24:9091" // 贵州测试
      // return "http://info.cr-health.com:20111" // 公司-厚街测试-外网

    /** 山南市人民医院 */
    case "shannan":
      // return "http://124.31.235.39:9094 " // 公司-山南市人民医院正式  admin  Bcy@21qw
      return "http://192.168.1.54:9878" // 公司-山南市人民医院测试-内网

    /** 武警广东省总队医院 */
    case "wujing":
      // return "http://120.24.240.231:15091" // 公司-武警广东省总队医院正式
      return "http://192.168.1.54:9866" // 公司-武警广东省总队医院测试-内网

    /** 曲周医院 */
    case 'quzhou':
      // return "http://111.11.95.229:9094" //正式地址 admin Bcy@23nr.
      return "http://192.168.1.54:9879" // 内网测试

    case 'xiegang':
      // return "http://192.168.1.54:9882" // 测试地址-内网地址
      return "http://192.168.20.223:8080" // 初升本地


    // 北海人医
    case 'beihairenyi':
      return "http://219.159.198.37:9094"  // 正式地址 admin Bcy@24nr
      // return "http://192.167.199.190:9091" // 测试地址（暂无数据）
      // return "http://192.168.1.54:9866" // 默认公司本地内网厚街测试环境

    // 佛山市医
     case 'foshanrenyi':
      // return "http://219.159.198.37:9094"  // 正式地址
      return "http://192.168.1.54:9883" // 默认公司本地内网厚街
    // 佛山杏坛
    case 'fsxt':
      // return "http://219.159.198.37:9094"  // 正式地址
      return "http://192.168.1.54:9883" // 默认公司本地内网厚街
    case 'yangchunzhongyi':  //阳春
      return "http://192.168.1.54:9866" // 默认公司本地内网厚街

    /** 默认公司本地内网厚街测试环境 */
    default:
      return "http://192.168.1.54:9866"
  }
})();

module.exports = {
  build: {
    env: prodEnv,
    index: path.resolve(__dirname, "../../index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    // assetsPublicPath: './webpage/dist/',
    assetsPublicPath: "/crNursing/webpage/dist/",
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
    port: 4892,
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
        target: currentTargetUrl,
        changeOrigin: true,
        pathRewrite: {
          // crNursing 东莞厚街护理系统 路径
          "^/crNursing/api": "/crNursing/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      },
      "/crNursing/asset": {
        target: "http://120.25.105.45:9864", //测试
        // target: "http://120.24.240.231:15091", //武警正式
        //target: "http://120.197.141.41:9091",
        changeOrigin: true,
        pathRewrite: {
          "^/crNursing/asset": "/crNursing/asset"
        }
      },
      "/crNursing/asset/deptShareFile": {
        target: "http://120.25.105.45:9864", //测试
        //target: "http://120.197.141.41:9091",
        changeOrigin: true,
        pathRewrite: {
          "^/crNursing/asset/deptShareFile": "/crNursing/asset/deptShareFile"
        }
      },
      "/crNursing/formUrl": {
        // target: "http://120.197.141.41:9091", //东莞
        // target: "http://120.197.141.41:9094", //东莞正式库的测试

        // target: "http://120.25.105.45:9865", //测试
        // target: "http://192.168.1.20:8964", // 内网测试cno
        // target: "http://dev.cr-health.com:4453", // 外网测试
        // target: 'http://192.168.1.88:8062', // 内网兆彬IP测试
        // target: 'http://10.35.9.115:8085', // 厚街内网俊涛ip测试
        // target: "http://192.168.2.229:8084", // 厚街内网俊涛ip测试
        // target: "http://120.197.141.41:9094", //东莞正式库的测试
        // target: "http://192.168.2.144:8062",
        target: "http://localhost:8088", //测试

        changeOrigin: true,
        pathRewrite: {
          // crNursing 东莞厚街护理系统 路径
          "^/crNursing/formUrl": "/crNursing/formUrl" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      },
      "/crNursing/sheet-print": {
        // target: "http://120.197.141.41:9091", //东莞
        // target: "http://120.197.141.41:9094", //东莞正式库的测试

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
      },
      "/stylesheets": {
        target: "http://localhost:3002", //东莞
        // target: "http://120.197.141.41:9094", //东莞正式库的测试

        // target: "http://120.25.105.45:9864", //测试
        // target: "http://192.168.1.20:8964", // 内网测试cno
        // target: "http://dev.cr-health.com:4453", // 外网测试
        // target: 'http://192.168.1.88:8062', // 内网兆彬IP测试
        // target: 'http://10.35.9.115:8085', // 厚街内网俊涛ip测试
        // target: "http://192.168.2.229:8084", // 厚街内网俊涛ip测试

        changeOrigin: true,
        pathRewrite: {
          // crNursing 东莞厚街护理系统 路径
          "^/stylesheets": "/stylesheets" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
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
  //   secure: true
  // }

  //   secure: true
  // }
};