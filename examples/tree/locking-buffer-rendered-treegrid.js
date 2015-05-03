EW.define("MainViewport", {
  alias: "mainViewport",
  container: "tree-example",
  rows: [{
    view: "template", "type": "header", "template": "Forum Folder Summary"
  }, {
    view: "treetable",
    width: 600,
    height: 400,
    leftSplit: 1,
    columns:[{id:"forumtitle", header:"Forum", width:250,
      template:"{common.treetable()} #forumtitle#"},
      {id: "username", header: "User", width: 150},
      {id:"title", header:"title", width:250}
    ],
    scroll: true,
    select: "cell",
    url: "../data/forum-data.json",
    dataType: "json"
  }]
});

EW.application({
  name: "Rendered TreeGrid",
  autoViewport: true
});