require("./check-versions")();

process.env.NODE_ENV = "production";

var ora = require("ora");
var rm = require("rimraf");
var path = require("path");
var chalk = require("chalk");
var webpack = require("webpack");
var config = require("../config-new");
var webpackConfig = require("./webpack.prod.conf");
var moment = require("moment");
var fs = require("fs");
var versionInfo = require("./version.js");
var copyFolder = require("./copyFolder.js");
var spinner = ora("building for production...");


// return;
// copyFolder.upload();

// 初始化创建文件夹
copyFolder.initial();
// copyFolder.start()

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
        // console.log(
        //   chalk.yellow(
        //     "  Tip: built files are meant to be served over an HTTP server.\n" +
        //       "  Opening index.html over file:// won't work.\n"
        //   )
        // );
        // 复制 ./dist目录 到 ./release/dist
        copyFolder.zip();
        // copyFolder.upload();
        //
    });
});