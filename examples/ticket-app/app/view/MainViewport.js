EW.define("Ticket.view.MainViewport", {
  alias: "mainViewport",
  rows: [{
    view: "toolbar",
    cols: [{
      view: "template",
      type: "header",
      borderless: true,
      template: "ExtWebix"
    }, {
      view: "button",
      width: 100,
      value: "Don"
    }]
  }, {
    cols: [{
      width: 250,
      collapsed: false,
      rows: [{
        view: "template",
        type: "header",
        template: "Projects"
      }, {
        view: "datatable",
        itemId: "gridProjects",
        columns: [{id: "project", header: "Name", fillspace: true},
          {id: "click", header: "", width: 20}],
        scroll: false,
        select: "row",
        url: "../data/tickets-data.json"
      }]
    }, {
      view: "resizer"
    }, {
      view: "tabview",
      cells: [{
        header: "Dashboard",
        body: {
          view: "layout",
          padding: 20,
          margin: 20,
          rows: [{
            view: "template",
            height: 50,
            itemId: "header",
            borderless: true,
            template: "Project Summary - #project#"
          }, {
            view: "layout",
            margin: 20,
            cols: [{
              rows: [{
                view: "template",
                type: "header",
                template: "Ticket Status Summary"
              }, {
                view: "chart",
                type: "pie3D",
                itemId: "chartStatusSummary",
                value: "#total#"
              }]
            }, {
              rows: [{
                view: "template",
                type: "header",
                template: "My active tickets"
              }, {
                view: "datatable",
                itemId: "gridTickets",
                scroll: false,
                columns: [{id: "id", header: "Id"},
                  {id: "title", header: "Title", fillspace: true},
                  {id: "created", header: "Created"},
                  {id: "modified", header: "Last Modified"},
                  {id: "", header: "", width: 20}]
              }]
            }]
          }, {
            view: "layout",
            margin: 20,
            cols: [{
              rows: [{
                view: "template",
                type: "header",
                template: "1 Month Ticket Open Summary"
              }, {
                view: "chart",
                animate: true,
                itemId: "chartMonthSummary",
                type: "line",
                value: "#total#"
              }]
            }, {
              rows: [{
                view: "template",
                type: "header",
                itemId: "leaderHeader",
                template: "Project Members - Lead: #leader#"
              }, {
                view: "datatable",
                itemId: "gridMembers",
                scroll: false,
                columns: [{id: "name", header: "Name", fillspace: true}]
              }]
            }]
          }]
        }
      }]
    }]
  }]
});