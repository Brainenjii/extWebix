"use strict";
var me,
  loader = require("./loader"),
  viewMgr = require("./view");
me = module.exports = {
  controllers: {},
  aliases: {},
  load: function (name, callback) {
    if (!me.controllers[name]) {
      return loader.load("app/controller/" + name, callback);
    }
    me.controllers[name] = true;
    callback();
  },
  process: function (name, controller) {
    me.controllers[name] = controller;
    async.each(controller.views, function (view, callback) {
      viewMgr.load(view, callback);
    }, function () {
      _.extend(me.aliases, controller.init());
    });
  },
  assignEvents: function (alias, view) {
    var selectorsConfig = me.aliases[alias];
    if (!selectorsConfig) {return; }
    _.each(selectorsConfig, function (eventsConfig, selector) {
      _.each(eventsConfig, function (handler, event) {
        var element = $$(view.config.id + selector);
        if (element) {element.attachEvent(event, handler); }
      });
    });
  }
};