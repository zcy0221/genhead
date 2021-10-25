let { fdata } = require('./input');
let {data}=require('./head');
let { getPath, output } = require('./output');

let filePath = getPath("-i");
let dir = fdata(filePath);
let head=data(dir);
let {nFile1}=require('./head')
var set = new Set(nFile1);
var files = [...set];
output(getPath("-o"), head, files);
