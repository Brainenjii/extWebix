"use strict";

var me,
  async = require("async"),
  controllerMgr = require("./controller"),
  viewMgr = require("./view"),
  utilMgr = require("./util");

me = module.exports = {
  widgets: {},
  controllers: [],
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
  find: function find (widget, selector) {

    return $$(widget.getTopParentView().config.id + selector);

  },
  application: function application (config) {

    config = config || {};

    if (!window[config.name]) {

      window[config.name] = {};

    }

    if (config.loader === false) {

      EW.skipLoading = true;

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
