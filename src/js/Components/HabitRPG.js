var FluxComponent = require('flummox/component');
var TabView = require('./TabView');

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
