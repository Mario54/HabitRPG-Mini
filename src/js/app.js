var React = require('react');
var FluxComponent = require('flummox/component');
var AppFlux = require('./Flux');
var HabitRPG = require('./Components/HabitRPG')({React});

var flux = new AppFlux();

React.render(<FluxComponent flux={flux}><HabitRPG tabs={tabs} /></FluxComponent>, document.getElementById('content'));
