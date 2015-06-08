var FluxComponent = require('flummox/component');
var TabView = require('./TabView');
var {DailiesView, TodosView, HabitsView } = require('./Components/Tabs');

var tabs = [
    { title: "Habits", component: HabitsView },
    { title: "Dailies", component: DailiesView },
    { title: "To-Dos", component: TodosView }
];

function HabitRPGFactory({React}) {
    var HabitRPG = React.createClass({
        render: function() {
            return (
                <FluxComponent connectToStores={['tasks']}>
                    <TabView tabs={this.props.tabs} />
                </FluxComponent>
            );
        }
    });

    return HabitRPG;
}


export default HabitRPGFactory;
