"use strict";
var me,
  loader = require("./loader");
me = module.exports = {
  utils: {},
  load: function (name, callback) {
    if (EW.loader === false) {return callback(); }
    if (!me.utils[name]) {
      return loader.load("app/" + name, callback);
    }
    me.utils[name] = true;
    callback();
  },
  process: function (name, config) {
    var parent, tokens = name.split(".");
    _.each(tokens, function (token) {
      var holder;
      console.log(token);
      holder = (parent || window)[token];
      if (!holder) {
        (parent || window)[token] = {};
        parent = (parent || window)[token];
      } else {
        parent = holder;
      }
    });
    _.assign(parent, config);
    if (config.init) {config.init(); }
  }
};