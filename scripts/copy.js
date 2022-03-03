/**
 * 将build中的文件拷贝到 目标dist目录
 */
var path = require("path");
var fs = require("fs");
/**
 * 安装文件操作相关工具库
 * npm install --save-dev fs-extra 
 */
 var fsExtra = require("fs-extra");

 //当前 所在 目录 为 script 目录
 //打包目录
var build = path.resolve(__dirname, "../build");
 //需要拷贝到的目标目录   这里需要你改一下！！
var dist = path.resolve(__dirname, "../../dist");

//清除 dist 之前打包的文件
fsExtra.emptydirSync(dist);

//使用fs-extra 复制文件夹目录
fsExtra.copy(build,dist , function (err) {
   if (err) return console.error(err) 
   console.log('copy success!')
}) 



