function data(dir) {
    var fs = require("fs");
    var path = require("path");
    var headInfo = [];//存储头文件信息
    let head = ``;//头文件信息存储
    
    dir.forEach(function (fileName) {
        let sum = 0;
        var fDir = path.dirname(fileName);//fileName路径名,fDir父目录名，nDir文件所在文件夹名
        var nDir = path.basename(fDir);
        var temp = path.basename(fileName, '.json');
        if(temp.indexOf(".")==1){
            var regName = temp.split('.')[1];//1.xxx
        }else if(temp.indexOf("_")==3){
            var regName = temp.split('_')[2];//xxx_1_XX
        }else{
            var regName = temp;//xxx.
        }
        let data = JSON.parse(fs.readFileSync(fileName));
        reg = data.reg;
        IPName = nDir;
        RegisterName = regName;
        for (m = 0; m < reg.length; m++) {
            bitMask10 = reg[m].bits;
            bitTran = Math.pow(2, bitMask10) - 1;
            bitMask16 = bitTran.toString(16);
            bitName = reg[m].name;
            sum += bitMask10;
            bitPosition = sum - bitMask10;
            if (reg[m].name != "RES"&&reg[m].name != "RES.") {
                head += `//////////@brief ${RegisterName}_${bitName} Register Defintion\n`;
                var head1 = `#define ${IPName}_${RegisterName}_${bitName}_Pos`;
                head1 = head1.padEnd(50, " ");//字符串不够指定长度，会在尾部补全
                var head2 = `(${bitPosition})\n`;
                var head3 = `#define ${IPName}_${RegisterName}_${bitName}`;
                head3 = head3.padEnd(50, " ");
                var head4 = `(0x${bitMask16}U << ${IPName}_${RegisterName}_${bitName}_Pos)\n\n`;
                head += head1 + head2 + head3 + head4;
            }
        }
        
    });
    headInfo.push(head)
    return headInfo;
}
module.exports = { data };
