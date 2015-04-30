"use strict";
var me,
  controllerMgr,
  loader = require("./loader"),
  childFields = ["cells", "body", "rows", "cols", "head"];

me = module.exports = {
  index: 0,
  views: {},
  widgets: {},
  load: function (name, callback) {
    if (!me.views[name]) {
      me.views[name] = true;
      return loader.load("app/view/" + name, callback);
    }
    return callback();
  },
  process: function (name, config) {
    console.log(name);
    me.widgets[config.alias] = config;
  },
  processWidget: function (xtype, widget) {
    if (_.isArray(widget)) {
      _.each(widget, function (widget) {
        me.processWidget(xtype, widget);
      });
    }
    if (widget.view && widget.itemId) {
      widget.id = xtype + me.index + "#" + widget.itemId;
    }
    _.each(childFields, function (childField) {
      if (typeof widget[childField] === "object") {
        me.processWidget(xtype, widget[childField]);
      }
    });
  },
  build: function (alias, config) {
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