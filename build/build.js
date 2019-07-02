require("./check-versions")();

process.env.NODE_ENV = "production";

var ora = require("ora");
var rm = require("rimraf");
var path = require("path");
var chalk = require("chalk");
var webpack = require("webpack");
var config = require("../config");
var webpackConfig = require("./webpack.prod.conf");
var moment = require("moment");
var fs = require("fs");
var versionInfo = require("../version.json");
versionInfo["医院名"] = config.build.env.HOSPITAL_NAME;
versionInfo["最近打包时间"] = moment().format("YYYY-MM-DD HH:mm");
versionInfo["版本号"] = moment().format("YYYY.MM.DD");
versionInfo["proxyTable"] = config.dev.proxyTable || "";
// console.log("versionInfo", JSON.stringify(versionInfo, null, 4));
// console.log("config", JSON.stringify(config.dev.proxyTable, null, 4));
// .config["/crNursing/api"].target
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

var spinner = ora("building for production...");
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, function(err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );

    if (stats.hasErrors()) {
      console.log(chalk.red("  Build failed with errors.\n"));
      process.exit(1);
    }

    console.log(chalk.cyan("  Build complete.\n"));
    console.log(
      chalk.yellow(
        "  Tip: built files are meant to be served over an HTTP server.\n" +
          "  Opening index.html over file:// won't work.\n"
      )
    );
  });
});
