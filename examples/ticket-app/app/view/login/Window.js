EW.define("Ticket.view.login.Window", {
  view: "window",
  alias: "windowLogin",
  position: "center",
  hidden: false,
  height: 250,
  width: 300,
  move: true,
  head: "Login - Ticket App",
  body: {
    view: "form",
    itemId: "formLogin",
    padding: 10,
    rules: {
      password: webix.rules.isNotEmpty
    },
    rows: [{
      view: "text",
      labelWidth: 100,
      value: "Don",
      label: "Username"
    }, {
      view: "text",
      name: "password",
      itemId: "fieldPassword",
      label: "Password",
      required:"true",
      labelWidth: 100,
      type: "password"
    }, {
      view: "template",
      borderless: true,
      css: {
        "text-align": "right",
        "font-size": "10px"
      },
      template: "Enter any non-empty password"
    }, {
      view: "combo",
      label: "Organization",
      value: "1",
      labelWidth: 100,
      options: [{id: 1, value: "ExtWebix"}],
    }, {
    }, {
      view: "layout",
      cols: [{
      }, {
        view: "button",
        itemId: "buttonLogin",
        width: 100,
        value: "Login"
      }]
    }]
  }
});