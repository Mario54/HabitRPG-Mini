'use strict';
import { List } from 'immutable';
import FluxComponent from 'flummox/component';
var React = require('react');
var NewItemForm = require('./NewItemForm')({React});
var ComponentList = require('./ComponentList')({React});
var { EditableHabitItem, EditableTodoItem, EditableDailyItem } = require('./Items.js')({React});
var helpers = require('../helpers');

// TODO Refactor to deal with empty lists in one component (too much repetition).

var HabitsView = React.createClass({
    render: function() {
        var habits,
            display;

        if (this.props.todos) {
            habits = this.props.todos.filter(helpers.isHabit).sort(helpers.orderTasks).map(function (item) {
                return <FluxComponent flux={this.props.flux}><EditableHabitItem item={item} /></FluxComponent>;
            }.bind(this));
        }

        if (habits && habits.isEmpty()) {
            display = <span>There are no habits to display.</span>;
        } else {
            display = <ComponentList components={habits} />;
        }


        return (
            <div>
                {display}
            </div>
        );
    },

    addNewHabit(text) {
        this.props.flux.getActions('tasks').newTask({
            text,
            type: 'habit'
        });
    }
});

var DailiesView = React.createClass({
    render: function() {
        var display,
            dailies;

        if (this.props.todos) {
            dailies = this.props.todos.filter(helpers.isDaily).sort(helpers.orderTasks).map(function (item) {
                return <FluxComponent flux={this.props.flux}><EditableDailyItem item={item} /></FluxComponent>;
            }.bind(this));
        }

        if (dailies && dailies.isEmpty()) {
            display = <span>There are no dailies to display.</span>;
        } else {
            display = <ComponentList components={dailies} />;
        }

        return (
            <div>
                {display}
            </div>
        );
    }
});

var TodosView = React.createClass({
    getInitialState() {
        return {
            showCompleted: true
        }
    },

    render: function() {
        var display,
            todos;

        var filterCompleted = helpers.filterCompleted(this.state.showCompleted);

        if (this.props.todos) {
            todos = this.props.todos
                .filter(filterCompleted)
                .filter(helpers.isTodo)
                .sort(helpers.orderTasks)
                .map(function (item) {
                    return <FluxComponent flux={this.props.flux}>
                               <EditableTodoItem item={item} />
                           </FluxComponent>
                }.bind(this));
        }

        if (todos && todos.isEmpty()) {
            display = <span>There are no to-dos to display.</span>;
        } else {
            display = <ComponentList components={todos} />;
        }

        return (
            <div>
                {display}
                <button>Mark all as completed</button>

                <button onClick={this.toggleShowCompleted}>
                    {this.state.showCompleted ? "Hide" : "Show"} Completed
                </button>
            </div>
        );
    },

    toggleShowCompleted() {
        var showCompleted = ! this.state.showCompleted;

        this.setState({ showCompleted });
    },

    newTodoItem(text) {
        this.props.flux.getActions('tasks').newTask(text);
    }
});

module.exports = {
    TodosView,
    DailiesView,
    HabitsView,
};
