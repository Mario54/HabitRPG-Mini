var TabView = require("./TabView");
var { DailiesView, TodosView, HabitsView } = require("./Tabs");
var CharacterInfo = require("./CharacterInfo");
import { connect } from "react-redux";
var actions = require("../actions");
import helpers from "../helpers";
import React from "react";

var tabs = [
    { title: "Habits", component: HabitsView },
    { title: "Dailies", component: DailiesView },
    { title: "To-Dos", component: TodosView }
];

// var includeCompletedTodos = true;

function selectUserAndTasks(state) {
  return {
    user: state.user,
    tasks: helpers.getTodaysTasks(state.tasks)
  };
}

console.log(actions);
var HabitRPG = React.createClass({
    render: function() {
        console.log(actions);
        const { dispatch, user, tasks } = this.props;

        function updateTaskScore(task, direction) {
            console.log(actions);
            dispatch(actions.updateTaskScore(task, direction));
        }

        return (
            <div>
              <CharacterInfo user={user} />
              <TabView updateTaskScore={updateTaskScore} options={this.props.options} user={user} tasks={tasks} tabs={tabs} />
            </div>
        );
    }
});

// Wrap the component to inject dispatch and state into it
export default connect(selectUserAndTasks)(HabitRPG);
