function data(dir) {
    var fs = require("fs");
    var path = require("path");
    var rName = []//获取文件夹下所有内寄存器名字
    var jInfo = [];//获取所有内寄存器的json信息
    var nFile = [];//获取所有当前文件夹，外寄存器名
    var nFile1=[];
    var headInfo = [];//存储头文件信息
    let head = ``;//头文件信息存储
    let maskTra=["0x00","0x01","0x03","0x07","0x0f","0x1f","0x3f","0x7f","0xff","0x01ff","0x03ff","0x07ff","0x0fff","0x1fff","0x3fff","0x7fff","0xffff"];

    dir.forEach(function (fileName) {
        var fDir = path.dirname(fileName);
        var nDir = path.basename(fDir);
        nFile1.push(nDir);
    });
    module.exports = { nFile1 };

    let dir1=transfer(nFile1,dir);//处理一下路径方便下面判断

    dir1.forEach(function (fileName) {
        var fDir = path.dirname(fileName);//fileName路径名,fDir父目录名，nDir文件所在文件夹名
        var nDir = path.basename(fDir);
        var temp1 = path.basename(fileName, '.json');
        var temp2 = path.extname(temp1);
        var regName = temp2.split('.')[1];//最后得到的regName是内寄存器名
        let data = JSON.parse(fs.readFileSync(fileName));
        reg = data.reg;
        jInfo.push(reg);//里寄存器的json信息存在一起
        rName.push(regName); 
        nFile.push(nDir);//从nFile开始循环，如果 nFile[i]!=nFile[i+1]，就开启另一个头文件内容生成循环；所有jInfo存取json信息从nFile转折的“i”开始读起，生成语句并读进headInfo
    });

    for (i = 0; i < nFile.length; i++) {
        let temp = [];
        let sum = 0;
        if (nFile[i] != nFile[i + 1]) {//该循环用于区分不同寄存器，I2C，SPI等
            temp.push(head);
            headInfo.push(temp);
            head = ``;
        }
        else {
            IPName = nFile[i];
            RegisterName = rName[i];
            for (m = 0; m < jInfo[i].length; m++) {
                bitMask10 = jInfo[i][m].bits;
                bitMask16=maskTra[bitMask10];
                console.log(bitMask10);
                console.log(bitMask16);
                bitName = jInfo[i][m].name;
                sum += bitMask10;
                bitPosition = sum - bitMask10;
                if (jInfo[i][m].name != "RES") {
                    head +=`//////////@brief ${RegisterName}_${bitName} Register Defintion\n`;
                    var head1 = `#define ${IPName}_${RegisterName}_${bitName}_Pos`;
                        head1 = head1.padEnd(50," ");//字符串不够指定长度，会在尾部补全
                    var head2 =`(${bitPosition}U)\n`;
                    var head3 = `#define ${IPName}_${RegisterName}_${bitName}`;
                        head3 = head3.padEnd(50," ");
                    var head4 =`(${bitMask16}U << ${IPName}_${RegisterName}_${bitName}_Pos)\n\n`;
                    head +=head1+head2+head3+head4;
                }
            }
        }
    }
    return headInfo;

    function transfer(file1,file3) {//file1应该对应nFile文件夹名字,file3应该是所有文件的路径
        let long = [];
        let file2=[];//file2应该存取需要加入目录的最后一个数据
        for (i = 0; i < file1.length - 1; i++) {
            if (file1[i] != file1[i + 1]) {
                long.push(i);
            }
        }
        long.push(file1.length - 1)
        for (q = 0; q < long.length; q++) {
            file2.push(file3[long[q]]);
        }
        for (m = 0; m < long.length && m < long.length; m++) {
            file3.splice(long[m] + m + 1, 0, `${file2[m]}`);
        }
        return file3;
    }
}
    module.exports = { data };
