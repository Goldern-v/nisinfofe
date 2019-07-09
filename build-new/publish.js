var path, node_ssh, ssh, fs, folderSrc, localSrc

let sshUpload = (localSrc = './dist', folderSrc = '/crdata/webProject/nursingInfoSystem') => {
  fs = require('fs')
  path = require('path')
  var chalk = require("chalk");
  var ora = require("ora");
  node_ssh = require('node-ssh')
  ssh = new node_ssh()
  // folderSrc = '/crdata/webProject/nursingInfoSystem'
  // localSrc = './build'

  let serverInfo = {
    host: '120.25.105.45',
    port: '50022',
    username: 'root',
    privateKey: path.resolve(__dirname, "./keys/cr_web_rsa") //fs.readFileSync('keys/cr_web_rsa')
  }


  var spinner = ora(`正在同步上传至${serverInfo.host}服务器...`);

  console.log(chalk.yellow('----项目上传至服务器----',serverInfo.host,serverInfo.port));
  spinner.start()

  let rsyncopy = () => {
    // Putting entire directories
    const failed = []
    const successful = []
    ssh.putDirectory(localSrc, folderSrc, {
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
          failed.push(localPath)
        } else {
          successful.push(localPath)
        }
      }
    }).then(function (status) {
      if(status){
        console.log(chalk.green('目录传输状态:', status ? '成功' : '未成功'))
      }else{
        console.log(chalk.red('目录传输状态:', status ? '成功' : '未成功'))
      }
      if(failed && failed.length>0){
        console.log(chalk.red('传输失败文件:(',failed.length,')', failed.join('\n')))
      }
      // console.log(chalk.green('完成传输文件:(',successful.length,')', successful.join('\n')))
      console.log(chalk.yellow('----完成文件上传至服务器----',serverInfo.host,serverInfo.port));
      ssh.dispose()
      spinner.stop()
      // process.exit()
    })
  }



  ssh.connect({
    host: '120.25.105.45',
    port: '50022',
    username: 'root',
    privateKey: path.resolve(__dirname, "./keys/cr_web_rsa")//'keys/cr_web_rsa' //fs.readFileSync('keys/cr_web_rsa')
  })
    .then(function () {
      //
      ssh.execCommand('rm -rf *', {
        cwd: folderSrc,
        onStdout(chunk) {
          console.log('stdoutChunk', chunk.toString('utf8'))
        },
        onStderr(chunk) {
          // console.log('stderrChunk', chunk.toString('utf8'))
        },
      })


    }).then(()=>{
      rsyncopy()
    })

  // ssh.disconnect().then(function () {
  //   console.log('关闭ssh连接')
  // })

}




module.exports = {
  sshUpload
}
