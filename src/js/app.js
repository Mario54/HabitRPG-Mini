/*global chrome */
var React = require("react");
var uuid = require("uuid");
var FluxComponent = require("flummox/component");
var HabitRPG = require("./Components/HabitRPG")( {React} );
var FluxFactory = require("./Flux");
var api = require("./API");
var root = document.getElementById("content");

// Flux
var AppFlux = FluxFactory({api});
var flux = new AppFlux();

/**
 * Renders the app given the user's id and the API token
 */
function renderApp(element) {
  setTimeout(function() {
    flux.getActions("feedbacks").showFeedback(uuid.v4(), "error", "hi there", 200000);
    flux.getActions("feedbacks").showFeedback(uuid.v4(), "success", "yes!", 200000);
  }, 2000);

  React.render(<FluxComponent flux={flux}><HabitRPG /></FluxComponent>, element);
}

renderApp(root);

if (chrome) {
  // once the user id and token are available, display the app
  chrome.storage.sync.get({
    apiId: "",
    apiToken: ""
  }, function (items) {
    api.login(items.apiId, items.apiToken);
    api.loadAllTasks(flux.getActions("tasks").loadAllTasks);
  });
}

// TODO Sync with local storage when a something changes
