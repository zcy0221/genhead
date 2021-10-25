var path = require("path");
var fs = require("fs");
function output(cPath, head) {
    mkdirsSync(cPath);
    m = `${cPath}/mm32.h`;
    n = head.toString();
    fs.writeFileSync(m, n);
}

//判断路径，可递归创建目录
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
//终端运行格式
function getPath(String) {
    var process = require("process");
    let args = process.argv.slice(2);//去除前两个参数，node xxx.js
    if (args.length === 0) {
        return "格式错误";
    }
    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            if (args[i].startsWith(String)) {//检测字符串是否以指定的前缀开始
                return args[i + 1]
            }
        }
    }
}
module.exports = { output, getPath };