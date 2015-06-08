var React = require('react');
var FluxComponent = require('flummox/component');
var TabView = require('./Components/TabView');
var Tabs = require('./Components/Tabs');
var DailiesView = Tabs.DailiesView;
var TodosView = Tabs.TodosView;
var HabitsView = Tabs.HabitsView;
var AppFlux = require('./Flux');
var HabitRPG = require('./Components/HabitRPG')({React});

var flux = new AppFlux();



var tabs = [
    { title: "Habits", component: HabitsView },
    { title: "Dailies", component: DailiesView },
    { title: "To-Dos", component: TodosView }
];

React.render(<FluxComponent flux={flux}><HabitRPG tabs={tabs} /></FluxComponent>, document.getElementById('content'));
