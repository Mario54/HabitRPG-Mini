var TabView = require("./TabView");
var { DailiesView, TodosView, HabitsView } = require("./Tabs");
var CharacterInfo = require("./CharacterInfo");
import { connect } from "react-redux";
import * as Actions from "../actions";
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


var HabitRPG = React.createClass({
    render: function() {
        const { dispatch, user, tasks } = this.props;
        return (
            <div>
              <CharacterInfo user={user} />
              <TabView options={this.props.options} user={user} tasks={tasks} tabs={tabs} />
            </div>
        );
    }
});

// Wrap the component to inject dispatch and state into it
export default connect(selectUserAndTasks)(HabitRPG);
