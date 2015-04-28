var data = [{
  "id": "978-0641723445",
  "cat": ["book", "hardcover"],
  "name": "The Lightning Thief",
  "author": "Rick Riordan",
  "series_t": "Percy Jackson and the Olympians",
  "sequence_i": 1,
  "genre_s": "fantasy",
  "inStock": true,
  "price": 12.50,
  "pages_i": 384
}, {
  "id": "978-1423103349",
  "cat": "book",
  "name": "The Sea of Monsters",
  "author": "Rick Riordan",
  "series_t": "Percy Jackson and the Olympians",
  "sequence_i": 2,
  "genre_s": "fantasy",
  "inStock": true,
  "price": 6.49,
  "pages_i": 304
}, {
  "id": "978-1857995879",
  "cat": "book",
  "name": "Sophie's World : The Greek Philosophers",
  "author": "Jostein Gaarder",
  "sequence_i": 1,
  "genre_s": "fantasy",
  "inStock": true,
  "price": 3.07,
  "pages_i": 64
}, {
  "id": "978-1933988177",
  "cat": "book",
  "name": "Lucene in Action, Second Edition",
  "author": "Michael McCandless",
  "sequence_i": 1,
  "genre_s": "IT",
  "inStock": true,
  "price": 30.50,
  "pages_i": 475
}];

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
    defaultData: data[0],
    data: data
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
  name: "BT",
  requires: [],
  autoViewport: true,
  launch: function (viewport) {
    var detailsTemplate = EW.find(viewport, "#details"),
      gridProducts = EW.find(viewport, "#gridProducts");
    detailsTemplate.bind(gridProducts);
  }
});