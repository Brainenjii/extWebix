"use strict";

var me,
  _ = require("lodash"),
  async = require("async"),
  viewMgr = require("./view"),
  loader = require("./loader");

me = module.exports = {
  controllers: {},
  aliases: {},
  load: function load (name, callback) {

    if (EW.loader === false) {

      return callback();

    }

    if (!me.controllers[name]) {

      return loader.load("app/controller/" + name, callback);

    }

    me.controllers[name] = true;
    callback();

  },

  process: function process (name, controller) {

    me.controllers[name] = controller;

    if (EW.loader === false) {

      return _.extend(me.aliases, controller.init());

    }

    async.each(controller.views, function viewHandler (view, callback) {

      viewMgr.load(view, callback);

    }, function controllersHandler () {

      _.extend(me.aliases, controller.init());

    });

  },

  assignEvents: function assignEvents (alias, view) {

    var selectorsConfig = me.aliases[alias];

    if (!selectorsConfig) {

      return;

    }

    _.each(selectorsConfig, function eventHandler (eventsConfig, selector) {

      switch (typeof eventsConfig) {
      case "function":
        view.attachEvent(selector, eventsConfig);
        break;
      case "object":
        _.each(eventsConfig, function eventHandler (handler, event) {

          var element = $$(view.config.id + selector);

          if (element) {

            element.attachEvent(event, handler);

          }

        });
        break;
      default:
      }

    });

  }

};
