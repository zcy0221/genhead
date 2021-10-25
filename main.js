let { fdata } = require('./input');
let {data}=require('./head');
let { getPath, output } = require('./output');

let filePath = getPath("-i");
let dir = fdata(filePath);
let head=data(dir);
output(getPath("-o"),head);
