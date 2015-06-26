var TabView = require("./TabView");
var {DailiesView, TodosView, HabitsView } = require("./Tabs");
var CharacterInfo = require("./CharacterInfo");
import { Connector } from "redux/react";
import * as Actions from "../actions";
import { bindActionCreators } from "redux";
import helpers from "../helpers";

var tabs = [
    { title: "Habits", component: HabitsView },
    { title: "Dailies", component: DailiesView },
    { title: "To-Dos", component: TodosView }
];

var includeCompletedTodos = true;

function selectUser(state) {
  return {
    user: state.habitrpg.user
  };
}

function selectUserAndTasks(state) {
  return {
    user: state.habitrpg.user,
    tasks: helpers.getTodaysTasks(state.habitrpg.tasks)
  };
}

function HabitRPGFactory( { React } ) {

    var HabitRPG = React.createClass({
        render: function() {
            return (
                <div>
                  <Connector select={selectUser}>
                    {({ user, dispatch }) =>
                      /* Yes this is child as a function. */
                      <CharacterInfo user={user}
                               {...bindActionCreators(Actions, dispatch)} />
                    }
                  </Connector>
                  <Connector select={selectUserAndTasks}>
                    {({ user, tasks, dispatch }) =>
                      /* Yes this is child as a function. */
                      <TabView options={this.props.options} user={user} tasks={tasks} tabs={tabs}
                               {...bindActionCreators(Actions, dispatch)} />
                    }
                  </Connector>
                </div>
            );
        }
    });

    return HabitRPG;
}

export default HabitRPGFactory;
