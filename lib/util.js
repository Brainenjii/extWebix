"use strict";

var me,
  EW,
  _ = require("lodash"),
  loader = require("./loader");

me = module.exports = {

  utils: {},

  init: function init (request) {

    EW = request.EW;

  },
  load: function load (name, callback) {

    if (EW.skipLoading) {

      return callback();

    }

    if (!me.utils[name]) {

      return loader.load("app/" + name, callback);

    }

    me.utils[name] = true;
    return callback();

  },
  process: function process (name, config) {

    var parent = {}, tokens = name.split(".");

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
