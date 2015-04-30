EW.defineController("Books.controller.Main", {
  views: ["MainController"],
  init: function () {
    return {
      mainController: {
        init: this.initViewport
      }
    }
  },
  initViewport: function (viewport) {

  }
});