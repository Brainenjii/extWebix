cp require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

try {

  module.exports = require("async");

} catch (e) {

  module.exports = window.async;

}

},{"async":1}],2:[function(require,module,exports){
"use strict";

try {

  module.exports = require("lodash");

} catch (e) {

  module.exports = window._;

}

},{"lodash":2}],3:[function(require,module,exports){
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

},{"./loader":4,"./view":6,"async":1,"lodash":2}],4:[function(require,module,exports){
"use strict";

module.exports = {

  load: function load (path, callback) {

    var script = document.createElement("script");

    script.src = path + ".js";
    script.onload = callback;
    document.head.appendChild(script);

  }

};

},{}],5:[function(require,module,exports){
"use strict";

var me,
  _,
  loader = require("./loader");

me = module.exports = {

  /**
   *
   * @param dependencies
   */
  init: function init (dependencies) {

    _ = dependencies.lodash;

  },

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

},{"./loader":4}],6:[function(require,module,exports){
"use strict";

var me,
  controllerMgr,
  _ = require("lodash"),
  async = require("async"),
  loader = require("./loader"),
  childFields = ["cells", "body", "rows", "cols", "head"];

me = module.exports = {
  index: 0,
  views: {},
  widgets: {},
  load: function load (name, callback) {

    if (!me.views[name]) {

      me.views[name] = true;
      return loader.load("app/view/" + name, callback);

    }

    return callback();

  },
  process: function process (name, config) {

    me.widgets[config.alias] = config;

  },
  processWidget: function processWidget (xtype, widget) {

    if (_.isArray(widget)) {

      _.each(widget, function widgetHandler (widget) {

        me.processWidget(xtype, widget);

      });

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

},{"./controller":3,"./loader":4,"async":1,"lodash":2}],"extwebix":[function(require,module,exports){
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

},{"./controller":3,"./util":5,"./view":6,"async":1}]},{},[]);
window.EW = require('extwebix');
