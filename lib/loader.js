"use strict";

module.exports = {

  load: function load (path, callback) {

    var script = document.createElement("script");

    script.src = path + ".js";
    script.onload = callback;
    document.head.appendChild(script);

  }

};
