"use strict";

var me,
  _ = require("lodash"),
  loader = require("./loader");

me = module.exports = {

  utils: {},

  load: function load (name, callback) {

    if (EW.loader === false) {

      return callback();

    }

    if (!me.utils[name]) {

      return loader.load("app/" + name, callback);

    }

    me.utils[name] = true;
    callback();

  },
  process: function process (name, config) {

    var parent, tokens = name.split(".");

    _.each(tokens, function tokenHandler (token) {

      var holder;

      holder = (parent || window)[token];

      if (!holder) {

        (parent || window)[token] = {};
        parent = (parent || window)[token];

      } else {

        parent = holder;

      }

    });

    _.assign(parent, config);

    if (config.init) {

      config.init();

    }

  }

};
