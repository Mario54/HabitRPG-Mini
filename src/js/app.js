var React = require('react');
var FluxComponent = require('flummox/component');
var AppFlux = require('./Flux');
var HabitRPG = require('./Components/HabitRPG')({React});
var habitapi = require('habitrpg-api');
var userId = ;
var apiKey = ;

var api = new habitapi(userId, apiKey);
var flux = new AppFlux();

api.getTasks(function(error, response) {
    if (error) {
        console.log(error);
        return;
    }

    var tasks = JSON.parse(response.text);
    console.log('loading tasks');
    flux.getActions('tasks').loadAllTasks(tasks);
});

React.render(<FluxComponent flux={flux}><HabitRPG /></FluxComponent>, document.getElementById('content'));
