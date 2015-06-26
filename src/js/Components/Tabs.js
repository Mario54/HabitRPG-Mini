
"use strict";
import FluxComponent from "flummox/component";
var React = require("react");
var ComponentList = require("./ComponentList")({React});
var { EditableHabitItem, EditableTodoItem, EditableDailyItem } = require("./Items.js")({React});
var helpers = require("../helpers");

// TODO Refactor to deal with empty lists in one component (too much repetition).

var HabitsView = React.createClass({
    render: function() {
        var habits,
            display;

        if (this.props.tasks) {
            habits = this.props.tasks
                .filter(helpers.isHabit)
                .map(item => {
                    return <EditableHabitItem item={item} updateTaskScore={this.props.updateTaskScore} />;
                });
        }

        if (habits && habits.isEmpty()) {
            display = <div>There are no habits to display.</div>;
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
        this.props.flux.getActions("tasks").newTask({
            text,
            type: "habit"
        });
    }
});

var DailiesView = React.createClass({
    getInitialState() {
        return {
            showCompleted: this.props.options.showCompletedTasks
        };
    },

    render: function() {
        var display,
            dailies;

        var filterCompleted = helpers.filterCompleted(this.state.showCompleted);

        if (this.props.tasks) {
            dailies = this.props.tasks
                .filter(helpers.isDaily)
                .filter(filterCompleted)
                .map(item => {
                    return <EditableDailyItem item={item} updateTaskScore={this.props.updateTaskScore} />;
              });
        }

        if (dailies && dailies.isEmpty()) {
            display = <div>There are no dailies to display.</div>;
        } else {
            display = <ComponentList components={dailies} />;
        }

        return (
            <div>
              {display}
              <button onClick={this.toggleShowCompleted}>
                  {this.state.showCompleted ? "Hide" : "Show"} Completed
              </button>
            </div>
        );
    },

    toggleShowCompleted() {
        var showCompleted = !this.state.showCompleted;

        this.setState({ showCompleted });
    }
});

var TodosView = React.createClass({
    getInitialState() {
        return {
            showCompleted: this.props.options.showCompletedTasks
        };
    },

    render: function() {
        var display,
            todos;

        var filterCompleted = helpers.filterCompleted(this.state.showCompleted);

        if (this.props.tasks) {
            todos = this.props.tasks
                .filter(filterCompleted)
                .filter(helpers.isTodo)
                .map(item => {
                    return <EditableTodoItem item={item} updateTaskScore={this.props.updateTaskScore} />;
                });
        }

        if (todos && todos.isEmpty()) {
            display = <div>There are no to-dos to display.</div>;
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
        var showCompleted = !this.state.showCompleted;

        this.setState({ showCompleted });
    },

    newTodoItem(text) {
        this.props.flux.getActions("tasks").newTask(text);
    }
});

module.exports = {
    TodosView,
    DailiesView,
    HabitsView
};
