var FluxComponent = require("flummox/component");
var TabView = require("./TabView");
var {DailiesView, TodosView, HabitsView } = require("./Tabs");
var CharacterInfo = require("./CharacterInfo");
import { Connector } from "redux/react";
import * as Actions from "../actions";
import { bindActionCreators } from "redux";

var tabs = [
    { title: "Habits", component: HabitsView },
    { title: "Dailies", component: DailiesView },
    { title: "To-Dos", component: TodosView }
];

var includeCompletedTodos = true;

function select(state) {
  return { user: state.user };
}

function HabitRPGFactory( { React } ) {

    var HabitRPG = React.createClass({
        render: function() {
            return (
                <div>
                  <Connector>
                    {(options) => {
                      var dispatch = options.dispatch;
                      console.log(options);
                      /* Yes this is child as a function. */
                      return <CharacterInfo user={options.store.user}
                               {...bindActionCreators(Actions, dispatch)} />;
                     }}
                  </Connector>
                    <FluxComponent connectToStores={["tasks"]}
                                   stateGetter={([taskStore]) => ({
                                       tasks: taskStore.getTodaysTasks({includeCompletedTodos})
                                   })}>
                        <TabView options={this.props.options} tabs={tabs} />
                    </FluxComponent>
                </div>
            );
        }
    });

    return HabitRPG;
}


export default HabitRPGFactory;
