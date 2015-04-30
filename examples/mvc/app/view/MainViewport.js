EW.define("Books.view.MainViewport", {
  alias: "mainViewport",
  rows: [{
    view: "template",
    type: "header",
    template: "Loading Nested Data Example"
  }, {
    cols: [{
      itemId: "listBooks",
      view: "unitlist",
      uniteBy: function(obj){
        return obj.group;
      },
      defaultData: {
        detail: "",
        name: "",
        image: "",
        price: 0,
        author: ""
      },
      width: 180,
      scroll: false,
      template: "#name#",
      select: true
    }, {
      rows: [{
        itemId: "viewTemplate",
        view: "template",
        template: "<div class=\"book-image\"><img src=\"#image#\"></div>" +
          "<div class=\"book-name\">#name# <span>$#price#</span></div>" +
          "<div class=\"book-author\">By #author#</div>" +
          "<div class=\"book-detail\">#detail#</div>"
      }, {
        view: "dataview",
        itemId: "listReviews",
        gravity: 0.8,
        type: {
          width: "100%",
          height: 320,
          template: "<b>#title#</b><br>By <b>#author#</b> - #date#<br>#comment#"
        }

      }]
    }]
  }]
});