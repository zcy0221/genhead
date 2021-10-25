var fs = require("fs");
var path = require("path");
function fdata(spath) {
    //先判断路径是否存在，且是文件夹还是文件，不存在路径则抛出异常;
    let stat = fs.statSync(spath);
    if (!fs.existsSync(spath)) {
        console.log('该路径不存在！');
    }
    //是文件夹则进入finder（）遍历输出所有文件路径和文件名，
    else if (stat.isDirectory()) {
        let files = finder(spath);
        return files;
    } else{
        return spath;
    }
}
//获取遍历JSON文件路径和文件名
function finder(spath) {
    let join = require("path").join;
    let files = fs.readdirSync(spath);
    let fileList = [];
    for (let i = 0; i < files.length; i++) {
        let fullPath = join(spath, files[i]);
        let stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            let subFiles = finder(fullPath);
            fileList = [...fileList, ...subFiles];
        } else if (stats.isFile()) {
            fileList.push(fullPath)
        }  
    }
    return fileList;
}
module.exports = { fdata };