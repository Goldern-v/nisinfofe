var utils = require("./utils");
var webpack = require("webpack");
var config = require("../config");
var merge = require("webpack-merge");
var baseWebpackConfig = require("./webpack.base.conf");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
var moment = require("moment");
var fs = require("fs");
var versionInfo = require("../version.json");
versionInfo["最近打包时间"] = moment().format("YYYY-MM-DD HH:mm");
versionInfo["版本号"] = moment().format("YYYY.MM.DD");
versionInfo["proxyTable"] = config.dev.proxyTable || "";
// console.log("versionInfo", JSON.stringify(versionInfo, null, 4));
fs.writeFile(
  "./src/version.json",
  JSON.stringify(versionInfo, null, 4),
  "utf8",
  function(err) {
    if (err) {
      return console.error(err);
    }
    console.log("File created!");
  }
);

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ["./build/dev-client"].concat(
    baseWebpackConfig.entry[name]
  );
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: "#cheap-module-eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ].concat(utils.htmlPlugin())
});
