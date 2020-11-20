var path, node_ssh, ssh, fs, folderSrc;

fs = require("fs");
path = require("path");
node_ssh = require("node-ssh");
ssh = new node_ssh();
//上传至厚街9866的端口
folderSrc = "/crdata/webProject/nursingInfoSystem/dongguanhoujie";
//上传至花都武警9868的端口
//folderSrc = "/crdata/webProject/nursingInfoSystem/huaduwujing";

ssh
  .connect({
    host: "120.25.105.45",
    port: "50289",
    username: "root",
    privateKey: "keys/cr_web_rsa" //fs.readFileSync('keys/cr_web_rsa')
  })

  // ssh.connect({
  //     host: 'localhost',
  //     username: 'steel',
  //     privateKey: '/home/steel/.ssh/id_rsa'
  //   })
  /*
 Or
 ssh.connect({
   host: 'localhost',
   username: 'steel',
   privateKey: fs.readFileSync('/home/steel/.ssh/id_rsa')
 })
 if you want to use the raw string as private key
 */
  .then(function() {
    //   // Local, Remote
    //   ssh.putFile('/home/steel/Lab/localPath', '/home/steel/Lab/remotePath').then(function () {
    //     console.log("The File thing is done")
    //   }, function (error) {
    //     console.log("Something's wrong")
    //     console.log(error)
    //   })
    //   // Array<Shape('local' => string, 'remote' => string)>
    //   ssh.putFiles([{
    //     local: '/home/steel/Lab/localPath',
    //     remote: '/home/steel/Lab/remotePath'
    //   }]).then(function () {
    //     console.log("The File thing is done")
    //   }, function (error) {
    //     console.log("Something's wrong")
    //     console.log(error)
    //   })
    //   // Local, Remote
    // ssh.getFile('/Users/wei/Desktop/keys/1', '/home/crNursing-9401-show/webapps/crNursing/manage').then(function (Contents) {
    //   console.log("The File's contents were successfully downloaded")
    // }, function (error) {
    //   console.log("Something's wrong")
    //   console.log(error)
    // })

    // Command
    // ssh.exec('echo try typing something;', 'root').then(function (result) {
    //   console.log('STDOUT: ' + result.stdout)
    //   console.log('STDERR: ' + result.stderr)
    // })

    ssh.execCommand("rm -rf *", {
      cwd: folderSrc,
      onStdout(chunk) {
        console.log("stdoutChunk", chunk.toString("utf8"));
      },
      onStderr(chunk) {
        // console.log('stderrChunk', chunk.toString('utf8'))
      }
    });

    // Putting entire directories
    const failed = [];
    const successful = [];
    ssh
      .putDirectory("./build", folderSrc, {
        recursive: true,
        concurrency: 10,
        validate: function(itemPath) {
          const baseName = path.basename(itemPath);
          return (
            baseName.substr(0, 1) !== "." && baseName !== "node_modules" // do not allow dot files
          ); // do not allow node_modules
        },
        tick: function(localPath, remotePath, error) {
          if (error) {
            failed.push(localPath);
          } else {
            successful.push(localPath);
          }
        }
      })
      .then(function(status) {
        console.log("目录传输状态", status ? "成功" : "未成功");
        console.log("传输失败", failed.join(", "));
        console.log("完成传输", successful.join(", "));
        ssh.dispose();
        // process.exit()
      });

    // Command
    // ssh.execCommand('ll', {
    //   cwd: '/home/crNursing-9401-show/webapps/crNursing/manage'
    // }).then(function (result) {
    //   console.log('STDOUT: ' + result.stdout)
    //   console.log('STDERR: ' + result.stderr)
    // })

    // Command with escaped params
    // ssh.exec('hh_client', ['--json'], {
    //   cwd: '/var/www',
    //   stream: 'stdout',
    //   options: {
    //     pty: true
    //   }
    // }).then(function (result) {
    //   console.log('STDOUT: ' + result)
    // })

    // With streaming stdout/stderr callbacks
    // ssh.exec('hh_client', ['--json'], {
    //   cwd: '/var/www',
    //   onStdout(chunk) {
    //     console.log('stdoutChunk', chunk.toString('utf8'))
    //   },
    //   onStderr(chunk) {
    //     console.log('stderrChunk', chunk.toString('utf8'))
    //   },
    // })
  });

// ssh.disconnect().then(function () {
//   console.log('关闭ssh连接')
// })
