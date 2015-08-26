var TabView = require("./TabView");
var CharacterInfo = require("./CharacterInfo");
import { connect } from "react-redux";
var actions = require("../actions");
import helpers from "../helpers";
import React from "react";

var tabs = [
    { title: "Habits", type: "habit" },
    { title: "Dailies", type: "daily" },
    { title: "To-Dos", type: "todo" }
];

// var includeCompletedTodos = true;

function selector(state) {
  return {
    user: state.user,
    tasks: helpers.getTodaysTasks(state.tasks),
    currentTab: state.currentTab,
    fetchingUser: state.isFetchingUser
  };
}

var HabitRPG = React.createClass({
    render: function() {
        const { dispatch, user, tasks, fetchingUser, currentTab } = this.props;

        console.log(fetchingUser);

        function updateTaskScore(task, direction) {
            dispatch(actions.updateTaskScore(task, direction));
        }

        return (
            <div>
              <CharacterInfo user={user} fetchingUser={fetchingUser} />
              <TabView currentTab={currentTab} switchTab={(newTab) => dispatch(actions.switchTab(newTab))} updateTaskScore={updateTaskScore} options={this.props.options} user={user} tasks={tasks} tabs={tabs} />
            </div>
        );
    }
});

// Wrap the component to inject dispatch and state into it
export default connect(selector)(HabitRPG);
