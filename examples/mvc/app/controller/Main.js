EW.defineController("Books.controller.Main", {
  views: ["MainViewport"],
  init: function () {
    return {
      mainViewport: {
        init: this.initViewport,
        "#listBooks": {
          onSelectChange: this.selectBook
        }
      }
    }
  },
  initViewport: function (viewport) {
    var listBooks = EW.find(viewport, "#listBooks"),
      viewTemplate = EW.find(viewport, "#viewTemplate");
    listBooks.load("../data/products.json");
    viewTemplate.bind(listBooks);
  },
  selectBook: function (id) {
    var bookInfo = this.getItem(id),
      listReviews = EW.find(this, "#listReviews");
    listReviews.clearAll();
    listReviews.parse(bookInfo.reviews);
  }
});