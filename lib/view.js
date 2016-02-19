"use strict";

var me,
  controllerMgr,
  EW,
  webix,
  _ = require("lodash"),
  loader = require("./loader"),
  childFields = ["cells", "body", "rows", "cols", "head", "elements"];

me = module.exports = {
  index: 0,
  views: {},
  widgets: {},
  init: function init (request) {

    EW = request.EW;
    webix = request.webix;

  },
  load: function load (name, callback) {

    if (EW.skipLoading) {

      return callback();

    }

    if (!me.views[name]) {

      me.views[name] = true;
      return loader.load("app/view/" + name, callback);

    }

    return callback();

  },
  process: function process (name, config) {

    me.widgets[config.alias] = config;
    me.widgets[name] = config;

  },
  processWidget: function processWidget (xtype, widget) {

    if (_.isArray(widget)) {

      _.each(widget, function widgetHandler (widget) {

        me.processWidget(xtype, widget);

      });

    }

    if (widget.xview) {

      _.extend(widget, _.extend(_.clone(me.widgets[widget.xview]), widget));

    }

    if (widget.view && widget.itemId) {

      widget.id = xtype + me.index + "#" + widget.itemId;

    }

    _.each(childFields, function childFieldHandler (childField) {

      if (typeof widget[childField] === "object") {

        me.processWidget(xtype, widget[childField]);

      }

    });

  },

  build: function build (alias, config) {

    var widgetConfig, widget;

    controllerMgr = controllerMgr || require("./controller");

    me.index += 1;
    widgetConfig = _.extend(_.cloneDeep(me.widgets[alias]), config);
    widgetConfig.id = alias + me.index;

    me.processWidget(alias, widgetConfig);

    widget = webix.ui(widgetConfig);

    controllerMgr.assignEvents(alias, widget);

    widget.callEvent("init", [widget]);

    return widget;

  }

};
