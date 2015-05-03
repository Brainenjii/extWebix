EW.define("WindowLayout", {
  alias: "windowLayout",
  view: "window",
  animate: true,
  position: "center",
  width: 800,
  height: 600,
  move: true,
  head: {
    view: "toolbar",
    cols: [{
      view: "button",
      width: 40,
      value: "Y"
    }, {
      view: "template",
      type: "header",
      borderless: true,
      template: "Layout Window with title <em>after</em> buttons"
    }, {
      view: "button",
      width: 40,
      value: "X"
    }]
  },
  body: {
    cols: [{
      header: "Navigation",
      body: " ",
      width: 150
    }, {
      view: "resizer"
    }, {
      view: "tabview",
      cells: [{
        header: "Bogus tab",
        body: {
          view: "template",
          template: "Configured Window"
        }
      }, {
        header: "Another tab",
        body: {
          view: "template",
          template: "Hello world 2"
        }
      }, {
        header: "Closeable tab",
        close:true,
        body: {
          view: "template",
          template: "Hello world 3"
        }
      }]
    }]
  }
});

EW.define("MainViewport", {
  alias: "mainViewport",
  view: "layout",
  rows: [{
    view: "button",
    value: "Layout window",
    width: 200,
    on: {
      onItemClick: function () {
        var win;
        if (!this.win) {
          this.win = EW.widget("windowLayout");
        }
        win = this.win;
        if (win.isVisible()) {
          win.hide();
        } else {
          win.show();
        }
      }
    }
  }]

});

EW.application({
  name: "WL",
  autoViewport: true
});