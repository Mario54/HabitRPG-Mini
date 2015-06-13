
var FluxComponent = require("flummox/component");
var TabView = require("./TabView");
var {DailiesView, TodosView, HabitsView } = require("./Tabs");

var tabs = [
    { title: "Habits", component: HabitsView },
    { title: "Dailies", component: DailiesView },
    { title: "To-Dos", component: TodosView }
];

var includeCompletedTodos = true;

function HabitRPGFactory( { React } ) {

    var HabitRPG = React.createClass({
        render: function() {
            return (
                <div>
                    <FluxComponent connectToStores={["tasks"]}
                                   stateGetter={([taskStore]) => ({
                                       tasks: taskStore.getTodaysTasks({includeCompletedTodos})
                                   })}>
                        <TabView tabs={tabs} />
                    </FluxComponent>
                </div>
            );
        }
    });

    return HabitRPG;
}


export default HabitRPGFactory;
