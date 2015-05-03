EW.defineController("Ticket.controller.LoginCtrl", {
  views: ["login/Window"],
  init: function () {
    return {
      windowLogin: {
        init: this.initWindow,
        "#buttonLogin": {
          onItemClick: this.loginClick
        }
      }
    };
  },
  loginClick: function () {
    var fieldPassword = EW.find(this, "#fieldPassword"),
      win = this.getTopParentView();
    if (fieldPassword.getValue()) {
      win.close();
      EW.widget("mainViewport");
    } else {
      fieldPassword.validate();
    }
  }
});