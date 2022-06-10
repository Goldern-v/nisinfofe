var fs = require('fs');
var path = require('path');
var chalk = require("chalk");
var compressing = require('compressing');
// var archiver = require('archiver');
// var unzip = require("unzip");

var publish = require("./publish.js");

var moment = require("moment");
var config = require("../config-new");
var hospitalName = config.build.env.HOSPITAL_NAME
hospitalName = hospitalName.replace(/["']/g, '')
var buildFileName = `${hospitalName}`
// var buildFileName = `${hospitalName}${moment().format("YYYY-MM-DD_HH_mm")}`

// 复制文件
// let copyFile = (src, dist) => {
//     fs.createReadStream(src).pipe(fs.createWriteStream(dist));
// }

let getFileSizeWithUnit = (size) => {
    let result = ''
    if (typeof (size) === 'number') {
        let unit = [
            { name: ' B', value: Math.pow(10, 0) },
            { name: ' KB', value: Math.pow(10, 3) },
            { name: ' MB', value: Math.pow(10, 6) },
            { name: ' GB', value: Math.pow(10, 9) },
            { name: ' TB', value: Math.pow(10, 12) },
        ]
        unit.filter((u, i) => {
            let s = Math.floor(size / u.value)
            let n = (size / u.value).toFixed(2)
            if (s < 1000 && s > 0) {
                result = n + u.name
                return u.name
            }
        })
        return result || size
    }
    return size
}

// 压缩文件夹
let zipFolder = (filename, path) => {
    compressing.zip.compressDir(path, filename)
        .then(() => {
            fs.stat(filename, function (err, stats) {
                console.log(chalk.yellow('>已生成: ' + filename, getFileSizeWithUnit(stats.size)));
            })
            console.log(chalk.green('----success----'));
        })
        .catch(err => {
            console.error(err);
        });
}

// 解压缩
// let unZip = (filename, src='unarchive') => {
//     fs.createReadStream(filename+'.zip').pipe(unzip.Extract({ path: src }));
// }

var copyFile = function (srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })

    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
    ws.on('close', function (ex) {
        cb && cb(ex)
    })

    rs.pipe(ws)
}


/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
var copyDir = function (srcDir, tarDir, cb) {
    try { fs.mkdirSync(`${tarDir}`) } catch (err) { }
    fs.readdir(srcDir, function (err, files) {
        var count = 0
        var checkEnd = function () {
            ++count == files.length && cb && cb()
        }

        if (err) {
            // console.log('checkEnd:', err)
            checkEnd()
            return
        }

        files.forEach(function (file) {
            var srcPath = path.join(srcDir, file)
            var tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function (err, stats) {
                if (stats.isDirectory()) {
                    // console.log('mkdir', tarPath)
                    fs.mkdir(tarPath, function (err) {
                        if (err) {
                            fs.mkdirSync(tarPath);
                            // console.log('mkdir', err)
                            return
                        }
                        copyDir(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })

        //为空时直接回调
        files.length === 0 && cb && cb()
    })
}

let cmd_cp = (src, dist) => {
    var child_process = require('child_process');
    // function copyDir(src, dist) {
    // linux
    child_process.spawn('cp', ['-r', src, dist]);
    // }
}


let start = async () => {
    try { fs.mkdirSync(`./release/${buildFileName}`) } catch (err) { }
    try { fs.mkdirSync(`./release/${buildFileName}/webpage`) } catch (err) { }
    // 复制../dist目录到../release/dist
    console.log(chalk.green('---------------'));
    console.log(chalk.blue(`>复制: ./dist目录 到 ./release/${buildFileName}/webpage/dist`))
    // cmd_cp('./dist', `./release/${buildFileName}/dist`)
    copyDir('./dist', `./release/${buildFileName}/dist`, function (err) {
        if (err) { console.log(err); }
        zip()
    })
}

let upload = () => {
    let url = path.resolve(__dirname, `../dist/${buildFileName}`)
    publish.sshUpload(hospitalName, url)
}

let zip = () => {
    // 压缩打包zip
    // zipFolder(`./release/${buildFileName}${moment().format("YYYY-MM-DD_HH_mm")}.zip`, `./release/${buildFileName}`)
    zipFolder(`./publish/${buildFileName}${moment().format("YYYY-MM-DD_HH_mm")}.zip`, `./dist/${buildFileName}`)
    zipFolder(`./dist/${buildFileName}${moment().format("YYYY-MM-DD_HH_mm")}.zip`, `./dist/${buildFileName}`)
}

let deleteall = (path) => {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

let initial = () => {
    try { deleteall('./release') } catch (err) { console.log(err) }
    try { fs.mkdirSync('./release') } catch (err) { }
    try { deleteall('./dist') } catch (err) { console.log(err) }
    try { fs.mkdirSync('./dist') } catch (err) { }
    try { fs.mkdirSync(`./dist/${hospitalName}`) } catch (err) { }
    try { var createStream = fs.createWriteStream(`./dist/${hospitalName}/${hospitalName}.百辰源护理系统.${moment().format("YYYY-MM-DD_HH_mm")}`); createStream.end(); } catch (err) { }
    // try { deleteall('./dist/'+hospitalName) } catch (err) { console.log(err) }
    // try { fs.mkdirSync('./dist/'+hospitalName) } catch (err) { }
}

module.exports = {
    initial,
    start,
    copyFile,
    copyDir,
    zipFolder,
    zip,
    upload,
    // unZip
}


