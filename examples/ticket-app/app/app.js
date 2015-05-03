EW.application({
  name: "Ticket",
  requires: [],
  controllers: ["LoginCtrl", "MainCtrl"],
  launch: function () {
    EW.widget("windowLogin");
  }
});