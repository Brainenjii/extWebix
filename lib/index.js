"use strict";
var me,
  controllerMgr = require("./controller"),
  viewMgr = require("./view"),
  utilMgr = require("./util");
me = module.exports = {
  widgets: {},
  controllers: [],
  define: function (name, config) {
    viewMgr.process(name, config);
  },
  defineController: function (name, config) {
    controllerMgr.process(name, config);
  },
  defineUtil: function (name, config) {
    utilMgr.process(name, config);
  },
  widget: function (xtype, config) {
    return viewMgr.build(xtype, config);
  },
  find: function (widget, selector) {
    return $$(widget.getTopParentView().config.id + selector);
  },
  application: function (config) {
    config = config || {};
    if (!window[config.name]) {
      window[config.name] = {};
    }

    if (config.loader === false) {
      EW.skipLoading = true;
    }
    async.each(config.requires || [], function (require, callback) {
      utilMgr.load(require, callback);
    }, function () {
      async.each(config.controllers || [], function (controller, callback) {
        controllerMgr.load(controller, callback);
      }, function () {
        webix.ready(function () {
          var viewport;
          if (config.autoViewport) {
            viewport = me.widget("mainViewport");
          }
          if (config.launch) {config.launch(viewport); }
        });
      });
    });
  }
};
