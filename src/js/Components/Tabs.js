'use strict';
import { List } from 'immutable';
import FluxComponent from 'flummox/component';
var React = require('react');
var NewItemForm = require('./NewItemForm')({React});
var ComponentList = require('./ComponentList')({React});
var { EditableHabitItem, EditableTodoItem, EditableDailyItem } = require('./Items.js')({React});

var isTaskType = function isTaskType(type) {
    return function (item) {
        return item && item.get('type') === type;
    };
}

function byText(task1, task2) {
    if ( !task1.get('completed') && task2.get('completed')) {
        return -1;
    } else if (task1.get('completed') && !task2.get('completed')) {
        return 1;
    }

    return task1.get('text').localeCompare(task2.get('text'));
}

// TODO Refactor to deal with empty lists in one component (too much repetition).

var isHabit = isTaskType('habit'),
    isDaily = isTaskType('daily'),
    isTodo  = isTaskType('todo');

var HabitsView = React.createClass({
    render: function() {
        var habits,
            display;

        if (this.props.todos) {
            habits = this.props.todos.filter(isHabit).sort(byText).map(function (item) {
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
            dailies = this.props.todos.filter(isDaily).sort(byText).map(function (item) {
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

        var filterCompleted = function(showCompleted) {
            return function (todo) {
                if (showCompleted) return true;

                if (todo.get('completed')) {
                    return false;
                }

                return true;
            }
        }

        if (this.props.todos) {
            todos = this.props.todos.
                filter(filterCompleted(this.state.showCompleted)).
                filter(isTodo).sort(byText).
                map(function (item) {
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
