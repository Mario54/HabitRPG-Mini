/*global chrome */

var React = require("react");
var FluxComponent = require("flummox/component");
var HabitRPG = require("./Components/HabitRPG")( {React} );
var config = require("./config");
var initialTasks = {};
var Habitapi = require("habitrpg-api");
var FluxFactory = require("./Flux");

var root = document.getElementById("content");

/**
 * Renders the app given the user's id and the API token
 */
function renderApp(element, api) {
  // Flux
  var AppFlux = FluxFactory(api);
  var flux = new AppFlux();

  if (api) {
    // Initial read of tasks from server
    api.getTasks(function(error, response) {
        if (error) {
            // TODO Display error message
            return;
        }

        var tasks = JSON.parse(response.text);
        flux.getActions("tasks").loadAllTasks(tasks);
    });
  }

  React.render(<FluxComponent flux={flux}><HabitRPG /></FluxComponent>, element);
}

if (chrome) {
  chrome.storage.local.get({
    tasks: ""
  }, function (items) {
    if (items.tasks) {
      initialTasks = JSON.parse(initialTasks);
    }
  });

  // once the user id and token are available, display the app
  chrome.storage.sync.get({
    apiId: config.userId,
    apiToken: config.apiKey
  }, function (items) {
    var api = new Habitapi(items.apiId, items.apiToken);
    renderApp(root, api);
  });
}

// TODO Sync with local storage when a something changes
