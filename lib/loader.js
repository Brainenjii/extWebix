"use strict";
var me;
me = module.exports = {
  load: function (path, callback) {
    var script = document.createElement("script");
    script.src = path + ".js";
    script.onload = callback;
    document.head.appendChild(script);
  }
};