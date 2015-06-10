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
    return task1.get('text').localeCompare(task2.get('text'));
}

var isHabit = isTaskType('habit'),
    isDaily = isTaskType('daily'),
    isTodo  = isTaskType('todo');

var HabitsView = React.createClass({
    render: function() {
        var habits;
        if (this.props.todos) {
            habits = this.props.todos.filter(isHabit).sort(byText).map(function (item) {
                return <FluxComponent flux={this.props.flux}><EditableHabitItem item={item} /></FluxComponent>;
            }.bind(this));
        }


        return (
            <div>
                <ComponentList components={habits} />
            </div>
        );
    },

    addNewHabit(text) {
        console.log(text);
        this.props.flux.getActions('tasks').newTask({
            text,
            type: 'habit'
        });
    }
});

var DailiesView = React.createClass({
    render: function() {
        var dailies = this.props.todos.filter(isDaily).sort(byText).map(function (item) {
            return <FluxComponent flux={this.props.flux}><EditableDailyItem item={item} /></FluxComponent>;
        }.bind(this));

        return (
            <div>
                <ComponentList components={dailies} />
            </div>
        );
    }
});

var TodosView = React.createClass({
    render: function() {
        var todos = this.props.todos.filter(isTodo).sort(byText).map(function (item) {
            return <FluxComponent flux={this.props.flux}><EditableTodoItem item={item} /></FluxComponent>
        }.bind(this));

        return (
            <div>
                <ComponentList components={todos} />
            </div>
        );
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
