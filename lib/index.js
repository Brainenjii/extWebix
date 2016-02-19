/* global $$ */

"use strict";

var me,
  webix,
  window,
  async = require("async"),
  controllerMgr = require("./controller"),
  viewMgr = require("./view"),
  utilMgr = require("./util");

me = module.exports = {
  widgets: {},
  controllers: [],
  init: function init (request) {

    webix = request.webix;
    window = request.window;

    viewMgr.init({
      EW: me,
      webix: request.webix
    });
    controllerMgr.init({
      EW: me,
      webix: request.webix
    });
    utilMgr.init({
      EW: me,
      webix: request.webix
    });

  },
  define: function define (name, config) {

    viewMgr.process(name, config);

  },
  defineController: function defineController (name, config) {

    controllerMgr.process(name, config);

  },
  defineUtil: function defineUtil (name, config) {

    utilMgr.process(name, config);

  },
  widget: function widget (xtype, config) {

    return viewMgr.build(xtype, config);

  },
  getEl: function getEl (selector) {

    return $$(selector);

  },
  find: function find (widget, selector) {

    return $$(widget.getTopParentView().config.id + selector);

  },
  application: function application (config) {

    config = config || {};

    if (!window[config.name]) {

      window[config.name] = {};

    }

    me.project = window[config.name];

    if (config.loader === false) {

      me.skipLoading = true;

    }

    async.each(config.requires || [],
      function requiresHandler (requires, callback) {

        utilMgr.load(requires, callback);

      }, function controllerLoader () {

        async.each(config.controllers || [],
          function controllerHandler (controller, callback) {

            controllerMgr.load(controller, callback);

          }, function initiation () {

            webix.ready(function readyActions () {

              var viewport;

              if (config.autoViewport) {

                viewport = me.widget("mainViewport");

              }

              if (config.launch) {

                config.launch(viewport);

              }

            });

          });

      });

  }

};
