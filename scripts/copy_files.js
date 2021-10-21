/**
 * 将build中的文件拷贝到app目录
 */
var path = require("path");
var fu = require("file-utils");

var build = path.resolve(__dirname, "../build");
var app = path.resolve(__dirname, "../app");

fu.recurse(build, function(p, r, s, n) {
  p = path.resolve(p, ".");
  var dest = path.join(app, p.replace(build, ""));
  fu.copy(p, dest);
});

var main = path.resolve(__dirname, "../main.js");
var appmain = path.resolve(__dirname, "../app/main.js");
fu.copy(main, appmain, { encoding: "utf-8" });
