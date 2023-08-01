const fs = require('browserify-fs');

export const readTxt = ()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('./sheetPrintPage/modal.txt', 'utf-8', function (err, data) {
            if (err) {
                console.error(err);
            } else {
                resolve(data)
            }
        });
    })
}
const writeTxt = (content,resolve)=>{
    fs.writeFile('./sheetPrintPage/modal.txt', content, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("新文件已成功创建！");
        }
        resolve(true)
        console.log("文件写入成功");
    })
}
export const saveModal = (content)=>{
    return new Promise((resolve,reject)=>{
        fs.readdir("./sheetPrintPage", function (err, files) {
            if (err) {
                fs.mkdir("/sheetPrintPage/", function (err) {
                    // if (err) {
                    //     return console.error(err);
                    // }
                    console.log("目录创建成功。");
                    writeTxt(content,resolve)
                });
                console.error(err);
            } else {
                console.log("目录存在");
                writeTxt(content,resolve)
            }
        });
    })
}