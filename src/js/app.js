var React = require('react');
var Flux = require('flummox').Flux;
var TaskStore = require('./TaskStore');
var FluxComponent = require('flummox/component');
var TabView = require('./Components/TabView');
var Tabs = require('./Components/Tabs');
var DailiesView = Tabs.DailiesView;
var TodosView = Tabs.TodosView;
var HabitsView = Tabs.HabitsView;
import TaskActions from './TaskActions';

class AppFlux extends Flux {

    constructor() {
        super();

        this.createActions('tasks', TaskActions);
        this.createStore('tasks', TaskStore, this);
    }

}

var flux = new AppFlux();

var HabitRPG = React.createClass({
    render: function() {
        return (
            <FluxComponent connectToStores={['tasks']}>
                <TabView tabs={this.props.tabs} />
            </FluxComponent>
        );
    }
});

var tabs = [
    { title: "Habits", component: HabitsView },
    { title: "Dailies", component: DailiesView },
    { title: "To-Dos", component: TodosView }
];

React.render(<FluxComponent flux={flux}><HabitRPG tabs={tabs} /></FluxComponent>, document.getElementById('content'));
