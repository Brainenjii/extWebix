require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./loader":2,"./view":4}],2:[function(require,module,exports){
"use strict";
var me;
me = module.exports = {
  load: function (path, callback) {
    var script = document.createElement("script");
    script.src = path + ".js";
    script.onload = callback;
    document.head.appendChild(script);
  }
};
},{}],3:[function(require,module,exports){
"use strict";
var me,
  loader = require("./loader");
me = module.exports = {
  utils: {},
  load: function (name, callback) {
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
  }
};
},{"./loader":2}],4:[function(require,module,exports){
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

    return widget;
  }
};
},{"./controller":1,"./loader":2}],"extwebix":[function(require,module,exports){
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
    if (!window[config.name]) {
      window[config.name] = {};
    }
    async.each(config.requires, function (require, callback) {
      utilMgr.load(require, callback);
    }, function () {
      async.each(config.controllers, function (controller, callback) {
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

},{"./controller":1,"./util":3,"./view":4}]},{},[]);
window.EW = require('extwebix');
