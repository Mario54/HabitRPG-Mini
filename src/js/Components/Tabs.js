var React = require("react");
var ComponentList = require("./ComponentList")({React});
var TaskItem = require("./Items.js")({React});
var helpers = require("../helpers");

// TODO Refactor to deal with empty lists in one component (too much repetition).

var HabitsView = React.createClass({
    render: function() {
        var habits,
            display;

        if (this.props.tasks) {
            habits = this.props.tasks
                .map(item => {
                    return <TaskItem item={item} updateTaskScore={this.props.updateTaskScore} />;
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
    }
});

var DailiesView = React.createClass({
    getInitialState() {
        return {
            showCompleted: this.props.options && this.props.options.showCompletedTasks
        };
    },

    render: function() {
        var display,
            dailies;

        var filterCompleted = helpers.filterCompleted(this.state.showCompleted);

        if (this.props.tasks) {
            dailies = this.props.tasks
                .filter(filterCompleted)
                .map(item => {
                    return <TaskItem item={item} updateTaskScore={this.props.updateTaskScore} />;
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
            showCompleted: this.props.options && this.props.options.showCompletedTasks
        };
    },

    render: function() {
        var display,
            todos;

        var filterCompleted = helpers.filterCompleted(this.state.showCompleted);

        if (this.props.tasks) {
            todos = this.props.tasks
                .filter(filterCompleted)
                .map(item => {
                    return <TaskItem item={item} updateTaskScore={this.props.updateTaskScore} />;
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
    }
});

var taskViewMap = {
    "habit": HabitsView,
    "todo": TodosView,
    "daily": DailiesView
};

var TaskView = React.createClass({
    render: function() {
        let { tasks, taskType } = this.props;

        if (tasks) {
            tasks = this.props.tasks
                .filter(helpers.isTaskType(taskType));
        }

        var TabView = taskViewMap[taskType];

        return <TabView {...this.props} tasks={tasks} />;
    }
});

module.exports = TaskView;
