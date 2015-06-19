/*global chrome */
var React = require("react");
var uuid = require("uuid");
var FluxComponent = require("flummox/component");
var FluxFactory = require("./Flux");
var apiFactory = require("./API");
var root = document.getElementById("content");
var options = require("./options");
var HabitRPG = require("./Components/HabitRPG")( {React, options } );

var api = apiFactory();

// Flux
var AppFlux = FluxFactory({api});
var flux = new AppFlux();

/**
 * Renders the app given the user's id and the API token
 */
function renderApp(element, userOptions) {
  // setTimeout(function() {
  //   flux.getActions("feedbacks").showFeedback(uuid.v4(), "error", "hi there", 200000);
  //   flux.getActions("feedbacks").showFeedback(uuid.v4(), "success", "yes!", 200000);
  // }, 2000);

  if ( !api.isLoggedIn() ) {
    flux.getActions("feedbacks").showFeedback(uuid.v4(), "error", "You are not logged in. Enter your user information in the options page.", 500000);
  }

  React.render(<FluxComponent flux={flux}><HabitRPG options={userOptions} /></FluxComponent>, element);
}



if (chrome) {
  // once the user id and token are available, display the app
  options.fetch(chrome.storage, function ({id, token, showCompletedTasks }) {
    api.login(id, token);
    api.loadAllTasks(flux.getActions("tasks").loadAllTasks);
    renderApp(root, {showCompletedTasks});
  });
}
