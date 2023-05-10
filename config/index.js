// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path");
var chalk = require("chalk");
var envAll = require("../config-new/env.all");
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

const HOSPITAL_ID = devEnv.HOSPITAL_ID.replace(/"/g, '');
const currentTargetUrl = (() => {
  switch (HOSPITAL_ID) {
    /** 厚街 */
    case "hj":
      // return "http://120.197.141.41:9091" //厚街正式
      return "http://120.197.141.41:9094" //东莞正式库的测试
    // return "https://info.cr-health.com:20203" // 公司-厚街测试-外网
    // return "http://192.168.1.54:9866" // 公司-厚街测试-内网
      // return "http://192.168.20.83:8080" // 彬哥本地
      // return "http://192.168.3.191:9091"//锦泳本地

    /** 威县 */
    case "weixian":
      // return "http://211.143.127.136:9093" //威县正式
      return "http://wxzf.hbwxrmyy.com:9093" //威县正式 admin  ad123456
      // return "http://192.168.1.54:9865" // 公司-威县测试-内网

    /** 陵城正式 */
    case "lingcheng":
      // return "http://120.224.184.10:9094" // 陵城正式正式   1520   654321
      // return "https://info.cr-health.com:20204" // 公司-陵城测试-外网
      // return "http://192.168.1.54:9867" // 公司-陵城测试-内网
      // return "http://192.168.1.54:9867" // 公司-陵城测试-内网 admin 123456
      return "http://192.168.1.54:9866" // 公司-陵城测试-内网
      // return "http://192.168.20.63:8080" // 初升本地


    /** 花都 */
    case "huadu":
      // return "http://120.238.239.27:9094" //花都正式
      // return "https://info.cr-health.com:20206" // 公司-花都测试-外网
      return "http://192.168.1.54:9883" //公司-花都测试-内网
      // return "http://192.168.20.112:8080" //公司-花都测试-内网

    /** 贵州医科大正式 */
    case "gy":
      return "http://58.42.249.209:17953" //贵州医科大正式

    /** 聊城 */
    case "liaocheng":
      return "http://120.224.211.7:61026" //聊城正式
      // return "https://info.cr-health.com:20209" // 公司-聊城测试-外网
      // return "http://192.168.1.54:9871" //公司-聊城测试-内网
      // return "http://192.168.2.122:8080" // 初升本地
      // return "http://192.168.20.83:8080"  //伟彬本地



    /** 江门妇幼 */
    case "fuyou":
      return "http://218.14.180.38:9094" // 江门妇幼正式
      //     return "https://info.cr-health.com:20211" // 公司-江门妇幼测试-外网
      // return "http://192.168.1.54:9872" // 公司-江门妇幼测试-内网
      // return "http://192.168.3.154:8080" // 本地


    /** 中山七 */
    case "zhongshanqi":
      // return "http://119.136.20.125:9094" // 中山七正式
      return "http://192.168.1.54:9873" // 公司-中山七测试-内网

    /** 东莞横沥 */
    case "hengli":
      // return "http://183.63.206.194:9091" // 东莞横沥正式
      return "http://192.168.1.54:9874" // 公司-东莞横沥测试-内网
      // return "http://192.168.20.138:8080" // 伟彬本地
      // return "http://192.168.20.250:8080" // 初升本地
      // return "http://192.168.20.93:8062"

    /** 南方中西医 */
    case "nanfangzhongxiyi":
      // return "http://218.107.37.134:9091" // 南方中西医正式
      // return "http://192.168.1.54:9876" // 公司-南方中西医测试-内网
      // return "http://192.168.1.54:9879" // 公司-南方中西医测试-内网(真)
      // return 'http://192.168.1.27:9092'  //华渊本地
      // return 'http://192.168.20.62:8080'
          return 'http://192.168.1.54:9901'

    /** 贵州省人民医院 */
    case "guizhou":
      // return "http://183.63.206.194:9091" // 贵州省人民医院
      // return "http://192.168.1.54:9875" // 公司-贵州省人民医院-内网
      // return "https://info.cr-health.com:20203" // 公司-贵州省人民医院-外网
      // return "http://192.168.8.204:9091" // 贵州正式
      // return "http://10.207.40.24:9091" // 贵州测试
      // return "http://info.cr-health.com:20111" // 公司-厚街测试-外网
      // return "http://192.168.1.54:9867"
      return 'http://192.168.3.228:8080'
      // return "http://192.168.3.153:8080"
      // return "http://ydys.gz5055.com:9093" //GZsr@bcy!2021#.
    /** 山南市人民医院 */
    case "shannan":
      // return "http://124.31.235.39:9094 " // 公司-山南市人民医院正式  admin  Bcy@21qw
      return "http://192.168.1.54:9878" // 公司-山南市人民医院测试-内网

    /** 武警广东省总队医院 */
    case "wujing":
      // return 'http://14.18.101.182:9094' // crph3675 crph
      // return "http://120.24.240.231:8751" // 公司-武警广东省总队医院正式,更新了端口
      return "http://192.168.1.54:9869" // 公司-武警广东省总队医院测试-内网
      // return "http://192.168.3.154:8080" // 杨鑫本地
      // return "http://218.13.87.27:9094"
      // return "https://info.cr-health.com:20809" // 公司-武警广东省总队医院正式  crph3675 crph

    /** 曲周医院 */
    case 'quzhou':
      return "http://111.11.95.229:9094" //正式地址 admin Bcy@23nr.
      // return "http://192.168.1.54:9879" // 内网测试

    case 'xiegang':
      return "http://183.234.1.124:9093" // 谢岗正式
      // return "http://192.168.1.54:9882" // 测试地址-内网地址
      // return "http://192.168.20.223:8080" // 初升本地
    // 北海人医
    case 'beihairenyi':
      // return "http://219.159.198.37:9094"  // 正式地址 bhrmyy 123456
      // return "http://192.168.20.45:8080" // 伟彬本地
      return "http://192.168.1.54:9877" // 公司内网测试环境
      // return "http://192.168.1.54:9866" // 默认公司本地内网厚街测试环境

    // 佛山市医
     case 'foshanrenyi':
      // return "https://cr.fsyyy.com:9094"  // 正式外网地址
      // return "http://192.168.20.147:9091"  // 双艳
      // return "http://218.204.204.90:9095" // 默认公司本地内网厚街
      // return "http://192.168.20.102:8080" //宪锋本地地址
      // return "http://192.168.103.16:9091" //
      // return "http://192.168.103.16:9091" //
      // return "http://218.13.87.27:9094" //
      // return "http://192.168.20.136:8080" //测试
      return "http://192.168.1.54:9883" //测试
      // return "http://192.168.3.154:8080" // 本地
      // return "https://info.cr-health.com:20215"

    // 福清妇幼保健院
    case 'fqfybjy':
      return 'http://110.90.211.113:9091/' // 正式
      // return "http://192.168.1.54:9866" // 默认公司本地内网厚街

      // 佛山杏坛
    case 'fsxt':
      // return "http://218.13.87.27:9094"  // 正式地址 admin Bcy@23nr
      return "http://192.168.1.54:9883" // 测试

    //阳春
    case 'yangchunzhongyi':
      return "http://192.168.1.54:9866" // 默认公司本地内网厚街

     //武汉亚心
    case 'whyx':
      return "http://192.168.1.54:9866" // 武汉亚心

    //武汉肺科
    case 'whfk':
      return "http://192.168.1.54:9884" // 测试

    //顺德龙江
    case 'sdlj':
      // return "http://192.168.1.54:9887" // 顺德龙江内网测试
      return "http://218.13.34.230:9094" //正式
      // return "https://cr.fsyyy.com:9094" //佛山人医正式
      // return "http://218.13.87.27:9094"

    // 临邑县人民
    case 'lyxrm':
      // return "http://192.168.1.54:9890" // 内网测试
      // return "http://222.133.53.230:9093" // 临邑正式
      // return "http://222.133.53.230:9091" // 临邑正式
      return "http://120.24.240.231:19097"  // 临邑正式(临邑本地)

    // 烟台玲珑
    case 'ytll':
      // return "http://221.214.210.170:39094"  // 正式
      // return 'http://192.168.1.54:9866'
      return 'http://192.168.1.54:9893' // 烟台玲珑测试环境
      // return "http://218.13.87.27:9094" //


    //珠海中西医
    case 'zhzxy':
      return "http://192.168.1.54:9883" //珠海中西医测试
    // return "http://218.13.87.27:9094"
    //   return "http://183.234.20.149:19094"//正式
      // return "http://192.168.20.20:9092"//正式
      // return "https://info.cr-health.com:20217"

    // 青海五院
    case 'qhwy':
      return 'http://223.220.175.6:50014/'
      // return 'http://192.168.1.54:9883'

    // 临沂沂州
    case 'lyyz':
      return 'http://112.233.241.99:8094' // 外网地址 admin / 123456
      // return 'http://192.168.137.164:8080'
      // return 'http://192.168.1.54:9895'
      // // return "http://192.168.20.81:9091"

    // 广东同江医院
    case 'gdtj':
      return 'http://218.204.204.90:9095' // 正式
      // return 'http://192.168.1.54:9892'

    // 中国人民解放军联勤保障部队第九二五医院
    case '925':
      // return 'http://192.168.1.54:9866'
      // return 'http://218.13.87.27:9094'
      // return 'http://120.24.240.231:19097'
      return 'http://192.168.3.228:8080'
      // return 'http://192.168.3.191:9091'

    //武汉汉口
    case 'whhk':
      return 'http://192.168.1.54:9883'
      // return 'http://119.97.229.206:9094'
      // return 'http://119.97.229.206:9094'
    case 'dglb':
        // return 'http://192.168.3.176:9091'
      // return 'http://192.168.1.54:9866'
          return  'http://219.131.142.78:9094'

    // 威海市立
    case 'whsl':
      // return 'http://192.168.1.54:9866'
      return 'http://120.24.240.231:19097'
      // return 'https://info.cr-health.com:20217'
      // return 'http://221.2.154.22:9094' //威海市立正式环境  admin / Bcy@23nr
      // return 'http://10.108.4.45:9091/' //威海市立正式环境  admin / Bcy@23nr
      // return ' http://221.2.154.22:19094/'
      // return 'http://192.168.1.54:9896'
      // return 'http://192.168.20.20:9092'
    //
    case 'nfyksdyy':
      return 'http://192.168.3.154:8080'
          // return 'http://192.168.1.54:9901'  //
          // return  'http://59.38.110.189:9092'
          // return  'http://192.168.3.228:8080'
    case 'zzwy':
      // return 'http://192.168.1.90:22550'//信铭
      return 'http://192.168.3.187:9091'

    case 'dglb':
      return 'http://192.168.1.54:9866'

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
        // 自动代开浏览器
        autoOpenBrowser: true,
        // 除了 index.html 之外的静态资源要存放的路径，
        assetsSubDirectory: "static",
        // 代表打包后，index.html里面引用资源的的相对地址
        assetsPublicPath: "/",
        // proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false, //是否开启 cssSourceMap默认为false
        proxyTable: {
            "/crNursing/api": {
                target: currentTargetUrl,
                changeOrigin: true,
                pathRewrite: {
                    // crNursing 东莞厚街护理系统 路径
                    "^/crNursing/api": "/crNursing/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
            '/crNursing/caSign': {
                target: 'http://192.168.3.90:30960', //永杰用第三方服务器的地址
                // target: 'http://10.211.55.3:30960',//浚威用第三方服务器的地址
                // target: 'http://192.168.141.219:30960',//湛雪用第三方服务器的地址
                // target: 'http://127.0.0.1:30960',
                // target: 'http://172.20.10.4:30960',
                changeOrigin: true,
                pathRewrite: {
                    '^/crNursing/caSign': ''
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

                target: "http://59.38.110.189:9092", //测试
                // target: "http://192.168.1.20:8964", // 内网测试cno
                // target: "http://dev.cr-health.com:4453", // 外网测试
                // target: 'http://192.168.1.88:8062', // 内网兆彬IP测试
                // target: 'http://10.35.9.115:8085', // 厚街内网俊涛ip测试
                // target: "http://192.168.2.229:8084", // 厚街内网俊涛ip测试

                changeOrigin: false,
                pathRewrite: {
                    // crNursing 东莞厚街护理系统 路径
                    "http://localhost:4892/crNursing/sheet-print": "http://127.0.0.1:5500/dist/nfyk/sheet-print.html" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
            "/crNursing/static": {
                // target: "http://120.197.141.41:9091", //东莞
                // target: "http://120.197.141.41:9094", //东莞正式库的测试

                target: "http://127.0.0.1:5500", //测试
                // target: "http://192.168.1.20:8964", // 内网测试cno
                // target: "http://dev.cr-health.com:4453", // 外网测试
                // target: 'http://192.168.1.88:8062', // 内网兆彬IP测试
                // target: 'http://10.35.9.115:8085', // 厚街内网俊涛ip测试
                // target: "http://192.168.2.229:8084", // 厚街内网俊涛ip测试

                changeOrigin: true,
                pathRewrite: {
                    // crNursing 东莞厚街护理系统 路径
                    "^/crNursing/static": "http://127.0.0.1:5500/dist/nfyk/static" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
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
            },
            // "/hj_ca": {
            //   target: "https://yxq-dghj.linksign.cn", //东莞厚街CA本地对接代理
            //   secure:true,
            //   changeOrigin: true,
            //   pathRewrite: {
            //     // crNursing 东莞厚街护理系统 路径
            //     "^/hj_ca": "" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
            //   }
            // }
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
