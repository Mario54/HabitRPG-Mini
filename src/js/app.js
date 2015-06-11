var React = require('react');
var FluxComponent = require('flummox/component');
var HabitRPG = require('./Components/HabitRPG')({React});

// API
var habitapi = require('habitrpg-api');
var userId = ;
var apiKey = ;
var api = new habitapi(userId, apiKey);

// Flux
var AppFlux = require('./Flux')(api);
var flux = new AppFlux();

// Initial read of tasks from server
api.getTasks(function(error, response) {
    if (error) {
        // TODO Display error message
        return;
    }

    var tasks = JSON.parse(response.text);
    flux.getActions('tasks').loadAllTasks(tasks);
});

React.render(<FluxComponent flux={flux}><HabitRPG /></FluxComponent>, document.getElementById('content'));
