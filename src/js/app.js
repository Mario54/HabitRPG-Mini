/*eslint-env node, browser */

var React = require("react");
var FluxComponent = require("flummox/component");
var HabitRPG = require("./Components/HabitRPG")( {React: React} );

// API
var Habitapi = require("habitrpg-api");
var userId = "95bf6903-3a3b-4165-ab0c-d47ff063254e";
var apiKey = "8ed53dad-8047-4fa9-be54-15131273bf6b";
var api = new Habitapi(userId, apiKey);

// Flux
var AppFlux = require("./Flux")(api);
var flux = new AppFlux();

// Initial read of tasks from server
api.getTasks(function(error, response) {
    if (error) {
        // TODO Display error message
        return;
    }

    var tasks = JSON.parse(response.text);
    flux.getActions("tasks").loadAllTasks(tasks);
});

React.render(<FluxComponent flux={flux}><HabitRPG /></FluxComponent>, document.getElementById("content"));
