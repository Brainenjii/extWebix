EW.define("MainViewport", {
  alias: "mainViewport",
  view: "layout",
  rows: [{
    view: "template",
    type: "header",
    template: "Grid binding example"
  }, {
    view: "datatable",
    itemId: "gridProducts",
    columns: [{id: "author", header: "Author", width: 200},
      {id: "name", header: "Title", width: 160},
      {id: "genre_s", header: "Genre", width: 100},
      {id: "cat", header: "Product Group", width: 200}],
    select: "row",
    defaultData: {
      name: "select row",
      author: "select row",
      genre_s: "select row",
      cat: "select row"
    },
    url: "../data/books.json",
    dataType: "json"
  }, {
    view: "template",
    itemId: "details",    
    template: "Title: <a href=\"#\">#name#</a><br>" +
      "Author: #author#<br>" +
      "Genre: #genre_s#<br>" +
      "Product Group: #cat#"    
  }]
});

EW.application({
  name: "GB",
  requires: [],
  autoViewport: true,
  launch: function (viewport) {
    var detailsTemplate = EW.find(viewport, "#details"),
      gridProducts = EW.find(viewport, "#gridProducts");
    detailsTemplate.bind(gridProducts);
  }
});