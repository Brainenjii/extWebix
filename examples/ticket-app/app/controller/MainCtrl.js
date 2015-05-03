EW.defineController("Ticket.controller.MainCtrl", {
  views: ["MainViewport"],
  init: function () {
    return {
      mainViewport: {
        init: this.initViewport,
        "#gridProjects": {
          onAfterLoad: this.onProjectsLoad,
          onSelectChange: this.onProjectSelect
        }
      }
    };
  },
  initViewport: function (viewport) {
    var gridProjects = EW.find(viewport, "#gridProjects"),
      header = EW.find(viewport, "#header"),
      leaderHeader = EW.find(viewport, "#leaderHeader");
    header.bind(gridProjects);
    leaderHeader.bind(gridProjects);

  },
  onProjectsLoad: function () {
    this.select(this.getIdByIndex(1));
  },
  onProjectSelect: function () {
    var project = this.getSelectedItem(),
      gridTickets = EW.find(this, "#gridTickets"),
      gridMembers = EW.find(this, "#gridMembers"),
      chartStatusSummary = EW.find(this, "#chartStatusSummary"),
      chartMonthSummary = EW.find(this, "#chartMonthSummary");

    chartStatusSummary.clearAll();
    chartStatusSummary.parse(project.statusSummary);

    chartMonthSummary.clearAll();
    chartMonthSummary.parse(project.monthSummary);

    gridMembers.clearAll();
    gridMembers.parse(project.members);

    gridTickets.clearAll();
    gridTickets.showOverlay("Loading..");

    setTimeout(function () {
      gridTickets.parse(project.activeTickets);
      gridTickets.hideOverlay();
    }, 500);



  }
});