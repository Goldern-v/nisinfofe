var path = require("path");
var config = require("../config");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var moment = require("moment");
var config = require("../config");
var hospitalName = config.build.env.HOSPITAL_NAME;
hospitalName = hospitalName.replace(/["']/g, "");
var buildFileName = `${hospitalName}`;

exports.assetsPath = function(_path) {
  var assetsSubDirectory =
    process.env.NODE_ENV === "production"
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function(options) {
  options = options || {};

  var cssLoader = {
    loader: "css-loader",
    options: {
      minimize: process.env.NODE_ENV === "production",
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: "vue-style-loader"
      });
    } else {
      return ["vue-style-loader"].concat(loaders);
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus")
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = [];
  var loaders = exports.cssLoaders(options);
  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: loader
    });
  }
  return output;
};

/* 这里是添加的部分 ---------------------------- 开始 */

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
var glob = require("glob");
// 页面模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, "../src/pages");
var INDEX_PATH = path.resolve(__dirname, "../src/index.js").replace(/\\/g, "/");
// 用于做相应的merge处理
var merge = require("webpack-merge");

//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
  var entryFiles = [INDEX_PATH, ...glob.sync(PAGE_PATH + "/*/*.js")];
  var map = {};
  entryFiles.forEach(filePath => {
    var filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );
    map[filename] = filePath;
  });
  return map;
};

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
  var INDEX_HTML = path.resolve(__dirname, "../index.html").replace(/\\/g, "/");
  let entryHtml = [INDEX_HTML, ...glob.sync(PAGE_PATH + "/*/*.html")];
  let arr = [];
  entryHtml.forEach(filePath => {
    let filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename:
        process.env.NODE_ENV === "production"
          ? `../release/${buildFileName}/` + filename + ".html"
          : filename + ".html",
      // filename: process.env.NODE_ENV === 'production' ? ('../../' + filename + '.html') : filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ["manifest", "vendor", filename],
      inject: true
    };
    if (process.env.NODE_ENV === "production") {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: "dependency"
      });
    }
    arr.push(new HtmlWebpackPlugin(conf));
  });
  return arr;
};
/* 这里是添加的部分 ---------------------------- 结束 */
