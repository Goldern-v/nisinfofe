var path, node_ssh, ssh, fs, folderSrc, localSrc;

var log = console.log;

let sshUpload = (
  hospitalName = "东莞市厚街医院",
  localSrc = "./dist",
  folderSrc = "/crdata/webProject/nursingInfoSystem/dongguanhoujie/"
) => {
  fs = require("fs");
  path = require("path");
  var chalk = require("chalk");
  var ora = require("ora");
  node_ssh = require("node-ssh");
  ssh = new node_ssh();

  let hospitalList = {
    东莞市厚街医院: "dongguanhoujie",
    威县人民医院: "weixian",
    德州市陵城区人民医院: "lingcheng",
    花都武警医院: "huaduwujing",
    广州市花都区人民医院: "huadu",
    武警广东省总队医院: "wujing",
    江门市妇幼保健院: "fuyou",
    聊城市第二人民医院: "liaocheng",
    贵州省人民医院: "guizhou",
    中山七院: "zhongshanqiyuan",
  };
  let hospitalEN = "dongguanhoujie";
  if (hospitalList[hospitalName]) {
    hospitalEN = hospitalList[hospitalName];
    folderSrc = `/crdata/webProject/nursingInfoSystem/${hospitalEN}/`;
  }
  if (["/", "", "\\", undefined, null].indexOf(folderSrc) > -1) {
    folderSrc = `/crdata/webProject/nursingInfoSystem/${hospitalEN}/`;
  }
  // localSrc = './build'

  // let serverInfo = {
  //   host: "120.25.105.45",
  //   port: "50289",
  //   username: "root",
  //   privateKey: path.resolve(__dirname, "./keys/cr_web_rsa") //fs.readFileSync('keys/cr_web_rsa')
  // };
  let serverInfo = {
    host: "192.168.1.54",
    port: "22",
    username: "root",
    privateKey: path.resolve(__dirname, "./keys/id_rsa") //fs.readFileSync('keys/cr_web_rsa')
  };

  var spinner = ora(`正在同步上传至${serverInfo.host}服务器...`);

  log(chalk.yellow("   部署至服务器中...", serverInfo.host));
  spinner.start();

  let rsyncopy = () => {
    // Putting entire directories
    const failed = [];
    const successful = [];
    ssh
      .putDirectory(localSrc, folderSrc, {
        recursive: true,
        concurrency: 1,
        // validate: function (itemPath) {
        //   // const baseName = path.basename(itemPath)
        //   return true
        //   // return baseName.substr(0, 1) !== '.' && // do not allow dot files
        //   //   baseName !== 'node_modules' // do not allow node_modules
        // },
        tick: function (localPath, remotePath, error) {
          if (error) {
            failed.push(localPath);
          } else {
            // __dirname
            let p =
              "--> ." + localPath.replace(path.resolve(__dirname, "../"), "");
            successful.push(p);
          }
        }
      })
      .then(function (status) {
        spinner.stop();
        if (status) {
          log(
            chalk.green("\n目录传输状态:"),
            status ? chalk.bgGreen.black("成功") : chalk.bgRed.black("未成功")
          );
        } else {
          log(
            chalk.green("\n目录传输状态:"),
            status ? chalk.bgGreen.black("成功") : chalk.bgRed.black("未成功")
          );
        }
        if (failed && failed.length > 0) {
          log(
            chalk.bgRed.black("传输失败文件:("),
            chalk.red(failed.length, ")", failed.join("\n"))
          );
        }

        log(
          chalk.bgGreen.black("已完成传输文件"),
          chalk.green("(", successful.length, ")\n", successful.join("\n"))
        );
        log(chalk.bgYellowBright.black("  已部署至服务器  ", serverInfo.host));
        ssh.dispose();
        // process.exit()
      });
  };

  ssh.connect(serverInfo).then(function () {
    //
    ssh
      .execCommand(`rm -rfv "${folderSrc}"`, {
        // ssh.execCommand(`ls -hasg "${folderSrc}" && pwd`, {
        cwd: folderSrc,
        onStdout(chunk) {
          log(chalk.bgRed.black("\n   清空服务端旧文件夹"));
          log(chalk.red(chunk.toString("utf8")));
          // spinner.stop()
          // ssh.dispose()
        },
        onStderr(chunk) {
          // log('stderrChunk', chunk.toString('utf8'))
          // spinner.stop()
          // ssh.dispose()
        }
      })
      .then(() => {
        rsyncopy();
      });
  });

  // ssh.disconnect().then(function () {
  //   log('关闭ssh连接')
  // })
};

module.exports = {
  sshUpload
};
